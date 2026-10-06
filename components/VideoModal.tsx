'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Play, Volume2, ShieldCheck, Star } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-neutral-900 rounded-[32px] overflow-hidden shadow-2xl border border-white/10 flex flex-col">
        {/* Top Header */}
        <div className="p-4 px-6 flex items-center justify-between border-b border-white/10 bg-neutral-950/60 text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-white/80">
              LawnBuster Client Showcase · Sylvan Lake, Alberta
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close video"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          <Image
            src="/images/process_beautiful_home.jpg"
            alt="Central Alberta Lawn Transformation"
            fill
            referrerPolicy="no-referrer"
            className="object-cover opacity-90"
          />

          {/* Animated Overlay Simulation */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

          {/* Play/Pause Center Indicator */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative z-10 w-16 h-16 rounded-full bg-[#bef264] text-[#0f2319] flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer"
          >
            <Play className={`w-7 h-7 ml-1 fill-[#0f2319] ${isPlaying ? 'opacity-80' : ''}`} />
          </button>

          {/* Bottom Video Bar */}
          <div className="absolute bottom-4 left-6 right-6 z-10 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-black/60 font-mono text-[10px]">
                01:24 / 02:40
              </span>
              <span className="text-[11px] text-white/90 font-medium">
                Full Spring Cleanup & Power Raking Result
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <span className="text-[11px] font-bold text-white">4.9 Client Review</span>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="p-4 px-6 bg-neutral-950 text-white/80 text-xs flex items-center justify-between">
          <span>&quot;LawnBuster transformed our yard in under 3 hours. Best crew in Central Alberta!&quot; — Sarah M., Sylvan Lake</span>
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            Verified Customer
          </div>
        </div>
      </div>
    </div>
  );
}
