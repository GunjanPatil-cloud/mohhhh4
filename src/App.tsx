import React, { useState } from 'react';
import { CampusProvider, useCampus } from './context/CampusContext';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/Toast';
import { AuthModal } from './components/AuthModal';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotesPage } from './pages/NotesPage';
import { EventsPage } from './pages/EventsPage';
import { CommunityPage } from './pages/CommunityPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { ProjectsPage } from './pages/ProjectsPage';

const MainLayout: React.FC = () => {
  const { activePage } = useCampus();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenAuth={handleOpenAuth} />

      <main className="flex-1">
        {activePage === 'home' && (
          <LandingPage onOpenAuth={handleOpenAuth} />
        )}
        {activePage === 'dashboard' && (
          <DashboardPage
            onOpenUploadNote={() => setIsUploadModalOpen(true)}
            onOpenAuth={() => handleOpenAuth('login')}
          />
        )}
        {activePage === 'notes' && (
          <NotesPage
            isUploadModalOpen={isUploadModalOpen}
            onCloseUploadModal={() => setIsUploadModalOpen(false)}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
          />
        )}
        {activePage === 'events' && (
          <EventsPage />
        )}
        {activePage === 'community' && (
          <CommunityPage />
        )}
        {activePage === 'announcements' && (
          <AnnouncementsPage />
        )}
        {activePage === 'profile' && (
          <ProfilePage onOpenAuth={() => handleOpenAuth('login')} />
        )}
        {activePage === 'admin' && (
          <AdminPage />
        )}
        {activePage === 'sustainability' && (
          <SustainabilityPage />
        )}
        {activePage === 'projects' && (
          <ProjectsPage />
        )}
      </main>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CampusProvider>
      <MainLayout />
    </CampusProvider>
  );
}
