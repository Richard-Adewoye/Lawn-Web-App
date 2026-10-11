import type { Metadata } from 'next';
import './globals.css'; // Global styles

const siteUrl = process.env.APP_URL || 'https://lawnbuster.ca';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'LawnBuster — Central Alberta Lawn Care',
  description:
    'Central Alberta lawn care, done right now. Mowing, landscaping, aeration, power raking, and snow removal for homes and businesses across Sylvan Lake, Red Deer, and Central Alberta.',
  keywords: [
    'lawn care Red Deer',
    'lawn care Sylvan Lake',
    'lawn mowing Red Deer',
    'lawn mowing Sylvan Lake',
    'power raking Central Alberta',
    'spring lawn cleanup Red Deer',
    'aeration service Sylvan Lake',
    'fertilizing Alberta turf',
    'landscaping Red Deer AB',
    'residential lawn care Blackfalds',
    'commercial turf maintenance Lacombe',
    'snow removal Red Deer',
    'snow removal Sylvan Lake',
    'LawnBuster Alberta',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LawnBuster — Central Alberta Lawn Care',
    description:
      'Central Alberta lawn care, done right now. Mowing, landscaping, aeration, power raking, and snow removal across Sylvan Lake, Red Deer, and Central Alberta.',
    url: siteUrl,
    siteName: 'LawnBuster',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/images/hero_lawn_worker.jpg',
        width: 1200,
        height: 630,
        alt: 'LawnBuster Professional Lawn Care Technician Mowing Prairie Turf in Central Alberta',
      },
      {
        url: '/images/about_lawn_mower.jpg',
        width: 1200,
        height: 630,
        alt: 'Commercial Lawn Mower Creating Crisp Prairie Stripes in Sylvan Lake',
      },
      {
        url: '/images/process_beautiful_home.jpg',
        width: 1200,
        height: 630,
        alt: 'Pristine Maintained Residential Lawn in Red Deer Alberta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LawnBuster — Central Alberta Lawn Care',
    description:
      'Central Alberta lawn care, done right now. Mowing, landscaping, aeration, power raking, and snow removal for homes and businesses across Sylvan Lake, Red Deer, and Central Alberta.',
    images: ['/images/hero_lawn_worker.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'LawnBuster',
  description:
    'Professional lawn maintenance, power raking, fertilizing, landscaping, and winter snow removal in Central Alberta serving Red Deer, Sylvan Lake, Blackfalds, and Lacombe.',
  url: siteUrl,
  telephone: '+1-403-555-LAWN',
  areaServed: [
    {
      '@type': 'City',
      name: 'Red Deer',
    },
    {
      '@type': 'City',
      name: 'Sylvan Lake',
    },
    {
      '@type': 'City',
      name: 'Blackfalds',
    },
    {
      '@type': 'City',
      name: 'Lacombe',
    },
  ],
  priceRange: '$$',
  openingHours: 'Mo-Sa 07:00-19:00',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sylvan Lake',
    addressRegion: 'AB',
    addressCountry: 'CA',
  },
  image: [
    `${siteUrl}/images/hero_lawn_worker.jpg`,
    `${siteUrl}/images/about_lawn_mower.jpg`,
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
