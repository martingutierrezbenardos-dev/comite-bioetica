/* =========================================================================
   MINIJUEGOS — marco común
   Cada capítulo define en sus datos:
   minijuegos: { id: { tipo: "lineaTiempo" | "relacionar" | ..., titulo,
                       instrucciones, pistas: [3 textos], exito, alCompletar: [...] } }
   ========================================================================= */
(function () {
  "use strict";
  const el = BIO.el;

  BIO.minijuegos = { tipos: {} };

  BIO.minijuegos.abrir = function (id) {
    const cfg = BIO.datosCap().minijuegos[id];
    if (!cfg) { console.error("Minijuego no encontrado:", id); return Promise.resolve(false); }
    const tipo = BIO.minijuegos.tipos[cfg.tipo];
    if (!tipo) { console.error("Tipo de minijuego desconocido:", cfg.tipo); return Promise.resolve(false); }
    const cap = BIO.cap();
    const reg = cap.minijuegos[id] = cap.minijuegos[id] || { completo: false, intentos: 0 };
    const yaCompleto = reg.completo;

    return new Promise(function (resolve) {
      const previo = BIO.pistas.contexto;
      BIO.pistas.fijar({ id: "mj." + id, titulo: cfg.titulo, pistas: cfg.pistas || [] });
      let completadoAhora = false;

      const zona = el("div", { class: "mj-zona" });
      const cont = el("div", { class: "minijuego mj-" + cfg.tipo }, [
        cfg.instrucciones ? el("div", { class: "mj-instrucciones" }, BIO.fmt(cfg.instrucciones)) : null,
        zona
      ]);
      const m = BIO.ui.modal({
        titulo: cfg.titulo,
        clase: "grande",
        contenido: cont,
        alCerrar: async function () {
          BIO.pistas.fijar(previo);
          BIO.guardado.guardar();
          if (completadoAhora && cfg.alCompletar) await BIO.ejecutar(cfg.alCompletar);
          BIO.escena.refrescar();
          resolve(completadoAhora);
        }
      });
      const acciones = el("div", { class: "mj-acciones" });
      m.pie.appendChild(el("button", { class: "btn btn-sec", type: "button", onclick: function () { BIO.pistas.abrir(); } }, "Pista"));
      m.pie.appendChild(acciones);

      const ctx = {
        cfg: cfg, reg: reg, cuerpo: zona, modal: m, yaCompleto: yaCompleto,
        guardar: function () { BIO.guardado.guardar(); },
        boton: function (texto, fn, clase) {
          const b = el("button", { class: "btn " + (clase || ""), type: "button", onclick: fn }, texto);
          acciones.appendChild(b);
          return b;
        },
        limpiarBotones: function () { acciones.innerHTML = ""; },
        mensaje: function (texto, tipoMsj) {
          let caja = zona.querySelector(".mj-mensaje");
          if (!caja) { caja = el("div", { class: "mj-mensaje", role: "status", tabindex: "-1" }); zona.prepend(caja); }
          caja.className = "mj-mensaje " + (tipoMsj || "");
          caja.innerHTML = "";
          caja.appendChild(BIO.fmt(texto));
          caja.focus({ preventScroll: false });
        },
        completar: function (resultado) {
          const primera = !reg.completo;
          reg.completo = true;
          reg.resultado = resultado || reg.resultado || {};
          reg.fin = new Date().toISOString();
          completadoAhora = primera;
          BIO.guardado.guardar();
          ctx.limpiarBotones();
          ctx.mensaje(cfg.exito || "¡Bien hecho! Actividad completada.", "exito");
          ctx.boton("Continuar", function () { m.cerrar(); });
        },
        cerrar: function () { m.cerrar(); }
      };
      tipo(ctx);
    });
  };
})();
