'use client';

import React from 'react';
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenEducator: () => void;
}

export function Footer({ onOpenQuote, onOpenEducator }: FooterProps) {
  return (
    <footer id="contact" className="bg-[#0c1b13] text-white border-t border-emerald-950/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#bef264] text-[#12231b] font-black tracking-tight text-lg px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-sm">
                <span className="flex flex-col leading-none font-extrabold uppercase tracking-tight text-xs text-[#0f2419]">
                  <span>LAWN</span>
                  <span className="text-[13px] font-black tracking-wider text-[#06180e]">BUSTER</span>
                </span>
                <div className="w-2 h-2 rounded-full bg-[#15803d]" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              Central Alberta lawn care, landscaping, and snow removal crew you can actually count on. Serving Sylvan Lake, Red Deer, and surrounding counties for over 10 years.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#bef264]">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Satisfaction Guarantee · Licensed & Insured</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/50">Services</h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><a href="#services" className="hover:text-[#bef264] transition-colors">Spring Power Raking & Dethatching</a></li>
              <li><a href="#services" className="hover:text-[#bef264] transition-colors">Hollow-Tine Core Aeration</a></li>
              <li><a href="#services" className="hover:text-[#bef264] transition-colors">Granular Fertilizing & Weed Control</a></li>
              <li><a href="#services" className="hover:text-[#bef264] transition-colors">Weekly Striping Mowing & Trimming</a></li>
              <li><a href="#services" className="hover:text-[#bef264] transition-colors">Custom Prairie Landscaping</a></li>
              <li><a href="#services" className="hover:text-[#bef264] transition-colors">Winter Commercial Snow Removal</a></li>
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/50">Service Areas</h4>
            <ul className="space-y-1.5 text-xs text-white/80">
              <li>Sylvan Lake, AB</li>
              <li>Red Deer, AB</li>
              <li>Blackfalds, AB</li>
              <li>Lacombe, AB</li>
              <li>Innisfail, AB</li>
              <li>Ponoka County</li>
            </ul>
          </div>

          {/* Col 4: Contact & Free Quote */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/50">Direct Contact</h4>
            <div className="space-y-2 text-xs text-white/80">
              <a href="tel:17807829393" className="flex items-center gap-2 hover:text-[#bef264] transition-colors">
                <Phone className="w-4 h-4 text-[#bef264]" />
                <span>+1 (780) 782-9393</span>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#bef264]" />
                <span>quotes@lawnbuster.ca</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#bef264]" />
                <span>Serving Central Alberta, Canada</span>
              </div>
            </div>

            <button
              onClick={onOpenQuote}
              className="w-full py-2.5 px-4 rounded-full bg-[#bef264] text-[#0f2319] font-black text-xs flex items-center justify-center gap-1.5 hover:bg-[#d9f99d] transition-all cursor-pointer shadow-md"
            >
              <span>Request Free Property Assessment</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Educator toggle */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} LawnBuster Property Services Ltd. All rights reserved. Central Alberta, Canada.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenEducator}
              className="text-[#bef264] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>🎓 React Masterclass: Inspect Architecture</span>
            </button>
            <span>·</span>
            <a href="#hero" className="hover:text-white transition-colors">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
