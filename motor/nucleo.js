/* =========================================================================
   NÚCLEO DEL MOTOR
   Define el espacio de nombres BIO y utilidades comunes.
   Se carga ANTES que los archivos de datos (datos/*.js).
   ========================================================================= */
window.BIO = window.BIO || {};
BIO.datos = {};
BIO.arte = {};
BIO.ui = {};

(function () {
  "use strict";

  /* Crea un elemento del DOM.
     BIO.el("button", { class: "btn", onclick: fn }, ["Texto", otroNodo]) */
  BIO.el = function (tag, attrs, hijos) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        const v = attrs[k];
        if (v == null || v === false) continue;
        if (k === "class") e.className = v;
        else if (k === "html") e.innerHTML = v;
        else if (k === "text") e.textContent = v;
        else if (k.slice(0, 2) === "on" && typeof v === "function") e.addEventListener(k.slice(2), v);
        else if (k === "style" && typeof v === "object") Object.assign(e.style, v);
        else e.setAttribute(k, v === true ? "" : v);
      }
    }
    if (hijos != null) {
      (Array.isArray(hijos) ? hijos : [hijos]).forEach(function (h) {
        if (h == null || h === false) return;
        e.appendChild(typeof h === "string" || typeof h === "number" ? document.createTextNode(String(h)) : h);
      });
    }
    return e;
  };
  BIO.$ = function (s, r) { return (r || document).querySelector(s); };
  BIO.$$ = function (s, r) { return Array.from((r || document).querySelectorAll(s)); };

  /* Bus de eventos mínimo */
  const oyentes = {};
  BIO.on = function (ev, fn) { (oyentes[ev] = oyentes[ev] || []).push(fn); };
  BIO.emitir = function (ev, d) { (oyentes[ev] || []).forEach(function (fn) { fn(d); }); };

  BIO.esperar = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  BIO.mezclar = function (arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };

  function escapar(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  BIO.escapar = escapar;

  /* Sustituciones en los textos de datos:
     {nombre}                 → nombre del estudiante
     {{masculino|femenino|neutro}} → según la forma de trato elegida al inicio
     {legal:id}               → resumen del dato legal con ese id (datos/legal.js)
     {faltan:grupo}           → cuántas evidencias de ese grupo faltan por encontrar */
  BIO.personalizar = function (s) {
    const j = (BIO.estado && BIO.estado.jugador) || {};
    const t = j.trato || 0;
    return String(s == null ? "" : s)
      .replace(/\{legal:([\w-]+)\}/g, function (_, id) {
        const l = BIO.datos.legal && BIO.datos.legal[id];
        return l ? l.resumen : "[dato legal «" + id + "» no encontrado]";
      })
      .replace(/\{\{([^{}]*)\}\}/g, function (_, g) {
        const p = g.split("|");
        return p[Math.min(t, p.length - 1)];
      })
      .replace(/\{nombre\}/g, j.nombre || "")
      .replace(/\{faltan:([\w-]+)\}/g, function (_, g) {
        return BIO.faltanGrupo ? String(BIO.faltanGrupo(g).length) : "";
      });
  };

  function enLinea(t) {
    return escapar(t)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  }

  /* Formato simple para textos de datos:
     **negrita**, *cursiva*, línea en blanco = párrafo nuevo,
     líneas que empiezan con "- " = lista. */
  BIO.formato = function (s) {
    const bloques = BIO.personalizar(s).split(/\n\s*\n/);
    return bloques.map(function (b) {
      const lineas = b.split("\n");
      let html = "", lista = [], parrafo = [];
      function cerrarLista() { if (lista.length) { html += "<ul>" + lista.map(function (l) { return "<li>" + enLinea(l) + "</li>"; }).join("") + "</ul>"; lista = []; } }
      function cerrarParrafo() { if (parrafo.length) { html += "<p>" + parrafo.map(enLinea).join("<br>") + "</p>"; parrafo = []; } }
      lineas.forEach(function (l) {
        if (/^\s*-\s+/.test(l)) { cerrarParrafo(); lista.push(l.replace(/^\s*-\s+/, "")); }
        else if (l.trim()) { cerrarLista(); parrafo.push(l); }
      });
      cerrarLista(); cerrarParrafo();
      return html;
    }).join("");
  };
  BIO.fmt = function (s, clase) { return BIO.el("div", { class: "texto " + (clase || ""), html: BIO.formato(s) }); };
  /* Versión sin marcas, para el archivo .txt y etiquetas */
  BIO.plano = function (s) { return BIO.personalizar(s).replace(/\*\*?/g, ""); };

  BIO.fecha = function (iso) {
    const d = iso ? new Date(iso) : new Date();
    const p = function (n) { return String(n).padStart(2, "0"); };
    return p(d.getDate()) + "-" + p(d.getMonth() + 1) + "-" + d.getFullYear();
  };

  BIO.anunciar = function (texto) {
    const a = document.getElementById("anuncios");
    if (!a) return;
    a.textContent = "";
    setTimeout(function () { a.textContent = BIO.plano(texto); }, 30);
  };
})();
