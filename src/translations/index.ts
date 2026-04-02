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
        "I build fast, accessible interfaces with React, TypeScript, and Tailwind CSS — from fintech dashboards to e-commerce platforms. I care about clean architecture, smooth animations, and code that scales. Currently open to remote and hybrid roles.",
      descriptionMobile:
        "Front-end developer focused on React, TypeScript, and Tailwind CSS. Building performant interfaces with clean architecture and attention to detail.",
    },
    projects: {
      title: "Selected Works.",
      viewAll: "View all projects",
      items: [
        {
          title: "Fintech Dashboard",
          description:
            "A modern financial dashboard with real-time data visualization and secure transactions.",
        },
        {
          title: "E-Commerce Platform",
          description:
            "A scalable e-commerce solution built for high-performance mobile and desktop shopping.",
        },
        {
          title: "AI Productivity Tool",
          description:
            "Smart task management application integrating LLM APIs for automated organization.",
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
        "Construo interfaces rápidas e acessíveis com React, TypeScript e Tailwind CSS — de painéis fintech a plataformas e-commerce. Preocupo-me com arquitetura limpa, animações fluidas e código escalável. Atualmente aberto a posições remotas e híbridas.",
      descriptionMobile:
        "Desenvolvedor front-end focado em React, TypeScript e Tailwind CSS. Construindo interfaces performáticas com arquitetura limpa e atenção ao detalhe.",
    },
    projects: {
      title: "Projetos Selecionados.",
      viewAll: "Ver todos os projetos",
      items: [
        {
          title: "Painel Fintech",
          description:
            "Um painel financeiro moderno com visualização de dados em tempo real e transações seguras.",
        },
        {
          title: "Plataforma E-Commerce",
          description:
            "Uma solução de e-commerce escalável desenvolvida para compras em alta performance no mobile e desktop.",
        },
        {
          title: "Ferramenta de Produtividade com IA",
          description:
            "Aplicação de gerenciamento inteligente de tarefas integrando APIs de LLMs para organização automatizada.",
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
