import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import createGlobe from "cobe";

function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 900,
      height: 900,
      phi: 0,
      theta: 0.2,
      dark: isDark ? 1 : 0,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: isDark ? 6 : 3,
      mapBaseBrightness: isDark ? 0 : 0.6,
      baseColor: isDark ? [0.05, 0.05, 0.1] : [0.91, 0.89, 0.94],
      markerColor: [0.49, 0.23, 0.93],
      glowColor: isDark ? [0.49, 0.23, 0.93] : [0.6, 0.5, 0.9],
      offset: [0, 0],
      markers: [],
    });

    const onFrame = () => {
      phi += 0.003;
      globe.update({ phi });
      requestAnimationFrame(onFrame);
    };
    requestAnimationFrame(onFrame);

    return () => globe.destroy();
  }, [isDark]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
      className="absolute right-[-15vw] top-1/2 -translate-y-1/2 pointer-events-none z-0 hidden lg:block"
    >
      <div className="relative w-225 h-225">
        <div className="absolute inset-0 rounded-full bg-accent/10 blur-[100px]" />
        <canvas
          ref={canvasRef}
          style={{ width: 900, height: 900 }}
          width={1800}
          height={1800}
        />
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-accent/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Globe */}
      <HeroGlobe />

      {/* Content */}
      <div className="container mx-auto px-6 pt-20 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-display tracking-tighter leading-none text-heading">
            {t.hero.title}
          </h1>

          <p className="text-xl md:text-2xl text-muted font-sans max-w-2xl mx-auto pt-4 leading-relaxed">
            {t.hero.subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="pt-16"
          >
            <a
              href="#projects"
              className="inline-flex flex-col items-center gap-2 text-subtle hover:text-heading transition-colors"
            >
              <span className="text-sm font-mono uppercase tracking-widest">
                {t.hero.explore}
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown size={24} />
              </motion.div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
