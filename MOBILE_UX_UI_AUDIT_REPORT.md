# Reporte de Auditoría UX/UI Móvil — Numen Agency

**Fecha:** 2026-05-20
**Metodología:** UI UX Pro Max (prioridad 1→8)
**Verificación:** Análisis estático de código — sin servidor de desarrollo activo. Las conclusiones se basan en revisión de `sections.tsx`, `navbar.tsx`, `sticky-stack.tsx`, `hero-section.tsx`, `chat-bubble.tsx`, `page.tsx` y `globals.css`.
**Viewports evaluados:** 320×568, 360×640, 375×667, 390×844, 414×896, 430×932, 1440×900 (sanity check desktop)

---

## Resumen Ejecutivo

El sitio tiene una base visual sólida: tokens de color bien definidos, animaciones con física de resorte, sistema de tipografía coherente y un stack técnico moderno. Sin embargo, la experiencia móvil tiene **seis problemas estructurales** que degradan la percepción de calidad en pantallas menores a 430px. Los más urgentes son:

1. **Seis de siete secciones sufren solapamiento de navbar** — solo `Selected Work` y `How We Work` recibieron el parche `pt-24`; el resto sigue con `py-10` (40px), que cae dentro de la zona de la navbar flotante.
2. **El chat bubble desborda la pantalla en viewports ≤360px** — el panel abierto es `w-80` (320px) anclado a `right-6`, lo que produce overflow horizontal en dispositivos pequeños.
3. **El featured card de Selected Work tiene un hueco visual vacío** — `justify-between` sin contenido central en móvil (el `PhotoSpread` es `hidden lg:flex`) crea un espacio muerto entre el nombre del proyecto y su descripción.
4. **FAQ no tiene encabezado ni CTA en móvil** — el headline y el botón "Start a project" están en un div `hidden lg:flex`, dejando la sección sin contexto en dispositivos móviles.
5. **Scroll anidado crea ambigüedad gestual** — los `overflow-y-auto` internos de proyectos y proceso compiten con el scroll del sticky-stack en iOS.
6. **Inconsistencia de padding entre secciones** — `pt-24` solo en dos secciones frente al `py-10` del resto produce una experiencia de ritmo vertical inconsistente.

---

## Top 5 Problemas Críticos por Severidad

| # | Problema | Severidad | Categoría UXP | Viewports afectados |
|---|----------|-----------|---------------|---------------------|
| 1 | Navbar sobrepuesta en 6/7 secciones | **CRÍTICO** | Layout & Responsive / Navigation | 320–430px (todos) |
| 2 | Chat bubble overflow en pantallas pequeñas | **CRÍTICO** | Touch & Interaction / Layout | 320–360px |
| 3 | Featured card hueco en móvil | **ALTO** | Visual Hierarchy / Layout | 320–430px |
| 4 | FAQ sin encabezado ni CTA en móvil | **ALTO** | Content Priority / Navigation | 320–430px |
| 5 | Scroll anidado: ambigüedad gestual | **ALTO** | Touch & Interaction / Animation | iOS, todos los anchos |

---

## 1. Accesibilidad

### 1.1 Contraste de textos
- **Pasa:** Los tokens de color usan sobreescrituras en `globals.css` para modo claro que elevan `text-foreground/40` a `#333333` y `text-foreground/30` a `#555555`. Ratio calculado sobre blanco `#ffffff`: ~8:1 y ~5:1 respectivamente. ✓
- **Riesgo:** En modo oscuro, `text-foreground/50` sobre `oklch(0 0 0)` = 50% del blanco puro = `#808080`. Ratio sobre negro puro: ~3.9:1 — por debajo del mínimo AA de 4.5:1 para texto normal.  
  _Afecta: descripciones de tarjetas en modo oscuro._

### 1.2 Etiquetas ARIA y botones icónicos
- El chat bubble trigger tiene `aria-label="Open chat"` ✓
- El botón close del chat tiene `aria-label="Close chat"` ✓
- El botón "Toggle menu" del navbar tiene `aria-label="Toggle menu"` ✓
- Los botones de sugerencias del chat **no tienen** `aria-label` explícito ni `type="button"` — solo el texto visible. Riesgo bajo pero registrable.
- El botón de Send del chat tiene `aria-label="Send"` ✓

### 1.3 Jerarquía de headings
- `HeroSection` tiene `<h1>` ✓
- `ServicesSection`, `ProjectsSection`, `ProcessSection`: sus `<h3>` están dentro de tarjetas, sin `<h2>` de sección. La sección label es un `<span>`, no un heading semántico. Los lectores de pantalla no pueden navegar por secciones usando heading shortcuts.
  _Recomendación: convertir las etiquetas de sección (`Selected Work`, `How We Work`, etc.) en `<h2>` con estilos que preserven la apariencia actual._

