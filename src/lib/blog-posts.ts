export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  content: string
  en?: {
    title: string
    description: string
    category: string
    content: string
  }
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'guia-elegir-agencia-digital-el-salvador',
    title: 'Cómo Elegir una Agencia Digital en El Salvador: Guía Completa 2025',
    description:
      'Todo lo que necesitas saber antes de contratar una agencia digital en El Salvador: criterios clave, preguntas que hacer, rangos de precios y errores que evitar.',
    date: '2025-05-10',
    readTime: '9 min',
    category: 'Guías',
    en: {
      title: 'How to Choose a Digital Agency in El Salvador: Complete 2025 Guide',
      description: 'Everything you need to know before hiring a digital agency in El Salvador: key criteria, questions to ask, price ranges, and common mistakes to avoid.',
      category: 'Guides',
      content: `## Why Choosing the Right Agency Makes a Difference

Hiring a digital agency is one of the most important decisions for any company looking to grow in the digital market. In El Salvador, the tech ecosystem has matured considerably in recent years, with agencies capable of building world-class products.

However, not all agencies are created equal. The difference between an agency that delivers results and one that consumes your budget without delivering value can mean the success or failure of your digital project.

## Criterion 1: Real Portfolio with Live Production Projects

The first filter you should apply is to verify whether the agency has real projects running in production. Not prototypes, not Figma mockups — actual software serving real users.

Concrete questions to ask:

- Can I see and use the products you've built?
- How many projects do you currently have live?
- What usage metrics do those products have?
- Would your previous clients agree to a reference call?

An agency with 12+ delivered projects and 6 products in production — like Numen Agency — is a clear signal that they know how to take projects from zero to production.

## Criterion 2: Modern and Maintainable Technology Stack

The stack the agency uses will determine how easy it will be to maintain your product in the future. Look for agencies that use technologies with solid ecosystems:

- **Frontend/Fullstack**: Next.js, React, TypeScript
- **Database**: PostgreSQL, Supabase
- **Infrastructure**: AWS, Google Cloud, Vercel
- **Design**: Figma with design systems

Avoid agencies that build everything in WordPress for complex projects, that use obsolete technologies, or that cannot clearly explain why they chose their stack.

## Criterion 3: Clear Discovery and Design Process

The best agencies don't start coding immediately. They have a structured process:

- **Discovery**: understand the problem, the users, and the business objectives
- **Design**: wireframes, prototypes validated before writing code
- **Development**: short iterations with frequent demos
- **Launch**: with go-live checklist, monitoring, and post-launch support

If an agency tells you they can start building tomorrow without understanding the problem well, that's a red flag.

## Price Ranges in El Salvador (2025)

Prices vary depending on complexity, but here are realistic ranges:

- **Landing page / corporate website**: $1,000 - $5,000
- **Functional MVP (4-8 weeks)**: $5,000 - $15,000
- **Complete SaaS with authentication and dashboard**: $15,000 - $50,000+
- **Enterprise platform with integrations**: $50,000+

Be wary of extremely low quotes for complex projects — they typically result in poor-quality code that costs more to fix later.

## Key Questions You Should Ask

Before signing any contract, ask these questions:

- Who exactly will work on my project and what is their experience?
- How do you handle scope changes during development?
- What happens if the project falls behind schedule? Are there penalties?
- Do I get the code and assets when the project is finished?
- What support do you offer after launch?
- Can you show me code examples from your portfolio?

## Common Mistakes When Hiring an Agency

**Mistake 1: Choosing only by price**
The cheapest vendor almost always turns out to be the most expensive in the long run. Accumulated technical debt can cost 3-5x the initial savings.

**Mistake 2: Not checking references**
Talking with previous clients takes 20 minutes and can save you months of frustration.

**Mistake 3: Contract without clear milestones**
Without milestones with defined deliverables, it's impossible to measure progress and withhold payments if there are problems.

**Mistake 4: Ignoring communication**
An agency that takes days to respond during the sales process will take weeks to respond during development.

**Mistake 5: Not demanding code ownership**
Make sure the contract specifies that you own the code, designs, and all assets when the project is finished.

## How to Evaluate the Technical Proposal

A good technical proposal includes:

- Proposed architecture with justification for each decision
- Time estimates per phase (not just the total)
- Technology stack with concrete reasons
- Deployment plan and staging environment
- Post-launch maintenance strategy

## Take the Next Step

If you're looking for a digital agency in El Salvador with proven experience, Numen Agency combines startup speed with senior team quality. We work with Next.js, TypeScript, Supabase, and the most advanced AI APIs.

You can review our live projects and contact us for a no-cost discovery call. We respond within 24 hours.`,
    },
    content: `## Por Qué Elegir la Agencia Correcta Hace la Diferencia

Contratar una agencia digital es una de las decisiones más importantes para cualquier empresa que quiera crecer en el mercado digital. En El Salvador, el ecosistema tech ha madurado considerablemente en los últimos años, con agencias capaces de construir productos de clase mundial.

Sin embargo, no todas las agencias son iguales. La diferencia entre una agencia que entrega resultados y una que consume tu presupuesto sin entregar valor puede significar el éxito o fracaso de tu proyecto digital.

## Criterio 1: Portafolio Real con Proyectos en Producción

El primer filtro que debes aplicar es revisar si la agencia tiene proyectos reales funcionando en producción. No prototipos, no mockups de Figma — software real sirviendo a usuarios reales.

Preguntas concretas que hacer:

- ¿Puedo ver y usar los productos que han construido?
- ¿Cuántos proyectos tienen live actualmente?
- ¿Qué métricas de uso tienen esos productos?
- ¿Los clientes anteriores aceptarían una llamada de referencia?

Una agencia con 12+ proyectos entregados y 6 productos en producción — como Numen Agency — es una señal clara de que saben llevar proyectos de cero a producción.

## Criterio 2: Stack Tecnológico Moderno y Mantenible

El stack que usa la agencia determinará qué tan fácil será mantener tu producto en el futuro. Busca agencias que usen tecnologías con ecosistemas sólidos:

- **Frontend/Fullstack**: Next.js, React, TypeScript
- **Base de datos**: PostgreSQL, Supabase
- **Infraestructura**: AWS, Google Cloud, Vercel
- **Diseño**: Figma con design systems

Evita agencias que construyen todo en WordPress para proyectos complejos, que usan tecnologías obsoletas, o que no pueden explicar claramente por qué eligieron su stack.

## Criterio 3: Proceso Claro de Discovery y Diseño

Las mejores agencias no arrancan a codear de inmediato. Tienen un proceso estructurado:

- **Discovery**: entender el problema, los usuarios, y los objetivos del negocio
- **Diseño**: wireframes, prototipos validados antes de escribir código
- **Desarrollo**: iteraciones cortas con demos frecuentes
- **Lanzamiento**: con checklist de go-live, monitoreo y soporte post-launch

Si una agencia te dice que puede empezar a construir mañana sin entender bien el problema, es una señal de alerta.

## Rangos de Precios en El Salvador (2025)

Los precios varían según la complejidad, pero aquí tienes rangos reales:

- **Landing page / sitio corporativo**: $1,000 - $5,000
- **MVP funcional (4-8 semanas)**: $5,000 - $15,000
- **SaaS completo con autenticación y dashboard**: $15,000 - $50,000+
- **Plataforma enterprise con integraciones**: $50,000+

Desconfía de presupuestos extremadamente bajos para proyectos complejos — generalmente resultan en código de mala calidad que cuesta más arreglar después.

## Preguntas Clave que Debes Hacer

Antes de firmar cualquier contrato, haz estas preguntas:

- ¿Quién exactamente trabajará en mi proyecto y cuál es su experiencia?
- ¿Cómo manejan los cambios de scope durante el desarrollo?
- ¿Qué pasa si el proyecto se atrasa? ¿Hay penalidades?
- ¿Entrego el código y los assets al finalizar el proyecto?
- ¿Qué soporte ofrecen después del lanzamiento?
- ¿Pueden mostrarme ejemplos de código del portafolio?

## Errores Comunes al Contratar una Agencia

**Error 1: Elegir solo por precio**
El proveedor más barato casi siempre resulta en el más caro a largo plazo. La deuda técnica acumulada puede costar 3-5x el ahorro inicial.

**Error 2: No revisar referencias**
Hablar con clientes anteriores toma 20 minutos y puede ahorrarte meses de frustración.

**Error 3: Contrato sin milestones claros**
Sin hitos con entregables definidos, es imposible medir el progreso y retener pagos si hay problemas.

**Error 4: Ignorar la comunicación**
Una agencia que tarda días en responder durante el proceso de ventas tardará semanas en responder durante el desarrollo.

**Error 5: No pedir ownership del código**
Asegúrate de que el contrato especifique que tú eres el dueño del código, los diseños, y todos los assets al finalizar.

## Cómo Evaluar la Propuesta Técnica

Una buena propuesta técnica incluye:

- Arquitectura propuesta con justificación de cada decisión
- Estimación de tiempos por fase (no solo el total)
- Stack tecnológico con razones concretas
- Plan de deployment y ambiente de staging
- Estrategia de mantenimiento post-lanzamiento

## Da el Siguiente Paso

Si estás buscando una agencia digital en El Salvador con experiencia comprobada, Numen Agency combina velocidad de startup con calidad de equipo senior. Trabajamos con Next.js, TypeScript, Supabase y las APIs de IA más avanzadas.

Puedes revisar nuestros proyectos en producción y contactarnos para una llamada de discovery sin costo. Respondemos en menos de 24 horas.`,
  },
  {
    slug: 'desarrollo-saas-nextjs-supabase',
    title: 'Desarrollo SaaS con Next.js y Supabase: Guía Paso a Paso',
    description:
      'Aprende cómo construir un SaaS moderno usando Next.js, TypeScript y Supabase. Stack, arquitectura, autenticación, base de datos y deployment explicados paso a paso.',
    date: '2025-05-20',
    readTime: '10 min',
    category: 'Desarrollo',
    en: {
      title: 'SaaS Development with Next.js and Supabase: Step-by-Step Guide',
      description: 'Learn how to build a modern SaaS using Next.js, TypeScript, and Supabase. Stack, architecture, authentication, database, and deployment explained step by step.',
      category: 'Development',
      content: `## What is SaaS and Why Now is the Best Time

Software as a Service is the most profitable software distribution model of the digital era. Instead of selling one-time licenses, you charge recurring subscriptions — generating predictable revenue and a scalable business.

With the right stack, a small team can build and launch a competitive SaaS in weeks. Next.js and Supabase have completely democratized building production-grade web products.

## Why Next.js is the Ideal Framework for SaaS

Next.js has become the de facto standard for modern web applications for concrete reasons:

- **App Router**: filesystem-based routing with Server Components for optimal performance
- **Server Actions**: data mutations without manually creating API routes
- **Automatic optimization**: images, fonts, and code splitting out-of-the-box
- **Simple deployment**: Vercel makes deployment happen in minutes with automatic PR previews
- **Native TypeScript**: end-to-end typing from day one

For a SaaS, the combination of server-side rendering for SEO, client-side for interactivity, and API routes for backend logic makes Next.js the most complete option.

## Supabase: The Complete Backend for your SaaS

Supabase provides everything a SaaS needs in a single platform:

- **PostgreSQL**: relational database with JSON support, full-text search, and extensions
- **Auth**: authentication with email, OAuth (Google, GitHub), and magic links
- **Storage**: file storage with included CDN
- **Realtime**: WebSocket subscriptions for real-time data
- **Edge Functions**: serverless logic on Supabase's network
- **Row Level Security**: row-level data access policies

The free tier is generous for development and MVPs. Costs only scale when your product scales.

## Recommended Architecture for a SaaS

A proven architecture for SaaS with Next.js and Supabase has three main layers:

**Presentation Layer (Next.js)**
Server Components for data fetching and SSR, Client Components for interactivity and forms, and Server Actions for data mutations.

**Backend Layer (Supabase)**
PostgreSQL for business data, Auth for users and sessions, Storage for files and assets, and Edge Functions for complex logic.

**Infrastructure Layer**
Vercel for frontend hosting, Supabase Cloud as managed backend, and Resend or Brevo for transactional emails.

## Initial Setup Step by Step

**Step 1: Create the Next.js project**
Start with the official template using npx create-next-app with TypeScript, Tailwind CSS, and App Router flags. This sets up the base project in less than 2 minutes.

**Step 2: Configure Supabase**
Create a project at supabase.com, install the client with the official Supabase SSR package, and configure environment variables with your URL and anon key.

**Step 3: Implement Authentication**
Supabase SSR handles session cookies automatically. The createServerClient helper works in Server Components and createBrowserClient in Client Components. The complete flow takes less than 2 hours to configure.

**Step 4: Design the Database Schema**
Define your tables in the Supabase SQL editor. Start with your core business entities and configure RLS policies from the start — it's much harder to add them later.

**Step 5: Configure Row Level Security**
RLS is the most important security layer. Users can only see their own data, admins can see all data in their organization, and public data is accessible without authentication.

## Payment Management with Stripe

To monetize your SaaS, Stripe is the standard:

- Stripe webhooks update subscription status in Supabase
- Stripe Checkout for payment flow without building your own forms
- Stripe Customer Portal for users to manage their subscription

The recommended pattern: save the stripe_customer_id and subscription_status in your users table in Supabase.

## Deployment and Environments

The deployment strategy for production has three levels:

- **Development**: local with Supabase CLI and Docker to run Supabase locally
- **Staging**: Supabase branch connected to Vercel Preview Deployments
- **Production**: Supabase project in production, deployment on Vercel main branch

Configure environment variables correctly in Vercel for each environment.

## Real Costs of a SaaS in Production

For a SaaS with 100-500 monthly active users:

- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Resend for emails: $0-20/month
- Stripe: 2.9% + $0.30 per transaction
- **Total infrastructure: approx. $50-70/month**

A SaaS with just $50/month in revenue per user covers infrastructure costs with 2 customers.

## Need Help Building your SaaS?

At Numen Agency we've built multiple SaaS platforms with this stack — from 6-week MVPs to enterprise platforms with thousands of users. If you have a SaaS idea and want to get it to production quickly, contact us for a no-cost discovery call.`,
    },
    content: `## Qué es un SaaS y Por Qué Ahora es el Mejor Momento

Software as a Service es el modelo de distribución de software más rentable de la era digital. En lugar de vender licencias únicas, cobras suscripciones recurrentes — lo que genera ingresos predecibles y un negocio escalable.

Con el stack correcto, un equipo pequeño puede construir y lanzar un SaaS competitivo en semanas. Next.js y Supabase han democratizado completamente la construcción de productos web de producción.

## Por Qué Next.js es el Framework Ideal para SaaS

Next.js se ha convertido en el estándar de facto para aplicaciones web modernas por razones concretas:

- **App Router**: enrutamiento basado en el filesystem con Server Components para performance óptimo
- **Server Actions**: mutaciones de datos sin necesidad de crear API routes manualmente
- **Optimización automática**: imágenes, fuentes, y código dividido out-of-the-box
- **Deployment sencillo**: Vercel hace el deployment en minutos con previews automáticos por PR
- **TypeScript nativo**: tipado de extremo a extremo desde el día uno

Para un SaaS, la combinación de rendering server-side para SEO, client-side para interactividad, y API routes para lógica backend hace de Next.js la opción más completa.

## Supabase: El Backend Completo para tu SaaS

Supabase ofrece todo lo que necesita un SaaS en una sola plataforma:

- **PostgreSQL**: base de datos relacional con soporte para JSON, full-text search, y extensiones
- **Auth**: autenticación con email, OAuth (Google, GitHub), y magic links
- **Storage**: almacenamiento de archivos con CDN incluido
- **Realtime**: subscripciones WebSocket para datos en tiempo real
- **Edge Functions**: lógica serverless en la red de Supabase
- **Row Level Security**: políticas de acceso a datos a nivel de fila

El tier gratuito es generoso para development y MVPs. El costo escala solo cuando tu producto escala.

## Arquitectura Recomendada para un SaaS

Una arquitectura probada para SaaS con Next.js y Supabase tiene tres capas principales:

**Capa de presentación (Next.js)**
Server Components para data fetching y SSR, Client Components para interactividad y formularios, y Server Actions para mutaciones de datos.

**Capa de backend (Supabase)**
PostgreSQL para los datos del negocio, Auth para usuarios y sesiones, Storage para archivos y assets, y Edge Functions para lógica compleja.

**Capa de infraestructura**
Vercel para hosting del frontend, Supabase Cloud como backend managed, y Resend o Brevo para emails transaccionales.

## Setup Inicial Paso a Paso

**Paso 1: Crear el proyecto Next.js**
Inicia con el template oficial usando npx create-next-app con las flags de TypeScript, Tailwind CSS y App Router. Esto configura el proyecto base en menos de 2 minutos.

**Paso 2: Configurar Supabase**
Crea un proyecto en supabase.com, instala el cliente con el paquete oficial de Supabase SSR, y configura las variables de entorno con tu URL y anon key.

**Paso 3: Implementar Autenticación**
Supabase SSR maneja las cookies de sesión automáticamente. El helper createServerClient funciona en Server Components y createBrowserClient en Client Components. El flujo completo toma menos de 2 horas en configurar.

**Paso 4: Diseñar el Schema de Base de Datos**
Define tus tablas en el SQL editor de Supabase. Empieza con las entidades core de tu negocio y configura las políticas RLS desde el inicio — es mucho más difícil agregarlas después.

**Paso 5: Configurar Row Level Security**
RLS es la capa de seguridad más importante. Los usuarios solo pueden ver sus propios datos, los admins pueden ver todos los datos de su organización, y los datos públicos son accesibles sin autenticación.

## Gestión de Pagos con Stripe

Para monetizar tu SaaS, Stripe es el estándar:

- Webhooks de Stripe actualizan el estado de suscripción en Supabase
- Stripe Checkout para el flujo de pago sin construir formularios propios
- Stripe Customer Portal para que los usuarios gestionen su suscripción

El patrón recomendado: guarda el stripe_customer_id y subscription_status en tu tabla de usuarios en Supabase.

## Deployment y Ambientes

La estrategia de deployment para producción tiene tres niveles:

- **Development**: local con Supabase CLI y Docker para tener Supabase local
- **Staging**: branch de Supabase conectado a Vercel Preview Deployments
- **Production**: proyecto de Supabase en producción, deployment en Vercel main branch

Configura los environment variables correctamente en Vercel para cada ambiente.

## Costos Reales de un SaaS en Producción

Para un SaaS con 100-500 usuarios activos mensuales:

- Vercel Pro: $20/mes
- Supabase Pro: $25/mes
- Resend para emails: $0-20/mes
- Stripe: 2.9% + $0.30 por transacción
- **Total infraestructura: aprox. $50-70/mes**

Un SaaS con solo $50/mes en ingresos por usuario cubre costos de infraestructura con 2 clientes.

## ¿Necesitas Ayuda para Construir tu SaaS?

En Numen Agency hemos construido múltiples plataformas SaaS con este stack — desde MVPs de 6 semanas hasta plataformas enterprise con miles de usuarios. Si tienes una idea de SaaS y quieres llevarla a producción rápido, contáctanos para una llamada de discovery sin costo.`,
  },
  {
    slug: 'integracion-ia-productos-digitales',
    title: 'Integración de IA en Productos Digitales: Casos de Uso y Stack Técnico',
    description:
      'Cómo integrar inteligencia artificial en tu producto digital. Tipos de IA aplicada, stack técnico con OpenAI y Anthropic, casos de uso reales y consideraciones de costo.',
    date: '2025-06-01',
    readTime: '8 min',
    category: 'IA',
    en: {
      title: 'AI Integration in Digital Products: Use Cases and Technical Stack',
      description: 'How to integrate artificial intelligence into your digital product. Types of applied AI, technical stack with OpenAI and Anthropic, real use cases, and cost considerations.',
      category: 'AI',
      content: `## AI is No Longer Optional: It's a Competitive Advantage

In 2025, integrating AI into a digital product has gone from being a differentiating feature to a user expectation. Products that don't leverage the capabilities of modern language models are leaving significant value on the table.

The good news: integrating AI into an existing product is more accessible than ever. APIs from OpenAI, Anthropic, and Google offer enterprise-level capabilities with pay-as-you-go pricing.

## Types of AI Applied to Digital Products

### Conversational AI (Chatbots and Assistants)

The most common use case: an assistant within your product that can answer questions, guide users, or execute actions.

Real applications:

- Automated customer support with user context
- Guided onboarding for new users
- Search and navigation assistant within the product
- Chat with documents or your own knowledge bases

### Content Generation and Processing

LLMs are extraordinarily good at text tasks:

- Generation of drafts, summaries, and translations
- Information extraction from unstructured text
- Automatic classification and categorization
- Sentiment analysis and feedback

### Semantic Search

Unlike exact keyword search, semantic search understands meaning. With OpenAI embeddings and pgvector in Supabase/PostgreSQL, you can build document search by concept, content recommendation systems for similar items, and candidate or product matching.

### Workflow Automation

AI agents can execute sequences of actions:

- Process incoming emails and create tickets automatically
- Analyze data and generate periodic reports
- Integrate with external APIs to execute actions

## Recommended Technical Stack

For most products, this stack covers 90% of use cases:

**Model APIs**
- **OpenAI GPT-4o**: best cost/capability balance for general tasks
- **Anthropic Claude Sonnet**: superior for document analysis and complex reasoning
- **Google Gemini**: option for very long contexts with large documents

**Integration SDKs**
- **Vercel AI SDK**: the simplest way to integrate AI into Next.js. Supports streaming, tool calls, and multiple providers with the same API.

**Vector Storage**
- **Supabase + pgvector**: if you already use Supabase, this is the simplest option
- **Pinecone**: for dedicated large-scale vector search

**Monitoring**
- **Langfuse**: for observability of LLM calls in production

## Use Cases by Business Type

**E-commerce**: product recommendation assistant based on user history and preferences.

**B2B SaaS**: assistant that answers questions about the user's data within the platform.

**Content platforms**: assisted generation, automatic summaries, and content categorization.

**Professional services**: data extraction from documents, report generation, contract analysis.

**Education**: personalized tutor that adapts explanations to the student's level.

## Real Costs of AI APIs

AI API prices have dropped dramatically:

- **GPT-4o**: $2.50 per million input tokens, $10 per million output tokens
- **Claude 3.5 Sonnet**: $3 per million input tokens, $15 per million output tokens
- **GPT-4o-mini**: $0.15 per million input tokens, $0.60 per million output tokens

For most products, the cost per interaction is between $0.001 and $0.01. A product with 1,000 daily interactions has AI costs of $1-10 per day.

## Considerations Before Integrating

**Data privacy**: review the terms of service of the provider. If you handle sensitive data, consider on-premise models or enterprise contracts.

**Latency**: AI API calls add 500ms-2s of latency. Use streaming to give immediate feedback to the user.

**Variable costs**: AI costs scale with usage. Implement rate limiting and cost monitoring from the start.

**Fallbacks**: design your product to function (even if degraded) if the AI API is unavailable.

## How to Get Started in 2 Weeks

**Week 1**: Define the most impactful use case for your users. Prototype directly with OpenAI's API without additional frameworks. Validate with real users.

**Week 2**: If the prototype works, integrate with Vercel AI SDK into your product. Implement streaming, error handling, and basic logging. Deploy to a percentage of users.

## Integrate AI into Your Product with Numen

At Numen Agency we integrate AI into digital products using the most advanced models from OpenAI and Anthropic. From conversational chatbots to semantic search systems — if you have an idea of how AI can improve your product, let's talk.`,
    },
    content: `## La IA Ya No es Opcional: Es una Ventaja Competitiva

En 2025, integrar IA en un producto digital ha pasado de ser una característica diferenciadora a una expectativa de los usuarios. Los productos que no aprovechan las capacidades de los modelos de lenguaje modernos están dejando valor significativo sobre la mesa.

La buena noticia: integrar IA en un producto existente es más accesible que nunca. Las APIs de OpenAI, Anthropic y Google ofrecen capacidades de nivel empresarial con modelos de pago por uso.

## Tipos de IA Aplicada a Productos Digitales

### IA Conversacional (Chatbots y Asistentes)

El caso de uso más común: un asistente dentro de tu producto que puede responder preguntas, guiar usuarios, o ejecutar acciones.

Aplicaciones reales:

- Soporte al cliente automatizado con contexto del usuario
- Onboarding guiado para nuevos usuarios
- Asistente de búsqueda y navegación dentro del producto
- Chat con documentos o bases de conocimiento propias

### Generación y Procesamiento de Contenido

Los LLMs son extraordinariamente buenos para tareas de texto:

- Generación de borradores, resúmenes, y traducciones
- Extracción de información estructurada de texto no estructurado
- Clasificación y categorización automática
- Análisis de sentimiento y feedback

### Búsqueda Semántica

A diferencia de la búsqueda por keywords exactas, la búsqueda semántica entiende el significado. Con embeddings de OpenAI y pgvector en Supabase/PostgreSQL, puedes construir búsqueda de documentos por concepto, sistemas de recomendación de contenido similar, y matching de candidatos o productos.

### Automatización de Flujos de Trabajo

Los agentes de IA pueden ejecutar secuencias de acciones:

- Procesar emails entrantes y crear tickets automáticamente
- Analizar datos y generar reportes periódicos
- Integrar con APIs externas para ejecutar acciones

## Stack Técnico Recomendado

Para la mayoría de productos, este stack cubre el 90% de los casos de uso:

**APIs de Modelos**
- **OpenAI GPT-4o**: mejor balance costo/capacidad para tareas generales
- **Anthropic Claude Sonnet**: superior para análisis de documentos y razonamiento complejo
- **Google Gemini**: opción para contextos muy largos con documentos grandes

**SDK de Integración**
- **Vercel AI SDK**: la forma más sencilla de integrar IA en Next.js. Soporta streaming, tool calls, y múltiples providers con la misma API.

**Almacenamiento Vectorial**
- **Supabase + pgvector**: si ya usas Supabase, esta es la opción más sencilla
- **Pinecone**: para búsqueda vectorial a gran escala dedicada

**Monitoreo**
- **Langfuse**: para observabilidad de llamadas a LLMs en producción

## Casos de Uso por Tipo de Negocio

**E-commerce**: asistente de recomendación de productos basado en historial y preferencias del usuario.

**SaaS B2B**: asistente que responde preguntas sobre los datos del usuario dentro de la plataforma.

**Plataformas de contenido**: generación asistida, resúmenes automáticos, y categorización de contenido.

**Servicios profesionales**: extracción de datos de documentos, generación de reportes, análisis de contratos.

**Educación**: tutor personalizado que adapta explicaciones al nivel del estudiante.

## Costos Reales de las APIs de IA

Los precios de las APIs de IA han bajado dramáticamente:

- **GPT-4o**: $2.50 por millón de tokens de entrada, $10 por millón de salida
- **Claude 3.5 Sonnet**: $3 por millón de tokens de entrada, $15 por millón de salida
- **GPT-4o-mini**: $0.15 por millón de tokens de entrada, $0.60 por millón de salida

Para la mayoría de productos, el costo por interacción está entre $0.001 y $0.01. Un producto con 1,000 interacciones diarias tiene costos de IA de $1-10 al día.

## Consideraciones Antes de Integrar

**Privacidad de datos**: revisa los términos de servicio del proveedor. Si manejas datos sensibles, considera modelos on-premise o contratos enterprise.

**Latencia**: las llamadas a APIs de IA agregan 500ms-2s de latencia. Usa streaming para dar feedback inmediato al usuario.

**Costos variables**: los costos de IA escalan con el uso. Implementa rate limiting y monitoreo de costos desde el inicio.

**Fallbacks**: diseña tu producto para funcionar (aunque sea de forma degradada) si la API de IA no está disponible.

## Cómo Empezar en 2 Semanas

**Semana 1**: Define el caso de uso más impactante para tus usuarios. Prototipa con la API de OpenAI directamente sin frameworks adicionales. Valida con usuarios reales.

**Semana 2**: Si el prototipo funciona, integra con Vercel AI SDK en tu producto. Implementa streaming, manejo de errores, y logging básico. Despliega a un porcentaje de usuarios.

## Integra IA en Tu Producto con Numen

En Numen Agency integramos IA en productos digitales usando los modelos más avanzados de OpenAI y Anthropic. Desde chatbots conversacionales hasta sistemas de búsqueda semántica — si tienes una idea de cómo la IA puede mejorar tu producto, hablemos.`,
  },
  {
    slug: 'diseno-productos-digitales-guia',
    title: 'Diseño de Productos Digitales que Convierten: Proceso y Mejores Prácticas',
    description:
      'Guía completa sobre diseño de productos digitales: proceso UX, user research, prototipado en Figma, design systems y métricas que importan.',
    date: '2025-06-08',
    readTime: '8 min',
    category: 'Diseño',
    en: {
      title: 'Designing Digital Products that Convert: Process and Best Practices',
      description: 'Complete guide to digital product design: UX process, user research, Figma prototyping, design systems, and metrics that matter.',
      category: 'Design',
      content: `## Why Design is the Difference Between a Growing Product and One That Fails

Digital product design isn't about making things pretty. It's about creating experiences that help users achieve their goals — and in doing so, achieving your business goals.

A well-designed product converts better, generates fewer support tickets, has higher retention, and gets referrals. A poorly designed product, no matter how well built technically, fails.

## Phase 1: Discovery and User Research

The most common mistake in product design is skipping research and assuming we know what users need. We're almost always wrong.

**User interviews**: talk with 5-8 potential or current users. Ask about their current workflows, their frustrations, and how they solve the problem today. Don't ask what features they want — observe what they're trying to do.

**Competitor analysis**: map existing solutions. What do they do well? Where do they fail? What differentiation opportunities exist?

**User personas**: create 2-3 user profiles with their goals, context, and pain points.

**Jobs to be Done**: identify the core job the user hires the product to do.

## Phase 2: Information Architecture and User Flows

Before opening Figma, map the product structure:

- **App map**: all product screens and how they connect to each other
- **User flows**: the path a user takes to complete the most important tasks
- **Information hierarchy**: what information should be visible on each screen and in what order

This paper or diagram work is the most valuable in the process. Changing it in Figma costs 10x more time than changing it in a sketch.

## Phase 3: Wireframes and Prototyping

**Low-fidelity wireframes**: grids, boxes, and placeholder text. The goal is to validate structure and flows, not aesthetics.

**Medium-fidelity wireframes**: more detail in visual hierarchy, spacing, and typography. Enough detail to test with users.

**Usability testing**: put the prototype in front of 3-5 real users with specific tasks. Observe where they get confused, where they get lost, what they don't understand.

**Iteration**: iterate based on testing before moving to high fidelity. Each iteration in wireframes costs fractions of what it would cost to change in finished design or code.

## Phase 4: High-Fidelity Visual Design in Figma

With validated flows, visual design becomes a task of applying a coherent design system:

**Design tokens**: define colors, typography, spacing, shadows, and border-radius as variables. This ensures consistency and facilitates global changes.

**Components**: build a reusable component library — buttons, inputs, cards, modals, navigation. Each component with its variants and states.

**Grids and layouts**: use consistent 8pt grids. Define layouts for mobile, tablet, and desktop from the start.

**Accessibility**: minimum color contrast 4.5:1 for text, visible focus states, correct heading hierarchy.

## Design Systems: Why They're Essential

A design system is the single source of truth for design and code in your product:

- Designers don't reinvent components on each screen
- Developers have clear specifications and reference components
- Global changes propagate automatically
- Onboarding new team members is much faster

## Design Metrics That Matter

- **Conversion rate**: what percentage of users complete the target action?
- **Time to value**: how long does it take a new user to get value from the product?
- **Form abandonment rate**: at what step do users leave the process?
- **Heatmaps and session recordings**: where do they click? Where do they pause?
- **NPS and CSAT**: how satisfied are users with the experience?

## The Cost of Bad Design

Bad design is more costly than it appears:

- Higher customer acquisition cost due to low conversion
- Higher support cost because users don't know how to use the product
- Higher churn due to frustration
- Higher development cost from design changes in code

Investing in design at the start of a project always has positive ROI.

## Product Design at Numen

At Numen Agency, design isn't an add-on — it's central to every project. We build from initial research through complete design system in Figma, aligned with the code we deliver. If you want to see examples of our design work, check out our projects or contact us.`,
    },
    content: `## Por Qué el Diseño es la Diferencia Entre un Producto que Crece y Uno que no

El diseño de productos digitales no es sobre hacer cosas bonitas. Es sobre crear experiencias que ayuden a los usuarios a lograr sus objetivos — y al hacerlo, lograr los objetivos del negocio.

Un producto bien diseñado convierte mejor, genera menos tickets de soporte, tiene mayor retención, y recibe referencias. Un producto mal diseñado, sin importar qué tan bien esté construido técnicamente, fracasa.

## Fase 1: Discovery y User Research

El error más común en diseño de productos es saltarse el research y asumir que sabemos lo que los usuarios necesitan. Casi siempre estamos equivocados.

**Entrevistas con usuarios**: habla con 5-8 usuarios potenciales o actuales. Pregunta sobre sus flujos de trabajo actuales, sus frustraciones, y cómo resuelven el problema hoy. No preguntes qué features quieren — observa qué intentan hacer.

**Análisis de competidores**: mapea las soluciones existentes. ¿Qué hacen bien? ¿Dónde fallan? ¿Qué oportunidades de diferenciación existen?

**Definición de personas**: crea 2-3 perfiles de usuario con sus objetivos, contexto, y puntos de fricción.

**Jobs to be Done**: identifica el trabajo fundamental que el usuario contrata al producto para hacer.

## Fase 2: Arquitectura de Información y Flujos de Usuario

Antes de abrir Figma, mapea la estructura del producto:

- **App map**: todos los screens del producto y cómo se conectan entre sí
- **User flows**: el camino que recorre un usuario para completar las tareas más importantes
- **Information hierarchy**: qué información debe estar visible en cada screen y en qué orden

Este trabajo en papel o diagrama es el más valioso del proceso. Cambiarlo en Figma cuesta 10x más tiempo que cambiarlo en un boceto.

## Fase 3: Wireframes y Prototipado

**Wireframes de baja fidelidad**: grids, cajas, y texto placeholder. El objetivo es validar la estructura y los flujos, no la estética.

**Wireframes de media fidelidad**: más detalle en jerarquía visual, espaciado, y tipografía. Suficiente detalle para hacer pruebas con usuarios.

**Pruebas de usabilidad**: pon el prototipo frente a 3-5 usuarios reales con tareas específicas. Observa dónde se confunden, dónde se pierden, qué no entienden.

**Iteración**: itera basado en las pruebas antes de pasar a alta fidelidad. Cada iteración en wireframes cuesta fracciones de lo que costaría cambiar en diseño terminado o código.

## Fase 4: Diseño Visual de Alta Fidelidad en Figma

Con los flujos validados, el diseño visual se vuelve una tarea de aplicar un sistema de diseño coherente:

**Tokens de diseño**: define colores, tipografía, espaciado, sombras, y border-radius como variables. Esto garantiza consistencia y facilita cambios globales.

**Componentes**: construye una librería de componentes reutilizables — botones, inputs, cards, modales, navegación. Cada componente con sus variantes y estados.

**Grids y layouts**: usa grids consistentes de 8pt. Define los layouts para mobile, tablet, y desktop desde el inicio.

**Accesibilidad**: contraste de colores mínimo 4.5:1 para texto, estados de focus visibles, jerarquía de headings correcta.

## Design Systems: Por Qué Son Esenciales

Un design system es la fuente de verdad para el diseño y el código de tu producto:

- Los diseñadores no reinventan componentes en cada pantalla
- Los desarrolladores tienen especificaciones claras y componentes de referencia
- Los cambios globales se propagan automáticamente
- El onboarding de nuevos miembros del equipo es mucho más rápido

## Métricas de Diseño que Importan

- **Tasa de conversión**: ¿qué porcentaje de usuarios completan la acción objetivo?
- **Time to value**: ¿cuánto tiempo tarda un nuevo usuario en obtener valor del producto?
- **Tasa de abandono de formularios**: ¿en qué paso los usuarios dejan el proceso?
- **Heatmaps y session recordings**: ¿dónde hacen click? ¿Dónde se detienen?
- **NPS y CSAT**: ¿qué tan satisfechos están los usuarios con la experiencia?

## El Costo del Mal Diseño

El mal diseño es más costoso de lo que parece:

- Mayor costo de adquisición de clientes por baja conversión
- Mayor costo de soporte por usuarios que no saben cómo usar el producto
- Mayor churn por frustración
- Mayor costo de desarrollo por cambios de diseño en código

Invertir en diseño al inicio de un proyecto siempre tiene ROI positivo.

## Diseño de Productos en Numen

En Numen Agency el diseño no es un add-on — es parte central de cada proyecto. Construimos desde el research inicial hasta el design system completo en Figma, alineado con el código que entregamos. Si quieres ver ejemplos de nuestro trabajo de diseño, revisa nuestros proyectos o contáctanos.`,
  },
  {
    slug: 'infraestructura-aws-startups',
    title: 'Infraestructura Escalable en AWS para Startups: Guía de Arquitectura',
    description:
      'Cómo configurar infraestructura escalable en AWS para startups. Servicios clave, arquitectura base, CI/CD, monitoreo y estrategias de optimización de costos.',
    date: '2025-06-11',
    readTime: '9 min',
    category: 'DevOps',
    en: {
      title: 'Scalable Infrastructure on AWS for Startups: Architecture Guide',
      description: 'How to set up scalable infrastructure on AWS for startups. Key services, base architecture, CI/CD, monitoring, and cost optimization strategies.',
      category: 'DevOps',
      content: `## Why AWS Remains the Best Option for Startups

With so many infrastructure options available — GCP, Azure, Vercel, Railway, Render — why does AWS remain the first choice for startups that want to scale?

The answer lies in ecosystem depth. AWS has over 200 mature services, extensive documentation, and the largest community of experienced engineers. When your startup grows and needs specialized services — managed databases, message queues, global CDN, ML — AWS has them all.

And for early-stage startups, the AWS Activate program offers up to $100,000 in credits.

## Base Architecture for a Startup on AWS

A proven architecture for startups with moderate traffic has four layers:

**Presentation Layer**
Route 53 for DNS, CloudFront as global CDN, and S3 for static assets.

**Application Layer**
ECS Fargate for containers without managing servers, Application Load Balancer for traffic distribution, and Auto Scaling to handle demand spikes.

**Data Layer**
Multi-AZ RDS PostgreSQL for production, ElastiCache Redis for caching and sessions, and S3 for file storage.

**Security**
VPC with public and private subnets, Security Groups with least privilege principle, IAM roles instead of static credentials, and AWS Secrets Manager for secrets.

## Key AWS Services for Startups

### ECS Fargate: Containers Without Managing Servers

ECS Fargate is the ideal service for startups: you define your Docker container, specify CPU and memory, and AWS handles the rest. No EC2 instances to patch, no manual capacity planning.

The pricing model is per CPU/hour and memory/hour used — perfect for variable workloads.

### RDS: Managed Database

Amazon RDS for PostgreSQL handles automatic backups, failover, and security patching. For production, use Multi-AZ — the additional cost is small compared to the cost of an outage.

### CloudFront: Global CDN

CloudFront distributes your content from over 400 global edge locations. For a startup in El Salvador with users in LATAM and North America, CloudFront can reduce latency from 300ms to 20ms.

### SQS: Message Queues for Asynchronous Processing

For tasks that don't need an immediate response — email sending, image processing, report generation — SQS decouples processing from the HTTP request. Your API responds in 50ms, the heavy task runs in the background.

## CI/CD with GitHub Actions and AWS

A CI/CD pipeline is non-negotiable for any serious startup.

**On Pull Request**:
- Run unit and integration tests
- Build Docker image
- Automatic deployment to staging environment
- Preview URL in PR comment

**On merge to main**:
- Tests in staging
- Zero-downtime deployment to production (rolling deployment)
- Slack notification with the result

Setup takes 2-4 hours the first time but saves tens of hours of manual deployment each month.

## Infrastructure as Code with Terraform

Never configure infrastructure manually in the AWS console for production. Use Terraform:

- **Reproducibility**: recreate your entire infrastructure in a new account in minutes
- **Version control**: infrastructure changes go through code review
- **Audit**: complete history of all infrastructure changes
- **Multiple environments**: use the same modules for staging and production with different variables

## Monitoring and Alerts in Production

A product in production without monitoring is like flying without instruments. Minimum stack:

**CloudWatch**: infrastructure metrics and centralized logs from all services.

**Sentry**: error tracking in frontend and backend with complete stack traces.

**Uptime Robot or Better Uptime**: availability monitoring every minute with Slack alerts.

Configure alarms for: CPU above 80% for more than 5 minutes, P99 latency above 2 seconds, HTTP 5xx error rate above 1%, and database with less than 20% storage remaining.

## Cost Optimization Strategies

- **Reserved instances**: if you know you need certain capacity, Reserved Instances save 40-70% vs on-demand
- **Savings Plans**: 1-3 year commitment for significant discounts on EC2 and Fargate
- **S3 lifecycle policies**: automatically move objects to cheaper storage after X days
- **Right-sizing**: monitor real CPU/memory usage and adjust instance size
- **Remove unused resources**: review monthly for unassigned Elastic IPs, unattached EBS volumes, old snapshots

## Real Costs for a Startup in Production

Typical architecture for a SaaS with 1,000-5,000 active users:

- ECS Fargate (2 tasks): approx. $60/month
- RDS PostgreSQL Multi-AZ: approx. $100/month
- ElastiCache Redis: approx. $15/month
- CloudFront and S3: approx. $20/month
- Route 53, NAT Gateway, and others: approx. $30/month
- **Total: approx. $225/month**

With AWS Activate Program credits, the first 6-18 months of infrastructure can be free.

## Need Help with your Infrastructure

Setting up AWS infrastructure correctly from the start saves months of migration work later. At Numen Agency we design and maintain AWS infrastructure for startups and growing products.

If you're starting out or migrating your current infrastructure, contact us — we review your current architecture for free and give you concrete recommendations.`,
    },
    content: `## Por Qué AWS Sigue Siendo la Mejor Opción para Startups

Con tantas opciones de infraestructura disponibles — GCP, Azure, Vercel, Railway, Render — ¿por qué AWS sigue siendo la primera opción para startups que quieren escalar?

La respuesta está en la profundidad del ecosistema. AWS tiene más de 200 servicios maduros, documentación extensísima, y la comunidad más grande de ingenieros con experiencia. Cuando tu startup crece y necesita servicios especializados — bases de datos managed, colas de mensajes, CDN global, ML — AWS los tiene todos.

Y para startups en etapa temprana, el AWS Activate program ofrece hasta $100,000 en créditos.

## Arquitectura Base para una Startup en AWS

Una arquitectura probada para startups con tráfico moderado tiene cuatro capas:

**Capa de presentación**
Route 53 para DNS, CloudFront como CDN global, y S3 para assets estáticos.

**Capa de aplicación**
ECS Fargate para contenedores sin gestionar servidores, Application Load Balancer para distribución de tráfico, y Auto Scaling para manejar picos de demanda.

**Capa de datos**
RDS PostgreSQL en Multi-AZ para producción, ElastiCache Redis para caché y sesiones, y S3 para almacenamiento de archivos.

**Seguridad**
VPC con subnets públicas y privadas, Security Groups con principio de mínimo privilegio, IAM roles en lugar de credenciales estáticas, y AWS Secrets Manager para secretos.

## Servicios Clave de AWS para Startups

### ECS Fargate: Contenedores Sin Administrar Servidores

ECS Fargate es el servicio ideal para startups: defines tu contenedor Docker, especificas CPU y memoria, y AWS se encarga del resto. No hay EC2 instances que parchear, no hay capacity planning manual.

El modelo de precios es por CPU/hora y memoria/hora usado — perfecto para cargas variables.

### RDS: Base de Datos Managed

Amazon RDS para PostgreSQL maneja backups automáticos, failover, y patching de seguridad. Para producción, usa Multi-AZ — el costo adicional es pequeño comparado con el costo de una outage.

### CloudFront: CDN Global

CloudFront distribuye tu contenido desde más de 400 edge locations globalmente. Para una startup en El Salvador con usuarios en LATAM y Norteamérica, CloudFront puede reducir la latencia de 300ms a 20ms.

### SQS: Colas de Mensajes para Procesamiento Asíncrono

Para tareas que no necesitan respuesta inmediata — envío de emails, procesamiento de imágenes, generación de reportes — SQS desacopla el procesamiento del request HTTP. Tu API responde en 50ms, la tarea pesada se ejecuta en background.

## CI/CD con GitHub Actions y AWS

Un pipeline de CI/CD es no negociable para cualquier startup seria.

**On Pull Request**:
- Ejecutar tests unitarios e integración
- Build de la imagen Docker
- Deploy automático a ambiente de staging
- Preview URL en el PR comment

**On merge a main**:
- Tests en staging
- Deploy a producción con zero-downtime (rolling deployment)
- Notificación a Slack con el resultado

La configuración toma 2-4 horas la primera vez pero ahorra decenas de horas de deployment manual cada mes.

## Infrastructure as Code con Terraform

Nunca configures infraestructura manualmente en la consola de AWS para producción. Usa Terraform:

- **Reproducibilidad**: recrea toda tu infraestructura en una nueva cuenta en minutos
- **Control de versiones**: los cambios de infraestructura pasan por code review
- **Auditoría**: historial completo de todos los cambios de infraestructura
- **Ambientes múltiples**: usa los mismos módulos para staging y producción con variables diferentes

## Monitoreo y Alertas en Producción

Un producto en producción sin monitoreo es como volar sin instrumentos. Stack mínimo:

**CloudWatch**: métricas de infraestructura y logs centralizados de todos los servicios.

**Sentry**: tracking de errores en el frontend y backend con stack trace completo.

**Uptime Robot o Better Uptime**: monitoreo de disponibilidad cada minuto con alertas a Slack.

Configura alarmas para: CPU mayor al 80% por más de 5 minutos, latencia P99 mayor a 2 segundos, tasa de error HTTP 5xx mayor al 1%, y base de datos con menos del 20% de almacenamiento libre.

## Estrategias de Optimización de Costos

- **Reservas de instancias**: si ya sabes que necesitas cierta capacidad, las Reserved Instances ahorran 40-70% vs on-demand
- **Savings Plans**: compromiso de uso por 1-3 años a cambio de descuentos significativos en EC2 y Fargate
- **Lifecycle policies en S3**: mueve automáticamente objetos a almacenamiento más barato después de X días
- **Right-sizing**: monitorea el uso de CPU/memoria real y ajusta el tamaño de las instancias
- **Eliminar recursos no usados**: revisar mensualmente por Elastic IPs sin asignar, volúmenes EBS sin adjuntar, snapshots antiguos

## Costos Reales para una Startup en Producción

Arquitectura típica para un SaaS con 1,000-5,000 usuarios activos:

- ECS Fargate (2 tasks): aprox. $60/mes
- RDS PostgreSQL Multi-AZ: aprox. $100/mes
- ElastiCache Redis: aprox. $15/mes
- CloudFront y S3: aprox. $20/mes
- Route 53, NAT Gateway, y otros: aprox. $30/mes
- **Total: aprox. $225/mes**

Con créditos del AWS Activate Program, los primeros 6-18 meses de infraestructura pueden ser gratuitos.

## Necesitas Ayuda con tu Infraestructura

Configurar infraestructura AWS correctamente desde el inicio ahorra meses de trabajo de migración después. En Numen Agency diseñamos y mantenemos infraestructura AWS para startups y productos en crecimiento.

Si estás empezando o migrando tu infraestructura actual, contáctanos — revisamos tu arquitectura actual sin costo y te damos recomendaciones concretas.`,
  },
]
