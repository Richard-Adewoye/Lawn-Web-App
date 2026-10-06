'use client';

import React, { useState } from 'react';
import { Phone, ArrowUpRight, ChevronDown, Menu, X, BookOpen, Sparkles, Check } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenEducator: () => void;
  isEducatorOpen: boolean;
}

export function Navbar({ onOpenQuote, onOpenEducator, isEducatorOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);

  const locations = ['Sylvan Lake', 'Red Deer', 'Blackfalds', 'Lacombe', 'Innisfail', 'Ponoka'];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-emerald-950/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo - Exact replica of the LAWN BUSTER badge in the image */}
        <a href="#" className="flex items-center gap-2 group shrink-0">
          <div className="bg-[#bef264] text-[#12231b] font-black tracking-tight text-lg sm:text-xl px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm border border-[#a3e635]/60 group-hover:scale-105 transition-transform">
            <span className="flex flex-col leading-none font-extrabold uppercase tracking-tight text-xs text-[#0f2419]">
              <span>LAWN</span>
              <span className="text-[13px] font-black tracking-wider text-[#06180e]">BUSTER</span>
            </span>
            <div className="w-2 h-2 rounded-full bg-[#15803d] animate-pulse" />
          </div>
        </a>

        {/* Center Pill Navigation Container - Exact replica from screenshot */}
        <nav className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f7f2] border border-[#e2e8dd] rounded-full text-sm font-medium text-[#2d4036]">
          <a
            href="#hero"
            className="px-4 py-1.5 rounded-full bg-[#dcfce7] text-[#14532d] font-semibold transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            className="px-3.5 py-1.5 rounded-full hover:text-[#0f2419] hover:bg-white/70 transition-colors"
          >
            About Us
          </a>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="px-3.5 py-1.5 rounded-full hover:text-[#0f2419] hover:bg-white/70 transition-colors flex items-center gap-1"
            >
              Services
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
            </button>

            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-emerald-950/10 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <a
                  href="#services"
                  className="block px-3 py-2 text-xs font-semibold text-neutral-800 hover:bg-[#f4f7f2] rounded-xl"
                >
                  🌱 Power Raking
                </a>
                <a
                  href="#services"
                  className="block px-3 py-2 text-xs font-semibold text-neutral-800 hover:bg-[#f4f7f2] rounded-xl"
                >
                  🌾 Fertilizing & Weed Control
                </a>
                <a
                  href="#services"
                  className="block px-3 py-2 text-xs font-semibold text-neutral-800 hover:bg-[#f4f7f2] rounded-xl"
                >
                  🏡 Custom Landscaping
                </a>
                <a
                  href="#services"
                  className="block px-3 py-2 text-xs font-semibold text-neutral-800 hover:bg-[#f4f7f2] rounded-xl"
                >
                  ❄️ Snow Removal (Winter)
                </a>
                <a
                  href="#services"
                  className="block px-3 py-2 text-xs font-semibold text-neutral-800 hover:bg-[#f4f7f2] rounded-xl"
                >
                  ✂️ Weekly Mowing & Edging
                </a>
              </div>
            )}
          </div>

          {/* Locations Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLocationsDropdownOpen(true)}
            onMouseLeave={() => setLocationsDropdownOpen(false)}
          >
            <button
              onClick={() => setLocationsDropdownOpen(!locationsDropdownOpen)}
              className="px-3.5 py-1.5 rounded-full hover:text-[#0f2419] hover:bg-white/70 transition-colors flex items-center gap-1"
            >
              Locations
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
            </button>

            {locationsDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-emerald-950/10 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] font-bold text-neutral-400 px-3 py-1 uppercase tracking-wider">
                  Central Alberta
                </div>
                {locations.map((loc) => (
                  <a
                    key={loc}
                    href="#process"
                    className="block px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-[#f4f7f2] rounded-xl"
                  >
                    📍 {loc}, AB
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-full hover:text-[#0f2419] hover:bg-white/70 transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right Section: Call Pill + Get A Free Quote Button + React Educator Companion Toggle */}
        <div className="flex items-center gap-3">
          {/* React Learning Companion / Principal Educator Toggle */}
          <button
            onClick={onOpenEducator}
            aria-label="Open React Masterclass Guide"
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isEducatorOpen
                ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-sm'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden xl:inline">React Masterclass</span>
            <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded-full">
              6 Modules
            </span>
          </button>

          {/* Call Now pill from screenshot */}
          <a
            href="tel:17807829393"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-neutral-100 transition-colors text-left group"
          >
            <div className="w-7 h-7 rounded-full bg-[#bef264] flex items-center justify-center text-[#12231b] group-hover:scale-110 transition-transform">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs leading-tight">
              <span className="block text-[10px] text-neutral-500 font-medium">Call Now</span>
              <span className="font-semibold text-neutral-900 whitespace-nowrap">+1 (780) 782-9393</span>
            </div>
          </a>

          {/* Primary CTA: Get A Free Quote ↗ */}
          <button
            onClick={onOpenQuote}
            className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 bg-[#172b21] hover:bg-[#102018] text-white rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md group cursor-pointer"
          >
            <span>Get A Free Quote</span>
            <div className="w-7 h-7 rounded-full bg-[#bef264] text-[#12231b] flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:bg-neutral-100 rounded-xl"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in">
          <div className="flex flex-col gap-1 text-sm font-medium">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-semibold"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-100"
            >
              About Us
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-100"
            >
              Services (Power Raking, Fertilizing, Snow Removal...)
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-100"
            >
              Our Process
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-100"
            >
              Contact
            </a>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEducator();
              }}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              Open React Masterclass (Beginner → Advanced)
            </button>
            <a
              href="tel:17807829393"
              className="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-neutral-800"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              +1 (780) 782-9393
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
