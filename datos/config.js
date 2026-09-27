/* =========================================================================
   CONFIGURACIÓN GENERAL DEL JUEGO  —  ARCHIVO EDITABLE
   -------------------------------------------------------------------------
   Reglas para editar sin romper nada:
   - Cambia solo el texto que está ENTRE COMILLAS "así".
   - No borres las comas al final de cada línea ni las llaves { } o [ ].
   - Si necesitas comillas dentro de un texto, usa «comillas angulares».
   - En los textos puedes usar **negrita**, *cursiva*, una línea en blanco
     para separar párrafos y líneas que empiezan con "- " para listas.
   - {{forma masculina|forma femenina|forma neutra}} se ajusta a la forma de
     trato que eligió el estudiante. {nombre} pone su nombre.
   Después de editar, abre herramientas/validar-datos.html para revisar.
   ========================================================================= */
BIO.datos.config = {
  tituloJuego: "Comité",
  subtituloJuego: "Una aventura de bioética",
  hospital: "Hospital Regional de Río Arrayán",
  ciudad: "Río Arrayán, sur de Chile (ciudad ficticia)",

  /* Nombre con que se guarda el progreso en el navegador.
     Cambiarlo equivale a empezar de cero en todos los computadores. */
  claveGuardado: "bioetica-comite-v1",

  /* Modo docente: clave simple. NO es seguridad real. */
  docente: {
    clave: "profe2026"
  },

  /* Formas de trato que el estudiante puede elegir al inicio */
  tratos: [
    { etiqueta: "Observador", ejemplo: "«Bienvenido, eres el nuevo observador»" },
    { etiqueta: "Observadora", ejemplo: "«Bienvenida, eres la nueva observadora»" },
    { etiqueta: "Forma neutra", ejemplo: "«Te damos la bienvenida como persona observadora»" }
  ],

  /* Capítulos. "activo" es el valor por defecto (el docente puede cambiarlo
     desde el modo docente). Los capítulos sin archivo de datos aparecen
     como «En preparación». */
  capitulos: [
    { id: "cap1", numero: 1, titulo: "El archivo", subtitulo: "¿Por qué existe la bioética?", duracion: "12–15 min", activo: true,
      conceptos: ["Código de Núremberg", "Tuskegee", "Informe Belmont", "Cuatro principios", "Método deliberativo"] },
    { id: "cap2", numero: 2, titulo: "La firma", subtitulo: "Consentimiento informado y autonomía", duracion: "12–15 min", activo: true,
      conceptos: ["Consentimiento informado", "Capacidad", "Paternalismo", "Rechazo de tratamiento", "Ley 20.584"] },
    { id: "cap3", numero: 3, titulo: "Una cama", subtitulo: "Justicia distributiva y triaje", duracion: "12–15 min", activo: true,
      conceptos: ["Justicia distributiva", "Criterios de asignación", "Triaje", "Velo de ignorancia"] },
    { id: "cap4", numero: 4, titulo: "El final", subtitulo: "Decisiones al final de la vida", duracion: "12–15 min", activo: true,
      conceptos: ["Limitación del esfuerzo terapéutico", "Cuidados paliativos", "Doble efecto", "Eutanasia"] },
    { id: "cap5", numero: 5, titulo: "Más allá del paciente", subtitulo: "Una sola salud (One Health)", duracion: "12–15 min", activo: true, opcional: true,
      conceptos: ["One Health", "Las 3R", "Resistencia antimicrobiana", "Bien común y libertades"] }
  ],

  /* Los cuatro principios de Beauchamp y Childress (se usan en la deliberación) */
  principios: [
    { id: "autonomia", nombre: "Autonomía" },
    { id: "no_maleficencia", nombre: "No maleficencia" },
    { id: "beneficencia", nombre: "Beneficencia" },
    { id: "justicia", nombre: "Justicia" }
  ],

  /* Textos generales */
  textos: {
    creditos: "Juego educativo con personajes, lugares y casos ficticios. Arte original.",
    bienvenidaRegistro: "Tu nombre y curso aparecerán en el resumen que entregarás al final. Se guardan solo en este navegador.",
    privacidad: "Este juego **nunca** te pedirá información sobre tu salud ni sobre la de tu familia. Tus respuestas se guardan solo en este navegador.",
    notaRubrica: "El comité **no evalúa qué conclusión elegiste**: en los casos controvertidos, personas razonables llegan a conclusiones distintas. Lo que se evalúa es la **calidad de tu deliberación**: si reuniste los hechos, consideraste los valores de todas las partes, buscaste cursos intermedios, justificaste con coherencia y te hiciste cargo de las objeciones.",
    eligioExtremo: "Tu propuesta incluye un curso extremo. No está prohibido, pero el método pide justificar con especial cuidado por qué sería aceptable sacrificar por completo uno de los valores en juego."
  },

  /* Rúbrica de la deliberación (textos editables) */
  rubrica: {
    niveles: { solido: "Sólido", desarrollo: "En desarrollo", inicial: "Inicial" },
    criterios: {
      hechos: {
        nombre: "Hechos",
        solido: "Reuniste lo decisivo, distinguiste bien hechos de opiniones y detectaste la información que falta.",
        desarrollo: "Reuniste buena parte de lo necesario, pero hubo confusiones entre hechos y opiniones o no viste algún vacío de información.",
        inicial: "Faltaron piezas importantes o confundiste con frecuencia hechos, opiniones y datos irrelevantes. Antes de opinar, hay que saber."
      },
      valores: {
        nombre: "Valores y principios",
        solido: "Identificaste los valores de todas las partes y los conectaste con los principios de forma adecuada.",
        desarrollo: "Identificaste valores importantes, pero quedó alguna parte sin considerar o alguna conexión con los principios fue discutible.",
        inicial: "Consideraste pocas perspectivas. Pregúntate siempre: ¿qué le importa a cada persona afectada?"
      },
      cursos: {
        nombre: "Cursos de acción",
        solido: "Distinguiste los extremos y propusiste cursos intermedios genuinos.",
        desarrollo: "Llegaste a los extremos y a algún intermedio, pero te costó distinguirlos o elegiste un falso intermedio.",
        inicial: "No lograste separar los extremos de los intermedios. Recuerda: los extremos sacrifican por completo un valor."
      },
      justificacion: {
        nombre: "Justificación",
        solido: "Tus razones apoyan de verdad lo que propones.",
        desarrollo: "Algunas de tus razones no apoyan lo que propones o son más prudenciales que éticas.",
        inicial: "Tus razones y tu propuesta no calzan entre sí. Revisa si lo que argumentas lleva a lo que decides."
      },
      objeciones: {
        nombre: "Respuesta a objeciones",
        solido: "Te hiciste cargo de las objeciones: las respondiste con argumentos o revisaste tu propuesta.",
        desarrollo: "Respondiste algunas objeciones con argumentos, pero otras las esquivaste.",
        inicial: "Tendiste a descartar las objeciones sin responderlas. Una buena decisión resiste la crítica o se corrige con ella."
      }
    }
  },

  /* Nota de ayuda (se muestra al final de capítulos sensibles, como el 4).
     VERIFICAR los números antes de usar en clase. */
  ayuda: {
    vigente_a_la_fecha: "septiembre de 2026 (verificar)",
    titulo: "Si necesitas hablar con alguien",
    texto: "Algunos temas de este juego pueden remover experiencias personales. Si algo te afectó, conversa con una persona adulta de confianza, con el equipo de orientación o convivencia de tu colegio, o con tu profesor o profesora. Pedir ayuda es una buena decisión.",
    contactos: [
      { nombre: "Salud Responde (Ministerio de Salud)", contacto: "600 360 7777", detalle: "orientación en salud, todos los días" },
      { nombre: "Línea de prevención del suicidio", contacto: "*4141", detalle: "gratuita desde celulares, atención 24 horas" },
      { nombre: "Emergencias (SAMU)", contacto: "131", detalle: "si hay riesgo inmediato" }
    ]
  }
};
