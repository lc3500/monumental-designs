import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MotionLayout from "@/components/motion-layout";
import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/mobile-menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monumental Designs",
  description: "Interior Design in Fort Wayne, IN",
  applicationName: "Monumental Designs",
  authors: [{ name: "Nicole Setser", url: "https://www.nicolesetser.com" }],
  keywords: [
    "Interior Design",
    "Kitchen Design",
    "Bath Design",
    "Fort Wayne Interior Designer",
    "Home Renovation",
    "Kitchen Remodel",
    "Bathroom Remodel",
    "Custom Kitchen Design",
    "Custom Bath Design",
    "Residential Interior Design",
    "Interior Decorator",
    "Home Improvement",
    "Space Planning",
    "Interior Styling",
    "Monumental Designs",
  ],
  openGraph: {
    title: "Monumental Designs",
    description: "Interior Design in Fort Wayne, IN",
    url: "https://www.monumentaldesigns.com",
    siteName: "Monumental Designs",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Monumental Designs Logo",
      },
      {
        url: "/1.webp",
        width: 800,
        height: 600,
        alt: "Fireplace, Living Room",
      }
    ],
    locale: "en-US",
    type: "website",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Monumental Designs",
    "description": "Interior Design Services in Fort Wayne, IN. Specializing in custom kitchen and bath design, home remodels, and residential interior design.",
    "url": "https://monumentaldesigns.net",
    "logo": "https://monumentaldesigns.net/logo.png",
    "image": "https://monumentaldesigns.net/1.webp",
    "telephone": "+1-260-xxx-xxxx", // Update with actual phone number
    "email": "nicole@monumentaldesigns.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Fort Wayne",
      "addressRegion": "IN",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.0793",
      "longitude": "-85.1394"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    "priceRange": "$$",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "41.0793",
        "longitude": "-85.1394"
      },
      "geoRadius": "50000"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MotionLayout>
          {children}
        </MotionLayout>
        <MobileMenu />
        
      </body>
    </html>
  );
}
