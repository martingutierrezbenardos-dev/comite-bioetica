/* =========================================================================
   MINIJUEGO: ENTREVISTA (p. ej., evaluar la capacidad para decidir)
   Datos: { tipo: "entrevista", persona: "idPersonaje", intro,
            criterios: [ { id, nombre, descripcion,
                           preguntas: [ { texto, buena: true|false,
                                          respuesta, comentario } ] } ],
            veredicto: { pregunta, opciones: [ { texto, correcta, explicacion } ] } }
   El estudiante elige qué preguntar para cada criterio. Las preguntas
   «buenas» cierran el criterio; las demás muestran por qué no sirven.
   Al final debe emitir un juicio fundado (veredicto).
   ========================================================================= */
(function () {
  "use strict";
  const el = BIO.el;

  BIO.minijuegos.tipos.entrevista = function (ctx) {
    const cfg = ctx.cfg, reg = ctx.reg;
    const p = reg.progreso = reg.progreso || { hechos: {}, log: [], primeras: {}, veredicto: null, intentosVeredicto: 0 };
    const persona = BIO.ui.hablante(cfg.persona);

    const zona = el("div", { class: "ent" });
    ctx.cuerpo.appendChild(zona);

    function pintar() {
      zona.innerHTML = "";
      if (cfg.intro) zona.appendChild(BIO.ui.voz(cfg.guia || "narrador", cfg.intro));
      cfg.criterios.forEach(function (c, ci) {
        const hecho = !!p.hechos[c.id];
        const sec = el("section", { class: "ent-criterio" + (hecho ? " hecho" : "") });
        sec.appendChild(el("h3", {}, [(ci + 1) + ". " + BIO.plano(c.nombre), hecho ? el("span", { class: "ent-ok" }, " ✓ evaluado") : null]));
        sec.appendChild(el("p", { class: "ayuda" }, BIO.plano(c.descripcion)));
        // Registro de lo ya preguntado en este criterio
        p.log.filter(function (l) { return l.c === c.id; }).forEach(function (l) {
          const q = c.preguntas[l.i];
          sec.appendChild(el("div", { class: "ent-turno" }, [
            el("p", { class: "ent-pregunta" }, [el("strong", {}, "Tú: "), BIO.plano(q.texto)]),
            BIO.ui.voz(cfg.persona, q.respuesta),
            el("div", { class: "retro " + (q.buena ? "ok" : "no") }, [el("strong", {}, q.buena ? "✓ Buena pregunta. " : "✗ Esta pregunta no evalúa bien el criterio. "), BIO.fmt(q.comentario)])
          ]));
        });
        if (!hecho) {
          const ops = el("div", { class: "respuestas" });
          c.preguntas.forEach(function (q, i) {
            if (p.log.some(function (l) { return l.c === c.id && l.i === i; })) return;
            ops.appendChild(el("button", { type: "button", class: "respuesta", onclick: function () {
              p.log.push({ c: c.id, i: i });
              if (p.primeras[c.id] == null) p.primeras[c.id] = !!q.buena;
              if (q.buena) p.hechos[c.id] = true;
              ctx.guardar();
              pintar();
              const secs = zona.querySelectorAll(".ent-criterio");
              const turnos = secs[ci].querySelectorAll(".ent-turno");
              const ult = turnos[turnos.length - 1];
              if (ult) { ult.setAttribute("tabindex", "-1"); ult.focus(); }
            } }, BIO.plano(q.texto)));
          });
          sec.appendChild(el("p", { class: "ayuda" }, "¿Qué le preguntas a " + (persona.nombre || "la persona") + "?"));
          sec.appendChild(ops);
        }
        zona.appendChild(sec);
      });

      const todos = cfg.criterios.every(function (c) { return p.hechos[c.id]; });
      if (!todos) return;
      const V = cfg.veredicto;
      const fs = el("fieldset", { class: "quiz-item ent-veredicto" }, el("legend", {}, BIO.plano(V.pregunta)));
      V.opciones.forEach(function (op, i) {
        const id = "ent-v-" + i;
        const inp = el("input", { type: "radio", name: "ent-veredicto", id: id, disabled: reg.completo ? true : null, onchange: function () { p.veredicto = i; ctx.guardar(); } });
        if (p.veredicto === i) inp.checked = true;
        fs.appendChild(el("div", { class: "casilla" }, [inp, el("label", { for: id }, BIO.plano(op.texto))]));
      });
      const retro = el("div", { class: "retro-slot", "aria-live": "polite" });
      fs.appendChild(retro);
      zona.appendChild(fs);
      if (p.veredicto != null && p.revisado) {
        const op = V.opciones[p.veredicto];
        retro.appendChild(el("div", { class: "retro " + (op.correcta ? "ok" : "no") }, [el("strong", {}, op.correcta ? "✓ " : "✗ "), BIO.fmt(op.explicacion)]));
      }
    }

    function comprobar() {
      const todos = cfg.criterios.every(function (c) { return p.hechos[c.id]; });
      if (!todos) { ctx.mensaje("Primero evalúa los " + cfg.criterios.length + " criterios con buenas preguntas.", "aviso"); return; }
      if (p.veredicto == null) { ctx.mensaje("Elige tu conclusión antes de comprobar.", "aviso"); return; }
      p.intentosVeredicto++;
      p.revisado = true;
      reg.intentos = p.intentosVeredicto;
      if (!reg.primerIntento) {
        const buenas = cfg.criterios.filter(function (c) { return p.primeras[c.id]; }).length;
        reg.primerIntento = { buenos: buenas, total: cfg.criterios.length };
      }
      ctx.guardar();
      pintar();
      if (cfg.veredicto.opciones[p.veredicto].correcta) ctx.completar({ intentos: p.intentosVeredicto });
      else ctx.mensaje("Lee la explicación bajo tu respuesta y vuelve a pensar tu conclusión.", "aviso");
    }

    pintar();
    if (reg.completo) { ctx.mensaje(cfg.exito || "Actividad completada.", "exito"); ctx.boton("Cerrar", ctx.cerrar); }
    else ctx.boton("Comprobar conclusión", comprobar);
  };
})();
