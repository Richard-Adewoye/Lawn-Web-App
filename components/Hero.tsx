'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, ShieldCheck, Play, Star } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenVideo: () => void;
}

export function Hero({ onOpenQuote, onOpenVideo }: HeroProps) {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
      {/* Giant Hero Card - Exact replica of the dark green container in the screenshot */}
      <div className="relative rounded-[32px] md:rounded-[40px] bg-[#0f2319] overflow-hidden text-white shadow-2xl border border-emerald-900/40 min-h-[580px] lg:min-h-[640px] flex flex-col justify-between">
        {/* Background Image: Lawn Care Worker with Outstretched Arms on Alberta Yard */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_lawn_worker.jpg"
            alt="Central Alberta Lawn Care Technician admiring immaculate yard"
            fill
            priority
            referrerPolicy="no-referrer"
            className="object-cover object-right md:object-center opacity-85 brightness-95"
          />
          {/* Radial & directional gradient scrim to ensure WCAG AA contrast for text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1f16] via-[#0e241ae6] to-transparent lg:w-[68%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091710] via-transparent to-black/30" />
        </div>

        {/* Top bar inside hero: Google/FB Reviews badge on left, Licensed & Insured on right */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-12 pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left Review Badge: Google & Facebook logos + 5 Stars + 4.9 */}
          <div className="inline-flex items-center gap-2.5 bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-sm">
            <div className="flex items-center gap-1">
              {/* Google G icon */}
              <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-blue-600">
                G
              </span>
              {/* Facebook icon */}
              <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                f
              </span>
            </div>
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-white">4.9</span>
            <span className="text-white/40 text-xs">·</span>
            <span className="text-xs text-white/80 font-medium">98% Positive Feedback</span>
          </div>

          {/* Top-Right Trust Badge: Licensed & Insured with Shield */}
          <div className="hidden md:flex items-center gap-2.5 text-right bg-black/25 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#bef264]/20 border border-[#bef264]/40 flex items-center justify-center text-[#bef264]">
              <ShieldCheck className="w-5 h-5 text-[#bef264]" />
            </div>
            <div className="text-[11px] leading-tight text-white/90 font-medium">
              <span className="block font-semibold text-white">Licensed & Insured</span>
              <span className="text-white/70">100% Satisfaction Guarantee</span>
              <span className="block text-[#bef264] text-[10px] font-semibold">10+ Years Serving Central Alberta</span>
            </div>
          </div>
        </div>

        {/* Hero Main Body: Headline, Pills, Paragraph, Buttons */}
        <div className="relative z-10 px-6 sm:p-8 lg:p-12 py-8 max-w-2xl">
          {/* Micro Category Pills: Lawn Care | Landscaping | Property Maintenance */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm text-white/90 border border-white/15">
              Lawn Care
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm text-white/90 border border-white/15">
              Landscaping
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm text-white/90 border border-white/15">
              Property Maintenance
            </span>
          </div>

          {/* Big Bold Headline: Central Alberta lawn care, done right now */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.08] text-white">
            Central Alberta{' '}
            <span className="block font-bold">
              lawn care, <span className="font-serif-accent italic font-normal text-[#d9f99d]">done</span>
            </span>
            <span className="block font-serif-accent italic font-normal text-[#bef264]">
              right now
            </span>
          </h1>

          {/* Paragraph copy */}
          <p className="mt-5 text-sm sm:text-base text-white/80 leading-relaxed max-w-lg font-normal">
            Mowing, landscaping, aeration, and snow removal for homes and businesses across Sylvan Lake, Red Deer, and Central Alberta — reliable service, all year round.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuote}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#bef264] hover:bg-[#d9f99d] text-[#0f2319] font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer"
            >
              <span>Get A Free Quote</span>
              <div className="w-5 h-5 rounded-full bg-[#0f2319] text-[#bef264] flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </button>

            <a
              href="tel:17807829393"
              className="flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-all"
            >
              <span>Call Us Now</span>
              <ArrowUpRight className="w-4 h-4 text-white/70" />
            </a>
          </div>
        </div>

        {/* Bottom Right Floating Glassmorphism Card: 2K+ Happy Customers & Video Clip */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-12 pt-0 flex justify-end">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/15 shadow-2xl">
            {/* Left part: 2K+ Happy Customers with Avatars */}
            <div className="px-3 py-2 flex flex-col justify-center">
              <div className="text-xl font-extrabold text-white tracking-tight">2K+</div>
              <div className="text-[11px] text-white/70 font-medium">Happy Customers</div>
              <div className="flex items-center -space-x-2 mt-1.5">
                <div className="w-6 h-6 rounded-full border-2 border-[#0f2319] bg-emerald-700 text-[10px] font-bold flex items-center justify-center text-white">
                  RL
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-[#0f2319] bg-amber-600 text-[10px] font-bold flex items-center justify-center text-white">
                  MD
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-[#0f2319] bg-blue-600 text-[10px] font-bold flex items-center justify-center text-white">
                  KW
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-[#0f2319] bg-[#bef264] text-[10px] font-black flex items-center justify-center text-[#0f2319]">
                  ★
                </div>
              </div>
            </div>

            {/* Right part: Video preview card with play button */}
            <button
              onClick={onOpenVideo}
              aria-label="Watch LawnBuster in Action Video"
              className="relative w-full sm:w-36 h-20 rounded-xl overflow-hidden group cursor-pointer border border-white/20"
            >
              <Image
                src="/images/process_beautiful_home.jpg"
                alt="Client lawn showcase video"
                fill
                referrerPolicy="no-referrer"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#bef264] text-[#0f2319] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-[#0f2319] ml-0.5" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
