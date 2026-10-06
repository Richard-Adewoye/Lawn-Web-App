'use client';

import React from 'react';
import { X, Check, Calculator, Sparkles, MapPin, Calendar, Phone, ArrowUpRight } from 'lucide-react';
import { useQuoteEstimator, LOT_SIZE_CONFIG } from '@/hooks/useQuoteEstimator';
import { SERVICES_DATA } from '@/data/content';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export function QuoteModal({ isOpen, onClose, initialServiceId }: QuoteModalProps) {
  const {
    formData,
    pricing,
    isSubmitted,
    setIsSubmitted,
    toggleService,
    updateField,
    resetForm,
  } = useQuoteEstimator();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number so we can confirm your property assessment!');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col border border-neutral-100">
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-[#0f2319] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#bef264] text-[#0f2319] flex items-center justify-center font-black">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Instant Yard Estimate & Free Quote
              </h2>
              <p className="text-xs text-white/70">
                Transparent Central Alberta pricing · No hidden fees · 100% Guaranteed
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close quote modal"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {isSubmitted ? (
            <div className="py-12 text-center max-w-md mx-auto space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl font-black">
                ✓
              </div>
              <h3 className="text-2xl font-black text-[#0f2319]">Assessment Request Received!</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Thank you, <span className="font-bold text-neutral-900">{formData.name}</span>. Our Central Alberta field team has calculated your preliminary estimate of{' '}
                <span className="font-black text-emerald-700">${pricing.total} CAD</span>.
              </p>
              <div className="p-4 rounded-2xl bg-emerald-50 text-xs text-emerald-900 text-left border border-emerald-200 space-y-1">
                <div><strong>Location:</strong> {formData.location}, Alberta</div>
                <div><strong>Lot Size:</strong> {LOT_SIZE_CONFIG[formData.lotSize].label}</div>
                <div><strong>Services:</strong> {formData.selectedServices.join(', ')}</div>
                <div><strong>We will call you at:</strong> {formData.phone} within 2 hours.</div>
              </div>
              <div className="pt-4 flex gap-3 justify-center">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 rounded-full border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-50"
                >
                  Calculate Another Yard
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-[#172b21] text-white text-xs font-bold hover:bg-[#0f2319]"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Select Property Lot Size */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                  1. Choose Your Yard / Lot Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(Object.keys(LOT_SIZE_CONFIG) as Array<keyof typeof LOT_SIZE_CONFIG>).map((key) => {
                    const item = LOT_SIZE_CONFIG[key];
                    const isSelected = formData.lotSize === key;
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => updateField('lotSize', key)}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#143222] text-white border-[#143222] shadow-sm'
                            : 'bg-[#f9faf7] text-neutral-800 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        <div className="text-xs font-bold capitalize">{key}</div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#bef264]' : 'text-neutral-500'}`}>
                          {item.sqFt}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Select Services */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                  2. Select Services You Need
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICES_DATA.map((service) => {
                    const isSelected = formData.selectedServices.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-emerald-50/70 border-emerald-600 text-emerald-950'
                            : 'bg-[#fcfdfb] border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs font-bold ${
                              isSelected
                                ? 'bg-emerald-700 border-emerald-700 text-white'
                                : 'border-neutral-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-neutral-900">{service.name}</div>
                            <div className="text-[10px] text-neutral-500">{service.tag}</div>
                          </div>
                        </div>

                        <span className="text-xs font-semibold text-neutral-600">
                          ~${Math.round(service.priceStartingAt * LOT_SIZE_CONFIG[formData.lotSize].multiplier)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Service Frequency */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                  3. Service Schedule / Frequency
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'one-time', label: 'One-Time Visit', desc: 'Standard single service' },
                    { id: 'weekly', label: 'Weekly Mowing', desc: 'Save 10% on season' },
                    { id: 'seasonal-pass', label: 'Full Season Bundle', desc: 'Save 20% + priority' },
                  ].map((freq) => {
                    const isSelected = formData.frequency === freq.id;
                    return (
                      <button
                        type="button"
                        key={freq.id}
                        onClick={() => updateField('frequency', freq.id as any)}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#143222] text-white border-[#143222]'
                            : 'bg-[#f9faf7] text-neutral-800 border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="text-xs font-bold">{freq.label}</div>
                        <div className={`text-[10px] ${isSelected ? 'text-[#bef264]' : 'text-neutral-500'}`}>
                          {freq.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Contact Information */}
              <div className="pt-2 border-t border-neutral-200/80">
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                  4. Your Contact & Property Address
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-emerald-600"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number * (e.g. 780-555-0199)"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-emerald-600"
                    />
                  </div>
                  <div>
                    <select
                      value={formData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-emerald-600 bg-white"
                    >
                      <option value="Sylvan Lake">Sylvan Lake, AB</option>
                      <option value="Red Deer">Red Deer, AB</option>
                      <option value="Blackfalds">Blackfalds, AB</option>
                      <option value="Lacombe">Lacombe, AB</option>
                      <option value="Innisfail">Innisfail, AB</option>
                      <option value="Ponoka">Ponoka, AB</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing Summary Box */}
              <div className="p-4 rounded-2xl bg-[#f4f8f3] border border-[#d5e5d3] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-neutral-600 flex items-center gap-2">
                    <span>Subtotal: ${pricing.subtotal}</span>
                    {pricing.discount > 0 && (
                      <span className="text-emerald-700 font-bold">
                        (Discount: -${pricing.discount})
                      </span>
                    )}
                    <span>· 5% AB GST: ${pricing.gst}</span>
                  </div>
                  <div className="text-2xl font-black text-[#0f2319] tracking-tight flex items-baseline gap-2">
                    <span>Estimated Total:</span>
                    <span className="text-emerald-700">${pricing.total}</span>
                    <span className="text-xs text-neutral-500 font-medium">CAD</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#bef264] hover:bg-[#d9f99d] text-[#0f2319] font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Confirm Free Assessment</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
