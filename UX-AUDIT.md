# UX/UI Audit — Numen Agency Site
_Evaluacion senior: 7.5 / 10_

---

## Problemas criticos

### 1. FAQ dice "boutique" (BLOCKER)
- **Archivo:** `src/components/blocks/sections.tsx` linea 710
- **Problema:** La respuesta a "What does Numen do?" sigue diciendo _"We are a boutique digital product studio..."_ — el usuario pidio explicitamente remover ese termino de todo el sitio.
- **Fix:** Reescribir esa respuesta del FAQ sin usar "boutique".

---

## Problemas altos

### 2. Formulario de contacto sin accesibilidad de labels
- **Archivo:** `src/components/blocks/sections.tsx` — `ContactFormSection`
- **Problema:** Los `<label>` no tienen `htmlFor` y los `<input>` / `<textarea>` no tienen `id`. Hacer click en el label no hace focus al campo. Screen readers no pueden asociar labels con inputs. Es un friction point real en conversion.
- **Fix:** Agregar `id` a cada input/textarea y `htmlFor` correspondiente a cada label.

### 3. Solo 3 proyectos, dos son el mismo producto
- **Archivo:** `src/components/blocks/sections.tsx` — array `projects`
- **Problema:** VieLinks, InkyTap, InkyTap Quiz — los dos ultimos son variantes de la misma marca. Para una agencia cuyo pitch es "we ship products", 3 proyectos con ese nivel de repeticion no convence a potenciales clientes.
- **Fix:** Agregar al menos 1-2 proyectos mas al array, o mejorar las descripciones para que cada uno cuente una historia diferente de valor.

---

## Problemas medios

### 4. Hero demasiado generico
- **Archivo:** `src/components/blocks/hero-section.tsx`
- **Problema:** "We Build Digital Products" es lo que dice el 80% de las agencias. No hay diferenciador concreto. La sublinea tampoco menciona lo que los hace distintos: equipo pequeno, rapidos, desde El Salvador, precio accesible.
- **Fix:** Actualizar el `<h1>` y el parrafo descriptivo con un hook mas especifico y diferenciador.

### 5. Team cards sin rostros humanos
- **Archivo:** `src/components/blocks/sections.tsx` — `AboutSection`
- **Problema:** Las cards de equipo muestran un placeholder oscuro con las iniciales casi invisibles. Para una agencia de 2 personas donde el cliente contrata _a esas personas_, no mostrar fotos es una perdida de confianza enorme.
- **Fix:** Agregar fotos reales (`/team/julian.jpg`, `/team/igmer.jpg`) o mejorar el placeholder con un diseno mas intencional si no se tienen fotos.

---

## Problemas bajos

### 6. Copyright desactualizado
- **Archivo:** `src/components/blocks/sections.tsx` lineas 998 y 1009
- **Problema:** Dice "© 2025 Numen. All rights reserved." — estamos en 2026.
- **Fix:** Cambiar a 2026 o hacerlo dinamico con `new Date().getFullYear()`.

### 7. Tech stack: multiples requests a CDN externo
- **Archivo:** `src/components/blocks/sections.tsx` — `TechStackSection`
- **Problema:** Los iconos se cargan desde `cdn.jsdelivr.net/npm/simple-icons@v13/icons/*.svg` — son 20+ requests HTTP individuales en tiempo de carga. Puede causar flashes y afecta performance.
- **Fix:** Descargar los SVGs localmente a `/public/icons/` o usar un sprite SVG, eliminando las dependencias externas.

### 8. Stats con numeros poco creibles
- **Archivo:** `src/components/blocks/sections.tsx` — `AboutSection`
- **Problema:** "10+ Projects delivered" y "10+ Years of experience" usan el mismo numero y sufijo. Se ven autogenerados. No generan confianza.
- **Fix:** Usar numeros mas especificos y diferenciados, o cambiar las etiquetas para que sean mas verificables.

---

## Resumen de scores

| Area | Nota |
|---|---|
| Diseno visual y sistema de tokens | 8.5 |
| Scroll UX y navegacion | 9.0 |
| Animaciones y microinteracciones | 7.5 |
| Contenido y copywriting | 5.5 |
| Accesibilidad | 5.0 |
| Portafolio y social proof | 5.0 |
| Performance (icons CDN) | 7.0 |
| **Total** | **7.5** |

---

_Para llegar a 9/10: fotos del equipo, hero diferenciador, mas proyectos, fix de labels, y borrar "boutique" del FAQ._
