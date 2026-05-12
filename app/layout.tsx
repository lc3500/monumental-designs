import type { Metadata } from "next";
import "./globals.css";
import MotionLayout from "@/components/motion-layout";
import MobileMenu from "@/components/mobile-menu";
import StrapiHealthGate from "@/components/StrapiHealthGate";
import { Toaster } from "sonner";
import { getGlobalSeo } from "@/lib/strapi-content";

const SITE_URL = "https://monumentaldesigns.net";

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobalSeo();
  const ogImages = [
    ...(global.shareImageUrl
      ? [{ url: global.shareImageUrl, alt: "Monumental Designs" }]
      : []),
    { url: "/logo.png", width: 1200, height: 630, alt: "Monumental Designs Logo" },
    { url: "/1.webp", width: 800, height: 600, alt: "Interior design project by Monumental Designs" },
  ];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: global.metaTitle,
      template: "%s | Monumental Designs",
    },
    description: global.metaDescription,
    applicationName: "Monumental Designs",
    authors: [{ name: "Nicole Setser", url: "https://www.nicolesetser.com" }],
    keywords: [
      "interior design indiana",
      "indiana interior designer",
      "northeast indiana interior designer",
      "fort wayne interior designer",
      "fort wayne indiana interior design",
      "fort wayne home design",
      "fort wayne kitchen remodel",
      "fort wayne bathroom remodel",
      "indiana kitchen design",
      "indiana bathroom remodel",
      "interior design fort wayne",
      "kitchen design fort wayne",
      "bath design fort wayne",
      "home renovation fort wayne",
      "custom kitchen design",
      "custom bath design",
      "residential interior design",
      "interior decorator",
      "space planning",
      "Monumental Designs",
      "Nicole Setser",
    ],
    alternates: { canonical: SITE_URL },
    openGraph: {
      title: global.metaTitle,
      description: global.metaDescription,
      url: SITE_URL,
      siteName: "Monumental Designs",
      images: ogImages,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: global.metaTitle,
      description: global.metaDescription,
      images: global.shareImageUrl ? [global.shareImageUrl] : ["/logo.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: "Monumental Designs",
    description:
      "Interior design services in Fort Wayne, IN. Specializing in custom kitchen and bath design, home remodels, and residential interior design across northeast Indiana.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/1.webp`,
    telephone: "+1-260-704-4684",
    email: "nicole@monumentaldesigns.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fort Wayne",
      addressRegion: "IN",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "41.0793",
      longitude: "-85.1394",
    },
    hasMap: "https://maps.google.com/?q=Fort+Wayne,+IN",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    priceRange: "$$",
    areaServed: [
      { "@type": "City", name: "Fort Wayne", containedInPlace: { "@type": "State", name: "Indiana" } },
      { "@type": "State", name: "Indiana" },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "41.0793",
        longitude: "-85.1394",
      },
      geoRadius: "80000",
    },
    knowsAbout: [
      "Interior Design",
      "Kitchen Design",
      "Bathroom Remodeling",
      "Home Renovation",
      "Space Planning",
      "Residential Interior Design",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">
        <MotionLayout>
          <StrapiHealthGate />
          {children}
        </MotionLayout>
        <MobileMenu />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
