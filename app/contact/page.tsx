import type { Metadata } from "next";
import { getPageSeo } from "@/lib/strapi-content";
import ContactClient from "./ContactClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo(
    "contact",
    "Contact Us — Monumental Designs",
    "Get in touch with Monumental Designs. Schedule a consultation with Fort Wayne interior designer Nicole Setser."
  );
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: { canonical: "https://monumentaldesigns.net/contact" },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: "https://monumentaldesigns.net/contact",
    },
  };
}

export default function Page() {
  return <ContactClient />;
}