### 1.4 Imágenes decorativas
- Los `<img>` del desktop bento grid tienen `alt` descriptivos ✓
- Los `<img>` de ServicesSection tienen `alt={s.title}` ✓
- `PhotoSpread` del featured card — requiere verificar si el componente `gallery.tsx` provee alt text a las imágenes internas.

### 1.5 Reduced-motion
- `globals.css` incluye `@media (prefers-reduced-motion: reduce)` para las transiciones de tema ✓
- Framer Motion: ninguna de las animaciones de `sections.tsx` o `hero-section.tsx` verifica `useReducedMotion()`. El `animate-ping` en el chat bubble tampoco respeta reduced-motion.
  _Recomendación: añadir `useReducedMotion()` de Framer Motion al contenedor principal o en `sticky-stack.tsx` para deshabilitar `staggerContainer`/`staggerItem` cuando el usuario lo requiere._

---

## 2. Touch e Interacción

### 2.1 Targets táctiles
- Chat bubble trigger: `h-12 w-12` (48×48px) ✓ — supera el mínimo de 44pt.
- Botones de sugerencias del chat: `px-3 py-1.5 text-[11px]` — altura aproximada ~28px. **Falla** el mínimo de 44pt. No son acciones primarias, pero son la única forma de interacción sugerida.
- Links de navegación del navbar móvil: `block rounded-xl px-4 py-2.5 text-sm` — altura ~36px. **Marginalmente bajo** el mínimo de 44pt.
- Stack tags en ProjectsSection: `px-2.5 py-0.5 text-[11px]` — no son interactivos, solo decorativos ✓.
- Links de proyectos (featured + rest): ocupan toda la tarjeta ✓.

### 2.2 Scroll anidado — riesgo gestual ALTO
El modelo sticky-stack hace que el scroll del documento controle la transición entre secciones. Al agregar `overflow-y-auto` en las tarjetas de `ProjectsSection` y `ProcessSection`, se crea una región de scroll anidado dentro de una región de scroll padre.

**Comportamiento en iOS:** El sistema usa heurísticas de "primer scroll ganador". Si el dedo comienza sobre el área scrollable interna, iOS hace scroll interno. Si comienza fuera, hace scroll del documento. En la práctica:
- El usuario puede quedar atrapado dentro de la lista de proyectos sin poder avanzar a la siguiente sección.
- El proceso de transición requiere comenzar el gesto en un área no scrollable (el header de la sección).
- En Android, el comportamiento depende del WebView: chrome/Android permite scroll anidado más fluidamente pero también puede quedar atrapado.

**Impacto por viewport:** Más severo en 320–390px donde el contenido scrollable llena casi toda la pantalla visible.

### 2.3 Tap delay
No se detecta `touch-action: manipulation` en elementos interactivos clave. En navegadores modernos esto ya no causa 300ms delay, pero es una buena práctica para botones y links.

---

## 3. Layout y Responsive

### 3.1 CRÍTICO — Navbar overlap en 6 de 7 secciones

La navbar flotante se posiciona en `top-5` (20px) con una altura aproximada de 36px, ocupando el rango vertical **y: 20px → 56px** desde el top del viewport.

Estado actual del padding top en secciones móviles:

| Sección | Padding top móvil | ¿Navbar la solapa? |
|---------|-------------------|---------------------|
| ServicesSection | `py-10` = 40px | **SÍ** — label a y≈40px, navbar hasta y≈56px |
| ProjectsSection | `pt-24` = 96px | No ✓ |
| AboutSection | `py-10` = 40px | **SÍ** |
| TechStackSection | `py-10` = 40px | **SÍ** |
| ProcessSection | `pt-24` = 96px | No ✓ |
| FAQSection | `py-10` = 40px | **SÍ** |
| ContactFormSection | `pt-10` = 40px | **SÍ** |

El `border-b` del header de cada sección actúa como separador visual — al quedar parcialmente bajo la navbar, el efecto es que la línea divisoria desaparece y el contenido de la sección parece comenzar de forma abrupta.

**Fix recomendado:** Aplicar `pt-20 pb-10 lg:py-10` a todas las secciones afectadas. `pt-20` (80px) da un margen de ~24px sobre el borde inferior de la navbar, suficiente sin desperdiciar espacio visual.

### 3.2 CRÍTICO — Chat bubble overflow en 320–360px

