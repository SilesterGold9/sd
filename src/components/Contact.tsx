import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { useLanguage } from "../context/LanguageContext";

export function Contact() {
  const { t } = useLanguage();

  return (
    <footer
      id="contact"
      className="bg-bg py-24 relative overflow-hidden border-t border-border"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-accent-strong/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block p-4 rounded-2xl glass mb-4"
          >
            <Mail size={32} className="text-accent" />
          </motion.div>

          <h2
            className="text-5xl md:text-6xl font-bold font-display text-heading"
            dangerouslySetInnerHTML={{ __html: t.contact.title }}
          />

          <p className="text-muted max-w-lg mx-auto font-sans leading-relaxed">
            {t.contact.description}
          </p>

          <a
            href="mailto:silvestredourado766@gmail.com"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-accent-strong rounded-full hover:bg-accent-strong/90 transition-all font-mono hover:scale-105 active:scale-95 shadow-[0_0_20px_var(--color-glow-strong)] hover:shadow-[0_0_30px_var(--color-glow-strong)]"
          >
            {t.contact.button}
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="text-subtle font-mono text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Silvestre Dourado. {t.contact.rights}
          </p>

          <div className="flex space-x-6">
            <a
              href="https://github.com/SilesterGold9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-subtle hover:text-heading transition-colors"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/silvestre-dourado"
              target="_blank"
              rel="noopener noreferrer"
              className="text-subtle hover:text-heading transition-colors"
            >
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
