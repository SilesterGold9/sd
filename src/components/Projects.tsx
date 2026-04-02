import { motion } from "framer-motion";
import { ExternalLink, MonitorPlay, Smartphone } from "lucide-react";
import { GithubIcon } from "./Icons";
import { cn } from "../utils/cn";

import { useLanguage } from "../context/LanguageContext";

export function Projects() {
  const { t } = useLanguage();

  const projects = t.projects.items.map((item, i) => ({
    ...item,
    tags:
      i === 0
        ? ["Next.js", "Tailwind CSS", "Framer Motion"]
        : i === 1
          ? ["React", "TypeScript", "Stripe"]
          : ["Vite", "React", "OpenAI API"],
    icon: i === 1 ? Smartphone : MonitorPlay,
    link: "#",
    github: "#",
  }));

  return (
    <section id="projects" className="py-24 bg-bg">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:flex justify-between items-end"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-heading mb-4">
              {t.projects.title}
            </h2>
            <div className="w-20 h-1 bg-accent-strong rounded-full" />
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-accent hover:text-accent-strong font-mono transition-colors group"
          >
            {t.projects.viewAll}
            <span className="transform transition-transform group-hover:translate-x-1">
              -&gt;
            </span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className={cn(
                "group relative p-8 glass rounded-2xl overflow-hidden transition-all duration-300",
                "hover:border-accent/30 ",
              )}
            >
              <div className="flex justify-between items-start mb-8 text-muted group-hover:text-accent transition-colors">
                <project.icon size={32} strokeWidth={1.5} />
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className="hover:text-heading transition-colors"
                    aria-label="Github"
                  >
                    <GithubIcon size={20} />
                  </a>
                  <a
                    href={project.link}
                    className="hover:text-heading transition-colors"
                    aria-label="Live link"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <h3 className="text-2xl font-bold font-display text-heading mb-3">
                {project.title}
              </h3>
              <p className="text-muted mb-8 font-sans leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono text-body bg-surface rounded-full border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