```
Viewport width:  320px
Panel width:     w-80 = 320px
Panel right:     right-6 = 24px
Panel left edge: 320 - 24 - 320 = -24px  ← DESBORDA 24px fuera de pantalla
```

```
Viewport width:  360px
Panel left edge: 360 - 24 - 320 = 16px   ← Apenas entra
```

En 320px el panel se recorta ~24px del lado izquierdo, truncando el texto de los mensajes del asistente y los chips de sugerencias. El overflow no genera scrollbar horizontal (el panel es `overflow-hidden`) sino que simplemente el contenido se oculta.

**Fix recomendado:**
```jsx
className="... w-[calc(100vw-48px)] max-w-80 ..."
```
Esto hace el panel adaptable: en 320px sería 272px, en 375px sería 327px clampeado a 320px.

### 3.3 h-screen clipping en viewports extremos

Todas las secciones son `flex h-screen flex-col`. En 320×568:

| Sección | Espacio disponible para contenido | Riesgo |
|---------|-----------------------------------|--------|
| Services | 568 - 40(py-10) - ~36(header) = 492px para 2 cards | Marginal ✓ |
| Projects | 568 - 96(pt-24) - ~36(header) = 436px para cards | Con scroll interno ✓ |
| About | 568 - 40 - 36 = 492px para stats + team + principles | **ALTO** — mucho contenido |
| Stack | 568 - 40 - 36 - ~60(h2) = 432px para 5 categorías | `overflow-auto` lo salva ✓ |
| FAQ | 568 - 40 - 36 = 492px solo para accordions | `overflow-y-auto` ✓ |
| Contact | 568 - 40 - 36 = 492px para form | Ajustado ✓ |

AboutSection es la más crítica: stats grid (2×2) + team cards (2 cols) + 3 principios en 492px es muy denso. El `overflow-hidden` en el contenedor interno significa que el contenido excedente se **recorta silenciosamente** sin dar al usuario la posibilidad de verlo.

### 3.4 Viewport units
Las secciones usan `h-screen` (100vh). En iOS Safari el 100vh incluye la barra de herramientas del navegador (que puede ser ~44-60px). Esto puede hacer que las secciones sean más pequeñas de lo esperado, exacerbando el clipping en 320px.

**Recomendación:** Cambiar `h-screen` por `h-dvh` (o añadir fallback `min-h-dvh`) en secciones con scroll interno para aprovechar la altura dinámica real del viewport en iOS.

### 3.5 Sin scroll horizontal detectado
No se identificó ninguna causa de scroll horizontal: contenidos con `max-w-5xl` y padding lateral `px-6` deberían mantenerse dentro del viewport. ✓

---

## 4. Tipografía y Jerarquía Visual

### 4.1 Hero section — título en móvil
`text-5xl` (48px) en el `<h1>` del hero. En 320px: 48px de font-size para ~22 caracteres ("We Build Digital Products") puede requerir wrapping. Sin `break-words` explícito. Revisar si "Products" queda en línea única en 320px (improbable — forzará a 2 líneas). Esto está ok en términos de diseño pero la envoltura visual puede ser inesperada.

### 4.2 Stack section — heading dominante
`text-3xl` en `TechStackSection` ocupa ~48px de altura útil (con `mt-8`) en el espacio de la sección, dejando menos room para el contenido de los stacks. En 320px, esto compite visualmente con las categorías debajo.

### 4.3 About section — stat numbers oversized
`text-3xl font-bold` en las celdas de stats con `p-6` en un grid 2×2 en 320px (272px ancho disponible) = ~133px por celda con 24+24px de padding = ~85px de espacio para el número y el label. El `text-3xl` (30px) más `text-xs` label caben pero el `p-6` (24px padding) es excesivo para ese ancho — impide el respiro visual.

**Recomendación:** `p-3 lg:p-6` para las celdas de stats.

### 4.4 Consistencia de escala tipográfica móvil

| Elemento | Tamaño actual | Recomendado |
|----------|---------------|-------------|
| Section label | `text-[10px]` | ✓ correcto |
| Section number | `text-[10px]` | ✓ correcto |
| Featured project title | `text-base` (16px) | ✓ correcto |
| Rest project titles | `text-sm` (14px) | ✓ correcto |
| Process step titles | `text-sm` (14px) | ✓ correcto |
| Process step desc | `text-[12px]` | ✓ correcto |
| About stat numbers | `text-3xl` (30px) | Cambiar a `text-2xl lg:text-3xl` |
| Stack section h2 | `text-3xl` | Cambiar a `text-2xl lg:text-3xl` |
| Hero h1 | `text-5xl` | ✓ para hero, intencionado |

