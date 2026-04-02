export const translations = {
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      blog: "Blog",
    },
    hero: {
      available: "Available for new opportunities",
      title: "Silvestre Dourado.",
      subtitle:
        "Front-end Developer crafting modern, high-performance web experiences with precision and creativity.",
      explore: "Explore",
    },
    globe: {
      title1: "Global Vision,",
      title2: "Local Precision.",
      titleMobile: "Global Vision.",
      basedIn: "Based in Lubango, Angola",
      description:
        "I build fast, accessible interfaces with React, TypeScript, and Tailwind CSS. I care about clean architecture, smooth animations, and code that scales. Currently open to remote and hybrid roles.",
      descriptionMobile:
        "Front-end developer focused on React, TypeScript, and Tailwind CSS. Building performant interfaces with clean architecture and attention to detail.",
    },
    about: {
      title: "Beyond the Code.",
      intro:
        "When I'm not building interfaces, I'm solving algorithmic problems. Competitive programming has shaped the way I think — breaking complex problems into clean, efficient solutions. In 2025, my team represented our college at the AOCPC national round, where we earned a podium spot and brought home a medal.",
      galleryTitle: "AOCPC 2025 — National Round",
      galleryDescription:
        "Moments from the Angola Open Collegiate Programming Contest, held at the national level. My team competed against colleges from across the country.",
      achievementsTitle: "Achievements",
      achievementsDescription:
        "Certificates from the AOCPC local rounds at our college.",
      cert1: "1st Place — AOCPC Local Round 2025",
      cert2: "2nd Place — AOCPC Local Round 2024",
      cert3: "Honorable Mention — AOCPC Local Round 2024",
    },
    projects: {
      title: "Selected Works.",
      viewLive: "View Live",
      items: [
        {
          title: "Folio",
          description:
            "A fast, minimal note-taking app built for focus. Organize your thoughts with folders, rich text editing, and instant search — all in a clean distraction-free interface.",
        },
      ],
    },
    skills: {
      title: "Technical Arsenal.",
      frameworks: "Frameworks",
      languages: "Languages",
      styling: "Styling",
      tools: "Tools",
    },
    contact: {
      title: "Let's build<br />something great.",
      description:
        "I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
      button: "Say Hello",
      rights: "All rights reserved.",
    },
    blog: {
      title: "Writing & Thoughts",
      description:
        "Articles, tutorials, and deep dives into frontend architecture, design systems, and modern web technologies.",
      readMore: "Read Article",
      back: "Back to Articles",
    },
  },
  pt: {
    nav: {
      about: "Sobre",
      projects: "Projetos",
      skills: "Habilidades",
      contact: "Contato",
      blog: "Blog",
    },
    hero: {
      available: "Disponível para novas oportunidades",
      title: "Silvestre Dourado.",
      subtitle:
        "Desenvolvedor Front-end criando experiências web modernas e de alta performance com precisão e criatividade.",
      explore: "Explorar",
    },
    globe: {
      title1: "Visão Global,",
      title2: "Precisão Local.",
      titleMobile: "Visão Global.",
      basedIn: "Sediado em Lubango, Angola",
      description:
        "Construo interfaces rápidas e acessíveis com React, TypeScript e Tailwind CSS. Preocupo-me com arquitetura limpa, animações fluidas e código escalável. Atualmente aberto a posições remotas e híbridas.",
      descriptionMobile:
        "Desenvolvedor front-end focado em React, TypeScript e Tailwind CSS. Construindo interfaces performáticas com arquitetura limpa e atenção ao detalhe.",
    },
    about: {
      title: "Além do Código.",
      intro:
        "Quando não estou a construir interfaces, estou a resolver problemas algorítmicos. A programação competitiva moldou a minha forma de pensar — dividir problemas complexos em soluções limpas e eficientes. Em 2025, a minha equipa representou a faculdade na ronda nacional do AOCPC, onde conquistámos um lugar no pódio e trouxemos uma medalha.",
      galleryTitle: "AOCPC 2025 — Ronda Nacional",
      galleryDescription:
        "Momentos do Angola Open Collegiate Programming Contest, realizado a nível nacional. A minha equipa competiu contra faculdades de todo o país.",
      achievementsTitle: "Conquistas",
      achievementsDescription:
        "Certificados das rondas locais do AOCPC na nossa faculdade.",
      cert1: "1º Lugar — Ronda Local AOCPC 2025",
      cert2: "2º Lugar — Ronda Local AOCPC 2024",
      cert3: "Menção Honrosa — Ronda Local AOCPC 2024",
    },
    projects: {
      title: "Projetos Selecionados.",
      viewLive: "Ver ao Vivo",
      items: [
        {
          title: "Folio",
          description:
            "Uma aplicação de notas rápida e minimalista, feita para foco. Organize as suas ideias com pastas, edição de texto enriquecido e pesquisa instantânea — tudo numa interface limpa e sem distrações.",
        },
      ],
    },
    skills: {
      title: "Arsenal Técnico.",
      frameworks: "Frameworks",
      languages: "Linguagens",
      styling: "Estilização",
      tools: "Ferramentas",
    },
    contact: {
      title: "Vamos construir<br />algo incrível.",
      description:
        "Estou atualmente em busca de novas oportunidades. Se você tem uma pergunta ou quer apenas dizer um oi, farei o meu melhor para retornar o contato!",
      button: "Diga Olá",
      rights: "Todos os direitos reservados.",
    },
    blog: {
      title: "Escritos & Pensamentos",
      description:
        "Artigos, tutoriais e análises profundas sobre arquitetura frontend, design systems e tecnologias web modernas.",
      readMore: "Ler Artigo",
      back: "Voltar para os Artigos",
    },
  },
};

export type Language = "en" | "pt";
export type TranslationOutput = (typeof translations)["en"];
