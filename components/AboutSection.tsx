'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Instagram, Linkedin, Twitter } from 'lucide-react';

interface AboutSectionProps {
  onOpenQuote: () => void;
}

export function AboutSection({ onOpenQuote }: AboutSectionProps) {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Rounded image card of lawn mower + social icons */}
        <div className="lg:col-span-5 flex flex-col items-start">
          {/* Green dot section tag */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#15803d]" />
            <span className="text-xs font-bold tracking-wider uppercase text-neutral-600">
              ABOUT LAWNBUSTER
            </span>
          </div>

          {/* Rounded photo card */}
          <div className="relative w-full max-w-[340px] aspect-square rounded-[28px] overflow-hidden shadow-lg border border-neutral-200 group">
            <Image
              src="/images/about_lawn_mower.jpg"
              alt="LawnBuster commercial mower in action on Central Alberta grass"
              fill
              referrerPolicy="no-referrer"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Social icons row directly below photo */}
          <div className="flex items-center gap-4 mt-4 text-neutral-600">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LawnBuster on Instagram"
              className="p-2 rounded-full hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LawnBuster on LinkedIn"
              className="p-2 rounded-full hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LawnBuster on X"
              className="p-2 rounded-full hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Column: Narrative Prose + CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <p className="text-lg sm:text-xl lg:text-2xl text-[#172b21] font-medium leading-relaxed tracking-tight">
            LawnBuster started with a simple goal: give Central Alberta homeowners and businesses a lawn care and landscaping crew they can actually count on. 10 years later, we&apos;re still doing exactly that — from weekly mowing in Sylvan Lake to commercial snow removal contracts across the region.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#bef264] hover:bg-[#d9f99d] text-[#0f2319] font-bold text-sm transition-all shadow-sm hover:shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <span>Get A Free Quote</span>
              <div className="w-5 h-5 rounded-full bg-[#0f2319] text-[#bef264] flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </button>

            <a
              href="tel:17807829393"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-neutral-800 hover:text-neutral-950 transition-colors"
            >
              <span>Call Us Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Regional verified stats */}
          <div className="mt-10 pt-8 border-t border-neutral-200/80 grid grid-cols-3 gap-4">
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#0f2319]">10+ Yrs</div>
              <div className="text-xs text-neutral-500 font-medium">Serving Central AB</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#0f2319]">100%</div>
              <div className="text-xs text-neutral-500 font-medium">Satisfaction Guaranteed</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#0f2319]">4.9 ★</div>
              <div className="text-xs text-neutral-500 font-medium">Over 2,000+ Yards</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
