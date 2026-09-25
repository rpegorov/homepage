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
    heading: 'Works',
    items: {
      atomMind: {
        title: 'AtomMind',
        description:
          'The AtomMind industrial digitalization platform offers optimal parameters and operating modes of equipment to reduce the proportion of finished products that do not meet established standards, as well as visualizes the production process and notifies users of parameter deviations.'
      },
      flameApp: {
        title: 'FlameApp',
        description:
          'A mobile dating app. A quick search for a partner of interest using artificial intelligence to verify identity and filter fake photos.'
      },
      tezishApp: {
        title: 'Tezish App',
        description:
          'A mobile application for quick job search for low-skilled employees. Search for employees.'
      },
      hrCrm: {
        title: 'HrCrm',
        description: 'The system for personnel management of the enterprise.'
      },
      frontiers: {
        title: 'Frontiers',
        description:
          'A system for law enforcement agencies of the city of Moscow.'
      },
      etalon: {
        title: 'Etalon',
        description: 'Website business card of the evaluation organization.'
      },
      drafta: {
        title: 'Drafta',
        description:
          'A Markdown note-taking app for developers. Focused writing environment with a CodeMirror 6 editor, revision history, notebooks, tags, and iCloud sync support.'
      },
      infodiode: {
        title: 'Istok',
        description:
          'A load testing system for one-way data transfer through a hardware data diode. Supports MQTT, TCP, Modbus TCP, OPC UA, and SFTP with no feedback channel.'
      },
      keel: {
        title: 'Keel',
        description:
          'A web CRM for foreign trade operations (client → manager → declarant) built around depersonalization as a core property: the manager never sees which declarant handles a case, and the declarant never sees the client. Enforced by the server and by physically separate databases, not by hiding UI fields.'
      },
      ruslo: {
        title: 'Ruslo',
        description:
          "An industrial IIoT platform that ingests equipment telemetry over MQTT, HTTP, Modbus TCP and OPC UA, models the plant as a navigable tree, and stores time series in ClickHouse with automatic aggregates. Deployed entirely inside the plant's closed network, with no cloud dependency or internet access at runtime."
      },
      echo: {
        title: 'Echo',
        description:
          'A native macOS menu-bar system monitor with CPU, RAM, disk and network gauges, drill-down charts, a tiling window manager, clipboard history, and quick system utilities.'
      },
      helm: {
        title: 'Helm',
        description:
          'A task management and documentation application for macOS. Features include task management, document creation, export capabilities, and support for various file formats.'
      }
    }
  },

  workDetail: {
    atomMind: {
      title: 'AtomMind',
      p1: 'The AtomMind industrial digitalization platform offers optimal parameters and operating modes of equipment to reduce the proportion of finished products that do not meet established standards, as well as visualizes the production process and notifies users of parameter deviations.',
      platform: 'Windows/Linux',
      stack: 'Java, Golang, Angular',
      role: 'Role in the project: Team Leader, then Architect; now Tech Lead and Architect.',
      websiteText: 'https://www.tvel.ru/',
      alt1: 'AtomMind',
      alt2: 'AtomMind'
    },
    drafta: {
      title: 'Drafta',
      p1: 'Drafta is a Markdown note-taking application for developers, built for macOS. It features a CodeMirror 6-powered editor embedded in a native SwiftUI app, with syntax highlighting for Markdown and 50+ programming languages, split editor/preview mode, revision history, notebooks with hierarchy, a tag system with custom colors, and typography customization. Designed as a focused writing environment — inspired by Bear and Inkdrop — with iCloud Drive sync support.',
      platform: 'macOS',
      stack: 'Swift, SwiftUI, CodeMirror 6, TypeScript, esbuild',
      websiteText: 'drafta.org',
      alt: 'Drafta',
      altEditor:
        'Drafta — the editor: Markdown with a Mermaid diagram, notebooks, statuses and tags',
      altPreview:
        'Drafta — preview of the same note with the rendered diagram and checklist'
    },
    echo: {
      title: 'Echo',
      p1: 'Echo is a native macOS menu-bar system monitor. It displays live CPU, RAM, disk and network readings in a compact popover with ring gauges, and lets you drill into per-metric detail windows that show historical charts and top-10 process/file lists. Beyond monitoring, Echo bundles a tiling window manager with global hotkeys and drag-to-snap, a clipboard history panel (text, images, files — stored in memory only), and quick utilities such as Keyboard Cleaning, Prevent Sleep and disk cleanup. The app is energy-aware: monitoring pauses when no window is open, during system sleep, and throttles automatically in Low Power Mode.',
      platform: 'macOS 26.1+',
      stack: 'Swift 6, SwiftUI, Swift Concurrency (actors)',
      alt1: 'Echo — menu bar popover',
      alt2: 'Echo — CPU detail with live chart and top processes',
      alt3: 'Echo — Network detail with throughput and averages',
      alt4: 'Echo — Preferences'
    },
    etalon: {
      title: 'Website business card of the evaluation organization.',
      p1: 'Implemented a website for a partner company that evaluates cars after road accidents. He designed the pages and designed a new logo for the organization. Filled it with content.',
      stack: 'AstroJs',
      websiteText: 'https://www.etalon11.ru/',
      alt: 'Etalon'
    },
    flameApp: {
      title: 'A mobile dating app.',
      p1: 'Role in the project: Team Leader, Backend developer.',
      p2: 'About the project: a mobile dating app, similar to Tinder.',
      p3: 'Team: 4 developers',
      p4: 'Responsibilities: Redesigned the application architecture. Organized the work of the Agile team. Setting tasks. Code review. Conducting a Daily. Checking the quality of completed tasks. Training of new employees. Preparation of technical documentation. I set the code style. Preparation of project documentation. Implemented the back part of the admin panel. Changed the structure of the back part of the application. Divided the monolith into microservices. Implemented back and front interaction methods. Set up the development server. Deployed the back and front parts on the server. I wrote configs for deploying applications — nginx, dockercompose. Set up continuous integration of changes via GitHub Actions (pipeline)',
      stack: 'Express.js, Nest.js, Vue, Vite, PrismaORM, Kafka, Rabbit MQ',
      platform: 'iOS/ Android / Web',
      alt1: 'FlameApp',
      alt2: 'FlameApp'
    },
    frontiers: {
      title:
        'The decision support system for the Ministry of Internal Affairs.',
      p1: 'Role in the project: Backend developer.',
      p2: 'About the project: The decision support system for the Ministry of Internal Affairs.',
      p3: 'Responsibilities: Assessment of the time complexity of tasks. Task decomposition. Introduction of new functionality. Integration with external services. Refactoring existing code. Application architecture design and refactoring. Preparation of technical documentation.',
      stack:
        'Java 8 - 11, Spring Boot, Spring Data, Spring Cloude, Spring Config, Spring Securuty, PostgreSQL, Feing client, Liquibase, JUnit 5, Hybernate',
      alt: 'Frontiers'
    },
    helm: {
      title: 'Helm',
      p1: 'Helm is a native macOS workspace for managing projects and their documentation in one place. Its document editor is the core experience, complemented by tasks, Gantt charts, risks, project planning, and export to common file formats.',
      platform: 'macOS',
      stack: 'Swift 6, SwiftUI, Swift Concurrency, TextKit 2',
      alt1: 'Helm — project workspace',
      alt2: 'Helm — document editor',
      alt3: 'Helm — project planning',
      alt4: 'Helm — task management',
      alt5: 'Helm — Gantt chart',
      alt6: 'Helm — project overview'
    },
    hrCrm: {
      title: 'The system for personnel management of the enterprise.',
      p1: 'Role in the project: Senior Backend developer.',
      p2: 'About the project: a personnel management system for the enterprise — records of candidates and employees, resumes collected from corporate email, and correspondence with candidates conducted from the system itself.',
      p3: 'Responsibilities: Assessment of the time complexity of tasks. Task decomposition. Introduction of new functionality. Integration with external services. Refactoring existing code. Application architecture design and refactoring. Preparation of technical documentation.',
      p4: "Implemented integration with Telegram, WhatsApp. I did a corporate email search with automatic uploading of applicants' resumes and entering the data into the enterprise Database. Implemented end-to-end chat in messengers from the main system.",
      stack:
        'PHP 7.4, Express.JS, PHP Admin Panel, Bitrix-orm, MySQL, PostgreSQL',
      alt: 'HrCrm'
    },
    infodiode: {
      title: 'Istok',
      p1: 'A two-service load testing system for validating one-way data transfer through a hardware data diode. The sender generates and transmits test data; the recipient validates integrity, measures latency, and tracks packet loss — with no feedback channel between them, mirroring real diode constraints.',
      p2: 'Supports five protocols across two groups: MQTT, TCP, and SFTP for bulk data transfer, and Modbus TCP / OPC UA for industrial telemetry (N machines × M indicators × F Hz). Each message carries a SHA-256 checksum and timestamp for end-to-end validation without a return path. Built as static musl binaries targeting Astra Linux SE.',
      platform: 'Linux (Astra Linux SE, x86_64)',
      stack: 'Rust, Tokio, MQTT, Modbus TCP, OPC UA, SFTP',
      moreInfoText: 'istok.craftzman.ru',
      alt: 'Istok'
    },
    keel: {
      title: 'Keel',
      p1: 'Keel is a web-based CRM for foreign trade operations, covering the client → manager → customs declarant process. Its defining property is depersonalization as part of the product itself: a manager knows the client but never which declarant is handling a given case, and a declarant knows the case but never the client — enforced by the server and by physically separate databases, not by hiding fields in the UI.',
      p2: 'Beyond the CRM core (roles, client cards with controlled PII access, cases with SLAs), the product covers task management with Kanban boards, Gantt scheduling and time tracking, a block-based document editor with DOCX/PDF export, and channel integrations for messaging with clients over Telegram, email and WhatsApp.',
      platform: 'Web, self-hosted single-tenant deployment',
      stack: 'Rust (axum, sqlx), Vue 3 + TypeScript, Postgres, S3',
      moreInfoText: 'keel.craftzman.ru'
    },
    ruslo: {
      title: 'Ruslo',
      p1: 'Ruslo is an industrial IIoT platform that collects equipment telemetry from a factory floor, stores it, and shows it to engineers with threshold alerting. It ingests data over four independent channels — MQTT, HTTP, Modbus TCP and OPC UA — using the source timestamp rather than poll time, and models the plant as a tree (plant → shop → area → machine → indicator) with access scoped per branch.',
      p2: "Time series are stored in ClickHouse with automatic minute/hour aggregates and tiered retention. The interface adds 2.5D shop-floor mnemonic diagrams, threshold notifications with a delivery log, and pluggable third-party extension modules that install as packages and appear in the UI without a rebuild. The whole platform deploys inside the plant's closed network — no cloud dependency, no third-party licenses, and no internet access at runtime.",
      platform: 'On-premises, air-gapped deployment',
      stack: 'Rust, Vue 3, Postgres, ClickHouse, MQTT',
      moreInfoText: 'ruslo.craftzman.ru'
    },
    tezishApp: {
      title: 'A mobile application for quick job search.',
      p1: 'Role in the project: Team Leader, Backend developer.',
      p2: 'About the project: A mobile application for quick job search for low-skilled employees. Search for employees.',
      p3: 'Team: 3 developers.',
      p4: 'Responsibilities: For the first part of the time, I served as Team Lead, selected developers and designers. Conducted an interview. Organized the work of the Agile team. Task decomposition, sprint planning, and control over deadlines and task quality. Preparation of technical specifications for third-party contractors, monitoring the execution of tasks. After the appearance of the project manager, I started developing. Implementation of new functionality in php: - implementation of automatic deletion of the user account - implementation of the favorites by vacancies section - implementation of the possibility of adding vacancies from the mobile application - implementation of receiving and viewing job reviews from the applicant Dividing the back part of the application into separate services based on Nest.JS . Other responsibilities: - GitLab deployment and configuration - job moderation - maintaining technical support for users',
      stack: 'PHP 8.1, Doctrine, Express.JS, Nest.JS, TypOrm',
      websiteText: 'https://www.tezish.me/',
      platform: 'iOS, Android',
      alt1: 'TezishApp',
      alt2: 'TezishApp'
    }
  }
}

export default en
