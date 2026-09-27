/* =========================================================================
   ARRANQUE Y PANTALLAS PRINCIPALES
   Portada → Registro (nombre, curso, forma de trato) → Capítulos → Juego
   ========================================================================= */
(function () {
  "use strict";
  const el = BIO.el;

  BIO.pantalla = function (nombre) {
    BIO.$$(".pantalla").forEach(function (p) { p.hidden = p.id !== "pantalla-" + nombre; });
    document.body.dataset.pantalla = nombre;
    if (nombre === "juego") BIO.escena.ajustarTamano();
    const h = BIO.$("#pantalla-" + nombre + " h1");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    window.scrollTo(0, 0);
  };

  /* ---------- Portada ---------- */
  BIO.mostrarPortada = function () {
    const cfg = BIO.datos.config;
    const p = BIO.$("#pantalla-portada");
    p.innerHTML = "";
    const hay = !!BIO.estado.jugador;
    p.appendChild(el("div", { class: "portada-arte", "aria-hidden": "true", html: BIO.arte.escenas.portada().replace("xMidYMid meet", "xMidYMid slice") }));
    p.appendChild(el("div", { class: "portada-caja" }, [
      el("h1", {}, cfg.tituloJuego),
      el("p", { class: "portada-sub" }, cfg.subtituloJuego),
      el("p", { class: "portada-lugar" }, cfg.hospital + " · " + cfg.ciudad),
      el("div", { class: "grupo-botones vertical" }, [
        hay ? el("button", { class: "btn btn-grande", type: "button", onclick: BIO.mostrarCapitulos }, "Continuar (" + BIO.estado.jugador.nombre + ")") : null,
        el("button", { class: "btn btn-grande" + (hay ? " btn-sec" : ""), type: "button", onclick: nuevaPartida }, "Nueva partida"),
        el("button", { class: "btn btn-sec", type: "button", onclick: BIO.abrirAjustes }, "Ajustes y accesibilidad"),
        el("button", { class: "btn btn-sec", type: "button", onclick: BIO.docente.abrir }, "Modo docente")
      ]),
      el("p", { class: "portada-nota" }, cfg.textos.creditos)
    ]));
    BIO.pantalla("portada");
  };

  function nuevaPartida() {
    if (BIO.estado.jugador) {
      BIO.ui.confirmar("Ya hay una partida guardada de **" + BIO.estado.jugador.nombre + "** en este navegador. Si empiezas una nueva, se borrará. ¿Quieres descargar antes el resumen?", "Empezar de nuevo", "Cancelar").then(function (ok) {
        if (ok) { BIO.guardado.borrar(); mostrarRegistro(); }
      });
    } else mostrarRegistro();
  }

  /* ---------- Registro ---------- */
  function mostrarRegistro() {
    const cfg = BIO.datos.config;
    const p = BIO.$("#pantalla-registro");
    p.innerHTML = "";
    const nombre = el("input", { id: "reg-nombre", type: "text", autocomplete: "given-name", required: true, maxlength: "40" });
    const apellido = el("input", { id: "reg-apellido", type: "text", autocomplete: "family-name", maxlength: "40" });
    const curso = el("input", { id: "reg-curso", type: "text", placeholder: "Ej.: 3° medio B", required: true, maxlength: "20" });
    const tratos = el("fieldset", { class: "tratos" }, el("legend", {}, "¿Cómo prefieres que el juego se dirija a ti?"));
    cfg.tratos.forEach(function (t, i) {
      const id = "reg-trato-" + i;
      const r = el("input", { type: "radio", name: "trato", id: id, value: String(i) });
      if (i === 0) r.checked = true;
      tratos.appendChild(el("div", { class: "casilla" }, [r, el("label", { for: id }, [el("strong", {}, t.etiqueta), el("span", { class: "ayuda" }, " — " + t.ejemplo)])]));
    });
    const error = el("p", { class: "error", role: "alert" });
    const form = el("form", { class: "registro", novalidate: true, onsubmit: function (e) {
      e.preventDefault();
      if (!nombre.value.trim() || !curso.value.trim()) { error.textContent = "Escribe tu nombre y tu curso para continuar."; (nombre.value.trim() ? curso : nombre).focus(); return; }
      const t = Number((form.querySelector("input[name=trato]:checked") || {}).value || 0);
      BIO.estado.jugador = { nombre: nombre.value.trim(), apellido: apellido.value.trim(), curso: curso.value.trim(), trato: t };
      BIO.guardado.guardar();
      BIO.mostrarCapitulos();
    } }, [
      el("label", { for: "reg-nombre" }, "Nombre"), nombre,
      el("label", { for: "reg-apellido" }, "Apellido (opcional)"), apellido,
      el("label", { for: "reg-curso" }, "Curso"), curso,
      tratos,
      el("p", { class: "privacidad" }, cfg.textos.privacidad),
      error,
      el("div", { class: "grupo-botones" }, [
        el("button", { class: "btn btn-sec", type: "button", onclick: BIO.mostrarPortada }, "Volver"),
        el("button", { class: "btn", type: "submit" }, "Comenzar")
      ])
    ]);
    p.appendChild(el("div", { class: "pantalla-caja" }, [el("h1", {}, "Antes de empezar"), el("p", {}, cfg.textos.bienvenidaRegistro), form]));
    BIO.pantalla("registro");
  }

  /* ---------- Capítulos ---------- */
  function estadoCapitulo(c, i, lista) {
    if (!BIO.datos[c.id]) return { id: "prep", texto: "En preparación", jugable: false };
    if (!BIO.docente.capActivo(c.id)) return { id: "off", texto: "Desactivado por tu docente", jugable: BIO.docente.activo };
    const prog = BIO.estado.caps[c.id];
    if (prog && prog.estado === "completo") return { id: "ok", texto: "Completado", jugable: true };
    if (prog) return { id: "curso", texto: "En curso", jugable: true };
    if (BIO.docente.activo) return { id: "libre", texto: "Disponible (modo docente)", jugable: true };
    // Desbloqueo: todos los capítulos activos anteriores deben estar completos
    const pendientes = lista.slice(0, i).filter(function (a) {
      return BIO.datos[a.id] && BIO.docente.capActivo(a.id) && !(BIO.estado.caps[a.id] && BIO.estado.caps[a.id].estado === "completo");
    });
    if (pendientes.length) return { id: "bloq", texto: "Se desbloquea al completar el capítulo " + pendientes[pendientes.length - 1].numero, jugable: false };
    return { id: "libre", texto: "Disponible", jugable: true };
  }

  BIO.mostrarCapitulos = function () {
    if (!BIO.estado.jugador) { BIO.mostrarPortada(); return; }
    const cfg = BIO.datos.config;
    const p = BIO.$("#pantalla-capitulos");
    p.innerHTML = "";
    const lista = el("ol", { class: "caps" });
    cfg.capitulos.forEach(function (c, i, arr) {
      const e = estadoCapitulo(c, i, arr);
      const prog = BIO.estado.caps[c.id];
      const botones = [];
      if (e.jugable) {
        botones.push(el("button", { class: "btn", type: "button", onclick: function () { BIO.iniciarCapitulo(c.id); } }, prog ? (prog.estado === "completo" ? "Revisitar" : "Continuar") : "Jugar"));
        if (prog) botones.push(el("button", { class: "btn btn-sec", type: "button", onclick: function () { reiniciarCapitulo(c.id); } }, "Empezar de nuevo"));
      }
      lista.appendChild(el("li", { class: "cap-tarjeta estado-" + e.id }, [
        el("div", { class: "cap-num", "aria-hidden": "true" }, String(c.numero)),
        el("div", { class: "cap-info" }, [
          el("h2", {}, "Capítulo " + c.numero + ": " + c.titulo),
          el("p", { class: "cap-sub" }, c.subtitulo + (c.opcional ? " (opcional)" : "")),
          el("p", { class: "cap-conceptos" }, c.conceptos.join(" · ")),
          el("p", { class: "cap-estado" }, [el("span", { class: "sr" }, "Estado: "), e.texto, c.duracion ? " · " + c.duracion : ""]),
          botones.length ? el("div", { class: "grupo-botones" }, botones) : null
        ])
      ]));
    });
    p.appendChild(el("div", { class: "pantalla-caja ancha" }, [
      el("div", { class: "caps-cabeza" }, [
        el("h1", {}, "Capítulos"),
        el("p", {}, [BIO.estado.jugador.nombre + " · " + BIO.estado.jugador.curso, BIO.docente.activo ? el("span", { class: "etiqueta-docente" }, " Modo docente") : null])
      ]),
      lista,
      el("div", { class: "grupo-botones" }, [
        el("button", { class: "btn btn-sec", type: "button", onclick: BIO.resumen.mostrar }, "Mi resumen y descarga"),
        el("button", { class: "btn btn-sec", type: "button", onclick: BIO.abrirAjustes }, "Ajustes"),
        el("button", { class: "btn btn-sec", type: "button", onclick: BIO.docente.abrir }, "Modo docente"),
        el("button", { class: "btn btn-sec", type: "button", onclick: BIO.mostrarPortada }, "Portada")
      ])
    ]));
    BIO.pantalla("capitulos");
  };

  function reiniciarCapitulo(id) {
    BIO.ui.confirmar("Se borrará tu avance en este capítulo, incluidas tus decisiones y reflexiones. Si necesitas entregarlas, descarga antes tu resumen. ¿Continuar?", "Sí, empezar de nuevo").then(function (ok) {
      if (!ok) return;
      delete BIO.estado.caps[id];
      BIO.guardado.guardar();
      BIO.iniciarCapitulo(id);
    });
  }

  /* ---------- Iniciar o retomar un capítulo ---------- */
  BIO.iniciarCapitulo = async function (id) {
    const d = BIO.datos[id];
    if (!d) return;
    if (d.aviso) {
      let seguir = false;
      const cont = el("div", {}, [BIO.fmt(d.aviso.texto)]);
      await BIO.ui.modal({ titulo: d.aviso.titulo, contenido: cont, botones: [
        { texto: "Volver a los capítulos", clase: "btn-sec" },
        { texto: "Continuar", accion: function () { seguir = true; } }
      ] }).promesa;
      if (!seguir) return;
    }
    const nuevo = !BIO.estado.caps[id];
    BIO.estado.capActual = id;
    const cap = BIO.cap(id);
    BIO.pistas.fijar(null);
    BIO.pantalla("juego");
    if (nuevo || !cap.escena) {
      cap.escena = d.inicio.escena;
      BIO.guardado.guardar();
      BIO.$("#arte").innerHTML = "";
      BIO.$("#zonas").innerHTML = "";
      await BIO.ui.modal({
        titulo: "Capítulo " + d.numero + ": " + d.titulo,
        clase: "modal-titulo-cap",
        contenido: el("div", {}, [el("p", { class: "cap-sub" }, d.subtitulo), BIO.fmt(d.intro)]),
        botones: [{ texto: "Comenzar" }]
      }).promesa;
      await BIO.escena.render(true);
      if (d.inicio.efectos) await BIO.ejecutar(d.inicio.efectos);
    } else {
      await BIO.escena.render(true);
      BIO.ui.toast("Continúas donde quedaste");
    }
  };

  /* ---------- Barra superior ---------- */
  function conectarBarra() {
    const acciones = {
      "btn-carpeta": BIO.ui.abrirCarpeta,
      "btn-cuaderno": BIO.ui.abrirCuaderno,
      "btn-glosario": BIO.ui.abrirGlosario,
      "btn-pista": function () { BIO.pistas.abrir(); },
      "btn-resaltar": BIO.alternarResaltado,
      "btn-ajustes": BIO.abrirAjustes,
      "btn-menu": BIO.ui.abrirMenu
    };
    Object.keys(acciones).forEach(function (id) {
      const b = document.getElementById(id);
      if (b) b.addEventListener("click", acciones[id]);
    });
  }

  /* ---------- Inicio ---------- */
  function iniciar() {
    BIO.guardado.cargar();
    BIO.aplicarAjustes();
    conectarBarra();
    BIO.mostrarPortada();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
