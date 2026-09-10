# Numen: cierre del sistema editorial

## Fuente y diagnostico

Continuacion del working tree existente al 8 de septiembre de 2026. El visor del artifact de Claude carga, pero su contenido devuelve HTTP 403. Este documento propone el cierre a partir del codigo, las ilustraciones locales y el prompt entregado por el usuario; no atribuye decisiones al artifact inaccesible.

El sitio ya tiene temas claro/oscuro, ES/EN, una portada, nueve secciones apiladas, proyectos, blog, articulos, contacto y asistente. Claude incorporo una biblioteca SVG de servicios, proceso, personajes y marcas a mano. Faltan composiciones protagonistas, continuidad en paginas interiores, navegacion descubrible, espacio natural en movil y una revision conjunta de interacciones.

## Identidad

- Negro y blanco como base. Las capturas de productos conservan sus colores reales.
- Plus Jakarta Sans permanece como tipografia principal. Notas breves en serif cursiva aportan contraste editorial.
- Ilustraciones planas: tinta sencilla, pequenas imperfecciones, sin sombras ni realismo adicional. Las referencias locales de Julian e Igmer mantienen su identidad.
- Personajes separados de las escenas: el SVG del personaje contiene solamente la figura. Anotaciones y graficos de interfaz viven en elementos independientes.
- Cada ilustracion explica algo: personas para cercania, diagramas para servicios, bocetos para proceso, avion para contacto.

## Mapa de colocacion

| Area | Intervencion | Motivo |
| --- | --- | --- |
| Navegacion | Marca, destinos visibles, idioma/tema y menu movil explicito | El usuario descubre todas las paginas desde el primer viewport |
| Hero | Titular editorial, dueto de fundadores y hoja de ideas a producto | Presentar capacidad y personas con mayor presencia visual |
| Servicios | Cuatro composiciones SVG y entregables concretos | Facilitar comparar el alcance de cada especialidad |
| Trabajo | Capturas reales, descripcion y enlace de cada producto | La evidencia del trabajo debe ser protagonista |
| Conceptos | Identidad propia por concepto y etiqueta de exploracion | Distinguir conceptos visuales de productos en produccion |
| Nosotros | Fundadores libres de tarjetas pesadas, nombres y roles | Reconocer a quienes construyen el producto |
| Alcance | Globo contextual y texto legible | Explicar origen y colaboracion sin competir con contenido |
| Insights | Portadas dibujadas y articulos existentes | Conectar experiencia del estudio con lectura util |
| Proceso | Cinco etapas con ilustracion y resultado | Hacer visible como avanza un proyecto |
| FAQ | Acordeon accesible y jerarquia clara | Resolver dudas sin esconder respuestas en scroll anidado |
| Contacto | Formularios legibles, controles accesibles y estados de envio | Reducir friccion al presentar un proyecto |
| Footer | Cierre editorial, rutas y contacto | Dar un siguiente paso al terminar la pagina |
| Proyectos | Introduccion propia, galeria natural y CTA | Evitar un panel sticky aislado como pagina completa |
| Blog | Publicacion destacada, temas y portadas SVG | Crear una pagina editorial que invite a explorar |
| Articulos | Indice navegable, tipografia de lectura y relacionados | Mejorar lectura larga y continuidad |
| 404 | Ilustracion y rutas de recuperacion | Completar la identidad en estados secundarios |
| Asistente | Mascota, teclado, foco y controles visibles | Mantener una ayuda util y accesible |

## Sistema tecnico

Next.js 16.2.6 App Router, React 19, Tailwind 4 y Framer Motion existentes. Sin dependencias nuevas de produccion. Componentes SVG compartidos con trazos consistentes. Props active y prefers-reduced-motion controlan gestos. MotionConfig respeta la preferencia del sistema. En movil, pantallas bajas y movimiento reducido, las secciones fluyen con altura natural. Desktop conserva el apilado cuando hay espacio y el margen inferior de 96px en proyectos/conceptos.

Las paginas server conservan metadata y datos estructurados. El contenido interactivo permanece en componentes client. Las rutas, API de contacto, estado de proyectos y asistente conservan su contrato. No se inventan clientes, cifras, testimonios ni publicaciones.

## Trabajo paralelo y cierre

La fase de cierre usa GPT-5.6 Sol para los tres subagentes, por instruccion expresa del usuario. Cada uno recibe este documento, las reglas del repositorio y un alcance de archivos exclusivo.

1. `close_home`: `src/components/blocks/sections.tsx` y `editorial-concept-art.tsx`. Completar las nueve secciones, la galeria standalone, FAQ y contacto; conservar los contratos de API y la geometria desktop. Aceptacion: contenido visible con movimiento reducido, tarjetas completas, formulario usable y lint focal sin errores.
2. `close_pages`: `src/app/blog/`, `src/app/projects/` y `src/app/not-found*.tsx`. Completar filtros, indice, enlaces relacionados, CTA y estados de recuperacion. Aceptacion: rutas 200/404 correctas, enlaces reales, ES/EN, temas y ninguna perdida de contenido en movil.
3. `close_chat`: `src/components/ui/chat-bubble.tsx`. Completar contraste, controles tactiles, cierre con Escape, retorno de foco, log de mensajes y altura disponible. Aceptacion: respuesta, error y acciones de contacto comprobados con API interceptada, sin mensajes reales.
4. Agente principal: portada, navegacion, estilos, lectura SSR de movimiento reducido, integracion de SVG, comprobacion de tipos, build y QA conjunto. Revisa los resultados de los agentes y corrige fallos de integracion.

Los personajes de `founder_identity` se conservan desde la fase anterior: referencias locales, rellenos blancos cerrados y gestos ocasionales. Ningun agente puede revertir cambios ajenos, instalar dependencias de produccion, publicar, hacer commit o push.

Validar TypeScript, ESLint y build. Revisar en Chromium desktop y movil, temas claro/oscuro, ES/EN, movimiento reducido, overflow, enlaces internos, menu, FAQ, filtros, formulario y asistente. Las pruebas de envio usan respuestas interceptadas para verificar UI; no prueban entrega de correos ni proveedores externos. El cierre deja cambios locales revisables y un informe con evidencia. No incluye commit, push ni publicacion del sitio.
