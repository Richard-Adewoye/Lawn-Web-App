'use client';

import React from 'react';

export function Partners() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-neutral-100">
      <div className="flex flex-wrap items-center justify-between gap-8 md:gap-12 opacity-75 hover:opacity-100 transition-opacity">
        {/* Chinook's Edge School Division */}
        <div className="flex items-center gap-2.5 text-neutral-700 hover:text-neutral-900 transition-colors">
          <svg className="w-7 h-7 text-neutral-800" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 21h22L12 2zm0 5l6.5 11h-13L12 7z" />
          </svg>
          <div className="leading-none">
            <span className="block font-black tracking-wider text-xs uppercase text-neutral-800">
              CHINOOK&apos;S EDGE
            </span>
            <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-medium">
              School Division
            </span>
          </div>
        </div>

        {/* Westerner Park */}
        <div className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors">
          <div className="w-6 h-6 rounded-full border-2 border-neutral-800 flex items-center justify-center font-black text-xs text-neutral-800">
            W
          </div>
          <div className="leading-tight">
            <span className="block font-bold text-xs text-neutral-800">Westerner</span>
            <span className="block text-[10px] text-neutral-500 font-medium tracking-wide">Park</span>
          </div>
        </div>

        {/* Bower Place */}
        <div className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors">
          <div className="w-5 h-5 flex flex-col justify-center gap-0.5">
            <span className="w-full h-1 bg-neutral-800 rounded-xs" />
            <span className="w-3/4 h-1 bg-neutral-600 rounded-xs" />
            <span className="w-1/2 h-1 bg-neutral-400 rounded-xs" />
          </div>
          <div className="leading-none font-black tracking-widest text-xs uppercase text-neutral-800">
            BOWER
            <span className="block text-[9px] font-normal tracking-wider text-neutral-500">PLACE</span>
          </div>
        </div>

        {/* Sunreal */}
        <div className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors">
          <svg className="w-6 h-6 text-neutral-800 animate-spin-slow" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="font-extrabold tracking-tight text-xs text-neutral-800 uppercase">
            SUNREAL
          </span>
        </div>

        {/* Salomons Commercial */}
        <div className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors">
          <svg className="w-7 h-5 text-neutral-800" viewBox="0 0 28 20" fill="currentColor">
            <path d="M0 20L14 0l14 20H0zm14-14.5L5.5 17h17L14 5.5z" />
          </svg>
          <div className="leading-none">
            <span className="block font-black text-xs uppercase tracking-wider text-neutral-800">
              SALOMONS
            </span>
            <span className="text-[9px] font-medium text-neutral-500 uppercase tracking-widest">
              COMMERCIAL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
