/* =========================================================================
   ESCENAS (SVG, lienzo de 1600 × 900)
   Cada función recibe un contexto (ctx.b("bandera") → true/false) para
   dibujar variaciones según el avance. Las zonas clicables se definen
   aparte, en los datos del capítulo, con coordenadas en porcentaje.
   ========================================================================= */
(function () {
  "use strict";
  const A = BIO.arte, P = A.P;
  A.escenas = A.escenas || {};
  /* Utilidades compartidas con los archivos de escenas de otros capítulos */

  function svg(contenido) {
    return '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' + contenido + "</svg>";
  }
  function rasgos(id) {
    const d = BIO.datosCap && BIO.datosCap();
    const c = (d && d.personajes && d.personajes[id]) || (BIO.datos.comite && BIO.datos.comite[id]);
    return (c && (c.figura || c.retrato)) || {};
  }
  function fig(id, x, y, h, extra) { return A.figura(x, y, h, Object.assign({}, rasgos(id), extra || {})); }
  function texto(x, y, t, tam, color, peso, ancla) {
    return '<text x="' + x + '" y="' + y + '" font-family="system-ui, sans-serif" font-size="' + (tam || 24) + '" font-weight="' + (peso || 700) + '" fill="' + (color || P.tinta) + '" text-anchor="' + (ancla || "middle") + '">' + t + "</text>";
  }
  function placa(x, y, w, h, t, tam) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + P.teal + '"/>' + texto(x + w / 2, y + h / 2 + (tam || 20) * 0.35, t, tam || 20, "#fff");
  }
  function caja(x, y, w, h, color, etiqueta, tam) {
    const c = color || P.carton;
    let s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4" fill="' + c + '"/>' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + (h * 0.16) + '" fill="' + A.sombra(c, 0.85) + '"/>';
    if (etiqueta) s += '<rect x="' + (x + w * 0.14) + '" y="' + (y + h * 0.36) + '" width="' + (w * 0.72) + '" height="' + (h * 0.34) + '" rx="3" fill="' + P.papel + '"/>' + texto(x + w / 2, y + h * 0.36 + h * 0.34 / 2 + (tam || 16) * 0.35, etiqueta, tam || 16, P.tinta, 700);
    return s;
  }
  function piso(y) {
    let s = '<rect x="0" y="' + y + '" width="1600" height="' + (900 - y) + '" fill="' + P.piso + '"/>';
    for (let i = 0; i < 9; i++) s += '<line x1="' + (i * 200) + '" y1="' + y + '" x2="' + (i * 200 - 120) + '" y2="900" stroke="' + P.piso2 + '" stroke-width="3"/>';
    return s;
  }

  A.util = { svg: svg, fig: fig, texto: texto, placa: placa, caja: caja, piso: piso };

  /* ---------- PORTADA: exterior del hospital bajo la lluvia ---------- */
  A.escenas.portada = function () {
    let lluvia = "";
    for (let i = 0; i < 90; i++) {
      const x = (i * 97) % 1640, y = (i * 61) % 900;
      lluvia += '<line x1="' + x + '" y1="' + y + '" x2="' + (x - 10) + '" y2="' + (y + 34) + '"/>';
    }
    let arboles = "";
    [[80, 610, 1], [190, 640, .8], [1380, 620, 1.1], [1500, 600, .9], [1290, 650, .7]].forEach(function (a) {
      const x = a[0], y = a[1], k = a[2];
      arboles += '<rect x="' + (x - 8 * k) + '" y="' + (y - 20) + '" width="' + 16 * k + '" height="' + 90 * k + '" fill="' + P.maderaOsc + '"/>' +
        '<ellipse cx="' + x + '" cy="' + (y - 80 * k) + '" rx="' + 70 * k + '" ry="' + 90 * k + '" fill="' + P.verdeOsc + '"/>' +
        '<ellipse cx="' + (x - 30 * k) + '" cy="' + (y - 40 * k) + '" rx="' + 50 * k + '" ry="' + 60 * k + '" fill="' + P.verde + '"/>';
    });
    let ventanas = "";
    for (let f = 0; f < 2; f++) for (let c = 0; c < 9; c++) {
      ventanas += '<rect x="' + (440 + c * 82) + '" y="' + (470 + f * 90) + '" width="52" height="52" rx="4" fill="' + ((c + f) % 3 === 0 ? P.luz : "#dfe6e4") + '"/>';
    }
    return svg(
      '<defs><linearGradient id="cieloP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fa7ae"/><stop offset="1" stop-color="#d9e2de"/></linearGradient></defs>' +
      '<rect width="1600" height="900" fill="url(#cieloP)"/>' +
      '<path d="M420 560 L820 150 L1220 560 Z" fill="' + P.volcan + '"/>' +
      '<path d="M745 228 L820 150 L895 228 Q858 214 820 240 Q782 214 745 228 Z" fill="' + P.nieve + '"/>' +
      '<path d="M0 600 Q400 500 800 580 T1600 560 V900 H0 Z" fill="' + P.verdeClaro + '"/>' +
      '<path d="M0 700 Q500 640 1000 700 T1600 690 V900 H0 Z" fill="' + P.verde + '"/>' +
      arboles +
      // edificio
      '<rect x="400" y="430" width="800" height="250" fill="' + P.pared + '"/>' +
      '<rect x="400" y="430" width="800" height="18" fill="' + P.madera + '"/>' +
      '<path d="M380 434 L800 380 L1220 434 Z" fill="#7c3a2c"/>' +
      ventanas +
      '<rect x="760" y="580" width="80" height="100" rx="4" fill="' + P.teal + '"/>' +
      '<rect x="620" y="394" width="360" height="34" rx="6" fill="' + P.teal + '"/>' +
      texto(800, 418, "HOSPITAL REGIONAL DE RÍO ARRAYÁN", 18, "#fff") +
      '<rect x="0" y="680" width="1600" height="220" fill="#5d6f63"/>' +
      '<path d="M0 760 H1600" stroke="#7c8c80" stroke-width="6" stroke-dasharray="40 30"/>' +
      '<g class="lluvia" stroke="#ffffff" stroke-opacity=".45" stroke-width="2.5" stroke-linecap="round">' + lluvia + "</g>"
    );
  };

  /* ---------- PASILLO (centro de navegación) ---------- */
  A.escenas.pasillo = function (ctx) {
    let s = '<rect width="1600" height="640" fill="' + P.pared + '"/>' +
      '<rect x="0" y="0" width="1600" height="40" fill="' + P.pared2 + '"/>';
    for (let i = 0; i < 4; i++) s += '<rect x="' + (140 + i * 400) + '" y="10" width="200" height="18" rx="6" fill="#fff8e3"/>';
    s += '<rect x="0" y="470" width="1600" height="170" fill="' + P.zocalo + '"/>' +
      '<rect x="0" y="462" width="1600" height="12" fill="' + P.zocaloOsc + '"/>' +
      piso(640);
    // Puerta archivo
    s += '<rect x="110" y="190" width="240" height="452" fill="' + P.maderaOsc + '"/>' +
      '<rect x="126" y="206" width="208" height="436" fill="' + P.madera + '"/>' +
      '<rect x="160" y="240" width="140" height="120" rx="4" fill="' + P.maderaClara + '"/>' +
      '<circle cx="310" cy="440" r="9" fill="' + P.mostaza + '"/>' +
      placa(115, 132, 230, 44, "ARCHIVO · SUBSUELO", 17) +
      '<path d="M205 290 v40 m-14 -14 l14 14 l14 -14" stroke="' + P.tinta + '" stroke-width="5" fill="none"/>';
    // Puerta comité
    s += '<rect x="500" y="190" width="240" height="452" fill="' + P.tealOsc + '"/>' +
      '<rect x="516" y="206" width="208" height="436" fill="' + P.teal + '"/>' +
      '<rect x="550" y="240" width="140" height="160" rx="4" fill="#dfe7e4"/>' +
      '<circle cx="700" cy="440" r="9" fill="' + P.mostaza + '"/>' +
      placa(470, 120, 300, 56, "COMITÉ DE ÉTICA", 20) +
      texto(620, 205, "ASISTENCIAL", 16, P.tinta);
    // Ventana
    s += A.ventana(860, 130, 380, 310);
    // Banca y planta
    s += '<rect x="880" y="560" width="340" height="22" rx="6" fill="' + P.madera + '"/>' +
      '<rect x="900" y="582" width="16" height="58" fill="' + P.maderaOsc + '"/><rect x="1184" y="582" width="16" height="58" fill="' + P.maderaOsc + '"/>' +
      '<rect x="1236" y="580" width="50" height="60" rx="6" fill="' + P.terracota + '"/>' +
      '<ellipse cx="1261" cy="555" rx="40" ry="45" fill="' + P.verde + '"/><ellipse cx="1245" cy="530" rx="22" ry="34" fill="' + P.verdeOsc + '"/>';
    // Máquina de café
    s += '<rect x="1330" y="330" width="130" height="312" rx="10" fill="#3d4a52"/>' +
      '<rect x="1348" y="352" width="94" height="70" rx="6" fill="#cfe3d8"/>' +
      texto(1395, 395, "CAFÉ", 20, P.tinta) +
      '<rect x="1370" y="470" width="50" height="60" rx="4" fill="#232b30"/>' +
      '<circle cx="1360" cy="445" r="7" fill="' + P.mostaza + '"/><circle cx="1385" cy="445" r="7" fill="' + P.terracota + '"/>';
    // Tomás
    s += fig("tomas", 1515, 800, 390, { taza: true });
    // Inés (solo al comienzo)
    if (!ctx.b("intro")) s += fig("ines", 820, 790, 400, { carpeta: true });
    return svg(s);
  };

  /* ---------- ARCHIVO DEL SUBSUELO ---------- */
  A.escenas.archivo = function (ctx) {
    let s = '<rect width="1600" height="720" fill="' + P.paredArchivo + '"/>' + piso(720);
    // ventanita alta y ampolleta
    s += A.ventana(1045, 70, 150, 70);
    s += '<line x1="760" y1="0" x2="760" y2="70" stroke="' + P.tinta + '" stroke-width="3"/><circle cx="760" cy="84" r="16" fill="#fff4c9"/><circle cx="760" cy="84" r="40" fill="#fff4c9" opacity=".25"/>';
    // Estante
    s += '<rect x="40" y="110" width="440" height="600" fill="' + P.maderaOsc + '"/>' +
      '<rect x="56" y="126" width="408" height="574" fill="#7a5439"/>';
    [275, 435, 595].forEach(function (y) { s += '<rect x="40" y="' + y + '" width="440" height="14" fill="' + P.madera + '"/>'; });
    // repisa 1
    s += caja(70, 175, 160, 100, P.carton, "ALEMANIA 1946-47", 14) + caja(245, 195, 100, 80, P.cartonOsc) + caja(355, 185, 100, 90, P.carton);
    // repisa 2
    s += caja(70, 345, 160, 90, P.cartonOsc) + caja(250, 335, 200, 100, P.carton, "RECORTES EE.UU.", 15);
    // repisa 3: carpetas
    s += '<rect x="70" y="470" width="90" height="125" rx="4" fill="' + P.azul + '"/><rect x="92" y="500" width="46" height="40" rx="3" fill="' + P.papel + '"/>' + texto(115, 526, "1979", 14);
    s += '<rect x="180" y="470" width="90" height="125" rx="4" fill="' + P.gris + '"/><rect x="202" y="500" width="46" height="40" rx="3" fill="' + P.papel + '"/>' + texto(225, 526, "1974", 14);
    s += '<rect x="290" y="490" width="40" height="105" fill="' + P.terracota + '"/><rect x="334" y="480" width="36" height="115" fill="' + P.verde + '"/><rect x="374" y="495" width="44" height="100" fill="' + P.mostaza + '"/>';
    // repisa 4
    s += caja(70, 620, 180, 80, P.cartonOsc) + caja(270, 630, 180, 70, P.carton);
    // Pizarra de corcho
    s += '<rect x="540" y="130" width="380" height="290" rx="6" fill="' + P.maderaOsc + '"/><rect x="554" y="144" width="352" height="262" fill="#c79a63"/>';
    s += '<rect x="620" y="156" width="220" height="36" rx="4" fill="' + P.papel + '"/>' + texto(730, 181, "POR QUÉ EXISTIMOS", 18);
    if (ctx.b("linea_hecha")) {
      s += '<line x1="575" y1="290" x2="890" y2="290" stroke="' + P.terracota + '" stroke-width="4"/>';
      for (let i = 0; i < 8; i++) {
        const x = 572 + i * 40, y = i % 2 ? 300 : 222;
        s += '<rect x="' + x + '" y="' + y + '" width="34" height="56" fill="' + P.papel + '"/><circle cx="' + (x + 17) + '" cy="' + (y + 6) + '" r="4" fill="' + P.terracota + '"/>';
      }
    } else {
      s += '<rect x="590" y="230" width="60" height="44" fill="' + P.papel + '" transform="rotate(-6 620 252)"/><rect x="800" y="300" width="70" height="50" fill="' + P.papel + '" transform="rotate(5 835 325)"/><circle cx="620" cy="232" r="5" fill="' + P.terracota + '"/>';
    }
    // Escritorio
    s += '<rect x="520" y="560" width="460" height="26" rx="4" fill="' + P.madera + '"/>' +
      '<rect x="540" y="586" width="22" height="230" fill="' + P.maderaOsc + '"/><rect x="938" y="586" width="22" height="230" fill="' + P.maderaOsc + '"/>' +
      '<rect x="700" y="586" width="220" height="110" fill="' + P.maderaOsc + '" opacity=".8"/>';
    // Libros
    s += '<rect x="560" y="530" width="140" height="30" rx="3" fill="' + P.teal + '"/><rect x="570" y="500" width="120" height="30" rx="3" fill="' + P.terracota + '"/><rect x="566" y="472" width="128" height="28" rx="3" fill="' + P.mostaza + '"/>' +
      texto(630, 492, "PRINCIPLES", 13);
    // Lámpara
    s += '<path d="M720 560 L740 470 L700 440" stroke="' + P.tinta + '" stroke-width="6" fill="none"/><path d="M670 420 L730 420 L715 450 L685 450 Z" fill="' + P.teal + '"/>';
    // Lector de microfichas
    s += '<rect x="770" y="410" width="170" height="150" rx="10" fill="#5d6b73"/><rect x="786" y="424" width="138" height="96" rx="4" fill="#cfe3d8"/>' +
      '<path d="M800 450 h110 M800 470 h90 M800 490 h100" stroke="#7d9a8c" stroke-width="5"/><rect x="820" y="530" width="70" height="14" rx="4" fill="#3d4a52"/>';
    // Archivador "Chile" y bandeja
    s += '<rect x="1030" y="330" width="180" height="390" rx="6" fill="' + P.gris + '"/>';
    for (let i = 0; i < 4; i++) s += '<rect x="1044" y="' + (346 + i * 92) + '" width="152" height="80" rx="4" fill="' + P.grisClaro + '"/><rect x="1100" y="' + (378 + i * 92) + '" width="40" height="10" rx="4" fill="' + P.tinta + '"/>';
    s += '<rect x="1070" y="352" width="100" height="22" rx="3" fill="' + P.papel + '"/>' + texto(1120, 369, "CHILE", 16);
    s += '<rect x="1045" y="300" width="150" height="30" rx="4" fill="' + P.maderaClara + '"/><rect x="1060" y="286" width="100" height="16" fill="' + P.papel + '" transform="rotate(-4 1110 294)"/><rect x="1090" y="280" width="80" height="14" fill="#f4e3c4" transform="rotate(6 1130 287)"/>';
    // Caja 7
    s += '<rect x="1230" y="650" width="170" height="150" rx="6" fill="' + P.carton + '"/><rect x="1230" y="650" width="170" height="26" fill="' + P.cartonOsc + '"/>' +
      '<circle cx="1315" cy="735" r="36" fill="' + P.papel + '"/>' + texto(1315, 752, "7", 48, P.terracota, 800) +
      (ctx.b("caja7") ? '<rect x="1250" y="628" width="60" height="30" fill="' + P.papel + '" transform="rotate(-10 1280 643)"/>' : "");
    // Puerta de salida
    s += '<rect x="1420" y="140" width="150" height="582" fill="' + P.maderaOsc + '"/><rect x="1432" y="152" width="126" height="570" fill="' + P.madera + '"/>' +
      '<circle cx="1540" cy="450" r="8" fill="' + P.mostaza + '"/>' + placa(1428, 90, 138, 40, "PASILLO", 17);
    // Inés cuando baja al archivo
    if (ctx.b("linea_hecha") && !ctx.b("sesion_lista")) s += fig("ines", 995, 760, 380, { taza: true });
    return svg(s);
  };

  /* ---------- SALA DEL COMITÉ ---------- */
  A.escenas.comite = function (ctx) {
    let s = '<rect width="1600" height="680" fill="' + P.pared + '"/>' +
      '<rect x="0" y="560" width="1600" height="120" fill="' + P.zocalo + '"/><rect x="0" y="552" width="1600" height="10" fill="' + P.zocaloOsc + '"/>' +
      piso(680);
    // Puerta (salida)
    s += '<rect x="10" y="150" width="100" height="532" fill="' + P.tealOsc + '"/><rect x="22" y="162" width="86" height="520" fill="' + P.teal + '"/><circle cx="92" cy="440" r="8" fill="' + P.mostaza + '"/>';
    // Pizarra del método
    s += '<rect x="130" y="110" width="500" height="290" rx="8" fill="#fbfbf7" stroke="' + P.gris + '" stroke-width="8"/>' +
      texto(380, 160, "Método deliberativo", 30, P.teal, 800);
    ["1  Hechos", "2  Valores", "3  Cursos de acción", "4  Decisión", "5  Consistencia"].forEach(function (t, i) {
      s += texto(200, 210 + i * 38, t, 24, P.tinta, 600, "start");
    });
    // Ventana grande
    s += A.ventana(1000, 100, 500, 330);
    // Cuadro / planta
    s += '<rect x="700" y="170" width="220" height="150" rx="4" fill="' + P.maderaClara + '"/><rect x="714" y="184" width="192" height="122" fill="' + P.verdeClaro + '"/><path d="M714 306 L780 230 L830 280 L870 250 L906 306 Z" fill="' + P.verde + '"/>';
    // Integrantes detrás de la mesa
    const presentes = ctx.b("sesion_lista");
    if (presentes) {
      [["carmen", 400], ["tomas", 560], ["ines", 720], ["paula", 880], ["marisol", 1040], ["hernan", 1200]].forEach(function (p) {
        s += fig(p[0], p[1], 770, 370);
      });
    }
    // Mesa
    s += '<path d="M260 600 L1340 600 L1400 700 L200 700 Z" fill="' + P.madera + '"/><rect x="200" y="700" width="1200" height="24" fill="' + P.maderaOsc + '"/>' +
      '<rect x="240" y="724" width="26" height="150" fill="' + P.maderaOsc + '"/><rect x="1334" y="724" width="26" height="150" fill="' + P.maderaOsc + '"/>';
    // Papeles y tazas sobre la mesa
    s += '<rect x="420" y="620" width="90" height="56" fill="' + P.papel + '" transform="rotate(-4 465 648)"/><rect x="900" y="630" width="80" height="50" fill="' + P.papel + '" transform="rotate(3 940 655)"/>' +
      '<rect x="700" y="628" width="26" height="32" rx="4" fill="#f7f3ea" stroke="' + P.tinta + '" stroke-width="3"/><rect x="1150" y="634" width="26" height="32" rx="4" fill="#f7f3ea" stroke="' + P.tinta + '" stroke-width="3"/>';
    if (!presentes) {
      // sillas vacías
      [400, 720, 1040].forEach(function (x) { s += '<rect x="' + (x - 50) + '" y="480" width="100" height="120" rx="12" fill="' + P.teal + '"/>'; });
    }
    return svg(s);
  };
})();
