import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export function Skills() {
  const { t } = useLanguage();

  const skills = [
    { category: t.skills.frameworks, items: ['React', 'Next.js', 'Vite', 'Vue.js'] },
    { category: t.skills.languages, items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3'] },
    { category: t.skills.styling, items: ['Tailwind CSS', 'Framer Motion', 'SASS', 'CSS Modules'] },
    { category: t.skills.tools, items: ['Git', 'Figma', 'Vitest', 'Webpack'] },
  ];

  return (
    <section id="skills" className="py-24 bg-surface border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-heading mb-4">
            {t.skills.title}
          </h2>
          <div className="w-20 h-1 bg-accent-strong rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, i) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 glass rounded-2xl"
            >
              <h3 className="text-xl font-bold font-display text-heading mb-6 tracking-wide">
                {skillGroup.category}
              </h3>
              <ul className="space-y-4">
                {skillGroup.items.map((item, j) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i * 0.1) + (j * 0.1), duration: 0.3 }}
                    className="flex justify-between items-center text-body font-sans"
                  >
                    <span>{item}</span>
                    <div className="w-2 h-2 rounded-full bg-accent/50" />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
