import type { Metadata } from "next";
import { getPageSeo } from "@/lib/strapi-content";
import HomeClient from "./HomeClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo(
    "home",
    "Monumental Designs — Interior Design in Fort Wayne, IN",
    "Fort Wayne interior designer specializing in custom kitchen & bath design, home remodels, and residential interior design across northeast Indiana."
  );
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: { canonical: "https://monumentaldesigns.net" },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: "https://monumentaldesigns.net",
      ...(seo.shareImageUrl && { images: [{ url: seo.shareImageUrl, alt: seo.metaTitle }] }),
    },
  };
}

export default function Page() {
  return <HomeClient />;
}
