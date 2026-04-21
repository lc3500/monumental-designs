"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HEALTH_PATH = "/_health";
const REQUEST_TIMEOUT_MS = 2500;

export default function StrapiHealthGate() {
  const pathname = usePathname();

  useEffect(() => {
    const normalizedPath = (pathname || "/").replace(/\/+$/, "");
    if (normalizedPath === "/content-unavailable") return;

    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const checkHealth = async () => {
      try {
        const response = await fetch(`${baseUrl}${HEALTH_PATH}`, {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          window.location.href = "/content-unavailable/";
        }
      } catch (error) {
        window.location.href = "/content-unavailable/";
      } finally {
        clearTimeout(timeout);
      }
    };

    checkHealth();
  }, [pathname]);

  return null;
}
