type StrapiResponse<T> = {
  data?: { attributes?: T } | T | null;
};

type StrapiImageAttributes = {
  url?: string;
  alternativeText?: string;
  width?: number;
  height?: number;
};

type StrapiImageEntity = {
  data?: { attributes?: StrapiImageAttributes } | null;
} | StrapiImageAttributes;

type StrapiImageCollection = {
  data?: Array<{ attributes?: StrapiImageAttributes } | StrapiImageAttributes> | null;
} | Array<StrapiImageAttributes>;

type PageHeroComponent = {
  title?: string;
  subtitle?: string;
  backgroundImage?: StrapiImageEntity;
  logo?: StrapiImageEntity;
  gradientOverlay?: string;
  enableParallax?: boolean;
};

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

type ContentBlock = {
  __component?: string;
  text?: string;
  level?: "h2" | "h3" | "h4";
  ordered?: boolean;
  items?: Array<{ text?: string }>;
};

type AboutAttributes = {
  heading?: AboutHeadingComponent;
  body?: string;
  contentBlocks?: ContentBlock[];
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

function getStrapiURL(path = "") {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  if (!path) return baseUrl;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

function isAbsoluteUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

function normalizeUrl(url?: string) {
  if (!url) return "";
  return isAbsoluteUrl(url) ? url : `${getStrapiURL()}${url}`;
}

function unwrapAttributes<T>(data?: { attributes?: T } | T | null): T | undefined {
  if (!data) return undefined;
  if (typeof data === "object" && "attributes" in data) {
    return (data as { attributes?: T }).attributes;
  }
  return data as T;
}

function normalizeSingleMedia(media?: StrapiImageEntity) {
  if (!media) return null;
  const attributes: StrapiImageAttributes | undefined =
    "url" in media ? media : (media as { data?: { attributes?: StrapiImageAttributes } | null }).data?.attributes;
  if (!attributes?.url) return null;
  return {
    url: normalizeUrl(attributes.url),
    alt: attributes.alternativeText || "",
    width: attributes.width || 0,
    height: attributes.height || 0,
  };
}

function normalizeMediaCollection(media?: StrapiImageCollection) {
  const rawItems = Array.isArray(media)
    ? media
    : media?.data;
  return (
    rawItems
      ?.map((item) => {
        const attributes: StrapiImageAttributes | undefined =
          "url" in item ? item : (item as { attributes?: StrapiImageAttributes }).attributes;
        if (!attributes?.url) return null;
        return {
          url: normalizeUrl(attributes.url),
          alt: attributes.alternativeText || "",
          width: attributes.width || 0,
          height: attributes.height || 0,
        };
      })
      .filter(
        (image): image is { url: string; alt: string; width: number; height: number } =>
          Boolean(image)
      ) || []
  );
}

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

async function strapiFetch<T>(
  path: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  const basePath = path.startsWith("/") ? path : `/${path}`;
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const url = `${getStrapiURL("/api")}${basePath}${query ? `?${query}` : ""}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status}`);
  }
  return response.json();
}

export async function getHomePageClient() {
  const response = await strapiFetch<StrapiResponse<HomeAttributes>>("home", {
    "populate[landing][populate]": "*",
    "populate[imagesSection][populate]": "*",
    "populate[whyClientsLoveUs][populate]": "*",
    "populate[aboutSnippet][populate]": "*",
  });
  const attributes = unwrapAttributes(response.data);
  const images = normalizeMediaCollection(attributes?.imagesSection?.images);
  return {
    landing: {
      location: attributes?.landing?.location || "",
      headline: attributes?.landing?.headline || "",
      highlight: attributes?.landing?.highlight || "",
      headlineSuffix: attributes?.landing?.headlineSuffix || "",
      ctaLabel: attributes?.landing?.ctaLabel || "",
      ctaHref: attributes?.landing?.ctaHref || "",
    },
    imagesSection: {
      title: attributes?.imagesSection?.title || "",
      ctaLabel: attributes?.imagesSection?.ctaLabel || "",
      ctaHref: attributes?.imagesSection?.ctaHref || "",
      images: images.map((image) => image.url),
    },
    whyClientsLoveUs: {
      title: attributes?.whyClientsLoveUs?.title || "",
      items:
        attributes?.whyClientsLoveUs?.items?.map((item) => item.text || "").filter(Boolean) || [],
    },
    aboutSnippet: {
      name: attributes?.aboutSnippet?.name || "",
      role: attributes?.aboutSnippet?.role || "",
      photoUrl: normalizeSingleMedia(attributes?.aboutSnippet?.photo)?.url || "",
      excerpt: attributes?.aboutSnippet?.excerpt || "",
      ctaLabel: attributes?.aboutSnippet?.ctaLabel || "",
      ctaHref: attributes?.aboutSnippet?.ctaHref || "",
    },
  };
}

