import React, { useState } from 'react';
import { PageTab, Lesson } from './types';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { LessonsSection } from './components/LessonsSection';
import { GamesSection } from './components/GamesSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PdfViewerModal } from './components/PdfViewerModal';
import { EyeCareTimerModal } from './components/EyeCareTimerModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [activePdfLesson, setActivePdfLesson] = useState<Lesson | null>(null);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState<boolean>(false);

  const handleTabChange = (tab: PageTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-['Prompt',sans-serif]">
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onOpenTimer={() => setIsTimerModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'home' && (
          <HomeSection onNavigate={handleTabChange} />
        )}

        {currentTab === 'lessons' && (
          <LessonsSection
            onOpenPdf={(lesson) => setActivePdfLesson(lesson)}
          />
        )}

        {currentTab === 'games' && (
          <GamesSection onOpenTimer={() => setIsTimerModalOpen(true)} />
        )}

        {currentTab === 'gallery' && (
          <GallerySection />
        )}

        {currentTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleTabChange} onOpenTimer={() => setIsTimerModalOpen(true)} />

      {/* PDF Worksheet Preview & Download Modal */}
      <PdfViewerModal
        lesson={activePdfLesson}
        onClose={() => setActivePdfLesson(null)}
      />

      {/* Screen Time & Eye Care Reminder Modal */}
      <EyeCareTimerModal
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
      />
    </div>
  );
}
