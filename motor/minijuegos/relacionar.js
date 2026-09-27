/* =========================================================================
   MINIJUEGO: RELACIONAR / CLASIFICAR
   Datos: { tipo: "relacionar",
            categorias: [ { id, nombre, descripcion } ],
            items: [ { id, texto, fuente, correctas: ["idCategoria", ...],
                       explicacion, pista } ] }
   Cada ítem se asigna a una categoría. Se aceptan varias respuestas
   correctas cuando el caso lo justifica (se explica en la retroalimentación).
   ========================================================================= */
(function () {
  "use strict";
  const el = BIO.el;

  BIO.minijuegos.tipos.relacionar = function (ctx) {
    const cfg = ctx.cfg, reg = ctx.reg;
    const p = reg.progreso = reg.progreso || { resp: {}, orden: BIO.mezclar(cfg.items.map(function (i) { return i.id; })) };
    let revisado = !!reg.completo;

    const leyenda = el("dl", { class: "rel-leyenda" });
    cfg.categorias.forEach(function (c) {
      leyenda.append(el("dt", {}, BIO.plano(c.nombre)), el("dd", {}, BIO.plano(c.descripcion || "")));
    });
    ctx.cuerpo.appendChild(el("details", { class: "rel-det", open: true }, [el("summary", {}, "Categorías"), leyenda]));

    const lista = el("div", { class: "rel-lista" });
    ctx.cuerpo.appendChild(lista);

    function item(id) { return cfg.items.find(function (i) { return i.id === id; }); }
    function esCorrecta(it) { return it.correctas.indexOf(p.resp[it.id]) >= 0; }

    function pintar() {
      lista.innerHTML = "";
      p.orden.forEach(function (id, n) {
        const it = item(id);
        if (!it) return;
        const nombre = "rel-" + ctx.cfg.titulo.length + "-" + id;
        const fs = el("fieldset", { class: "rel-item" + (revisado && p.resp[id] ? (esCorrecta(it) ? " correcto" : " incorrecto") : "") });
        fs.appendChild(el("legend", {}, [el("span", { class: "rel-n" }, (n + 1) + ". "), BIO.plano(it.texto)]));
        if (it.fuente) fs.appendChild(el("p", { class: "rel-fuente" }, BIO.plano(it.fuente)));
        const ops = el("div", { class: "chips", role: "radiogroup" });
        cfg.categorias.forEach(function (c) {
          const idInp = nombre + "-" + c.id;
          const inp = el("input", { type: "radio", name: nombre, id: idInp, value: c.id, onchange: function () {
            p.resp[id] = c.id; ctx.guardar();
            if (revisado && !reg.completo) { revisado = false; pintar(); const r = document.getElementById(idInp); if (r) r.focus(); }
          } });
          if (p.resp[id] === c.id) inp.checked = true;
          if (reg.completo) inp.disabled = true;
          ops.append(inp, el("label", { for: idInp, class: "chip" }, BIO.plano(c.nombre)));
        });
        fs.appendChild(ops);
        if (revisado && p.resp[id]) {
          const ok = esCorrecta(it);
          const fb = el("div", { class: "retro " + (ok ? "ok" : "no") });
          fb.appendChild(el("strong", {}, ok ? "✓ Bien. " : "✗ Revisa esta. "));
          fb.appendChild(BIO.fmt(ok ? it.explicacion : (it.pista || "No es la relación más directa. Vuelve a pensar qué se le hizo a la persona y qué principio protege justamente eso.")));
          fs.appendChild(fb);
        }
        lista.appendChild(fs);
      });
    }

    function comprobar() {
      const sin = cfg.items.filter(function (it) { return !p.resp[it.id]; }).length;
      if (sin) { ctx.mensaje("Te " + (sin === 1 ? "falta 1 ítem" : "faltan " + sin + " ítems") + " por relacionar.", "aviso"); return; }
      reg.intentos = (reg.intentos || 0) + 1;
      const buenos = cfg.items.filter(esCorrecta).length;
      if (reg.intentos === 1) reg.primerIntento = { buenos: buenos, total: cfg.items.length };
      revisado = true;
      ctx.guardar();
      pintar();
      if (buenos === cfg.items.length) ctx.completar({ intentos: reg.intentos, primerIntento: reg.primerIntento });
      else ctx.mensaje("Llevas **" + buenos + " de " + cfg.items.length + "** bien. Lee la retroalimentación, corrige y vuelve a comprobar.", "aviso");
    }

    pintar();
    if (reg.completo) { ctx.mensaje(cfg.exito || "Actividad completada.", "exito"); ctx.boton("Cerrar", ctx.cerrar); }
    else ctx.boton("Comprobar", comprobar);
  };
})();
