/* =========================================================================
   PALETA DEL ARTE
   Ilustración plana, cálida y sobria: maderas, verdes del sur, luz de ventana.
   ========================================================================= */
BIO.arte.P = {
  pared: "#efe4d2",
  pared2: "#e4d4bb",
  paredArchivo: "#e2d3ba",
  zocalo: "#b98a5e",
  zocaloOsc: "#8a5a3b",
  piso: "#b89572",
  piso2: "#a7835f",
  madera: "#9a6a45",
  maderaClara: "#c49a6c",
  maderaOsc: "#6e4a31",
  carton: "#c9a36b",
  cartonOsc: "#a9844f",
  teal: "#2f5d62",
  tealOsc: "#1f4246",
  verde: "#4f7a5a",
  verdeOsc: "#3a5c44",
  verdeClaro: "#8fa98a",
  mostaza: "#d9a441",
  terracota: "#b85c43",
  cielo: "#b9ccd0",
  cielo2: "#dfe7e4",
  volcan: "#6d7f87",
  nieve: "#f4f6f5",
  tinta: "#2b3440",
  papel: "#f8f3e8",
  luz: "#f3d98b",
  gris: "#7d8790",
  grisClaro: "#c9ced1",
  azul: "#3f6e8c"
};

/* Ventana con lluvia y volcán (reutilizable) */
BIO.arte.ventana = function (x, y, w, h) {
  const P = BIO.arte.P;
  const id = "cl" + Math.round(x) + "_" + Math.round(y);
  let lluvia = "";
  for (let i = 0; i < 22; i++) {
    const lx = x + 10 + ((i * 37) % (w - 20));
    const ly = y + 8 + ((i * 53) % (h - 30));
    lluvia += '<line x1="' + lx + '" y1="' + ly + '" x2="' + (lx - 6) + '" y2="' + (ly + 22) + '"/>';
  }
  return '' +
    '<defs><clipPath id="' + id + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"/></clipPath>' +
    '<linearGradient id="g' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + P.cielo + '"/><stop offset="1" stop-color="' + P.cielo2 + '"/></linearGradient></defs>' +
    '<rect x="' + (x - 14) + '" y="' + (y - 14) + '" width="' + (w + 28) + '" height="' + (h + 28) + '" rx="6" fill="#f7f3ea"/>' +
    '<g clip-path="url(#' + id + ')">' +
    '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="url(#g' + id + ')"/>' +
    '<path d="M' + (x + w * .18) + ' ' + (y + h) + ' L' + (x + w * .52) + ' ' + (y + h * .32) + ' L' + (x + w * .86) + ' ' + (y + h) + ' Z" fill="' + P.volcan + '"/>' +
    '<path d="M' + (x + w * .45) + ' ' + (y + h * .46) + ' L' + (x + w * .52) + ' ' + (y + h * .32) + ' L' + (x + w * .59) + ' ' + (y + h * .46) + ' Q' + (x + w * .55) + ' ' + (y + h * .43) + ' ' + (x + w * .52) + ' ' + (y + h * .48) + ' Q' + (x + w * .49) + ' ' + (y + h * .43) + ' ' + (x + w * .45) + ' ' + (y + h * .46) + ' Z" fill="' + P.nieve + '"/>' +
    '<path d="M' + x + ' ' + (y + h * .82) + ' Q' + (x + w * .3) + ' ' + (y + h * .7) + ' ' + (x + w * .6) + ' ' + (y + h * .8) + ' T' + (x + w) + ' ' + (y + h * .76) + ' V' + (y + h) + ' H' + x + ' Z" fill="' + P.verdeClaro + '"/>' +
    '<path d="M' + x + ' ' + (y + h * .9) + ' Q' + (x + w * .4) + ' ' + (y + h * .82) + ' ' + (x + w) + ' ' + (y + h * .9) + ' V' + (y + h) + ' H' + x + ' Z" fill="' + P.verde + '"/>' +
    '<g class="lluvia" stroke="#ffffff" stroke-opacity=".55" stroke-width="2" stroke-linecap="round">' + lluvia + '</g>' +
    '</g>' +
    '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="none" stroke="#f7f3ea" stroke-width="10"/>' +
    '<line x1="' + (x + w / 2) + '" y1="' + y + '" x2="' + (x + w / 2) + '" y2="' + (y + h) + '" stroke="#f7f3ea" stroke-width="8"/>';
};
