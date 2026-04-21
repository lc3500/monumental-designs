export type StrapiImageAttributes = {
  url: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type StrapiImageEntityV4 = {
  data: {
    id: number;
    attributes: StrapiImageAttributes;
  } | null;
};

export type StrapiImageCollectionV4 = {
  data: Array<{
    id: number;
    attributes: StrapiImageAttributes;
  }> | null;
};

export type StrapiImageEntityV5 = StrapiImageAttributes & {
  id?: number;
};

export type StrapiImageCollectionV5 = Array<StrapiImageEntityV5> | null;

export type StrapiImageEntity = StrapiImageEntityV4 | StrapiImageEntityV5 | null | undefined;
export type StrapiImageCollection = StrapiImageCollectionV4 | StrapiImageCollectionV5 | null | undefined;

export type StrapiEntity<T> = {
  id: number;
  attributes: T;
};

export type StrapiResponse<T> = {
  data: StrapiEntity<T> | null;
};

export type StrapiCollectionResponse<T> = {
  data: Array<StrapiEntity<T>>;
};

export type StrapiMedia = {
  url: string;
  alt: string;
  width?: number | null;
  height?: number | null;
};

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || process.env.STRAPI_TOKEN;

const LOG_FILE = "logs/strapi-errors.log";

function writeStrapiLog(entry: Record<string, unknown>) {
  if (typeof window !== "undefined") return;
  try {
    // Lazy import to keep client bundle clean.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require("fs");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require("path");
    const logDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const line = `${new Date().toISOString()} ${JSON.stringify(entry)}\n`;
    fs.appendFileSync(path.join(process.cwd(), LOG_FILE), line);
  } catch (error) {
    console.error("Failed to write Strapi log file", error);
  }
}

export function logStrapiEvent(entry: Record<string, unknown>) {
  writeStrapiLog(entry);
}

export function getStrapiURL(path = "") {
  if (!path) return STRAPI_URL;
  return `${STRAPI_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

function isAbsoluteUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function getStrapiMediaUrl(url: string) {
  if (!url) return "";
  return isAbsoluteUrl(url) ? url : getStrapiURL(url);
}

export function normalizeSingleMedia(media: StrapiImageEntity | null | undefined): StrapiMedia | null {
  if (!media) return null;

  // Strapi v4 shape
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const v4 = (media as any)?.data?.attributes;
  if (v4?.url) {
    const { url, alternativeText, width, height } = v4 as StrapiImageAttributes;
    return {
      url: getStrapiMediaUrl(url),
      alt: alternativeText || "",
      width,
      height,
    };
  }

  // Strapi v5 shape
  const v5 = media as StrapiImageEntityV5;
  if (v5?.url) {
    return {
      url: getStrapiMediaUrl(v5.url),
      alt: v5.alternativeText || "",
      width: v5.width,
      height: v5.height,
    };
  }

  return null;
}

export function normalizeMediaCollection(media: StrapiImageCollection | null | undefined): StrapiMedia[] {
  if (!media) return [];

  // Strapi v4 shape
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const v4 = (media as any)?.data;
  if (Array.isArray(v4)) {
    return v4
      .filter((item) => item?.attributes?.url)
      .map((item) => ({
        url: getStrapiMediaUrl(item.attributes.url),
        alt: item.attributes.alternativeText || "",
        width: item.attributes.width,
        height: item.attributes.height,
      }));
  }

  // Strapi v5 shape
  if (Array.isArray(media)) {
    return media
      .filter((item) => item?.url)
      .map((item) => ({
        url: getStrapiMediaUrl(item.url),
        alt: item.alternativeText || "",
        width: item.width,
        height: item.height,
      }));
  }

  return [];
}

function buildQueryParams(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    if (value === undefined || value === null) return [];

    const prefixedKey = prefix ? `${prefix}[${key}]` : key;

    if (Array.isArray(value)) {
      return value.flatMap((item, index) =>
        buildQueryParams({ [index]: item }, prefixedKey)
      );
    }

    if (typeof value === "object") {
      return buildQueryParams(value as Record<string, unknown>, prefixedKey);
    }

    return [`${encodeURIComponent(prefixedKey)}=${encodeURIComponent(String(value))}`];
  });
}

export async function strapiFetch<T>(
  path: string,
  params: Record<string, unknown> = {},
  options: RequestInit = {}
): Promise<T> {
  const basePath = path.startsWith("/") ? path : `/${path}`;
  const query = buildQueryParams(params).join("&");
  const url = `${getStrapiURL("/api")}${basePath}${query ? `?${query}` : ""}`;

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  if (STRAPI_TOKEN) {
    headers.set("Authorization", `Bearer ${STRAPI_TOKEN}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
    cache: options.cache ?? "force-cache",
  });

  if (!response.ok) {
    const message = await response.text();
    const normalizedMessage = message?.trim() ? message : "<empty body>";
    const snippet =
      normalizedMessage.length > 500
        ? `${normalizedMessage.slice(0, 500)}…`
        : normalizedMessage;

    console.error("Strapi request failed", {
      url,
      status: response.status,
      statusText: response.statusText,
      method: options.method || "GET",
      headers: Object.fromEntries(
        Object.entries(headers).filter(([key]) => key.toLowerCase() !== "authorization")
      ),
      body: snippet,
    });

    writeStrapiLog({
      level: "error",
      kind: "request",
      url,
      status: response.status,
      statusText: response.statusText,
      method: options.method || "GET",
      headers: Object.fromEntries(
        Object.entries(headers).filter(([key]) => key.toLowerCase() !== "authorization")
      ),
      body: snippet,
    });

    throw new Error(`Strapi request failed: ${response.status} ${snippet}`);
  }

  return response.json() as Promise<T>;
}
