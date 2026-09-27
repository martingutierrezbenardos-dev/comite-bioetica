/* =========================================================================
   PERSONAJES: retratos estilizados originales (plano, sin rasgos detallados)
   Parámetros (en datos/comite.js o personajes del capítulo):
   { piel, pelo, peinado: "corto"|"largo"|"moño"|"rizado"|"calvo"|"cola",
     ropa, fondo, lentes: bool, barba: bool, estetoscopio: bool, bufanda: color }
   ========================================================================= */
(function () {
  "use strict";
  let n = 0;

  function sombra(hex, f) {
    const c = parseInt(hex.slice(1), 16);
    const r = Math.round(((c >> 16) & 255) * f), g = Math.round(((c >> 8) & 255) * f), b = Math.round((c & 255) * f);
    return "#" + ((1 << 24) + (Math.min(255, r) << 16) + (Math.min(255, g) << 8) + Math.min(255, b)).toString(16).slice(1);
  }
  BIO.arte.sombra = sombra;

  function peloAtras(r) {
    if (r.peinado === "largo") return '<path d="M33 52 C30 24 50 18 60 18 C72 18 90 24 87 52 L92 100 L28 100 Z" fill="' + r.pelo + '"/>';
    if (r.peinado === "cola") return '<path d="M78 40 C92 50 92 76 84 92 C80 80 80 60 76 48 Z" fill="' + r.pelo + '"/>';
    return "";
  }
  function peloFrente(r) {
    const c = r.pelo;
    switch (r.peinado) {
      case "moño":
        return '<circle cx="60" cy="21" r="11" fill="' + c + '"/><path d="M37 52 C35 28 48 24 60 24 C73 24 85 28 83 52 C80 40 71 34 60 34 C49 34 40 40 37 52 Z" fill="' + c + '"/>';
      case "largo":
        return '<path d="M36 50 C36 30 48 24 62 25 C76 26 84 34 84 50 C78 38 70 33 58 35 C50 36 42 42 36 50 Z" fill="' + c + '"/>';
      case "cola":
        return '<path d="M37 50 C35 28 50 23 62 24 C76 25 85 33 83 50 C78 39 70 34 60 34 C50 34 42 40 37 50 Z" fill="' + c + '"/>';
      case "rizado": {
        let s = "";
        [[40, 38], [46, 30], [54, 26], [63, 25], [72, 28], [79, 35], [82, 44], [38, 47]].forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="8" fill="' + c + '"/>'; });
        return s;
      }
      case "calvo":
        return '<path d="M37 56 C37 48 39 44 41 42 L42 58 Z M83 56 C83 48 81 44 79 42 L78 58 Z" fill="' + c + '"/>';
      default: // corto
        return '<path d="M37 52 C34 30 48 22 62 23 C76 24 86 34 83 52 C80 41 73 35 62 35 C52 35 43 40 37 52 Z" fill="' + c + '"/>';
    }
  }

  BIO.arte.retrato = function (r) {
    r = r || {};
    const P = BIO.arte.P;
    const piel = r.piel || "#d9a47c", ropa = r.ropa || P.teal, fondo = r.fondo || P.mostaza;
    const d = Object.assign({ pelo: "#3a2a22", peinado: "corto" }, r);
    const id = "rt" + (++n);
    let s = '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
      '<defs><clipPath id="' + id + '"><circle cx="60" cy="60" r="60"/></clipPath></defs>' +
      '<g clip-path="url(#' + id + ')">' +
      '<rect width="120" height="120" fill="' + fondo + '"/>' +
      peloAtras(d) +
      '<path d="M12 124 C16 94 36 84 60 84 C84 84 104 94 108 124 Z" fill="' + ropa + '"/>' +
      '<path d="M50 84 L60 98 L70 84 Z" fill="' + sombra(ropa, 0.75) + '"/>' +
      '<rect x="51" y="66" width="18" height="22" rx="6" fill="' + sombra(piel, 0.9) + '"/>' +
      '<ellipse cx="38" cy="55" rx="4" ry="6" fill="' + piel + '"/><ellipse cx="82" cy="55" rx="4" ry="6" fill="' + piel + '"/>' +
      '<ellipse cx="60" cy="52" rx="22" ry="26" fill="' + piel + '"/>' +
      peloFrente(d);
    if (d.barba) s += '<path d="M40 58 C42 76 50 80 60 80 C70 80 78 76 80 58 C76 68 70 72 60 72 C50 72 44 68 40 58 Z" fill="' + d.pelo + '"/>';
    s += '<circle cx="51.5" cy="54" r="2.3" fill="#2a2522"/><circle cx="68.5" cy="54" r="2.3" fill="#2a2522"/>' +
      '<path d="M46.5 47.5 Q51.5 45 56 47.3 M64 47.3 Q68.5 45 73.5 47.5" stroke="' + sombra(d.pelo, 1.1) + '" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<path d="M60 56 Q58 62 60.5 63" stroke="' + sombra(piel, 0.78) + '" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '<path d="M54 68 Q60 71.5 66 68" stroke="' + sombra(piel, 0.6) + '" stroke-width="2" fill="none" stroke-linecap="round"/>';
    if (d.lentes) s += '<g fill="none" stroke="#2b3440" stroke-width="2"><circle cx="51.5" cy="54" r="7"/><circle cx="68.5" cy="54" r="7"/><path d="M58.5 54 H61.5"/></g>';
    if (d.estetoscopio) s += '<path d="M44 86 C44 100 52 106 60 106 C68 106 76 100 76 86" fill="none" stroke="#2b3440" stroke-width="3"/><circle cx="60" cy="108" r="4" fill="#c9ced1" stroke="#2b3440" stroke-width="2"/>';
    if (d.bufanda) s += '<path d="M44 82 C52 90 68 90 76 82 L78 90 C68 98 52 98 42 90 Z" fill="' + d.bufanda + '"/>';
    if (d.credencial) s += '<rect x="72" y="96" width="14" height="10" rx="2" fill="#fff" stroke="#2b3440" stroke-width="1.5"/>';
    s += "</g></svg>";
    return s;
  };

  /* Ícono del estudiante (sin rasgos: cuaderno de observación) */
  BIO.arte.retratoJugador = function () {
    const P = BIO.arte.P;
    return '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><circle cx="60" cy="60" r="60" fill="' + P.verdeClaro + '"/>' +
      '<rect x="36" y="28" width="48" height="64" rx="5" fill="' + P.papel + '" stroke="' + P.tinta + '" stroke-width="3"/>' +
      '<path d="M44 44 H76 M44 56 H76 M44 68 H66" stroke="' + P.tinta + '" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M78 70 L92 56 L98 62 L84 76 L76 78 Z" fill="' + P.mostaza + '" stroke="' + P.tinta + '" stroke-width="2.5"/></svg>';
  };

  /* Figura de cuerpo entero para las escenas.
     x = centro, y = pies, h = altura total */
  BIO.arte.figura = function (x, y, h, r) {
    r = r || {};
    const P = BIO.arte.P;
    const piel = r.piel || "#d9a47c", ropa = r.ropa || P.teal, pelo = r.pelo || "#3a2a22", pantalon = r.pantalon || "#3b4650";
    const k = h / 400;
    const t = function (v) { return (v * k).toFixed(1); };
    let s = '<g transform="translate(' + (x - 60 * k).toFixed(1) + ',' + (y - h).toFixed(1) + ')">';
    // sombra en el piso
    s += '<ellipse cx="' + t(60) + '" cy="' + t(398) + '" rx="' + t(55) + '" ry="' + t(9) + '" fill="#000" opacity=".12"/>';
    // piernas
    s += '<rect x="' + t(34) + '" y="' + t(240) + '" width="' + t(22) + '" height="' + t(150) + '" rx="' + t(8) + '" fill="' + pantalon + '"/>';
    s += '<rect x="' + t(64) + '" y="' + t(240) + '" width="' + t(22) + '" height="' + t(150) + '" rx="' + t(8) + '" fill="' + pantalon + '"/>';
    s += '<rect x="' + t(28) + '" y="' + t(382) + '" width="' + t(30) + '" height="' + t(14) + '" rx="' + t(6) + '" fill="#2b2b2b"/>';
    s += '<rect x="' + t(62) + '" y="' + t(382) + '" width="' + t(30) + '" height="' + t(14) + '" rx="' + t(6) + '" fill="#2b2b2b"/>';
    // cuerpo
    if (r.delantal) s += '<path d="M' + t(18) + ' ' + t(110) + ' Q' + t(60) + ' ' + t(92) + ' ' + t(102) + ' ' + t(110) + ' L' + t(110) + ' ' + t(290) + ' L' + t(10) + ' ' + t(290) + ' Z" fill="#f4f4f1"/>';
    s += '<path d="M' + t(22) + ' ' + t(112) + ' Q' + t(60) + ' ' + t(96) + ' ' + t(98) + ' ' + t(112) + ' L' + t(102) + ' ' + t(250) + ' L' + t(18) + ' ' + t(250) + ' Z" fill="' + ropa + '"' + (r.delantal ? ' opacity=".9"' : "") + '/>';
    if (r.delantal) s += '<path d="M' + t(18) + ' ' + t(110) + ' L' + t(40) + ' ' + t(250) + ' L' + t(10) + ' ' + t(290) + ' Z M' + t(102) + ' ' + t(110) + ' L' + t(80) + ' ' + t(250) + ' L' + t(110) + ' ' + t(290) + ' Z" fill="#f4f4f1"/>';
    // brazos
    s += '<rect x="' + t(4) + '" y="' + t(118) + '" width="' + t(20) + '" height="' + t(120) + '" rx="' + t(10) + '" fill="' + (r.delantal ? "#ecebe6" : sombra(ropa, 0.88)) + '"/>';
    s += '<rect x="' + t(96) + '" y="' + t(118) + '" width="' + t(20) + '" height="' + t(120) + '" rx="' + t(10) + '" fill="' + (r.delantal ? "#ecebe6" : sombra(ropa, 0.88)) + '"/>';
    s += '<circle cx="' + t(14) + '" cy="' + t(242) + '" r="' + t(10) + '" fill="' + piel + '"/><circle cx="' + t(106) + '" cy="' + t(242) + '" r="' + t(10) + '" fill="' + piel + '"/>';
    // cuello y cabeza
    s += '<rect x="' + t(50) + '" y="' + t(80) + '" width="' + t(20) + '" height="' + t(24) + '" fill="' + sombra(piel, 0.9) + '"/>';
    if (r.peinado === "largo") s += '<path d="M' + t(30) + ' ' + t(50) + ' C' + t(28) + ' ' + t(10) + ' ' + t(92) + ' ' + t(10) + ' ' + t(90) + ' ' + t(50) + ' L' + t(94) + ' ' + t(120) + ' L' + t(26) + ' ' + t(120) + ' Z" fill="' + pelo + '"/>';
    s += '<ellipse cx="' + t(60) + '" cy="' + t(52) + '" rx="' + t(28) + '" ry="' + t(34) + '" fill="' + piel + '"/>';
    if (r.peinado === "moño") s += '<circle cx="' + t(60) + '" cy="' + t(14) + '" r="' + t(13) + '" fill="' + pelo + '"/>';
    if (r.peinado !== "calvo") s += '<path d="M' + t(32) + ' ' + t(50) + ' C' + t(30) + ' ' + t(14) + ' ' + t(90) + ' ' + t(14) + ' ' + t(88) + ' ' + t(50) + ' C' + t(80) + ' ' + t(32) + ' ' + t(40) + ' ' + t(32) + ' ' + t(32) + ' ' + t(50) + ' Z" fill="' + pelo + '"/>';
    else s += '<path d="M' + t(32) + ' ' + t(58) + ' L' + t(34) + ' ' + t(40) + ' L' + t(38) + ' ' + t(62) + ' Z M' + t(88) + ' ' + t(58) + ' L' + t(86) + ' ' + t(40) + ' L' + t(82) + ' ' + t(62) + ' Z" fill="' + pelo + '"/>';
    if (r.barba) s += '<path d="M' + t(34) + ' ' + t(58) + ' C' + t(38) + ' ' + t(92) + ' ' + t(82) + ' ' + t(92) + ' ' + t(86) + ' ' + t(58) + ' C' + t(76) + ' ' + t(76) + ' ' + t(44) + ' ' + t(76) + ' ' + t(34) + ' ' + t(58) + ' Z" fill="' + pelo + '"/>';
    if (r.lentes) s += '<path d="M' + t(40) + ' ' + t(54) + ' h' + t(16) + ' M' + t(64) + ' ' + t(54) + ' h' + t(16) + ' M' + t(56) + ' ' + t(54) + ' h' + t(8) + '" stroke="#2b3440" stroke-width="' + t(4) + '"/>';
    if (r.taza) s += '<rect x="' + t(98) + '" y="' + t(222) + '" width="' + t(22) + '" height="' + t(26) + '" rx="' + t(4) + '" fill="#f7f3ea" stroke="#2b3440" stroke-width="' + t(3) + '"/>';
    if (r.carpeta) s += '<rect x="' + t(-6) + '" y="' + t(170) + '" width="' + t(34) + '" height="' + t(46) + '" rx="' + t(3) + '" fill="' + P.azul + '"/>';
    s += "</g>";
    return s;
  };
})();
