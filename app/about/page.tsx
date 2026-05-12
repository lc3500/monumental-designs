import type { Metadata } from "next";
import { getPageSeo } from "@/lib/strapi-content";
import AboutClient from "./AboutClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo(
    "about",
    "About Nicole Setser — Monumental Designs",
    "Meet Nicole Setser, Fort Wayne interior designer and founder of Monumental Designs. Specializing in custom kitchen and bath design across northeast Indiana."
  );
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: { canonical: "https://monumentaldesigns.net/about" },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: "https://monumentaldesigns.net/about",
      ...(seo.shareImageUrl && { images: [{ url: seo.shareImageUrl, alt: seo.metaTitle }] }),
    },
  };
}

export default function Page() {
  return <AboutClient />;
}
