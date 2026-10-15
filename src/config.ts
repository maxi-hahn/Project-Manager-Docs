export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface CtaItem {
  label: string;
  href: string;
}

export interface SectionItem {
  id?: string;
  title: string;
  content?: string;
}

export interface InstallStep {
  label: string;
  command: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface Config {
  name: string;
  tagline: string;
  description: string;
  version: string;
  github: string;
  releases: string;
  templatesRepo: string;
  nav: NavItem[];
  hero: {
    badge?: string;
    title: string;
    subtitle: string;
    primaryCta: CtaItem;
    secondaryCta?: CtaItem | null;
  };
  sections: SectionItem[];
  install: {
    title: string;
    steps: InstallStep[];
  };
  features: FeatureItem[];
  notify: {
    enabled: boolean;
    endpoint: string;
    title: string;
    description: string;
    checkboxLabel: string;
    emailPlaceholder: string;
    submitLabel: string;
    successMessage: string;
    errorMessage: string;
  };
  footer: {
    text: string;
    links: FooterLink[];
  };
}

export const config: Config = {
  name: "Project Manager",
  tagline: "Automatizá la creación de proyectos",
  description:
    "Herramienta de escritorio con GUI que genera proyectos listos para programar a partir de templates, tools y features.",
  version: "0.4.0",
  github: "https://github.com/maxi-hahn/project-manager",
  releases: "https://github.com/maxi-hahn/project-manager/releases",
  templatesRepo: "https://github.com/maxi-hahn/Project-manager-templates",

  nav: [
    { label: "Inicio", href: "/" },
    { label: "Conceptos", href: "/conceptos" },
    { label: "Templates", href: "/templates" },
    { label: "Changelog", href: "/changelog" },
    { label: "GitHub", href: "https://github.com/maxi-hahn/project-manager", external: true },
  ],

  hero: {
    badge: "v0.4.0",
    title: "Automatizá la creación de proyectos",
    subtitle:
      "Elegís un template, agregás las herramientas que necesitás y Project Manager genera el proyecto listo para programar.",
    primaryCta: {
      label: "Descargar",
      href: "https://github.com/maxi-hahn/project-manager/releases",
    },
    secondaryCta: {
      label: "Ver en GitHub",
      href: "https://github.com/maxi-hahn/project-manager",
    },
  },

  sections: [
    {
      id: "que-es",
      title: "¿Qué es Project Manager?",
      content:
        "Project Manager es una herramienta de escritorio con interfaz gráfica que automatiza la creación inicial de proyectos. En lugar de crear manualmente carpetas, archivos base, entornos virtuales y configuraciones, elegís un template, agregás las tools y features que quieras, y el proyecto queda listo para empezar a programar.",
    },
    {
      id: "por-que",
      title: "¿Por qué usarlo?",
      content:
        "Si arrancás proyectos seguido, escribir la misma estructura de carpetas y archivos una y otra vez es trabajo repetitivo. Project Manager centraliza esa configuración en templates reutilizables y permite combinarlos con herramientas opcionales según el proyecto.",
    },
  ],

  install: {
    title: "Instalación",
    steps: [
      {
        label: "Opción 1 — Ejecutable (recomendado)",
        command:
          "1. Descargar ProjectManager-vX.Y.Z.zip desde Releases\n2. Descomprimir en una carpeta\n3. Crear acceso directo a ProjectManager.exe\n4. Doble click para abrir",
      },
      {
        label: "Opción 2 — Clonar el repo",
        command:
          "git clone https://github.com/maxi-hahn/project-manager.git\ncd project-manager\npip install -r requirements.txt\npython gui.py",
      },
      {
        label: "Templates oficiales",
        command:
          "En la GUI: Ajustes → Carpeta de recursos → \"Descargar templates oficiales\"\n\nO manualmente:\ngit clone https://github.com/maxi-hahn/Project-manager-templates.git",
      },
    ],
  },

  features: [
    {
      title: "Wizard de 4 pasos",
      description:
        "Nombre y ubicación, template, configuración opcional, resumen. Todo desde la GUI.",
    },
    {
      title: "Preview en vivo",
      description:
        "El árbol de carpetas del proyecto se actualiza en tiempo real mientras configurás.",
    },
    {
      title: "Templates reutilizables",
      description:
        "Python, FastAPI, React, Vite, C#, Astro y más. Cada template es una carpeta con metadata.",
    },
    {
      title: "Tools y features opcionales",
      description:
        "Agregá testing, linters, Docker, Tailwind, React Router, i18n y más según el proyecto.",
    },
    {
      title: "Multi-runtime",
      description:
        "Soporte para Python, Node.js y .NET. Crea el entorno virtual o instala dependencias automáticamente.",
    },
    {
      title: "Integración con GitHub",
      description:
        "Creación automática de repositorios vía GitHub CLI (opcional).",
    },
  ],

  notify: {
    enabled: true,
    endpoint: "",
    title: "Notificaciones",
    description: "Recibí un correo cuando salga una nueva versión o template.",
    checkboxLabel: "Quiero recibir un correo cuando haya actualizaciones",
    emailPlaceholder: "tu@email.com",
    submitLabel: "Suscribirme",
    successMessage: "¡Listo! Te avisaremos cuando haya novedades.",
    errorMessage: "Hubo un error. Intentá de nuevo.",
  },

  footer: {
    text: "Project Manager · MIT · Máximo Hahn",
    links: [
      { label: "GitHub", href: "https://github.com/maxi-hahn/project-manager" },
      { label: "Releases", href: "https://github.com/maxi-hahn/project-manager/releases" },
      { label: "Issues", href: "https://github.com/maxi-hahn/project-manager/issues" },
      { label: "Templates", href: "https://github.com/maxi-hahn/Project-manager-templates" },
    ],
  },
};

/**
 * Lee la última release de GitHub.
 * Si falla, devuelve config.version.
 */
export async function getLatestVersion(): Promise<string> {
  try {
    const repo = config.github.replace("https://github.com/", "");
    const res = await fetch(
      `https://api.github.com/repos/${repo}/releases/latest`,
      { headers: { "User-Agent": "astro-docs" } }
    );
    if (!res.ok) return config.version;
    const data = await res.json();
    return String(data.tag_name ?? config.version).replace(/^v/, "");
  } catch {
    return config.version;
  }
}