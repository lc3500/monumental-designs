import {
  StrapiImageCollection,
  StrapiImageEntity,
  StrapiResponse,
  logStrapiEvent,
  normalizeMediaCollection,
  normalizeSingleMedia,
  strapiFetch,
} from "@/lib/strapi";
import {
  fallbackAbout,
  fallbackContact,
  fallbackGallery,
  fallbackHome,
  fallbackServices,
} from "@/content-backups/strapi-fallbacks";

type SeoComponent = {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: StrapiImageEntity;
};

type GlobalAttributes = {
  defaultSeo?: SeoComponent;
  siteName?: string;
  siteDescription?: string;
};

export type SeoResult = {
  metaTitle: string;
  metaDescription: string;
  shareImageUrl: string;
};

const HARDCODED_DEFAULTS: SeoResult = {
  metaTitle: "Monumental Designs",
  metaDescription:
    "Fort Wayne interior designer specializing in custom kitchen & bath design, home remodels, and residential interior design across northeast Indiana.",
  shareImageUrl: "",
};

export async function getGlobalSeo(): Promise<SeoResult> {
  try {
    const response = await strapiFetch<StrapiResponse<GlobalAttributes>>("global", {
      populate: { defaultSeo: { populate: "*" } },
    });
    const attributes =
      response.data && "attributes" in response.data
        ? response.data.attributes
        : response.data;
    return {
      metaTitle: attributes?.defaultSeo?.metaTitle || HARDCODED_DEFAULTS.metaTitle,
      metaDescription:
        attributes?.defaultSeo?.metaDescription || HARDCODED_DEFAULTS.metaDescription,
      shareImageUrl:
        normalizeSingleMedia(attributes?.defaultSeo?.shareImage)?.url || "",
    };
  } catch {
    return HARDCODED_DEFAULTS;
  }
}

export async function getPageSeo(
  endpoint: string,
  fallbackTitle: string,
  fallbackDescription: string
): Promise<SeoResult> {
  const [pageRes, globalSeo] = await Promise.all([
    strapiFetch<StrapiResponse<{ seo?: SeoComponent }>>(endpoint, {
      populate: { seo: { populate: "*" } },
    }).catch(() => null),
    getGlobalSeo(),
  ]);

  const attributes =
    pageRes?.data && "attributes" in pageRes.data
      ? pageRes.data.attributes
      : pageRes?.data;

  return {
    metaTitle:
      attributes?.seo?.metaTitle || globalSeo.metaTitle || fallbackTitle,
    metaDescription:
      attributes?.seo?.metaDescription ||
      globalSeo.metaDescription ||
      fallbackDescription,
    shareImageUrl:
      normalizeSingleMedia(attributes?.seo?.shareImage)?.url ||
      globalSeo.shareImageUrl ||
      "",
  };
}

