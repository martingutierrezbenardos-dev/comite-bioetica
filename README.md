# Comité — Una aventura de bioética

Aventura gráfica educativa de tipo *point and click* para estudiantes de 3° y 4° medio. El estudiante participa como observador u observadora en el Comité de Ética Asistencial del Hospital Regional de Río Arrayán, un hospital ficticio del sur de Chile. Allí aprende bioética con el método deliberativo de Diego Gracia.

> **Estado actual:** el **Capítulo 1** está completo y probado. Los capítulos 2 a 5 aparecen en el menú como «En preparación».

---

## 1. Cómo abrir el juego

- **En un computador:** haz doble clic en `index.html`. No necesita internet, instalación ni servidor.
- **Navegadores probados:** Chrome y Edge actuales. También debería funcionar en Firefox y en Safari 15.4 o superior (Mac e iPad).
- **Si editas un archivo y no ves el cambio:** recarga sin caché con Ctrl+Shift+R (Windows) o Cmd+Shift+R (Mac).

## 2. Cómo publicarlo en GitHub Pages

1. Crea una cuenta en github.com, si no tienes una.
2. Crea un repositorio nuevo (botón **New**), por ejemplo `comite-bioetica`, y márcalo como **Public**.
3. En el repositorio, usa **Add file → Upload files** y arrastra **todo el contenido** de esta carpeta (`index.html`, `css/`, `motor/`, `arte/`, `datos/`, `herramientas/`, `README.md`). Luego pulsa **Commit changes**.
4. Ve a **Settings → Pages**. En **Source**, elige *Deploy from a branch*, selecciona la rama `main` y la carpeta `/ (root)`, y pulsa **Save**.
5. Después de uno o dos minutos, el juego queda disponible en `https://TU-USUARIO.github.io/comite-bioetica/`.

Para actualizarlo más tarde, vuelve a subir los archivos que cambiaste.

La carpeta `.claude/` sirve solo para pruebas durante el desarrollo. No es necesario subirla.

## 3. Cómo editar textos y casos

Todo el contenido está en la carpeta **`datos/`**. No necesitas tocar la lógica, que está en `motor/`.

| Archivo | Qué contiene |
|---|---|
| `datos/config.js` | Título, **clave del modo docente**, capítulos (activos o no), principios, textos generales, textos de la rúbrica y **nota de ayuda** (teléfonos). |
| `datos/legal.js` | **Todos los datos legales y empíricos**, cada uno con `vigente_a_la_fecha` y `verificar`. |
| `datos/comite.js` | Integrantes del comité: nombre, rol, perspectiva y aspecto. |
| `datos/glosario.js` | Términos del glosario desbloqueable. |
| `datos/cuaderno.js` | Entradas del cuaderno de conceptos: concepto, referencia y ejemplo. |
| `datos/guia-docente.js` | Guía docente: objetivos, preguntas para la discusión, errores frecuentes y sugerencias. |
| `datos/cap1.js` | El Capítulo 1 completo: escenas, documentos, diálogos, puzles, deliberación y cierre. |

### Reglas para editar sin romper nada

- Cambia solo el texto que está **entre comillas** `"así"`.
- No borres las comas, las llaves `{ }` ni los corchetes `[ ]`.
- Para citar dentro de un texto, usa «comillas angulares», nunca comillas rectas `"`.
- Dentro de los textos puedes dar formato:
  - `**negrita**` y `*cursiva*`.
  - Una línea en blanco (`\n\n`) para empezar un párrafo nuevo.
  - Líneas que empiezan con `- ` para hacer listas.
- Hay marcadores que el juego reemplaza solo:
  - `{nombre}` pone el nombre del estudiante.
  - `{{forma masculina|forma femenina|forma neutra}}` usa la forma de trato que eligió el estudiante al inicio.
  - `{legal:id}` inserta el resumen de un dato de `legal.js`.
- **Después de editar, abre `herramientas/validar-datos.html`.** Esa página detecta:
  - comas o comillas faltantes;
  - diálogos que apuntan a nodos inexistentes;
  - documentos que no se pueden obtener;
  - escenas inalcanzables;
  - preguntas de comprobación sin una única respuesta correcta.

### Cómo funcionan las acciones (para editar diálogos y escenas)

Las zonas clicables (`hotspots`), los diálogos y los puzles usan **efectos** escritos como texto:

| Efecto | Qué hace |
|---|---|
| `evidencia:id` | Guarda un documento en la carpeta y lo muestra. |
| `dialogo:id` | Abre una conversación. |
| `minijuego:id` | Abre un puzle. |
| `ir:escena` | Cambia de lugar. |
| `bandera:nombre` | Marca que algo ocurrió. |
| `concepto:id` | Desbloquea una entrada del cuaderno. |
| `glosario:id` | Desbloquea un término del glosario. |
| `aviso:texto` | Muestra un aviso breve. |
| `deliberacion` | Abre la sesión del comité. |
| `cierre` | Abre las preguntas finales. |
| `completar` | Marca el capítulo como terminado. |

