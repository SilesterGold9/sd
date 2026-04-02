import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe2, Sun, Moon } from 'lucide-react';
import { cn } from '../utils/cn';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: t.nav.about, isHash: true },
    { id: 'projects', label: t.nav.projects, isHash: true },
    { id: 'skills', label: t.nav.skills, isHash: true },
    { id: 'blog', label: t.nav.blog, isHash: false },
    { id: 'contact', label: t.nav.contact, isHash: true },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'glass py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl font-bold font-display tracking-tighter text-heading hover:text-accent transition-colors">
              SD.
            </span>
          </a>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link, i) => {
              const destination = link.isHash
                ? (location.pathname === '/' ? `#${link.id}` : `/#${link.id}`)
                : `/${link.id}`;
              return (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {link.isHash && location.pathname === '/' ? (
                    <a
                      href={destination}
                      className="text-sm font-medium text-body hover:text-heading transition-colors uppercase tracking-wider font-mono"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={destination}
                      className="text-sm font-medium text-body hover:text-heading transition-colors uppercase tracking-wider font-mono"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted hover:text-heading hover:bg-surface transition-all"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
              className="flex items-center gap-2 text-xs font-mono font-bold text-accent hover:text-accent-strong transition-colors uppercase border border-accent/30 px-3 py-1.5 rounded-full"
            >
              <Globe2 size={14} />
              {language}
            </button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-muted hover:text-heading transition-colors relative z-50"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
            className="flex items-center gap-1 text-xs font-mono font-bold text-accent hover:text-accent-strong transition-colors uppercase border border-accent/30 px-2 py-1 rounded-full relative z-50"
          >
            <Globe2 size={14} />
            {language}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-body hover:text-heading relative z-50 p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? '100vh' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        className={cn(
          'fixed inset-0 top-0 left-0 w-full bg-bg flex flex-col items-center justify-center overflow-hidden z-40',
          !mobileMenuOpen && 'pointer-events-none'
        )}
      >
        <ul className="flex flex-col items-center space-y-8">
          {navLinks.map((link, i) => {
            const destination = link.isHash
              ? (location.pathname === '/' ? `#${link.id}` : `/#${link.id}`)
              : `/${link.id}`;

            return (
              <motion.li
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: mobileMenuOpen ? 0.2 + i * 0.1 : 0 }}
              >
                {link.isHash && location.pathname === '/' ? (
                  <a
                    href={destination}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-bold font-display uppercase tracking-widest text-heading hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={destination}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-bold font-display uppercase tracking-widest text-heading hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </header>
  );
}
