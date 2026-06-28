import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SITE } from '@/lib/site'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'SM Chemicals — Industrial Chemical Solutions',
    template: '%s — SM Chemicals',
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'industrial chemicals', 'water treatment chemicals', 'ETP chemicals',
    'STP chemicals', 'cooling tower chemicals', 'boiler chemicals',
    'textile chemicals', 'construction chemicals', 'chemical supplier India',
    'Hyderabad chemicals',
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: 'SM Chemicals — Industrial Chemical Solutions',
    description: SITE.description,
    url: SITE.url,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SM Chemicals — Industrial Chemical Solutions',
    description: SITE.description,
  },
  robots: { index: true, follow: true },
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
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
