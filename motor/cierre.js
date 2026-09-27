/* =========================================================================
   CIERRE DE CAPÍTULO
   Preguntas de reflexión abierta (se responden por escrito) y preguntas de
   comprobación de conceptos (opción múltiple con retroalimentación).
   Datos: cierre: { reflexiones: [{id, pregunta}],
                    quiz: [{id, pregunta, opciones:[{texto, correcta, explicacion}]}],
                    alTerminar: [...] }
   ========================================================================= */
(function () {
  "use strict";
  const el = BIO.el;

  BIO.cierre = {};

  BIO.cierre.abrir = function () {
    const d = BIO.datosCap(), cfg = d.cierre, cap = BIO.cap();
    const sc = cap.cierre;
    return new Promise(function (resolve) {
      let terminado = false;
      const cont = el("div", { class: "cierre" });

      cont.appendChild(el("h3", {}, "1. Reflexión personal"));
      cont.appendChild(el("p", { class: "ayuda" }, "No hay respuestas correctas: se evalúa que argumentes. Tus respuestas se incluyen en el resumen que entregarás a tu profesor o profesora. No escribas información sobre tu salud ni la de tu familia."));
      cfg.reflexiones.forEach(function (r, i) {
        const id = "refl-" + r.id;
        const ta = el("textarea", { id: id, rows: "4", oninput: function () { sc.reflexiones[r.id] = ta.value; guardarLuego(); } });
        ta.value = sc.reflexiones[r.id] || "";
        cont.appendChild(el("div", { class: "reflexion" }, [el("label", { for: id }, (i + 1) + ". " + BIO.plano(r.pregunta)), ta]));
      });

      cont.appendChild(el("h3", {}, "2. Comprobación de conceptos"));
      cont.appendChild(el("p", { class: "ayuda" }, "Estas preguntas son sobre conceptos, no sobre opiniones. Si te equivocas, lee la explicación y vuelve a intentarlo."));
      cfg.quiz.forEach(function (q, i) {
        const nombre = "quiz-" + q.id;
        const reg = sc.quiz[q.id] = sc.quiz[q.id] || {};
        const fs = el("fieldset", { class: "quiz-item" });
        fs.appendChild(el("legend", {}, (i + 1) + ". " + BIO.plano(q.pregunta)));
        const retro = el("div", { class: "retro-slot", "aria-live": "polite" });
        q.opciones.forEach(function (op, j) {
          const idop = nombre + "-" + j;
          const inp = el("input", { type: "radio", name: nombre, id: idop, onchange: function () {
            if (reg.primera == null) { reg.primera = j; reg.correctaPrimera = !!op.correcta; }
            reg.final = j; reg.correcta = !!op.correcta;
            BIO.guardado.guardar();
            pintarRetro();
          } });
          if (reg.final === j) inp.checked = true;
          fs.appendChild(el("div", { class: "casilla" }, [inp, el("label", { for: idop }, BIO.plano(op.texto))]));
        });
        function pintarRetro() {
          retro.innerHTML = "";
          if (reg.final == null) return;
          const op = q.opciones[reg.final];
          retro.appendChild(el("div", { class: "retro " + (op.correcta ? "ok" : "no") }, [el("strong", {}, op.correcta ? "✓ Correcto. " : "✗ No es así. "), BIO.fmt(op.explicacion)]));
        }
        pintarRetro();
        fs.appendChild(retro);
        cont.appendChild(fs);
      });

      let t = null;
      function guardarLuego() { clearTimeout(t); t = setTimeout(function () { BIO.guardado.guardar(); }, 400); }

      const m = BIO.ui.modal({
        titulo: "Cierre del capítulo " + d.numero,
        clase: "grande",
        contenido: cont,
        botones: [
          { texto: "Guardar y seguir después", clase: "btn-sec" },
          { texto: "Terminar capítulo", cierra: false, accion: function (api) {
            const vacias = cfg.reflexiones.filter(function (r) { return !(sc.reflexiones[r.id] || "").trim(); }).length;
            const sinQuiz = cfg.quiz.filter(function (q) { return !sc.quiz[q.id] || !sc.quiz[q.id].correcta; }).length;
            if (vacias || sinQuiz) {
              let msj = [];
              if (vacias) msj.push("responde las " + cfg.reflexiones.length + " preguntas de reflexión (aunque sea brevemente)");
              if (sinQuiz) msj.push("llega a la respuesta correcta en las preguntas de comprobación");
              BIO.ui.aviso("Falta poco", "Para terminar, " + msj.join(" y ") + ".");
              return;
            }
            sc.hecho = true;
            terminado = true;
            BIO.guardado.guardar();
            api.cerrar();
          } }
        ],
        alCerrar: async function () {
          BIO.guardado.guardar();
          if (terminado) await BIO.ejecutar(cfg.alTerminar || ["completar"]);
          resolve();
        }
      });
    });
  };

  BIO.cierre.completarCapitulo = function () {
    const d = BIO.datosCap(), cap = BIO.cap();
    const primera = cap.estado !== "completo";
    cap.estado = "completo";
    if (primera) cap.fin = new Date().toISOString();
    BIO.guardado.guardar();
    BIO.ui.actualizarBarra();
    const cont = el("div", { class: "completo" });
    cont.appendChild(BIO.fmt(d.textoFinal || "Terminaste este capítulo."));
    if (d.mostrarAyudaAlFinal && BIO.datos.config.ayuda) cont.appendChild(BIO.ui.bloqueAyuda());
    cont.appendChild(el("p", { class: "ayuda" }, "Tus decisiones y reflexiones quedaron guardadas en el resumen. Puedes descargarlo cuando quieras desde el menú."));
    let destino = null;
    const m = BIO.ui.modal({
      titulo: "Capítulo " + d.numero + " completado",
      contenido: cont,
      botones: [
        { texto: "Ver mi resumen", clase: "btn-sec", accion: function () { destino = "resumen"; } },
        { texto: "Ir al menú de capítulos", accion: function () { destino = "capitulos"; } }
      ]
    });
    return m.promesa.then(function () {
      if (destino === "resumen") BIO.resumen.mostrar();
      else if (destino === "capitulos") BIO.mostrarCapitulos();
    });
  };

  /* Nota informativa de ayuda (configurable en datos/config.js → ayuda) */
  BIO.ui.bloqueAyuda = function () {
    const a = BIO.datos.config.ayuda;
    const caja = el("aside", { class: "ayuda-caja" }, [el("h3", {}, a.titulo), BIO.fmt(a.texto)]);
    const ul = el("ul");
    a.contactos.forEach(function (c) { ul.appendChild(el("li", {}, [el("strong", {}, c.nombre + ": "), c.contacto, c.detalle ? " — " + c.detalle : ""])); });
    caja.appendChild(ul);
    return caja;
  };
})();
