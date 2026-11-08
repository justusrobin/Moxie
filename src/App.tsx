import { useState, useEffect } from 'react';
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

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [rfqInitialData, setRfqInitialData] = useState<any>(null);

  // Sync with window.location.hash for routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'services', 'projects', 'industries', 'contact'].includes(hash)) {
        setCurrentTab(hash);
      } else {
        setCurrentTab('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRFQWithData = (data: any) => {
    setRfqInitialData(data);
    setRfqModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-white)', color: 'var(--ink)', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)' }}>
      {/* Purposeful Brand Loading Screen */}
      <LoadingScreen />

      {/* Clean Navigation Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenRFQ={() => {
          setRfqInitialData(null);
          setRfqModalOpen(true);
        }}
      />

      {/* Main Page Content Body */}
      <main className="flex-1 w-full">
        {(currentTab === 'home' || !['about', 'services', 'projects', 'industries', 'contact'].includes(currentTab)) && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenRFQ={() => {
              setRfqInitialData(null);
              setRfqModalOpen(true);
            }}
            onSelectProject={(p) => setSelectedProject(p)}
            onPreFillRFQ={handleOpenRFQWithData}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onOpenRFQ={() => {
              setRfqInitialData(null);
              setRfqModalOpen(true);
            }}
          />
        )}

        {currentTab === 'services' && (
          <ServicesPage
            onOpenRFQ={() => {
              setRfqInitialData(null);
              setRfqModalOpen(true);
            }}
            onPreFillRFQ={handleOpenRFQWithData}
          />
        )}

        {currentTab === 'projects' && (
          <ProjectsPage
            onSelectProject={(p) => setSelectedProject(p)}
            onOpenRFQ={() => {
              setRfqInitialData(null);
              setRfqModalOpen(true);
            }}
          />
        )}

        {currentTab === 'industries' && (
          <IndustriesPage
            onOpenRFQ={() => {
              setRfqInitialData(null);
              setRfqModalOpen(true);
            }}
            onNavigateToProjects={() => handleNavigate('projects')}
          />
        )}

        {currentTab === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Global Clean Engineering Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenRFQ={() => {
          setRfqInitialData(null);
          setRfqModalOpen(true);
        }}
      />

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onEnquireSimilar={(title: string) => {
            setSelectedProject(null);
            setRfqInitialData({ projectTitle: title });
            setRfqModalOpen(true);
          }}
        />
      )}

      {/* Project RFP / Enquiry Modal */}
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

export default App;