---

## 5. Color, Contraste y Tratamiento de Superficies

### 5.1 Modo oscuro — riesgo de contraste bajo
- `text-foreground/50` en dark mode: foreground es `oklch(1 0 0)` (blanco puro), al 50% es `oklch(1 0 0 / 50%)` ≈ `rgba(255,255,255,0.5)` sobre fondo negro. Ratio de contraste: 3.0:1. **Falla AA para texto normal** (requiere 4.5:1).
  - _Afectado:_ Descripciones de proyectos, texto de proceso, subtextos de About.
- `text-foreground/40` en dark mode: ratio ~2.4:1. **Falla AA.**
  - _Afectado:_ Muchos textos secundarios en el cuerpo de las tarjetas.
- El CSS de `globals.css` solo sobreescribe los colores en light mode (`:not(.dark)`). En dark mode, los valores de opacidad generan colores de contraste insuficiente.

### 5.2 Process cards en móvil — diferenciación visual insuficiente
`bg-foreground/1.5` en dark mode = `rgba(255,255,255,0.015)` ≈ #050505 sobre #000000. Esta diferencia es imperceptible. Las tarjetas del proceso en móvil se ven como texto flotando sobre el fondo sin ninguna superficie que las contenga visualmente.

**Recomendación:** Subir a `bg-foreground/[0.04]` (equivalente al `bg-foreground/4` de los icon boxes) o usar `bg-foreground/[0.06]` para las tarjetas.

### 5.3 Border opacity en process cards
`border-foreground/8` en dark mode = `rgba(255,255,255,0.08)` sobre negro. El borde es casi invisible (~16:1 de contraste invertido). Para dark mode, `border-foreground/[0.12]` daría mayor definición sin romper la sobriedad.

---

## 6. Navegación y Elementos Fijos/Sticky

### 6.1 Inconsistencia de padding — ya documentada en §3.1

### 6.2 FAQ sin heading en móvil — ALTO

```jsx
// FAQSection — solo la columna derecha es visible en móvil
<div className="hidden flex-col justify-between gap-6 lg:flex">
  {/* Headline: "Common questions, answered." */}
  {/* CTA: "Start a project" */}
</div>
<motion.div className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
  {/* Solo los accordions */}
</motion.div>
```

En móvil, el usuario ve directamente los accordions sin ningún encabezado orientador ni CTA. Las personas que llegan a esta sección sin contexto de scroll no tienen un gancho visual que los invite a explorar el contenido ni una llamada a acción para contactar.

**Recomendación:** Añadir un bloque `lg:hidden` en FAQSection con una versión compacta del heading (`text-2xl`) y el CTA "Start a project". Similar al patrón que ya existe en ContactFormSection.

### 6.3 Orden de secciones y z-index del sticky stack
El z-index de las secciones sube correctamente: z-10, z-20, z-30, z-40, z-50, z-60, z-[70]. El chat bubble en z-[100] está por encima de todo. La navbar en z-100 (sin corchetes) debería interpretarse como `z-index: 100` en Tailwind, igual que el chat bubble. Verificar que no haya colisión visual entre navbar y chat bubble en viewports donde ambos son visibles simultáneamente.

### 6.4 Transición de sticky — posición del título post-transición
Cuando una nueva sección hace "slide up" sobre la anterior, el header de la nueva sección puede aparecer inicialmente oculto detrás de la navbar si el padding no es suficiente. Con `pt-24` la sección se pega al top del viewport y el título queda a ~96px → 40px debajo del navbar. Correcto. Pero para las secciones con `py-10` este momento de transición es problemático — el título sube hasta quedar bajo la navbar antes de que la sección termine de hacer scroll al frente.

---

## 7. Animaciones y Motion

### 7.1 `staggerContainer` + `staggerItem` — sobrecarga en móvil
Las animaciones de entrada tienen `staggerChildren: 0.2` con `delayChildren: 0.12`. Para 4-5 elementos, la última entrada llega a los ~1s de delay. En una sección `h-screen` donde el contenido es inmediatamente visible al hacer scroll, este delay puede sentirse como latencia, especialmente en 320–375px donde todo el contenido está visible de una vez.

**Recomendación:** En móvil, reducir `staggerChildren` a 0.1 y `delayChildren` a 0.05, o usar una variante `staggerContainerMobile` condicionada por `isDesktop` (ya existe el hook en `sticky-stack.tsx`).

