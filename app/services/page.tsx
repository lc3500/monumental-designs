import type { Metadata } from "next";
import { getPageSeo } from "@/lib/strapi-content";
import ServicesClient from "./ServicesClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo(
    "service",
    "Interior Design Services — Monumental Designs",
    "Custom kitchen design, bathroom remodeling, home renovation, and residential interior design services in Fort Wayne and northeast Indiana."
  );
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: { canonical: "https://monumentaldesigns.net/services" },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: "https://monumentaldesigns.net/services",
    },
  };
}

export default function Page() {
  return <ServicesClient />;
}
