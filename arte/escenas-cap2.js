/* =========================================================================
   ESCENAS DEL CAPÍTULO 2 (SVG, lienzo 1600 × 900)
   Pasillo del primer piso, sala de espera, preoperatorio, sala
   multiconfesional, trabajo social y sala 214 (traumatología).
   ========================================================================= */
(function () {
  "use strict";
  const A = BIO.arte, P = A.P, U = A.util;
  const svg = U.svg, fig = U.fig, texto = U.texto, piso = U.piso;

  function pared(color, alto) {
    return '<rect width="1600" height="' + alto + '" fill="' + color + '"/>' +
      '<rect x="0" y="' + (alto - 150) + '" width="1600" height="150" fill="' + P.zocalo + '"/>' +
      '<rect x="0" y="' + (alto - 158) + '" width="1600" height="10" fill="' + P.zocaloOsc + '"/>' + piso(alto);
  }
  function puertaSalida(x) {
    return '<rect x="' + x + '" y="190" width="100" height="452" fill="' + P.maderaOsc + '"/><rect x="' + (x + 10) + '" y="200" width="80" height="442" fill="' + P.madera + '"/><circle cx="' + (x + 76) + '" cy="440" r="7" fill="' + P.mostaza + '"/>';
  }
  function silla(x, y, color) {
    return '<rect x="' + x + '" y="' + y + '" width="90" height="16" rx="5" fill="' + color + '"/><rect x="' + (x + 4) + '" y="' + (y - 70) + '" width="82" height="66" rx="10" fill="' + color + '"/>' +
      '<rect x="' + (x + 8) + '" y="' + (y + 16) + '" width="8" height="64" fill="' + P.gris + '"/><rect x="' + (x + 74) + '" y="' + (y + 16) + '" width="8" height="64" fill="' + P.gris + '"/>';
  }
  function cama(x, y, w, sabana) {
    return '<rect x="' + x + '" y="' + (y + 70) + '" width="' + w + '" height="26" rx="6" fill="#c9ced1"/>' +
      '<rect x="' + (x + 10) + '" y="' + (y + 96) + '" width="12" height="90" fill="' + P.gris + '"/><rect x="' + (x + w - 22) + '" y="' + (y + 96) + '" width="12" height="90" fill="' + P.gris + '"/>' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="76" rx="14" fill="' + (sabana || "#eef2f1") + '"/>' +
      '<rect x="' + (x + w - 20) + '" y="' + (y - 90) + '" width="16" height="170" rx="6" fill="' + P.gris + '"/>';
  }

  /* ---------- Pasillo del primer piso (centro de navegación) ---------- */
  A.escenas.pasillo2 = function (ctx) {
    let s = pared(P.pared, 640);
    for (let i = 0; i < 4; i++) s += '<rect x="' + (140 + i * 400) + '" y="10" width="200" height="18" rx="6" fill="#fff8e3"/>';
    const puertas = [
      [40, P.madera, "SALA DE ESPERA", "CIRUGÍA"],
      [300, "#5b8fa3", "PREOPERATORIO", ""],
      [560, P.madera, "TRAUMATOLOGÍA", "SALA 214"],
      [820, P.verde, "TRABAJO", "SOCIAL"],
      [1080, "#8a6a8e", "SALA", "MULTICONFESIONAL"],
      [1340, P.teal, "COMITÉ", "DE ÉTICA"]
    ];
    puertas.forEach(function (p) {
      const x = p[0];
      s += '<rect x="' + x + '" y="240" width="190" height="402" fill="' + A.sombra(p[1], 0.75) + '"/>' +
        '<rect x="' + (x + 12) + '" y="252" width="166" height="390" fill="' + p[1] + '"/>' +
        '<rect x="' + (x + 40) + '" y="285" width="110" height="110" rx="4" fill="#e9efec"/>' +
        '<circle cx="' + (x + 160) + '" cy="460" r="8" fill="' + P.mostaza + '"/>' +
        '<rect x="' + (x - 5) + '" y="160" width="200" height="' + (p[3] ? 64 : 44) + '" rx="8" fill="' + P.teal + '"/>' +
        texto(x + 95, 188, p[2], 17, "#fff") + (p[3] ? texto(x + 95, 212, p[3], 15, "#fff", 600) : "");
    });
    if (!ctx.b("intro")) s += fig("ines", 785, 860, 400, { carpeta: true });
    return svg(s);
  };

  /* ---------- Sala de espera de cirugía ---------- */
  A.escenas.sala_espera = function () {
    let s = pared("#e3ebe6", 700);
    s += puertaSalida(10);
    s += A.ventana(170, 130, 330, 280);
    // Televisor
    s += '<rect x="560" y="130" width="240" height="150" rx="8" fill="#2b3440"/><rect x="574" y="144" width="212" height="112" fill="#6d8a96"/>' +
      '<rect x="590" y="220" width="120" height="14" fill="#f3d98b"/><rect x="590" y="160" width="80" height="40" fill="#8fa98a"/>';
    // Sillas
    for (let i = 0; i < 7; i++) s += silla(520 + i * 100, 600, i % 2 ? P.teal : "#5b8fa3");
    // Planta
    s += '<rect x="1250" y="620" width="50" height="60" rx="6" fill="' + P.terracota + '"/><ellipse cx="1275" cy="590" rx="40" ry="48" fill="' + P.verde + '"/>';
    // Dispensador y funcionarios
    s += '<rect x="1150" y="470" width="70" height="210" rx="8" fill="#dfe6e4"/><rect x="1160" y="430" width="50" height="50" rx="10" fill="#a9c6d6"/>';
    s += fig("func1", 1330, 850, 330, { ropa: "#5b8fa3", pantalon: "#5b8fa3", piel: "#d9a47c", pelo: "#2e2420" }) +
      fig("func2", 1420, 850, 320, { ropa: "#f4f4f1", delantal: true, piel: "#b98463", pelo: "#1f1a18", peinado: "largo" });
    // Afiche
    s += '<rect x="1455" y="140" width="125" height="250" rx="4" fill="#fbf8f1" stroke="' + P.gris + '" stroke-width="3"/>' +
      '<path d="M1517 180 C1500 210 1490 228 1490 245 A27 27 0 0 0 1544 245 C1544 228 1534 210 1517 180 Z" fill="' + P.terracota + '"/>' +
      texto(1517, 310, "DONA", 20, P.terracota, 800) + texto(1517, 335, "SANGRE", 20, P.terracota, 800);
    // Rebeca y Sofía
    s += fig("rebeca", 690, 860, 390) + fig("sofia", 930, 860, 405);
    return svg(s);
  };

  /* ---------- Preoperatorio ---------- */
  A.escenas.preoperatorio = function () {
    let s = pared("#e6efe9", 700);
    s += puertaSalida(10);
    // Riel y cortina
    s += '<rect x="360" y="60" width="1180" height="10" rx="4" fill="' + P.gris + '"/>';
    for (let i = 0; i < 6; i++) s += '<rect x="' + (1400 + i * 22) + '" y="70" width="18" height="520" fill="#b9d3d6"/>';
    // Monitor
    s += '<rect x="1300" y="250" width="130" height="100" rx="8" fill="#2b3440"/><polyline points="1312,305 1340,305 1350,280 1362,330 1374,300 1418,300" fill="none" stroke="#8fe0a6" stroke-width="4"/>' +
      '<rect x="1360" y="350" width="10" height="330" fill="' + P.gris + '"/>';
    // Velador con documento y lentes
    s += '<rect x="410" y="560" width="140" height="130" rx="6" fill="' + P.maderaClara + '"/><rect x="420" y="530" width="80" height="34" fill="#fbf8f1" transform="rotate(-6 460 547)"/>' +
      '<circle cx="515" cy="548" r="10" fill="none" stroke="#2b3440" stroke-width="3"/><circle cx="537" cy="548" r="10" fill="none" stroke="#2b3440" stroke-width="3"/>';
    // Cama
    s += cama(620, 560, 500, "#dfeaf0");
    // Carpeta clínica a los pies
    s += '<rect x="1030" y="560" width="60" height="80" rx="4" fill="' + P.azul + '"/><rect x="1040" y="572" width="40" height="52" fill="#fbf8f1"/>';
    // Joaquín y la anestesióloga
    s += fig("joaquin", 700, 860, 400) + fig("valeria", 1190, 860, 395);
    return svg(s);
  };

  /* ---------- Sala multiconfesional ---------- */
  A.escenas.multiconfesional = function () {
    let s = pared("#efe2d0", 700);
    s += puertaSalida(10);
    // Ventanal de vidrios de colores (geométrico, sin símbolos religiosos)
    s += '<rect x="610" y="90" width="380" height="370" rx="10" fill="#f7f3ea"/>';
    const colores = ["#d9a441", "#8fa98a", "#b9ccd0", "#c98f6b", "#a9c6d6", "#e8c77d"];
    let k = 0;
    for (let f = 0; f < 4; f++) for (let c = 0; c < 4; c++) {
      s += '<rect x="' + (626 + c * 88) + '" y="' + (106 + f * 86) + '" width="80" height="78" fill="' + colores[(k++) % colores.length] + '" opacity=".85"/>';
    }
    // Luz en el piso
    s += '<path d="M610 700 L990 700 L1080 900 L520 900 Z" fill="#fff4c9" opacity=".25"/>';
    // Bancas
    [[380, 640], [1040, 640]].forEach(function (b) {
      s += '<rect x="' + b[0] + '" y="' + b[1] + '" width="220" height="20" rx="6" fill="' + P.madera + '"/><rect x="' + b[0] + '" y="' + (b[1] - 60) + '" width="220" height="14" rx="6" fill="' + P.maderaOsc + '"/>' +
        '<rect x="' + (b[0] + 14) + '" y="' + (b[1] + 20) + '" width="14" height="70" fill="' + P.maderaOsc + '"/><rect x="' + (b[0] + 192) + '" y="' + (b[1] + 20) + '" width="14" height="70" fill="' + P.maderaOsc + '"/>';
    });
    // Estante con libros de distintas tradiciones
    s += '<rect x="1300" y="250" width="240" height="420" fill="' + P.maderaOsc + '"/>';
    [320, 420, 520].forEach(function (y, i) {
      s += '<rect x="1300" y="' + y + '" width="240" height="10" fill="' + P.madera + '"/>';
      for (let j = 0; j < 7; j++) s += '<rect x="' + (1312 + j * 31) + '" y="' + (y - 60 + (j % 3) * 6) + '" width="24" height="' + (60 - (j % 3) * 6) + '" fill="' + colores[(i + j) % colores.length] + '"/>';
    });
    s += '<rect x="1320" y="580" width="200" height="60" rx="4" fill="#fbf8f1"/>' + texto(1420, 616, "Libro de visitas", 16, P.tinta, 600);
    // Plantas
    s += '<rect x="1190" y="620" width="50" height="60" rx="6" fill="' + P.terracota + '"/><ellipse cx="1215" cy="592" rx="40" ry="48" fill="' + P.verde + '"/>';
    s += fig("samuel", 470, 860, 395);
    return svg(s);
  };

  /* ---------- Oficina de trabajo social ---------- */
  A.escenas.trabajo_social = function () {
    let s = pared("#e9e4d8", 700);
    s += puertaSalida(10);
    // Tablero con afiches de redes de apoyo
    s += '<rect x="190" y="140" width="280" height="240" rx="6" fill="' + P.maderaOsc + '"/><rect x="202" y="152" width="256" height="216" fill="#c79a63"/>' +
      '<rect x="220" y="170" width="100" height="80" fill="#fbf8f1"/><rect x="340" y="176" width="100" height="70" fill="#dbe8d6"/><rect x="230" y="270" width="90" height="80" fill="#f6e7c4"/><rect x="340" y="262" width="100" height="90" fill="#fbf8f1"/>';
    s += A.ventana(1310, 120, 240, 250);
    // Archivador
    s += '<rect x="1100" y="330" width="160" height="390" rx="6" fill="' + P.gris + '"/>';
    for (let i = 0; i < 4; i++) s += '<rect x="1112" y="' + (346 + i * 92) + '" width="136" height="80" rx="4" fill="' + P.grisClaro + '"/><rect x="1160" y="' + (378 + i * 92) + '" width="40" height="10" rx="4" fill="' + P.tinta + '"/>';
    s += '<rect x="1130" y="300" width="100" height="34" rx="3" fill="' + P.verde + '"/>' + texto(1180, 323, "PROTOCOLOS", 13, "#fff");
    // Escritorio y Marisol de pie a su lado
    s += '<rect x="480" y="560" width="560" height="28" rx="4" fill="' + P.madera + '"/><rect x="500" y="588" width="520" height="190" fill="' + P.maderaOsc + '"/>' +
      '<rect x="540" y="500" width="130" height="62" rx="4" fill="#2b3440"/><rect x="590" y="560" width="30" height="8" fill="#2b3440"/>' +
      '<rect x="860" y="530" width="120" height="30" rx="3" fill="#fbf8f1"/><rect x="870" y="515" width="100" height="18" fill="' + P.mostaza + '"/>';
    s += fig("marisol", 390, 860, 400);
    return svg(s);
  };

  /* ---------- Sala 214, traumatología ---------- */
  A.escenas.sala214 = function () {
    let s = pared("#e6ebe9", 700);
    s += puertaSalida(10);
    s += A.ventana(1270, 120, 280, 280);
    // Cama con Elena recostada
    s += cama(700, 560, 560, "#f2efe6");
    s += '<ellipse cx="1170" cy="560" rx="70" ry="28" fill="#fbfbf7"/>';        // almohada
    const e = rasgosElena();
    s += '<circle cx="1160" cy="535" r="34" fill="' + e.piel + '"/>' +
      '<path d="M1128 530 C1126 500 1194 498 1194 530 C1184 516 1138 516 1128 530 Z" fill="' + e.pelo + '"/>' +
      '<circle cx="1190" cy="512" r="12" fill="' + e.pelo + '"/>' +
      '<path d="M1144 540 h12 M1164 540 h12" stroke="#2b3440" stroke-width="3"/>';
    s += '<path d="M760 560 Q960 520 1130 560 L1130 636 L760 636 Z" fill="#a9c6d6"/>';   // frazada
    // Carpeta a los pies
    s += '<rect x="700" y="570" width="56" height="80" rx="4" fill="' + P.azul + '"/><rect x="709" y="582" width="38" height="52" fill="#fbf8f1"/>';
    // Silla de visita
    s += silla(1390, 650, P.teal);
    s += fig("carmen", 560, 860, 405) + fig("rodrigo", 1400, 860, 410);
    return svg(s);
  };
  function rasgosElena() {
    const d = BIO.datosCap && BIO.datosCap();
    const r = (d && d.personajes && d.personajes.elena && d.personajes.elena.retrato) || {};
    return { piel: r.piel || "#e8bf9a", pelo: r.pelo || "#e6e6e6" };
  }
})();
