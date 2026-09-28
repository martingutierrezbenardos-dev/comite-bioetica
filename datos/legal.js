/* =========================================================================
   DATOS LEGALES Y EMPÍRICOS  —  ARCHIVO EDITABLE
   -------------------------------------------------------------------------
   Todos los resúmenes están redactados para el juego con palabras propias y
   NO reemplazan el texto oficial. Cada entrada tiene:
     resumen            → lo que ve el estudiante
     fuente             → dónde verificarlo
     vigente_a_la_fecha → fecha de la última verificación
     verificar          → true mientras el docente no lo haya revisado
   El texto oficial de las leyes chilenas está en www.bcn.cl/leychile
   Los textos del juego se refieren a estas entradas con {legal:id}.
   ========================================================================= */
BIO.datos.legal = {

  /* ---------- Chile ---------- */
  ley_20120: {
    titulo: "Ley 20.120 (2006)",
    resumen: "En 2006, Chile promulgó la **Ley 20.120**, sobre la investigación científica en el ser humano, su genoma, y que prohíbe la clonación humana. Entre otras cosas, exige que toda investigación científica en personas cuente con su **consentimiento previo, expreso, libre e informado**, y que los proyectos sean revisados y aprobados por un **comité ético científico** antes de comenzar.",
    fuente: "Ley 20.120, arts. 10 y 11. www.bcn.cl/leychile",
    vigente_a_la_fecha: "septiembre de 2026",
    verificar: true
  },

  ley_20584: {
    titulo: "Ley 20.584 (2012)",
    resumen: "En 2012, la **Ley 20.584** estableció los derechos y deberes de las personas en relación con su atención de salud. Reconoce, entre otros, el derecho a recibir información comprensible, a otorgar o denegar el consentimiento a tratamientos, a la confidencialidad de la información de la ficha clínica, y regula el papel de los comités de ética. Será una herramienta clave en los próximos casos.",
    fuente: "Ley 20.584 (publicada en abril de 2012). www.bcn.cl/leychile",
    vigente_a_la_fecha: "septiembre de 2026",
    verificar: true
  },

  ley_20584_ficha: {
    titulo: "Ley 20.584: ficha clínica",
    resumen: "La información de la ficha clínica es **confidencial** y se considera dato sensible. Solo pueden acceder a ella las personas y en los casos que la ley señala: por ejemplo, el propio paciente, su representante legal o, si falleció, sus herederos; además de ciertos tribunales y autoridades.",
    fuente: "Ley 20.584, arts. 12 y 13. www.bcn.cl/leychile",
    vigente_a_la_fecha: "septiembre de 2026",
    verificar: true
  },

  datos_personales: {
    titulo: "Protección de datos personales",
    resumen: "La **Ley 19.628** (1999) protege los datos personales y considera los datos sobre la salud como **datos sensibles**, que en general no pueden tratarse sin autorización de la persona o de la ley. La **Ley 21.719** (publicada en 2024) crea un nuevo régimen de protección de datos que la reemplaza; su entrada en vigencia está prevista para diciembre de 2026.",
    fuente: "Leyes 19.628 y 21.719. www.bcn.cl/leychile",
    vigente_a_la_fecha: "septiembre de 2026",
    verificar: true
  },

  /* ---------- Capítulo 2: consentimiento y rechazo de tratamientos ---------- */
  ley_20584_consentimiento: {
    titulo: "Ley 20.584: consentimiento y rechazo (art. 14)",
    resumen: "Toda persona tiene derecho a **otorgar o denegar su voluntad** para someterse a cualquier procedimiento o tratamiento vinculado a su atención de salud. Para ejercerlo debe recibir información adecuada, suficiente y comprensible. Por regla general el consentimiento es verbal, pero debe constar **por escrito** en intervenciones quirúrgicas y otros procedimientos invasivos o de riesgo relevante. El rechazo de un tratamiento **no puede tener como objetivo la aceleración artificial de la muerte**, la realización de prácticas eutanásicas o el auxilio al suicidio.",
    fuente: "Ley 20.584, art. 14. www.bcn.cl/leychile",
    vigente_a_la_fecha: "septiembre de 2026",
    verificar: true
  },
  ley_20584_excepciones: {
    titulo: "Ley 20.584: cuándo se puede actuar sin consentimiento (art. 15)",
    resumen: "La ley permite actuar sin la manifestación de voluntad del paciente en situaciones excepcionales: cuando no aplicar el procedimiento suponga un riesgo para la salud pública; cuando la condición de la persona implique un riesgo vital o una secuela funcional grave de atención inmediata e impostergable, y la persona no esté en condiciones de expresar su voluntad ni sea posible obtener el consentimiento de su representante; y cuando la persona esté en incapacidad de manifestar su voluntad y no sea posible obtenerla de su representante.",
    fuente: "Ley 20.584, art. 15. www.bcn.cl/leychile",
    vigente_a_la_fecha: "septiembre de 2026",
    verificar: true
  },
  ley_20584_comites: {
    titulo: "Ley 20.584: consulta a comités de ética (art. 17)",
    resumen: "Cuando el profesional tratante tiene dudas sobre la competencia de la persona para decidir, o cuando la decisión de rechazar un tratamiento podría tener consecuencias graves, puede solicitarse la opinión de un comité de ética. Su pronunciamiento tiene carácter de **recomendación**: no reemplaza la decisión del paciente ni la del equipo.",
    fuente: "Ley 20.584, art. 17, y reglamento de comités de ética asistencial. www.bcn.cl/leychile",
    vigente_a_la_fecha: "septiembre de 2026",
    verificar: true
  },
  jurisprudencia_transfusiones: {
    titulo: "Tribunales y transfusiones (nota para el docente)",
    resumen: "Antes y después de la Ley 20.584, tribunales chilenos han resuelto recursos de protección sobre transfusiones a testigos de Jehová en sentidos distintos; en varios casos se autorizó la transfusión invocando el derecho a la vida. Es un punto jurídicamente discutido, aunque el consenso bioético actual respalda el derecho de un adulto capaz a rechazarla.",
    fuente: "Jurisprudencia de Cortes de Apelaciones y Corte Suprema; revisar casos recientes.",
    vigente_a_la_fecha: "septiembre de 2026",
    verificar: true
  },
  objecion_conciencia: {
    titulo: "Objeción de conciencia",
    resumen: "En Chile, la objeción de conciencia de profesionales de la salud está regulada expresamente para la interrupción voluntaria del embarazo en tres causales (Ley 21.030). Fuera de ese ámbito, su alcance es discutido; en todo caso, la convicción de un profesional no puede dejar a un paciente sin atención.",
    fuente: "Ley 21.030 (2017) y su reglamento. www.bcn.cl/leychile",
    vigente_a_la_fecha: "septiembre de 2026",
    verificar: true
  },

  /* ---------- Datos históricos del Capítulo 1 (verificar cifras y fechas) ---------- */
  historico_nuremberg: {
    titulo: "Juicio de los médicos y Código de Núremberg",
    resumen: "Juicio entre diciembre de 1946 y agosto de 1947; 23 acusados, 20 de ellos médicos; la sentencia enumera 10 condiciones para la experimentación en seres humanos (Código de Núremberg, 1947).",
    fuente: "Textos de referencia sobre historia de la ética de la investigación.",
    vigente_a_la_fecha: "septiembre de 2026",
    verificar: true
  },
  historico_tuskegee: {
    titulo: "Estudio de Tuskegee",
    resumen: "1932–1972, condado de Macon (Alabama); cerca de 600 hombres afroamericanos (unos 400 con sífilis y unos 200 sin ella); la penicilina era tratamiento habitual hacia fines de los años cuarenta; terminó en 1972 tras reportajes de prensa; disculpa presidencial en 1997.",
    fuente: "Textos de referencia sobre historia de la ética de la investigación.",
    vigente_a_la_fecha: "septiembre de 2026",
    verificar: true
  },
  historico_helsinki: {
    titulo: "Declaración de Helsinki",
    resumen: "Adoptada por la Asociación Médica Mundial en 1964; la revisión de 1975 incorporó la revisión por un comité independiente; revisada varias veces, la última en 2024.",
    fuente: "Asociación Médica Mundial (wma.net).",
    vigente_a_la_fecha: "septiembre de 2026",
    verificar: true
  },
  historico_belmont: {
    titulo: "National Research Act e Informe Belmont",
    resumen: "National Research Act de 1974 (crea la Comisión Nacional); Informe Belmont publicado en 1979, con tres principios: respeto por las personas, beneficencia y justicia.",
    fuente: "Textos de referencia sobre historia de la ética de la investigación.",
    vigente_a_la_fecha: "septiembre de 2026",
    verificar: true
  },
  historico_beauchamp: {
    titulo: "Beauchamp y Childress",
    resumen: "Principles of Biomedical Ethics, primera edición de 1979; cuatro principios: autonomía, no maleficencia, beneficencia y justicia.",
    fuente: "Beauchamp, T. y Childress, J., Principles of Biomedical Ethics.",
    vigente_a_la_fecha: "septiembre de 2026",
    verificar: true
  }
};
