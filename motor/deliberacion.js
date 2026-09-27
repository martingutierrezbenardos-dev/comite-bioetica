/* =========================================================================
   DELIBERACIÓN — versión jugable del método deliberativo de Diego Gracia
   Fases: 1 Hechos · 2 Valores · 3 Cursos de acción · 4 Decisión y objeciones
          · 5 Pruebas de consistencia → Evaluación de la deliberación
   REGLA DE DISEÑO: no se evalúa QUÉ conclusión elige el estudiante, sino la
   CALIDAD de la deliberación. Solo se bloquean cursos marcados en los datos
   como "ilegal" o "contra_consenso".
   La configuración de cada caso está en datos/capN.js → deliberacion.
   ========================================================================= */
(function () {
  "use strict";
  const el = BIO.el;
  const FASES = [
    { id: "hechos", nombre: "Hechos" },
    { id: "valores", nombre: "Valores" },
    { id: "cursos", nombre: "Cursos de acción" },
    { id: "decision", nombre: "Decisión" },
    { id: "consistencia", nombre: "Consistencia" }
  ];

  BIO.deliberacion = {};

  function estadoInicial() {
    return {
      fase: 0, max: 0, terminada: false,
      hechos: { clas: {}, faltantes: [], comprobado: false, primer: null },
      valores: { sel: {}, comprobado: false, primer: null },
      cursos: { orden: null, extremos: [], extremosOk: false, extremosIntentos: 0, intermedios: [], ok: false, falsosPrimerIntento: 0 },
      decision: { cursos: [], razones: [], presentada: false, revisiones: 0, bloqueos: [], historial: [] },
      objeciones: { lista: [], idx: 0, respuestas: [] },
      consistencia: {},
      rubrica: null
    };
  }

  function principios() { return BIO.datos.config.principios; }
  function nombrePrincipio(id) { const p = principios().find(function (x) { return x.id === id; }); return p ? p.nombre : id; }
  function curso(cfg, id) { return cfg.cursos.lista.find(function (c) { return c.id === id; }); }

  BIO.deliberacion.abrir = function () {
    const cfg = BIO.datosCap().deliberacion;
    const cap = BIO.cap();
    if (!cap.deliberacion) cap.deliberacion = estadoInicial();
    const st = cap.deliberacion;

    return new Promise(function (resolve) {
      const previo = BIO.pistas.contexto;
      const cabecera = el("div", { class: "del-cabecera" });
      const pasos = el("ol", { class: "del-pasos" });
      const panel = el("div", { class: "del-panel" });
      cabecera.append(el("p", { class: "del-pregunta" }, [el("span", { class: "etq" }, "Pregunta del comité: "), BIO.plano(cfg.pregunta)]), pasos);
      const m = BIO.ui.modal({
        titulo: "Sesión del comité",
        clase: "grande deliberacion",
        contenido: el("div", {}, [cabecera, panel]),
        alCerrar: async function () {
          BIO.pistas.fijar(previo);
          BIO.guardado.guardar();
          if (st.terminada && !st.efectosHechos) {
            st.efectosHechos = true;
            BIO.guardado.guardar();
            await BIO.ejecutar(cfg.alTerminar);
          }
          BIO.escena.refrescar();
          resolve();
        }
      });
      m.pie.appendChild(el("button", { class: "btn btn-sec", type: "button", onclick: function () { BIO.pistas.abrir(); } }, "Pista"));
      const acciones = el("div", { class: "mj-acciones" });
      m.pie.appendChild(acciones);

      function boton(texto, fn, clase) {
        const b = el("button", { class: "btn " + (clase || ""), type: "button", onclick: fn }, texto);
        acciones.appendChild(b);
        return b;
      }
      function mensaje(cont, texto, tipo) {
        let caja = cont.querySelector(":scope > .mj-mensaje");
        if (!caja) { caja = el("div", { class: "mj-mensaje", role: "status", tabindex: "-1" }); cont.prepend(caja); }
        caja.className = "mj-mensaje " + (tipo || "");
        caja.innerHTML = "";
        caja.appendChild(BIO.fmt(texto));
        caja.focus();
      }
      function guardar() { BIO.guardado.guardar(); }

      function pintarPasos() {
        pasos.innerHTML = "";
        FASES.forEach(function (f, i) {
          const actual = st.fase === i && !st.verRubrica;
          pasos.appendChild(el("li", {}, el("button", {
            type: "button", class: "del-paso" + (actual ? " actual" : "") + (i < st.max || st.rubrica ? " hecho" : ""),
            "aria-current": actual ? "step" : null,
            disabled: i > st.max ? true : null,
            onclick: function () { if (i <= st.max) { st.fase = i; st.verRubrica = false; mostrar(); } }
          }, [el("span", { class: "n" }, String(i + 1)), " " + f.nombre])));
        });
        if (st.rubrica) pasos.appendChild(el("li", {}, el("button", { type: "button", class: "del-paso" + (st.verRubrica ? " actual" : ""), "aria-current": st.verRubrica ? "step" : null, onclick: function () { st.verRubrica = true; mostrar(); } }, [el("span", { class: "n" }, "✓"), " Evaluación"])));
      }

      function avanzar() {
        st.fase++;
        st.max = Math.max(st.max, st.fase);
        guardar();
        mostrar();
      }

      function mostrar() {
        panel.innerHTML = "";
        acciones.innerHTML = "";
        pintarPasos();
        const f = FASES[st.fase];
        if (st.rubrica && st.verRubrica) { faseRubrica(); return; }
        BIO.pistas.fijar({ id: "del." + f.id, titulo: "Fase " + (st.fase + 1) + ": " + f.nombre, pistas: (cfg.pistas && cfg.pistas[f.id]) || [] });
        const g = cfg.guion && cfg.guion[f.id];
        panel.appendChild(el("h3", { class: "del-titulo" }, "Fase " + (st.fase + 1) + ": " + f.nombre));
        if (g) panel.appendChild(BIO.ui.voz(g.habla, g.texto));
        ({ hechos: faseHechos, valores: faseValores, cursos: faseCursos, decision: faseDecision, consistencia: faseConsistencia })[f.id]();
        m.titulo.focus();
      }

      /* ------------------------------------------------------------------
         FASE 1: HECHOS
         ------------------------------------------------------------------ */
      function faseHechos() {
        const H = cfg.hechos, sh = st.hechos;
        const cats = H.categorias || [
          { id: "hecho", nombre: "Hecho documentado" },
          { id: "opinion", nombre: "Opinión, interpretación o testimonio sin verificar" },
          { id: "irrelevante", nombre: "Irrelevante para decidir" }
        ];
        const cont = el("div", { class: "del-fase" });
        cont.appendChild(el("h4", {}, "a) Clasifica lo que hay en tu carpeta"));
        const tengo = H.items.filter(function (i) { return cap.evidencias.indexOf(i.ev) >= 0; });
        const noTengo = H.items.length - tengo.length;
        tengo.forEach(function (it) {
          const ev = BIO.evidencia(it.ev);
          const nombre = "h-" + it.ev;
          const fs = el("fieldset", { class: "rel-item" });
          fs.appendChild(el("legend", {}, BIO.plano(ev.titulo)));
          fs.appendChild(el("p", { class: "resumen" }, [BIO.plano(ev.resumen || ""), " ", el("button", { class: "btn-mini", type: "button", onclick: function () { BIO.ui.mostrarEvidencia(it.ev, false); } }, "Leer completo")]));
          const ops = el("div", { class: "chips", role: "radiogroup", "aria-label": "Clasificación" });
          cats.forEach(function (c) {
            const id = nombre + "-" + c.id;
            const inp = el("input", { type: "radio", name: nombre, id: id, value: c.id, onchange: function () { sh.clas[it.ev] = c.id; guardar(); } });
            if (sh.clas[it.ev] === c.id) inp.checked = true;
            ops.append(inp, el("label", { for: id, class: "chip" }, c.nombre));
          });
          fs.appendChild(ops);
          fs.appendChild(el("div", { class: "retro-slot" }));
          fs.dataset.ev = it.ev;
          cont.appendChild(fs);
        });
        if (noTengo) cont.appendChild(el("p", { class: "nota" }, "Hay " + (noTengo === 1 ? "una pieza del caso que no encontraste" : noTengo + " piezas del caso que no encontraste") + ". Puedes seguir igual: el comité lo tendrá en cuenta en la evaluación, pero no te impide deliberar."));

        cont.appendChild(el("h4", {}, "b) ¿Qué información falta?"));
        cont.appendChild(el("p", { class: "ayuda" }, H.introFaltantes || "Marca las preguntas que el comité debería intentar responder antes de decidir. No todas son importantes."));
        H.faltantes.forEach(function (f) {
          const id = "f-" + f.id;
          const inp = el("input", { type: "checkbox", id: id, onchange: function () {
            const i = sh.faltantes.indexOf(f.id);
            if (inp.checked && i < 0) sh.faltantes.push(f.id);
            if (!inp.checked && i >= 0) sh.faltantes.splice(i, 1);
            guardar();
          } });
          inp.checked = sh.faltantes.indexOf(f.id) >= 0;
          cont.appendChild(el("div", { class: "casilla", "data-f": f.id }, [inp, el("label", { for: id }, BIO.plano(f.texto)), el("div", { class: "retro-slot" })]));
        });
        panel.appendChild(cont);

        function comprobar() {
          const sin = tengo.filter(function (it) { return !sh.clas[it.ev]; }).length;
          if (sin) { mensaje(cont, "Clasifica todas las piezas antes de comprobar (faltan " + sin + ").", "aviso"); return; }
          let clasOk = 0, faltOk = 0;
          tengo.forEach(function (it) {
            const aceptadas = Array.isArray(it.tipo) ? it.tipo : [it.tipo];
            const ok = aceptadas.indexOf(sh.clas[it.ev]) >= 0;
            if (ok) clasOk++;
            const slot = cont.querySelector('fieldset[data-ev="' + it.ev + '"] .retro-slot');
            slot.innerHTML = "";
            slot.appendChild(el("div", { class: "retro " + (ok ? "ok" : "no") }, [el("strong", {}, ok ? "✓ " : "✗ "), BIO.fmt(it.explicacion)]));
          });
          H.faltantes.forEach(function (f) {
            const marcada = sh.faltantes.indexOf(f.id) >= 0;
            const ok = marcada === !!f.necesaria;
            if (ok) faltOk++;
            const slot = cont.querySelector('[data-f="' + f.id + '"] .retro-slot');
            slot.innerHTML = "";
            if (marcada || f.necesaria) slot.appendChild(el("div", { class: "retro " + (ok ? "ok" : "no") }, [el("strong", {}, ok ? "✓ " : (marcada ? "✗ " : "Faltó: ")), BIO.fmt(f.explicacion)]));
          });
          if (!sh.primer) sh.primer = { clasOk: clasOk, clasTotal: tengo.length, faltOk: faltOk, faltTotal: H.faltantes.length };
          sh.comprobado = true;
          guardar();
          mensaje(cont, "Clasificación: **" + clasOk + " de " + tengo.length + "**. Información faltante: **" + faltOk + " de " + H.faltantes.length + "** bien evaluadas.\n\nLee la retroalimentación. Puedes corregir y volver a comprobar, o pasar a la fase siguiente.", clasOk === tengo.length && faltOk === H.faltantes.length ? "exito" : "aviso");
          sig.disabled = false;
        }
        boton("Comprobar", comprobar, "btn-sec");
        const sig = boton("Siguiente fase", avanzar);
        sig.disabled = !sh.comprobado;
      }

      /* ------------------------------------------------------------------
         FASE 2: VALORES
         ------------------------------------------------------------------ */
      function faseValores() {
        const V = cfg.valores, sv = st.valores;
        const cont = el("div", { class: "del-fase" });
        cont.appendChild(el("p", { class: "ayuda" }, "Marca los valores que están en juego y conecta cada uno con el o los principios de Beauchamp y Childress con que se relaciona. Intenta que queden representadas todas las partes."));
        const partesCaja = el("div", { class: "partes", "aria-live": "polite" });
        cont.appendChild(partesCaja);

        function pintarPartes() {
          partesCaja.innerHTML = "";
          partesCaja.appendChild(el("span", { class: "etq" }, "Partes consideradas: "));
          V.partes.forEach(function (pa) {
            const cubierta = V.lista.some(function (v) { return !v.trampa && sv.sel[v.id] && v.partes.indexOf(pa.id) >= 0; });
            partesCaja.appendChild(el("span", { class: "parte" + (cubierta ? " cubierta" : "") }, (cubierta ? "✓ " : "○ ") + pa.nombre));
          });
        }

        V.lista.forEach(function (v) {
          const fila = el("div", { class: "valor-fila", "data-v": v.id });
          const idc = "v-" + v.id;
          const chk = el("input", { type: "checkbox", id: idc });
          chk.checked = !!sv.sel[v.id];
          const chips = el("div", { class: "chips", role: "group", "aria-label": "Principios relacionados con " + BIO.plano(v.nombre) });
          function pintarChips() {
            chips.innerHTML = "";
            principios().forEach(function (pr) {
              const on = !!(sv.sel[v.id] && sv.sel[v.id].indexOf(pr.id) >= 0);
              chips.appendChild(el("button", {
                type: "button", class: "chip-btn" + (on ? " on" : ""), "aria-pressed": on ? "true" : "false",
                disabled: sv.sel[v.id] ? null : true,
                onclick: function () {
                  const arr = sv.sel[v.id];
                  const i = arr.indexOf(pr.id);
                  if (i >= 0) arr.splice(i, 1); else arr.push(pr.id);
                  guardar(); pintarChips();
                  const b = chips.querySelectorAll("button")[principios().indexOf(pr)];
                  if (b) b.focus();
                }
              }, pr.nombre));
            });
          }
          chk.addEventListener("change", function () {
            if (chk.checked) sv.sel[v.id] = sv.sel[v.id] || []; else delete sv.sel[v.id];
            guardar(); pintarChips(); pintarPartes();
          });
          pintarChips();
          fila.append(
            el("div", { class: "valor-nombre" }, [chk, el("label", { for: idc }, [el("strong", {}, BIO.plano(v.nombre)), v.descripcion ? el("span", { class: "ayuda" }, " — " + BIO.plano(v.descripcion)) : null])]),
            chips,
            el("div", { class: "retro-slot" })
          );
          cont.appendChild(fila);
        });
        pintarPartes();
        panel.appendChild(cont);

        function comprobar() {
          const elegidos = Object.keys(sv.sel);
          if (!elegidos.length) { mensaje(cont, "Marca al menos los valores que te parezcan en juego.", "aviso"); return; }
          const sinPrincipio = elegidos.filter(function (id) { const v = V.lista.find(function (x) { return x.id === id; }); return !v.trampa && !sv.sel[id].length; });
          if (sinPrincipio.length) { mensaje(cont, "Conecta cada valor marcado con al menos un principio.", "aviso"); return; }
          let mapeoOk = 0, mapeoTotal = 0, trampaMarcada = false;
          V.lista.forEach(function (v) {
            const slot = cont.querySelector('[data-v="' + v.id + '"] .retro-slot');
            slot.innerHTML = "";
            const marcado = !!sv.sel[v.id];
            if (v.trampa) {
              if (marcado) { trampaMarcada = true; slot.appendChild(el("div", { class: "retro no" }, [el("strong", {}, "Cuidado: "), BIO.fmt(v.explicacion)])); }
              return;
            }
            if (!marcado) { slot.appendChild(el("div", { class: "retro no" }, [el("strong", {}, "También estaba en juego. "), BIO.fmt(v.explicacion)])); return; }
            mapeoTotal++;
            const malos = sv.sel[v.id].filter(function (p) { return v.principios.indexOf(p) < 0; });
            const ok = malos.length === 0;
            if (ok) mapeoOk++;
            const texto = ok ? v.explicacion : "La conexión con **" + malos.map(nombrePrincipio).join(", ") + "** es discutible aquí. " + v.explicacion;
            slot.appendChild(el("div", { class: "retro " + (ok ? "ok" : "no") }, [el("strong", {}, ok ? "✓ " : "✗ "), BIO.fmt(texto)]));
          });
          const partesTotal = V.partes.length;
          const partesCubiertas = V.partes.filter(function (pa) { return V.lista.some(function (v) { return !v.trampa && sv.sel[v.id] && v.partes.indexOf(pa.id) >= 0; }); }).length;
          if (!sv.primer) sv.primer = { mapeoOk: mapeoOk, mapeoTotal: mapeoTotal, partesCubiertas: partesCubiertas, partesTotal: partesTotal, trampa: trampaMarcada, reales: V.lista.filter(function (v) { return !v.trampa; }).length };
          sv.comprobado = true;
          guardar();
          const reales = V.lista.filter(function (v) { return !v.trampa; }).length;
          mensaje(cont, "Partes consideradas: **" + partesCubiertas + " de " + partesTotal + "**. Valores identificados: **" + mapeoTotal + " de " + reales + "**. Conexiones con principios sin observaciones: **" + mapeoOk + " de " + mapeoTotal + "**.\n\nLee la retroalimentación de cada valor. Recuerda: un mismo valor puede conectarse con más de un principio; lo importante es poder explicar la conexión.", partesCubiertas === partesTotal && mapeoTotal === reales && mapeoOk === mapeoTotal && !trampaMarcada ? "exito" : "aviso");
          sig.disabled = false;
        }
        boton("Comprobar", comprobar, "btn-sec");
        const sig = boton("Siguiente fase", avanzar);
        sig.disabled = !sv.comprobado;
      }

      /* ------------------------------------------------------------------
         FASE 3: CURSOS DE ACCIÓN
         ------------------------------------------------------------------ */
      function faseCursos() {
        const C = cfg.cursos, sc = st.cursos;
        if (!sc.orden) { sc.orden = BIO.mezclar(C.lista.map(function (c) { return c.id; })); guardar(); }
        const cont = el("div", { class: "del-fase" });
        panel.appendChild(cont);

        if (!sc.extremosOk) {
          cont.appendChild(el("h4", {}, "a) Identifica los dos cursos extremos"));
          cont.appendChild(el("p", { class: "ayuda" }, "Un curso extremo es el que salva por completo un valor sacrificando totalmente el otro. Marca exactamente dos."));
          const lista = el("div", { class: "cursos" });
          sc.orden.forEach(function (id) {
            const c = curso(cfg, id);
            const on = sc.extremos.indexOf(id) >= 0;
            lista.appendChild(el("div", { class: "curso" + (on ? " marcado" : "") }, [
              el("p", {}, BIO.plano(c.texto)),
              el("button", { type: "button", class: "chip-btn" + (on ? " on" : ""), "aria-pressed": on ? "true" : "false", onclick: function () {
                const i = sc.extremos.indexOf(id);
                if (i >= 0) sc.extremos.splice(i, 1);
                else { if (sc.extremos.length >= 2) sc.extremos.shift(); sc.extremos.push(id); }
                guardar(); mostrar();
              } }, on ? "Extremo ✓" : "Marcar como extremo")
            ]));
          });
          cont.appendChild(lista);
          boton("Comprobar extremos", function () {
            if (sc.extremos.length !== 2) { mensaje(cont, "Marca exactamente dos cursos extremos.", "aviso"); return; }
            sc.extremosIntentos++;
            const noSon = sc.extremos.filter(function (id) { return curso(cfg, id).tipo !== "extremo"; });
            if (!noSon.length) { sc.extremosOk = true; guardar(); mostrar(); return; }
            guardar();
            mensaje(cont, noSon.map(function (id) { const c = curso(cfg, id); return "«" + BIO.plano(c.texto) + "»: " + (c.porQueNoExtremo || "este curso intenta conservar algo de ambos valores, así que no es un extremo."); }).join("\n\n") + "\n\nPregúntate: ¿qué curso sacrifica **por completo** uno de los valores en juego?", "aviso");
          });
          return;
        }

        // Extremos correctos: mostrar qué lesiona cada uno
        cont.appendChild(el("h4", {}, "Los extremos"));
        const ext = el("div", { class: "extremos" });
        sc.extremos.forEach(function (id) {
          const c = curso(cfg, id);
          ext.appendChild(el("div", { class: "curso extremo" }, [el("p", {}, el("strong", {}, BIO.plano(c.texto))), el("p", { class: "lesiona" }, [el("span", { class: "etq" }, "Lesiona por completo: "), BIO.plano(c.lesiona)])]));
        });
        cont.appendChild(ext);

        cont.appendChild(el("h4", {}, "b) Elige los cursos intermedios que consideras posibles"));
        cont.appendChild(el("p", { class: "ayuda" }, "Los cursos intermedios intentan salvar lo más posible de todos los valores. Marca al menos uno. Ojo: alguno puede parecer intermedio sin serlo."));
        const lista = el("div", { class: "cursos" });
        sc.orden.filter(function (id) { return sc.extremos.indexOf(id) < 0; }).forEach(function (id) {
          const c = curso(cfg, id);
          const idc = "ci-" + id;
          const chk = el("input", { type: "checkbox", id: idc, onchange: function () {
            const i = sc.intermedios.indexOf(id);
            if (chk.checked && i < 0) sc.intermedios.push(id);
            if (!chk.checked && i >= 0) sc.intermedios.splice(i, 1);
            sc.ok = false; guardar();
          } });
          chk.checked = sc.intermedios.indexOf(id) >= 0;
          lista.appendChild(el("div", { class: "curso casilla", "data-c": id }, [chk, el("label", { for: idc }, BIO.plano(c.texto)), el("div", { class: "retro-slot" })]));
        });
        cont.appendChild(lista);
        const espectro = el("div", { class: "espectro-caja" });
        cont.appendChild(espectro);

        function pintarEspectro() {
          espectro.innerHTML = "";
          if (!sc.ok) return;
          const a = curso(cfg, sc.extremos[0]), b = curso(cfg, sc.extremos[1]);
          const ol = el("ol", { class: "espectro", "aria-label": "Espectro de cursos de acción" });
          ol.appendChild(el("li", { class: "polo" }, BIO.plano(a.corto || a.texto)));
          sc.intermedios.forEach(function (id) { const c = curso(cfg, id); ol.appendChild(el("li", {}, BIO.plano(c.corto || c.texto))); });
          ol.appendChild(el("li", { class: "polo" }, BIO.plano(b.corto || b.texto)));
          espectro.append(el("h4", {}, "Tu espectro de cursos"), ol);
        }

        function comprobar() {
          if (!sc.intermedios.length) { mensaje(cont, "Elige al menos un curso intermedio.", "aviso"); return; }
          const falsos = sc.intermedios.filter(function (id) { return curso(cfg, id).falsoIntermedio; });
          if (sc.falsosPrimerIntento == null || sc.falsosPrimerIntento === 0 && !sc.comprobadoIntermedios) sc.falsosPrimerIntento = falsos.length;
          sc.comprobadoIntermedios = true;
          BIO.$$(".curso .retro-slot", cont).forEach(function (s) { s.innerHTML = ""; });
          falsos.forEach(function (id) {
            const slot = cont.querySelector('[data-c="' + id + '"] .retro-slot');
            slot.appendChild(el("div", { class: "retro no" }, [el("strong", {}, "Falso intermedio: "), BIO.fmt(curso(cfg, id).explicacionFalso)]));
          });
          if (falsos.length) { sc.ok = false; guardar(); mensaje(cont, "Uno de los cursos que elegiste parece intermedio, pero no lo es. Lee la retroalimentación y desmárcalo.", "aviso"); return; }
          sc.ok = true; guardar();
          pintarEspectro();
          mensaje(cont, "Tienes **" + sc.intermedios.length + "** curso(s) intermedio(s). Según Gracia, el curso óptimo suele encontrarse entre los intermedios, aunque no siempre está «justo al medio».", "exito");
          sig.disabled = false;
        }
        pintarEspectro();
        boton("Comprobar", comprobar, "btn-sec");
        const sig = boton("Siguiente fase", avanzar);
        sig.disabled = !sc.ok;
      }

      /* ------------------------------------------------------------------
         FASE 4: DECISIÓN, JUSTIFICACIÓN Y OBJECIONES
         ------------------------------------------------------------------ */
      function faseDecision() {
        const D = cfg.decision, sd = st.decision;
        const cont = el("div", { class: "del-fase" });
        panel.appendChild(cont);
        if (sd.presentada) { objeciones(cont); return; }

        if (sd.revisiones) cont.appendChild(el("p", { class: "nota" }, "Estás revisando tu propuesta. Cambiar de opinión ante buenas razones también es deliberar."));
        cont.appendChild(el("h4", {}, "a) Tu propuesta (elige de 1 a 3 cursos que se puedan combinar)"));
        const lc = el("div", { class: "cursos" });
        cfg.cursos.lista.forEach(function (c) {
          const idc = "d-" + c.id;
          const chk = el("input", { type: "checkbox", id: idc, onchange: function () {
            const i = sd.cursos.indexOf(c.id);
            if (chk.checked && i < 0) sd.cursos.push(c.id);
            if (!chk.checked && i >= 0) sd.cursos.splice(i, 1);
            guardar();
          } });
          chk.checked = sd.cursos.indexOf(c.id) >= 0;
          lc.appendChild(el("div", { class: "curso casilla" }, [chk, el("label", { for: idc }, BIO.plano(c.texto))]));
        });
        cont.appendChild(lc);

        cont.appendChild(el("h4", {}, "b) Tus razones (elige 2 o 3)"));
        const lr = el("div", { class: "razones" });
        D.razones.forEach(function (r) {
          const idr = "r-" + r.id;
          const chk = el("input", { type: "checkbox", id: idr, onchange: function () {
            const i = sd.razones.indexOf(r.id);
            if (chk.checked && i < 0) sd.razones.push(r.id);
            if (!chk.checked && i >= 0) sd.razones.splice(i, 1);
            guardar();
          } });
          chk.checked = sd.razones.indexOf(r.id) >= 0;
          lr.appendChild(el("div", { class: "casilla" }, [chk, el("label", { for: idr }, BIO.plano(r.texto))]));
        });
        cont.appendChild(lr);

        boton("Presentar al comité", function () {
          if (sd.cursos.length < 1 || sd.cursos.length > 3) { mensaje(cont, "Elige entre 1 y 3 cursos de acción.", "aviso"); return; }
          if (sd.razones.length < 2 || sd.razones.length > 3) { mensaje(cont, "Elige 2 o 3 razones.", "aviso"); return; }
          // Cursos que no se sostienen (ilegales o contra un consenso básico)
          const bloq = sd.cursos.map(function (id) { return curso(cfg, id); }).filter(function (c) { return c.marca === "ilegal" || c.marca === "contra_consenso"; });
          if (bloq.length) {
            sd.bloqueos.push({ cursos: sd.cursos.slice(), fecha: new Date().toISOString() });
            guardar();
            const caja = el("div");
            bloq.forEach(function (c) { caja.appendChild(BIO.ui.voz(c.quienBloquea || "paula", c.explicacionMarca)); });
            caja.appendChild(el("p", { class: "nota" }, "En los temas controvertidos el comité no te dice qué concluir. Pero este curso no está disponible: " + (bloq[0].marca === "ilegal" ? "es contrario a la ley." : "contradice un consenso ético básico.") + " Revisa tu propuesta."));
            panel.querySelectorAll(".bloqueo").forEach(function (n) { n.remove(); });
            const b = el("div", { class: "bloqueo mj-mensaje aviso", tabindex: "-1", role: "status" }, caja);
            cont.prepend(b); b.focus();
            return;
          }
          // Combinaciones incompatibles
          const inc = (D.incompatibles || []).find(function (par) { return sd.cursos.indexOf(par[0]) >= 0 && sd.cursos.indexOf(par[1]) >= 0; });
          if (inc) { mensaje(cont, (inc[2] || "Dos de los cursos que elegiste se contradicen entre sí.") + " Elige una combinación coherente.", "aviso"); return; }
          sd.presentada = true;
          sd.historial.push({ cursos: sd.cursos.slice(), razones: sd.razones.slice(), fecha: new Date().toISOString() });
          // Construir objeciones
          // Candidatas: las de los cursos elegidos y luego las generales;
          // se priorizan las que aún no se han respondido.
          let cand = [];
          sd.cursos.forEach(function (id) { (D.objeciones[id] || []).forEach(function (o) { if (cand.indexOf(o) < 0) cand.push(o); }); });
          (D.objeciones["*"] || []).forEach(function (o) { if (cand.indexOf(o) < 0) cand.push(o); });
          const respondida = function (o) { return st.objeciones.respuestas.some(function (r) { return r.objecion === o.id && r.tipo !== "revisar"; }); };
          cand = cand.filter(function (o) { return !respondida(o); }).concat(cand.filter(respondida));
          const lista = cand.slice(0, 2);
          st.objeciones.lista = lista.map(function (o) { return o.id; });
          st.objeciones.idx = 0;
          guardar();
          mostrar();
        });
      }

      function buscarObjecion(id) {
        const D = cfg.decision;
        for (const k in D.objeciones) {
          const o = D.objeciones[k].find(function (x) { return x.id === id; });
          if (o) return o;
        }
        return null;
      }

      function objeciones(cont) {
        const so = st.objeciones, sd = st.decision;
        const resumen = el("div", { class: "propuesta" }, [
          el("h4", {}, "Tu propuesta"),
          el("ul", {}, sd.cursos.map(function (id) { return el("li", {}, BIO.plano(curso(cfg, id).texto)); }))
        ]);
        cont.appendChild(resumen);
        if (so.idx >= so.lista.length) {
          cont.appendChild(el("p", {}, "Respondiste las objeciones del comité."));
          boton("Siguiente fase", avanzar);
          return;
        }
        const o = buscarObjecion(so.lista[so.idx]);
        cont.appendChild(el("h4", {}, "Objeción " + (so.idx + 1) + " de " + so.lista.length));
        cont.appendChild(BIO.ui.voz(o.quien, o.texto));
        const ops = el("div", { class: "respuestas" });
        const respuestas = o.respuestas.concat([{ tipo: "revisar", texto: "Esta objeción me hace dudar: quiero revisar mi propuesta." }]);
        respuestas.forEach(function (r) {
          ops.appendChild(el("button", { type: "button", class: "respuesta", onclick: function () {
            so.respuestas.push({ objecion: o.id, quien: o.quien, texto: o.texto, respuesta: r.texto, tipo: r.tipo });
            if (r.tipo === "revisar") {
              sd.presentada = false; sd.revisiones++;
              guardar(); mostrar();
              return;
            }
            guardar();
            ops.innerHTML = "";
            ops.appendChild(el("p", { class: "tu-respuesta" }, [el("strong", {}, "Respondiste: "), BIO.plano(r.texto)]));
            if (r.comentario) ops.appendChild(BIO.ui.voz(r.quienComenta || o.quien, r.comentario));
            so.idx++;
            guardar();
            acciones.innerHTML = "";
            const b = boton(so.idx >= so.lista.length ? "Siguiente fase" : "Siguiente objeción", function () { if (so.idx >= so.lista.length) avanzar(); else mostrar(); });
            b.focus();
          } }, BIO.plano(r.texto)));
        });
        cont.appendChild(el("p", { class: "ayuda" }, "¿Cómo respondes?"));
        cont.appendChild(ops);
      }

      /* ------------------------------------------------------------------
         FASE 5: PRUEBAS DE CONSISTENCIA
         ------------------------------------------------------------------ */
      function faseConsistencia() {
        const sc = st.consistencia, sd = st.decision;
        const cont = el("div", { class: "del-fase" });
        panel.appendChild(cont);
        cfg.consistencia.forEach(function (q) {
          const bloque = el("div", { class: "prueba" });
          bloque.appendChild(el("h4", {}, BIO.plano(q.titulo)));
          let texto = q.texto;
          if (q.id === "legalidad") {
            texto += "\n\n" + sd.cursos.map(function (id) { const c = curso(cfg, id); return "- **" + BIO.plano(c.corto || c.texto) + ":** " + BIO.plano(c.legal || "Sin observaciones legales especiales."); }).join("\n");
          }
          bloque.appendChild(BIO.ui.voz(q.quien, texto));
          const ops = el("div", { class: "respuestas" });
          function pintarRespuesta() {
            ops.innerHTML = "";
            const elegido = sc[q.id] != null ? q.opciones[sc[q.id]] : null;
            if (elegido) {
              ops.appendChild(el("p", { class: "tu-respuesta" }, [el("strong", {}, "Respondiste: "), BIO.plano(elegido.texto)]));
              if (elegido.comentario) ops.appendChild(BIO.ui.voz(q.quien, elegido.comentario));
              ops.appendChild(el("button", { type: "button", class: "btn-mini", onclick: function () { delete sc[q.id]; guardar(); pintarRespuesta(); } }, "Cambiar respuesta"));
              return;
            }
            q.opciones.forEach(function (op, i) {
              ops.appendChild(el("button", { type: "button", class: "respuesta", onclick: function () {
                if (op.revisar) {
                  sd.presentada = false; sd.revisiones++;
                  st.fase = 3; guardar(); mostrar();
                  return;
                }
                sc[q.id] = i; guardar(); pintarRespuesta();
                const tr = ops.querySelector(".tu-respuesta"); if (tr) { tr.setAttribute("tabindex", "-1"); tr.focus(); }
              } }, BIO.plano(op.texto)));
            });
          }
          pintarRespuesta();
          bloque.appendChild(ops);
          cont.appendChild(bloque);
        });
        boton("Cerrar la deliberación", function () {
          const faltan = cfg.consistencia.filter(function (q) { return sc[q.id] == null; }).length;
          if (faltan) { mensaje(cont, "Responde las " + cfg.consistencia.length + " preguntas del comité (faltan " + faltan + ").", "aviso"); return; }
          st.rubrica = calcularRubrica(cfg, st, cap);
          st.verRubrica = true;
          st.terminada = true;
          guardar();
          mostrar();
        });
      }

      /* ------------------------------------------------------------------
         EVALUACIÓN (rúbrica)
         ------------------------------------------------------------------ */
      function faseRubrica() {
        BIO.pistas.fijar(null);
        const R = st.rubrica;
        const cont = el("div", { class: "del-fase rubrica" });
        cont.appendChild(el("h3", { class: "del-titulo" }, "Evaluación de tu deliberación"));
        cont.appendChild(BIO.fmt(BIO.datos.config.textos.notaRubrica));
        const grid = el("div", { class: "rub-grid" });
        R.criterios.forEach(function (c) {
          grid.appendChild(el("div", { class: "rub-item nivel-" + c.nivelId }, [
            el("h4", {}, c.nombre),
            el("p", { class: "rub-nivel" }, c.nivel),
            BIO.fmt(c.texto),
            c.detalle ? el("p", { class: "rub-detalle" }, c.detalle) : null
          ]));
        });
        cont.appendChild(grid);
        cont.appendChild(el("div", { class: "propuesta" }, [
          el("h4", {}, "Tu decisión final"),
          el("ul", {}, st.decision.cursos.map(function (id) { return el("li", {}, BIO.plano(curso(cfg, id).texto)); })),
          el("h4", {}, "Tus razones"),
          el("ul", {}, st.decision.razones.map(function (id) { return el("li", {}, BIO.plano(cfg.decision.razones.find(function (r) { return r.id === id; }).texto)); }))
        ]));
        panel.appendChild(cont);
        boton("Volver a revisar las fases", function () { st.verRubrica = false; st.fase = 0; mostrar(); }, "btn-sec");
        boton("Terminar la sesión", function () { m.cerrar(); });
      }

      if (st.rubrica) st.verRubrica = true;
      mostrar();
    });
  };

  /* ---------- Cálculo de la rúbrica ---------- */
  function nivel(s) {
    const t = BIO.datos.config.rubrica.niveles;
    if (s >= 0.8) return { id: "solido", nombre: t.solido };
    if (s >= 0.5) return { id: "desarrollo", nombre: t.desarrollo };
    return { id: "inicial", nombre: t.inicial };
  }
  function prom(arr) { return arr.reduce(function (a, b) { return a + b; }, 0) / arr.length; }

  function calcularRubrica(cfg, st, cap) {
    const T = BIO.datos.config.rubrica.criterios;
    const res = [];
    function agregar(id, s, detalle, extra) {
      const n = nivel(s);
      res.push({ id: id, nombre: T[id].nombre, puntaje: Math.round(s * 100) / 100, nivel: n.nombre, nivelId: n.id, texto: T[id][n.id] + (extra ? "\n\n" + extra : ""), detalle: detalle });
    }
    // 1. Hechos
    const dec = cfg.hechos.items.filter(function (i) { return i.relevancia === "decisiva"; });
    const decOk = dec.filter(function (i) { return cap.evidencias.indexOf(i.ev) >= 0; }).length;
    const h = st.hechos.primer || { clasOk: 0, clasTotal: 1, faltOk: 0, faltTotal: 1 };
    agregar("hechos", prom([dec.length ? decOk / dec.length : 1, h.clasTotal ? h.clasOk / h.clasTotal : 0, h.faltOk / h.faltTotal]),
      "Piezas decisivas reunidas: " + decOk + "/" + dec.length + ". Clasificación al primer intento: " + h.clasOk + "/" + h.clasTotal + ". Información faltante bien evaluada: " + h.faltOk + "/" + h.faltTotal + ".");
    // 2. Valores
    const v = st.valores.primer || { mapeoOk: 0, mapeoTotal: 1, partesCubiertas: 0, partesTotal: 1, trampa: false, reales: 1 };
    const ident = Math.min(1, v.mapeoTotal / Math.max(1, v.reales));
    let sv = prom([v.partesCubiertas / v.partesTotal, ident, ident, v.mapeoTotal ? v.mapeoOk / v.mapeoTotal : 0]);
    if (v.trampa) sv = Math.max(0, sv - 0.1);
    agregar("valores", sv, "Partes consideradas: " + v.partesCubiertas + "/" + v.partesTotal + ". Valores identificados: " + v.mapeoTotal + "/" + v.reales + ". Conexiones con principios sin observaciones: " + v.mapeoOk + "/" + v.mapeoTotal + "." + (v.trampa ? " Confundiste un interés con un valor ético." : ""));
    // 3. Cursos
    const c = st.cursos;
    const sExt = c.extremosIntentos <= 1 ? 1 : c.extremosIntentos === 2 ? 0.75 : 0.5;
    const intGen = c.intermedios.filter(function (id) { const k = curso(cfg, id); return k && !k.falsoIntermedio; }).length;
    let sc = 0.5 * sExt + 0.5 * (intGen >= 2 ? 1 : intGen === 1 ? 0.8 : 0);
    if (c.falsosPrimerIntento) sc = Math.max(0, sc - 0.15);
    agregar("cursos", sc, "Extremos identificados en " + c.extremosIntentos + " intento(s). Cursos intermedios propuestos: " + intGen + "." + (c.falsosPrimerIntento ? " Elegiste al principio un falso intermedio." : ""));
    // 4. Justificación
    const sd = st.decision;
    const razones = sd.razones.map(function (id) { return cfg.decision.razones.find(function (r) { return r.id === id; }); });
    const coherentes = razones.filter(function (r) { return !r.debil && r.apoya.some(function (a) { return sd.cursos.indexOf(a) >= 0; }); }).length;
    const debiles = razones.filter(function (r) { return r.debil; });
    let sj = razones.length ? coherentes / razones.length : 0;
    const extras = [];
    debiles.forEach(function (r) { extras.push("Sobre «" + BIO.plano(r.texto) + "»: " + BIO.plano(r.explicacion)); });
    const extremosElegidos = sd.cursos.filter(function (id) { return curso(cfg, id).tipo === "extremo"; });
    if (extremosElegidos.length) extras.push(BIO.datos.config.textos.eligioExtremo);
    agregar("justificacion", sj, "Razones coherentes con tu propuesta: " + coherentes + "/" + razones.length + ".", extras.join("\n\n"));
    // 5. Objeciones
    const rs = st.objeciones.respuestas;
    const buenas = rs.filter(function (r) { return r.tipo === "buena" || r.tipo === "revisar"; }).length;
    agregar("objeciones", rs.length ? buenas / rs.length : 0, "Respuestas que se hacen cargo de la objeción (o revisan la propuesta): " + buenas + "/" + rs.length + ". Revisiones de tu propuesta: " + sd.revisiones + ".");
    return { criterios: res, fecha: new Date().toISOString() };
  }
  BIO.deliberacion.calcularRubrica = calcularRubrica;
})();