### 7.2 `animate-ping` del chat bubble sin reduced-motion
El `<span className="absolute inset-0 animate-ping rounded-full bg-foreground/20" />` se ejecuta indefinidamente. No tiene media query `prefers-reduced-motion`. Para usuarios con sensibilidad al movimiento esto es una animación continua en la periferia visual.

**Recomendación:**
```css
@media (prefers-reduced-motion: reduce) {
  .animate-ping { animation: none; }
}
```
O usar la clase Tailwind `motion-safe:animate-ping` en su lugar.

### 7.3 Duración de animaciones de entrada — adecuada
`spring stiffness: 60, damping: 14` produce un movimiento de resorte natural. Las duraciones efectivas (~400–500ms) están en el límite alto del rango recomendado (≤400ms) pero son aceptables para el tono editorial premium del sitio.

### 7.4 Blur transition en `blurStyle`
En `sticky-stack.tsx`, el `blurStyle` solo se aplica en desktop (`isDesktop`). En móvil, `blur.b1–b6` son `undefined` y el `style` prop recibe `undefined`, que React interpreta como sin estilo. Esto es correcto. ✓

---

## 8. Performance y Estabilidad de Layout

### 8.1 Imágenes sin dimensiones declaradas
Los `<img>` sin `width`/`height` explícitos (o `aspect-ratio`) pueden causar CLS (Cumulative Layout Shift) al cargar. Las imágenes en ServicesSection, ProjectsSection y ProcessSection usan `absolute inset-0 h-full w-full` — al estar dentro de contenedores con altura explícita, el CLS es mitigado. Sin embargo, la imagen de `/inkytap/principal.png` en rest cards solo está en desktop (`hidden lg:block`), por lo que en móvil no genera CLS. ✓

### 8.2 CDN de Simple Icons (TechStack)
```jsx
src={`https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${item.icon}.svg`}
```
Se cargan ~25 SVGs externos en la sección Stack. En conexiones lentas (móvil 3G), estos pueden aparecer vacíos inicialmente. Ningún placeholder o skeleton está implementado.

### 8.3 Scrollbar sin ocultar en TechStackSection
```jsx
className="... overflow-auto ..."  // Sin [&::-webkit-scrollbar]:hidden
```
En WebKit (iOS Safari, Chrome en iOS), `overflow-auto` puede mostrar un scrollbar visible en el área del grid. ProjectsSection y ProcessSection sí usan `[&::-webkit-scrollbar]:hidden` ✓, pero TechStackSection no.

---

## Hallazgos por Sección

### Hero Section
- **Estado:** Aceptable. El `h-screen` funciona como introducción. Los botones "View Our Work" y "Let's Talk" tienen buen tamaño táctil.
- **Mejora:** `text-5xl` puede requerir wrapping manual en 320px. Considerar `text-4xl sm:text-5xl`.
- **Urgencia:** Baja.

### Services (What We Do)
- **Estado:** La falta de `pt-24` hace que la navbar tape el header. Cards en 1 columna en móvil, sin imágenes — correcto. `overflow-hidden` en el grid corta silenciosamente el contenido en viewports pequeños sin scroll interno.
- **Mejoras:**
  1. `py-10` → `pt-20 pb-10 lg:py-10`
  2. Cambiar `overflow-hidden` por `overflow-y-auto [&::-webkit-scrollbar]:hidden` + `pb-24` en el grid.
- **Urgencia:** Alta.

### Selected Work (Projects)
- **Estado:** El `pt-24` funciona. Scroll interno con `pb-24` es correcto. Problema principal: hueco visual en el featured card.
- **Análisis detallado:** Ver §9 abajo.
- **Urgencia:** Media-Alta.

### About (About Numen)
- **Estado:** `py-10` → navbar overlap. `overflow-hidden` en contenedor interno causa clipping severo en 320–375px. Stats grid con `p-6` demasiado generoso en móvil. Team cards en 2 columnas en 320px (~136px por columna) con `h-20` avatar + texto = cramped.
- **Mejoras:**
  1. `py-10` → `pt-20 pb-10 lg:py-10`
  2. Stats grid: `p-6` → `p-3 lg:p-6`
  3. Cambiar `overflow-hidden` por `overflow-y-auto [&::-webkit-scrollbar]:hidden pb-24`
  4. Team cards: considerar 1 columna en móvil (`grid-cols-1 sm:grid-cols-2`)
- **Urgencia:** Alta.

