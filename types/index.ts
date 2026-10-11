export interface ServiceItem {
  id: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  iconName: string;
  priceStartingAt: number;
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'year-round';
  details: {
    overview: string;
    whatIsIncluded: string[];
    idealTiming: string;
    faq: { q: string; a: string }[];
  };
}

export interface QuoteFormData {
  propertyType: 'residential' | 'commercial' | 'acreage';
  lotSize: 'small' | 'standard' | 'large' | 'acreage';
  location: string;
  selectedServices: string[];
  frequency: 'one-time' | 'weekly' | 'bi-weekly' | 'seasonal-pass';
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export interface EducationalModule {
  id: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Architect';
  title: string;
  description: string;
  concepts: string[];
  appliedInComponent: string;
  codeSnippet: string;
  deepDiveExplanation: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  city: 'Red Deer' | 'Sylvan Lake';
  neighborhood: string;
  rating: number;
  date: string;
  service: string;
  tenure: string;
  highlight: string;
  comment: string;
  verified: boolean;
  avatarInitials: string;
  avatarBg: string;
  helpfulCount: number;
}
