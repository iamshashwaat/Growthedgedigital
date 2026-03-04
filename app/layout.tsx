import type { Metadata } from 'next'
import { DM_Sans, Permanent_Marker } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
});

export const metadata: Metadata = {
  title: 'GrowthEdge Digital | Your Vision, Our Craft, Real Growth',
  description: 'GrowthEdge Digital - We transform your vision into real growth through expert digital marketing, branding, and web design services.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${permanentMarker.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
