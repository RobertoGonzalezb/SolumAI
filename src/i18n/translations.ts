export type Lang = 'es' | 'en'

export interface ActCopy {
  eyebrow: string
  headline: string
  body?: string
  bullets?: string[]
  counters?: { key: string; label: string }[]
  cta?: string
  fineprint?: string
}

export interface Translation {
  nav: { cta: string }
  actRail: string[]
  acts: ActCopy[]
  caseStudy: {
    eyebrow: string
    meta: string
    headline: string
    labels: [string, string, string]
    problem: string
    approach: string
    result: string
    linkLabel: string
  }
  contact: {
    eyebrow: string
    heading: string
    sub: string
    directPrefix: string
  }
}

export const translations: Record<Lang, Translation> = {
  es: {
    nav: { cta: 'Agendar llamada' },
    actRail: ['Problema', 'Sistema', 'Automatización', 'Webs y apps', 'Empezar'],
    acts: [
      {
        eyebrow: '01 · El problema',
        headline: 'Tu negocio no tiene un problema de esfuerzo. Tiene un problema de piezas sueltas.',
        counters: [
          { key: 'tools', label: 'Herramientas que\nno se hablan' },
          { key: 'hours', label: 'Horas/semana en\ntareas repetidas' },
        ],
      },
      {
        eyebrow: '02 · La respuesta',
        headline: 'Las unimos en un solo sistema, y ese sistema tiene un dueño: nosotros.',
        body: 'Diagnóstico, construcción y mantenimiento en un mismo contrato. Nada de tres proveedores culpándose entre ellos.',
      },
      {
        eyebrow: '03 · Automatización con IA',
        headline: 'Quitamos de tu día el trabajo que una máquina ya puede hacer.',
        bullets: [
          'Presupuestos, facturas y seguimientos que se escriben solos',
          'Atención al cliente 24/7 con tu tono, no con el de un robot',
          'Tus herramientas actuales conectadas entre sí, sin cambiarlas',
        ],
      },
      {
        eyebrow: '04 · Webs y apps',
        headline: 'Y construimos el producto donde vive tu negocio.',
        bullets: [
          'Web que explica lo que vendes y capta al que ya está listo',
          'App interna para que tu equipo deje de trabajar en hojas de cálculo',
          'Todo sobre el mismo sistema, no como islas separadas',
        ],
      },
      {
        eyebrow: '05 · Empezar',
        headline: 'Diagnóstico gratuito. Te decimos qué automatizar primero.',
        counters: [{ key: 'days', label: 'Días hasta el\nprimer proceso vivo' }],
        cta: 'Pedir diagnóstico',
        fineprint: 'Cifras de ejemplo — sustituir por datos reales.',
      },
    ],
    caseStudy: {
      eyebrow: 'Caso de estudio',
      meta: 'Vida Salud · Asesoría independiente de Isapre · Santiago, Chile',
      headline:
        'Cómo Vida Salud pasó de no tener sitio web a un sistema que capta y organiza cada cotización sola.',
      labels: ['El problema', 'El enfoque', 'El resultado'],
      problem:
        'Vida Salud es la asesoría de Viviana Joustra, con más de 20 años de trayectoria en seguros de salud. Dependía por completo de referidos y contacto directo — sin sitio propio, no había forma de captar una cotización fuera de una llamada o un mensaje.',
      approach:
        'Construimos vidasaludisapre.cl desde cero, con un flujo de cotización pensado para que un visitante deje sus datos en menos de un minuto. Conectamos ese flujo a las herramientas que ella ya usaba para gestionar clientes, para que cada solicitud llegue organizada al lugar correcto — no perdida entre WhatsApp, correo y notas sueltas.',
      result:
        'Hoy cada cotización se captura y organiza sola, sin que Viviana tenga que perseguir nada a mano. Y el cambio no es solo operativo: un sitio bien construido cambia cómo una asesora independiente se percibe frente a un cliente que está comparando opciones — de una recomendación de boca en boca a una práctica que se ve establecida y seria.',
      linkLabel: 'Ver el sitio:',
    },
    contact: {
      eyebrow: 'Contacto',
      heading: 'Agenda tu diagnóstico gratuito',
      sub: '30 minutos para ver dónde tu negocio está perdiendo tiempo y qué automatizar primero. Sin compromiso.',
      directPrefix: '¿Prefieres escribir?',
    },
  },
  en: {
    nav: { cta: 'Book a call' },
    actRail: ['Problem', 'System', 'Automation', 'Websites & apps', 'Get started'],
    acts: [
      {
        eyebrow: '01 · The problem',
        headline: "Your business doesn't have an effort problem. It has a loose-pieces problem.",
        counters: [
          { key: 'tools', label: "Tools that don't\ntalk to each other" },
          { key: 'hours', label: 'Hours/week on\nrepetitive tasks' },
        ],
      },
      {
        eyebrow: '02 · The answer',
        headline: 'We bring it into one system, and that system has one owner: us.',
        body: 'Diagnosis, build, and maintenance under one contract. No three vendors pointing fingers at each other.',
      },
      {
        eyebrow: '03 · AI automation',
        headline: 'We take off your plate the work a machine can already do.',
        bullets: [
          'Quotes, invoices, and follow-ups that write themselves',
          "24/7 customer service in your tone, not a robot's",
          "Your current tools connected to each other — no need to replace them",
        ],
      },
      {
        eyebrow: '04 · Websites and apps',
        headline: 'And we build the product where your business lives.',
        bullets: [
          "A website that explains what you sell and converts who's ready",
          'An internal app so your team stops working in spreadsheets',
          'Everything on the same system, not separate islands',
        ],
      },
      {
        eyebrow: '05 · Get started',
        headline: 'Free diagnostic. We tell you what to automate first.',
        counters: [{ key: 'days', label: 'Days to your\nfirst live process' }],
        cta: 'Request diagnostic',
        fineprint: 'Example figures — to be replaced with real data.',
      },
    ],
    caseStudy: {
      eyebrow: 'Case study',
      meta: 'Vida Salud · Independent health insurance advisory · Santiago, Chile',
      headline:
        'How Vida Salud went from no website to a system that captures and organizes every quote request on its own.',
      labels: ['The problem', 'The approach', 'The result'],
      problem:
        "Vida Salud is Viviana Joustra's advisory practice, with over 20 years of experience in health insurance. She depended entirely on referrals and direct contact — with no website of her own, there was no way to capture a quote request outside of a call or a message.",
      approach:
        'We built vidasaludisapre.cl from scratch, with a quote flow designed for a visitor to leave their details in under a minute. We connected that flow to the tools she already used to manage clients, so every request lands organized in the right place — not lost between WhatsApp, email, and scattered notes.',
      result:
        "Today every quote request is captured and organized on its own, with nothing for Viviana to chase by hand. And the change isn't just operational: a well-built website changes how an independent advisor comes across to a client who's comparing options — from a word-of-mouth recommendation to a practice that looks established and serious.",
      linkLabel: 'View the site:',
    },
    contact: {
      eyebrow: 'Contact',
      heading: 'Book your free diagnostic',
      sub: "30 minutes to see where your business is losing time and what to automate first. No commitment.",
      directPrefix: 'Prefer to write?',
    },
  },
}
