/* =========================================================================
   CAPÍTULO 2 — LA FIRMA: CONSENTIMIENTO INFORMADO Y AUTONOMÍA  (EDITABLE)
   -------------------------------------------------------------------------
   Caso A (deliberación): Joaquín Saavedra, adulto capaz, testigo de Jehová,
   rechaza transfusiones antes de una cirugía programada.
   Caso B (contrapunto, minijuego): Elena Poblete, con diagnóstico de
   deterioro cognitivo leve, rechaza una cirugía de cadera; su hijo quiere
   firmar por ella.
   Personajes, casos y protocolo del hospital: FICTICIOS.
   Ver las reglas de edición al comienzo de datos/config.js.
   ========================================================================= */
BIO.datos.cap2 = {
  id: "cap2",
  numero: 2,
  titulo: "La firma",
  subtitulo: "Consentimiento informado y autonomía",
  intro: "Segunda semana en el comité. Esta vez no hay cajas de archivo: hay personas esperando una respuesta.\n\nUn cirujano pidió ayuda con un paciente que rechaza las transfusiones de sangre. Y en traumatología, un hijo quiere firmar por su madre.",
  textoFinal: "Terminaste el segundo capítulo. Ahora sabes qué hace válido un consentimiento, cómo se evalúa la capacidad para decidir y por qué un diagnóstico no basta para quitarle a alguien su voz.\n\nEn el próximo capítulo, el hospital enfrentará un problema distinto: no alcanza para todos.",
  inicio: { escena: "pasillo" },

  /* Personajes propios de este capítulo (además del comité) */
  personajes: {
    joaquin: { nombre: "Joaquín Saavedra", rol: "Paciente, 52 años",
      retrato: { piel: "#c68e67", pelo: "#2b211c", peinado: "corto", ropa: "#a9c6d6", fondo: "#b9ccd0" },
      figura: { piel: "#c68e67", pelo: "#2b211c", peinado: "corto", ropa: "#a9c6d6", pantalon: "#a9c6d6" } },
    rebeca: { nombre: "Rebeca", rol: "Esposa de Joaquín",
      retrato: { piel: "#d7a07a", pelo: "#5a3d2e", peinado: "moño", ropa: "#6d4c7d", fondo: "#e4d4bb" },
      figura: { piel: "#d7a07a", pelo: "#5a3d2e", peinado: "moño", ropa: "#6d4c7d", pantalon: "#3b4650" } },
    sofia: { nombre: "Sofía", rol: "Hija de Joaquín, 24 años",
      retrato: { piel: "#d7a07a", pelo: "#2a1d18", peinado: "largo", ropa: "#c47a3a", fondo: "#dbe8d6" },
      figura: { piel: "#d7a07a", pelo: "#2a1d18", peinado: "largo", ropa: "#c47a3a", pantalon: "#2b3440" } },
    samuel: { nombre: "Samuel Tapia", rol: "Anciano de la congregación de Joaquín",
      retrato: { piel: "#8d5b3e", pelo: "#c9ced1", peinado: "corto", ropa: "#3b4650", fondo: "#e4d4bb", lentes: true },
      figura: { piel: "#8d5b3e", pelo: "#c9ced1", peinado: "corto", ropa: "#3b4650", pantalon: "#3b4650", lentes: true } },
    valeria: { nombre: "Dra. Valeria Muñoz", rol: "Anestesióloga",
      retrato: { piel: "#f0c9a6", pelo: "#1f1a18", peinado: "cola", ropa: "#5b8fa3", fondo: "#dbe8d6" },
      figura: { piel: "#f0c9a6", pelo: "#1f1a18", peinado: "largo", ropa: "#5b8fa3", pantalon: "#5b8fa3" } },
    elena: { nombre: "Elena Poblete", rol: "Paciente, 79 años",
      retrato: { piel: "#e8bf9a", pelo: "#e6e6e6", peinado: "moño", ropa: "#b9ccd0", fondo: "#f6e7c4", lentes: true } },
    rodrigo: { nombre: "Rodrigo", rol: "Hijo de Elena",
      retrato: { piel: "#e0b08a", pelo: "#4a3328", peinado: "corto", ropa: "#6e4a31", fondo: "#c9ced1", barba: true },
      figura: { piel: "#e0b08a", pelo: "#4a3328", peinado: "corto", ropa: "#6e4a31", pantalon: "#3b4650", barba: true } }
  },

  /* ---------------------------------------------------------------------
     OBJETIVOS
     --------------------------------------------------------------------- */
  objetivos: [
    { id: "intro", texto: "Conversa con Inés en el pasillo.", hecho: "bandera:intro",
      pistas: ["Inés está en el pasillo, frente a las puertas.", "Haz clic sobre Inés o pulsa Tab hasta llegar a ella.", "Pulsa H para resaltar las zonas interactivas."] },
    { id: "joaquin", texto: "Conoce a Joaquín Saavedra en el preoperatorio.", hecho: "evidencia:ev_joaquin",
      pistas: ["El preoperatorio es la segunda puerta del pasillo.", "Habla con Joaquín: pregúntale qué espera de la operación.", "Revisa también la carpeta a los pies de la cama y el velador."] },
    { id: "elena", texto: "Acompaña a la Dra. Llancaqueo a evaluar la capacidad de la Sra. Elena (sala 214).", hecho: "minijuego:capacidad",
      pistas: ["La sala 214 es la tercera puerta del pasillo (Traumatología).", "Haz clic en la Sra. Elena, en la cama.", "Dentro de la actividad hay pistas más específicas."] },
    { id: "contexto", texto: "Escucha a las demás personas: familia, anestesióloga, trabajo social y sala multiconfesional.", hecho: "evidencias:ev_sofia,ev_valeria,ev_protocolo,ev_samuel|bandera:en_sesion",
      pistas: ["La familia está en la sala de espera; la anestesióloga, en el preoperatorio.", "Marisol está en trabajo social; revisa también el archivador de protocolos.", "Samuel Tapia está en la sala multiconfesional. Puedes ir a la sesión aunque no hayas hablado con todos, pero tendrás menos hechos."] },
    { id: "sesion", texto: "Asiste a la sesión del comité sobre el caso de Joaquín.", hecho: "bandera:delib_hecha",
      pistas: ["La sala del comité es la última puerta del pasillo.", "Haz clic en el comité reunido.", "Si no está reunido, primero termina la evaluación en la sala 214."] },
    { id: "cierre", texto: "Responde las preguntas de cierre.", hecho: "bandera:cierre_hecho",
      pistas: ["Conversa con el comité en la sala.", "Escribe tus reflexiones con tus palabras.", "En las preguntas de comprobación, lee la explicación si te equivocas."] }
  ],

  /* ---------------------------------------------------------------------
     ESCENAS
     --------------------------------------------------------------------- */
  escenas: {
    pasillo: {
      id: "pasillo", arte: "pasillo2",
      titulo: "Pasillo del primer piso",
      descripcion: "Un pasillo con seis puertas y el ir y venir de camillas. Desde aquí se llega a todos los lugares del caso.\n\n*Consejo: pulsa **H** para resaltar todo lo que puedes revisar.*",
      alEntrar: [{ si: ["!bandera:intro"], efectos: ["dialogo:ines_intro"] }],
      hotspots: [
        { id: "espera", tipo: "salida", direccion: "arriba", etiqueta: "Sala de espera de cirugía", x: 2.5, y: 17.8, w: 11.9, h: 53.6, acciones: ["ir:sala_espera"] },
        { id: "preop", tipo: "salida", direccion: "arriba", etiqueta: "Preoperatorio", x: 18.75, y: 17.8, w: 11.9, h: 53.6, acciones: ["ir:preoperatorio"] },
        { id: "sala214", tipo: "salida", direccion: "arriba", etiqueta: "Traumatología, sala 214", x: 35, y: 17.8, w: 11.9, h: 53.6, acciones: ["ir:sala214"] },
        { id: "social", tipo: "salida", direccion: "arriba", etiqueta: "Trabajo social", x: 51.25, y: 17.8, w: 11.9, h: 53.6, acciones: ["ir:trabajo_social"] },
        { id: "multi", tipo: "salida", direccion: "arriba", etiqueta: "Sala multiconfesional", x: 67.5, y: 17.8, w: 11.9, h: 53.6, acciones: ["ir:multiconfesional"] },
        { id: "comite", tipo: "salida", direccion: "arriba", etiqueta: "Sala del Comité de Ética", x: 83.75, y: 17.8, w: 11.9, h: 53.6, acciones: ["ir:comite"] },
        { id: "ines", tipo: "persona", etiqueta: "Inés Aravena", x: 45.3, y: 51.1, w: 7.5, h: 44.4, si: ["!bandera:intro"], acciones: ["dialogo:ines_intro"] }
      ]
    },

    sala_espera: {
      id: "sala_espera", arte: "sala_espera",
      titulo: "Sala de espera de cirugía",
      descripcion: "Sillas de plástico, un televisor sin volumen y olor a café de máquina. La familia de Joaquín espera aquí.",
      hotspots: [
        { id: "salida", tipo: "salida", direccion: "izq", etiqueta: "Volver al pasillo", x: 0.6, y: 21, w: 6.3, h: 50, acciones: ["ir:pasillo"] },
        { id: "ventana", etiqueta: "Ventana", x: 10.6, y: 14.4, w: 20.6, h: 31.1, texto: "Afuera, una ambulancia espera con las luces apagadas. La lluvia ya es costumbre." },
        { id: "tv", etiqueta: "Televisor", x: 35, y: 14.4, w: 15, h: 16.7, texto: "Un matinal sin volumen. Nadie lo está mirando." },
        { id: "rebeca", tipo: "persona", etiqueta: "Rebeca, esposa de Joaquín", x: 39.5, y: 52.2, w: 7.3, h: 43.3, acciones: ["dialogo:rebeca"] },
        { id: "sofia", tipo: "persona", etiqueta: "Sofía, hija de Joaquín", x: 54.3, y: 50.6, w: 7.6, h: 45, acciones: ["dialogo:sofia"] },
        { id: "funcionarios", etiqueta: "Dos funcionarios conversan junto al dispensador", x: 71.9, y: 47.8, w: 20, h: 47, acciones: ["evidencia:ev_comentario"] },
        { id: "afiche", etiqueta: "Afiche en la pared", x: 90.9, y: 15.6, w: 7.8, h: 27.8, acciones: ["evidencia:ev_afiche"] }
      ]
    },

    preoperatorio: {
      id: "preoperatorio", arte: "preoperatorio",
      titulo: "Preoperatorio",
      descripcion: "Un box con cortinas celestes. Joaquín vino hoy a sus exámenes previos a la cirugía, programada para dentro de tres semanas.",
      hotspots: [
        { id: "salida", tipo: "salida", direccion: "izq", etiqueta: "Volver al pasillo", x: 0.6, y: 21, w: 6.3, h: 50, acciones: ["ir:pasillo"] },
        { id: "velador", etiqueta: "Velador con un documento", x: 25.6, y: 58.3, w: 8.75, h: 18.3, acciones: ["evidencia:ev_tarjeta"] },
        { id: "joaquin", tipo: "persona", etiqueta: "Joaquín Saavedra", x: 40, y: 51.1, w: 7.5, h: 44.4, acciones: ["dialogo:joaquin"] },
        { id: "ficha", etiqueta: "Carpeta clínica", x: 63.75, y: 61.1, w: 5, h: 11.1, acciones: ["evidencia:ev_ficha_joaquin"] },
        { id: "valeria", tipo: "persona", etiqueta: "Dra. Valeria Muñoz, anestesióloga", x: 70.7, y: 51.7, w: 7.4, h: 43.9, acciones: ["dialogo:valeria"] },
        { id: "monitor", etiqueta: "Monitor", x: 81.25, y: 27.8, w: 8.1, h: 11.1, texto: "Presión 128/82. Frecuencia cardíaca 76. Nada fuera de lo común." }
      ]
    },

    multiconfesional: {
      id: "multiconfesional", arte: "multiconfesional",
      titulo: "Sala multiconfesional",
      descripcion: "Una sala silenciosa, abierta a personas de cualquier creencia o de ninguna. La luz entra por un ventanal de vidrios de colores.",
      hotspots: [
        { id: "salida", tipo: "salida", direccion: "izq", etiqueta: "Volver al pasillo", x: 0.6, y: 21, w: 6.3, h: 50, acciones: ["ir:pasillo"] },
        { id: "samuel", tipo: "persona", etiqueta: "Samuel Tapia", x: 25.7, y: 51.7, w: 7.4, h: 43.9, acciones: ["dialogo:samuel"] },
        { id: "ventanal", etiqueta: "Ventanal de colores", x: 38.1, y: 10, w: 23.75, h: 41.1, texto: "Los vidrios forman un mosaico sin figuras. Alguien decidió que ningún símbolo de una sola fe presidiera la sala." },
        { id: "estante", etiqueta: "Estante de libros", etiquetaArriba: true, x: 81.25, y: 27.8, w: 15, h: 34.4, texto: "Hay textos de distintas tradiciones religiosas, libros de poesía y un par de novelas. Una tarjeta dice: «Llévelo si le hace bien; devuélvalo si puede»." },
        { id: "libro", etiqueta: "Libro de visitas", x: 82.5, y: 64.4, w: 12.5, h: 6.7, texto: "Mensajes de pacientes y familias, escritos a mano. Uno dice: «Gracias por dejarme rezar a mi manera». Otro: «No creo en nada, pero aquí se está en paz»." }
      ]
    },

    trabajo_social: {
      id: "trabajo_social", arte: "trabajo_social",
      titulo: "Oficina de trabajo social",
      descripcion: "Escritorio lleno de carpetas, un tablero con afiches de redes de apoyo y un hervidor que nunca se enfría.",
      hotspots: [
        { id: "salida", tipo: "salida", direccion: "izq", etiqueta: "Volver al pasillo", x: 0.6, y: 21, w: 6.3, h: 50, acciones: ["ir:pasillo"] },
        { id: "tablero", etiqueta: "Tablero de afiches", x: 11.9, y: 15.6, w: 17.5, h: 26.7, texto: "Afiches de programas de apoyo a cuidadores, transporte para pacientes de sectores rurales y grupos de autoayuda." },
        { id: "marisol", tipo: "persona", etiqueta: "Marisol Vera, trabajadora social", x: 20.6, y: 51.1, w: 7.5, h: 44.4, acciones: ["dialogo:marisol"] },
        { id: "archivador", etiqueta: "Archivador de protocolos", x: 68.75, y: 33.3, w: 10, h: 46.7, acciones: ["evidencia:ev_protocolo"] },
        { id: "ventana", etiqueta: "Ventana", x: 81.9, y: 13.3, w: 15, h: 27.8, texto: "Desde aquí se ve la parada de micros. Marisol dice que ahí empiezan muchas de las historias que llegan a su oficina." }
      ]
    },

    sala214: {
      id: "sala214", arte: "sala214",
      titulo: "Traumatología, sala 214",
      descripcion: "Una sala de dos camas; la otra está vacía. La Sra. Elena se fracturó la cadera hace dos días. La Dra. Llancaqueo y Rodrigo, el hijo de Elena, conversan en voz baja.",
      hotspots: [
        { id: "salida", tipo: "salida", direccion: "izq", etiqueta: "Volver al pasillo", x: 0.6, y: 21, w: 6.3, h: 50, acciones: ["ir:pasillo"] },
        { id: "carmen", tipo: "persona", etiqueta: "Dra. Carmen Llancaqueo", x: 31.2, y: 50.6, w: 7.6, h: 45, acciones: ["dialogo:carmen"] },
        { id: "ficha", etiqueta: "Carpeta de la Sra. Elena", x: 43.1, y: 62.2, w: 4.4, h: 10, acciones: ["evidencia:ev_ficha_elena"] },
        { id: "elena", tipo: "persona", etiqueta: "Sra. Elena Poblete", x: 47.5, y: 54.4, w: 31.25, h: 17.8, si: ["!minijuego:capacidad"], acciones: ["dialogo:carmen"] },
        { id: "elena2", tipo: "persona", etiqueta: "Sra. Elena Poblete", x: 47.5, y: 54.4, w: 31.25, h: 17.8, si: ["minijuego:capacidad"], acciones: ["dialogo:elena_despues"] },
        { id: "ventana", etiqueta: "Ventana", x: 79.4, y: 13.3, w: 17.5, h: 31.1, texto: "Se ve el patio interior del hospital, con un aromo que alguien plantó hace décadas." },
        { id: "rodrigo", tipo: "persona", etiqueta: "Rodrigo, hijo de Elena", x: 83.6, y: 50, w: 7.7, h: 45.6, acciones: ["dialogo:rodrigo"] }
      ]
    },

    comite: {
      id: "comite", arte: "comite",
      titulo: "Sala del Comité de Ética Asistencial",
      descripcion: "La misma mesa larga, las mismas sillas de colores. Hoy, sobre la mesa, hay una copia del protocolo de transfusiones.",
      hotspots: [
        { id: "salida", tipo: "salida", direccion: "izq", etiqueta: "Volver al pasillo", x: 0.6, y: 16.7, w: 6.4, h: 58, acciones: ["ir:pasillo"] },
        { id: "pizarra", etiqueta: "Pizarra del método deliberativo", x: 8, y: 11.5, w: 31.5, h: 33.5,
          texto: "Los cinco pasos siguen escritos: hechos, valores, cursos de acción, decisión y consistencia." },
        { id: "mesa", etiqueta: "Mesa del comité", x: 14, y: 66, w: 72, h: 15, si: ["!bandera:sesion_lista"],
          texto: "La sala está vacía. El comité se reunirá cuando hayas acompañado a la Dra. Llancaqueo en la sala 214." },
        { id: "sesion", tipo: "persona", etiqueta: "Comité reunido: iniciar la sesión", x: 20, y: 44, w: 60, h: 36, si: ["bandera:sesion_lista", "!bandera:en_sesion"], acciones: ["dialogo:sesion"] },
        { id: "sesion2", tipo: "persona", etiqueta: "Comité reunido: continuar la sesión", x: 20, y: 44, w: 60, h: 36, si: ["bandera:en_sesion", "!bandera:delib_hecha"], acciones: ["deliberacion"] },
        { id: "final", tipo: "persona", etiqueta: "Comité: conversación final", x: 20, y: 44, w: 60, h: 36, si: ["bandera:delib_hecha", "!bandera:cierre_visto"], acciones: ["dialogo:cierre_comite"] },
        { id: "final2", tipo: "persona", etiqueta: "Comité: preguntas de cierre", x: 20, y: 44, w: 60, h: 36, si: ["bandera:cierre_visto", "!bandera:cierre_hecho"], acciones: ["cierre"] },
        { id: "fin", tipo: "persona", etiqueta: "Comité", x: 20, y: 44, w: 60, h: 36, si: ["bandera:cierre_hecho"],
          texto: "La sesión terminó. Paula redacta la recomendación del comité para el Dr. Fuentes. Puedes volver al menú de capítulos desde el botón «Menú»." }
      ]
    }
  },

  /* ---------------------------------------------------------------------
     EVIDENCIAS
     --------------------------------------------------------------------- */
  evidencias: {
    ev_ficha_joaquin: {
      titulo: "Ficha clínica de Joaquín (resumen)",
      fuente: "Preoperatorio · carpeta a los pies de la cama",
      resumen: "52 años, tumor de colon en etapa temprana, cirugía programada en tres semanas, anemia leve; riesgo de necesitar transfusión bajo a moderado.",
      texto: "**Joaquín Saavedra Ulloa, 52 años.** Conductor de buses interurbanos. Casado, una hija.\n\n- Diagnóstico: tumor en el colon detectado en un control, en **etapa temprana**.\n- Indicación: extirpar el segmento afectado (colectomía). Cirugía programada para **dentro de tres semanas**.\n- Pronóstico con cirugía: bueno. Sin cirugía, el tumor seguirá avanzando.\n- Riesgo de un sangrado que requiera transfusión en este tipo de cirugía: **bajo a moderado**, según el equipo quirúrgico.\n- Hemoglobina actual: 10,8 g/dL (anemia leve).\n- Nota de enfermería: «Paciente informa que es testigo de Jehová y que no acepta transfusiones. Trae documento firmado»."
    },
    ev_tarjeta: {
      titulo: "Documento de directivas médicas de Joaquín",
      fuente: "Velador del preoperatorio",
      resumen: "Firmado hace dos años: rechaza sangre completa y sus componentes principales; la sección sobre fracciones y procedimientos está en blanco.",
      texto: "Documento firmado por Joaquín hace dos años, con dos testigos. En resumen dice:\n\n- Que es testigo de Jehová y que, por razones de conciencia religiosa, **no acepta transfusiones de sangre completa ni de sus componentes principales** (glóbulos rojos, glóbulos blancos, plaquetas y plasma), incluso si su vida está en riesgo.\n- Que **sí desea recibir atención médica** y alternativas que no impliquen transfusión.\n- Que libera al equipo de responsabilidad por las consecuencias de su rechazo.\n\nLa sección donde la persona indica qué **fracciones de la sangre** y qué **procedimientos** acepta (por ejemplo, recuperar su propia sangre durante la cirugía) **está en blanco**."
    },
    ev_joaquin: {
      titulo: "Lo que dice Joaquín",
      fuente: "Conversación en el preoperatorio",
      resumen: "Quiere vivir y operarse, pero sin transfusión. Tiene preguntas que no ha podido hacer con calma.",
      texto: "Joaquín es testigo de Jehová desde los veinte años. Para él, aceptar una transfusión sería faltarle a Dios.\n\n«No me quiero morir: quiero que me operen, pero sin sangre», dice. Reconoce que tiene preguntas sobre la máquina que recupera la propia sangre durante la cirugía y sobre qué pasaría si sangra mucho, pero que **no ha podido hacerlas con calma**."
    },
    ev_valeria: {
      titulo: "Lo que dice la anestesióloga",
      fuente: "Dra. Valeria Muñoz, anestesióloga",
      resumen: "El riesgo existe pero puede reducirse mucho con preparación previa; a ella le cuesta participar si no puede transfundir.",
      texto: "La Dra. Muñoz explica que, con la hemoglobina actual, operar sin posibilidad de transfundir es más riesgoso, pero que el riesgo puede reducirse: «Si subimos su hemoglobina antes, con hierro y otros medicamentos, y usamos técnicas para sangrar menos, el panorama cambia mucho».\n\nY agrega, más bajo: «Te confieso algo: no sé si soy capaz de ver morir a un paciente pudiendo evitarlo con una bolsa de sangre. Respeto su decisión, pero me pesa»."
    },
    ev_rebeca: {
      titulo: "Lo que dice Rebeca, la esposa",
      fuente: "Sala de espera",
      resumen: "Comparte la fe de Joaquín y pide que lo operen sin sangre.",
      texto: "«Joaquín lo tiene claro desde hace treinta años, y yo pienso igual que él. No es fanatismo: es nuestra fe. Lo único que pedimos es que lo operen sin sangre. Hay hospitales que lo hacen»."
    },
    ev_sofia: {
      titulo: "Lo que dice Sofía, la hija",
      fuente: "Sala de espera",
      resumen: "No comparte la fe de su padre, pero lo respeta; le preocupa que nunca haya hablado a solas con los médicos.",
      texto: "Sofía, de 24 años, se alejó de la congregación hace unos años. «Yo no comparto su fe, pero es mi papá y lo respeto».\n\n«Lo que me preocupa es otra cosa: mi papá nunca ha hablado a solas con los doctores. Siempre está mi mamá o alguien de la congregación. No sé si les diría si tuviera dudas»."
    },
    ev_samuel: {
      titulo: "Lo que dice Samuel Tapia",
      fuente: "Sala multiconfesional",
      resumen: "Anciano de la congregación: la decisión es de conciencia personal; ofrece información sobre cirugía sin sangre.",
      texto: "Samuel es anciano de la congregación de Joaquín y colabora con un grupo que orienta a hospitales sobre alternativas a la transfusión.\n\n«La decisión es de cada persona ante su conciencia; nadie puede obligarlo, ni siquiera nosotros», dice. Ofrece información sobre técnicas y centros con experiencia en cirugía sin sangre, y pide que el equipo «no vea a Joaquín como un problema, sino como un paciente que quiere vivir»."
    },
    ev_protocolo: {
      titulo: "Protocolo del hospital: pacientes que rechazan transfusiones",
      fuente: "Trabajo social · archivador de protocolos",
      resumen: "Exige informar riesgos y alternativas, conversar a solas con el paciente, registrar qué acepta, optimizar antes de operar, coordinar el recuperador celular y derivar si no hay alternativa segura.",
      texto: "Documento interno del Hospital Regional de Río Arrayán. Ante un paciente adulto que rechaza transfusiones, el equipo debe:\n\n- Informar con claridad los riesgos y las alternativas, y dejar constancia por escrito.\n- Conversar con el paciente **a solas** al menos una vez, para confirmar que su decisión es libre.\n- Registrar en detalle qué productos y procedimientos acepta y cuáles no.\n- Evaluar con hematología cómo mejorar su hemoglobina antes de operar (hierro, eritropoyetina).\n- Coordinar el recuperador celular con **al menos 48 horas** de anticipación.\n- Si el hospital no puede ofrecer una alternativa segura, gestionar la **derivación** a otro centro.\n- Consultar al Comité de Ética Asistencial ante dudas o conflictos."
    },
    ev_comentario: {
      titulo: "Comentario de un funcionario",
      fuente: "Sala de espera · junto al dispensador de agua",
      resumen: "Un funcionario dice que él lo transfundiría igual.",
      texto: "Un funcionario le dice a otro, sin notar que lo escuchas: «Si fuera mi papá, lo transfundo igual y después pido perdón». El otro se encoge de hombros."
    },
    ev_afiche: {
      titulo: "Afiche de campaña de donación de sangre",
      fuente: "Pared de la sala de espera",
      resumen: "Invitación a donar sangre en la colecta mensual.",
      texto: "«Dona sangre, dona vida. Colecta del Banco de Sangre: primer sábado de cada mes»."
    },
    ev_ficha_elena: {
      titulo: "Ficha de la Sra. Elena (resumen)",
      fuente: "Sala 214 · carpeta a los pies de la cama",
      resumen: "79 años, fractura de cadera, deterioro cognitivo leve diagnosticado hace un año; rechaza la cirugía.",
      texto: "**Elena Poblete Soto, 79 años.** Viuda, vive sola; una vecina la ayuda con las compras.\n\n- Ingreso: caída en su casa con **fractura de cadera**.\n- Indicación de traumatología: cirugía para fijar la fractura.\n- Antecedente: diagnóstico de **deterioro cognitivo leve** hace un año. Maneja su pensión, cocina y toma sus medicamentos sola.\n- Nota: «Paciente rechaza la cirugía. El hijo solicita firmar el consentimiento por ella»."
    },
    ev_rodrigo: {
      titulo: "Lo que dice Rodrigo, el hijo",
      fuente: "Sala 214",
      resumen: "Cree que su madre no puede decidir por su diagnóstico y quiere firmar por ella.",
      texto: "«Mi mamá tiene demencia; se le olvidan las cosas. No está en condiciones de decidir algo así. Yo soy su hijo, la quiero, y quiero que la operen. Yo firmo»."
    }
  },

  /* ---------------------------------------------------------------------
     DIÁLOGOS
     --------------------------------------------------------------------- */
  dialogos: {
    ines_intro: {
      nodos: {
        inicio: { habla: "ines", texto: "¡Hola de nuevo, {nombre}! Hoy el comité tiene trabajo de verdad. El Dr. Fuentes, cirujano, pidió una consulta: tiene programada una cirugía para el Sr. Joaquín Saavedra, que rechaza las transfusiones de sangre por sus convicciones religiosas.", ir: "n2" },
        n2: { habla: "ines", texto: "Joaquín es un adulto que, en principio, puede decidir por sí mismo. La pregunta no es solo *si* puede rechazar, sino *cómo* debe actuar el equipo para respetarlo sin abandonarlo. Para eso necesitamos hechos.",
          opciones: [
            { texto: "¿Qué es exactamente el consentimiento informado?", ir: "n3" },
            { texto: "¿Por dónde empiezo?", ir: "n4" }
          ] },
        n3: { habla: "ines", texto: "Es la aceptación de una persona **capaz** a un tratamiento, dada de manera **libre** (sin coacción), **informada** (entendiendo riesgos, beneficios y alternativas) y **expresa**. Incluye el derecho a decir que no. No es un papel: es una conversación.",
          efectos: ["concepto:consentimiento_elementos", "glosario:consentimiento_informado", "glosario:voluntariedad"], ir: "n4" },
        n4: { habla: "ines", texto: "Joaquín está en el preoperatorio y su familia, en la sala de espera. Además, la Dra. Llancaqueo te pide que la acompañes a la sala 214: hay una paciente, la Sra. Elena, cuyo hijo dice que ella no puede decidir. Son casos distintos, pero se iluminan entre sí.", ir: "n5" },
        n5: { habla: "ines", texto: "Cuando tengas lo necesario, nos vemos en la sala del comité, la última puerta del pasillo.",
          efectos: ["bandera:intro", "glosario:directivas_anticipadas"] }
      }
    },

    joaquin: {
      nodos: {
        inicio: { habla: "joaquin", texto: "Buenas tardes. ¿Usted viene del comité? Pase, pase. Perdone la bata; aquí a uno lo visten como quieren.", ir: "menu" },
        menu: { habla: "joaquin", texto: "¿Qué quiere saber?",
          opciones: [
            { texto: "¿Por qué rechaza las transfusiones?", ir: "fe" },
            { texto: "¿Qué espera de la operación?", ir: "espera" },
            { texto: "¿Tiene preguntas que no ha podido hacer?", ir: "preguntas" },
            { texto: "Gracias, don Joaquín.", ir: "FIN" }
          ] },
        fe: { habla: "joaquin", texto: "Soy testigo de Jehová desde los veinte años. Para nosotros, la Biblia pide abstenerse de la sangre, y aceptar una transfusión sería faltarle a Dios. Sé que mucha gente no lo entiende. No les pido que lo compartan: les pido que lo respeten.", ir: "menu" },
        espera: { habla: "joaquin", texto: "¡Que me operen, pues! Yo no me quiero morir. Tengo una hija, quiero conocer a mis nietos, quiero volver a manejar mi bus. Quiero que me operen, pero sin sangre.",
          efectos: ["evidencia:ev_joaquin"], ir: "menu" },
        preguntas: { habla: "joaquin", texto: "Bueno… sí. Me hablaron de una máquina que recupera la propia sangre durante la operación, y no sé si eso lo puedo aceptar. Y qué pasa si sangro mucho. Pero con mi señora al lado no quiero preguntar esas cosas: se angustia.",
          efectos: ["evidencia:ev_joaquin", "bandera:joaquin_dudas"], ir: "menu" }
      }
    },

    valeria: {
      nodos: {
        inicio: { habla: "valeria", texto: "Hola. Soy Valeria Muñoz, anestesióloga. ¿Vienes por el caso del Sr. Saavedra?",
          opciones: [
            { texto: "¿Qué riesgo tiene operarlo sin transfusión?", ir: "riesgo" },
            { texto: "¿Cómo se siente usted con este caso?", ir: "siente" },
            { texto: "Gracias, doctora.", ir: "FIN" }
          ] },
        riesgo: { habla: "valeria", texto: "Con su hemoglobina actual, más de lo que me gustaría. Pero hay tres semanas: si la subimos con hierro y otros medicamentos, y el cirujano usa técnicas para sangrar menos, el riesgo baja mucho. Y el hospital tiene un recuperador celular, aunque hay que pedirlo con anticipación.",
          efectos: ["evidencia:ev_valeria"], ir: "inicio" },
        siente: { habla: "valeria", texto: "Respeto su decisión. Pero no sé si soy capaz de estar en ese pabellón si las cosas se complican y no puedo hacer lo que sé hacer. Prefiero decirlo ahora que en la mitad de la cirugía.",
          efectos: ["evidencia:ev_valeria", "glosario:objecion_conciencia"], ir: "inicio" }
      }
    },

    rebeca: {
      nodos: {
        inicio: { habla: "rebeca", texto: "¿Usted es del comité? Mire, yo sé lo que la gente piensa de nosotros. Pero Joaquín lo tiene claro desde hace treinta años, y yo pienso igual. No es fanatismo: es nuestra fe.",
          efectos: ["evidencia:ev_rebeca"],
          opciones: [
            { texto: "¿Qué le pediría al equipo?", ir: "pide" },
            { texto: "Gracias por conversar conmigo.", ir: "FIN" }
          ] },
        pide: { habla: "rebeca", texto: "Que lo operen sin sangre y que no lo traten como a un loco. Hay hospitales que lo hacen. Nosotros solo queremos que viva, pero sin traicionar lo que creemos." }
      }
    },

    sofia: {
      nodos: {
        inicio: { habla: "sofia", texto: "Hola. Soy Sofía, la hija. Yo me alejé de la congregación hace unos años; no comparto su fe. Pero es mi papá, y lo respeto.",
          opciones: [
            { texto: "¿Qué te preocupa?", ir: "preocupa" },
            { texto: "Gracias, Sofía.", ir: "FIN" }
          ] },
        preocupa: { habla: "sofia", texto: "Que mi papá nunca ha hablado a solas con los doctores. Siempre está mi mamá o alguien de la congregación. No digo que lo obliguen, ¿ah? Pero no sé si les diría si tuviera dudas.",
          efectos: ["evidencia:ev_sofia"], ir: "FIN" }
      }
    },

    samuel: {
      nodos: {
        inicio: { habla: "samuel", texto: "Buenas tardes. Samuel Tapia, anciano de la congregación de Joaquín. Supongo que usted viene por él.",
          opciones: [
            { texto: "¿La congregación le exige rechazar la transfusión?", ir: "exige" },
            { texto: "¿Qué le pediría al hospital?", ir: "pide" },
            { texto: "Gracias por su tiempo.", ir: "FIN" }
          ] },
        exige: { habla: "samuel", texto: "Nuestra fe enseña a abstenerse de la sangre, pero la decisión es de cada persona ante su conciencia. Nadie puede obligarlo, ni siquiera nosotros. Lo que sí hacemos es acompañar y ofrecer información sobre alternativas médicas.",
          efectos: ["evidencia:ev_samuel"], ir: "inicio" },
        pide: { habla: "samuel", texto: "Que no vean a Joaquín como un problema, sino como un paciente que quiere vivir. Hay técnicas de cirugía sin sangre y centros con experiencia. Podemos compartir esa información con el equipo, si lo desean.",
          efectos: ["evidencia:ev_samuel"], ir: "inicio" }
      }
    },

    marisol: {
      nodos: {
        inicio: { habla: "marisol", texto: "¡Hola! Pasa. ¿Vienes por lo del Sr. Saavedra? Justo saqué el protocolo del hospital para estos casos. Está en el archivador verde.",
          opciones: [
            { texto: "¿Qué dice el protocolo?", ir: "protocolo" },
            { texto: "¿Qué ves tú en este caso?", ir: "mirada" },
            { texto: "Gracias, Marisol.", ir: "FIN" }
          ] },
        protocolo: { habla: "marisol", texto: "Que hay que informar bien, conversar a solas con el paciente, anotar con detalle qué acepta y qué no, prepararlo antes de operar y, si aquí no se puede hacer con seguridad, derivarlo. El papel está bien. El problema es que casi nunca se cumple entero.",
          efectos: ["evidencia:ev_protocolo"], ir: "inicio" },
        mirada: { habla: "marisol", texto: "Una familia que se quiere, con miradas distintas sobre la fe. Y algo práctico: si hay que derivarlo a otra ciudad, esta familia no tiene auto. Las decisiones éticas también se juegan en los pasajes de bus.", ir: "inicio" }
      }
    },

    carmen: {
      alTerminar: [],
      nodos: {
        inicio: { habla: "carmen", texto: "Qué bueno que viniste. Rodrigo, el hijo de la Sra. Elena, quiere firmar por ella porque tiene un diagnóstico de deterioro cognitivo leve. Ella rechaza la cirugía de cadera.",
          opciones: [
            { texto: "¿Entonces ella no puede decidir?", si: ["!minijuego:capacidad"], ir: "n2" },
            { texto: "¿Cómo sigue la Sra. Elena?", si: ["minijuego:capacidad"], ir: "despues" }
          ] },
        n2: { habla: "carmen", texto: "Eso es justamente lo que no sabemos. La capacidad no se presume ni se descarta por un diagnóstico: **se evalúa**, para *esta* decisión y en *este* momento. Hay cuatro cosas que mirar: si comprende la información, si la aplica a su propia situación, si razona según sus valores y si puede expresar una elección.",
          efectos: ["concepto:capacidad_4", "glosario:capacidad"], ir: "n3" },
        n3: { habla: "carmen", texto: "Hazle tú las preguntas. Yo te acompaño. Elige bien: una mala pregunta puede hacer que una persona capaz parezca incapaz… o al revés.",
          opciones: [{ texto: "De acuerdo.", efectos: ["minijuego:capacidad"], ir: "FIN" }] },
        despues: { habla: "carmen", texto: "Tranquila, con dolor controlado. Traumatología va a respetar su decisión y seguirá conversando con ella. La kinesióloga viene mañana." }
      }
    },

    carmen_elena: {
      nodos: {
        inicio: { habla: "carmen", texto: "Bien hecho. ¿Qué te llevas de esta conversación?",
          opciones: [
            { texto: "Que un diagnóstico no basta para decir que alguien no puede decidir.", ir: "n2a" },
            { texto: "Que igual me parece extraño que no quiera operarse.", ir: "n2b" }
          ] },
        n2a: { habla: "carmen", texto: "Exacto. La capacidad es para *esta* decisión, en *este* momento. Elena podría necesitar ayuda con un trámite bancario complicado y, aun así, entender perfectamente qué implica no operarse. Si su estado cambia, se vuelve a evaluar.", ir: "n3" },
        n2b: { habla: "carmen", texto: "Puede parecer extraño, pero evaluar capacidad no es evaluar si estamos de acuerdo. Elena comprende, aprecia y razona según lo que le importa. Que su decisión no sea la que tomaríamos nosotros no la vuelve incapaz.", ir: "n3" },
        n3: { habla: "rodrigo", texto: "Entonces… ¿yo no puedo firmar?", ir: "n4" },
        n4: { habla: "carmen", texto: "No en su lugar, Rodrigo. Pero sí puedes acompañarla, ayudarla a pensar y contarnos lo que te preocupa. Vamos a seguir conversando con ella: una decisión así se puede revisar con más información, sin presionarla.",
          efectos: ["concepto:escala_movil"], ir: "n5" },
        n5: { habla: "carmen", texto: "{nombre}, el comité se reúne ahora por el caso del Sr. Saavedra. Sube a la sala cuando quieras.",
          efectos: ["bandera:sesion_lista"] }
      }
    },

    elena_despues: {
      nodos: {
        inicio: { habla: "elena", texto: "Gracias por preguntarme a mí. Casi nadie lo hace. Todos le hablan a Rodrigo como si yo fuera un mueble." }
      }
    },

    rodrigo: {
      nodos: {
        inicio: { habla: "rodrigo", texto: "Usted es del comité, ¿no? Mire, mi mamá tiene demencia; se le olvidan las cosas. No está en condiciones de decidir algo así. Yo soy su hijo, la quiero, y quiero que la operen. Yo firmo.",
          efectos: ["evidencia:ev_rodrigo"],
          opciones: [
            { texto: "¿Qué es lo que más te preocupa?", ir: "miedo" },
            { texto: "Entiendo. Gracias, Rodrigo.", ir: "FIN" }
          ] },
        miedo: { habla: "rodrigo", texto: "Que se quede en cama y se apague. Mi papá se nos fue en una operación y ahora ella no quiere operarse por lo mismo… Pero una cosa no tiene que ver con la otra, ¿o sí?" }
      }
    },

    sesion: {
      nodos: {
        inicio: { habla: "ines", texto: "Buenas tardes. La pregunta del Dr. Fuentes es: **¿cómo debe proceder el equipo ante el rechazo de transfusiones del Sr. Saavedra en su cirugía programada?**",
          opciones: [
            { texto: "Todavía no he hablado con Joaquín.", si: ["!evidencia:ev_joaquin"], ir: "falta_j" },
            { texto: "¿Me falta hablar con alguien?", si: ["evidencia:ev_joaquin", "!evidencias:ev_sofia,ev_protocolo"], ir: "falta_ctx" },
            { texto: "Empecemos.", si: ["evidencia:ev_joaquin"], ir: "metodo" }
          ] },
        falta_j: { habla: "ines", texto: "Entonces ve primero al preoperatorio. No podemos deliberar sobre alguien sin escucharlo." },
        falta_ctx: { habla: "ines", texto: "Te conviene conversar con la familia en la sala de espera y pasar por trabajo social: Marisol tiene el protocolo del hospital. También puedes empezar igual; tú decides.",
          opciones: [
            { texto: "Voy a hablar con ellos.", ir: "FIN" },
            { texto: "Empecemos igual.", ir: "metodo" }
          ] },
        metodo: { habla: "ines", texto: "Mismo método que la vez pasada. Y una regla para hoy: aquí nadie discute si la fe de Joaquín es verdadera o falsa. Discutimos cómo respetar a un paciente capaz sin abandonarlo.",
          efectos: ["bandera:en_sesion", "concepto:influencia", "glosario:coaccion", "deliberacion"] }
      }
    },

    cierre_comite: {
      alTerminar: ["bandera:cierre_visto", "cierre"],
      nodos: {
        inicio: { habla: "narrador", texto: "Antes de cerrar la sesión, Carmen comenta ante el comité el caso de la Sra. Elena.", ir: "n2" },
        n2: { habla: "carmen", texto: "Lo de la sala 214 fue un buen ejemplo de algo que en el hospital se confunde mucho: que alguien tenga un diagnóstico no significa que no pueda decidir. Y que decida algo que no nos gusta, tampoco.", ir: "n3" },
        n3: { habla: "hernan", texto: "A mí me quedó dando vueltas otra cosa. Cuando uno quiere a alguien, le cuesta aceptar que decida distinto. Rodrigo no es un mal hijo; tiene miedo.",
          opciones: [
            { texto: "Eso es lo que se llama paternalismo, ¿cierto?", ir: "n4" },
            { texto: "Pero entonces, ¿cuándo sí se puede decidir por otro?", ir: "n4b" }
          ] },
        n4: { habla: "ines", texto: "Sí, aunque con buenas intenciones. **Paternalismo** es imponer una decisión a una persona capaz, invocando su propio bien. Algunos defienden un paternalismo «débil»: intervenir solo cuando hay dudas reales sobre la capacidad o la información, precisamente para asegurar que la decisión sea libre.",
          efectos: ["concepto:paternalismo", "glosario:paternalismo"], ir: "n5" },
        n4b: { habla: "ines", texto: "Cuando la persona no tiene capacidad para esa decisión o no puede expresarla. Y aun entonces, quien decide debe intentar hacerlo como ella lo habría querido, no como uno preferiría. Imponer una decisión a una persona capaz «por su bien» se llama **paternalismo**, y es difícil de justificar.",
          efectos: ["concepto:paternalismo", "glosario:paternalismo"], ir: "n5" },
        n5: { habla: "paula", texto: "Una precisión legal para cerrar. La Ley 20.584 reconoce el derecho a rechazar tratamientos, con un límite: el rechazo no puede tener como objetivo acelerar artificialmente la muerte. Rechazar una transfusión para vivir de acuerdo con la propia fe no es lo mismo que buscar morir. Esa distinción la vamos a necesitar más adelante.",
          efectos: ["concepto:limite_rechazo"], ir: "n6" },
        n6: { habla: "paula", texto: "Y, para ser honesta: los tribunales chilenos no siempre han resuelto igual los casos de transfusiones. El derecho también delibera.", ir: "n7" },
        n7: { habla: "ines", texto: "Gracias, {nombre}. Como siempre, te pido tus reflexiones antes de irte.",
          opciones: [{ texto: "Ir a las preguntas de cierre.", ir: "FIN" }] }
      }
    }
  },

  /* ---------------------------------------------------------------------
     MINIJUEGO: evaluación de capacidad (Elena)
     --------------------------------------------------------------------- */
  minijuegos: {
    capacidad: {
      tipo: "entrevista",
      titulo: "¿Puede decidir la Sra. Elena?",
      persona: "elena",
      guia: "carmen",
      intro: "Para cada una de las cuatro habilidades, elige una pregunta que de verdad la evalúe. Si una pregunta no sirve, te diré por qué y podrás elegir otra. Al final, tú concluyes.",
      instrucciones: "Evalúa la **capacidad para decidir** de la Sra. Elena sobre esta cirugía, habilidad por habilidad. No se trata de saber si estás de acuerdo con ella, sino de si puede tomar esta decisión.",
      criterios: [
        { id: "comprender", nombre: "Comprender", descripcion: "¿Entiende la información relevante: qué tiene, qué le proponen, riesgos y alternativas?",
          preguntas: [
            { texto: "¿Qué día es hoy, señora Elena?", buena: false,
              respuesta: "Martes… no, miércoles. Aquí adentro una pierde la cuenta.",
              comentario: "La orientación en el tiempo no mide si comprende *esta* decisión. Además, estar hospitalizada desorienta a cualquiera." },
            { texto: "Entendió todo lo que le dijo el doctor, ¿verdad?", buena: false,
              respuesta: "Sí, sí.",
              comentario: "Es una pregunta cerrada que invita a decir que sí. No muestra qué entendió." },
            { texto: "¿Me puede contar con sus palabras qué le explicaron sobre la operación?", buena: true,
              respuesta: "Que me quebré la cadera y que me quieren poner un clavo. Que si no me opero, lo más probable es que no vuelva a caminar bien, y que estar en cama me puede traer otras complicaciones, como una neumonía.",
              comentario: "Pregunta abierta: le pide explicar con sus palabras. Muestra que comprende el diagnóstico, la propuesta y los riesgos de no operarse." }
          ] },
        { id: "apreciar", nombre: "Apreciar", descripcion: "¿Reconoce que esa información se aplica a ella y a su situación concreta?",
          preguntas: [
            { texto: "¿No le da miedo morirse?", buena: false,
              respuesta: "¿Y a quién no, pues? … ¿Me está diciendo que me voy a morir?",
              comentario: "Presiona con el miedo en lugar de evaluar. Una pregunta así puede alterar la decisión que se busca evaluar." },
            { texto: "¿Qué cree que le va a pasar a usted si no se opera?", buena: true,
              respuesta: "Que me voy a quedar en cama o en silla. Lo sé. Mi vecina no se operó y así quedó. Me da pena, pero lo sé.",
              comentario: "Evalúa si aplica la información a sí misma. Elena reconoce las consecuencias probables *para ella*." },
            { texto: "¿Sabe cuánto la quiere su hijo?", buena: false,
              respuesta: "Claro que lo sé. Es un buen hijo. Un poco mandón, como su papá.",
              comentario: "Es una pregunta afectiva, no evalúa la capacidad. Y puede sentirse como una presión para decidir lo que él quiere." }
          ] },
        { id: "razonar", nombre: "Razonar", descripcion: "¿Compara las opciones y llega a una decisión coherente con sus valores?",
          preguntas: [
            { texto: "¿Cuántos años tiene usted?", buena: false,
              respuesta: "Setenta y nueve. Ochenta en marzo, si Dios quiere.",
              comentario: "La edad no dice nada sobre cómo razona su decisión." },
            { texto: "¿Le parece razonable lo que está decidiendo?", buena: false,
              respuesta: "A mí sí. A mi hijo, no.",
              comentario: "Pide un juicio sobre el resultado, no muestra el proceso. Además, capacidad no significa elegir lo que el equipo considera «razonable»." },
            { texto: "¿Por qué prefiere no operarse? ¿Qué pesa más para usted?", buena: true,
              respuesta: "Mi marido se murió en una operación, y desde entonces le tengo terror a la anestesia. Tengo setenta y nueve años; prefiero quedarme en mi casa, aunque sea con dolor, a morirme dormida en un pabellón. El doctor me dijo que con remedios y kinesiología algo se puede hacer.",
              comentario: "Muestra que compara opciones (operarse, no operarse con tratamiento del dolor) y que su decisión es coherente con su historia y sus valores." }
          ] },
        { id: "expresar", nombre: "Expresar una elección", descripcion: "¿Puede comunicar una decisión clara y estable?",
          preguntas: [
            { texto: "¿Quiere que decida su hijo por usted?", buena: false,
              respuesta: "¡No! Él me quiere, pero la cadera es mía.",
              comentario: "Su respuesta es clara, pero la pregunta desplaza el foco: no pregunta qué decide ella, sino quién decide. Pregunta directamente por su elección." },
            { texto: "Entonces, ¿qué decide sobre la operación?", buena: true,
              respuesta: "No me quiero operar. Eso lo tengo claro desde el principio, y se lo he dicho igual a todos.",
              comentario: "Expresa una elección clara y estable en el tiempo (la ha sostenido desde el principio)." }
          ] }
      ],
      veredicto: {
        pregunta: "¿Qué concluyes sobre la capacidad de la Sra. Elena para esta decisión?",
        opciones: [
          { texto: "No tiene capacidad, porque tiene un diagnóstico de deterioro cognitivo.",
            explicacion: "Un diagnóstico, por sí solo, no equivale a incapacidad. Elena mostró las cuatro habilidades para *esta* decisión. Lo que importa es cómo decide, no la etiqueta." },
          { texto: "No tiene capacidad, porque rechazar una operación útil no es razonable.",
            explicacion: "Evaluar capacidad no es evaluar si estamos de acuerdo. Una persona capaz puede tomar decisiones que el equipo no tomaría, si comprende, aprecia, razona y elige." },
          { texto: "Su hijo debe decidir, porque es su familiar responsable.",
            explicacion: "La familia puede acompañar y ayudar a pensar, pero no reemplaza la decisión de una persona adulta capaz." },
          { texto: "Tiene capacidad para esta decisión: comprende, aprecia, razona según sus valores y expresa una elección estable. Conviene dejarlo registrado y volver a evaluar si su estado cambia.", correcta: true,
            explicacion: "Exacto. La capacidad es específica para cada decisión y puede fluctuar. Por eso se registra cómo se evaluó y se revisa si algo cambia, sin dejar de acompañarla ni de ofrecerle información." }
        ]
      },
      pistas: [
        "Las mejores preguntas son **abiertas**: piden a la persona explicar con sus palabras, no responder sí o no.",
        "Evita preguntas que midan otra cosa (la fecha, la edad) o que presionen con emociones (el miedo, el cariño del hijo).",
        "Buenas preguntas: «¿Qué le explicaron?», «¿Qué cree que le pasará si no se opera?», «¿Por qué lo prefiere?», «¿Qué decide?». En la conclusión, recuerda que un diagnóstico no equivale a incapacidad."
      ],
      exito: "Evaluaste la capacidad de la Sra. Elena habilidad por habilidad, sin confundir diagnóstico con incapacidad.",
      alCompletar: ["bandera:elena_hecha", "dialogo:carmen_elena"]
    }
  },

  /* ---------------------------------------------------------------------
     DELIBERACIÓN (caso de Joaquín)
     --------------------------------------------------------------------- */
  deliberacion: {
    pregunta: "¿Cómo debe proceder el equipo ante el rechazo de transfusiones del Sr. Saavedra en su cirugía programada?",
    alTerminar: ["bandera:delib_hecha", "dialogo:cierre_comite"],

    guion: {
      hechos: { habla: "ines", texto: "Empecemos por lo que sabemos y lo que no. Clasifica lo que trajiste y dime qué nos falta averiguar." },
      valores: { habla: "hernan", texto: "Ahora, ¿qué está en juego? Les pido que miremos también lo que Joaquín valora, aunque no lo compartamos. Para él, esto no es un capricho: es su vida entera." },
      cursos: { habla: "carmen", texto: "Busquemos los extremos. Suelen ser lo primero que dice alguien en un pasillo." },
      decision: { habla: "paula", texto: "Propón lo que recomendarías y fundamenta. Te vamos a objetar desde distintos lados." },
      consistencia: { habla: "ines", texto: "Las tres preguntas finales de siempre." }
    },

    pistas: {
      hechos: [
        "La ficha, el documento de directivas y el protocolo son documentos: hechos. Lo que dicen las personas son testimonios u opiniones, aunque sean muy valiosos.",
        "El afiche de donación de sangre no dice nada sobre este caso. El comentario del funcionario es una opinión.",
        "Para la información faltante, pregúntate qué necesitaría saber el equipo para respetar a Joaquín sin abandonarlo: ¿su decisión es libre?, ¿qué acepta exactamente?, ¿conoce las alternativas?, ¿hay tiempo para prepararlo?"
      ],
      valores: [
        "Piensa en cada parte: Joaquín, su familia, el equipo de salud y el hospital como institución.",
        "La autonomía y la coherencia con sus creencias se relacionan con el principio de autonomía; proteger su vida, con beneficencia y no maleficencia.",
        "Evitar problemas legales es un interés de la institución, no un valor ético del mismo rango."
      ],
      cursos: [
        "Los extremos son: transfundir aunque lo rechace, o negarse a operarlo mientras no acepte sangre.",
        "Un falso intermedio parece conciliar, pero engaña o vacía el consentimiento. ¿Qué pasa si se promete algo y se hace otra cosa?",
        "Los intermedios buscan reducir el riesgo, asegurar que la decisión sea libre e informada, u organizar al equipo sin abandonar al paciente."
      ],
      decision: [
        "Elige lo que de verdad recomendarías. No hay una única respuesta correcta.",
        "Revisa que tus razones apoyen tu propuesta.",
        "Ante una objeción, reconoce lo razonable que tiene y responde cómo te harías cargo."
      ],
      consistencia: [
        "Aquí no hay respuestas correctas: son preguntas para revisar tu propia decisión.",
        "Imagina que explicas tu propuesta frente a Joaquín y frente a la anestesióloga.",
        "Si algo te hace cambiar de opinión, puedes volver a la fase de decisión."
      ]
    },

    hechos: {
      items: [
        { ev: "ev_ficha_joaquin", tipo: "hecho", relevancia: "decisiva",
          explicacion: "Es un documento clínico: diagnóstico, plazo de la cirugía, hemoglobina y riesgo estimado. Son hechos centrales." },
        { ev: "ev_tarjeta", tipo: "hecho", relevancia: "decisiva",
          explicacion: "Es un documento firmado que registra su voluntad. Ojo con lo que **no** dice: la sección de fracciones y procedimientos está en blanco." },
        { ev: "ev_joaquin", tipo: ["hecho", "opinion"], relevancia: "decisiva",
          explicacion: "Lo que el paciente declara sobre su propia voluntad es un dato central (un hecho: eso es lo que quiere). Sus razones son convicciones, no hechos verificables, y no necesitan serlo para ser respetadas." },
        { ev: "ev_protocolo", tipo: "hecho", relevancia: "decisiva",
          explicacion: "Es un documento institucional: dice qué debe hacer el equipo, incluida la conversación a solas y la derivación." },
        { ev: "ev_sofia", tipo: "opinion", relevancia: "decisiva",
          explicacion: "Es el testimonio de la hija. No prueba que haya presión, pero señala algo que hay que averiguar: si Joaquín ha podido decidir a solas." },
        { ev: "ev_valeria", tipo: ["opinion", "hecho"], relevancia: "contexto",
          explicacion: "Mezcla un juicio técnico (el riesgo puede reducirse) con su experiencia personal (le cuesta participar). Ambas cosas son relevantes, pero distintas." },
        { ev: "ev_rebeca", tipo: "opinion", relevancia: "contexto",
          explicacion: "Es la opinión de la esposa, que comparte la fe de Joaquín. Importa, pero no reemplaza la voluntad de él." },
        { ev: "ev_samuel", tipo: "opinion", relevancia: "contexto",
          explicacion: "Es la mirada de la congregación. Afirma que la decisión es de conciencia personal y ofrece información útil que el equipo puede verificar." },
        { ev: "ev_comentario", tipo: "opinion", relevancia: "irrelevante",
          explicacion: "Es la opinión de alguien ajeno al caso. No aporta hechos, aunque revela una actitud en el hospital que el comité debería tener presente." },
        { ev: "ev_afiche", tipo: "irrelevante", relevancia: "irrelevante",
          explicacion: "Una campaña de donación de sangre no dice nada sobre la decisión de Joaquín." }
      ],
      introFaltantes: "Marca las preguntas que el comité debería responder antes de recomendar algo. No todas son importantes.",
      faltantes: [
        { id: "f1", texto: "¿Ha podido Joaquín expresar su decisión a solas, sin presión de su familia ni de su comunidad?", necesaria: true,
          explicacion: "Clave para la **voluntariedad**. No se trata de desconfiar de la familia, sino de asegurar que la decisión sea suya." },
        { id: "f2", texto: "¿Qué fracciones sanguíneas y qué procedimientos, como el recuperador celular, acepta exactamente?", necesaria: true,
          explicacion: "Decisivo: su documento deja esa parte en blanco, y de eso depende qué alternativas se pueden ofrecer." },
        { id: "f3", texto: "¿Se le han explicado con claridad las alternativas y los riesgos reales de operarse sin transfusión?", necesaria: true,
          explicacion: "Clave para que su decisión sea **informada**. Él mismo dijo que tiene preguntas sin responder." },
        { id: "f4", texto: "¿Hay tiempo para mejorar su hemoglobina antes de operar?", necesaria: true,
          explicacion: "Muy relevante: la cirugía está programada en tres semanas, y la preparación puede reducir mucho el riesgo." },
        { id: "f5", texto: "¿Es verdadera la religión de Joaquín?", necesaria: false,
          explicacion: "No es una pregunta que el comité deba ni pueda responder. Se respetan las convicciones de una persona capaz sin juzgar si son verdaderas." },
        { id: "f6", texto: "¿Cuánto cuesta una bolsa de sangre?", necesaria: false,
          explicacion: "No cambia qué es correcto hacer ante el rechazo de un paciente capaz." }
      ]
    },

    valores: {
      partes: [
        { id: "paciente", nombre: "Joaquín" },
        { id: "familia", nombre: "Su familia" },
        { id: "equipo", nombre: "Equipo de salud" },
        { id: "institucion", nombre: "Hospital y comunidad" }
      ],
      lista: [
        { id: "autonomia", nombre: "Autonomía de Joaquín", descripcion: "decidir sobre su propio cuerpo", partes: ["paciente"], principios: ["autonomia"],
          explicacion: "Es el núcleo del **principio de autonomía**: una persona capaz decide qué tratamientos acepta." },
        { id: "vida", nombre: "Proteger su vida y su salud", descripcion: "que la cirugía salga bien y el cáncer no avance", partes: ["paciente", "familia", "equipo"], principios: ["beneficencia", "no_maleficencia"],
          explicacion: "Proteger su vida y evitar daños corresponde a **beneficencia** y **no maleficencia**." },
        { id: "conciencia", nombre: "Coherencia con sus creencias", descripcion: "vivir de acuerdo con su fe", partes: ["paciente", "familia"], principios: ["autonomia", "beneficencia"],
          explicacion: "Es parte de su **autonomía**, y también de su bien tal como él lo entiende (**beneficencia** en sentido amplio): para Joaquín, una vida salvada traicionando su fe sería un daño." },
        { id: "libertad", nombre: "Que la decisión sea libre", descripcion: "sin presiones de nadie", partes: ["paciente", "familia"], principios: ["autonomia"],
          explicacion: "La **voluntariedad** es una condición de la autonomía: una decisión bajo presión no es plenamente autónoma." },
        { id: "vinculo", nombre: "Paz y vínculo familiar", descripcion: "una familia con miradas distintas sobre la fe", partes: ["familia"], principios: ["beneficencia"],
          explicacion: "Cuidar el bienestar de la familia y sus vínculos es una forma de **beneficencia** hacia quienes también sufren el caso." },
        { id: "integridad", nombre: "Integridad del equipo", descripcion: "que nadie deba actuar contra su conciencia profesional", partes: ["equipo"], principios: ["autonomia", "no_maleficencia"],
          explicacion: "Las convicciones de los profesionales también merecen respeto (una forma de **autonomía**), y a la anestesióloga le preocupa causar o permitir un daño (**no maleficencia**). Pero ese respeto no puede dejar al paciente sin atención." },
        { id: "equidad", nombre: "Trato igualitario", descripcion: "que nadie reciba peor atención por sus creencias", partes: ["institucion", "paciente"], principios: ["justicia"],
          explicacion: "No discriminar por creencias y gestionar derivaciones sin barreras económicas es un asunto de **justicia**." },
        { id: "demanda", nombre: "Evitar problemas legales al hospital", descripcion: "que nadie demande", partes: ["institucion"], trampa: true,
          explicacion: "Evitar demandas es un **interés** institucional comprensible, pero no un valor ético del mismo rango. Si guía la decisión, se protege al hospital y no al paciente." }
      ]
    },

    cursos: {
      lista: [
        { id: "A", tipo: "extremo", corto: "Transfundir si hace falta",
          texto: "Operarlo con el protocolo habitual y transfundir si hace falta, aunque él lo haya rechazado.",
          lesiona: "la autonomía y la libertad de conciencia de Joaquín.",
          marca: "contra_consenso", quienBloquea: "paula",
          explicacionMarca: "No podemos recomendar esto. Transfundir a un adulto capaz contra su rechazo expreso e informado contradice el consenso bioético actual y el derecho a rechazar tratamientos que reconoce la Ley 20.584. Busquemos cómo proteger su vida dentro de lo que él acepta.",
          legal: "Contrario al derecho a rechazar tratamientos (Ley 20.584, art. 14) y al consenso bioético actual." },
        { id: "B", tipo: "extremo", corto: "No operarlo sin sangre",
          texto: "Negarse a operarlo mientras no acepte transfusiones y darle el alta.",
          lesiona: "su vida y su salud, y el deber de no abandonar al paciente.",
          legal: "No es ilegal negarse a una técnica, pero el equipo no puede abandonar al paciente: debe ofrecer alternativas o derivarlo." },
        { id: "I1", tipo: "intermedio", corto: "Preparar y reducir el riesgo",
          texto: "Aprovechar las tres semanas para mejorar su hemoglobina (hierro, eritropoyetina) y planificar técnicas para reducir el sangrado.",
          legal: "Compatible con la ley; debe informarse y registrarse con su consentimiento." },
        { id: "I2", tipo: "intermedio", corto: "Conversar a solas y detallar",
          texto: "Conversar con Joaquín a solas y con tiempo, para confirmar que su decisión es libre e informada, y dejar por escrito qué acepta y qué no.",
          legal: "Es lo que exige un consentimiento válido: información comprensible y constancia escrita en una cirugía (Ley 20.584, art. 14)." },
        { id: "I3", tipo: "intermedio", corto: "Recuperador celular o derivación",
          texto: "Coordinar el recuperador celular y, si este hospital no puede operarlo con seguridad, derivarlo a un equipo con experiencia en cirugía sin sangre.",
          legal: "Compatible con la ley; la derivación debe gestionarse sin dejar al paciente sin atención." },
        { id: "I4", tipo: "intermedio", corto: "Reorganizar el equipo",
          texto: "Si la anestesióloga no se siente capaz de participar, reemplazarla por otra profesional dispuesta, sin retrasar la atención.",
          legal: "{legal:objecion_conciencia}" },
        { id: "F", tipo: "intermedio", falsoIntermedio: true, corto: "Firmar y transfundir a escondidas",
          texto: "Aceptar por escrito su rechazo, pero acordar en reserva con el equipo que se le transfundirá si hay una emergencia en pabellón.",
          porQueNoExtremo: "no es uno de los dos polos: se presenta como un punto medio. (En el paso siguiente verás si realmente lo es.)",
          explicacionFalso: "Parece conciliar ambas cosas, pero es un **engaño**: vacía de contenido el consentimiento y lesiona por completo la autonomía y la confianza. Es un falso intermedio.",
          marca: "contra_consenso", quienBloquea: "ines",
          explicacionMarca: "Esto no es un punto medio: es engañar a Joaquín. Un consentimiento obtenido con una reserva secreta no es consentimiento. Además, destruiría la confianza de cualquier paciente en el hospital.",
          legal: "Engañar al paciente sobre lo que se hará vicia el consentimiento: contrario a la ley y al consenso ético." }
      ]
    },

    decision: {
      razones: [
        { id: "r1", texto: "Un adulto capaz tiene derecho a rechazar un tratamiento, incluso uno que podría salvarle la vida.", apoya: ["I1", "I2", "I3", "I4", "B"] },
        { id: "r2", texto: "Hay que asegurarse de que su decisión sea realmente libre, sin presión de nadie.", apoya: ["I2"] },
        { id: "r3", texto: "Existen alternativas médicas que reducen el riesgo sin usar sangre.", apoya: ["I1", "I3"] },
        { id: "r4", texto: "El equipo tiene el deber de no abandonar al paciente aunque no comparta su decisión.", apoya: ["I1", "I2", "I3", "I4"] },
        { id: "r5", texto: "El equipo no debería participar en una cirugía con un riesgo de muerte que sabe cómo evitar.", apoya: ["B", "I3"] },
        { id: "r6", texto: "Los profesionales también tienen convicciones que merecen respeto.", apoya: ["I4"] },
        { id: "r7", texto: "Respetar sus creencias es respetar su dignidad, aunque no las compartamos.", apoya: ["I1", "I2", "I3", "I4"] },
        { id: "r8", texto: "Salvar la vida está por sobre cualquier creencia.", apoya: ["A"] },
        { id: "r9", texto: "Así el hospital evita una demanda.", apoya: [], debil: true,
          explicacion: "evitar demandas es un interés del hospital, no una razón ética. Si fuera la razón principal, la decisión protegería a la institución y no al paciente." }
      ],
      incompatibles: [
        ["B", "I1", "No se puede negar la cirugía y, a la vez, preparar al paciente para operarlo."],
        ["B", "I3", "Negarse a operarlo es incompatible con coordinar su cirugía sin sangre o derivarlo para ella."]
      ],
      objeciones: {
        I1: [{ id: "o_I1", quien: "carmen", texto: "Mejorar la hemoglobina ayuda, pero no elimina el riesgo. ¿Qué hacemos si igual sangra en pabellón?",
          respuestas: [
            { tipo: "buena", texto: "Eso debe conversarse antes y quedar escrito: él debe saber que el riesgo no desaparece, y el equipo, hasta dónde llega lo que acepta.", comentario: "Bien. Lo peor es improvisar en pabellón lo que se pudo conversar con calma." },
            { tipo: "debil", texto: "Confiemos en que no va a pasar.", comentario: "La esperanza no es un plan. Justamente porque puede pasar, hay que conversarlo antes." }
          ] }],
        I2: [{ id: "o_I2", quien: "hernan", texto: "Hablar a solas con él puede parecer que desconfiamos de su esposa y de su comunidad. ¿No es una forma de paternalismo?",
          respuestas: [
            { tipo: "buena", texto: "No se trata de desconfiar, sino de asegurar que la decisión sea suya. Si la confirma a solas, su decisión queda todavía más firme y merece más respeto.", comentario: "Visto así, me parece un respeto adicional, no una sospecha." },
            { tipo: "debil", texto: "Las comunidades religiosas siempre presionan.", comentario: "Esa generalización es injusta. Mucha gente vive su fe con plena libertad, y Samuel mismo dijo que la decisión es de Joaquín." }
          ] }],
        I3: [{ id: "o_I3", quien: "marisol", texto: "Derivarlo a otra ciudad implica viajes y gastos para una familia que no tiene auto. ¿Es justo?",
          respuestas: [
            { tipo: "buena", texto: "La derivación tiene que venir con apoyo: traslado, alojamiento y gestión de trabajo social. Si no, se vuelve una barrera.", comentario: "Eso. Una derivación sin apoyo es una forma elegante de abandono." },
            { tipo: "debil", texto: "Si quiere cirugía sin sangre, que se las arregle.", comentario: "Eso castiga a Joaquín por sus creencias. El trato igualitario también es justicia." }
          ] }],
        I4: [{ id: "o_I4", quien: "paula", texto: "¿Y si ninguna anestesióloga disponible quiere hacerlo?",
          respuestas: [
            { tipo: "buena", texto: "Entonces la institución tiene que organizarse o derivar a tiempo: la convicción de un profesional no puede dejar al paciente sin atención.", comentario: "Correcto. Las convicciones personales se respetan, pero la responsabilidad de atender es de la institución." },
            { tipo: "debil", texto: "Entonces que acepte la transfusión.", comentario: "Eso convierte una dificultad del hospital en una presión sobre el paciente. No es aceptable." }
          ] }],
        B: [{ id: "o_B", quien: "tomas", texto: "Si lo mandamos a la casa sin operar, su cáncer va a avanzar. ¿Eso no es abandonarlo?",
          respuestas: [
            { tipo: "buena", texto: "Tienes razón: aunque este equipo no lo opere, debe ofrecerle alternativas o derivarlo, no solo darle el alta.", comentario: "Bien. No operar puede ser discutible; abandonar, no." },
            { tipo: "debil", texto: "Él eligió; es su problema.", comentario: "Respetar su decisión no significa desentenderse de él. Sigue siendo nuestro paciente." }
          ] }],
        "*": [{ id: "o_gen", quien: "hernan", texto: "Imagina que Joaquín fuera tu papá y tú no compartieras su fe, como Sofía. ¿Mantendrías lo que propones?",
          respuestas: [
            { tipo: "buena", texto: "Me costaría, pero sí: respetar a alguien incluye respetar decisiones que yo no tomaría. Lo que haría es acompañarlo y asegurarme de que decida con información y libertad.", comentario: "Eso es lo que hace Sofía, y no es poco." },
            { tipo: "debil", texto: "Si fuera mi papá, lo convencería a como dé lugar.", comentario: "Convencer con razones es legítimo; «a como dé lugar» ya suena a presión." }
          ] }]
      }
    },

    consistencia: [
      { id: "publicidad", titulo: "Prueba de publicidad", quien: "hernan",
        texto: "Imagina que explicas tu propuesta frente a Joaquín, su familia y la anestesióloga, todos juntos. ¿Podrías defenderla ante cada uno?",
        opciones: [
          { texto: "Sí: todos entenderían mis razones, aunque no todos estén de acuerdo.", comentario: "Esa es la prueba: dar razones que cada uno pueda entender, aunque no las comparta." },
          { texto: "Me costaría frente a alguno de ellos.", comentario: "Vale la pena preguntarse frente a quién y por qué. A veces ahí aparece lo que falta." },
          { texto: "Quiero revisar mi decisión antes de responder.", revisar: true }
        ] },
      { id: "legalidad", titulo: "Prueba de legalidad", quien: "paula",
        texto: "Revisemos tu propuesta a la luz de la ley. Esto es lo que observo:",
        opciones: [
          { texto: "Entiendo. Mi propuesta respeta el marco legal y tendré en cuenta estas precauciones.", comentario: "Bien. Y recuerda: lo legal es el piso, no el techo." },
          { texto: "Quiero ajustar algo a la luz de esto.", revisar: true }
        ] },
      { id: "temporalidad", titulo: "Prueba de temporalidad", quien: "carmen",
        texto: "Si tuvieras que decidir mañana, después de dormir bien, ¿decidirías lo mismo?",
        opciones: [
          { texto: "Sí: mis razones no dependen de cómo me sentía hoy.", comentario: "Buena señal." },
          { texto: "No lo sé: lo que dijo la anestesióloga me removió.", comentario: "Es comprensible. Las emociones muestran lo que importa; conviene revisar si no hacen perder de vista a Joaquín." },
          { texto: "Probablemente cambiaría algo.", comentario: "Si es así, anótalo en tu reflexión final: ¿qué cambiarías y por qué?" }
        ] }
    ]
  },

  /* ---------------------------------------------------------------------
     CIERRE
     --------------------------------------------------------------------- */
  cierre: {
    reflexiones: [
      { id: "c1", pregunta: "Si fueras la anestesióloga del caso, ¿qué harías? ¿Qué te ayudaría a actuar de manera coherente con tus convicciones y con tu deber hacia Joaquín?" },
      { id: "c2", pregunta: "¿Por qué un diagnóstico no basta para decir que alguien no puede decidir? Usa el caso de la Sra. Elena." },
      { id: "c3", pregunta: "¿Dónde está, para ti, la diferencia entre persuadir a alguien y presionarlo?" }
    ],
    quiz: [
      { id: "q1", pregunta: "¿Cuál de estas condiciones NO es un requisito del consentimiento informado?",
        opciones: [
          { texto: "Que la persona haya recibido información comprensible.", explicacion: "Sí es un requisito: sin información adecuada no hay consentimiento válido." },
          { texto: "Que la decisión sea voluntaria, sin coacción.", explicacion: "Sí es un requisito: la voluntariedad es esencial." },
          { texto: "Que un familiar esté de acuerdo con la decisión.", correcta: true, explicacion: "Correcto: la familia puede acompañar, pero un adulto capaz no necesita su aprobación para decidir sobre su propio cuerpo." },
          { texto: "Que la persona tenga capacidad para esa decisión.", explicacion: "Sí es un requisito: si no hay capacidad, deciden otros según reglas especiales." }
        ] },
      { id: "q2", pregunta: "Una paciente con diagnóstico de deterioro cognitivo leve rechaza una cirugía. ¿Qué corresponde hacer?",
        opciones: [
          { texto: "Considerar que no puede decidir, por su diagnóstico.", explicacion: "Un diagnóstico por sí solo no equivale a incapacidad." },
          { texto: "Evaluar su capacidad para esa decisión concreta: si comprende, aprecia, razona y expresa una elección.", correcta: true, explicacion: "Correcto: la capacidad se evalúa para cada decisión y puede fluctuar." },
          { texto: "Pedir a su hijo que firme el consentimiento.", explicacion: "Solo corresponde que otro decida si ella no tiene capacidad para esta decisión, y eso primero hay que evaluarlo." },
          { texto: "Operarla igual, porque es por su bien.", explicacion: "Eso sería paternalismo fuerte: imponer una decisión a una persona que podría ser capaz." }
        ] },
      { id: "q3", pregunta: "¿Qué es el paternalismo en ética clínica?",
        opciones: [
          { texto: "Que los padres decidan por sus hijos menores de edad.", explicacion: "El nombre viene de ahí, pero en ética clínica se refiere a decidir por adultos «por su bien»." },
          { texto: "Imponer una decisión a una persona capaz, invocando su propio bien, en contra de su voluntad.", correcta: true, explicacion: "Correcto. El paternalismo «débil», que solo interviene para asegurar que la decisión sea libre e informada, es más aceptado." },
          { texto: "Informar a la familia sobre el estado del paciente.", explicacion: "Eso tiene que ver con la confidencialidad, no con el paternalismo." },
          { texto: "Respetar siempre lo que decide el paciente.", explicacion: "Eso es lo contrario: respeto por la autonomía." }
        ] }
    ],
    alTerminar: ["bandera:cierre_hecho", "completar"]
  }
};
