import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Contact } from './components/Contact';
import { CustomCursor } from './components/CustomCursor';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

import { Home } from './pages/Home';

const BlogList = lazy(() => import('./pages/BlogList').then(m => ({ default: m.BlogList })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const Admin = lazy(() => import('./pages/Admin').then(m => ({ default: m.Admin })));

function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-bg text-body font-sans flex flex-col">
        {!isAdmin && <Navigation />}
        <div className="flex-1">
          <Suspense fallback={<div className="min-h-screen bg-bg" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Suspense>
        </div>
        {!isAdmin && <Contact />}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AppShell />
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
