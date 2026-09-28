/* =========================================================================
   ESTADO Y GUARDADO
   Todo el progreso vive en BIO.estado y se guarda en localStorage.
   Si localStorage no está disponible (modo privado, bloqueo del navegador),
   el juego sigue funcionando en memoria.
   ========================================================================= */
(function () {
  "use strict";

  function clave() { return (BIO.datos.config && BIO.datos.config.claveGuardado) || "bioetica-comite-v1"; }
  function claveDocente() { return clave() + "-docente"; }

  let almacenOK = true;
  let docenteMem = null;

  function nuevo() {
    return {
      version: 1,
      creado: new Date().toISOString(),
      jugador: null,          // { nombre, curso, trato }
      capActual: null,
      caps: {},               // progreso por capítulo
      global: { banderas: {} },
      conceptos: [],          // cuaderno desbloqueado
      glosario: [],           // glosario desbloqueado
      ajustes: { escala: 1, contraste: false, resaltar: false, animaciones: true }
    };
  }
  BIO.estado = nuevo();

  function leer(k) {
    try {
      const s = window.localStorage.getItem(k);
      return s ? JSON.parse(s) : null;
    } catch (e) { almacenOK = false; return null; }
  }
  function escribir(k, v) {
    try {
      window.localStorage.setItem(k, JSON.stringify(v));
      almacenOK = true;
      return true;
    } catch (e) { almacenOK = false; return false; }
  }

  BIO.guardado = {
    hay: function () { const s = leer(clave()); return !!(s && s.jugador); },
    cargar: function () {
      const s = leer(clave());
      if (s && s.version === 1) {
        const base = nuevo();
        BIO.estado = Object.assign(base, s);
        BIO.estado.ajustes = Object.assign(nuevo().ajustes, s.ajustes || {});
        BIO.estado.global = Object.assign({ banderas: {} }, s.global || {});
        return !!s.jugador;
      }
      // Aunque no haya partida, recuperamos los ajustes de accesibilidad si existen
      return false;
    },
    guardar: function () {
      BIO.estado.actualizado = new Date().toISOString();
      return escribir(clave(), BIO.estado);
    },
    borrar: function () {
      try { window.localStorage.removeItem(clave()); } catch (e) { /* sin almacenamiento */ }
      const aj = BIO.estado.ajustes;
      BIO.estado = nuevo();
      BIO.estado.ajustes = aj;
      BIO.guardado.guardar();
    },
    disponible: function () {
      if (!almacenOK) return false;
      try {
        const k = clave() + "-prueba";
        window.localStorage.setItem(k, "1");
        window.localStorage.removeItem(k);
        return true;
      } catch (e) { almacenOK = false; return false; }
    },
    docente: function () { return leer(claveDocente()) || docenteMem || { capsActivos: {} }; },
    guardarDocente: function (d) { docenteMem = d; escribir(claveDocente(), d); }
  };

  window.addEventListener("beforeunload", function () { if (BIO.estado.jugador) BIO.guardado.guardar(); });

  /* ---------- Progreso por capítulo ---------- */
  BIO.cap = function (id) {
    id = id || BIO.estado.capActual;
    if (!id) return null;
    const c = BIO.estado.caps;
    if (!c[id]) {
      c[id] = {
        estado: "en_curso",
        inicio: new Date().toISOString(),
        escena: null,
        banderas: {},
        evidencias: [],
        vistas: {},
        minijuegos: {},
        pistas: {},
        deliberacion: null,
        cierre: { reflexiones: {}, quiz: {} }
      };
    }
    return c[id];
  };
  BIO.datosCap = function (id) { return BIO.datos[id || BIO.estado.capActual]; };

  /* Busca una evidencia en el capítulo actual (o en cualquiera) */
  BIO.evidencia = function (id) {
    const d = BIO.datosCap();
    if (d && d.evidencias && d.evidencias[id]) return d.evidencias[id];
    for (const k in BIO.datos) {
      const cd = BIO.datos[k];
      if (cd && cd.evidencias && cd.evidencias[id]) return cd.evidencias[id];
    }
    return null;
  };

  BIO.faltanGrupo = function (g) {
    const d = BIO.datosCap(), cap = BIO.cap();
    if (!d || !cap) return [];
    return Object.keys(d.evidencias || {}).filter(function (id) {
      return d.evidencias[id].grupo === g && cap.evidencias.indexOf(id) < 0;
    });
  };

  BIO.ponerBandera = function (nombre, valor) {
    if (valor === undefined) valor = true;
    if (nombre.indexOf("global.") === 0) BIO.estado.global.banderas[nombre.slice(7)] = valor;
    else BIO.cap().banderas[nombre] = valor;
  };

  /* Condiciones escritas como texto en los datos:
     "bandera:x"  "!bandera:x"  "bandera:global.x"
     "evidencia:id"  "evidencias:id1,id2"  "grupo:nombre" (todas las del grupo)
     "minijuego:id" (completado)  "visto:escena.hotspot"
     "a|b" se cumple si se cumple cualquiera de las dos */
  BIO.cumple = function (conds) {
    if (!conds) return true;
    if (typeof conds === "string") conds = [conds];
    const cap = BIO.cap();
    return conds.every(function (c0) {
      // "a|b": basta con que se cumpla una de las alternativas
      if (c0.indexOf("|") >= 0) return c0.split("|").some(function (alt) { return BIO.cumple([alt.trim()]); });
      let c = c0, neg = false;
      if (c[0] === "!") { neg = true; c = c.slice(1); }
      const i = c.indexOf(":");
      const tipo = i < 0 ? c : c.slice(0, i), arg = i < 0 ? "" : c.slice(i + 1);
      let r = false;
      switch (tipo) {
        case "bandera":
          r = arg.indexOf("global.") === 0 ? !!BIO.estado.global.banderas[arg.slice(7)] : !!(cap && cap.banderas[arg]);
          break;
        case "evidencia": r = !!cap && cap.evidencias.indexOf(arg) >= 0; break;
        case "evidencias": r = !!cap && arg.split(",").every(function (a) { return cap.evidencias.indexOf(a.trim()) >= 0; }); break;
        case "grupo": r = BIO.faltanGrupo(arg).length === 0; break;
        case "minijuego": r = !!(cap && cap.minijuegos[arg] && cap.minijuegos[arg].completo); break;
        case "visto": r = !!(cap && cap.vistas[arg]); break;
        default: console.warn("Condición desconocida:", c0);
      }
      return neg ? !r : r;
    });
  };
})();
