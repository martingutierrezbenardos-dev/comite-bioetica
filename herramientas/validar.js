/* =========================================================================
   VALIDADOR DE DATOS
   Revisa que los archivos de datos no tengan referencias rotas, escenas
   inalcanzables, evidencias imposibles de obtener, etc.
   Se usa desde herramientas/validar-datos.html (abrir en el navegador).
   ========================================================================= */
function validarDatos(BIO) {
  "use strict";
  const errores = [], avisos = [];
  const D = BIO.datos;
  const E = function (m) { errores.push(m); };
  const W = function (m) { avisos.push(m); };
  const principios = (D.config.principios || []).map(function (p) { return p.id; });

  function partir(ef) { const i = ef.indexOf(":"); return { tipo: i < 0 ? ef : ef.slice(0, i), arg: i < 0 ? "" : ef.slice(i + 1) }; }

  function revisarLegalEnTexto(t, donde) {
    String(t || "").replace(/\{legal:([\w-]+)\}/g, function (_, id) { if (!D.legal[id]) E(donde + ": {legal:" + id + "} no existe en datos/legal.js"); });
  }

  (D.config.capitulos || []).forEach(function (ci) {
    const c = D[ci.id];
    if (!c) { W("Capítulo " + ci.id + ": sin archivo de datos (aparecerá «En preparación»)."); return; }
    const P = "[" + ci.id + "] ";
    const banderasPuestas = {}, banderasUsadas = {}, evObtenibles = {}, escenasDestino = {};
    const escenas = c.escenas || {}, dialogos = c.dialogos || {}, minijuegos = c.minijuegos || {}, evid = c.evidencias || {};

    function efectos(lista, donde) {
      (lista || []).forEach(function (ef) {
        const p = partir(ef);
        switch (p.tipo) {
          case "bandera": banderasPuestas[p.arg] = true; break;
          case "quitar": break;
          case "leer": if (!evid[p.arg]) E(P + donde + ": evidencia «" + p.arg + "» no existe"); break;
          case "evidencia": if (!evid[p.arg]) E(P + donde + ": evidencia «" + p.arg + "» no existe"); evObtenibles[p.arg] = true; break;
          case "concepto": if (!D.cuaderno[p.arg]) E(P + donde + ": concepto «" + p.arg + "» no existe en cuaderno.js"); break;
          case "glosario": if (!D.glosario[p.arg]) E(P + donde + ": término «" + p.arg + "» no existe en glosario.js"); break;
          case "ir": if (!escenas[p.arg]) E(P + donde + ": escena «" + p.arg + "» no existe"); escenasDestino[p.arg] = (escenasDestino[p.arg] || []).concat(donde); break;
          case "dialogo": if (!dialogos[p.arg]) E(P + donde + ": diálogo «" + p.arg + "» no existe"); break;
          case "minijuego": if (!minijuegos[p.arg]) E(P + donde + ": minijuego «" + p.arg + "» no existe"); break;
          case "deliberacion": if (!c.deliberacion) E(P + donde + ": no hay deliberación definida"); break;
          case "cierre": if (!c.cierre) E(P + donde + ": no hay cierre definido"); break;
          case "completar": case "aviso": case "texto": break;
          default: E(P + donde + ": efecto desconocido «" + ef + "»");
        }
      });
    }
    function condiciones(lista, donde) {
      (lista || []).forEach(function (c0) {
        if (c0.indexOf("|") >= 0) { condiciones(c0.split("|").map(function (x) { return x.trim(); }), donde); return; }
        const p = partir(c0.replace(/^!/, ""));
        if (p.tipo === "bandera") banderasUsadas[p.arg] = donde;
        else if (p.tipo === "evidencia" && !evid[p.arg]) E(P + donde + ": condición sobre evidencia inexistente «" + p.arg + "»");
        else if (p.tipo === "minijuego" && !minijuegos[p.arg]) E(P + donde + ": condición sobre minijuego inexistente «" + p.arg + "»");
        else if (p.tipo === "grupo" && !Object.keys(evid).some(function (k) { return evid[k].grupo === p.arg; })) E(P + donde + ": grupo «" + p.arg + "» no tiene evidencias");
        else if (["bandera", "evidencia", "evidencias", "minijuego", "grupo", "visto"].indexOf(p.tipo) < 0) E(P + donde + ": condición desconocida «" + c0 + "»");
      });
    }
    function hablante(id, donde) {
      if (!id || id === "narrador" || id === "jugador") return;
      if (!(D.comite[id] || (c.personajes && c.personajes[id]))) E(P + donde + ": personaje «" + id + "» no existe");
    }

    if (!c.inicio || !escenas[c.inicio.escena]) E(P + "inicio.escena no existe");
    efectos(c.inicio && c.inicio.efectos, "inicio");

    Object.keys(escenas).forEach(function (eid) {
      const e = escenas[eid];
      if (e.id !== eid) E(P + "escena «" + eid + "»: el campo id debe ser «" + eid + "»");
      if (!BIO.arte.escenas || !BIO.arte.escenas[e.arte]) W(P + "escena «" + eid + "»: no hay arte «" + e.arte + "» (se verá un fondo liso)");
      (e.alEntrar || []).forEach(function (r, i) { condiciones(r.si, "escena " + eid + " alEntrar " + i); efectos(r.efectos, "escena " + eid + " alEntrar"); });
      const ids = {};
      (e.hotspots || []).forEach(function (h) {
        const d = "escena " + eid + " › zona " + h.id;
        if (ids[h.id]) E(P + d + ": id repetido"); ids[h.id] = true;
        ["x", "y", "w", "h"].forEach(function (k) { if (typeof h[k] !== "number") E(P + d + ": falta " + k); });
        if (h.x + h.w > 100.5 || h.y + h.h > 100.5) W(P + d + ": se sale del dibujo");
        if (h.w < 4 || h.h < 5) W(P + d + ": zona muy pequeña para tablet");
        condiciones(h.si, d);
        efectos(h.acciones, d);
        if (!h.acciones && !h.texto) W(P + d + ": no hace nada");
      });
    });

    Object.keys(dialogos).forEach(function (did) {
      const dg = dialogos[did];
      if (!dg.nodos || !dg.nodos.inicio) { E(P + "diálogo «" + did + "» sin nodo inicio"); return; }
      efectos(dg.alTerminar, "diálogo " + did + " alTerminar");
      Object.keys(dg.nodos).forEach(function (nid) {
        const n = dg.nodos[nid], d = "diálogo " + did + " › " + nid;
        hablante(n.habla, d);
        revisarLegalEnTexto(n.texto, P + d);
        efectos(n.efectos, d);
        if (n.ir && n.ir !== "FIN" && !dg.nodos[n.ir]) E(P + d + ": ir a nodo inexistente «" + n.ir + "»");
        (n.opciones || []).forEach(function (o, i) {
          condiciones(o.si, d + " opción " + (i + 1));
          efectos(o.efectos, d + " opción " + (i + 1));
          if (o.ir && o.ir !== "FIN" && !dg.nodos[o.ir]) E(P + d + " opción " + (i + 1) + ": ir a nodo inexistente «" + o.ir + "»");
        });
        if (n.opciones && n.opciones.length && n.opciones.every(function (o) { return o.si; })) W(P + d + ": todas las opciones tienen condición; si ninguna se cumple, aparece «Terminar conversación»");
      });
    });

    Object.keys(evid).forEach(function (id) {
      const ev = evid[id];
      if (!ev.titulo || !ev.texto) E(P + "evidencia «" + id + "» sin título o texto");
      if (ev.legal && !D.legal[ev.legal]) E(P + "evidencia «" + id + "»: legal «" + ev.legal + "» no existe");
      revisarLegalEnTexto(ev.texto, P + "evidencia " + id);
      if (ev.grupo && typeof ev.fecha !== "number") E(P + "evidencia «" + id + "» del grupo «" + ev.grupo + "» necesita una fecha numérica");
    });

    Object.keys(minijuegos).forEach(function (mid) {
      const m = minijuegos[mid], d = "minijuego " + mid;
      if (!BIO.minijuegos.tipos[m.tipo]) E(P + d + ": tipo «" + m.tipo + "» no existe");
      efectos(m.alCompletar, d + " alCompletar");
      if (!m.pistas || m.pistas.length !== 3) W(P + d + ": se recomiendan exactamente 3 pistas");
      if (m.tipo === "relacionar") {
        const cats = m.categorias.map(function (x) { return x.id; });
        m.items.forEach(function (it) { it.correctas.forEach(function (k) { if (cats.indexOf(k) < 0) E(P + d + " › " + it.id + ": categoría «" + k + "» no existe"); }); });
      }
      if (m.tipo === "entrevista") {
        hablante(m.persona, d); if (m.guia) hablante(m.guia, d);
        m.criterios.forEach(function (k) { if (!k.preguntas.some(function (q) { return q.buena; })) E(P + d + " › " + k.id + ": ninguna pregunta es buena (no se puede terminar)"); });
        if (m.veredicto.opciones.filter(function (o) { return o.correcta; }).length !== 1) E(P + d + ": el veredicto debe tener exactamente 1 opción correcta");
      }
      if (m.tipo === "lineaTiempo") (m.distractores || []).forEach(function (k) { if (!evid[k]) E(P + d + ": distractor «" + k + "» no existe"); evObtenibles[k] = evObtenibles[k] || false; });
    });

    // Deliberación
    const dl = c.deliberacion;
    if (dl) {
      efectos(dl.alTerminar, "deliberación alTerminar");
      Object.keys(dl.guion || {}).forEach(function (k) { hablante(dl.guion[k].habla, "deliberación guion " + k); });
      dl.hechos.items.forEach(function (it) { if (!evid[it.ev]) E(P + "deliberación: evidencia «" + it.ev + "» no existe"); });
      if (!dl.hechos.items.some(function (i) { return i.relevancia === "decisiva"; })) W(P + "deliberación: ninguna evidencia es «decisiva»");
      dl.valores.lista.forEach(function (v) {
        (v.partes || []).forEach(function (p) { if (!dl.valores.partes.some(function (x) { return x.id === p; })) E(P + "valor «" + v.id + "»: parte «" + p + "» no existe"); });
        if (!v.trampa) (v.principios || []).forEach(function (p) { if (principios.indexOf(p) < 0) E(P + "valor «" + v.id + "»: principio «" + p + "» no existe"); });
      });
      const cursos = dl.cursos.lista.map(function (x) { return x.id; });
      const ext = dl.cursos.lista.filter(function (x) { return x.tipo === "extremo"; });
      if (ext.length !== 2) E(P + "deliberación: debe haber exactamente 2 cursos extremos (hay " + ext.length + ")");
      if (!dl.cursos.lista.some(function (x) { return x.tipo === "intermedio" && !x.falsoIntermedio && !x.marca; })) E(P + "deliberación: debe haber al menos un curso intermedio válido");
      dl.cursos.lista.forEach(function (k) { if (k.marca) hablante(k.quienBloquea || "paula", "curso " + k.id); });
      dl.decision.razones.forEach(function (r) { r.apoya.forEach(function (a) { if (cursos.indexOf(a) < 0) E(P + "razón «" + r.id + "»: curso «" + a + "» no existe"); }); });
      Object.keys(dl.decision.objeciones).forEach(function (k) {
        if (k !== "*" && cursos.indexOf(k) < 0) E(P + "objeciones: curso «" + k + "» no existe");
        dl.decision.objeciones[k].forEach(function (o) { hablante(o.quien, "objeción " + o.id); o.respuestas.forEach(function (r) { if (r.quienComenta) hablante(r.quienComenta, "objeción " + o.id); if (["buena", "debil"].indexOf(r.tipo) < 0) E(P + "objeción " + o.id + ": tipo de respuesta debe ser «buena» o «debil»"); }); });
      });
      if (!dl.decision.objeciones["*"]) W(P + "objeciones: conviene incluir objeciones generales «*»");
      (dl.decision.incompatibles || []).forEach(function (par) { [par[0], par[1]].forEach(function (a) { if (cursos.indexOf(a) < 0) E(P + "incompatibles: curso «" + a + "» no existe"); }); });
      dl.consistencia.forEach(function (q) { hablante(q.quien, "consistencia " + q.id); });
    }

    // Cierre
    if (c.cierre) {
      efectos(c.cierre.alTerminar, "cierre alTerminar");
      c.cierre.quiz.forEach(function (q) {
        const n = q.opciones.filter(function (o) { return o.correcta; }).length;
        if (n !== 1) E(P + "pregunta " + q.id + ": debe tener exactamente 1 opción correcta (tiene " + n + ")");
        q.opciones.forEach(function (o, i) { if (!o.explicacion) W(P + "pregunta " + q.id + " opción " + (i + 1) + ": sin explicación"); });
      });
      if (c.cierre.reflexiones.length < 2 || c.cierre.reflexiones.length > 3) W(P + "se recomiendan 2 o 3 preguntas de reflexión");
    }

    // Objetivos
    (c.objetivos || []).forEach(function (o) {
      condiciones([o.hecho], "objetivo " + o.id);
      if (!o.pistas || o.pistas.length !== 3) W(P + "objetivo " + o.id + ": se recomiendan 3 pistas");
    });

    // Evidencias obtenibles
    Object.keys(evid).forEach(function (id) { if (!evObtenibles[id]) E(P + "evidencia «" + id + "» no se puede obtener en ningún lugar"); });
    // Banderas usadas pero nunca puestas
    Object.keys(banderasUsadas).forEach(function (b) { if (b.indexOf("global.") !== 0 && !banderasPuestas[b]) E(P + "la bandera «" + b + "» se consulta (" + banderasUsadas[b] + ") pero nunca se activa"); });
    // Escenas alcanzables
    Object.keys(escenas).forEach(function (eid) { if (eid !== c.inicio.escena && !escenasDestino[eid]) E(P + "escena «" + eid + "» no es alcanzable"); });
    Object.keys(escenas).forEach(function (eid) {
      const tieneSalida = (escenas[eid].hotspots || []).some(function (h) { return !h.si && (h.acciones || []).some(function (a) { return a.indexOf("ir:") === 0; }); });
      if (!tieneSalida && Object.keys(escenas).length > 1) W(P + "escena «" + eid + "» no tiene una salida siempre visible");
    });
  });

  Object.keys(D.legal).forEach(function (k) { if (D.legal[k].verificar) W("Dato legal/empírico «" + k + "» marcado para verificar (vigente a: " + D.legal[k].vigente_a_la_fecha + ")."); });
  return { errores: errores, avisos: avisos };
}
if (typeof module !== "undefined") module.exports = validarDatos;
