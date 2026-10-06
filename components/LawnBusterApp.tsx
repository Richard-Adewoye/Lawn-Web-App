'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Partners } from '@/components/Partners';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ProcessSection } from '@/components/ProcessSection';
import { Footer } from '@/components/Footer';
import { QuoteModal } from '@/components/QuoteModal';
import { ServiceDetailModal } from '@/components/ServiceDetailModal';
import { VideoModal } from '@/components/VideoModal';
import { ReactEducatorPanel } from '@/components/ReactEducatorPanel';
import { CurriculumPortal } from '@/components/curriculum/CurriculumPortal';
import { ServiceItem } from '@/types';
import { Code2, Sparkles, GraduationCap, BookOpen } from 'lucide-react';

export function LawnBusterApp() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isEducatorOpen, setIsEducatorOpen] = useState(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
  const [activeInspector, setActiveInspector] = useState(false);
  const [inspectedComponent, setInspectedComponent] = useState<string | null>(null);

  const handleOpenQuote = (serviceId?: string) => {
    setIsQuoteOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleBookFromServiceDetail = (serviceId: string) => {
    setSelectedService(null);
    setIsQuoteOpen(true);
  };

  return (
    <div className={`min-h-screen bg-white text-[#12231b] flex flex-col relative ${activeInspector ? 'cursor-help' : ''}`}>
      {/* Interactive Inspector Notification Bar when active */}
      {activeInspector && (
        <div className="sticky top-0 z-50 bg-amber-400 text-neutral-950 px-4 py-2 text-xs font-bold flex items-center justify-between shadow-md border-b border-amber-500 animate-in slide-in-from-top">
          <div className="flex items-center gap-2 max-w-4xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-neutral-900" />
              <span>
                Inspector Mode Active: Click any highlighted section to inspect its React architecture!
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEducatorOpen(true)}
                className="px-2.5 py-0.5 rounded-full bg-neutral-950 text-amber-300 text-[10px] uppercase tracking-wider font-extrabold"
              >
                Open Full Curriculum
              </button>
              <button
                onClick={() => setActiveInspector(false)}
                className="hover:underline text-[11px]"
              >
                Disable
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Header & Navigation */}
      <div
        className={activeInspector ? 'relative outline-2 outline-dashed outline-amber-400 m-1' : ''}
        onClick={activeInspector ? () => { setInspectedComponent('Navbar'); setIsEducatorOpen(true); } : undefined}
      >
        {activeInspector && (
          <div className="absolute top-2 left-2 z-40 bg-amber-400 text-black text-[10px] font-mono px-2 py-0.5 rounded shadow">
            &lt;Navbar isEducatorOpen={String(isEducatorOpen)} /&gt;
          </div>
        )}
        <Navbar
          onOpenQuote={() => handleOpenQuote()}
          onOpenEducator={() => setIsCurriculumOpen(true)}
          isEducatorOpen={isCurriculumOpen}
        />
      </div>

      {/* 2. Hero Section */}
      <main className="flex-1">
        <div
          className={activeInspector ? 'relative outline-2 outline-dashed outline-emerald-500 m-1' : ''}
          onClick={activeInspector ? () => { setInspectedComponent('Hero'); setIsEducatorOpen(true); } : undefined}
        >
          {activeInspector && (
            <div className="absolute top-4 left-4 z-40 bg-emerald-500 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow">
              &lt;Hero onOpenQuote=&#123;fn&#125; onOpenVideo=&#123;fn&#125; /&gt;
            </div>
          )}
          <Hero
            onOpenQuote={() => handleOpenQuote()}
            onOpenVideo={() => setIsVideoOpen(true)}
          />
        </div>

        {/* 3. Commercial Partners */}
        <div
          className={activeInspector ? 'relative outline-2 outline-dashed outline-sky-500 m-1' : ''}
          onClick={activeInspector ? () => { setInspectedComponent('Partners'); setIsEducatorOpen(true); } : undefined}
        >
          {activeInspector && (
            <div className="absolute top-2 left-4 z-40 bg-sky-500 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow">
              &lt;Partners /&gt; · Static SVG Vectors
            </div>
          )}
          <Partners />
        </div>

        {/* 4. About LawnBuster Section */}
        <div
          className={activeInspector ? 'relative outline-2 outline-dashed outline-indigo-500 m-1' : ''}
          onClick={activeInspector ? () => { setInspectedComponent('AboutSection'); setIsEducatorOpen(true); } : undefined}
        >
          {activeInspector && (
            <div className="absolute top-2 left-4 z-40 bg-indigo-500 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow">
              &lt;AboutSection onOpenQuote=&#123;fn&#125; /&gt;
            </div>
          )}
          <AboutSection onOpenQuote={() => handleOpenQuote()} />
        </div>

        {/* 5. Services Section */}
        <div
          className={activeInspector ? 'relative outline-2 outline-dashed outline-purple-500 m-1' : ''}
          onClick={activeInspector ? () => { setInspectedComponent('ServicesSection'); setIsEducatorOpen(true); } : undefined}
        >
          {activeInspector && (
            <div className="absolute top-2 left-4 z-40 bg-purple-500 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow">
              &lt;ServicesSection useRef=&#123;scrollRef&#125; /&gt;
            </div>
          )}
          <ServicesSection onSelectService={handleSelectService} />
        </div>

        {/* 6. Process Section (Bento Grid) */}
        <div
          className={activeInspector ? 'relative outline-2 outline-dashed outline-emerald-600 m-1' : ''}
          onClick={activeInspector ? () => { setInspectedComponent('ProcessSection'); setIsEducatorOpen(true); } : undefined}
        >
          {activeInspector && (
            <div className="absolute top-2 left-4 z-40 bg-emerald-600 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow">
              &lt;ProcessSection hook=&#123;useScheduleTracker&#125; /&gt;
            </div>
          )}
          <ProcessSection onOpenQuote={() => handleOpenQuote()} />
        </div>
      </main>

      {/* 7. Footer */}
      <div
        className={activeInspector ? 'relative outline-2 outline-dashed outline-neutral-500 m-1' : ''}
        onClick={activeInspector ? () => { setInspectedComponent('Footer'); setIsEducatorOpen(true); } : undefined}
      >
        <Footer
          onOpenQuote={() => handleOpenQuote()}
          onOpenEducator={() => setIsCurriculumOpen(true)}
        />
      </div>

      {/* Floating React Masterclass Button for easy learning access */}
      <button
        onClick={() => setIsCurriculumOpen(true)}
        aria-label="Open React Progressive Curriculum Academy"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-neutral-900 text-white hover:bg-black shadow-2xl border border-neutral-700 hover:scale-105 transition-all cursor-pointer group"
      >
        <div className="w-7 h-7 rounded-full bg-[#bef264] text-neutral-950 flex items-center justify-center font-black">
          <GraduationCap className="w-4 h-4 stroke-[2.5]" />
        </div>
        <div className="text-left text-xs font-bold leading-tight">
          <span className="block text-amber-300">React Academy: 4 Phases</span>
          <span className="text-[10px] text-neutral-400 font-normal">Playgrounds & Mini-Challenges</span>
        </div>
      </button>

      {/* Modals */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={handleBookFromServiceDetail}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      <ReactEducatorPanel
        isOpen={isEducatorOpen}
        onClose={() => setIsEducatorOpen(false)}
        activeInspector={activeInspector}
        onToggleInspector={() => setActiveInspector(!activeInspector)}
      />

      <CurriculumPortal
        isOpen={isCurriculumOpen}
        onClose={() => setIsCurriculumOpen(false)}
        onInspectComponent={(name) => {
          setIsCurriculumOpen(false);
          setActiveInspector(true);
        }}
      />
    </div>
  );
}
