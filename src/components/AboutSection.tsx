import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { Award } from "lucide-react";

import meWithTeam from "../assets/aocpc25/MeWithTeam.jpg";
import meDuringICPC from "../assets/aocpc25/MeDuringICPC.jpg";
import podium from "../assets/aocpc25/Podium.jpg";
import medal from "../assets/aocpc25/Medal.jpg";
import trophy from "../assets/aocpc25/Trophy.jpg";
import allTeams from "../assets/aocpc25/AllCollegeTeams.jpg";

import cert1st from "../assets/certificates/FirstPlaceICPC.JPG";
import cert2nd from "../assets/certificates/SecondPlaceAOCPC.JPG";
import certHM from "../assets/certificates/HonorableMentionAOCPC.JPG";

const galleryImages = [
  { src: meDuringICPC, alt: "During the competition", span: "md:col-span-2 md:row-span-2" },
  { src: podium, alt: "On the podium", span: "" },
  { src: trophy, alt: "Trophy", span: "" },
  { src: medal, alt: "Medal", span: "" },
  { src: allTeams, alt: "All college teams", span: "" },
  { src: meWithTeam, alt: "With teammates", span: "md:col-span-2" },
];

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about-me" className="py-24 bg-surface relative overflow-hidden">
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
            {t.about.title}
          </h2>
          <div className="w-20 h-1 bg-accent-strong rounded-full" />
        </motion.div>

        {/* Intro + featured photo */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <p className="text-lg text-muted font-sans leading-relaxed">
              {t.about.intro}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="rounded-2xl overflow-hidden border border-border">
              <img
                src={meDuringICPC}
                alt="Silvestre during the ICPC competition"
                className="w-full h-80 object-cover object-top"
              />
            </div>
          </motion.div>
        </div>

        {/* Competition gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h3 className="text-2xl md:text-3xl font-bold font-display text-heading mb-3">
            {t.about.galleryTitle}
          </h3>
          <p className="text-muted font-sans mb-8 max-w-2xl">
            {t.about.galleryDescription}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[12rem] md:auto-rows-[14rem]">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={img.span}
              >
                <div className="w-full h-full rounded-xl overflow-hidden border border-border group cursor-pointer">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements / Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Award size={28} className="text-accent" />
            <h3 className="text-2xl md:text-3xl font-bold font-display text-heading">
              {t.about.achievementsTitle}
            </h3>
          </div>
          <p className="text-muted font-sans mb-10 max-w-2xl">
            {t.about.achievementsDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: cert1st, label: t.about.cert1 },
              { src: cert2nd, label: t.about.cert2 },
              { src: certHM, label: t.about.cert3 },
            ].map((cert, i) => (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="glass rounded-2xl overflow-hidden group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={cert.src}
                    alt={cert.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-mono text-heading">{cert.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
