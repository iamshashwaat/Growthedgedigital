import type { Metadata, Viewport } from 'next'
import { DM_Sans, Permanent_Marker } from 'next/font/google'
import './globals.css'
import { PageTransition } from '@/components/page-transition'
import { Navbar } from '@/components/navbar'
import { WhatsappWidget } from '@/components/whatsapp-widget'
import PencilCursor from '@/components/pencil-cursor'

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
});

const siteUrl = 'https://www.growthedgedigital.in'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'GrowthEdge Digital | Your Vision, Our Craft, Real Growth',
    template: '%s | GrowthEdge Digital',
  },
  description: 'GrowthEdge Digital - We transform your vision into real growth through expert digital marketing, branding, and web design services.',
  keywords: ['digital marketing agency', 'SEO', 'social media marketing', 'web development', 'branding', 'PPC advertising', 'content marketing', 'India'],
  icons: {
    icon: '/mascot.png',
    apple: '/mascot.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'GrowthEdge Digital',
    title: 'GrowthEdge Digital | Your Vision, Our Craft, Real Growth',
    description: 'We transform your vision into real growth through expert digital marketing, branding, and web design services.',
    url: siteUrl,
    images: [{
      url: '/opengraph-image.png',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrowthEdge Digital | Your Vision, Our Craft, Real Growth',
    description: 'We transform your vision into real growth through expert digital marketing, branding, and web design services.',
    images: ['/opengraph-image.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F5A623',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GrowthEdge Digital',
  url: siteUrl,
  logo: `${siteUrl}/mascot.png`,
  description: 'We transform your vision into real growth through expert digital marketing, branding, and web design services.',
  slogan: 'Your Vision, Our Craft, Real Growth',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-81782-96841',
    contactType: 'customer service',
    email: 'hello@growthedgedigital.in',
    availableLanguage: ['English', 'Hindi'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://wa.me/918178296841',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${permanentMarker.variable} font-sans antialiased`} style={{ cursor: 'none' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PencilCursor />
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
        <WhatsappWidget />
      </body>
    </html>
  )
}
