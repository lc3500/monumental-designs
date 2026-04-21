const errorMessage =
  "Content is temporarily unavailable. Please refresh or try again in a moment.";

export const fallbackHome = {
  landing: {
    location: "",
    headline: "Content unavailable",
    highlight: "",
    headlineSuffix: "",
    ctaLabel: "Try again",
    ctaHref: "/content-unavailable",
  },
  imagesSection: {
    title: errorMessage,
    ctaLabel: "Try again",
    ctaHref: "/content-unavailable",
    images: [],
  },
  whyClientsLoveUs: {
    title: "Content unavailable",
    items: [errorMessage],
  },
  aboutSnippet: {
    name: "Monumental Designs",
    role: "",
    photoUrl: "/logo.svg",
    excerpt: errorMessage,
    ctaLabel: "Try again",
    ctaHref: "/content-unavailable",
  },
};

export const fallbackAbout = {
  heading: {
    name: "Content unavailable",
    role: "",
    photoUrl: "/logo.svg",
  },
  body: `<p>${errorMessage}</p>`,
  contentBlocks: [],
};

export const fallbackServices = {
  hero: {
    title: "Content unavailable",
    subtitle: errorMessage,
    backgroundImageUrl: "",
    logoUrl: "/logo.svg",
    gradientOverlay: "",
    enableParallax: false,
  },
  intro: errorMessage,
  services: [
    {
      title: "Content unavailable",
      subtitle: errorMessage,
      drawerTitle: "Content unavailable",
      drawerContentHtml: `<p>${errorMessage}</p>`,
      drawerContentBlocks: [],
    },
  ],
};

export const fallbackGallery = {
  title: "Content unavailable",
  subtitle: errorMessage,
  images: [],
};

export const fallbackContact = {
  hero: {
    title: "Content unavailable",
    subtitle: errorMessage,
    backgroundImageUrl: "",
    logoUrl: "/logo.svg",
    gradientOverlay: "",
    enableParallax: false,
  },
  intro: errorMessage,
};
