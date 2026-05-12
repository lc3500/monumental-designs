"use client";

import Header from "../header";
import Heading from "./heading";
import GoHomeButton from "../../components/GoHomeButton";
import ContentBlocks from "@/components/ContentBlocks";
import { getAboutPageClient } from "@/lib/strapi-client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type AboutData = Awaited<ReturnType<typeof getAboutPageClient>>;

export default function AboutUs() {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAboutPageClient();
        setAbout(data);
      } catch (error) {
        window.location.href = "/content-unavailable";
      }
    };

    load();
  }, []);

  if (!about) {
    return (
      <main className="pt-20 flex flex-col items-center justify-start w-screen min-h-screen">
        <Header />
        <section className="px-5 md:pl-20 md:pr-20 pb-20 text-lg text-left w-full max-w-4xl">
          <Skeleton className="h-10 w-1/2 mb-6" />
          <Skeleton className="h-6 w-2/3 mb-3" />
          <Skeleton className="h-6 w-5/6 mb-3" />
          <Skeleton className="h-6 w-4/6" />
        </section>
        <GoHomeButton />
      </main>
    );
  }

  return (
    <main className="pt-20 flex flex-col items-center justify-start w-screen min-h-screen">
      <Header />
      <Heading name={about.heading.name} role={about.heading.role} photoUrl={about.heading.photoUrl} />
      <section className="px-5 md:pl-20 md:pr-20 pb-20 text-lg text-left">
        {about.contentBlocks?.length ? (
          <ContentBlocks blocks={about.contentBlocks} />
        ) : (
          <div className="rich-text" dangerouslySetInnerHTML={{ __html: about.body }} />
        )}
      </section>
      <GoHomeButton />
    </main>
  );
}
