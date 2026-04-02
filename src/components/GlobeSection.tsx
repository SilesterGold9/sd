import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import createGlobe from "cobe";

// Lubango, Angola coordinates
const LUBANGO: [number, number] = [-14.9172, 13.4925];

const ARC_ENDPOINTS: [number, number][] = [
  [51.5074, -0.1278],   // London
  [37.7749, -122.4194], // San Francisco
  [35.6895, 139.6917],  // Tokyo
];

export function GlobeSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isDesktop, setIsDesktop] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Only show globe on desktop
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isDark = theme === "dark";

  useEffect(() => {
    if (!canvasRef.current || !isDesktop) return;

    let phi = 1.8; // Start roughly centered on Lubango
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 500,
      height: 500,
      phi: 1.8,
      theta: 0.3,
      dark: isDark ? 1 : 0,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: isDark ? 6 : 1.2,
      mapBaseBrightness: isDark ? 0 : 0.8,
      baseColor: isDark ? [0.05, 0.05, 0.1] : [0.88, 0.86, 0.92],
      markerColor: [0.49, 0.23, 0.93],
      glowColor: isDark
        ? [0.49, 0.23, 0.93]
        : [0.6, 0.5, 0.9],
      offset: [0, 0],
      markers: [
        { location: LUBANGO, size: 0.08 },
      ],
      markerElevation: 0.02,
      arcs: ARC_ENDPOINTS.map((to) => ({
        from: LUBANGO,
        to,
        color: [0.49, 0.23, 0.93],
      })),
      arcColor: [0.49, 0.23, 0.93],
      arcWidth: 0.5,
      arcHeight: 0.3,
    });

    const onFrame = () => {
      phi += 0.003;
      globe.update({ phi });
      requestAnimationFrame(onFrame);
    };
    requestAnimationFrame(onFrame);

    return () => globe.destroy();
  }, [isDesktop, isDark]);

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-surface border-t border-border"
    >
      {isDesktop ? (
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-display text-heading">
                {t.globe.title1}
                <br />
                {t.globe.title2}
              </h2>
              <div className="flex items-center gap-3 text-accent font-mono">
                <MapPin size={24} />
                <span>{t.globe.basedIn}</span>
              </div>
              <p className="text-lg text-muted max-w-md font-sans">
                {t.globe.description}
              </p>
            </motion.div>

            {/* Globe */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div className="w-125 h-125 relative">
                {/* Glow ring behind globe */}
                <div className="absolute inset-0 rounded-full bg-accent-strong/10 blur-3xl scale-75 z-0" />
                <canvas
                  ref={canvasRef}
                  style={{ width: 500, height: 500 }}
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mobile fallback */
        <div className="container mx-auto px-6 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold font-display text-heading mb-4">
              {t.globe.titleMobile}
            </h2>
            <div className="flex items-center justify-center gap-2 text-accent font-mono mb-4 text-sm">
              <MapPin size={20} />
              <span>Lubango, Angola</span>
            </div>
            <p className="text-muted font-sans px-4">
              {t.globe.descriptionMobile}
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
}
