import { Hero } from '../components/Hero';
import { GlobeSection } from '../components/GlobeSection';
import { AboutSection } from '../components/AboutSection';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';

export function Home() {
  return (
    <>
      <Hero />
      <GlobeSection />
      <AboutSection />
      <Projects />
      <Skills />
    </>
  );
}
