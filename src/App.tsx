import { useState, useEffect, useRef, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { RFQModal } from './components/RFQModal';
import { LoadingScreen } from './components/LoadingScreen';
import type { ProjectItem } from './data/companyData';

const TABS = ['home', 'about', 'services', 'projects', 'industries', 'contact'];

function getInitialTab(): string {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace('#', '');
    if (TABS.includes(hash)) return hash;
  }
  return 'home';
}

export function AppContent() {
  const [currentTab, setCurrentTab] = useState<string>(getInitialTab);
  const [visibleTab, setVisibleTab] = useState<string>(getInitialTab);
  const [pageVisible, setPageVisible] = useState(true);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [rfqInitialData, setRfqInitialData] = useState<any>(null);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNavigate = useCallback((tab: string) => {
    if (tab === currentTab) return;

    setPageVisible(false);
    if (transitionRef.current) clearTimeout(transitionRef.current);

    transitionRef.current = setTimeout(() => {
      setCurrentTab(tab);
      setVisibleTab(tab);
      window.location.hash = tab;
      window.scrollTo({ top: 0, behavior: 'instant' });
      setPageVisible(true);
    }, 200);
  }, [currentTab]);

  // Sync hash changes from browser back/forward buttons
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace('#', '');
      if (TABS.includes(h)) {
        handleNavigate(h);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [handleNavigate]);

  const openRFQ = (data?: any) => {
    setRfqInitialData(data ?? null);
    setRfqModalOpen(true);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-main)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Lightweight Loading Screen */}
      <LoadingScreen />

      {/* Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenRFQ={() => openRFQ()}
      />

      {/* Page content with smooth fade transition */}
      <main
        style={{
          flex: 1,
          opacity: pageVisible ? 1 : 0,
          transform: pageVisible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1), transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'opacity, transform',
        }}
      >
        {visibleTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenRFQ={() => openRFQ()}
            onSelectProject={(p) => setSelectedProject(p)}
            onPreFillRFQ={(data) => openRFQ(data)}
          />
        )}
        {visibleTab === 'about' && (
          <AboutPage onOpenRFQ={() => openRFQ()} />
        )}
        {visibleTab === 'services' && (
          <ServicesPage
            onOpenRFQ={() => openRFQ()}
            onPreFillRFQ={(data) => openRFQ(data)}
          />
        )}
        {visibleTab === 'projects' && (
          <ProjectsPage
            onSelectProject={(p) => setSelectedProject(p)}
            onOpenRFQ={() => openRFQ()}
          />
        )}
        {visibleTab === 'industries' && (
          <IndustriesPage
            onOpenRFQ={() => openRFQ()}
            onNavigateToProjects={() => handleNavigate('projects')}
          />
        )}
        {visibleTab === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenRFQ={() => openRFQ()}
      />

      {/* Project detail modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onEnquireSimilar={(title: string) => {
            setSelectedProject(null);
            openRFQ({ projectTitle: title });
          }}
        />
      )}

      {/* RFQ modal */}
      <RFQModal
        isOpen={rfqModalOpen}
        initialData={rfqInitialData}
        onClose={() => {
          setRfqModalOpen(false);
          setRfqInitialData(null);
        }}
      />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
