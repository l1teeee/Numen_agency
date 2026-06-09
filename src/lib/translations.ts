export type Lang = 'en' | 'es'

const en = {
  nav: {
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Work',     href: '#work'     },
      { label: 'About',   href: '#about'    },
      { label: 'Stack',   href: '#stack'    },
      { label: 'Process', href: '#process'  },
      { label: 'FAQ',     href: '#faq'      },
    ],
    contact: "Let's Talk",
  },
  hero: {
    headline: 'From Idea to Production in Weeks.',
    subline:
      'Numen is a digital product studio from El Salvador. We build full-stack apps, SaaS platforms, and AI-powered tools — with the speed of a startup and the craft of a senior team.',
    cta1: 'View Our Work',
    cta2: "Let's Talk",
    scroll: 'Scroll to explore ↓',
  },
  services: {
    label: 'What We Do',
    items: [
      {
        title: 'Web Development',
        desc: 'Full-stack applications built with Next.js, TypeScript, and Supabase. From zero-to-one MVPs to production-grade SaaS — fast, scalable, and maintainable from day one.',
      },
      {
        title: 'Product Design',
        desc: 'End-to-end design in Figma: user flows, wireframes, interactive prototypes, and production-ready design systems. Pixel-perfect and accessible across every screen.',
      },
      {
        title: 'AI Integration',
        desc: 'Embed intelligence into your product — conversational AI, semantic search, content automation, and smart recommendations — powered by the latest frontier models.',
      },
      {
        title: 'DevOps & Infrastructure',
        desc: 'Production-ready deployments across AWS, GCP, and Kubernetes. Multi-cloud SRE setups, CI/CD automation, service mesh configuration, and secure infrastructure-as-code with Terraform. Zero-downtime deployments, monitoring, and incident response.',
      },
    ],
  },
  projects: {
    label: 'Selected Work',
    items: [
      {
        name: 'VieLinks',
        category: 'Platform · 2026',
        desc: 'Social media management SaaS with OAuth integrations (Meta, Instagram, LinkedIn). Multi-channel publishing, real-time metrics dashboard, and automated workflow orchestration. Used by digital professionals worldwide.',
      },
      {
        name: 'ScoutIA',
        category: 'Platform · 2026',
        desc: 'Local business prospecting workspace — search by zone and category, review signals, save prospects, and organize follow-up from one place.',
      },
      {
        name: 'InkyTap',
        category: 'Web App · 2026',
        desc: '"Historias para descubrir." A curated story library for Spanish readers — browse 15+ genres from fiction to biography, filter by reading time, and find your next great read.',
      },
    ],
  },
  liveProjects: {
    label: 'Live Now',
    headline1: 'Products live',
    headline2: 'in production.',
    subtext: 'Every project below is deployed, serving real users, and actively maintained by our team.',
  },
  about: {
    label: 'About Numen',
    headline1: 'A small team that builds',
    headline2: 'great digital products.',
    p1: 'Numen was founded with one mission: build digital products that actually work. We combine design thinking with engineering precision to deliver software that scales and experiences that people love.',
    p2: "Based in El Salvador, working fully remote with clients worldwide. We move fast, communicate clearly, and treat every project like it's our own product.",
    stats: [
      { label: 'Projects delivered' },
      { label: 'Years of experience' },
      { label: 'Products live in production' },
      { label: 'Max response time' },
    ],
    team: [
      { desc: 'Founder of Numen. Leads product vision, design direction, and project execution — from concept to launch.' },
      { desc: 'Handles domain services, infrastructure, and deployment. Keeps the systems running so the products can ship.' },
    ],
    principles: [
      { title: 'Ship fast',        desc: 'We deliver working software in weeks, not months. Momentum beats perfection every time.' },
      { title: 'Outcome-focused', desc: 'We measure success by results — conversion rates, retention, revenue — not by hours billed.' },
      { title: 'Zero lock-in',    desc: 'Clean code, full documentation, and a clean handoff. You own everything we build, always.' },
    ],
  },
  stack: {
    label: 'Our Stack',
    headline1: 'Tools we trust',
    headline2: 'to build with.',
    capabilities: {
      'UI Layer': 'UI Layer',
      'Data': 'Data',
      'Intelligence': 'Intelligence',
      'Revenue': 'Revenue',
      'Workflow': 'Workflow',
      'Infrastructure & DevOps': 'Infrastructure & DevOps',
    },
  },
  process: {
    label: 'How We Work',
    steps: [
      {
        title: 'Discovery',
        desc: 'We start by understanding your goals, users, and constraints. Deep dive into the problem space before writing a single line of code.',
        extra: 'From user research and competitor analysis to technical requirements and project scope — we leave nothing to assumptions before development begins.',
      },
      {
        title: 'Design',
        desc: 'Wireframes, prototypes and design systems built in Figma. We validate ideas early so nothing is left to chance during development.',
        extra: 'Every screen is designed for real users — accessible, responsive, and aligned with your brand from day one.',
      },
      {
        title: 'Build',
        desc: 'Full-stack development with CI/CD pipelines, infrastructure automation, and production monitoring from day one.',
        extra: '',
      },
      {
        title: 'Launch',
        desc: 'Deploy with confidence. We handle infrastructure setup, CI/CD pipelines, and go-live checklists.',
        extra: 'We set up monitoring, error tracking, and analytics — then stay close for the first weeks post-launch.',
      },
      {
        title: 'Scale',
        desc: 'Continuous iteration, performance tuning, and new features. We stay by your side long after launch.',
        extra: 'From A/B testing to infrastructure scaling — we treat your product as a living system, not a finished deliverable.',
      },
    ],
    stepsListDesc: [
      'We start by understanding your goals, users, and constraints. Deep dive into the problem space before writing a single line of code.',
      'Wireframes, prototypes and design systems built in Figma. We validate ideas early so nothing is left to chance during development.',
      'Full-stack development with CI/CD pipelines, infrastructure automation, and production monitoring from day one.',
      'Deploy with confidence. We set up monitoring, analytics and documentation, then stay close for the first weeks post-launch.',
      'Continuous iteration, performance tuning, and growth features. We stay by your side long after launch to make sure the product thrives.',
    ],
  },
  faq: {
    label: 'FAQ',
    headline1: 'Common',
    headline2: 'questions,',
    headline3: 'answered.',
    subtext: "Not finding what you're looking for? Use the AI assistant at the bottom right or send us a message.",
    cta: 'Start a project',
    items: [
      { q: 'What does Numen do?',           a: 'Numen is a digital product agency that designs and builds full-stack web applications, SaaS platforms, and AI-powered tools. We work end to end — from discovery and design to development and launch.' },
      { q: 'How much does a project cost?', a: 'Projects start at under $5k for focused scopes and scale to $50k+ for complex SaaS or enterprise platforms. After a quick discovery call we give you a transparent estimate with no surprises.' },
      { q: 'How long does a typical project take?', a: 'A focused MVP typically ships in 4–8 weeks. More complex products with multiple modules and design systems take 10–16 weeks. We give you a realistic timeline upfront.' },
      { q: 'Do you work with international clients?', a: "Yes. We're based in El Salvador and work fully remote with clients worldwide. We adapt our schedule to overlap with your timezone for key meetings and demos." },
      { q: 'What technologies do you use?', a: 'Our primary stack is Next.js, TypeScript, Tailwind CSS, Supabase, and PostgreSQL. For AI we use OpenAI and Anthropic APIs. For design, Figma. We pick tools that are battle-tested and give your team a clean foundation.' },
      { q: 'Do you provide support after launch?', a: 'Yes. We stay close during the first weeks post-launch and offer ongoing maintenance, monitoring, and feature iteration. Many clients continue on a retainer after the initial build.' },
      { q: 'How do I start a project with you?', a: "Fill out the contact form below or email contact@delta-numen.com. We'll schedule a 30-minute discovery call to understand your goals, then send a detailed proposal within a few days." },
    ],
  },
  contact: {
    label: 'Start a Project',
    headline1: "Let's build something",
    headline2: 'great together.',
    subtext: "Tell us about your project. We'll get back to you within 24 hours with thoughts and next steps.",
    infoLabels: { basedIn: 'Based in', availability: 'Availability' },
    infoValues: { basedIn: 'El Salvador · Remote worldwide', availability: 'Open to new projects' },
    nameLabel: 'Name *',
    emailLabel: 'Email *',
    budgetLabel: 'Budget range',
    budgetPlaceholder: 'Select a range',
    budgetOptions: [
      { value: 'under1k', label: 'Under $1k' },
      { value: '1-5k',    label: '$1k – $5k' },
      { value: '5-10k',   label: '$5k – $10k' },
      { value: '10k+',    label: '$10k+' },
    ],
    messageLabel: 'Tell us about your project *',
    messagePlaceholder: "We're looking to build...",
    sendBtn: 'Send message',
    sendingBtn: 'Sending...',
    successTitle: 'Message sent!',
    successDesc: "We'll get back to you within 24 hours.",
    errorMsg: 'Something went wrong. Please try again or email us at contact@delta-numen.com.',
    footer: 'All rights reserved.',
  },
}