export async function getAboutPageClient() {
  const response = await strapiFetch<StrapiResponse<AboutAttributes>>("about", {
    "populate[heading][populate]": "*",
    "populate[contentBlocks][populate]": "*",
  });
  const attributes = unwrapAttributes(response.data);
  return {
    heading: {
      name: attributes?.heading?.name || "",
      role: attributes?.heading?.role || "",
      photoUrl: normalizeSingleMedia(attributes?.heading?.photo)?.url || "",
    },
    body: attributes?.body || "",
    contentBlocks: normalizeContentBlocks(attributes?.contentBlocks),
  };
}

export async function getServicesPageClient() {
  const response = await strapiFetch<StrapiResponse<ServicesAttributes>>("service", {
    "populate[hero][populate]": "*",
    "populate[services][populate][drawerBlocks][populate]": "*",
  });
  const attributes = unwrapAttributes(response.data);
  const heroBackground = normalizeSingleMedia(attributes?.hero?.backgroundImage);
  const heroLogo = normalizeSingleMedia(attributes?.hero?.logo);
  return {
    hero: {
      title: attributes?.hero?.title || "",
      subtitle: attributes?.hero?.subtitle || "",
      backgroundImageUrl: heroBackground?.url || "",
      logoUrl: heroLogo?.url || "",
      gradientOverlay: attributes?.hero?.gradientOverlay || "",
      enableParallax: attributes?.hero?.enableParallax ?? false,
    },
    intro: attributes?.intro || "",
    services:
      attributes?.services?.length
        ? attributes.services.map((service) => ({
            title: service.title || "",
            subtitle: service.subtitle || "",
            drawerTitle: service.drawerTitle || "",
            drawerContentHtml: service.drawerContent || "",
            drawerContentBlocks: normalizeContentBlocks(service.drawerBlocks),
          }))
        : [],
  };
}

export async function getGalleryPageClient() {
  const response = await strapiFetch<StrapiResponse<GalleryAttributes>>("gallery", {
    "populate[images][populate]": "*",
  });
  const attributes = unwrapAttributes(response.data);
  const images = normalizeMediaCollection(attributes?.images);
  return {
    title: attributes?.title || "",
    subtitle: attributes?.subtitle || "",
    images: images.map((image) => image.url),
  };
}

export async function getContactPageClient() {
  const response = await strapiFetch<StrapiResponse<ContactAttributes>>("contact", {
    "populate[hero][populate]": "*",
  });
  const attributes = unwrapAttributes(response.data);
  const heroBackground = normalizeSingleMedia(attributes?.hero?.backgroundImage);
  const heroLogo = normalizeSingleMedia(attributes?.hero?.logo);
  return {
    hero: {
      title: attributes?.hero?.title || "",
      subtitle: attributes?.hero?.subtitle || "",
      backgroundImageUrl: heroBackground?.url || "",
      logoUrl: heroLogo?.url || "",
      gradientOverlay: attributes?.hero?.gradientOverlay || "",
      enableParallax: attributes?.hero?.enableParallax ?? false,
    },
    intro: attributes?.intro || "",
  };
}
