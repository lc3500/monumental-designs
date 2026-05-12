import type { Metadata } from "next";
import { getPageSeo } from "@/lib/strapi-content";
import GalleryClient from "./GalleryClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo(
    "gallery",
    "Design Gallery — Monumental Designs",
    "Browse interior design projects by Monumental Designs — custom kitchens, bathrooms, and residential spaces in Fort Wayne, Indiana."
  );
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: { canonical: "https://monumentaldesigns.net/gallery" },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: "https://monumentaldesigns.net/gallery",
      ...(seo.shareImageUrl && { images: [{ url: seo.shareImageUrl, alt: seo.metaTitle }] }),
    },
  };
}

export default function Page() {
  return <GalleryClient />;
}
