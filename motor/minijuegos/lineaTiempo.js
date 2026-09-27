/* =========================================================================
   MINIJUEGO: LÍNEA DE TIEMPO
   Datos: { tipo: "lineaTiempo", grupo: "linea", distractores: [ids],
            etiquetaDescarte: "..." }
   Usa las evidencias del grupo (con campo "fecha" numérico y "etiquetaLinea").
   Interacción accesible: seleccionar tarjeta → elegir casillero.
   Evidencias con la misma fecha son intercambiables.
   ========================================================================= */
(function () {
  "use strict";
  const el = BIO.el;

  BIO.minijuegos.tipos.lineaTiempo = function (ctx) {
    const cfg = ctx.cfg, reg = ctx.reg;
    const d = BIO.datosCap(), cap = BIO.cap();
    const items = Object.keys(d.evidencias).filter(function (id) { return d.evidencias[id].grupo === cfg.grupo; });
    const faltan = items.filter(function (id) { return cap.evidencias.indexOf(id) < 0; });

    if (faltan.length) {
      ctx.cuerpo.appendChild(BIO.fmt("Todavía te " + (faltan.length === 1 ? "falta **1 documento**" : "faltan **" + faltan.length + " documentos**") + " para armar la línea de tiempo. Sigue revisando el archivo: estantes, escritorio, lector de microfichas y archivador.\n\nConsejo: pulsa **H** para resaltar todo lo que se puede revisar."));
      ctx.boton("Seguir buscando", ctx.cerrar);
      return;
    }

    const distractores = (cfg.distractores || []).filter(function (id) { return cap.evidencias.indexOf(id) >= 0; });
    const todos = items.concat(distractores);
    const p = reg.progreso = reg.progreso || { orden: BIO.mezclar(todos), casilleros: items.map(function () { return null; }), descarte: [] };
    todos.forEach(function (id) { if (p.orden.indexOf(id) < 0) p.orden.push(id); });
    const fechasOrdenadas = items.map(function (id) { return d.evidencias[id].fecha; }).sort(function (a, b) { return a - b; });

    let seleccion = null;      // id seleccionado
    let revision = null;       // resultado de la última comprobación

    const mesa = el("div", { class: "lt-mesa", role: "group", "aria-label": "Documentos sobre la mesa" });
    const linea = el("ol", { class: "lt-linea", "aria-label": "Línea de tiempo, de lo más antiguo a lo más reciente" });
    const descarte = el("div", { class: "lt-descarte" });
    ctx.cuerpo.append(
      el("h3", { class: "mj-sub" }, "Sobre la mesa"), mesa,
      el("h3", { class: "mj-sub" }, "Pizarra: de lo más antiguo (1) a lo más reciente (" + items.length + ")"), linea,
      descarte
    );

    function etiqueta(id) { const ev = d.evidencias[id]; return BIO.plano(ev.etiquetaLinea || ev.titulo); }
    function ubicacion(id) {
      const i = p.casilleros.indexOf(id);
      if (i >= 0) return { tipo: "casillero", i: i };
      if (p.descarte.indexOf(id) >= 0) return { tipo: "descarte" };
      return { tipo: "mesa" };
    }
    function quitar(id) {
      const u = ubicacion(id);
      if (u.tipo === "casillero") p.casilleros[u.i] = null;
      if (u.tipo === "descarte") p.descarte.splice(p.descarte.indexOf(id), 1);
    }
    function seleccionar(id) {
      seleccion = seleccion === id ? null : id;
      revision = null;
      pintar();
      const b = seleccion ? ctx.cuerpo.querySelector('[data-id="' + seleccion + '"]') : null;
      if (b) b.focus();
      if (seleccion) BIO.anunciar("Seleccionaste «" + etiqueta(seleccion) + "». Ahora elige un casillero o la bandeja de descarte.");
    }
    function colocarEn(i) {
      if (!seleccion) {
        if (p.casilleros[i]) seleccionar(p.casilleros[i]);
        return;
      }
      const ocupante = p.casilleros[i];
      const origen = ubicacion(seleccion);
      quitar(seleccion);
      if (ocupante && ocupante !== seleccion) {
        // intercambio: el ocupante va al lugar de origen
        if (origen.tipo === "casillero") p.casilleros[origen.i] = ocupante;
        else if (origen.tipo === "descarte") p.descarte.push(ocupante);
      }
      p.casilleros[i] = seleccion;
      BIO.anunciar("«" + etiqueta(seleccion) + "» en el casillero " + (i + 1) + ".");
      seleccion = null; revision = null;
      ctx.guardar(); pintar();
      const c = linea.querySelectorAll(".lt-casillero")[i];
      if (c) c.focus();
    }
    function descartar() {
      if (!seleccion) return;
      quitar(seleccion);
      p.descarte.push(seleccion);
      BIO.anunciar("«" + etiqueta(seleccion) + "» en la bandeja de descarte.");
      seleccion = null; revision = null;
      ctx.guardar(); pintar();
    }
    function devolver() {
      if (!seleccion) return;
      quitar(seleccion);
      seleccion = null; revision = null;
      ctx.guardar(); pintar();
    }

    function tarjeta(id) {
      return el("div", { class: "lt-tarjeta-envoltura" }, [
        el("button", {
          class: "tarjeta" + (seleccion === id ? " seleccionada" : ""),
          type: "button", "data-id": id,
          "aria-pressed": seleccion === id ? "true" : "false",
          onclick: function () { seleccionar(id); }
        }, etiqueta(id)),
        el("button", { class: "btn-mini", type: "button", "aria-label": "Leer «" + etiqueta(id) + "»", onclick: function () { BIO.ui.mostrarEvidencia(id, false); } }, "Leer")
      ]);
    }

    function pintar() {
      mesa.innerHTML = "";
      const enMesa = p.orden.filter(function (id) { return ubicacion(id).tipo === "mesa"; });
      if (!enMesa.length) mesa.appendChild(el("p", { class: "vacio" }, "No quedan documentos sobre la mesa."));
      enMesa.forEach(function (id) { mesa.appendChild(tarjeta(id)); });

      linea.innerHTML = "";
      p.casilleros.forEach(function (id, i) {
        let estado = "";
        if (revision && id) estado = revision.ok[i] ? " correcto" : " incorrecto";
        const etq = id ? etiqueta(id) : "vacío";
        linea.appendChild(el("li", { class: "lt-item" }, [
          el("button", {
            class: "lt-casillero" + (id ? " lleno" : "") + (id && seleccion === id ? " seleccionada" : "") + estado,
            type: "button", "data-id": id || "",
            "aria-label": "Casillero " + (i + 1) + ": " + etq + (estado === " correcto" ? " (bien ubicado)" : estado === " incorrecto" ? " (revisar)" : ""),
            onclick: function () { colocarEn(i); }
          }, [el("span", { class: "lt-num" }, String(i + 1)), el("span", { class: "lt-etq" }, id ? etq : "—"),
              estado ? el("span", { class: "lt-marca", "aria-hidden": "true" }, revision.ok[i] ? "✓" : "✗") : null])
        ]));
      });

      descarte.innerHTML = "";
      descarte.appendChild(el("button", {
        class: "lt-bandeja" + (seleccion ? " activa" : ""), type: "button",
        onclick: descartar
      }, [el("strong", {}, cfg.etiquetaDescarte || "No va en la línea de tiempo"), el("span", { class: "ayuda" }, seleccion ? " (pulsa para dejar aquí la tarjeta seleccionada)" : " (selecciona primero una tarjeta)")]));
      if (p.descarte.length) {
        const ul = el("ul", { class: "lt-descartados" });
        p.descarte.forEach(function (id) {
          ul.appendChild(el("li", {}, el("button", { class: "tarjeta chica" + (seleccion === id ? " seleccionada" : ""), type: "button", "data-id": id, "aria-pressed": seleccion === id ? "true" : "false", onclick: function () { seleccionar(id); } }, etiqueta(id))));
        });
        descarte.appendChild(ul);
      }
      btnDevolver.disabled = !seleccion || ubicacion(seleccion).tipo === "mesa";
    }

    function comprobar() {
      if (p.casilleros.some(function (x) { return !x; })) {
        ctx.mensaje("Aún hay casilleros vacíos. Ubica todos los documentos que correspondan a la línea de tiempo.", "aviso");
        return;
      }
      const malDescartados = p.descarte.filter(function (id) { return items.indexOf(id) >= 0; });
      const distractoresEnMesa = distractores.filter(function (id) { return ubicacion(id).tipo === "mesa"; });
      reg.intentos = (reg.intentos || 0) + 1;
      const ok = p.casilleros.map(function (id, i) { return d.evidencias[id].fecha === fechasOrdenadas[i]; });
      const buenos = ok.filter(Boolean).length;
      revision = { ok: ok };
      pintar();
      ctx.guardar();
      if (buenos === items.length && !malDescartados.length && !distractoresEnMesa.length) {
        ctx.completar({ intentos: reg.intentos });
        return;
      }
      let msj = "Llevas **" + buenos + " de " + items.length + "** documentos bien ubicados (marcados con ✓).";
      if (distractoresEnMesa.length) msj += "\n\nQuedan papeles sobre la mesa. ¿Todos cuentan la historia de la ética de la investigación? Si alguno no, déjalo en la bandeja de descarte.";
      if (malDescartados.length) msj += "\n\nOjo: descartaste algo que sí forma parte de esta historia.";
      if (buenos < items.length) msj += "\n\nSi dudas de una fecha, usa el botón **Leer** de cada tarjeta. Pista: fíjate en cuándo *empezó* cada cosa.";
      ctx.mensaje(msj, "aviso");
    }

    const btnDevolver = ctx.boton("Devolver a la mesa", devolver, "btn-sec");
    ctx.boton("Comprobar", comprobar);
    if (reg.completo) { revision = { ok: p.casilleros.map(function () { return true; }) }; }
    pintar();
    if (reg.completo) { ctx.limpiarBotones(); ctx.mensaje(cfg.exito || "Actividad completada.", "exito"); ctx.boton("Cerrar", ctx.cerrar); }
  };
})();
