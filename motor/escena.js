/* =========================================================================
   ESCENAS
   Dibuja el arte SVG de la escena y, encima, las zonas clicables como
   botones reales (navegables con teclado y lectores de pantalla).
   ========================================================================= */
(function () {
  "use strict";
  const el = BIO.el;
  const E = BIO.escena = { ocupado: false };

  /* La escena mantiene proporción 16:9 y cabe completa en el espacio disponible */
  E.ajustarTamano = function () {
    const cont = BIO.$("#escenario"), m = BIO.$("#marco");
    if (!cont || !m || cont.offsetParent === null) return;
    const cw = cont.clientWidth, ch = cont.clientHeight;
    if (!cw || !ch) return;
    const w = Math.min(cw, ch * 16 / 9);
    m.style.width = Math.floor(w) + "px";
    m.style.height = Math.floor(w * 9 / 16) + "px";
  };
  window.addEventListener("resize", E.ajustarTamano);
  if (window.ResizeObserver) {
    document.addEventListener("DOMContentLoaded", function () {
      const c = BIO.$("#escenario");
      if (c) new ResizeObserver(E.ajustarTamano).observe(c);
    });
  }

  E.actual = function () {
    const d = BIO.datosCap(), cap = BIO.cap();
    return d && cap && d.escenas[cap.escena];
  };

  E.ir = async function (id) {
    const d = BIO.datosCap();
    if (!d.escenas[id]) { console.error("La escena no existe:", id); return; }
    BIO.cap().escena = id;
    BIO.guardado.guardar();
    await E.render(true);
  };

  function contextoArte() {
    return {
      b: function (n) { return BIO.cumple("bandera:" + n); },
      cumple: BIO.cumple
    };
  }

  function dibujar(esc) {
    const arte = BIO.$("#arte"), zonas = BIO.$("#zonas");
    const fn = BIO.arte.escenas && BIO.arte.escenas[esc.arte];
    arte.innerHTML = fn ? fn(contextoArte()) : '<svg viewBox="0 0 1600 900"><rect width="1600" height="900" fill="#e9dcc6"/></svg>';
    zonas.innerHTML = "";
    zonas.setAttribute("aria-label", "Zonas interactivas: " + BIO.plano(esc.titulo || ""));
    const cap = BIO.cap();
    (esc.hotspots || []).forEach(function (h) {
      if (!BIO.cumple(h.si)) return;
      const visto = !!cap.vistas[esc.id + "." + h.id];
      const clases = ["hotspot", h.tipo || "objeto", visto ? "visto" : "", h.etiquetaArriba ? "etq-arriba" : ""].join(" ");
      const b = el("button", {
        class: clases,
        type: "button",
        "data-hs": h.id,
        "aria-label": BIO.plano(h.etiqueta) + (visto ? " (revisado)" : ""),
        style: { left: h.x + "%", top: h.y + "%", width: h.w + "%", height: h.h + "%" },
        onclick: function () { E.activar(esc, h); }
      }, [
        h.tipo === "salida" ? el("span", { class: "hs-flecha flecha-" + (h.direccion || "der"), "aria-hidden": "true" }) : null,
        el("span", { class: "hs-etiqueta", "aria-hidden": "true" }, BIO.plano(h.etiqueta)),
        visto && h.tipo !== "salida" ? el("span", { class: "hs-visto", "aria-hidden": "true" }, "✓") : null
      ]);
      zonas.appendChild(b);
    });
  }

  E.render = async function (entrando) {
    const esc = E.actual();
    if (!esc) return;
    const marco = BIO.$("#marco");
    if (entrando && BIO.animaciones()) {
      marco.classList.add("fundido");
      await BIO.esperar(200);
    }
    dibujar(esc);
    marco.classList.remove("fundido");
    E.ajustarTamano();
    BIO.ui.actualizarBarra();
    if (entrando) {
      BIO.ui.narrar(esc.descripcion, esc.titulo);
      const primero = BIO.$("#zonas .hotspot");
      const ae = document.activeElement;
      if (primero && (!ae || ae === document.body || BIO.$("#zonas").contains(ae) || ae.closest("#pantalla-juego"))) primero.focus({ preventScroll: true });
      if (esc.alEntrar) {
        for (const r of esc.alEntrar) {
          if (BIO.cap().escena !== esc.id) return;
          if (BIO.cumple(r.si)) await BIO.ejecutar(r.efectos);
        }
        if (BIO.cap().escena === esc.id) E.refrescar();
      }
    }
  };

  E.refrescar = function () {
    const esc = E.actual();
    if (!esc || BIO.$("#pantalla-juego").hidden) return;
    const ae = document.activeElement;
    const foco = ae && ae.dataset ? ae.dataset.hs : null;
    dibujar(esc);
    if (foco) {
      // Si la zona que tenía el foco desapareció, pasar a la primera disponible
      const b = BIO.$('#zonas [data-hs="' + foco + '"]') || BIO.$("#zonas .hotspot");
      if (b) b.focus({ preventScroll: true });
    }
    BIO.ui.actualizarBarra();
  };

  E.activar = async function (esc, h) {
    if (E.ocupado) return;
    E.ocupado = true;
    try {
      BIO.cap().vistas[esc.id + "." + h.id] = true;
      if (h.texto) BIO.ui.narrar(h.texto, h.etiqueta);
      await BIO.ejecutar(h.acciones, { releer: true });
    } finally {
      E.ocupado = false;
      E.refrescar();
      // Tras cerrar ventanas, devolver el foco a la zona (si sigue existiendo)
      const b = BIO.$('#zonas [data-hs="' + h.id + '"]');
      const ae = document.activeElement;
      if (b && (!ae || ae === document.body)) b.focus({ preventScroll: true });
    }
  };
})();
