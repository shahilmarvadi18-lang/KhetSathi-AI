import type { Metadata } from 'next'
import './globals.css'
import { SessionProvider } from './SessionProvider'
import { LanguageProvider } from '@/context/LanguageContext'
import { LocationProvider } from '@/context/LocationContext'

export const metadata: Metadata = {
  title: 'KhetSathi AI — Smart Farming for Bharat',
  description: 'AI-powered crop intelligence, weather alerts, and Mandi insights for Indian farmers.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SessionProvider>
          <LanguageProvider>
            <LocationProvider>{children}</LocationProvider>
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