### Stack (Our Stack)
- **Estado:** `py-10` → navbar overlap. `overflow-auto` sin ocultar scrollbar. h2 `text-3xl` consume espacio vertical.
- **Mejoras:**
  1. `py-10` → `pt-20 pb-10 lg:py-10`
  2. Añadir `[&::-webkit-scrollbar]:hidden` al `overflow-auto`
  3. h2: `text-3xl lg:text-5xl` → `text-2xl lg:text-5xl`
- **Urgencia:** Media.

### How We Work (Process)
- **Estado:** `pt-24` correcto. Icon cards implementadas. Problemas de subtileza visual.
- **Análisis detallado:** Ver §10 abajo.
- **Urgencia:** Media.

### FAQ
- **Estado:** `py-10` → navbar overlap. Falta heading/CTA en móvil. La sección de accordions sí tiene `overflow-y-auto` con scrollbar oculto ✓. Pero la sección se queda muda sin contexto en móvil.
- **Mejoras:**
  1. `py-10` → `pt-20 pb-10 lg:py-10`
  2. Añadir bloque `lg:hidden` con heading compacto y CTA
- **Urgencia:** Alta.

### Contact (Start a Project)
- **Estado:** `pt-10` → navbar overlap. El heading mobile-only `lg:hidden` existe ✓. El form 2-col en 320px es ajustado pero funcional.
- **Mejoras:**
  1. `pt-10 pb-0` → `pt-20 pb-0 lg:pt-10`
- **Urgencia:** Media.

### Chat Bubble
- **Estado:** Overflow en 320px. Ping animation sin reduced-motion.
- **Mejoras:**
  1. `w-80` → `w-[calc(100vw-48px)] max-w-80`
  2. `animate-ping` → `motion-safe:animate-ping`
- **Urgencia:** Alta (overflow es un bug visual real en ~360px).

---

## 9. Dirección de Diseño Recomendada — Selected Work

### Problema central
El featured card usa `flex flex-col justify-between` con tres zonas:
1. **Top:** Categoría + nombre + status + flecha
2. **Center:** `<div className="hidden lg:flex">` PhotoSpread — **vacío en móvil**
3. **Bottom:** Descripción + stack tags + URL

En móvil, la zona central vacía crea una separación visual incómoda entre el nombre del proyecto y su descripción. El card se ve desproporcionado.

### Recomendación — Featured Card
Cambiar la estructura del featured card en móvil de `justify-between` a `flex flex-col gap-3` eliminando la dependencia del espacio central:

```jsx
// Cambiar en la Link del featured card:
className="group relative flex h-full flex-col gap-4 rounded-2xl bg-background p-4 ring-1 ring-foreground/[0.08] lg:justify-between lg:p-6"
```

Esto colapsa el contenido naturalmente sin hueco vacío. El card se ve más editorial y compacto.

**Adicionalmente:**
- La descripción es larga (~180 chars). En móvil, limitar a 2-3 líneas con `line-clamp-3` y mostrar el texto completo solo en desktop.
- Los 5 stack tags de VieLinks en 320px requieren al menos 3 rows. Considerar `lg:gap-2 gap-1` y limitarlos a 3 en móvil con un `+2 more` truncado.
- El URL `vielinks.com` en `text-[11px]` como tercera línea de metadata es redundante junto al botón de flecha. Puede omitirse en móvil.

### Recomendación — Rest Cards
Los rest cards (InkyTap, InkyTap Quiz) se ven bien en formato horizontal. El principal riesgo es la imagen de InkyTap (`hidden lg:block`) que ya está correctamente oculta en móvil.

Ajuste sugerido: Añadir `mt-2` entre categoría/nombre y la descripción para dar respiro visual, ya que actualmente `mt-auto` empuja el contenido al fondo del card sin padding natural en móvil.

### Dirección visual recomendada
**"Compact portfolio list"** — tres tarjetas verticales, cada una auto-height, sin espacios vacíos, scroll suave sobre el contenido. La primera tarjeta es featured (ring de color en hover, nombre más grande) pero sin pretender ser un "hero" dentro de la sección.

---

## 10. Dirección de Diseño Recomendada — How We Work

### Estado actual
Las tarjetas de proceso móvil están bien estructuradas conceptualmente (icono + número + título + descripción en layout horizontal) pero presentan tres debilidades:

