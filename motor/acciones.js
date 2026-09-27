/* =========================================================================
   ACCIONES / EFECTOS
   Los datos describen efectos como textos "tipo:argumento":
     bandera:x         quitar:x          aviso:texto (mensaje breve)
     evidencia:id      concepto:id       glosario:id       texto:narración
     ir:escena         dialogo:id        minijuego:id
     deliberacion      cierre            completar
   ========================================================================= */
(function () {
  "use strict";

  /* Efectos que abren pantallas o cambian de escena: si aparecen dentro de un
     diálogo se ejecutan al terminar la conversación. */
  BIO.EFECTOS_DIFERIBLES = ["ir", "dialogo", "minijuego", "deliberacion", "cierre", "completar"];

  BIO.partirEfecto = function (ef) {
    const i = ef.indexOf(":");
    return { tipo: i < 0 ? ef : ef.slice(0, i), arg: i < 0 ? "" : ef.slice(i + 1) };
  };

  BIO.ejecutar = async function (lista) {
    if (!lista) return;
    if (typeof lista === "string") lista = [lista];
    for (const ef of lista) {
      try { await BIO.aplicar(ef); }
      catch (e) { console.error("Error al aplicar efecto", ef, e); }
      if (BIO.ui.actualizarBarra) BIO.ui.actualizarBarra();
    }
    BIO.guardado.guardar();
    if (BIO.ui.actualizarBarra) BIO.ui.actualizarBarra();
  };

  BIO.aplicar = async function (ef) {
    const p = BIO.partirEfecto(ef), tipo = p.tipo, arg = p.arg;
    const cap = BIO.cap();
    switch (tipo) {
      case "bandera": BIO.ponerBandera(arg, true); break;
      case "quitar": BIO.ponerBandera(arg, false); break;
      case "aviso": BIO.ui.toast(arg); break;
      case "texto": BIO.ui.narrar(arg); break;
      case "evidencia": {
        const nueva = cap.evidencias.indexOf(arg) < 0;
        if (!BIO.evidencia(arg)) { console.error("Evidencia no encontrada:", arg); break; }
        if (nueva) { cap.evidencias.push(arg); BIO.guardado.guardar(); }
        await BIO.ui.mostrarEvidencia(arg, nueva);
        break;
      }
      case "concepto": desbloquear("conceptos", BIO.datos.cuaderno, arg, "Nueva entrada en tu cuaderno de conceptos", "concepto"); break;
      case "glosario": desbloquear("glosario", BIO.datos.glosario, arg, "Nuevo término en el glosario", "termino"); break;
      case "ir": await BIO.escena.ir(arg); break;
      case "dialogo": await BIO.dialogo.abrir(arg); break;
      case "minijuego": await BIO.minijuegos.abrir(arg); break;
      case "deliberacion": await BIO.deliberacion.abrir(); break;
      case "cierre": await BIO.cierre.abrir(); break;
      case "completar": await BIO.cierre.completarCapitulo(); break;
      default: console.warn("Efecto desconocido:", ef);
    }
  };

  function desbloquear(lista, fuente, id, mensaje, campo) {
    if (!fuente || !fuente[id]) { console.error("Entrada no encontrada:", lista, id); return; }
    if (BIO.estado[lista].indexOf(id) >= 0) return;
    BIO.estado[lista].push(id);
    BIO.ui.toast(mensaje + ": «" + fuente[id][campo] + "»");
  }
})();