Las **condiciones** (`si: [...]`) usan la misma idea:

| Condición | Se cumple cuando… |
|---|---|
| `bandera:x` | la bandera está puesta. |
| `!bandera:x` | la bandera no está puesta (el `!` niega). |
| `evidencia:id` | el estudiante tiene ese documento. |
| `grupo:linea` | tiene todos los documentos de ese grupo. |
| `minijuego:id` | completó ese puzle. |

Las zonas clicables se ubican en **porcentajes** del dibujo (`x`, `y`, `w`, `h`).

## 4. Capítulos

| # | Título | Conceptos | Estado |
|---|---|---|---|
| 1 | El archivo: ¿por qué existe la bioética? | Código de Núremberg, Tuskegee, Declaración de Helsinki, Informe Belmont, cuatro principios de Beauchamp y Childress, deberes *prima facie*, método deliberativo de Gracia, hechos y opiniones, cursos extremos e intermedios, niveles de Gracia, críticas al principialismo | **Jugable** |
| 2 | La firma | Consentimiento informado, capacidad, paternalismo, rechazo de tratamiento, Ley 20.584 | En preparación |
| 3 | Una cama | Justicia distributiva, criterios de asignación, triaje, velo de ignorancia | En preparación |
| 4 | El final | Limitación del esfuerzo terapéutico, cuidados paliativos, doble efecto, eutanasia | En preparación |
| 5 | Más allá del paciente (opcional) | One Health, 3R, resistencia antimicrobiana, bien común | En preparación |

### Capítulo 1 en breve (unos 12 a 15 minutos)

1. **Encargo.** Inés, la filósofa del comité, pide al estudiante ordenar el archivo donado por un médico jubilado para una muestra titulada «Por qué existimos».
2. **Búsqueda.** El estudiante reúne 8 documentos históricos y encuentra también 2 distractores: una circular sin relación y una carta de opinión.
3. **Puzles.** Arma una **línea de tiempo**, relaciona cada abuso con un **principio de Belmont** y traduce los tres principios de Belmont a los **cuatro** de Beauchamp y Childress. Con esto desbloquea la «caja de herramientas».
4. **Caso.** Descubre la **caja 7**, con un estudio **ficticio** hecho en el propio hospital en 1968. Puede hablar con Tomás, que aporta un testimonio.
5. **Sesión del comité.** Delibera con el método completo de 5 fases sobre qué hacer con ese material en la muestra.
6. **Cierre.** El comité discute las críticas al principialismo y los niveles de Gracia. Luego el estudiante escribe 3 reflexiones y responde 3 preguntas de comprobación.

## 5. Cómo evalúa el juego

- **Puzles conceptuales:** tienen respuestas correctas y retroalimentación que explica el porqué. Algunos ítems admiten más de una respuesta razonable.
- **Deliberación:** el juego **no evalúa la conclusión**, sino cinco criterios de calidad: hechos, valores de todas las partes, cursos de acción, coherencia de la justificación y respuesta a objeciones. Cada criterio se califica como *Sólido*, *En desarrollo* o *Inicial*. Los textos de la rúbrica se pueden editar en `config.js`.
- **Cursos bloqueados:** solo se bloquean los cursos marcados en los datos como `"ilegal"` o `"contra_consenso"`. En ese caso el comité explica por qué y pide revisar la propuesta.
- **Pistas:** hay 3 niveles, de lo general a lo específico. No bajan la evaluación, pero quedan registradas en el resumen.

## 6. Resumen para el docente

Al final, o en cualquier momento desde **Menú → Mi resumen**, el estudiante descarga un `.txt` llamado `Apellido_Nombre_Curso_bioetica.txt`. El archivo incluye:

- las actividades realizadas y sus intentos;
- la propuesta del estudiante, sus razones y el historial de revisiones;
- las objeciones del comité y sus respuestas;
- las pruebas de consistencia y la rúbrica;
- sus reflexiones y los resultados de la comprobación de conceptos.

El juego **nunca pide datos de salud** del estudiante ni de su familia.

## 7. Modo docente

- Se abre desde la portada, el menú de capítulos o **Menú → Modo docente**.
- **Clave por defecto: `profe2026`.** Cámbiala en `datos/config.js` → `docente.clave`. No es un sistema de seguridad: solo evita entradas accidentales.
- **Qué permite:**
  - activar o desactivar capítulos (por ejemplo, el 4);
  - jugar cualquier capítulo sin haber completado el anterior;
  - leer la guía docente;
  - borrar el progreso guardado en el navegador.
- **Alcance:** la configuración de capítulos se guarda **en cada navegador**. Si los estudiantes usan sus propios equipos, conviene desactivar el capítulo directamente en `config.js` con `activo: false` y volver a publicar.

