import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

import folioVideo from "../assets/projects/folio/Folio Load.mp4";
import folioOnboard from "../assets/projects/folio/Folio Onboard.png";

const tags = ["React", "TypeScript", "Tailwind CSS", "Vite"];

export function Projects() {
  const { t } = useLanguage();
  const project = t.projects.items[0];

  return (
    <section id="projects" className="py-24 bg-bg">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-heading mb-4">
            {t.projects.title}
          </h2>
          <div className="w-20 h-1 bg-accent-strong rounded-full" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Media column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5 space-y-6"
          >
            {/* Video */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
              <video
                src={folioVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block"
              />
            </div>

            {/* Onboarding screenshot */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
              <img
                src={folioOnboard}
                alt="Folio onboarding screen"
                className="w-full h-auto block"
              />
            </div>
          </motion.div>

          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/5 lg:sticky lg:top-24"
          >
            <h3 className="text-3xl md:text-4xl font-bold font-display text-heading mb-4">
              {project.title}
            </h3>

            <p className="text-lg text-muted font-sans leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono text-body bg-surface rounded-full border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="https://folio-sil.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold font-mono text-white bg-accent-strong rounded-full hover:bg-accent-strong/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_var(--color-glow-strong)] hover:shadow-[0_0_30px_var(--color-glow-strong)]"
            >
              {t.projects.viewLive}
              <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