type LandingComponent = {
  location?: string;
  headline?: string;
  highlight?: string;
  headlineSuffix?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type ImagesSectionComponent = {
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
  images?: StrapiImageCollection;
};

type BenefitsComponent = {
  title?: string;
  items?: Array<{ text?: string }>;
};

type AboutSnippetComponent = {
  name?: string;
  role?: string;
  photo?: StrapiImageEntity;
  excerpt?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type HomeAttributes = {
  landing?: LandingComponent;
  imagesSection?: ImagesSectionComponent;
  whyClientsLoveUs?: BenefitsComponent;
  aboutSnippet?: AboutSnippetComponent;
};

type AboutHeadingComponent = {
  name?: string;
  role?: string;
  photo?: StrapiImageEntity;
};

type AboutAttributes = {
  heading?: AboutHeadingComponent;
  contentBlocks?: ContentBlock[];
  body?: string;
};

type PageHeroComponent = {
  title?: string;
  subtitle?: string;
  backgroundImage?: StrapiImageEntity;
  logo?: StrapiImageEntity;
  gradientOverlay?: string;
  enableParallax?: boolean;
};

type ServiceItemComponent = {
  title?: string;
  subtitle?: string;
  drawerTitle?: string;
  drawerBlocks?: ContentBlock[];
  drawerContent?: string;
};

type ServicesAttributes = {
  hero?: PageHeroComponent;
  intro?: string;
  services?: ServiceItemComponent[];
};

type GalleryAttributes = {
  title?: string;
  subtitle?: string;
  images?: StrapiImageCollection;
};

type ContactAttributes = {
  hero?: PageHeroComponent;
  intro?: string;
};

type ContentBlock = {
  __component?: string;
  text?: string;
  level?: "h2" | "h3" | "h4";
  ordered?: boolean;
  items?: Array<{ text?: string }>;
};

function normalizeContentBlocks(blocks?: ContentBlock[]) {
  if (!blocks?.length) return [];
  return blocks
    .map((block) => {
      const type = block.__component || "";
      if (type === "content.paragraph") {
        return { type: "paragraph", text: block.text || "" };
      }
      if (type === "content.heading") {
        return {
          type: "heading",
          text: block.text || "",
          level: block.level || "h3",
        };
      }
      if (type === "content.list") {
        return {
          type: "list",
          ordered: Boolean(block.ordered),
          items: block.items?.map((item) => item.text || "").filter(Boolean) || [],
        };
      }
      return null;
    })
    .filter(Boolean);
}

export async function getHomePage() {
  try {
    const response = await strapiFetch<StrapiResponse<HomeAttributes>>("home", {
      populate: {
        landing: { populate: "*" },
        imagesSection: { populate: "*" },
        whyClientsLoveUs: { populate: "*" },
        aboutSnippet: { populate: "*" },
      },
    });

    const attributes =
      response.data && "attributes" in response.data
        ? response.data.attributes
        : response.data;

    if (!attributes) {
      logStrapiEvent({
        level: "error",
        kind: "missing-attributes",
        endpoint: "home",
        response,
      });
      return fallbackHome;
    }

    const images = normalizeMediaCollection(attributes.imagesSection?.images);

    return {
      landing: {
        location: attributes.landing?.location || "",
        headline: attributes.landing?.headline || "",
        highlight: attributes.landing?.highlight || "",
        headlineSuffix: attributes.landing?.headlineSuffix || "",
        ctaLabel: attributes.landing?.ctaLabel || "",
        ctaHref: attributes.landing?.ctaHref || "",
      },
      imagesSection: {
        title: attributes.imagesSection?.title || "",
        ctaLabel: attributes.imagesSection?.ctaLabel || "",
        ctaHref: attributes.imagesSection?.ctaHref || "",
        images: images.map((image) => image.url),
      },
      whyClientsLoveUs: {
        title: attributes.whyClientsLoveUs?.title || "",
        items:
          attributes.whyClientsLoveUs?.items
            ?.map((item) => item.text || "")
            .filter(Boolean) || [],
      },
      aboutSnippet: {
        name: attributes.aboutSnippet?.name || "",
        role: attributes.aboutSnippet?.role || "",
        photoUrl: normalizeSingleMedia(attributes.aboutSnippet?.photo)?.url || "",
        excerpt: attributes.aboutSnippet?.excerpt || "",
        ctaLabel: attributes.aboutSnippet?.ctaLabel || "",
        ctaHref: attributes.aboutSnippet?.ctaHref || "",
      },
    };
  } catch (error) {
    logStrapiEvent({
      level: "error",
      kind: "fetch-failed",
      endpoint: "home",
      error: String(error),
    });
    return fallbackHome;
  }
}

export async function getAboutPage() {
  try {
    const response = await strapiFetch<StrapiResponse<AboutAttributes>>("about", {
      populate: {
        heading: { populate: "*" },
        contentBlocks: { populate: "*" },
      },
    });

    const attributes =
      response.data && "attributes" in response.data
        ? response.data.attributes
        : response.data;

    if (!attributes) {
      logStrapiEvent({
        level: "error",
        kind: "missing-attributes",
        endpoint: "about",
        response,
      });
      return fallbackAbout;
    }

    return {
      heading: {
        name: attributes.heading?.name || "",
        role: attributes.heading?.role || "",
        photoUrl: normalizeSingleMedia(attributes.heading?.photo)?.url || "",
      },
      body: attributes.body || "",
      contentBlocks: normalizeContentBlocks(attributes.contentBlocks),
    };
  } catch (error) {
    logStrapiEvent({
      level: "error",
      kind: "fetch-failed",
      endpoint: "about",
      error: String(error),
    });
    return fallbackAbout;
  }
}

export async function getServicesPage() {
  try {
    const response = await strapiFetch<StrapiResponse<ServicesAttributes>>("service", {
      populate: {
        hero: { populate: "*" },
        services: { populate: "*" },
      },
    });

    const attributes =
      response.data && "attributes" in response.data
        ? response.data.attributes
        : response.data;

    if (!attributes) {
      logStrapiEvent({
        level: "error",
        kind: "missing-attributes",
        endpoint: "service",
        response,
      });
      return fallbackServices;
    }

    const heroBackground = normalizeSingleMedia(attributes.hero?.backgroundImage);
    const heroLogo = normalizeSingleMedia(attributes.hero?.logo);

    return {
      hero: {
        title: attributes.hero?.title || "",
        subtitle: attributes.hero?.subtitle || "",
        backgroundImageUrl: heroBackground?.url || "",
        logoUrl: heroLogo?.url || "",
        gradientOverlay: attributes.hero?.gradientOverlay || "",
        enableParallax: attributes.hero?.enableParallax ?? false,
      },
      intro: attributes.intro || "",
      services:
        attributes.services?.length
          ? attributes.services.map((service) => ({
              title: service.title || "",
              subtitle: service.subtitle || "",
              drawerTitle: service.drawerTitle || "",
              drawerContentHtml: service.drawerContent || "",
              drawerContentBlocks: normalizeContentBlocks(service.drawerBlocks),
            }))
          : [],
    };
  } catch (error) {
    logStrapiEvent({
      level: "error",
      kind: "fetch-failed",
      endpoint: "service",
      error: String(error),
    });
    return fallbackServices;
  }
}

export async function getGalleryPage() {
  try {
    const response = await strapiFetch<StrapiResponse<GalleryAttributes>>("gallery", {
      populate: {
        images: { populate: "*" },
      },
    });

    const attributes =
      response.data && "attributes" in response.data
        ? response.data.attributes
        : response.data;

    if (!attributes) {
      logStrapiEvent({
        level: "error",
        kind: "missing-attributes",
        endpoint: "gallery",
        response,
      });
      return fallbackGallery;
    }

    const images = normalizeMediaCollection(attributes.images);

    return {
      title: attributes.title || "",
      subtitle: attributes.subtitle || "",
      images: images.map((image) => image.url),
    };
  } catch (error) {
    logStrapiEvent({
      level: "error",
      kind: "fetch-failed",
      endpoint: "gallery",
      error: String(error),
    });
    return fallbackGallery;
  }
}

export async function getContactPage() {
  try {
    const response = await strapiFetch<StrapiResponse<ContactAttributes>>("contact", {
      populate: {
        hero: { populate: "*" },
      },
    });

    const attributes =
      response.data && "attributes" in response.data
        ? response.data.attributes
        : response.data;

    if (!attributes) {
      logStrapiEvent({
        level: "error",
        kind: "missing-attributes",
        endpoint: "contact",
        response,
      });
      return fallbackContact;
    }

    const heroBackground = normalizeSingleMedia(attributes.hero?.backgroundImage);
    const heroLogo = normalizeSingleMedia(attributes.hero?.logo);

    return {
      hero: {
        title: attributes.hero?.title || "",
        subtitle: attributes.hero?.subtitle || "",
        backgroundImageUrl: heroBackground?.url || "",
        logoUrl: heroLogo?.url || "",
        gradientOverlay: attributes.hero?.gradientOverlay || "",
        enableParallax: attributes.hero?.enableParallax ?? false,
      },
      intro: attributes.intro || "",
    };
  } catch (error) {
    logStrapiEvent({
      level: "error",
      kind: "fetch-failed",
      endpoint: "contact",
      error: String(error),
    });
    return fallbackContact;
  }
}
