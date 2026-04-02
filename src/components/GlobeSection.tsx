import { useRef, useEffect, useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Globe = lazy(() => import('react-globe.gl'));

const GLOBE_TEXTURE = {
  dark: 'https://unpkg.com/three-globe/example/img/earth-night.jpg',
  light: 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
};

// Lubango, Angola coordinates
const LUBANGO = { lat: -14.9172, lng: 13.4925, alt: 1.5 };

const ARCS = [
  { startLat: -14.9172, startLng: 13.4925, endLat: 51.5074, endLng: -0.1278 },   // Lubango → London
  { startLat: -14.9172, startLng: 13.4925, endLat: 37.7749, endLng: -122.4194 }, // Lubango → San Francisco
  { startLat: -14.9172, startLng: 13.4925, endLat: 35.6895, endLng: 139.6917 },  // Lubango → Tokyo
];

export function GlobeSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isDesktop, setIsDesktop] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const globeRef = useRef<any>(null);

  // Only show globe on desktop
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Point camera at Lubango once globe is ready
  useEffect(() => {
    if (globeRef.current && loaded && isDesktop) {
      globeRef.current.pointOfView(LUBANGO, 1200);
    }
  }, [loaded, isDesktop]);

  const isDark = theme === 'dark';

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-surface border-t border-border">
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
                {t.globe.title1}<br />{t.globe.title2}
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
              <div className="w-[500px] h-[500px] relative">
                {/* Glow ring behind globe */}
                <div className="absolute inset-0 rounded-full bg-accent-strong/10 blur-3xl scale-75 z-0" />

                <Suspense fallback={
                  <div className="w-full h-full rounded-full bg-bg border border-border flex items-center justify-center">
                    <span className="text-subtle font-mono text-sm animate-pulse">Loading Globe...</span>
                  </div>
                }>
                  <Globe
                    ref={globeRef}
                    width={500}
                    height={500}
                    backgroundColor="rgba(0,0,0,0)"
                    globeImageUrl={GLOBE_TEXTURE[theme]}
                    atmosphereColor={isDark ? 'rgba(124, 58, 237, 0.3)' : 'rgba(124, 58, 237, 0.15)'}
                    atmosphereAltitude={0.15}
                    // Animated arcs from Lubango
                    arcsData={ARCS}
                    arcColor={() => ['rgba(124,58,237,0.8)', 'rgba(167,139,250,0.3)']}
                    arcStroke={0.4}
                    arcDashLength={0.5}
                    arcDashGap={0.2}
                    arcDashAnimateTime={2500}
                    // Marker on Lubango
                    pointsData={[{ lat: LUBANGO.lat, lng: LUBANGO.lng, size: 0.8, color: '#7c3aed' }]}
                    pointColor="color"
                    pointAltitude="size"
                    pointRadius={0.5}
                    pointsMerge={false}
                    // Slow auto-rotation
                    animateIn={true}
                    onGlobeReady={() => setLoaded(true)}
                  />
                </Suspense>
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
