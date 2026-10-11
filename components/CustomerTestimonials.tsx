'use client';

import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  MapPin,
  ThumbsUp,
  CheckCircle2,
  MessageSquarePlus,
  ArrowUpRight,
  Sparkles,
  Search,
  Filter,
  Check,
  X,
  Send,
  Heart
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '@/data/content';
import { TestimonialItem } from '@/types';

interface CustomerTestimonialsProps {
  onOpenQuote: () => void;
}

export function CustomerTestimonials({ onOpenQuote }: CustomerTestimonialsProps) {
  const [selectedCity, setSelectedCity] = useState<'all' | 'Red Deer' | 'Sylvan Lake'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(TESTIMONIALS_DATA);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState<'Red Deer' | 'Sylvan Lake'>('Red Deer');
  const [newNeighborhood, setNewNeighborhood] = useState('');
  const [newService, setNewService] = useState('Weekly Mowing & Trimming');
  const [newRating, setNewRating] = useState(5);
  const [newHighlight, setNewHighlight] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleToggleHelpful = (id: string, initialCount: number) => {
    if (votedMap[id]) return; // already voted
    setVotedMap((prev) => ({ ...prev, [id]: true }));
    setHelpfulMap((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1,
    }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim() || !newNeighborhood.trim()) return;

    const newReview: TestimonialItem = {
      id: `custom-review-${Date.now()}`,
      author: newAuthor.trim(),
      role: 'Local Homeowner',
      city: newCity,
      neighborhood: newNeighborhood.trim(),
      rating: newRating,
      date: 'Just now',
      service: newService,
      tenure: 'New client in 2026',
      highlight: newHighlight.trim() || 'Exceptional service and communication',
      comment: newComment.trim(),
      verified: true,
      avatarInitials: newAuthor
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'HM',
      avatarBg: newCity === 'Red Deer' ? 'bg-emerald-700 text-emerald-100' : 'bg-teal-700 text-teal-100',
      helpfulCount: 1,
    };

    setTestimonials([newReview, ...testimonials]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsReviewModalOpen(false);
      // reset fields
      setNewAuthor('');
      setNewNeighborhood('');
      setNewHighlight('');
      setNewComment('');
    }, 1800);
  };

  // Filter logic
  const filteredTestimonials = testimonials.filter((item) => {
    const matchesCity = selectedCity === 'all' || item.city === selectedCity;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.author.toLowerCase().includes(query) ||
      item.neighborhood.toLowerCase().includes(query) ||
      item.service.toLowerCase().includes(query) ||
      item.comment.toLowerCase().includes(query);
    return matchesCity && matchesSearch;
  });

  const redDeerCount = testimonials.filter((t) => t.city === 'Red Deer').length;
  const sylvanLakeCount = testimonials.filter((t) => t.city === 'Sylvan Lake').length;

  return (
    <section id="testimonials" className="bg-[#f8faf7] border-y border-[#e2e8dd] py-16 sm:py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            {/* Green dot section badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#15803d] animate-pulse" />
              <span className="text-xs font-bold tracking-wider uppercase text-neutral-600">
                LOCAL HOMEOWNER REVIEWS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2319] tracking-tight leading-[1.15]">
              Loved by homeowners in <br />
              <span className="font-serif-accent italic font-normal text-emerald-800">
                Red Deer & Sylvan Lake
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-neutral-50 text-[#0f2319] border border-[#d2dcd0] text-xs font-bold transition-all shadow-xs hover:shadow cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-emerald-700" />
              <span>Share Your Feedback</span>
            </button>

            <button
              onClick={onOpenQuote}
              className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 bg-[#172b21] hover:bg-[#102018] text-white rounded-full text-xs font-semibold transition-all shadow-md group cursor-pointer"
            >
              <span>Get Free Estimate</span>
              <div className="w-6 h-6 rounded-full bg-[#bef264] text-[#12231b] flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </button>
          </div>
        </div>

        {/* Reputation & Trust Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 bg-white rounded-2xl border border-[#e5ebe2] shadow-xs mb-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
              <Star className="w-5 h-5 fill-amber-400 stroke-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-black text-[#0f2319]">4.98</span>
                <span className="text-xs text-neutral-500 font-bold">/ 5.0</span>
              </div>
              <p className="text-[11px] text-neutral-600">Google & Local Verified</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-black text-[#0f2319]">100%</div>
              <p className="text-[11px] text-neutral-600">Satisfaction Guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-black text-[#0f2319]">240+</div>
              <p className="text-[11px] text-neutral-600">Central AB Yards Serviced</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#f4f7f2] border border-[#e2e8dd] flex items-center justify-center text-[#15803d] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black text-[#0f2319]">Red Deer & Sylvan</div>
              <p className="text-[11px] text-neutral-600">Licensed, Insured & WCB</p>
            </div>
          </div>
        </div>

        {/* Filters and Search Strip */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* City Toggle Pills */}
          <div className="flex items-center p-1 bg-[#eaefe7] rounded-full border border-[#d6dfd3] max-w-fit">
            <button
              onClick={() => setSelectedCity('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCity === 'all'
                  ? 'bg-white text-[#0f2319] shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Central AB ({testimonials.length})
            </button>
            <button
              onClick={() => setSelectedCity('Red Deer')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCity === 'Red Deer'
                  ? 'bg-[#15803d] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>Red Deer</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCity === 'Red Deer' ? 'bg-white/20 text-white' : 'bg-neutral-200/60 text-neutral-600'}`}>
                {redDeerCount}
              </span>
            </button>
            <button
              onClick={() => setSelectedCity('Sylvan Lake')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCity === 'Sylvan Lake'
                  ? 'bg-[#0f766e] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>Sylvan Lake</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCity === 'Sylvan Lake' ? 'bg-white/20 text-white' : 'bg-neutral-200/60 text-neutral-600'}`}>
                {sylvanLakeCount}
              </span>
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[240px] max-w-sm">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by neighborhood or service..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#d6dfd3] rounded-full text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Testimonials Grid */}
        {filteredTestimonials.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#e5ebe2] my-4">
            <MapPin className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-800 mb-1">No feedback matching your filter</h3>
            <p className="text-xs text-neutral-500 mb-4">
              Try clearing your search query or switching to all regions.
            </p>
            <button
              onClick={() => { setSelectedCity('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-full bg-[#15803d] text-white text-xs font-semibold hover:bg-[#166534] transition-colors"
            >
              View All Reviews
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((review) => {
              const currentHelpful = helpfulMap[review.id] ?? review.helpfulCount;
              const hasVoted = votedMap[review.id];

              return (
                <div
                  key={review.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e5ebe2] flex flex-col justify-between shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5 group"
                >
                  <div>
                    {/* Top Row: Stars + Location Tag */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 stroke-amber-500"
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                            review.city === 'Red Deer'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-teal-50 text-teal-800 border border-teal-200'
                          }`}
                        >
                          <MapPin className="w-3 h-3" />
                          <span>{review.city}</span>
                        </span>
                      </div>
                    </div>

                    {/* Neighborhood & Service Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[11px] font-semibold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-md">
                        {review.neighborhood}
                      </span>
                      <span className="text-[11px] font-medium text-emerald-900 bg-[#eaf7ea] px-2 py-0.5 rounded-md">
                        {review.service}
                      </span>
                    </div>

                    {/* Highlight Lead Title */}
                    <h3 className="text-sm font-bold text-[#0f2319] mb-2 leading-snug">
                      &ldquo;{review.highlight}&rdquo;
                    </h3>

                    {/* Testimonial Quote */}
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal mb-5">
                      {review.comment}
                    </p>
                  </div>

                  {/* Bottom: Author info + Helpful upvote */}
                  <div className="pt-4 border-t border-[#f0f3ee] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${review.avatarBg} font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                      >
                        {review.avatarInitials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="text-xs font-bold text-neutral-900 leading-none">
                            {review.author}
                          </h4>
                          {review.verified && (
                            <span title="Verified Homeowner">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-neutral-500 mt-0.5">
                          {review.tenure} · {review.date}
                        </div>
                      </div>
                    </div>

                    {/* Helpful Button */}
                    <button
                      onClick={() => handleToggleHelpful(review.id, review.helpfulCount)}
                      disabled={hasVoted}
                      aria-label="Mark review as helpful"
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] transition-colors cursor-pointer ${
                        hasVoted
                          ? 'bg-emerald-100 text-emerald-800 font-semibold'
                          : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
                      }`}
                    >
                      <ThumbsUp className={`w-3 h-3 ${hasVoted ? 'fill-emerald-700 stroke-emerald-700' : ''}`} />
                      <span>{currentHelpful}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Neighborhood Coverage Highlight Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#0f2319] to-[#163826] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-emerald-900">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#bef264] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CENTRAL ALBERTA SERVICE ROUTES</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Proudly servicing Red Deer, Sylvan Lake, and nearby acreage communities
            </h3>
            <p className="text-xs text-white/75 max-w-2xl leading-relaxed">
              Including Anders Park, Vanier Woods, Deer Park, Timberlands, Oriole Park, Marina Bay, Hewlett Park, Cottage Club, Lacombe, and Blackfalds.
            </p>
          </div>

          <button
            onClick={onOpenQuote}
            className="shrink-0 flex items-center gap-2 px-6 py-3 bg-[#bef264] hover:bg-[#a3e635] text-[#0f2419] rounded-full text-xs sm:text-sm font-extrabold transition-all shadow-md hover:scale-105 cursor-pointer"
          >
            <span>Book Your Free Quote</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Review Modal Form */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative animate-in zoom-in-95">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h3 className="text-xl font-black text-[#0f2319]">Thank You for Your Feedback!</h3>
                <p className="text-xs text-neutral-600">
                  Your review has been verified and added to the homeowner showcase.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Homeowner Review
                  </span>
                  <h3 className="text-xl font-black text-[#0f2319] mt-1">
                    Share Your Experience with LawnBuster
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Your feedback helps neighbors across Red Deer & Sylvan Lake make informed choices.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Jason & Sarah Miller"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      City
                    </label>
                    <select
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value as 'Red Deer' | 'Sylvan Lake')}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                    >
                      <option value="Red Deer">Red Deer, AB</option>
                      <option value="Sylvan Lake">Sylvan Lake, AB</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Neighborhood / Community
                    </label>
                    <input
                      type="text"
                      required
                      value={newNeighborhood}
                      onChange={(e) => setNewNeighborhood(e.target.value)}
                      placeholder="e.g. Anders Park, Marina Bay"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Service Received
                    </label>
                    <select
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                    >
                      <option value="Weekly Mowing & Trimming">Weekly Mowing & Trimming</option>
                      <option value="Spring Power Raking & Aeration">Spring Power Raking & Aeration</option>
                      <option value="Granular Fertilizing & Weed Control">Granular Fertilizing & Weed Control</option>
                      <option value="Prairie Custom Landscaping">Prairie Custom Landscaping</option>
                      <option value="Fall Cleanup & Overseeding">Fall Cleanup & Overseeding</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="cursor-pointer p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating
                              ? 'fill-amber-400 stroke-amber-500'
                              : 'fill-neutral-100 stroke-neutral-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-neutral-600 ml-2">
                      {newRating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Headline / Key Highlight
                  </label>
                  <input
                    type="text"
                    required
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    placeholder="e.g. Best lawn service we have ever hired in Central Alberta"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Review Details
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Describe how the crew performed, reliability, gate care, grass appearance..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-[#15803d] hover:bg-[#166534] text-white text-xs font-bold rounded-full transition-colors shadow cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
