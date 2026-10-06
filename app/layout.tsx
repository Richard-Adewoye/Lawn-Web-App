import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'LawnBuster — Central Alberta Lawn Care',
  description: 'Central Alberta lawn care, done right now. Mowing, landscaping, aeration, and snow removal for homes and businesses across Sylvan Lake, Red Deer, and Central Alberta.',
  openGraph: {
    title: 'LawnBuster — Central Alberta Lawn Care',
    description: 'Central Alberta lawn care, done right now. Mowing, landscaping, aeration, and snow removal for homes and businesses across Sylvan Lake, Red Deer, and Central Alberta.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LawnBuster — Central Alberta Lawn Care',
    description: 'Central Alberta lawn care, done right now. Mowing, landscaping, aeration, and snow removal for homes and businesses across Sylvan Lake, Red Deer, and Central Alberta.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