1. **Las tarjetas son visualmente planas** — `bg-foreground/1.5` en dark mode (~#050505 sobre #000000) es imperceptible. Las tarjetas flotan sobre el fondo sin superficie.
2. **El número como metadata en línea con el título** — poner el número a la derecha del título reduce su poder como indicador de progreso. El usuario escanea de izquierda a derecha y el número queda al final.
3. **Los iconos son genéricos para el contexto del producto** — `Search` (Discovery), `PenTool` (Design), `Code2` (Build), `Rocket` (Launch), `TrendingUp` (Scale) son correctos pero comunes.

### Recomendaciones de icono
Mantener los iconos actuales — son los más precisos disponibles en Lucide para el contexto:
- Discovery: `Search` ✓ (podría cambiarse a `Compass` para evocar exploración más que búsqueda)
- Design: `PenTool` ✓
- Build: `Code2` ✓ (o `Layers` para evocar arquitectura full-stack)
- Launch: `Rocket` ✓
- Scale: `TrendingUp` ✓

### Mejoras de layout y tratamiento visual

**Opción A — Refined Card List (mínimo cambio):**
```
bg-foreground/[0.04]        // Superficie visible (de /1.5 a /4)
border-foreground/[0.10]    // Borde más definido
icon box: size-10 rounded-xl border-foreground/[0.12]
número a la izquierda del texto, ENCIMA del título (no en línea)
```

```jsx
// Layout interno mejorado:
<div className="flex gap-3 rounded-2xl border border-foreground/[0.10] bg-foreground/[0.04] p-4">
  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-foreground/[0.12] bg-foreground/[0.06]">
    <Icon className="size-4 text-foreground/60" />
  </div>
  <div className="min-w-0">
    <span className="text-[9px] font-medium tracking-widest text-foreground/25">{s.num}</span>
    <h3 className="text-sm font-semibold text-foreground leading-tight">{s.title}</h3>
    <p className="mt-1 text-[12px] leading-relaxed text-foreground/50">{s.desc}</p>
  </div>
</div>
```

**Opción B — Numbered Rail Timeline (mayor cambio, requiere aprobación):**
Reemplazar las tarjetas por un layout de timeline vertical: una línea vertical a la izquierda conecta los pasos, cada paso tiene el número en un círculo, el título grande y la descripción debajo. Sin bordes de tarjeta — el espacio negativo define la separación. Más editorial, más premium, mejor para este tipo de producto.

```
│ ● 01  Discovery
│      We start by understanding...
│
│ ● 02  Design
│      Wireframes, prototypes...
...
```

**Recomendación final:** Implementar Opción A como quick win inmediato. Presentar Opción B como rediseño futuro para aprobación.

---

## Quick Wins (Bajo Riesgo, Alto Impacto)

Estos cambios son seguros de implementar sin rediseño mayor:

| # | Cambio | Archivo | Impacto |
|---|--------|---------|---------|
| QW-1 | `py-10` → `pt-20 pb-10 lg:py-10` en ServicesSection, AboutSection, TechStackSection, FAQSection, ContactFormSection | `sections.tsx` | Corrige navbar overlap en 5 secciones |
| QW-2 | Chat panel `w-80` → `w-[calc(100vw-48px)] max-w-80` | `chat-bubble.tsx` | Corrige overflow en 320–360px |
| QW-3 | `animate-ping` → `motion-safe:animate-ping` en chat button | `chat-bubble.tsx` | Respeta reduced-motion |
| QW-4 | Añadir `[&::-webkit-scrollbar]:hidden` al overflow-auto de TechStack | `sections.tsx` | Quita scrollbar visible en iOS |
| QW-5 | `bg-foreground/1.5` → `bg-foreground/[0.04]` en process cards móvil | `sections.tsx` | Hace las tarjetas visibles como superficies |
| QW-6 | Stats grid `p-6` → `p-3 lg:p-6` en AboutSection | `sections.tsx` | Más respiro en pantallas pequeñas |
| QW-7 | AboutSection `overflow-hidden` → `overflow-y-auto [&::-webkit-scrollbar]:hidden pb-24` | `sections.tsx` | Evita clipping silencioso |
| QW-8 | ServicesSection `overflow-hidden` → `overflow-y-auto [&::-webkit-scrollbar]:hidden pb-24` | `sections.tsx` | Evita clipping silencioso |

---

## Ideas de Rediseño de Mayor Impacto (Requieren Aprobación)

| # | Idea | Descripción | Impacto | Riesgo |
|---|------|-------------|---------|--------|
| RD-1 | Featured card en móvil: eliminar justify-between | Cambiar a `flex-col gap-4` para eliminar el hueco vacío central | Alto | Bajo |
| RD-2 | FAQ: añadir bloque `lg:hidden` con heading + CTA | Dar contexto y acción a los usuarios de móvil en la sección FAQ | Alto | Bajo |
| RD-3 | About team cards: 1 columna en móvil | `grid-cols-1 sm:grid-cols-2` para mayor legibilidad en 320px | Medio | Bajo |
| RD-4 | Process: Opción B Timeline Vertical | Layout de rail numerado en lugar de tarjetas. Más editorial. | Alto | Medio |
| RD-5 | h-dvh para secciones con scroll interno | Reemplazar `h-screen` por `h-dvh` en Projects y Process (y About) | Medio | Bajo |
| RD-6 | Reducir stagger en móvil | `staggerChildren: 0.1` en móvil via `useReducedMotion` / `!isDesktop` | Medio | Bajo |
| RD-7 | Section labels como `<h2>` semántico | Para accesibilidad por headings sin cambio visual | Bajo visual / Alto a11y | Bajo |
| RD-8 | Contraste dark mode `text-foreground/50` | Elevar a `text-foreground/65` en descripciones o añadir overrides en globals.css | Alto a11y | Bajo |

---

## Notas por Viewport

### 320×568
- Secciones más afectadas: About, Services, FAQ (overlay + clipping)
- Chat panel: overflow ~24px por la izquierda ← **bug real**
- Featured card: muy alto para el viewport sin el PhotoSpread
- Process cards (5): 375px de contenido en ~432px disponibles — ajustado pero funcional con scroll

### 360×640
- Chat panel: borde izquierdo a 16px — funcional pero muy pegado al borde
- About: stats 2-col cramped pero utilizable
- FAQ: sin heading, contexto perdido

### 375×667
- Punto de referencia básico. La mayoría de secciones operan con dignity
- `py-10` en secciones no parcheadas: header a y=40px, navbar a y=56px → ~16px de overlap visible

### 390×844
- La mayor parte del contenido cabe bien verticalmente
- Chat panel en 390px: panel left edge = 390-24-320 = 46px ✓
- Scroll anidado menos problemático — hay más espacio para iniciar gesto fuera del área scrollable

### 414×896
- Viewport confortable para todos los contenidos actuales
- Few concerns beyond the persistent pt-20 fix

### 430×932
- El viewport más generoso de la lista. Todo funciona bien con el padding fix aplicado.

### 1440×900 (Desktop sanity check)
- `lg:py-10` se aplica correctamente en todas las secciones
- `hidden lg:flex` / `hidden lg:grid` activan correctamente
- El bento grid de Process se despliega correctamente con `lg:grid-rows-3`
- PhotoSpread en el featured card es visible y agrega valor visual
- El blur de scroll (blurStyle) solo aplica en desktop ✓
- Chat panel `w-80` es apropiado en desktop (no hay overflow)

---

## Checklist Final de Implementación

### Bloque 1 — Correcciones críticas (implementar primero)
- [ ] **QW-1:** Añadir `pt-20 pb-10 lg:py-10` a ServicesSection, AboutSection, TechStackSection, FAQSection, ContactFormSection
- [ ] **QW-2:** Chat bubble panel responsivo `w-[calc(100vw-48px)] max-w-80`

### Bloque 2 — Quick wins de calidad
- [ ] **QW-3:** `motion-safe:animate-ping` en chat button
- [ ] **QW-4:** `[&::-webkit-scrollbar]:hidden` en TechStack overflow-auto
- [ ] **QW-5:** Process cards `bg-foreground/[0.04]` (de `bg-foreground/1.5`)
- [ ] **QW-6:** About stats `p-3 lg:p-6`
- [ ] **QW-7:** AboutSection overflow → scrollable con pb-24
- [ ] **QW-8:** ServicesSection overflow → scrollable con pb-24

### Bloque 3 — Rediseños de contenido (requieren decisión del equipo)
- [ ] **RD-1:** Featured card `flex-col gap-4` (eliminar hueco central en móvil)
- [ ] **RD-2:** FAQ heading + CTA en móvil
- [ ] **RD-3:** About team cards `grid-cols-1 sm:grid-cols-2`
- [ ] **RD-5:** `h-dvh` en secciones con scroll interno

### Bloque 4 — Accesibilidad y motion (deuda técnica)
- [ ] **RD-6:** Reducir stagger en móvil
- [ ] **RD-7:** Section labels como `<h2>` semántico
- [ ] **RD-8:** Aumentar contraste en descripciones dark mode
- [ ] Verificar `PhotoSpread` en `gallery.tsx` para alt text

---

_Reporte generado por análisis estático de código. No se realizaron capturas de pantalla ni se ejecutó servidor de desarrollo. Para verificación visual completa, abrir en DevTools con viewports listados y confirmar comportamiento de scroll anidado en iOS físico._
