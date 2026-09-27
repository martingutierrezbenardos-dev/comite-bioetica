/* =========================================================================
   CAPÍTULO 1 — EL ARCHIVO: ¿POR QUÉ EXISTE LA BIOÉTICA?   (ARCHIVO EDITABLE)
   -------------------------------------------------------------------------
   Contenido: Código de Núremberg, Tuskegee, Helsinki, Informe Belmont,
   cuatro principios de Beauchamp y Childress, método deliberativo.
   Caso para deliberar: la «Caja 7» (estudio FICTICIO del hospital, 1968).

   Estructura:
     objetivos    → guía del jugador y pistas generales (3 niveles)
     escenas      → lugares, con zonas clicables (x, y, w, h en % del dibujo)
     evidencias   → documentos que se guardan en la carpeta
     dialogos     → conversaciones
     minijuegos   → puzles
     deliberacion → sesión del comité (método de Gracia)
     cierre       → reflexiones y preguntas de comprobación
   Ver las reglas de edición al comienzo de datos/config.js.
   ========================================================================= */
BIO.datos.cap1 = {
  id: "cap1",
  numero: 1,
  titulo: "El archivo",
  subtitulo: "¿Por qué existe la bioética?",
  intro: "Es tu primer día como {{observador|observadora|persona observadora}} del **Comité de Ética Asistencial** del Hospital Regional de Río Arrayán. Afuera llueve, como casi siempre en otoño.\n\nAntes de ver casos, el comité quiere que entiendas de dónde vienen sus reglas.",
  textoFinal: "Terminaste el primer capítulo. Ahora sabes por qué existen los comités de ética y tienes tu **caja de herramientas**: los cuatro principios y un método para deliberar.\n\nEn el próximo capítulo, el comité enfrentará su primer caso clínico.",
  inicio: { escena: "pasillo" },

  /* ---------------------------------------------------------------------
     OBJETIVOS (se muestran arriba; el primero no cumplido es el actual)
     --------------------------------------------------------------------- */
  objetivos: [
    { id: "intro", texto: "Conversa con Inés en el pasillo.", hecho: "bandera:intro",
      pistas: ["Inés está en el pasillo, junto a la ventana.", "Haz clic sobre Inés (o pulsa Tab hasta llegar a ella y luego Enter).", "Si no la ves, pulsa H para resaltar las zonas interactivas."] },
    { id: "docs", texto: "Busca en el archivo los documentos para la línea de tiempo (faltan {faltan:linea}).", hecho: "grupo:linea",
      pistas: ["Baja al archivo por la puerta de la izquierda del pasillo.", "Revisa las cajas de los estantes, las carpetas de colores, los libros del escritorio, el lector de microfichas y el archivador «Chile».", "Son 8 documentos: Tuskegee, Núremberg, Helsinki, la ley de EE.UU. de 1974, Belmont, el libro de Beauchamp y Childress y las dos leyes chilenas. Pulsa H para ver todo lo que se puede revisar."] },
    { id: "linea", texto: "Arma la línea de tiempo en la pizarra de corcho.", hecho: "minijuego:linea",
      pistas: ["La pizarra de corcho está en el centro del archivo.", "Ordena por el año en que *comenzó* cada cosa.", "Dentro de la actividad hay pistas más específicas (botón «Pista»)."] },
    { id: "belmont", texto: "Relaciona cada abuso con un principio del Informe Belmont.", hecho: "minijuego:belmont",
      pistas: ["Habla con Inés en el archivo o vuelve a la pizarra de corcho.", "Lee la carpeta azul (Informe Belmont) si necesitas recordar los principios.", "Dentro de la actividad hay pistas más específicas."] },
    { id: "principios", texto: "Traduce los principios de Belmont a los cuatro de Beauchamp y Childress.", hecho: "minijuego:principios",
      pistas: ["Habla con Inés en el archivo o vuelve a la pizarra de corcho.", "Revisa el libro de Beauchamp y Childress sobre el escritorio.", "Dentro de la actividad hay pistas más específicas."] },
    { id: "caja7", texto: "Revisa la caja 7 del fondo documental.", hecho: "bandera:caja7",
      pistas: ["Está en el archivo, en el suelo, junto al archivador.", "Es una caja de cartón con un 7 grande.", "Pulsa H en el archivo para resaltarla."] },
    { id: "sesion", texto: "Sube a la sala del comité para la sesión sobre la caja 7.", hecho: "bandera:delib_hecha",
      pistas: ["La sala del comité está en el pasillo, en la puerta verde azulada.", "Antes de la sesión conviene conversar con Tomás, junto a la máquina de café.", "En la sala, haz clic en el comité reunido."] },
    { id: "cierre", texto: "Responde las preguntas de cierre.", hecho: "bandera:cierre_hecho",
      pistas: ["Conversa con el comité en la sala.", "Escribe tus reflexiones con tus palabras: no hay respuestas correctas.", "En las preguntas de comprobación, lee la explicación si te equivocas."] }
  ],

  /* ---------------------------------------------------------------------
     ESCENAS
     --------------------------------------------------------------------- */
  escenas: {
    pasillo: {
      id: "pasillo",
      arte: "pasillo",
      titulo: "Pasillo del segundo piso",
      descripcion: "Un pasillo largo con olor a café y a cera de piso. Por la ventana se ve el volcán entre las nubes. Hay una puerta hacia el archivo del subsuelo y otra hacia la sala del Comité de Ética.\n\n*Consejo: pulsa **H** para resaltar todo lo que puedes revisar.*",
      alEntrar: [
        { si: ["!bandera:intro"], efectos: ["dialogo:ines_intro"] }
      ],
      hotspots: [
        { id: "ines", tipo: "persona", etiqueta: "Inés Aravena", x: 47.5, y: 42, w: 7.5, h: 47, si: ["!bandera:intro"], acciones: ["dialogo:ines_intro"] },
        { id: "archivo", tipo: "salida", direccion: "abajo", etiqueta: "Puerta al archivo (subsuelo)", x: 6.9, y: 21.1, w: 15, h: 50, acciones: ["ir:archivo"] },
        { id: "comite", tipo: "salida", direccion: "der", etiqueta: "Sala del Comité de Ética", x: 31.25, y: 21.1, w: 15, h: 50, acciones: ["ir:comite"] },
        { id: "ventana", etiqueta: "Ventana", x: 53, y: 13, w: 25, h: 37,
          texto: "La lluvia cae fina y constante. A lo lejos, el volcán asoma entre las nubes. En el estacionamiento, un auxiliar corre con un paraguas que el viento da vuelta." },
        { id: "tomas", tipo: "persona", etiqueta: "Tomás, junto a la máquina de café", x: 82.5, y: 36, w: 16, h: 53, acciones: ["dialogo:tomas"] }
      ]
    },

    archivo: {
      id: "archivo",
      arte: "archivo",
      titulo: "Archivo del subsuelo",
      descripcion: "Estantes de madera, cajas de cartón y una ampolleta que zumba. Aquí está el fondo documental que donó el Dr. Bórquez. Revisa con calma: no todo lo que hay aquí es importante.",
      hotspots: [
        { id: "alemania", etiqueta: "Caja «Alemania 1946-47»", x: 4.4, y: 19.4, w: 10, h: 11.1, acciones: ["evidencia:ev_nuremberg"] },
        { id: "recortes", etiqueta: "Caja «Recortes EE.UU.»", x: 15.6, y: 37.2, w: 12.5, h: 11.1, acciones: ["evidencia:ev_tuskegee"] },
        { id: "azul", etiqueta: "Carpeta azul", x: 4.4, y: 52.2, w: 5.6, h: 13.9, acciones: ["evidencia:ev_belmont"] },
        { id: "gris", etiqueta: "Carpeta gris", x: 11.25, y: 52.2, w: 5.6, h: 13.9, acciones: ["evidencia:ev_nra1974"] },
        { id: "otras", etiqueta: "Otras cajas del estante", x: 4.4, y: 68.9, w: 24, h: 9,
          texto: "Cajas con boletas antiguas, programas de congresos y una colección de revistas de pesca. Nada que sirva para la muestra." },
        { id: "pizarra", etiqueta: "Pizarra de corcho «Por qué existimos»", x: 33.75, y: 14.4, w: 23.75, h: 32.2, si: ["!minijuego:linea"], acciones: ["minijuego:linea"] },
        { id: "pizarra2", etiqueta: "Pizarra: los principios de Belmont", x: 33.75, y: 14.4, w: 23.75, h: 32.2, si: ["minijuego:linea", "!minijuego:belmont"], acciones: ["minijuego:belmont"] },
        { id: "pizarra3", etiqueta: "Pizarra: de tres a cuatro principios", x: 33.75, y: 14.4, w: 23.75, h: 32.2, si: ["minijuego:belmont", "!minijuego:principios"], acciones: ["minijuego:principios"] },
        { id: "pizarra4", etiqueta: "Pizarra con la línea de tiempo", x: 33.75, y: 14.4, w: 23.75, h: 32.2, si: ["minijuego:principios"], acciones: ["minijuego:linea"],
          texto: "La línea de tiempo quedó armada. Entre 1932 y 1972 hay una franja incómoda: el estudio de Tuskegee continuó durante todo ese tiempo." },
        { id: "libros", etiqueta: "Libros sobre el escritorio", x: 35, y: 52.2, w: 8.75, h: 10, acciones: ["evidencia:ev_beauchamp"] },
        { id: "micro", etiqueta: "Lector de microfichas", x: 48, y: 45.5, w: 11, h: 17, acciones: ["evidencia:ev_helsinki"] },
        { id: "ines", tipo: "persona", etiqueta: "Inés Aravena", x: 59.7, y: 42, w: 5.5, h: 43, si: ["bandera:linea_hecha", "!bandera:sesion_lista"], acciones: ["dialogo:ines_archivo"] },
        { id: "bandeja", etiqueta: "Bandeja de correspondencia", x: 65, y: 30, w: 10, h: 7, acciones: ["evidencia:ev_casino", "evidencia:ev_carta_opinion"],
          texto: "En la bandeja hay dos papeles sueltos." },
        { id: "chile", etiqueta: "Archivador «Chile»", x: 64.4, y: 38, w: 11.25, h: 42, acciones: ["evidencia:ev_ley20120", "evidencia:ev_ley20584"],
          texto: "El archivador tiene dos carpetas con leyes chilenas." },
        { id: "caja7", etiqueta: "Caja con un 7 grande", x: 76.9, y: 72.2, w: 10.6, h: 16.7, si: ["!bandera:caja7"], acciones: ["dialogo:caja7"] },
        { id: "caja7b", etiqueta: "Caja 7 (estudio H-68)", x: 76.9, y: 72.2, w: 10.6, h: 16.7, si: ["bandera:caja7"], acciones: ["dialogo:caja7_otra"] },
        { id: "salida", tipo: "salida", direccion: "arriba", etiqueta: "Subir al pasillo", x: 88.75, y: 15.6, w: 9.4, h: 64.4, acciones: ["ir:pasillo"] }
      ]
    },

    comite: {
      id: "comite",
      arte: "comite",
      titulo: "Sala del Comité de Ética Asistencial",
      descripcion: "Una mesa larga, sillas de colores distintos y una pizarra con el método que usa el comité para analizar casos.",
      hotspots: [
        { id: "salida", tipo: "salida", direccion: "izq", etiqueta: "Volver al pasillo", x: 0.6, y: 16.7, w: 6.4, h: 58, acciones: ["ir:pasillo"] },
        { id: "pizarra", etiqueta: "Pizarra del método deliberativo", x: 8, y: 11.5, w: 31.5, h: 33.5, acciones: ["dialogo:pizarra_metodo"] },
        { id: "ventana", etiqueta: "Ventana", x: 62, y: 10, w: 32, h: 39,
          texto: "Desde aquí se ve el estacionamiento lleno de charcos y, detrás, el cerro con coigües. La lluvia no para." },
        { id: "mesa", etiqueta: "Mesa del comité", x: 14, y: 66, w: 72, h: 15, si: ["!bandera:sesion_lista"],
          texto: "La mesa está vacía. La sesión será más tarde: primero tienes trabajo en el archivo." },
        { id: "sesion", tipo: "persona", etiqueta: "Comité reunido: iniciar la sesión", x: 20, y: 44, w: 60, h: 36, si: ["bandera:sesion_lista", "!bandera:en_sesion"], acciones: ["dialogo:sesion"] },
        { id: "sesion2", tipo: "persona", etiqueta: "Comité reunido: continuar la sesión", x: 20, y: 44, w: 60, h: 36, si: ["bandera:en_sesion", "!bandera:delib_hecha"], acciones: ["deliberacion"] },
        { id: "final", tipo: "persona", etiqueta: "Comité: conversación final", x: 20, y: 44, w: 60, h: 36, si: ["bandera:delib_hecha", "!bandera:cierre_visto"], acciones: ["dialogo:cierre_comite"] },
        { id: "final2", tipo: "persona", etiqueta: "Comité: preguntas de cierre", x: 20, y: 44, w: 60, h: 36, si: ["bandera:cierre_visto", "!bandera:cierre_hecho"], acciones: ["cierre"] },
        { id: "fin", tipo: "persona", etiqueta: "Comité", x: 20, y: 44, w: 60, h: 36, si: ["bandera:cierre_hecho"],
          texto: "La sesión terminó. Carmen revisa su teléfono, Marisol ordena papeles y Hernán se ofrece a llevar a quien necesite. Puedes volver al menú de capítulos desde el botón «Menú»." }
      ]
    }
  },

  /* ---------------------------------------------------------------------
     EVIDENCIAS (documentos redactados para el juego)
     grupo "linea" = forman parte de la línea de tiempo (requieren "fecha")
     --------------------------------------------------------------------- */
  evidencias: {
    ev_tuskegee: {
      titulo: "Recorte: el estudio de Tuskegee",
      etiquetaLinea: "Estudio de sífilis de Tuskegee",
      fuente: "Caja «Recortes EE.UU.» · resumen y traducción del Dr. Bórquez",
      fecha: 1932, fechaTexto: "1932 – 1972",
      grupo: "linea",
      texto: "En 1932, el Servicio de Salud Pública de Estados Unidos inició en el condado de Macon (Alabama) un estudio para observar cómo evolucionaba la sífilis **si no se trataba**. Participaron cerca de 600 hombres afroamericanos, pobres y en su mayoría campesinos: unos 400 tenían sífilis y unos 200, sin la enfermedad, servían como grupo de comparación.\n\nA los hombres no se les dijo que tenían sífilis: se les habló de «mala sangre». A cambio de participar se les ofrecían comidas, traslados y un seguro para cubrir su funeral.\n\nHacia fines de los años cuarenta, la penicilina ya era el tratamiento habitual y eficaz. Aun así, no se les ofreció, e incluso se intentó evitar que la recibieran por otras vías.\n\nEl estudio terminó en 1972, cuando un funcionario que había reclamado internamente hizo llegar la información a la prensa. En 1997, el presidente de Estados Unidos pidió perdón públicamente a los sobrevivientes y sus familias."
    },
    ev_nuremberg: {
      titulo: "Actas resumidas: el Juicio de los médicos",
      etiquetaLinea: "Código de Núremberg",
      fuente: "Caja «Alemania 1946-47»",
      fecha: 1947, fechaTexto: "1946 – 1947",
      grupo: "linea",
      texto: "Después de la Segunda Guerra Mundial, un tribunal militar de Estados Unidos en Núremberg (Alemania) juzgó a 23 acusados —20 de ellos médicos— por experimentos realizados en prisioneros de campos de concentración, sin su consentimiento. El juicio duró desde diciembre de 1946 hasta agosto de 1947.\n\nEn la sentencia, los jueces enumeraron diez condiciones para que un experimento en seres humanos sea aceptable. Ese texto se conoce como **Código de Núremberg (1947)**. Su primera condición es la más conocida: el consentimiento voluntario de la persona es esencial. Otras exigen que el experimento busque un bien para la sociedad que no pueda obtenerse de otro modo, que evite todo sufrimiento y daño innecesario, y que la persona pueda retirarse cuando quiera.\n\n*Nota del Dr. Bórquez al margen: «Muchos colegas de mi generación pensaron que esto era un problema de los nazis, no de la medicina en general».*"
    },
    ev_helsinki: {
      titulo: "Microficha: la Declaración de Helsinki",
      etiquetaLinea: "Declaración de Helsinki",
      fuente: "Lector de microfichas",
      fecha: 1964, fechaTexto: "1964",
      grupo: "linea",
      texto: "En 1964, la **Asociación Médica Mundial** —que reúne a asociaciones médicas de muchos países— adoptó en Helsinki una declaración de principios éticos para la investigación médica en seres humanos.\n\nA diferencia del Código de Núremberg, que nació de una sentencia judicial, esta declaración la escribió la propia profesión médica para orientarse a sí misma. Con sus revisiones posteriores (la de 1975 incorporó la revisión de los estudios por un comité independiente), sostiene que el bienestar de quien participa en una investigación debe estar por encima de los intereses de la ciencia y de la sociedad.\n\nHa sido revisada muchas veces; la versión más reciente es de 2024."
    },
    ev_nra1974: {
      titulo: "Carpeta gris: Ley Nacional de Investigación de EE.UU.",
      etiquetaLinea: "Ley Nacional de Investigación (EE.UU.)",
      fuente: "Carpeta gris",
      fecha: 1974, fechaTexto: "1974",
      grupo: "linea",
      texto: "Tras conocerse el estudio de Tuskegee, el Congreso de Estados Unidos aprobó en 1974 la *National Research Act* (Ley Nacional de Investigación).\n\nLa ley creó una **comisión nacional** encargada de identificar los principios éticos básicos que deberían guiar la investigación con seres humanos, y reforzó la exigencia de que los estudios fueran revisados por comités institucionales antes de comenzar."
    },
    ev_belmont: {
      titulo: "Carpeta azul: el Informe Belmont",
      etiquetaLinea: "Informe Belmont",
      fuente: "Carpeta azul",
      fecha: 1979, fechaTexto: "1979",
      grupo: "linea",
      texto: "La comisión creada en 1974 publicó en 1979 el **Informe Belmont**, llamado así por el centro de conferencias donde se discutió. Es un texto breve que propone tres principios éticos básicos para la investigación:\n\n- **Respeto por las personas:** tratar a cada persona como capaz de decidir por sí misma y proteger especialmente a quienes tienen su autonomía disminuida. Se aplica, sobre todo, mediante el consentimiento informado.\n- **Beneficencia:** no hacer daño y maximizar los beneficios posibles reduciendo los riesgos. Se aplica evaluando con cuidado riesgos y beneficios.\n- **Justicia:** repartir con equidad las cargas y los beneficios de la investigación. Se aplica al seleccionar a los participantes: no se debe elegir a ciertos grupos solo porque son más fáciles de reclutar o de manipular.\n\nEl informe menciona expresamente a Tuskegee como ejemplo de una selección injusta de participantes."
    },
    ev_beauchamp: {
      titulo: "Libro: Principles of Biomedical Ethics",
      etiquetaLinea: "Libro de Beauchamp y Childress",
      fuente: "Libros sobre el escritorio",
      fecha: 1979, fechaTexto: "1979 (primera edición)",
      grupo: "linea",
      texto: "Ese mismo año, los filósofos **Tom Beauchamp** y **James Childress** publicaron *Principles of Biomedical Ethics*. Beauchamp había trabajado en la redacción del Informe Belmont. El libro llevó los principios de la investigación a toda la práctica clínica y los reorganizó en cuatro:\n\n- **Autonomía:** respetar las decisiones de personas capaces sobre su propia vida y su cuerpo.\n- **No maleficencia:** no causar daño.\n- **Beneficencia:** actuar en beneficio de la persona, previniendo o eliminando daños y promoviendo su bien.\n- **Justicia:** distribuir de manera equitativa los recursos, las cargas y los beneficios.\n\nLos autores llaman a estos principios *prima facie*: obligan en principio, pero cuando chocan entre sí hay que ponderarlos en el caso concreto. El libro ha tenido muchas ediciones y es uno de los textos más influyentes de la bioética."
    },
    ev_ley20120: {
      titulo: "Archivador «Chile»: Ley 20.120",
      etiquetaLinea: "Ley 20.120 (Chile)",
      fuente: "Archivador «Chile»",
      fecha: 2006, fechaTexto: "2006",
      grupo: "linea",
      legal: "ley_20120",
      texto: "{legal:ley_20120}"
    },
    ev_ley20584: {
      titulo: "Archivador «Chile»: Ley 20.584",
      etiquetaLinea: "Ley 20.584 (Chile)",
      fuente: "Archivador «Chile»",
      fecha: 2012, fechaTexto: "2012",
      grupo: "linea",
      legal: "ley_20584",
      texto: "{legal:ley_20584}"
    },

    /* Distractores */
    ev_casino: {
      titulo: "Circular interna N.º 14",
      etiquetaLinea: "Circular del casino",
      fuente: "Bandeja de correspondencia",
      fechaTexto: "Sin fecha visible",
      resumen: "Aviso de la administración sobre el nuevo horario del casino del personal.",
      texto: "Se informa al personal que, a contar del lunes, el casino atenderá de 12:30 a 15:00 horas. Se ruega no dejar bandejas sobre las mesas.\n\n— Administración"
    },
    ev_carta_opinion: {
      titulo: "Carta anónima",
      etiquetaLinea: "Carta anónima",
      fuente: "Bandeja de correspondencia · sin firma ni fecha",
      resumen: "Carta sin firma que defiende que la ciencia justifica sus medios.",
      texto: "«La historia de la medicina está hecha por valientes que se atrevieron. Si hubiéramos pedido permiso para todo, no tendríamos vacunas ni antibióticos. La ciencia justifica sus medios.»\n\n*(Sin firma.)*"
    },

    /* Caja 7: caso FICTICIO del hospital */
    ev_fondo_local: {
      titulo: "Caja 7: fichas del «Estudio H-68»",
      fuente: "Caja 7 del fondo documental",
      fechaTexto: "1968 – 1969",
      resumen: "40 fichas de pacientes de un estudio sobre un medicamento para la presión, sin formularios de consentimiento; en 12 dice «informado verbalmente».",
      texto: "La caja contiene **40 fichas clínicas** de pacientes del Hospital de Río Arrayán que participaron en 1968 y 1969 en un estudio sobre un nuevo medicamento para la presión arterial, financiado por un laboratorio extranjero (el nombre está tachado).\n\nLo que consta:\n\n- Hay un protocolo de dos páginas firmado por el Dr. Bórquez como investigador responsable.\n- Ninguna ficha contiene un formulario de consentimiento firmado.\n- En 12 de las 40 fichas aparece anotado a mano: «paciente informado verbalmente».\n- En 3 fichas se registran efectos adversos: mareos y, en un caso, una caída con fractura de muñeca.\n- Las fichas tienen nombre completo, dirección y diagnósticos de cada paciente."
    },
    ev_nota_borquez: {
      titulo: "Nota manuscrita del Dr. Bórquez",
      fuente: "Caja 7 · sobre adjunto, escrito al donar el archivo",
      resumen: "El Dr. Bórquez afirma que todos aceptaron con gusto y que «eran otros tiempos».",
      texto: "«Todos los pacientes aceptaron con gusto: estaban agradecidos de recibir un remedio nuevo sin pagar. Eran otros tiempos y nadie hablaba de consentimientos. Hicimos un bien.»"
    },
    ev_carta_nieta: {
      titulo: "Correo de una vecina de la comuna",
      fuente: "Caja 7 · impreso por la Oficina de Informaciones",
      fechaTexto: "Recibido el año pasado",
      resumen: "Una mujer cuenta que su abuelo decía haber sido «usado» en un estudio y pregunta si su familia tiene derecho a saberlo.",
      texto: "Una mujer de la comuna escribe que su abuelo, ya fallecido, «decía que en el hospital lo usaron de conejillo de Indias» a fines de los años sesenta. Pregunta si existe algún registro y si su familia tiene derecho a saberlo.\n\nAlguien de la Oficina de Informaciones lo imprimió y lo dejó en la caja con una nota: «¿A quién derivo esto?»."
    },
    ev_testimonio_tomas: {
      titulo: "Lo que contaba la abuela de Tomás",
      fuente: "Conversación con Tomás Riquelme",
      resumen: "La abuela de Tomás, auxiliar en esos años, contaba que a algunos pacientes les decían que las pastillas nuevas eran «vitaminas».",
      texto: "Tomás cuenta que su abuela trabajó como auxiliar en el hospital a fines de los sesenta. Ella contaba que a algunos pacientes les daban «unas pastillas nuevas» y les decían que eran vitaminas.\n\nTomás advierte que es un recuerdo familiar, contado muchas veces, y que no sabe si es exacto."
    }
  },

  /* ---------------------------------------------------------------------
     DIÁLOGOS
     --------------------------------------------------------------------- */
  dialogos: {
    ines_intro: {
      nodos: {
        inicio: { habla: "ines", texto: "¡Hola, {nombre}! Soy Inés Aravena, la filósofa del Comité de Ética Asistencial. Qué bueno que llegaste; con esta lluvia, cualquiera se queda en la casa.", ir: "n2" },
        n2: { habla: "ines", texto: "Te cuento en qué te metiste. Este comité se reúne cuando hay un conflicto ético en la atención de pacientes: alguien que rechaza un tratamiento, una familia que no se pone de acuerdo, recursos que no alcanzan. **No decidimos por nadie: asesoramos.** Vas a observar y también a opinar.",
          efectos: ["glosario:cea", "glosario:bioetica"],
          opciones: [
            { texto: "¿Por qué existen estos comités?", ir: "n3" },
            { texto: "¿Qué voy a hacer hoy?", ir: "n4" }
          ] },
        n3: { habla: "ines", texto: "Buena pregunta para empezar. La bioética no nació en un seminario tranquilo: nació, en buena parte, de escándalos. Médicos e investigadores que hicieron cosas graves convencidos de que servían a la ciencia. Muchas de las reglas que usamos hoy son respuestas a esos abusos.", ir: "n4" },
        n4: { habla: "ines", texto: "Este año el comité está de aniversario y queremos montar una pequeña muestra en el hall: **«Por qué existimos»**. Un médico jubilado, el Dr. Bórquez, nos donó su archivo personal. Está en el subsuelo, bastante desordenado.", ir: "n5" },
        n5: { habla: "ines", texto: "Tu tarea: revisar el archivo, encontrar los documentos clave y armar en la pizarra una **línea de tiempo**. Lee con atención: no todo lo que hay en esas cajas sirve, y no todo lo que está escrito es un hecho.",
          opciones: [{ texto: "Entendido. ¿Dónde está el archivo?", ir: "n6" }] },
        n6: { habla: "ines", texto: "Bajando por la puerta de la izquierda. Yo tengo una reunión; paso a verte más tarde. Y si te pierdes, Tomás —el enfermero que está junto a la máquina de café— conoce este hospital mejor que nadie.",
          efectos: ["bandera:intro"] }
      }
    },

    tomas: {
      nodos: {
        inicio: { habla: "tomas", texto: "¡Hola! Tú debes ser {{el observador nuevo|la observadora nueva|quien viene a observar}}. Tomás, enfermero de la UCI y del comité. ¿Un cafecito? Es malo, pero es gratis.", ir: "menu" },
        menu: { habla: "tomas", texto: "¿En qué te ayudo?",
          opciones: [
            { texto: "¿Qué hace un enfermero en un comité de ética?", ir: "enf" },
            { texto: "¿Me orientas en el archivo?", ir: "archivo", si: ["!grupo:linea"] },
            { texto: "Encontré una caja de un estudio hecho aquí en 1968.", ir: "caja", si: ["bandera:caja7", "!evidencia:ev_testimonio_tomas"] },
            { texto: "¿Me repites lo que contaba tu abuela?", ir: "caja_otra", si: ["evidencia:ev_testimonio_tomas"] },
            { texto: "Nada por ahora, gracias.", ir: "FIN" }
          ] },
        enf: { habla: "tomas", texto: "Los comités son interdisciplinarios a propósito: medicina, enfermería, derecho, trabajo social, alguien de la comunidad, alguien de ética. Yo paso doce horas al lado de los pacientes; a veces sé cosas que no aparecen en ninguna ficha. Como cuando alguien le dice que sí al médico, pero a mí me cuenta que no está tan seguro.", ir: "menu" },
        archivo: { habla: "tomas", texto: "El Dr. Bórquez guardaba todo en cajas rotuladas. Revisa los estantes, el escritorio, el lector de microfichas —sí, todavía existen— y el archivador que dice «Chile». Si algo no se ve, pulsa **H**: se resalta todo lo que se puede revisar.", ir: "menu" },
        caja: { habla: "tomas", texto: "¿La caja 7? Uf. Mi abuela trabajó de auxiliar aquí a fines de los sesenta. Contaba que a algunos pacientes les daban unas pastillas nuevas y les decían que eran «vitaminas». Nunca supe si era cierto o si era de esas historias que crecen con los años.",
          efectos: ["evidencia:ev_testimonio_tomas"], ir: "caja2" },
        caja2: { habla: "tomas", texto: "Anótalo, pero con cuidado: es lo que ella contaba, no un documento. Si el comité va a decir algo público sobre esa caja, hay que ser justos con todos: con los pacientes y también con quienes ya no están para dar su versión.", ir: "menu" },
        caja_otra: { habla: "tomas", texto: "Te repito lo importante: es un recuerdo de mi abuela, contado muchas veces en la once. Puede ser cierto, pero no es una prueba.", ir: "menu" }
      }
    },

    caja7: {
      nodos: {
        inicio: { habla: "narrador", texto: "La caja 7 es distinta a las demás: no tiene recortes ni documentos internacionales. La etiqueta, escrita a mano, dice: «Estudio H-68. Hospital de Río Arrayán. 1968–1969». Adentro hay fichas clínicas amarradas con un elástico, un sobre y un correo impreso.",
          efectos: ["bandera:caja7"], ir: "n2" },
        n2: { habla: "narrador", texto: "Revisas el contenido con cuidado.",
          efectos: ["evidencia:ev_fondo_local", "evidencia:ev_nota_borquez", "evidencia:ev_carta_nieta", "glosario:confidencialidad"], ir: "n3" },
        n3: { habla: "narrador", texto: "Esto ya no es historia lejana: pasó en este mismo hospital. Detrás de esas fichas hay personas concretas, y familias que todavía viven en la ciudad." }
      }
    },

    caja7_otra: {
      nodos: {
        inicio: { habla: "narrador", texto: "La caja 7 sigue en el suelo. ¿Qué quieres volver a leer?",
          opciones: [
            { texto: "Las fichas del estudio H-68", efectos: ["evidencia:ev_fondo_local"], ir: "inicio" },
            { texto: "La nota del Dr. Bórquez", efectos: ["evidencia:ev_nota_borquez"], ir: "inicio" },
            { texto: "El correo de la vecina", efectos: ["evidencia:ev_carta_nieta"], ir: "inicio" },
            { texto: "Dejar la caja", ir: "FIN" }
          ] }
      }
    },

    ines_linea: {
      alTerminar: ["minijuego:belmont"],
      nodos: {
        inicio: { habla: "narrador", texto: "Se escuchan pasos en la escalera. Inés entra con dos tazas de té y se queda mirando la pizarra.", ir: "n2" },
        n2: { habla: "ines", texto: "¡Quedó muy bien! Mírala con distancia. ¿Qué te llama la atención?",
          opciones: [
            { texto: "Que Tuskegee empezó antes de Núremberg… y siguió hasta 1972.", ir: "n3a" },
            { texto: "Que casi todo pasó en Estados Unidos y Europa.", ir: "n3b" },
            { texto: "Que las leyes chilenas llegaron mucho después.", ir: "n3c" }
          ] },
        n3a: { habla: "ines", texto: "Exacto. El Código de Núremberg es de 1947 y Tuskegee siguió **veinticinco años más**. Muchos pensaron que Núremberg era un problema «de los nazis», no de la medicina corriente. Un código escrito no basta si nadie lo aplica ni lo vigila.", ir: "n4" },
        n3b: { habla: "ines", texto: "Es cierto, y es una buena observación crítica: estos documentos influyeron en todo el mundo, incluido Chile, pero no son toda la historia. Fíjate además en esto: Tuskegee siguió veinticinco años después del Código de Núremberg. Un código escrito no basta si nadie lo aplica ni lo vigila.", ir: "n4" },
        n3c: { habla: "ines", texto: "Sí: en Chile, la investigación en personas tuvo una ley específica recién en 2006, y los derechos de los pacientes, en 2012. Y fíjate además en esto: Tuskegee siguió veinticinco años después del Código de Núremberg. Un código escrito no basta si nadie lo aplica ni lo vigila.", ir: "n4" },
        n4: { habla: "ines", texto: "Ahora algo más difícil. No basta con saber *qué* pasó: hay que poder decir *qué estuvo mal* y por qué. El Informe Belmont nos da tres palabras para eso. ¿Te animas?",
          opciones: [{ texto: "Vamos.", ir: "FIN" }] }
      }
    },

    ines_belmont: {
      alTerminar: ["minijuego:principios"],
      nodos: {
        inicio: { habla: "ines", texto: "Muy bien. Fíjate en que varios abusos violan más de un principio a la vez: el engaño en Tuskegee es una falta de respeto, pero además hizo posible el daño. Los principios no son cajones separados: son lentes para mirar.", ir: "n2" },
        n2: { habla: "ines", texto: "Último paso. En 1979, el mismo año de Belmont, Beauchamp y Childress propusieron **cuatro** principios en vez de tres, y los llevaron de la investigación a toda la atención clínica. Veamos cómo se corresponden.",
          opciones: [{ texto: "De acuerdo.", ir: "FIN" }] }
      }
    },

    ines_herramientas: {
      nodos: {
        inicio: { habla: "ines", texto: "Listo: ya tienes tu **caja de herramientas**. Estos cuatro principios te van a acompañar en todos los casos. Ojo: no son una calculadora. No dicen qué hacer; ayudan a ver qué está en juego.",
          opciones: [
            { texto: "Encontré la caja 7. Me dejó preocupación.", si: ["bandera:caja7"], ir: "n3a" },
            { texto: "¿Hay algo más que deba revisar?", si: ["!bandera:caja7"], ir: "n3b" }
          ] },
        n3a: { habla: "ines", texto: "A mí también. Por eso el comité quiere discutirla hoy mismo: qué hacemos con ese material en la muestra. Reúne lo que sepas y sube a la sala cuando tengas todo.", ir: "n4" },
        n3b: { habla: "ines", texto: "Sí. En el rincón hay una caja con un 7 grande. Es de este mismo hospital: un estudio hecho aquí en 1968. El comité quiere decidir hoy qué hacer con ella para la muestra. Revísala y sube a la sala cuando tengas todo.", ir: "n4" },
        n4: { habla: "ines", texto: "Una sugerencia: conversa también con quienes conocen la historia del hospital. A veces lo que no está en los papeles importa.",
          efectos: ["bandera:sesion_lista"] }
      }
    },

    ines_archivo: {
      nodos: {
        inicio: { habla: "ines", texto: "Aquí estoy. ¿Seguimos?",
          opciones: [
            { texto: "Hagamos la actividad de los principios de Belmont.", si: ["!minijuego:belmont"], efectos: ["minijuego:belmont"], ir: "FIN" },
            { texto: "Hagamos la actividad de los cuatro principios.", si: ["minijuego:belmont", "!minijuego:principios"], efectos: ["minijuego:principios"], ir: "FIN" },
            { texto: "Todavía no, quiero revisar el archivo.", ir: "FIN" }
          ] }
      }
    },

    pizarra_metodo: {
      nodos: {
        inicio: { habla: "narrador", texto: "En la pizarra alguien escribió, con letra ordenada, los cinco pasos que usa el comité para analizar casos. Al lado hay una nota pegada: «Primero los hechos. Luego los valores. Los extremos primero; los intermedios después».",
          efectos: ["concepto:metodo_deliberativo", "concepto:extremos_intermedios", "concepto:hechos_opiniones", "glosario:curso_intermedio"] }
      }
    },

    sesion: {
      nodos: {
        inicio: { habla: "ines", texto: "Buenas tardes. Hoy no hay un paciente en la UCI esperando: hay una caja. Pero la pregunta es igual de seria: **¿qué hacemos con el material de la caja 7 en la muestra «Por qué existimos»?**",
          opciones: [
            { texto: "¿La caja 7? Todavía no la reviso.", si: ["!bandera:caja7"], ir: "falta_caja" },
            { texto: "Antes de empezar: ¿alguien más sabe algo de esa caja?", si: ["bandera:caja7", "!evidencia:ev_testimonio_tomas"], ir: "falta_tomas" },
            { texto: "Tengo lo que necesito. Empecemos.", si: ["bandera:caja7"], ir: "metodo" }
          ] },
        falta_caja: { habla: "ines", texto: "Entonces te conviene bajar primero al archivo: está en el suelo, junto al archivador. Sin hechos no hay deliberación." },
        falta_tomas: { habla: "ines", texto: "Tomás mencionó que su familia tiene alguna historia con el hospital de esos años. Está en el pasillo, junto a la máquina de café. Puedes ir ahora o empezar igual; tú decides.",
          opciones: [
            { texto: "Voy a hablar con Tomás.", ir: "FIN" },
            { texto: "Empecemos igual.", ir: "metodo" }
          ] },
        metodo: { habla: "ines", texto: "Vamos a usar el método deliberativo: hechos, valores, cursos de acción, decisión y pruebas de consistencia. Cada integrante va a opinar desde su lugar, y te vamos a objetar. No evaluamos *qué* concluyes, sino *cómo* llegas a concluirlo.",
          efectos: ["concepto:metodo_deliberativo", "glosario:deliberacion", "glosario:anonimizacion", "bandera:en_sesion", "deliberacion"] }
      }
    },

    cierre_comite: {
      alTerminar: ["bandera:cierre_visto", "cierre"],
      nodos: {
        inicio: { habla: "narrador", texto: "Terminada la sesión, nadie se levanta todavía. Hernán se saca los lentes y los limpia con calma.", ir: "n2" },
        n2: { habla: "hernan", texto: "Quiero decir algo, y no es contra nadie. Llevamos toda la tarde hablando de autonomía, beneficencia, no maleficencia y justicia. Son palabras importantes. Pero ¿quién decidió que estas cuatro son las correctas? En mi comunidad hablamos de cuidado, de dignidad, del bien común.",
          efectos: ["concepto:criticas_principialismo"],
          opciones: [
            { texto: "Es una buena pregunta. ¿Inés?", ir: "n3" },
            { texto: "Creo que los principios ya incluyen esas ideas.", ir: "n3b" }
          ] },
        n3: { habla: "ines", texto: "Es una de las críticas más serias al principialismo, Hernán, y no tiene una respuesta cerrada. Hay quienes proponen razonar desde casos, desde el cuidado, desde las virtudes o desde la dignidad de la persona. Los principios son un lenguaje común útil en una sociedad plural, pero no son la única manera de pensar.", ir: "n4" },
        n3b: { habla: "ines", texto: "En parte sí: la dignidad está cerca del respeto por las personas, y el cuidado, de la beneficencia. Pero Hernán apunta a algo real: al traducirlo todo a cuatro palabras podemos perder matices. Los principios son un lenguaje común, no la única manera de pensar.", ir: "n4" },
        n4: { habla: "carmen", texto: "Yo tengo otra duda, más práctica. Cuando dos principios chocan, ¿cuál gana? En la UCI no tengo toda la tarde.", ir: "n5" },
        n5: { habla: "ines", texto: "Beauchamp y Childress dicen que ninguno gana de antemano: hay que ponderar en cada caso. Diego Gracia propuso dos niveles: **no maleficencia y justicia** serían una «ética de mínimos», exigible a todos; **autonomía y beneficencia**, una «ética de máximos», que depende del proyecto de vida de cada persona. En principio, el primer nivel pesa más… aunque el propio Gracia terminó insistiendo en la deliberación prudente sobre cada caso.",
          efectos: ["concepto:niveles_gracia"], ir: "n6" },
        n6: { habla: "paula", texto: "Y la ley, por su parte, fija pisos: cosas que nunca se pueden hacer, como exhibir una ficha clínica con nombre y apellido. Pero la ley no les va a decir cómo conversar con una familia.", ir: "n7" },
        n7: { habla: "ines", texto: "Por hoy, suficiente. Gracias, {nombre}. Antes de irte, te pido que dejes por escrito algunas reflexiones. Nos sirven más de lo que crees.",
          opciones: [{ texto: "Ir a las preguntas de cierre.", ir: "FIN" }] }
      }
    }
  },

  /* ---------------------------------------------------------------------
     MINIJUEGOS
     --------------------------------------------------------------------- */
  minijuegos: {
    linea: {
      tipo: "lineaTiempo",
      titulo: "Línea de tiempo: «Por qué existimos»",
      grupo: "linea",
      distractores: ["ev_casino", "ev_carta_opinion"],
      etiquetaDescarte: "No forma parte de esta historia",
      instrucciones: "Ordena los documentos del más antiguo al más reciente. **Selecciona una tarjeta** y luego **elige el casillero** donde va (funciona con mouse, pantalla táctil o teclado). Si un papel no forma parte de la historia de la ética de la investigación, déjalo en la bandeja de descarte.\n\nCuando dos documentos son del mismo año, el orden entre ellos da lo mismo.",
      pistas: [
        "Ordena según el año en que *comenzó* cada cosa. Puedes releer cualquier documento con el botón «Leer».",
        "El estudio de Tuskegee comenzó en 1932: es anterior a todo lo demás, aunque terminó mucho después.",
        "Orden: Tuskegee (1932) · Núremberg (1947) · Helsinki (1964) · Ley de EE.UU. (1974) · Belmont y Beauchamp-Childress (1979, en cualquier orden) · Ley 20.120 (2006) · Ley 20.584 (2012). La circular del casino y la carta anónima van al descarte."
      ],
      exito: "¡La línea de tiempo quedó completa!",
      alCompletar: ["bandera:linea_hecha", "glosario:codigo_nuremberg", "glosario:informe_belmont", "dialogo:ines_linea"]
    },

    belmont: {
      tipo: "relacionar",
      titulo: "¿Qué principio se vulneró?",
      instrucciones: "Para cada abuso, elige el principio del **Informe Belmont** que vulnera más directamente. Algunos pueden vulnerar más de uno: elige el más directo y lee la retroalimentación.",
      categorias: [
        { id: "respeto", nombre: "Respeto por las personas", descripcion: "Tratar a las personas como capaces de decidir (consentimiento informado) y proteger a quienes tienen autonomía disminuida." },
        { id: "beneficencia", nombre: "Beneficencia", descripcion: "No dañar y maximizar los beneficios posibles, reduciendo los riesgos." },
        { id: "justicia", nombre: "Justicia", descripcion: "Repartir con equidad las cargas y los beneficios; no elegir a los participantes por ser vulnerables o fáciles de reclutar." }
      ],
      items: [
        { id: "b1", texto: "A los hombres de Tuskegee no se les dijo que tenían sífilis: se les habló de «mala sangre».", fuente: "Tuskegee", correctas: ["respeto"],
          explicacion: "Sin información veraz no puede haber consentimiento: se trató a los participantes como medios y no como personas capaces de decidir.",
          pista: "Piensa en lo que necesita una persona para poder decidir si participa o no." },
        { id: "b2", texto: "Cuando la penicilina ya era el tratamiento habitual, no se les ofreció.", fuente: "Tuskegee", correctas: ["beneficencia"],
          explicacion: "Se les expuso a un daño grave y evitable. La beneficencia exige no dañar y buscar el mayor bien posible para quien participa.",
          pista: "¿Qué principio habla de no dañar y de reducir los riesgos?" },
        { id: "b3", texto: "Se eligió a hombres afroamericanos pobres de una zona rural, con poco acceso a la salud.", fuente: "Tuskegee", correctas: ["justicia"],
          explicacion: "La selección se basó en la vulnerabilidad y en la facilidad para reclutarlos, no en razones científicas: las cargas cayeron sobre un grupo ya desfavorecido.",
          pista: "La pregunta aquí es *a quién* se eligió y por qué." },
        { id: "b4", texto: "En los campos de concentración se experimentó con prisioneros que no podían negarse.", fuente: "Juicio de los médicos", correctas: ["respeto", "justicia"],
          explicacion: "No hubo consentimiento voluntario: la coerción anula la libertad de decidir (respeto por las personas). También es una grave injusticia, porque se eligió a personas sin ninguna protección.",
          pista: "¿Podían esas personas decir que no?" },
        { id: "b5", texto: "Los experimentos en los campos causaron sufrimiento extremo y muertes, sin ningún beneficio para quienes participaban.", fuente: "Juicio de los médicos", correctas: ["beneficencia"],
          explicacion: "Es la negación más completa de la beneficencia: se causó un daño enorme y deliberado.",
          pista: "¿Qué principio mira el balance entre daños y beneficios?" },
        { id: "b6", texto: "Se ofrecían comida caliente, traslados y un seguro funerario para que los hombres de Tuskegee siguieran participando.", fuente: "Tuskegee", correctas: ["respeto", "justicia"],
          explicacion: "Ofrecer beneficios a personas muy pobres puede volverse una presión indebida que compromete la voluntariedad (respeto por las personas). También aprovecha una situación de desventaja (justicia).",
          pista: "Un incentivo puede presionar a alguien que no tiene alternativas. ¿Qué queda afectado: su libertad de decidir o el balance de riesgos?" }
      ],
      pistas: [
        "Lee la descripción de cada principio arriba de la actividad.",
        "Pregúntate: ¿el problema es que no pudieron decidir, que se les dañó, o que se eligió injustamente a quiénes?",
        "Engaño e incentivos que presionan → respeto por las personas. Negar tratamiento y causar sufrimiento → beneficencia. Elegir a los más vulnerables → justicia."
      ],
      exito: "¡Muy bien! Ahora puedes decir no solo qué pasó, sino qué estuvo mal.",
      alCompletar: ["concepto:principios_belmont", "glosario:vulnerabilidad", "glosario:consentimiento_informado", "dialogo:ines_belmont"]
    },

    principios: {
      tipo: "relacionar",
      titulo: "De tres a cuatro principios",
      instrucciones: "Beauchamp y Childress propusieron cuatro principios. ¿De qué principio del **Informe Belmont** proviene cada uno?",
      categorias: [
        { id: "respeto", nombre: "Respeto por las personas", descripcion: "Belmont: autonomía y protección de quienes la tienen disminuida." },
        { id: "beneficencia", nombre: "Beneficencia", descripcion: "Belmont: no hacer daño y maximizar los beneficios." },
        { id: "justicia", nombre: "Justicia", descripcion: "Belmont: distribución equitativa de cargas y beneficios." }
      ],
      items: [
        { id: "p1", texto: "Autonomía: respetar las decisiones de personas capaces sobre su propia vida.", correctas: ["respeto"],
          explicacion: "La autonomía de Beauchamp y Childress recoge la primera cara del respeto por las personas: tratarlas como capaces de decidir." },
        { id: "p2", texto: "No maleficencia: no causar daño.", correctas: ["beneficencia"],
          explicacion: "Belmont incluía «no hacer daño» dentro de la beneficencia. Beauchamp y Childress lo separan porque la obligación de no dañar suele ser más estricta que la de hacer el bien.",
          pista: "Belmont no tenía un principio llamado «no hacer daño» por separado. ¿Dentro de cuál estaba?" },
        { id: "p3", texto: "Beneficencia: actuar en favor del bien de la persona.", correctas: ["beneficencia"],
          explicacion: "Se mantiene el nombre, pero ahora se distingue de la no maleficencia." },
        { id: "p4", texto: "Justicia: distribuir con equidad recursos, cargas y beneficios.", correctas: ["justicia"],
          explicacion: "Belmont pensaba sobre todo en la selección de participantes; en la clínica se amplía a cómo se reparten los recursos de salud." },
        { id: "p5", texto: "Proteger especialmente a una persona con demencia avanzada que participa en un estudio.", correctas: ["respeto", "beneficencia"],
          explicacion: "El respeto por las personas de Belmont tenía dos caras: respetar la autonomía y **proteger** a quienes la tienen disminuida. Beauchamp y Childress tratan esa protección dentro de la autonomía y de la beneficencia, por eso ambas respuestas son razonables.",
          pista: "Relee la descripción de «Respeto por las personas»: tiene dos partes." }
      ],
      pistas: [
        "Compara los nombres: dos de los cuatro principios se llaman igual que en Belmont.",
        "El único principio de Belmont que «se divide en dos» es la beneficencia.",
        "Autonomía → respeto por las personas. No maleficencia y beneficencia → beneficencia. Justicia → justicia. La protección de personas con autonomía disminuida era parte del respeto por las personas."
      ],
      exito: "Ya tienes tu caja de herramientas: **autonomía, no maleficencia, beneficencia y justicia**.",
      alCompletar: ["bandera:global.herramientas", "concepto:cuatro_principios", "concepto:prima_facie", "glosario:principialismo", "glosario:autonomia", "glosario:no_maleficencia", "glosario:beneficencia", "glosario:justicia", "dialogo:ines_herramientas"]
    }
  },

  /* ---------------------------------------------------------------------
     DELIBERACIÓN (método de Gracia)
     --------------------------------------------------------------------- */
  deliberacion: {
    pregunta: "¿Qué debe hacer el comité con el material de la caja 7 en la muestra «Por qué existimos»?",
    alTerminar: ["bandera:delib_hecha", "dialogo:cierre_comite"],

    guion: {
      hechos: { habla: "ines", texto: "Primera regla del comité: antes de opinar, saber. Clasifica lo que trajiste y dime qué nos falta averiguar." },
      valores: { habla: "marisol", texto: "Ahora, ¿qué está en juego y para quién? No te quedes solo con lo que a ti te parece importante: piensa en las familias, en la comunidad y en el hospital." },
      cursos: { habla: "ines", texto: "Busquemos primero los extremos: suelen ser lo primero que a uno se le ocurre. Después, lo que hay entre ellos." },
      decision: { habla: "carmen", texto: "Elige lo que recomendarías y dinos por qué. Te vamos a objetar: no es personal, es el método." },
      consistencia: { habla: "ines", texto: "Tres preguntas finales, de esas que conviene hacerse siempre antes de cerrar una decisión." }
    },

    pistas: {
      hechos: [
        "Un **hecho** se puede comprobar con un documento. Una **opinión** es el juicio de alguien. Un **testimonio** cuenta algo que alguien dice haber vivido o escuchado.",
        "La nota del Dr. Bórquez y el recuerdo de la abuela de Tomás no prueban lo ocurrido. La circular del casino no tiene nada que ver con el caso.",
        "Para la información faltante, pregúntate: ¿qué dato cambiaría lo que el comité debería hacer? El carácter del Dr. Bórquez o el número de visitas de la muestra no lo cambian."
      ],
      valores: [
        "Piensa en cada parte: los pacientes del estudio y sus familias, la comunidad que verá la muestra y el hospital.",
        "La privacidad protege a las personas (autonomía y no maleficencia). Recordar los abusos para que no se repitan beneficia a la comunidad y es una forma de justicia.",
        "La buena imagen del hospital es un interés, no un valor ético del mismo rango. No la confundas con la transparencia."
      ],
      cursos: [
        "Los extremos son las dos respuestas más «fáciles»: mostrarlo todo o no mostrar nada.",
        "Un falso intermedio parece un punto medio, pero sacrifica igual uno de los valores. ¿Las iniciales y el sector protegen de verdad la identidad en una ciudad chica?",
        "Los extremos son: exhibir las fichas completas con nombres, y volver a guardar la caja sin decir nada."
      ],
      decision: [
        "Elige lo que de verdad recomendarías, no lo que crees que el juego «quiere». No hay una única respuesta correcta.",
        "Revisa que tus razones apoyen lo que propones: una razón a favor de la privacidad no sirve para defender que se exhiban nombres.",
        "Ante una objeción, la mejor respuesta reconoce lo que tiene de razonable y propone cómo hacerse cargo."
      ],
      consistencia: [
        "Aquí no hay respuestas correctas: son preguntas para revisar tu propia decisión.",
        "Si te cuesta imaginar que la explicas en público, quizás hay algo que ajustar.",
        "Si algo te hace cambiar de opinión, puedes volver a la fase de decisión."
      ]
    },

    /* Fase 1: tipo = "hecho" | "opinion" | "irrelevante" (puede ser una lista si
       hay más de una clasificación razonable). relevancia "decisiva" cuenta
       para la rúbrica (¿encontró lo importante?). */
    hechos: {
      items: [
        { ev: "ev_fondo_local", tipo: "hecho", relevancia: "decisiva",
          explicacion: "Es un hecho documentado: las fichas existen y se puede comprobar lo que contienen (y lo que no contienen)." },
        { ev: "ev_carta_nieta", tipo: ["hecho", "opinion"], relevancia: "decisiva",
          explicacion: "Que el correo existe y pide información es un **hecho**. Lo que dice sobre el abuelo es un **testimonio** que habría que verificar. Ambas clasificaciones son razonables si sabes distinguir las dos capas." },
        { ev: "ev_testimonio_tomas", tipo: "opinion", relevancia: "decisiva",
          explicacion: "Es un testimonio indirecto (lo que contaba su abuela), valioso como pista, pero no verificado." },
        { ev: "ev_nota_borquez", tipo: "opinion", relevancia: "contexto",
          explicacion: "Es la interpretación de quien dirigió el estudio: que «todos aceptaron con gusto» es su juicio, no un dato comprobado. Además, tiene interés en justificar lo que hizo." },
        { ev: "ev_carta_opinion", tipo: "opinion", relevancia: "irrelevante",
          explicacion: "Es una opinión sin firma sobre la ciencia en general. No informa nada sobre el estudio H-68." },
        { ev: "ev_casino", tipo: "irrelevante", relevancia: "irrelevante",
          explicacion: "El horario del casino no tiene nada que ver con el caso." }
      ],
      introFaltantes: "Marca las preguntas que el comité debería intentar responder antes de decidir. No todas son importantes.",
      faltantes: [
        { id: "f1", texto: "¿Qué significaba en la práctica «informado verbalmente»? ¿Hubo algún consentimiento que no quedó por escrito?", necesaria: true,
          explicacion: "Clave: la ausencia de un formulario no prueba por sí sola que no hubo consentimiento, y la anotación no prueba que lo hubo." },
        { id: "f2", texto: "¿Qué normas éticas y profesionales regían en 1968 para este tipo de estudio?", necesaria: true,
          explicacion: "Importante para juzgar con justicia: permite distinguir entre lo que ya era exigible entonces y lo que exigimos hoy (aunque Núremberg y Helsinki ya existían)." },
        { id: "f3", texto: "¿Hay participantes vivos o familias identificables que podrían verse afectadas?", necesaria: true,
          explicacion: "Decisivo: cambia qué riesgos tiene exhibir el material y a quién habría que consultar." },
        { id: "f4", texto: "¿Qué pasó con los pacientes que tuvieron efectos adversos?", necesaria: true,
          explicacion: "Relevante: permite saber si hubo daños y si fueron atendidos." },
        { id: "f5", texto: "¿El Dr. Bórquez era, en general, una buena persona?", necesaria: false,
          explicacion: "El carácter de una persona no responde qué se hizo ni qué debemos hacer ahora. El comité juzga actos y decisiones, no almas." },
        { id: "f6", texto: "¿Cuántas personas visitarán la muestra?", necesaria: false,
          explicacion: "Es un dato práctico, pero no cambia qué es correcto hacer con información confidencial." }
      ]
    },

    /* Fase 2 */
    valores: {
      partes: [
        { id: "familias", nombre: "Pacientes del estudio y sus familias" },
        { id: "comunidad", nombre: "Comunidad que verá la muestra" },
        { id: "hospital", nombre: "Hospital y su equipo" }
      ],
      lista: [
        { id: "privacidad", nombre: "Privacidad y confidencialidad", descripcion: "que la información de salud de cada paciente no se exponga", partes: ["familias"], principios: ["autonomia", "no_maleficencia"],
          explicacion: "La confidencialidad protege el control de cada persona sobre su información (**autonomía**) y evita daños como el estigma (**no maleficencia**)." },
        { id: "saber", nombre: "Derecho a saber la verdad", descripcion: "que las familias puedan conocer lo que pasó", partes: ["familias"], principios: ["autonomia", "justicia"],
          explicacion: "Saber lo que le ocurrió a un familiar permite decidir con información (**autonomía**) y puede ser una forma de reparación (**justicia**)." },
        { id: "dolor", nombre: "Evitar nuevo dolor o estigma", descripcion: "no reabrir heridas en familias que no lo han pedido", partes: ["familias"], principios: ["no_maleficencia"],
          explicacion: "Remover el pasado puede causar sufrimiento a familias que no lo pidieron: es un daño que hay que evitar o reducir (**no maleficencia**)." },
        { id: "memoria", nombre: "Memoria y reparación", descripcion: "reconocer los abusos del propio hospital", partes: ["familias", "comunidad"], principios: ["justicia", "beneficencia"],
          explicacion: "Reconocer los abusos es una forma de hacer **justicia** a quienes los sufrieron y puede reparar la confianza (**beneficencia**)." },
        { id: "prevencion", nombre: "Educación y prevención", descripcion: "que la comunidad aprenda para que no se repita", partes: ["comunidad"], principios: ["beneficencia"],
          explicacion: "Educar a la comunidad para evitar abusos futuros busca el bien de muchas personas: es **beneficencia** en sentido social." },
        { id: "transparencia", nombre: "Transparencia y rendición de cuentas", descripcion: "que un hospital público responda por su historia", partes: ["hospital", "comunidad"], principios: ["justicia", "beneficencia"],
          explicacion: "Una institución pública que rinde cuentas trata con equidad a la comunidad a la que sirve (**justicia**) y fortalece la confianza (**beneficencia**)." },
        { id: "juicio_justo", nombre: "Justicia con quienes ya no pueden defenderse", descripcion: "no condenar sin pruebas a quienes trabajaban entonces", partes: ["hospital"], principios: ["justicia"],
          explicacion: "Juzgar con hechos incompletos puede ser injusto con personas que no pueden dar su versión (**justicia**)." },
        { id: "imagen", nombre: "Buena imagen del hospital", descripcion: "que la muestra no deje mal a la institución", partes: ["hospital"], trampa: true,
          explicacion: "Cuidar la imagen es un **interés** legítimo, pero no es un valor ético del mismo rango que la privacidad o la verdad. Si pesa más que ellos, se vuelve un problema: ¿qué harías si lo correcto dejara mal al hospital?" }
      ]
    },

    /* Fase 3. tipo: "extremo" | "intermedio". falsoIntermedio: parece
       intermedio pero no lo es. marca: "ilegal" | "contra_consenso" bloquea
       la decisión (única «respuesta incorrecta» permitida). */
    cursos: {
      lista: [
        { id: "A", tipo: "extremo", corto: "Exhibir todo, con nombres",
          texto: "Exhibir las fichas completas, con nombres, para que la verdad se vea tal cual.",
          lesiona: "la privacidad y la confidencialidad de los pacientes y sus familias.",
          marca: "ilegal", quienBloquea: "paula",
          explicacionMarca: "Esto no se puede hacer. La información de la ficha clínica es confidencial y los datos de salud son datos sensibles: exhibirla con nombres vulnera la ley, aunque la intención sea buena. Busquemos otra forma de mostrar la verdad.",
          legal: "Contrario a la ley: la ficha clínica es confidencial y los datos de salud son sensibles (Ley 20.584 y normas de protección de datos)." },
        { id: "B", tipo: "extremo", corto: "Guardar y callar",
          texto: "Sacar la caja 7 de la muestra y volver a guardarla sin decir nada.",
          lesiona: "la verdad, la memoria y el derecho de las familias a saber.",
          legal: "No es ilegal guardar el material. Pero si una heredera pide acceso a la ficha de su familiar, el hospital debe responder según la ley." },
        { id: "I1", tipo: "intermedio", corto: "Anonimizar y contextualizar",
          texto: "Exhibir el caso sin datos que permitan identificar a nadie, con contexto histórico y explicando lo que todavía no se sabe.",
          legal: "Compatible con la ley si la anonimización es real: sin datos que permitan reconocer a alguien, lo que exige cuidado en una ciudad pequeña." },
        { id: "I2", tipo: "intermedio", corto: "Consultar a las familias",
          texto: "Antes de exhibir, contactar a las familias identificables, con apoyo de trabajo social y asesoría jurídica, para informarles y preguntarles su opinión.",
          legal: "Requiere cuidado: el solo contacto revela información de la ficha. Conviene hacerlo por canales formales y con asesoría jurídica." },
        { id: "I3", tipo: "intermedio", corto: "Responder a la vecina",
          texto: "Responder a la vecina que escribió por los canales formales de acceso a la ficha clínica, independientemente de lo que se decida sobre la muestra.",
          legal: "La ley permite el acceso de los herederos a la ficha de una persona fallecida; habría que verificar que la solicitante tiene esa calidad." },
        { id: "I4", tipo: "intermedio", corto: "Investigar antes de juzgar",
          texto: "Pedir una investigación histórica formal sobre el estudio H-68 antes de hacer un juicio público.",
          legal: "Un estudio histórico que use fichas clínicas es, a su vez, una investigación: debería revisarlo un comité ético científico, no el comité asistencial." },
        { id: "F", tipo: "intermedio", falsoIntermedio: true, corto: "Solo iniciales y sector",
          texto: "Exhibir las fichas mostrando solo las iniciales, la fecha de nacimiento y el sector de la comuna de cada paciente.",
          porQueNoExtremo: "no es uno de los dos polos: se presenta como algo moderado. (En el paso siguiente verás si es realmente intermedio.)",
          explicacionFalso: "Parece un punto medio, pero en una ciudad pequeña las iniciales, la fecha de nacimiento y el sector bastan para reconocer a una persona. En la práctica sacrifica la privacidad casi igual que el extremo.",
          marca: "ilegal", quienBloquea: "paula",
          explicacionMarca: "Iniciales, fecha de nacimiento y sector permiten reidentificar a las personas en una comunidad pequeña. En la práctica equivale a publicar datos sensibles de salud, y eso la ley no lo permite.",
          legal: "Equivale a publicar datos de salud reidentificables: contrario a la ley." }
      ]
    },

    /* Fase 4 */
    decision: {
      razones: [
        { id: "r1", texto: "Las personas tienen derecho a que su información de salud no se exponga sin su consentimiento, incluso después de morir.", apoya: ["I1", "I2", "I3", "B"] },
        { id: "r2", texto: "Las familias tienen derecho a saber lo que les pasó a los suyos.", apoya: ["I2", "I3", "I4", "I1"] },
        { id: "r3", texto: "Recordar los abusos del propio hospital es parte de reparar y de evitar que se repitan.", apoya: ["I1", "I4", "I2"] },
        { id: "r4", texto: "Todavía no sabemos si hubo abuso: antes de juzgar públicamente hay que completar los hechos.", apoya: ["I4", "I1"] },
        { id: "r5", texto: "Exponer este caso podría causar dolor a familias que no lo pidieron y que quizás prefieren no saber.", apoya: ["B", "I2"] },
        { id: "r6", texto: "Una institución pública debe rendir cuentas de lo que hizo, aunque sea incómodo.", apoya: ["I1", "I4", "I3"] },
        { id: "r7", texto: "Quien tiene derecho a acceder a la ficha de un familiar fallecido debe recibir una respuesta.", apoya: ["I3"] },
        { id: "r8", texto: "La verdad completa, sin filtros, es lo único que honra a las víctimas.", apoya: ["A"] },
        { id: "r9", texto: "Así el hospital queda bien ante la comunidad.", apoya: [], debil: true,
          explicacion: "cuidar la reputación es un interés legítimo, pero no justifica éticamente una decisión. Si fuera la razón principal, ¿qué harías si lo correcto dejara mal al hospital?" }
      ],
      incompatibles: [
        ["B", "I1", "Guardar la caja sin decir nada es incompatible con exhibir el caso."],
        ["B", "I2", "Guardar la caja sin decir nada es incompatible con contactar a las familias para informarles."]
      ],
      /* Objeciones por curso elegido (máximo 2 por presentación).
         tipo de respuesta: "buena" (se hace cargo) | "debil" (la esquiva).
         Siempre se agrega la opción de revisar la propuesta. */
      objeciones: {
        I1: [{ id: "o_I1", quien: "hernan", texto: "Anonimizar suena bien, pero en Río Arrayán todos nos conocemos. Si la muestra dice «un campesino de 60 años del sector alto», ¿no estás exponiendo igual a una familia?",
          respuestas: [
            { tipo: "buena", texto: "Tiene razón. Habría que revisar cada dato con alguien que conozca la comuna y quitar todo lo que permita reconocer a alguien, aunque la muestra quede menos detallada.", comentario: "Eso me deja más tranquilo. Mejor una muestra menos vistosa que una familia expuesta." },
            { tipo: "debil", texto: "Si la ley permite datos anonimizados, no es nuestro problema.", quienComenta: "paula", comentario: "La ley es un piso, no un techo. Y si alguien es reconocible, el dato no está realmente anonimizado." }
          ] }],
        I2: [{ id: "o_I2", quien: "paula", texto: "Contactar a las familias no es neutro: al llamarlas ya les estás revelando que su pariente aparece en una ficha de un estudio. ¿Con qué derecho?",
          respuestas: [
            { tipo: "buena", texto: "Por eso el contacto debería hacerse por canales formales y con asesoría jurídica, empezando por quien ya pidió información, como la vecina que escribió.", comentario: "Eso es más prudente: responder a quien pregunta es distinto de salir a buscar a todos." },
            { tipo: "debil", texto: "Es por su bien; seguro quieren saber.", quienComenta: "ines", comentario: "Suponer lo que el otro quiere, sin preguntarle, es justamente paternalismo. Algunas familias pueden preferir no saber." }
          ] }],
        B: [{ id: "o_B", quien: "marisol", texto: "Si guardamos la caja y no decimos nada, ¿qué le respondemos a la vecina que escribió? El silencio también es una decisión.",
          respuestas: [
            { tipo: "buena", texto: "Aunque no se exhiba nada, su solicitud debe responderse por los canales formales. Guardar la caja no puede significar ignorarla.", comentario: "Bien. Entonces tu propuesta no es solo «guardar»: incluye responder. Quizás conviene decirlo explícitamente." },
            { tipo: "debil", texto: "No estamos obligados a responder correos.", quienComenta: "paula", comentario: "Ojo: si es heredera de un paciente fallecido, la ley le da derecho a pedir acceso a la ficha." }
          ] }],
        I3: [{ id: "o_I3", quien: "carmen", texto: "Responder a una sola familia está bien, ¿pero y las otras 39? ¿Solo tienen derechos quienes reclaman?",
          respuestas: [
            { tipo: "buena", texto: "Es un buen punto: el comité debería recomendar una política para todos los casos, no solo para quien escribe.", comentario: "Eso. Si no, terminamos atendiendo solo a quien sabe cómo pedir." },
            { tipo: "debil", texto: "Si no preguntan, es porque no les interesa.", quienComenta: "marisol", comentario: "Muchas familias no escriben porque no saben que pueden hacerlo. El acceso a los derechos también es un tema de justicia." }
          ] }],
        I4: [{ id: "o_I4", quien: "tomas", texto: "Una investigación histórica puede tardar años. Mientras tanto, la vecina sigue esperando y la muestra se inaugura en un mes.",
          respuestas: [
            { tipo: "buena", texto: "La investigación no debe impedir responder ahora a la vecina ni exhibir algo prudente mientras tanto. Se pueden hacer ambas cosas.", comentario: "De acuerdo. Hacerlo bien incluye no hacer esperar indefinidamente a las personas." },
            { tipo: "debil", texto: "Lo importante es hacerlo bien, aunque tarde.", comentario: "Hacerlo bien también incluye no dejar a las personas esperando sin respuesta." }
          ] }],
        "*": [{ id: "o_gen", quien: "carmen", texto: "¿Y si mañana aparece un documento que prueba que todos dieron un consentimiento verbal plenamente informado? ¿Tu decisión se sostiene?",
          respuestas: [
            { tipo: "buena", texto: "Mi propuesta no condena a nadie de antemano: deja espacio para lo que falta saber y se puede corregir si aparecen nuevos hechos.", comentario: "Bien. Una buena decisión puede revisarse cuando cambian los hechos." },
            { tipo: "debil", texto: "No creo que aparezca nada.", comentario: "Puede ser, pero el método exige estar abiertos a hechos nuevos. Si no, estamos juzgando antes de saber." }
          ] }]
      }
    },

    /* Fase 5: pruebas de consistencia. No hay respuestas correctas.
       "revisar: true" devuelve al estudiante a la fase de decisión. */
    consistencia: [
      { id: "publicidad", titulo: "Prueba de publicidad", quien: "hernan",
        texto: "Imagina que la radio local entrevista al comité sobre esta decisión. ¿Podrías explicarla en voz alta, frente a las familias?",
        opciones: [
          { texto: "Sí, y creo que la entenderían aunque no todos estén de acuerdo.", comentario: "Esa es la prueba: no que todos aprueben, sino que puedas dar razones públicas." },
          { texto: "Me costaría: hay partes que preferiría no explicar.", comentario: "Es una señal para revisar esas partes. Una buena decisión ética no necesita esconderse." },
          { texto: "Quiero revisar mi decisión antes de responder.", revisar: true }
        ] },
      { id: "legalidad", titulo: "Prueba de legalidad", quien: "paula",
        texto: "Revisemos si tu propuesta está dentro del marco legal. Esto es lo que observo:",
        opciones: [
          { texto: "Entiendo. Mi propuesta respeta el marco legal y tendré en cuenta estas precauciones.", comentario: "Bien. Recuerda que lo legal es el piso: además hay que hacerlo con cuidado." },
          { texto: "Quiero ajustar algo a la luz de esto.", revisar: true }
        ] },
      { id: "temporalidad", titulo: "Prueba de temporalidad", quien: "carmen",
        texto: "Si tuvieras que decidir mañana, con calma y después de dormir bien, ¿decidirías lo mismo?",
        opciones: [
          { texto: "Sí: mis razones no dependen de cómo me sentía hoy.", comentario: "Buena señal. Las decisiones sólidas resisten el paso de las horas." },
          { texto: "No lo sé: el correo de la vecina me impactó mucho.", comentario: "Las emociones son información valiosa (nos muestran lo que importa), pero conviene revisar si nos hacen perder de vista a otras partes." },
          { texto: "Probablemente cambiaría algo.", comentario: "Si es así, ¿qué cambiarías? Escríbelo en tu reflexión final." }
        ] }
    ]
  },

  /* ---------------------------------------------------------------------
     CIERRE
     --------------------------------------------------------------------- */
  cierre: {
    reflexiones: [
      { id: "c1", pregunta: "El estudio de Tuskegee continuó veinticinco años después del Código de Núremberg. ¿Por qué crees que un código escrito no bastó para detenerlo?" },
      { id: "c2", pregunta: "¿Qué propusiste sobre la caja 7? ¿Qué objeción del comité te costó más responder y por qué?" },
      { id: "c3", pregunta: "Hernán preguntó por qué usar estos cuatro principios y no otras palabras, como «cuidado» o «dignidad». ¿Qué le responderías?" }
    ],
    quiz: [
      { id: "q1", pregunta: "En Tuskegee no se les dijo a los participantes que tenían sífilis. ¿Qué principio del Informe Belmont vulnera más directamente ese engaño?",
        opciones: [
          { texto: "Respeto por las personas", correcta: true, explicacion: "Sin información veraz no puede haber consentimiento informado, que es la aplicación central del respeto por las personas." },
          { texto: "Justicia", explicacion: "La justicia se vulneró en la selección de los participantes, pero el engaño afecta sobre todo la posibilidad de decidir: el respeto por las personas." },
          { texto: "Beneficencia", explicacion: "Negar la penicilina afecta la beneficencia; el engaño, en cambio, apunta más directamente al respeto por las personas." }
        ] },
      { id: "q2", pregunta: "¿Cuál es la diferencia principal entre los principios del Informe Belmont y los de Beauchamp y Childress?",
        opciones: [
          { texto: "Beauchamp y Childress eliminaron el principio de justicia.", explicacion: "La justicia está en ambos." },
          { texto: "Beauchamp y Childress separan la no maleficencia de la beneficencia y aplican los principios a toda la atención clínica, no solo a la investigación.", correcta: true, explicacion: "Exacto: pasan de tres a cuatro principios y amplían su campo de la investigación a la clínica." },
          { texto: "Belmont ordena los principios por importancia y Beauchamp y Childress no.", explicacion: "Ninguno de los dos establece una jerarquía fija entre los principios. (Una propuesta de niveles es la de Diego Gracia.)" },
          { texto: "Son idénticos: solo cambian los nombres.", explicacion: "No: hay un principio más y un campo de aplicación más amplio." }
        ] },
      { id: "q3", pregunta: "En el método deliberativo, ¿por qué se buscan cursos de acción intermedios?",
        opciones: [
          { texto: "Porque la respuesta correcta siempre está exactamente al medio.", explicacion: "No necesariamente. El curso óptimo suele estar entre los intermedios, pero no se calcula como un promedio: hay que deliberar." },
          { texto: "Para evitar tomar una decisión.", explicacion: "Al contrario: el método termina en una decisión justificada y sometida a pruebas." },
          { texto: "Porque los extremos suelen sacrificar por completo uno de los valores en juego, y los intermedios intentan respetar lo más posible todos.", correcta: true, explicacion: "Esa es la idea central de Gracia: buscar el curso que lesione lo menos posible los valores en conflicto." },
          { texto: "Porque la ley lo exige.", explicacion: "El método es una herramienta ética de análisis, no una exigencia legal." }
        ] }
    ],
    alTerminar: ["bandera:cierre_hecho", "completar"]
  }
};
