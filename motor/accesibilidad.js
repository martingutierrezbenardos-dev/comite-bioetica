/* =========================================================================
   ACCESIBILIDAD Y AJUSTES
   Tamaño de texto, alto contraste, resaltado de zonas (tecla H),
   animaciones reducidas. Sin presión de tiempo en ningún lugar del juego.
   ========================================================================= */
(function () {
  "use strict";
  const el = BIO.el;

  BIO.animaciones = function () {
    if (!BIO.estado.ajustes.animaciones) return false;
    return !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  };

  BIO.aplicarAjustes = function () {
    const a = BIO.estado.ajustes, r = document.documentElement;
    r.style.setProperty("--escala", a.escala);
    if (a.contraste) r.setAttribute("data-contraste", ""); else r.removeAttribute("data-contraste");
    if (a.animaciones) r.removeAttribute("data-sin-animacion"); else r.setAttribute("data-sin-animacion", "");
    document.body.classList.toggle("resaltar", !!a.resaltar);
    const b = BIO.$("#btn-resaltar");
    if (b) b.setAttribute("aria-pressed", a.resaltar ? "true" : "false");
    if (BIO.escena && BIO.escena.ajustarTamano) BIO.escena.ajustarTamano();
  };

  BIO.alternarResaltado = function () {
    BIO.estado.ajustes.resaltar = !BIO.estado.ajustes.resaltar;
    BIO.aplicarAjustes();
    BIO.guardado.guardar();
    BIO.ui.toast(BIO.estado.ajustes.resaltar ? "Zonas interactivas resaltadas" : "Resaltado desactivado");
  };

  document.addEventListener("keydown", function (e) {
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "h" || e.key === "H") {
      const juego = BIO.$("#pantalla-juego");
      if (juego && !juego.hidden) { e.preventDefault(); BIO.alternarResaltado(); }
    }
  });

  BIO.abrirAjustes = function () {
    const a = BIO.estado.ajustes;
    const valorEscala = el("output", { class: "valor" }, Math.round(a.escala * 100) + "%");
    function cambiarEscala(d) {
      a.escala = Math.max(0.85, Math.min(1.6, Math.round((a.escala + d) * 100) / 100));
      valorEscala.textContent = Math.round(a.escala * 100) + "%";
      BIO.aplicarAjustes(); BIO.guardado.guardar();
    }
    function casilla(etiqueta, clave, ayuda) {
      const id = "aj-" + clave;
      const inp = el("input", { type: "checkbox", id: id, onchange: function () { a[clave] = inp.checked; BIO.aplicarAjustes(); BIO.guardado.guardar(); } });
      inp.checked = !!a[clave];
      return el("div", { class: "ajuste" }, [inp, el("label", { for: id }, [etiqueta, ayuda ? el("span", { class: "ayuda" }, ayuda) : null])]);
    }
    const guarda = BIO.guardado.disponible();
    const cont = el("div", { class: "ajustes" }, [
      el("div", { class: "ajuste" }, [
        el("span", { id: "aj-tam" }, "Tamaño del texto"),
        el("div", { class: "grupo-botones", role: "group", "aria-labelledby": "aj-tam" }, [
          el("button", { class: "btn btn-sec", type: "button", "aria-label": "Achicar texto", onclick: function () { cambiarEscala(-0.1); } }, "A−"),
          valorEscala,
          el("button", { class: "btn btn-sec", type: "button", "aria-label": "Agrandar texto", onclick: function () { cambiarEscala(0.1); } }, "A+")
        ])
      ]),
      casilla("Alto contraste", "contraste"),
      casilla("Resaltar zonas interactivas", "resaltar", " (también con la tecla H)"),
      casilla("Animaciones", "animaciones", " (transiciones suaves y lluvia)"),
      el("p", { class: "estado-guardado " + (guarda ? "ok" : "no") }, guarda
        ? "El guardado automático está activo en este navegador."
        : "Este navegador no permite guardar. Puedes jugar igual, pero el progreso se perderá al cerrar la pestaña. Descarga tu resumen antes de salir."),
      el("details", { class: "atajos" }, [
        el("summary", {}, "Atajos de teclado"),
        el("ul", {}, [
          el("li", {}, "Tab / Mayús+Tab: moverse entre elementos."),
          el("li", {}, "Enter o Espacio: activar."),
          el("li", {}, "H: resaltar las zonas interactivas de la escena."),
          el("li", {}, "1 a 9: elegir una opción en las conversaciones."),
          el("li", {}, "Esc: cerrar ventanas.")
        ])
      ])
    ]);
    BIO.ui.modal({ titulo: "Ajustes y accesibilidad", contenido: cont, botones: [
      { texto: "Borrar mi progreso", clase: "btn-peligro", cierra: false, accion: function (api) {
        BIO.ui.confirmar("¿Seguro? Se borrará todo tu avance, tus decisiones y tus reflexiones en este navegador. **No se puede deshacer.** Si necesitas entregarlas, descarga antes tu resumen.", "Sí, borrar todo").then(function (ok) {
          if (!ok) return;
          api.cerrar();
          BIO.guardado.borrar();
          BIO.mostrarPortada();
          BIO.ui.toast("Progreso borrado");
        });
      } },
      { texto: "Listo" }
    ] });
  };
})();
