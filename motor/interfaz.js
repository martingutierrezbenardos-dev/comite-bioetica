/* =========================================================================
   INTERFAZ
   Ventanas modales, avisos, narración, barra superior, carpeta de evidencias,
   cuaderno de conceptos y glosario.
   ========================================================================= */
(function () {
  "use strict";
  const el = BIO.el;
  let contador = 0;

  /* ---------- Ventana modal genérica (usa <dialog>) ----------
     op: { titulo, contenido, clase, cerrable, botones:[{texto, clase, accion, cierra}], alCerrar } */
  BIO.ui.modal = function (op) {
    const id = "modal-t-" + (++contador);
    const dlg = el("dialog", { class: "modal " + (op.clase || ""), "aria-labelledby": id });
    const titulo = el("h2", { id: id, tabindex: "-1" }, BIO.plano(op.titulo || ""));
    const cabeza = el("header", { class: "modal-cabeza" }, [titulo]);
    if (op.cerrable !== false) {
      cabeza.appendChild(el("button", { class: "btn-icono cerrar", "aria-label": "Cerrar", title: "Cerrar (Esc)", onclick: function () { cerrar(); } }, "×"));
    }
    const cuerpo = el("div", { class: "modal-cuerpo" });
    if (op.contenido) cuerpo.appendChild(op.contenido);
    const pie = el("footer", { class: "modal-pie" });
    const api = { dlg: dlg, cuerpo: cuerpo, pie: pie, titulo: titulo, cerrar: cerrar };
    (op.botones || []).forEach(function (b) { pie.appendChild(BIO.ui.boton(b, api)); });
    dlg.append(cabeza, cuerpo, pie);
    document.body.appendChild(dlg);

    const previo = document.activeElement;
    let resolver;
    api.promesa = new Promise(function (r) { resolver = r; });
    let cerrado = false;
    function cerrar(valor) {
      if (cerrado) return;
      cerrado = true;
      try { dlg.close(); } catch (e) { /* ya cerrado */ }
      dlg.remove();
      if (previo && previo.focus && document.contains(previo)) previo.focus();
      else BIO.ui.focoSeguro();
      if (op.alCerrar) op.alCerrar(valor);
      resolver(valor);
    }
    dlg.addEventListener("cancel", function (e) {
      e.preventDefault();
      if (op.cerrable !== false) cerrar();
    });
    dlg.showModal();
    (op.foco || titulo).focus();
    return api;
  };

  /* Si el foco se perdió (quedó en <body>), llevarlo a un lugar útil:
     la ventana abierta más alta o la primera zona de la escena. */
  BIO.ui.focoSeguro = function () {
    setTimeout(function () {
      const ae = document.activeElement;
      if (ae && ae !== document.body) return;
      const abiertos = BIO.$$("dialog[open]");
      const destino = abiertos.length
        ? abiertos[abiertos.length - 1].querySelector("button, [href], input, textarea, [tabindex]")
        : (BIO.$("#pantalla-juego") && !BIO.$("#pantalla-juego").hidden ? BIO.$("#zonas .hotspot") : null);
      if (destino) destino.focus({ preventScroll: true });
    }, 0);
  };

  BIO.ui.boton = function (b, api) {
    return el("button", {
      class: "btn " + (b.clase || ""),
      type: "button",
      onclick: function () {
        if (b.accion) { const r = b.accion(api); if (r === false) return; }
        if (b.cierra !== false && api) api.cerrar(b.valor);
      }
    }, b.texto);
  };

  BIO.ui.confirmar = function (texto, si, no) {
    let resp = false;
    const m = BIO.ui.modal({
      titulo: "Confirmar",
      contenido: BIO.fmt(texto),
      botones: [
        { texto: no || "Cancelar", clase: "btn-sec" },
        { texto: si || "Sí, continuar", accion: function () { resp = true; } }
      ]
    });
    return m.promesa.then(function () { return resp; });
  };

  BIO.ui.aviso = function (titulo, texto, boton) {
    return BIO.ui.modal({ titulo: titulo, contenido: BIO.fmt(texto), botones: [{ texto: boton || "Entendido" }] }).promesa;
  };

  /* ---------- Avisos breves (toasts) ---------- */
  BIO.ui.toast = function (texto) {
    // Si hay un <dialog> modal abierto, el aviso debe ir dentro para verse encima
    const abiertos = BIO.$$("dialog[open]");
    const host = abiertos.length ? abiertos[abiertos.length - 1] : document.body;
    let caja = host.querySelector(":scope > .toasts");
    if (!caja) { caja = el("div", { class: "toasts", role: "status", "aria-live": "polite" }); host.appendChild(caja); }
    const t = el("div", { class: "toast" }, BIO.plano(texto));
    caja.appendChild(t);
    setTimeout(function () { t.classList.add("sale"); }, 3600);
    setTimeout(function () { t.remove(); }, 4200);
  };

  /* ---------- Narración bajo la escena ---------- */
  BIO.ui.narrar = function (texto, titulo) {
    const n = BIO.$("#narracion");
    if (!n) return;
    n.innerHTML = "";
    if (titulo) n.appendChild(el("h2", { class: "narr-titulo" }, BIO.plano(titulo)));
    if (texto) n.appendChild(BIO.fmt(texto));
  };

  /* ---------- Barra superior y objetivo ---------- */
  BIO.objetivoActual = function () {
    const d = BIO.datosCap();
    if (!d || !d.objetivos) return null;
    for (const o of d.objetivos) if (!BIO.cumple(o.hecho)) return o;
    return null;
  };

  BIO.ui.actualizarBarra = function () {
    const d = BIO.datosCap(), cap = BIO.cap();
    if (!d || !cap) return;
    const n = BIO.$("#carpeta-n");
    if (n) n.textContent = cap.evidencias.length;
    const bc = BIO.$("#barra-cap");
    if (bc) bc.textContent = "Capítulo " + (d.numero || "") + " · " + d.titulo;
    const ob = BIO.$("#objetivo");
    if (ob) {
      const o = BIO.objetivoActual();
      ob.innerHTML = "";
      if (o) ob.append(el("span", { class: "obj-etq" }, "Objetivo: "), el("span", {}, BIO.plano(o.texto)));
    }
    const r = BIO.$("#btn-resaltar");
    if (r) r.setAttribute("aria-pressed", BIO.estado.ajustes.resaltar ? "true" : "false");
  };

  /* ---------- Evidencias ---------- */
  BIO.ui.tarjetaEvidencia = function (id) {
    const ev = BIO.evidencia(id);
    const art = el("article", { class: "documento" });
    if (ev.fuente) art.appendChild(el("p", { class: "doc-fuente" }, BIO.plano(ev.fuente)));
    if (ev.fechaTexto) art.appendChild(el("p", { class: "doc-fecha" }, ev.fechaTexto));
    art.appendChild(BIO.fmt(ev.texto, "doc-texto"));
    if (ev.legal && BIO.datos.legal[ev.legal]) {
      const l = BIO.datos.legal[ev.legal];
      art.appendChild(el("p", { class: "doc-nota" }, "Resumen elaborado para este juego; no reemplaza el texto de la ley. Vigente a la fecha: " + (l.vigente_a_la_fecha || "sin indicar") + "."));
    }
    return art;
  };

  BIO.ui.mostrarEvidencia = function (id, nueva) {
    const ev = BIO.evidencia(id);
    const cont = el("div");
    if (nueva) cont.appendChild(el("p", { class: "insignia" }, "Nuevo en tu carpeta"));
    cont.appendChild(BIO.ui.tarjetaEvidencia(id));
    return BIO.ui.modal({
      titulo: ev.titulo,
      clase: "modal-documento",
      contenido: cont,
      botones: [{ texto: nueva ? "Guardar en la carpeta" : "Cerrar" }]
    }).promesa;
  };

  BIO.ui.abrirCarpeta = function () {
    const cap = BIO.cap();
    const cont = el("div", { class: "carpeta" });
    cont.appendChild(el("p", { class: "ayuda" }, "Aquí se guarda todo lo que encuentras. Ojo: no todo lo que guardas es un hecho, ni todo es relevante. Distinguirlo será parte de tu trabajo en el comité."));
    if (!cap || !cap.evidencias.length) {
      cont.appendChild(el("p", {}, "Tu carpeta está vacía. Explora la escena y revisa lo que encuentres."));
    } else {
      const ul = el("ul", { class: "lista-docs" });
      cap.evidencias.forEach(function (id) {
        const ev = BIO.evidencia(id);
        if (!ev) return;
        ul.appendChild(el("li", {}, el("button", { class: "doc-item", type: "button", onclick: function () { BIO.ui.mostrarEvidencia(id, false); } }, [
          el("span", { class: "doc-item-t" }, BIO.plano(ev.titulo)),
          el("span", { class: "doc-item-f" }, BIO.plano(ev.fuente || ""))
        ])));
      });
      cont.appendChild(ul);
    }
    // Carpetas de capítulos anteriores
    Object.keys(BIO.estado.caps).forEach(function (cid) {
      if (cid === BIO.estado.capActual) return;
      const c = BIO.estado.caps[cid], d = BIO.datos[cid];
      if (!d || !c.evidencias.length) return;
      const det = el("details", { class: "carpeta-anterior" }, el("summary", {}, "Capítulo " + d.numero + ": " + d.titulo + " (" + c.evidencias.length + ")"));
      const ul = el("ul", { class: "lista-docs" });
      c.evidencias.forEach(function (id) {
        const ev = d.evidencias[id];
        if (ev) ul.appendChild(el("li", {}, el("button", { class: "doc-item", type: "button", onclick: function () { BIO.ui.mostrarEvidencia(id, false); } }, BIO.plano(ev.titulo))));
      });
      det.appendChild(ul);
      cont.appendChild(det);
    });
    BIO.ui.modal({ titulo: "Carpeta de evidencias", contenido: cont, botones: [{ texto: "Cerrar" }] });
  };

  BIO.ui.abrirCuaderno = function () {
    const todos = BIO.datos.cuaderno || {};
    const total = Object.keys(todos).length;
    const cont = el("div", { class: "cuaderno" });
    cont.appendChild(el("p", { class: "ayuda" }, "Entradas breves y opcionales que se desbloquean al jugar. Desbloqueadas: " + BIO.estado.conceptos.length + " de " + total + "."));
    if (!BIO.estado.conceptos.length) cont.appendChild(el("p", {}, "Todavía no has desbloqueado conceptos."));
    BIO.estado.conceptos.forEach(function (id) {
      const c = todos[id];
      if (!c) return;
      const det = el("details", { class: "entrada" }, el("summary", {}, BIO.plano(c.concepto)));
      det.appendChild(BIO.fmt(c.definicion));
      if (c.referencia) det.appendChild(el("p", { class: "ref" }, [el("strong", {}, "Referencia: "), BIO.plano(c.referencia)]));
      if (c.ejemplo) det.appendChild(el("div", { class: "ejemplo" }, [el("strong", {}, "Ejemplo: "), BIO.fmt(c.ejemplo)]));
      cont.appendChild(det);
    });
    BIO.ui.modal({ titulo: "Cuaderno de conceptos", contenido: cont, botones: [{ texto: "Cerrar" }] });
  };

  BIO.ui.abrirGlosario = function () {
    const todos = BIO.datos.glosario || {};
    const total = Object.keys(todos).length;
    const cont = el("div", { class: "glosario" });
    cont.appendChild(el("p", { class: "ayuda" }, "Términos desbloqueados: " + BIO.estado.glosario.length + " de " + total + "."));
    const ids = BIO.estado.glosario.filter(function (id) { return todos[id]; })
      .sort(function (a, b) { return todos[a].termino.localeCompare(todos[b].termino, "es"); });
    if (!ids.length) cont.appendChild(el("p", {}, "Todavía no has desbloqueado términos."));
    const dl = el("dl");
    ids.forEach(function (id) {
      dl.appendChild(el("dt", {}, BIO.plano(todos[id].termino)));
      dl.appendChild(el("dd", {}, BIO.fmt(todos[id].definicion)));
    });
    cont.appendChild(dl);
    BIO.ui.modal({ titulo: "Glosario", contenido: cont, botones: [{ texto: "Cerrar" }] });
  };

  BIO.ui.abrirMenu = function () {
    const m = BIO.ui.modal({
      titulo: "Menú",
      contenido: el("div", { class: "menu-lista" }, [
        el("button", { class: "btn btn-bloque", type: "button", onclick: function () { m.cerrar(); BIO.mostrarCapitulos(); } }, "Capítulos"),
        el("button", { class: "btn btn-bloque", type: "button", onclick: function () { m.cerrar(); BIO.resumen.mostrar(); } }, "Mi resumen y descarga"),
        el("button", { class: "btn btn-bloque btn-sec", type: "button", onclick: function () { m.cerrar(); BIO.abrirAjustes(); } }, "Ajustes y accesibilidad"),
        el("button", { class: "btn btn-bloque btn-sec", type: "button", onclick: function () { m.cerrar(); BIO.docente.abrir(); } }, "Modo docente"),
        el("button", { class: "btn btn-bloque btn-sec", type: "button", onclick: function () { m.cerrar(); BIO.mostrarPortada(); } }, "Volver a la portada")
      ]),
      botones: [{ texto: "Cerrar", clase: "btn-sec" }]
    });
  };

  /* Retrato + nombre de quien habla (reutilizado en diálogos, deliberación, etc.) */
  BIO.ui.hablante = function (id) {
    if (!id || id === "narrador") return { nombre: "", narrador: true };
    if (id === "jugador") return { nombre: (BIO.estado.jugador && BIO.estado.jugador.nombre) || "Tú", rol: "Tú", jugador: true };
    const d = BIO.datosCap();
    return (d && d.personajes && d.personajes[id]) || (BIO.datos.comite && BIO.datos.comite[id]) || { nombre: id };
  };

  BIO.ui.voz = function (quien, texto) {
    const h = BIO.ui.hablante(quien);
    const caja = el("div", { class: "voz" });
    if (h.retrato) caja.appendChild(el("div", { class: "voz-retrato", html: BIO.arte.retrato(h.retrato) }));
    const cuerpo = el("div", { class: "voz-cuerpo" });
    if (h.nombre) cuerpo.appendChild(el("p", { class: "voz-nombre" }, [h.nombre, h.rol ? el("span", { class: "rol" }, " · " + h.rol) : null]));
    cuerpo.appendChild(BIO.fmt(texto));
    caja.appendChild(cuerpo);
    return caja;
  };
})();
