import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Contact } from './components/Contact';
import { CustomCursor } from './components/CustomCursor';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

import { Home } from './pages/Home';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { Admin } from './pages/Admin';

function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-bg text-body font-sans flex flex-col">
        {!isAdmin && <Navigation />}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
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
