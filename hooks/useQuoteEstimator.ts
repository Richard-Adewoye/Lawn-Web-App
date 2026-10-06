'use client';

import { useState, useMemo } from 'react';
import { QuoteFormData } from '@/types';

export const LOT_SIZE_CONFIG = {
  small: { label: 'Small Lot (< 3,000 sq ft)', multiplier: 0.85, sqFt: '2,500 sq ft' },
  standard: { label: 'Standard Lot (3,000 – 6,000 sq ft)', multiplier: 1.0, sqFt: '4,500 sq ft' },
  large: { label: 'Large Lot (6,000 – 12,000 sq ft)', multiplier: 1.45, sqFt: '8,500 sq ft' },
  acreage: { label: 'Acreage / Commercial (> 12,000 sq ft)', multiplier: 2.2, sqFt: '15,000+ sq ft' },
};

export const BASE_SERVICE_RATES: Record<string, number> = {
  'weekly-mowing': 45,
  'power-raking': 89,
  'fertilizing': 65,
  'aeration': 79,
  'landscaping': 299,
  'snow-removal': 149,
};

export function useQuoteEstimator() {
  const [formData, setFormData] = useState<QuoteFormData>({
    propertyType: 'residential',
    lotSize: 'standard',
    location: 'Sylvan Lake',
    selectedServices: ['weekly-mowing', 'power-raking'],
    frequency: 'weekly',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const pricing = useMemo(() => {
    const lotFactor = LOT_SIZE_CONFIG[formData.lotSize].multiplier;
    const servicesSubtotal = formData.selectedServices.reduce((sum, serviceId) => {
      const base = BASE_SERVICE_RATES[serviceId] || 50;
      return sum + base * lotFactor;
    }, 0);

    // Apply frequency discounts
    let discountPercent = 0;
    if (formData.frequency === 'seasonal-pass') discountPercent = 0.20; // 20% off seasonal bundle
    if (formData.frequency === 'weekly') discountPercent = 0.10; // 10% off recurring weekly

    const discountAmount = servicesSubtotal * discountPercent;
    const discountedTotal = Math.max(0, servicesSubtotal - discountAmount);
    const albertaGst = discountedTotal * 0.05; // 5% Alberta GST (no PST in AB)
    const grandTotal = discountedTotal + albertaGst;

    return {
      subtotal: Math.round(servicesSubtotal),
      discount: Math.round(discountAmount),
      gst: Math.round(albertaGst),
      total: Math.round(grandTotal),
    };
  }, [formData.lotSize, formData.selectedServices, formData.frequency]);

  const toggleService = (serviceId: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(serviceId);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((s) => s !== serviceId)
          : [...prev.selectedServices, serviceId],
      };
    });
  };

  const updateField = <K extends keyof QuoteFormData>(field: K, value: QuoteFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      propertyType: 'residential',
      lotSize: 'standard',
      location: 'Sylvan Lake',
      selectedServices: ['weekly-mowing', 'power-raking'],
      frequency: 'weekly',
      name: '',
      email: '',
      phone: '',
      notes: '',
    });
    setIsSubmitted(false);
  };

  return {
    formData,
    pricing,
    isSubmitted,
    setIsSubmitted,
    toggleService,
    updateField,
    resetForm,
  };
}
