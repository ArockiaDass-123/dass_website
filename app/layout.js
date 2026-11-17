import { Geist, Geist_Mono, Baloo_2, Dancing_Script } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";
import { SITE_URL } from '@/lib/siteConfig';
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const description =
  'Arockia Dass is a Freelancer and Full-stack Developer in Kodaikanal specializing in MERN stack, AI/ML projects, and B.Sc/MCA college projects. Explore production web apps, ML models, and development portfolio.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Arockia Dass | Freelancer in Kodaikanal | AI ML & College Projects',
    template: '%s | Arockia Dass',
  },
  description,
  keywords: [
    'arockiadass',
    'Arockia Dass',
    'Arockia Dass J',
    'freelancer in kodaikanal',
    'freelance web developer kodaikanal',
    'ai ml project',
    'ai ml projects',
    'bsc college project',
    'mca college project',
    'college final year project',
    'Full-stack Developer',
    'MERN Developer',
    'React.js Developer',
    'Node.js Developer',
    'Full Stack Web Developer Portfolio',
    'Next.js Portfolio',
    'AI & Data Analytics',
    'JavaScript Developer India',
    'Kodaikanal',
    'Tamil Nadu',
    'India',
  ],
  authors: [{ name: 'Arockia Dass', url: SITE_URL }],
  creator: 'Arockia Dass',
  publisher: 'Arockia Dass',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    title: 'Arockia Dass | Freelancer in Kodaikanal | AI ML & College Projects',
    description,
    siteName: 'Arockia Dass Portfolio',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Arockia Dass | Freelancer in Kodaikanal | AI ML & College Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arockia Dass | Freelancer in Kodaikanal | AI ML & College Projects',
    description,
    images: ['/opengraph-image'],
    creator: '@ArockiaDass',
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
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: '2ojO_Y2tZ_bmaAJ7M9RnjdSYuYovdb8SfVq0wFk74Ac',
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png' },
      { url: '/favicons/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/favicons/manifest.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${baloo.variable} ${dancing.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${baloo.variable} ${dancing.variable} h-full antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: 'Arockia Dass | Full-stack Developer Portfolio',
                  description: description,
                  inLanguage: 'en-IN',
                  author: {
                    '@id': `${SITE_URL}/#person`,
                  },
                },
                {
                  '@type': 'Person',
                  '@id': `${SITE_URL}/#person`,
                  name: 'Arockia Dass',
                  alternateName: 'Arockia Dass J',
                  url: SITE_URL,
                  image: `${SITE_URL}/assets/vinith.jpg`,
                  email: 'arockiadassvinith@gmail.com',
                  jobTitle: 'Full-stack Developer',
                  description: description,
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Kodaikanal',
                    addressRegion: 'Tamil Nadu',
                    addressCountry: 'IN',
                  },
                  knowsAbout: [
                    'Freelancer in Kodaikanal',
                    'AI ML Projects',
                    'B.Sc Computer Science College Projects',
                    'MCA Final Year Projects',
                    'Full-stack Web Development',
                    'MERN Stack',
                    'React.js',
                    'Next.js',
                    'Node.js',
                    'Express.js',
                    'MongoDB',
                    'JavaScript',
                    'Python',
                    'SQL',
                    'Artificial Intelligence',
                    'Data Analytics'
                  ],
                  sameAs: [
                    'https://github.com/ArockiaDass-123',
                    'https://www.linkedin.com/in/arockia-dass-j-701153337/',
                  ],
                },
              ],
            }),
          }}
        />
        <Cursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