const es: typeof en = {
  nav: {
    links: [
      { label: 'Servicios', href: '#services' },
      { label: 'Trabajo',   href: '#work'     },
      { label: 'Nosotros', href: '#about'    },
      { label: 'Stack',    href: '#stack'    },
      { label: 'Proceso',  href: '#process'  },
      { label: 'FAQ',      href: '#faq'      },
    ],
    contact: 'Hablemos',
  },
  hero: {
    headline: 'De la Idea a Producción en Semanas.',
    subline:
      'Numen es un estudio de producto digital de El Salvador. Construimos apps full-stack, plataformas SaaS y herramientas con IA — con la velocidad de una startup y la calidad de un equipo senior.',
    cta1: 'Ver Nuestro Trabajo',
    cta2: 'Hablemos',
    scroll: 'Explora ↓',
  },
  services: {
    label: 'Qué Hacemos',
    items: [
      {
        title: 'Desarrollo Web',
        desc: 'Aplicaciones full-stack con Next.js, TypeScript y Supabase. Desde MVPs hasta SaaS de producción — rápidos, escalables y mantenibles desde el primer día.',
      },
      {
        title: 'Diseño de Producto',
        desc: 'Diseño end-to-end en Figma: flujos de usuario, wireframes, prototipos interactivos y sistemas de diseño listos para producción. Pixel-perfect y accesible en cada pantalla.',
      },
      {
        title: 'Integración de IA',
        desc: 'Integra inteligencia en tu producto — IA conversacional, búsqueda semántica, automatización de contenido y recomendaciones inteligentes — impulsadas por los últimos modelos frontier.',
      },
      {
        title: 'DevOps e Infraestructura',
        desc: 'Despliegues en producción en AWS, GCP y Kubernetes. Configuraciones SRE multi-cloud, automatización CI/CD, service mesh y infraestructura como código con Terraform. Zero-downtime, monitoreo y respuesta a incidentes.',
      },
    ],
  },
  projects: {
    label: 'Proyectos Seleccionados',
    items: [
      {
        name: 'VieLinks',
        category: 'Plataforma · 2026',
        desc: 'SaaS de gestión de redes sociales con integraciones OAuth (Meta, Instagram, LinkedIn). Publicación multicanal, dashboard de métricas en tiempo real y orquestación de flujos automatizados. Usado por profesionales digitales en todo el mundo.',
      },
      {
        name: 'ScoutIA',
        category: 'Plataforma · 2026',
        desc: 'Workspace de prospección de negocios locales — busca por zona y categoría, revisa señales, guarda prospectos y organiza el seguimiento desde un solo lugar.',
      },
      {
        name: 'InkyTap',
        category: 'App Web · 2026',
        desc: '"Historias para descubrir." Una biblioteca curada para lectores hispanohablantes — explora más de 15 géneros, filtra por tiempo de lectura y encuentra tu próxima gran historia.',
      },
    ],
  },
  liveProjects: {
    label: 'En Producción',
    headline1: 'Productos activos',
    headline2: 'en producción.',
    subtext: 'Cada proyecto a continuación está desplegado, sirve a usuarios reales y es mantenido activamente por nuestro equipo.',
  },
  about: {
    label: 'Sobre Numen',
    headline1: 'Un equipo pequeño que construye',
    headline2: 'grandes productos digitales.',
    p1: 'Numen fue fundado con una misión: construir productos digitales que realmente funcionen. Combinamos pensamiento de diseño con precisión de ingeniería para entregar software que escala y experiencias que la gente ama.',
    p2: 'Con base en El Salvador, trabajamos 100% remoto con clientes en todo el mundo. Nos movemos rápido, comunicamos con claridad y tratamos cada proyecto como si fuera nuestro propio producto.',
    stats: [
      { label: 'Proyectos entregados' },
      { label: 'Años de experiencia' },
      { label: 'Productos en producción' },
      { label: 'Tiempo máx. de respuesta' },
    ],
    team: [
      { desc: 'Fundador de Numen. Lidera la visión del producto, la dirección de diseño y la ejecución de proyectos — del concepto al lanzamiento.' },
      { desc: 'Gestiona los servicios de dominio, infraestructura y despliegue. Mantiene los sistemas funcionando para que los productos puedan lanzarse.' },
    ],
    principles: [
      { title: 'Enviamos rápido',       desc: 'Entregamos software funcional en semanas, no meses. El impulso supera a la perfección siempre.' },
      { title: 'Enfocados en resultados', desc: 'Medimos el éxito en resultados — tasas de conversión, retención, ingresos — no en horas facturadas.' },
      { title: 'Sin dependencias',      desc: 'Código limpio, documentación completa y entrega ordenada. Tú eres dueño de todo lo que construimos, siempre.' },
    ],
  },
  stack: {
    label: 'Nuestro Stack',
    headline1: 'Herramientas en las que',
    headline2: 'confiamos para construir.',
    capabilities: {
      'UI Layer': 'Capa UI',
      'Data': 'Datos',
      'Intelligence': 'Inteligencia',
      'Revenue': 'Facturación',
      'Workflow': 'Flujo de trabajo',
      'Infrastructure & DevOps': 'Infraestructura y DevOps',
    },
  },
  process: {
    label: 'Cómo Trabajamos',
    steps: [
      {
        title: 'Descubrimiento',
        desc: 'Empezamos entendiendo tus objetivos, usuarios y restricciones. Inmersión profunda en el problema antes de escribir una sola línea de código.',
        extra: 'Desde investigación de usuarios y análisis competitivo hasta requerimientos técnicos y alcance del proyecto — no dejamos nada a suposiciones antes de comenzar el desarrollo.',
      },
      {
        title: 'Diseño',
        desc: 'Wireframes, prototipos y sistemas de diseño construidos en Figma. Validamos ideas temprano para que nada quede al azar durante el desarrollo.',
        extra: 'Cada pantalla está diseñada para usuarios reales — accesible, responsiva y alineada con tu marca desde el primer día.',
      },
      {
        title: 'Desarrollo',
        desc: 'Desarrollo full-stack con pipelines CI/CD, automatización de infraestructura y monitoreo en producción desde el primer día.',
        extra: '',
      },
      {
        title: 'Lanzamiento',
        desc: 'Despliega con confianza. Nos encargamos de la configuración de infraestructura, pipelines CI/CD y checklists de go-live.',
        extra: 'Configuramos monitoreo, seguimiento de errores y analíticas — y nos mantenemos cerca durante las primeras semanas post-lanzamiento.',
      },
      {
        title: 'Escalar',
        desc: 'Iteración continua, optimización de rendimiento y nuevas funcionalidades. Permanecemos a tu lado mucho después del lanzamiento.',
        extra: 'Desde pruebas A/B hasta escalado de infraestructura — tratamos tu producto como un sistema vivo, no como un entregable terminado.',
      },
    ],
    stepsListDesc: [
      'Empezamos entendiendo tus objetivos, usuarios y restricciones. Inmersión profunda en el problema antes de escribir una sola línea de código.',
      'Wireframes, prototipos y sistemas de diseño construidos en Figma. Validamos ideas temprano para que nada quede al azar durante el desarrollo.',
      'Desarrollo full-stack con pipelines CI/CD, automatización de infraestructura y monitoreo en producción desde el primer día.',
      'Despliega con confianza. Configuramos monitoreo, analíticas y documentación, y nos mantenemos cerca las primeras semanas post-lanzamiento.',
      'Iteración continua, optimización de rendimiento y funcionalidades de crecimiento. Permanecemos a tu lado mucho después del lanzamiento para asegurar que el producto prospere.',
    ],
  },
  faq: {
    label: 'FAQ',
    headline1: 'Preguntas',
    headline2: 'frecuentes,',
    headline3: 'respondidas.',
    subtext: '¿No encuentras lo que buscas? Usa el asistente IA en la esquina inferior derecha o escríbenos.',
    cta: 'Iniciar un proyecto',
    items: [
      { q: '¿Qué hace Numen?',              a: 'Numen es una agencia de producto digital que diseña y construye aplicaciones web full-stack, plataformas SaaS y herramientas con IA. Trabajamos de principio a fin — desde el descubrimiento y diseño hasta el desarrollo y lanzamiento.' },
      { q: '¿Cuánto cuesta un proyecto?',   a: 'Los proyectos comienzan en menos de $5k para alcances enfocados y escalan hasta $50k+ para plataformas SaaS o empresariales complejas. Tras una llamada de descubrimiento te damos una estimación transparente sin sorpresas.' },
      { q: '¿Cuánto tarda un proyecto típico?', a: 'Un MVP enfocado generalmente se entrega en 4–8 semanas. Productos más complejos con múltiples módulos y sistemas de diseño toman 10–16 semanas. Te damos un timeline realista desde el inicio.' },
      { q: '¿Trabajan con clientes internacionales?', a: 'Sí. Tenemos base en El Salvador y trabajamos 100% remoto con clientes en todo el mundo. Adaptamos nuestro horario para coincidir con tu zona horaria en reuniones clave y demos.' },
      { q: '¿Qué tecnologías usan?', a: 'Nuestro stack principal es Next.js, TypeScript, Tailwind CSS, Supabase y PostgreSQL. Para IA usamos las APIs de OpenAI y Anthropic. Para diseño, Figma. Elegimos herramientas probadas que le dan a tu equipo una base limpia.' },
      { q: '¿Ofrecen soporte después del lanzamiento?', a: 'Sí. Permanecemos cerca durante las primeras semanas post-lanzamiento y ofrecemos mantenimiento continuo, monitoreo e iteración de funcionalidades. Muchos clientes continúan con un retainer tras el build inicial.' },
      { q: '¿Cómo inicio un proyecto con ustedes?', a: 'Completa el formulario de contacto o escríbenos a contact@delta-numen.com. Agendaremos una llamada de descubrimiento de 30 minutos para entender tus objetivos y te enviaremos una propuesta detallada en pocos días.' },
    ],
  },
  contact: {
    label: 'Iniciar un Proyecto',
    headline1: 'Construyamos algo',
    headline2: 'increíble juntos.',
    subtext: 'Cuéntanos sobre tu proyecto. Te responderemos en 24 horas con ideas y próximos pasos.',
    infoLabels: { basedIn: 'Ubicación', availability: 'Disponibilidad' },
    infoValues: { basedIn: 'El Salvador · Remoto en todo el mundo', availability: 'Disponibles para nuevos proyectos' },
    nameLabel: 'Nombre *',
    emailLabel: 'Correo *',
    budgetLabel: 'Presupuesto estimado',
    budgetPlaceholder: 'Selecciona un rango',
    budgetOptions: [
      { value: 'under1k', label: 'Menos de $1k' },
      { value: '1-5k',    label: '$1k – $5k' },
      { value: '5-10k',   label: '$5k – $10k' },
      { value: '10k+',    label: '$10k+' },
    ],
    messageLabel: 'Cuéntanos sobre tu proyecto *',
    messagePlaceholder: 'Queremos construir...',
    sendBtn: 'Enviar mensaje',
    sendingBtn: 'Enviando...',
    successTitle: '¡Mensaje enviado!',
    successDesc: 'Te responderemos en 24 horas.',
    errorMsg: 'Algo salió mal. Intenta de nuevo o escríbenos a contact@delta-numen.com.',
    footer: 'Todos los derechos reservados.',
  },
}

export const translations: Record<Lang, typeof en> = { en, es }
export type Translations = typeof en
