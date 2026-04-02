import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { Award, Download } from "lucide-react";

import pfp from "../assets/aocpc25/pfp.jpg";
import meInLabWide from "../assets/aocpc25/me-in-the-lab-with-team-Wide.jpg";
import usInLabWide from "../assets/aocpc25/us-in-the-lab-with-team-Wide.jpg";
import duringContestFront from "../assets/aocpc25/during-contest-front.jpg";
import podium from "../assets/aocpc25/Podium.jpg";
import medal from "../assets/aocpc25/Medal.jpg";
import trophy from "../assets/aocpc25/Trophy.jpg";

import cert1st from "../assets/certificates/FirstPlaceICPC.JPG";
import cert2nd from "../assets/certificates/SecondPlaceAOCPC.JPG";
import certHM from "../assets/certificates/HonorableMentionAOCPC.JPG";

import cvEn from "../assets/cv/Silvestre Dourado - English.pdf";
import cvPt from "../assets/cv/Silvestre Dourado PT.pdf";

const galleryImages = [
  { src: meInLabWide, alt: "In the lab with the team", span: "md:col-span-2" },
  { src: usInLabWide, alt: "Team in the lab", span: "md:col-span-2" },
  { src: duringContestFront, alt: "During the contest", span: "" },
  { src: podium, alt: "On the podium", span: "" },
  { src: medal, alt: "Medal", span: "" },
  { src: trophy, alt: "Trophy", span: "" },
];

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-surface relative overflow-hidden">
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
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <p className="text-lg text-muted font-sans leading-relaxed">
              {t.about.intro}
            </p>

            {/* CV Downloads */}
            <div className="flex flex-wrap gap-3">
              <a
                href={cvEn}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-mono font-bold text-heading bg-surface border border-border rounded-full hover:border-accent/50 hover:text-accent transition-all"
              >
                <Download size={14} />
                {t.about.downloadCv} — {t.about.cvEn}
              </a>
              <a
                href={cvPt}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-mono font-bold text-heading bg-surface border border-border rounded-full hover:border-accent/50 hover:text-accent transition-all"
              >
                <Download size={14} />
                {t.about.downloadCv} — {t.about.cvPt}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="rounded-2xl overflow-hidden border border-border w-full max-w-sm">
              <img
                src={pfp}
                alt="Silvestre Dourado"
                loading="lazy"
                className="w-full h-96 object-cover object-center"
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[8rem] sm:auto-rows-[10rem] md:auto-rows-[14rem]">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                className={img.span ? `hidden md:block ${img.span}` : ""}
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full h-full rounded-xl overflow-hidden border border-border/50 cursor-pointer relative group shadow-sm hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30 transition-shadow duration-300"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="absolute bottom-3 left-4 right-4 text-white text-sm font-mono opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {img.alt}
                  </p>
                </motion.div>
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
                whileHover={{ y: -4 }}
              >
                <div className="glass rounded-2xl overflow-hidden group cursor-pointer hover:border-accent/30 transition-colors duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={cert.src}
                      alt={cert.label}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-mono text-heading">{cert.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
