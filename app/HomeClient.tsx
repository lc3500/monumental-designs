"use client";

import Header from "./header";
import LandingSection from "./landing";
import AboutSnippet from "./about-snippet";
import ImagesSection from "@/components/ImagesSection";
import HomeContent from "./home-content";
import WhyClientsLoveUs from "@/components/WhyClientsLoveUs";
import { getHomePageClient } from "@/lib/strapi-client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type HomeData = Awaited<ReturnType<typeof getHomePageClient>>;

export default function Home() {
  const [home, setHome] = useState<HomeData | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getHomePageClient();
        setHome(data);
      } catch (error) {
        window.location.href = "/content-unavailable";
      }
    };

    load();
  }, []);

  if (!home) {
    return (
      <HomeContent>
        <Header />
        <div className="px-6 py-16">
          <Skeleton className="h-12 w-2/3 mb-6" />
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </HomeContent>
    );
  }

  return (
    <HomeContent>
      <Header />
      <LandingSection
        location={home.landing.location}
        headline={home.landing.headline}
        highlight={home.landing.highlight}
        headlineSuffix={home.landing.headlineSuffix}
        ctaLabel={home.landing.ctaLabel}
        ctaHref={home.landing.ctaHref}
      />
      <ImagesSection
        title={home.imagesSection.title}
        ctaLabel={home.imagesSection.ctaLabel}
        ctaHref={home.imagesSection.ctaHref}
        images={home.imagesSection.images}
      />
      <WhyClientsLoveUs title={home.whyClientsLoveUs.title} items={home.whyClientsLoveUs.items} />
      <AboutSnippet
        name={home.aboutSnippet.name}
        role={home.aboutSnippet.role}
        photoUrl={home.aboutSnippet.photoUrl}
        excerpt={home.aboutSnippet.excerpt}
        ctaLabel={home.aboutSnippet.ctaLabel}
        ctaHref={home.aboutSnippet.ctaHref}
      />
      <div className="h-30" />
    </HomeContent>
  );
}
