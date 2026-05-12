"use client";

import { GalleryImage } from "@/components/GalleryImage";
import MotionCloseButton from "./motion-close-button";
import Title from "./title";
import { getGalleryPageClient } from "@/lib/strapi-client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type GalleryData = Awaited<ReturnType<typeof getGalleryPageClient>>;

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryData | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getGalleryPageClient();
        setGallery(data);
      } catch (error) {
        window.location.href = "/content-unavailable";
      }
    };

    load();
  }, []);

  if (!gallery) {
    return (
      <main className="min-h-screen w-screen flex flex-col items-center justify-start gap-8 bg-white">
        <MotionCloseButton />
        <div className="p-10 flex flex-row gap-20 justify-around items-center w-full">
          <Skeleton className="h-10 w-1/2" />
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6 w-full max-w-6xl px-10">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
        <br />
        <br />
        <br />
        <br />
      </main>
    );
  }

  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-start gap-8 bg-white">
      <MotionCloseButton />

      <div className="p-10 flex flex-row gap-20 justify-around items-center w-full">
        <Title title={gallery.title} />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6 w-full max-w-6xl px-10">
        {gallery.images.map((image, index) => (
          <GalleryImage key={image} src={image} alt={`${index + 1}`} />
        ))}
      </div>
      <br /><br /><br /><br />
    </main>
  );
}

// (no top-level effects) all effects run inside the component