## 8. Accesibilidad

- No hay presión de tiempo en ninguna parte del juego.
- Se puede jugar completo con teclado:
  - Tab y Mayús+Tab para moverse;
  - Enter para activar;
  - las teclas 1 a 9 para elegir opciones en los diálogos;
  - Esc para cerrar ventanas.
- La tecla **H** (o el botón «Resaltar») marca todas las zonas interactivas.
- En Ajustes se pueden cambiar el tamaño del texto (85 % a 160 %), el alto contraste y las animaciones. El juego también respeta la preferencia de «reducir movimiento» del sistema.
- Los botones miden al menos 44 px, para usarlos cómodamente en pantalla táctil. Probado en tablet horizontal y vertical.
- El guardado automático usa el almacenamiento del navegador. Si el navegador lo bloquea (por ejemplo, en modo privado), el juego sigue funcionando y avisa que conviene descargar el resumen antes de cerrar.

## 9. ⚠️ Datos legales y empíricos que debes verificar antes de usar el juego en clase

Todos están resumidos con palabras propias, **no** son citas textuales. En `datos/legal.js`, cambia `verificar: true` a `false` y actualiza `vigente_a_la_fecha` cuando los revises.

| Dato | Qué afirma el juego | Dónde aparece |
|---|---|---|
| Ley 20.120 (2006) | Exige consentimiento previo, expreso, libre e informado y aprobación de un comité ético científico para investigar en personas. | `legal.js` → `ley_20120`; documento del archivo «Chile» |
| Ley 20.584 (2012) | Derechos y deberes de los pacientes: información, consentimiento o rechazo, confidencialidad de la ficha y comités de ética. | `legal.js` → `ley_20584` |
| Ley 20.584, ficha clínica (arts. 12–13) | La ficha es confidencial y es dato sensible. Acceden el titular, su representante o, si el paciente falleció, sus herederos, además de ciertos tribunales y autoridades. | `legal.js` → `ley_20584_ficha`; notas legales de los cursos de acción en `cap1.js` |
| Leyes 19.628 y 21.719 | Los datos de salud son sensibles. La Ley 21.719 (2024) reemplaza el régimen de protección de datos y su vigencia está prevista para **diciembre de 2026**. | `legal.js` → `datos_personales` |
| Juicio de los médicos | Duró de diciembre de 1946 a agosto de 1947; hubo 23 acusados, 20 de ellos médicos; el Código tiene 10 condiciones. | `cap1.js` → `ev_nuremberg` |
| Tuskegee | 1932–1972 en el condado de Macon; unos 600 hombres (unos 400 con sífilis y unos 200 sin ella); la penicilina era el tratamiento habitual a fines de los 40; el estudio se reveló a la prensa en 1972; hubo una disculpa presidencial en 1997. | `cap1.js` → `ev_tuskegee` |
| Declaración de Helsinki | Adoptada en 1964; la revisión por un comité independiente se añadió en 1975; la última revisión es de **2024**. | `cap1.js` → `ev_helsinki` |
| National Research Act / Belmont | Ley de 1974 que crea la comisión; el Informe Belmont se publicó en 1979 y menciona Tuskegee. | `cap1.js` → `ev_nra1974`, `ev_belmont` |
| Beauchamp y Childress | Primera edición de 1979; Beauchamp participó en la redacción del Informe Belmont. | `cap1.js` → `ev_beauchamp` |
| Diego Gracia | Niveles de principios («ética de mínimos» y «ética de máximos») en *Procedimientos de decisión en ética clínica* (1991). | `cuaderno.js` → `niveles_gracia`; diálogo `cierre_comite` |
| Líneas de ayuda | Salud Responde 600 360 7777; línea de prevención del suicidio *4141; SAMU 131. | `config.js` → `ayuda` (se usará en el Capítulo 4) |

**Estado de la eutanasia en Chile (Capítulo 4, pendiente):** este dato irá en `datos/legal.js` con un campo «vigente a la fecha». **El docente lo verificará y actualizará** antes de usar ese capítulo, porque el proyecto de ley puede cambiar de estado.

**Contenido ficticio:** el hospital, la ciudad, los personajes y el «Estudio H-68» de la caja 7 son **inventados**. No aluden a hechos reales de la historia hospitalaria chilena.

## 10. Estructura técnica

- HTML, CSS y JavaScript sin frameworks ni dependencias externas.
- Los datos van en archivos `.js` (no `.json`) para que el juego funcione al abrirlo con doble clic: los navegadores bloquean la lectura de `.json` desde `file://`.
- Todo el arte es SVG original, generado en código (`arte/`).
- El motor es reutilizable: escenas, diálogos, carpeta, pistas, minijuegos, deliberación, cierre y resumen. Cada capítulo nuevo es un archivo en `datos/` y una línea en `index.html` y en `herramientas/validar-datos.html`.
