// English dictionary. Add new keys rather than rephrasing existing ones.
// See src/i18n/ru.js for the Russian translation and src/i18n/index.ts for
// the lookup/interpolation logic.
const en = {
  common: {
    nav: {
      works: 'Works',
      blog: 'Blog',
      about: 'About',
      source: 'Source',
      viewSource: 'View Source',
      optionsAria: 'Options'
    },
    themeToggle: {
      ariaLabel: 'Toggle theme'
    },
    langSwitcher: {
      switchToEnglish: 'Switch to English',
      switchToRussian: 'Switch to Russian'
    },
    footer: {
      copyright: '© {{year}} Rostislav Egorov · craftzman · 匠 made by hand'
    },
    meta: {
      platform: 'Platform',
      stack: 'Stack',
      type: 'Type',
      website: 'Website',
      moreInfo: 'More info',
      indiePersonal: 'Indie / Personal'
    },
    legal: {
      termsOfUse: 'Terms of Use',
      privacyPolicy: 'Privacy Policy',
      commerceDisclosures: 'Commerce disclosures'
    }
  },

  seo: {
    siteName: 'craftzman — Rostislav Egorov',
    homeTitle:
      'Rostislav Egorov (craftzman) — software architect and tech lead',
    homeDescription:
      'Rostislav Egorov (craftzman), software architect and tech lead. I build systems that hold the load: industrial telemetry, CRM, infrastructure for AI agents. Rust, Go, Java.',
    worksTitle: 'Works',
    worksDescription:
      'Projects by Rostislav Egorov (craftzman): Ruslo IIoT platform, Keel CRM, Istok data diode test bench, Drafta Markdown editor, AtomMind and more.',
    locale: 'en_US'
  },

  blog: {
    title: 'Blog',
    description:
      'Notes by Rostislav Egorov (craftzman): architecture, Rust and Go, industrial telemetry, AI agents, indie products.',
    empty: 'No posts yet. The first one is on its way.',
    back: 'All posts',
    updated: 'Updated {{date}}',
    machineTranslated: 'Translated automatically from Russian.',
    readOriginal: 'Read the original →',
    otherLanguage: 'Читать по-русски →',
    rss: 'RSS'
  },

  notFound: {
    title: 'Not found',
    body: "The page you're looking for was not found.",
    button: 'Return to home'
  },

  home: {
    heading: 'Rostislav Egorov',
    tagline: 'I build systems that hold the load.',
    work: {
      heading: 'Work',
      body: "Hi, I'm Rostislav — craftzman. I build systems that hold the load: industrial telemetry, CRM, infrastructure for AI agents. Architecture and teams by day; Rust, Go and my own products — Ruslo, Keel, Istok, Drafta — by night. Weekends belong to the forest, a Discovery 3 and a German Shepherd named Katie.",
      button: 'My portfolio'
    },
    bio: {
      heading: 'Bio',
      items: [
        {
          year: '1991',
          text: 'Born in Dniprodzerzhynsk (Kamianske), Ukrainian SSR.'
        },
        {
          year: '2015',
          text: 'I graduated from Saint Petersburg State Forestry University (Russian: Санкт-Петербургский государственный лесотехнический университет им. С. М. Кирова (СПбГЛТУ) engineer by profession.'
        },
        {
          year: '2015',
          text: 'I opened a property valuation firm, worked as a judicial expert, and provided expert assessment services in courts of general jurisdiction and arbitration courts. I established my own judicial practice and began providing case support services in both general jurisdiction and arbitration cases.'
        },
        {
          year: '2018',
          text: 'Completed Java developer courses.'
        },
        {
          year: '2018',
          text: 'Backend developer. First production work in Java and Spring Boot: a decision support system for the Ministry of Internal Affairs. Architecture, external integrations, refactoring.'
        },
        {
          year: '2020',
          text: 'I graduated from the Moscow Financial and Industrial University university and received a master’s degree in law.'
        },
        {
          year: '2021',
          text: 'Senior backend developer. Moved to PHP and Node.js and built a company HR system: CVs are pulled from corporate mail automatically, and candidate chats in Telegram and WhatsApp run inside the system.'
        },
        {
          year: '2023',
          text: 'Team lead and backend developer. Tezish, a job search app: hired the team, extended the PHP 8.1 backend and split it into Nest.js services.'
        },
        {
          year: '2023',
          text: 'Team lead and backend developer. FlameApp, a dating app: broke the monolith into Nest.js microservices with Kafka and RabbitMQ, set up CI on GitHub Actions. A team of four.'
        },
        {
          year: '2024',
          text: 'Team lead, then architect, now tech lead and architect. Industrial automation: AtomMind, in Java and Go, tunes equipment modes to cut defect rates and flags deviations.'
        },
        {
          year: '2024',
          text: 'Author and sole developer of my own products. Started in Swift: Drafta, a Markdown editor for developers on macOS. In 2025, Echo, a menu bar system monitor.'
        },
        {
          year: '2026',
          text: 'Moved to Rust. Ruslo, an IIoT platform: MQTT, Modbus and OPC UA telemetry into ClickHouse. Istok, a test bench for data diodes. Keel, a foreign trade CRM on axum and Vue 3.'
        }
      ]
    },
    love: {
      heading: 'I ♥',
      art: 'Art',
      music: 'Music',
      photography: 'Photography',
      ml: 'Machine Learning',
      campingVlog: 'Camping Vlog'
    },
    web: {
      heading: 'On the web',
      youtubeCaption:
        "My YouTube channel that I recently started and I'm going to make videos about traveling and camping."
    }
  },

  works: {
    heading: 'Works'
  }
}

export default en
