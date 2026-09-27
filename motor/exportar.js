/* =========================================================================
   RESUMEN FINAL Y DESCARGA .TXT
   Reúne decisiones, evaluaciones de la deliberación y reflexiones del
   estudiante para entregarlas al docente.
   ========================================================================= */
(function () {
  "use strict";
  const el = BIO.el;
  BIO.resumen = {};

  function linea(c, n) { return new Array(n || 60).join(c || "="); }

  BIO.resumen.texto = function () {
    const E = BIO.estado, j = E.jugador || {};
    const cfg = BIO.datos.config;
    const L = [];
    L.push(cfg.tituloJuego.toUpperCase() + " — " + cfg.subtituloJuego);
    L.push("Resumen de trabajo del estudiante");
    L.push(linea("="));
    L.push("Nombre: " + (j.nombre || "") + (j.apellido ? " " + j.apellido : ""));
    L.push("Curso: " + (j.curso || ""));
    L.push("Fecha de descarga: " + BIO.fecha());
    L.push("");
    let alguno = false;
    cfg.capitulos.forEach(function (ci) {
      const c = E.caps[ci.id], d = BIO.datos[ci.id];
      if (!c || !d) return;
      alguno = true;
      L.push(linea("="));
      L.push("CAPÍTULO " + d.numero + " — " + d.titulo + ": " + d.subtitulo);
      L.push("Estado: " + (c.estado === "completo" ? "completado el " + BIO.fecha(c.fin) : "en curso"));
      L.push(linea("-"));
      // Actividades
      const mjs = Object.keys(d.minijuegos || {});
      if (mjs.length) {
        L.push("ACTIVIDADES");
        mjs.forEach(function (id) {
          const r = c.minijuegos[id], m = d.minijuegos[id];
          let t = "- " + BIO.plano(m.titulo) + ": ";
          if (!r || !r.completo) t += "no completada";
          else {
            t += "completada en " + (r.intentos || 1) + " intento(s)";
            if (r.primerIntento) t += " (al primer intento: " + r.primerIntento.buenos + "/" + r.primerIntento.total + ")";
          }
          L.push(t);
        });
        L.push("");
      }
      // Deliberación
      const st = c.deliberacion, cd = d.deliberacion;
      if (cd) {
        L.push("DELIBERACIÓN DEL COMITÉ");
        L.push("Pregunta: " + BIO.plano(cd.pregunta));
        if (!st || !st.decision.historial.length) L.push("(No realizada todavía)");
        else {
          const curso = function (id) { const k = cd.cursos.lista.find(function (x) { return x.id === id; }); return k ? BIO.plano(k.texto) : id; };
          L.push("Propuesta final:");
          st.decision.cursos.forEach(function (id) { L.push("  • " + curso(id)); });
          L.push("Razones:");
          st.decision.razones.forEach(function (id) { const r = cd.decision.razones.find(function (x) { return x.id === id; }); if (r) L.push("  • " + BIO.plano(r.texto)); });
          if (st.decision.bloqueos.length) L.push("Propuestas descartadas por ser ilegales o contrarias a un consenso básico: " + st.decision.bloqueos.length);
          L.push("Revisiones de la propuesta: " + st.decision.revisiones);
          if (st.decision.historial.length > 1) {
            L.push("Historial de propuestas presentadas:");
            st.decision.historial.forEach(function (h, i) { L.push("  " + (i + 1) + ") " + h.cursos.map(curso).join(" + ")); });
          }
          if (st.objeciones.respuestas.length) {
            L.push("Objeciones del comité y respuestas:");
            st.objeciones.respuestas.forEach(function (r) {
              const q = BIO.ui.hablante(r.quien);
              L.push("  - " + (q.nombre || r.quien) + ": " + BIO.plano(r.texto));
              L.push("    Respuesta: " + BIO.plano(r.respuesta));
            });
          }
          if (cd.consistencia && Object.keys(st.consistencia).length) {
            L.push("Pruebas de consistencia:");
            cd.consistencia.forEach(function (q) {
              const i = st.consistencia[q.id];
              if (i != null) L.push("  - " + BIO.plano(q.titulo) + " → " + BIO.plano(q.opciones[i].texto));
            });
          }
          if (st.rubrica) {
            L.push("Evaluación de la deliberación (no evalúa la conclusión, sino el proceso):");
            st.rubrica.criterios.forEach(function (k) { L.push("  - " + k.nombre + ": " + k.nivel + ". " + (k.detalle || "")); });
          }
        }
        L.push("");
      }
      // Reflexiones
      if (d.cierre) {
        L.push("REFLEXIONES");
        d.cierre.reflexiones.forEach(function (r, i) {
          L.push((i + 1) + ". " + BIO.plano(r.pregunta));
          const resp = (c.cierre.reflexiones[r.id] || "").trim();
          L.push(resp ? resp.split("\n").map(function (x) { return "   " + x; }).join("\n") : "   (sin responder)");
          L.push("");
        });
        const qs = d.cierre.quiz;
        const primeras = qs.filter(function (q) { return c.cierre.quiz[q.id] && c.cierre.quiz[q.id].correctaPrimera; }).length;
        const respondidas = qs.filter(function (q) { return c.cierre.quiz[q.id] && c.cierre.quiz[q.id].primera != null; }).length;
        L.push("COMPROBACIÓN DE CONCEPTOS: " + primeras + " de " + qs.length + " correctas al primer intento" + (respondidas < qs.length ? " (" + (qs.length - respondidas) + " sin responder)" : "") + ".");
      }
      L.push("Pistas consultadas en el capítulo: " + BIO.pistas.total(ci.id));
      L.push("");
    });
    if (!alguno) L.push("Todavía no hay capítulos jugados.");
    L.push(linea("="));
    L.push("Generado por el juego «" + cfg.tituloJuego + "». Este archivo no contiene datos de salud.");
    return L.join("\n");
  };

  function nombreArchivo() {
    const j = BIO.estado.jugador || {};
    const limpio = function (s) {
      return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
    };
    return [limpio(j.apellido), limpio(j.nombre), limpio(j.curso), "bioetica"].filter(Boolean).join("_") + ".txt";
  }

  BIO.resumen.descargar = async function () {
    const texto = BIO.resumen.texto();
    // Publicado en claude.ai: la descarga pasa por la plataforma (pide confirmación)
    if (window.claude && typeof window.claude.use === "function") {
      let dl = null;
      try { dl = await window.claude.use("downloads"); } catch (e) { dl = null; }
      if (!dl) {
        BIO.ui.aviso("Descarga no disponible", "En esta vista no se pueden descargar archivos. Usa el botón **Copiar texto** y pégalo en un documento para entregarlo.");
        return;
      }
      try {
        await dl.save({ filename: nombreArchivo(), data: "﻿" + texto });
        BIO.ui.toast("Resumen guardado");
      } catch (e) {
        if (e && e.code === "declined") return;
        if (e && e.code === "rate_limited") { BIO.ui.toast("Ya hay una descarga pendiente de confirmar"); return; }
        BIO.ui.aviso("No se pudo descargar", "Usa el botón **Copiar texto** y pégalo en un documento para entregarlo.");
      }
      return;
    }
    try {
      const blob = new Blob(["﻿" + texto], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = el("a", { href: url, download: nombreArchivo() });
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      BIO.ui.toast("Descargando " + nombreArchivo());
    } catch (e) {
      BIO.ui.aviso("No se pudo descargar", "Tu navegador no permitió la descarga. Usa el botón **Copiar texto** y pégalo en un documento.");
    }
  };

  BIO.resumen.copiar = function () {
    const texto = BIO.resumen.texto();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(function () { BIO.ui.toast("Texto copiado"); }, function () { seleccionar(); });
    } else seleccionar();
    function seleccionar() {
      const pre = BIO.$("#resumen-texto");
      if (!pre) return;
      const r = document.createRange(); r.selectNodeContents(pre);
      const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      BIO.ui.toast("Texto seleccionado: cópialo con Ctrl+C (o Cmd+C)");
    }
  };

  BIO.resumen.mostrar = function () {
    const p = BIO.$("#pantalla-resumen");
    p.innerHTML = "";
    const pre = el("pre", { id: "resumen-texto", class: "resumen-texto", tabindex: "0" }, BIO.resumen.texto());
    p.appendChild(el("div", { class: "pantalla-caja" }, [
      el("h1", {}, "Mi resumen"),
      el("p", {}, "Esto es lo que entregarás a tu docente: tus decisiones, cómo deliberaste y tus reflexiones. Descárgalo como archivo de texto."),
      el("div", { class: "grupo-botones" }, [
        el("button", { class: "btn", type: "button", onclick: BIO.resumen.descargar }, "Descargar .txt"),
        el("button", { class: "btn btn-sec", type: "button", onclick: BIO.resumen.copiar }, "Copiar texto"),
        el("button", { class: "btn btn-sec", type: "button", onclick: function () { BIO.mostrarCapitulos(); } }, "Volver a los capítulos")
      ]),
      pre
    ]));
    BIO.pantalla("resumen");
  };
})();
