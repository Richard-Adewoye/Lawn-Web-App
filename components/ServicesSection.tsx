'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Sprout, Trees, Snowflake, Droplets, Scissors } from 'lucide-react';
import { ServiceItem } from '@/types';
import { SERVICES_DATA } from '@/data/content';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-white" />;
      case 'Sprout':
        return <Sprout className="w-4 h-4 text-white" />;
      case 'Trees':
        return <Trees className="w-4 h-4 text-white" />;
      case 'Snowflake':
        return <Snowflake className="w-4 h-4 text-white" />;
      case 'Droplets':
        return <Droplets className="w-4 h-4 text-white" />;
      default:
        return <Scissors className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          {/* Green dot section tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#15803d]" />
            <span className="text-xs font-bold tracking-wider uppercase text-neutral-600">
              OUR SERVICES
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2319] tracking-tight leading-[1.1]">
            Everything <br />
            your <span className="font-serif-accent italic font-normal text-emerald-800">property</span> <br />
            needs
          </h2>
        </div>

        {/* Right description and carousel arrows */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:max-w-md">
          <p className="text-sm text-neutral-600 leading-relaxed font-normal">
            We handle the full seasonal cycle — no juggling multiple contractors.
          </p>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={scrollLeft}
              aria-label="Previous services"
              className="w-9 h-9 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-colors shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Next services"
              className="w-9 h-9 rounded-full bg-[#172b21] hover:bg-[#0f2319] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Services Cards Slider - Exact replica from screenshot */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2"
      >
        {SERVICES_DATA.map((service) => (
          <div
            key={service.id}
            className="group relative w-[280px] sm:w-[310px] shrink-0 rounded-[28px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-200/90 flex flex-col justify-between bg-[#13271d] text-white min-h-[440px]"
          >
            {/* Background Image with dark bottom gradient for legibility */}
            <div className="absolute inset-0 z-0">
              <Image
                src={service.image}
                alt={service.name}
                fill
                referrerPolicy="no-referrer"
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            </div>

            {/* Top row: Category tag + Circular icon badge */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                {service.tag}
              </span>
              <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/25 flex items-center justify-center">
                {renderIcon(service.iconName)}
              </div>
            </div>

            {/* Bottom content: Title, Description, and Learn More button */}
            <div className="relative z-10 p-5 pt-0">
              <h3 className="text-xl font-bold text-white tracking-tight">{service.name}</h3>
              <p className="mt-2 text-xs text-white/80 line-clamp-2 leading-relaxed">
                {service.description}
              </p>

              <div className="mt-4 flex items-center justify-between pt-2">
                <button
                  onClick={() => onSelectService(service)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-neutral-100 text-[#0f2319] text-xs font-bold transition-all shadow-md group-hover:bg-[#bef264] cursor-pointer"
                >
                  <span>Learn More</span>
                  <div className="w-4 h-4 rounded-full bg-[#0f2319] text-white group-hover:text-[#0f2319] group-hover:bg-white flex items-center justify-center">
                    <ArrowUpRight className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                </button>

                <span className="text-[11px] font-medium text-white/70">
                  from ${service.priceStartingAt} CAD
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
