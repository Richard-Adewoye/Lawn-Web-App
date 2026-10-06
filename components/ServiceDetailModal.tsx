'use client';

import React from 'react';
import Image from 'next/image';
import { X, Check, ArrowUpRight, Calendar, HelpCircle, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '@/types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export function ServiceDetailModal({ service, onClose, onBookService }: ServiceDetailModalProps) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col border border-neutral-100">
        {/* Hero image in modal header */}
        <div className="relative h-56 sm:h-64 w-full bg-[#0f2319]">
          <Image
            src={service.image}
            alt={service.name}
            fill
            referrerPolicy="no-referrer"
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#bef264] text-[#0f2319] uppercase tracking-wider inline-block mb-2">
              {service.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{service.name}</h2>
            <p className="text-xs sm:text-sm text-white/80 mt-1">{service.description}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Service Overview
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed font-normal">
              {service.details.overview}
            </p>
          </div>

          {/* Included Features */}
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
              What Is Included In Every Visit
            </h3>
            <div className="space-y-2.5">
              {service.details.whatIsIncluded.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-800">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal Timing */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-amber-900 block">Recommended Timing in Central Alberta</span>
              <span className="text-amber-800/90">{service.details.idealTiming}</span>
            </div>
          </div>

          {/* FAQ */}
          {service.details.faq.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-neutral-500" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {service.details.faq.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs">
                    <span className="font-bold text-neutral-900 block mb-1">Q: {item.q}</span>
                    <span className="text-neutral-600 leading-relaxed">A: {item.a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-neutral-100 bg-[#fafbfa] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-neutral-500 block">Estimated Starting Rate</span>
            <span className="text-lg font-black text-[#0f2319]">${service.priceStartingAt} CAD</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookService(service.id);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#172b21] hover:bg-[#0f2319] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
          >
            <span>Add to Free Quote</span>
            <ArrowUpRight className="w-4 h-4 text-[#bef264]" />
          </button>
        </div>
      </div>
    </div>
  );
}
