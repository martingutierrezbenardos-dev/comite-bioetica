/* =========================================================================
   MODO DOCENTE
   Clave simple definida en datos/config.js (docente.clave). NO es seguridad
   real: solo evita que los estudiantes entren por accidente.
   Permite: activar/desactivar capítulos, saltar a cualquier capítulo,
   leer la guía docente y borrar el progreso de este navegador.
   ========================================================================= */
(function () {
  "use strict";
  const el = BIO.el;

  BIO.docente = { activo: false };

  /* ¿Está activo el capítulo? (preferencia del docente o valor por defecto) */
  BIO.docente.capActivo = function (id) {
    const pref = BIO.guardado.docente().capsActivos;
    if (pref && typeof pref[id] === "boolean") return pref[id];
    const c = BIO.datos.config.capitulos.find(function (x) { return x.id === id; });
    return c ? c.activo !== false : false;
  };

  BIO.docente.abrir = function () {
    if (BIO.docente.activo) { BIO.docente.panel(); return; }
    const inp = el("input", { type: "password", id: "clave-docente", autocomplete: "off" });
    const cont = el("div", {}, [
      el("p", {}, "Ingresa la clave del modo docente (se define en datos/config.js)."),
      el("label", { for: "clave-docente" }, "Clave"), inp,
      el("p", { class: "ayuda" }, "Esta clave no es un sistema de seguridad: solo evita entradas accidentales.")
    ]);
    function entrar(api) {
      if (inp.value === BIO.datos.config.docente.clave) {
        BIO.docente.activo = true;
        api.cerrar();
        BIO.docente.panel();
      } else {
        BIO.ui.toast("Clave incorrecta");
        inp.select();
      }
      return false;
    }
    const m = BIO.ui.modal({ titulo: "Modo docente", contenido: cont, foco: inp, botones: [
      { texto: "Cancelar", clase: "btn-sec" },
      { texto: "Entrar", cierra: false, accion: entrar }
    ] });
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); entrar(m); } });
  };

  BIO.docente.panel = function () {
    const cfg = BIO.datos.config;
    const cont = el("div", { class: "docente" });

    // Capítulos
    cont.appendChild(el("h3", {}, "Capítulos"));
    cont.appendChild(el("p", { class: "ayuda" }, "Los capítulos desactivados no aparecen disponibles para los estudiantes en este navegador. Mientras el modo docente esté activo, todos los capítulos construidos quedan desbloqueados."));
    const tabla = el("table", { class: "tabla" }, el("thead", {}, el("tr", {}, [el("th", {}, "Capítulo"), el("th", {}, "Activo"), el("th", {}, "Ir")])));
    const tb = el("tbody");
    cfg.capitulos.forEach(function (c) {
      const construido = !!BIO.datos[c.id];
      const id = "doc-act-" + c.id;
      const chk = el("input", { type: "checkbox", id: id, onchange: function () {
        const d = BIO.guardado.docente();
        d.capsActivos = d.capsActivos || {};
        d.capsActivos[c.id] = chk.checked;
        BIO.guardado.guardarDocente(d);
        BIO.ui.toast("Capítulo " + c.numero + (chk.checked ? " activado" : " desactivado"));
      } });
      chk.checked = BIO.docente.capActivo(c.id);
      tb.appendChild(el("tr", {}, [
        el("td", {}, [el("label", { for: id }, c.numero + ". " + c.titulo), construido ? null : el("span", { class: "ayuda" }, " (en preparación)")]),
        el("td", {}, chk),
        el("td", {}, construido ? el("button", { class: "btn btn-mini", type: "button", onclick: function () { m.cerrar(); if (!BIO.estado.jugador) BIO.estado.jugador = { nombre: "Docente", apellido: "", curso: "Prueba", trato: 2 }; BIO.iniciarCapitulo(c.id); } }, "Jugar") : "—")
      ]));
    });
    tabla.appendChild(tb);
    cont.appendChild(tabla);

    // Guía docente
    cont.appendChild(el("h3", {}, "Guía docente"));
    const G = BIO.datos.guiaDocente || {};
    if (G.general) {
      const det = el("details", { class: "guia" }, el("summary", {}, BIO.plano(G.general.titulo)));
      G.general.secciones.forEach(function (s) { det.append(el("h4", {}, BIO.plano(s.titulo)), BIO.fmt(s.texto)); });
      cont.appendChild(det);
    }
    cfg.capitulos.forEach(function (c) {
      const g = G[c.id];
      if (!g) return;
      const det = el("details", { class: "guia" }, el("summary", {}, "Capítulo " + c.numero + ": " + c.titulo));
      function lista(titulo, arr) { if (!arr || !arr.length) return; det.append(el("h4", {}, titulo), el("ul", {}, arr.map(function (x) { return el("li", {}, BIO.fmt(x)); }))); }
      lista("Objetivos de aprendizaje", g.objetivos);
      lista("Preguntas para la discusión en clase", g.preguntas);
      lista("Conceptos erróneos frecuentes", g.errores);
      lista("Sugerencias para conducir el debate", g.sugerencias);
      if (g.notas) det.append(el("h4", {}, "Notas"), BIO.fmt(g.notas));
      cont.appendChild(det);
    });

    const m = BIO.ui.modal({ titulo: "Modo docente", clase: "grande", contenido: cont, botones: [
      { texto: "Borrar progreso de este navegador", clase: "btn-peligro", cierra: false, accion: function (api) {
        BIO.ui.confirmar("Se borrará la partida guardada en este navegador (no afecta la configuración de capítulos). ¿Continuar?", "Sí, borrar").then(function (ok) {
          if (!ok) return;
          api.cerrar(); BIO.guardado.borrar(); BIO.mostrarPortada(); BIO.ui.toast("Progreso borrado");
        });
        return false;
      } },
      { texto: "Salir del modo docente", clase: "btn-sec", accion: function () { BIO.docente.activo = false; BIO.ui.toast("Modo docente desactivado"); if (!BIO.$("#pantalla-capitulos").hidden) BIO.mostrarCapitulos(); } },
      { texto: "Cerrar", accion: function () { if (!BIO.$("#pantalla-capitulos").hidden) BIO.mostrarCapitulos(); } }
    ] });
  };
})();
