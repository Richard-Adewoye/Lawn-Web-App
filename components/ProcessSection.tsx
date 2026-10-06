'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, Check, Star, Navigation, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useScheduleTracker } from '@/hooks/useScheduleTracker';

interface ProcessSectionProps {
  onOpenQuote: () => void;
}

export function ProcessSection({ onOpenQuote }: ProcessSectionProps) {
  const { status, isSimulating, toggleSimulation, resetTracker } = useScheduleTracker();

  return (
    <section id="process" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          {/* Green dot section tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#15803d]" />
            <span className="text-xs font-bold tracking-wider uppercase text-neutral-600">
              OUR PROCESS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2319] tracking-tight leading-[1.1]">
            How we work, <br />
            <span className="font-serif-accent italic font-normal text-emerald-800">
              start to finish
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-4 md:max-w-md">
          <p className="text-sm text-neutral-600 leading-relaxed font-normal">
            Delivering trusted property services with proven experience and a results-driven focus.
          </p>

          <a
            href="#bento-steps"
            aria-label="Scroll to steps"
            className="w-10 h-10 rounded-full bg-[#153423] text-white flex items-center justify-center shrink-0 hover:bg-[#0f2319] transition-transform hover:translate-y-0.5 shadow-sm"
          >
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bento Grid - Exact layout from the image */}
      <div id="bento-steps" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Step 01: Free property assessment (Tall card on left) */}
        <div className="lg:col-span-4 bg-[#f8faf7] rounded-[32px] p-6 sm:p-7 border border-[#e5ebe2] flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
              Step 01
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#0f2319] tracking-tight mb-2">
              Free property assessment
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
              We inspect your turf, soil density, lot dimensions, and custom property requirements.
            </p>
          </div>

          {/* Photo of Friendly Technicians in Uniform Smiling on Lawn */}
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-sm border border-neutral-200 mt-2">
            <Image
              src="/images/process_technicians.jpg"
              alt="LawnBuster technicians performing lawn assessment"
              fill
              referrerPolicy="no-referrer"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl text-white text-[11px] font-medium flex items-center justify-between border border-white/10">
              <span>Dave & Kyle · Central AB</span>
              <span className="text-[#bef264] font-bold">100% On-Site Free</span>
            </div>
          </div>
        </div>

        {/* Right side container: Step 02, Step 03 on top; Step 04 wide card below */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Top row: Step 02 & Step 03 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 02: Track your service schedule */}
            <div className="bg-[#f8faf7] rounded-[32px] p-6 sm:p-7 border border-[#e5ebe2] flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                  Step 02
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#0f2319] tracking-tight mb-2">
                  Track your service schedule
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                  Stay on top of every visit with real-time updates and live crew tracking.
                </p>
              </div>

              {/* Interactive Radar / Service Route Simulation Widget */}
              <div className="relative mt-2 p-4 rounded-2xl bg-white border border-neutral-200 shadow-inner flex flex-col items-center justify-center overflow-hidden">
                {/* Radar Concentric Rings */}
                <div className="relative w-36 h-36 flex items-center justify-center my-2">
                  <div className="absolute inset-0 rounded-full border border-emerald-200 animate-ping opacity-25" />
                  <div className="absolute inset-4 rounded-full border border-emerald-300/80" />
                  <div className="absolute inset-8 rounded-full border border-emerald-400/50" />
                  <div className="w-12 h-12 rounded-full bg-[#bef264] flex items-center justify-center text-[#0f2319] shadow-md z-10">
                    <Navigation className="w-5 h-5 fill-[#0f2319] animate-bounce" />
                  </div>

                  {/* Satellite pin nodes */}
                  <div className="absolute top-2 right-4 w-7 h-7 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center text-[10px] font-bold text-emerald-800 shadow-sm">
                    📍
                  </div>
                  <div className="absolute bottom-3 left-4 w-7 h-7 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center text-[10px] font-bold text-emerald-800 shadow-sm">
                    🏡
                  </div>
                </div>

                {/* Status Bar */}
                <div className="w-full mt-2 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="text-neutral-500 font-medium block">Live Crew Status</span>
                    <span className="font-bold text-emerald-800 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      {status.step === 'completed' ? 'Visit Complete' : status.currentAddress}
                    </span>
                  </div>

                  <button
                    onClick={toggleSimulation}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 cursor-pointer"
                  >
                    {isSimulating ? 'Pause Sim' : 'Simulate GPS'}
                  </button>
                </div>
              </div>
            </div>

            {/* Step 03: Custom quote & Property */}
            <div className="bg-[#f8faf7] rounded-[32px] p-6 sm:p-7 border border-[#e5ebe2] flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                  Step 03
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#0f2319] tracking-tight mb-2">
                  Custom quote & Property
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                  A tailored plan and transparent pricing built around your yard.
                </p>
              </div>

              {/* Photo of Beautiful Alberta Suburban Home */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-sm border border-neutral-200 mt-2 group">
                <Image
                  src="/images/process_beautiful_home.jpg"
                  alt="Manicured Alberta Home lawn"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                  <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg font-medium border border-white/10">
                    Transparent Flat Pricing
                  </span>
                  <button
                    onClick={onOpenQuote}
                    className="bg-[#bef264] text-[#0f2319] font-bold px-2.5 py-1 rounded-lg hover:bg-white transition-colors cursor-pointer"
                  >
                    Calculate ↗
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 04: Satisfaction Guaranteed - Wide Card at Bottom */}
          <div className="relative rounded-[32px] bg-[#143222] text-white p-6 sm:p-8 lg:p-10 border border-emerald-900/50 shadow-lg overflow-hidden">
            {/* Background pattern */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left copy */}
              <div className="md:col-span-7">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
                    Step 04
                  </span>
                  <span className="text-white/30">·</span>
                  <span className="text-xs font-bold text-[#bef264] uppercase tracking-wider">
                    Satisfaction Guaranteed
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                  We don&apos;t leave until it&apos;s right
                </h3>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-md mb-6">
                  Every visit backed by our follow-up guarantee — issues fixed, free. If a corner was missed or clippings linger, we return within 24 hours at no charge.
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#bef264]/20 border border-[#bef264]/40 flex items-center justify-center text-[#bef264]">
                    <ShieldCheck className="w-6 h-6 text-[#bef264]" />
                  </div>
                  <div className="text-xs leading-tight">
                    <span className="font-bold text-white block">Central Alberta Guarantee</span>
                    <span className="text-white/60">Verified on over 2,000+ local properties</span>
                  </div>
                </div>
              </div>

              {/* Right graphic: Google Review + Completion Checklist paper */}
              <div className="md:col-span-5 flex flex-col gap-3">
                {/* Google Review mini card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-black text-blue-600">
                      G
                    </span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-white/90">Central Alberta #1</span>
                </div>

                {/* Completion Checklist Card - Exact replica of the white checklist in screenshot */}
                <div className="bg-white rounded-2xl p-4 text-neutral-900 shadow-xl border border-neutral-100">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                    <div>
                      <div className="text-xs font-black tracking-tight text-neutral-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Completion Checklist
                      </div>
                      <div className="text-[10px] text-neutral-500">Every visit certified before departure</div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black">
                      ✓
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs font-medium text-neutral-700">
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                      <span>Even cut, calibrated 2.75&quot; depth</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                      <span>String trimming around fence & garden beds</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                      <span>Walkways & driveways blown pristine</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                      <span>Backyard gates closed & latched secure</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
