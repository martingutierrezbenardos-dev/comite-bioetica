/* =========================================================================
   PISTAS ESCALONADAS (3 niveles)
   - Durante la exploración: pistas del objetivo actual (datos: objetivos[].pistas)
   - Dentro de un puzle o de la deliberación: pistas de esa actividad.
   Las pistas no afectan la evaluación; solo se registran en el resumen.
   ========================================================================= */
(function () {
  "use strict";
  const el = BIO.el;

  BIO.pistas = {
    contexto: null,
    fijar: function (ctx) { this.contexto = ctx; },
    abrir: function () {
      let ctx = this.contexto;
      if (!ctx) {
        const o = BIO.objetivoActual();
        if (!o) { BIO.ui.aviso("Pistas", "No hay pistas para este momento. Explora con calma o revisa tu carpeta."); return; }
        ctx = { id: "obj." + o.id, titulo: o.texto, pistas: o.pistas || [] };
      }
      const cap = BIO.cap();
      if (!ctx.pistas || !ctx.pistas.length) { BIO.ui.aviso("Pistas", "No hay pistas para esta actividad."); return; }
      const cont = el("div", { class: "pistas" });
      const lista = el("ol", { class: "lista-pistas" });
      const btn = el("button", { class: "btn", type: "button" });
      function pintar() {
        const n = cap.pistas[ctx.id] || 0;
        lista.innerHTML = "";
        for (let i = 0; i < n; i++) lista.appendChild(el("li", {}, BIO.fmt(ctx.pistas[i])));
        if (n >= ctx.pistas.length) { btn.hidden = true; }
        else { btn.hidden = false; btn.textContent = n === 0 ? "Ver primera pista" : "Ver pista siguiente (" + (n + 1) + " de " + ctx.pistas.length + ")"; }
        if (n === 0) lista.appendChild(el("li", { class: "sin" }, "Las pistas van de más general a más específica. Úsalas cuando las necesites: no te quitan puntaje."));
      }
      btn.addEventListener("click", function () {
        cap.pistas[ctx.id] = Math.min((cap.pistas[ctx.id] || 0) + 1, ctx.pistas.length);
        BIO.guardado.guardar();
        pintar();
        const ult = lista.lastElementChild;
        if (ult) { ult.setAttribute("tabindex", "-1"); ult.focus(); }
      });
      cont.append(el("p", { class: "ayuda" }, "Para: " + BIO.plano(ctx.titulo || "")), lista, btn);
      pintar();
      BIO.ui.modal({ titulo: "Pistas", contenido: cont, botones: [{ texto: "Cerrar" }] });
    }
  };

  BIO.pistas.total = function (capId) {
    const c = BIO.estado.caps[capId];
    if (!c) return 0;
    return Object.keys(c.pistas).reduce(function (s, k) { return s + c.pistas[k]; }, 0);
  };
})();
