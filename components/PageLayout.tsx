"use client";
import Header from "@/app/header";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  showHeader?: boolean;
}

/**
 * Standard page layout wrapper with header
 * Used for consistent page structure across the site
 */
export function PageLayout({ children, className = "", showHeader = true }: PageLayoutProps) {
  return (
    <main className={`pt-20 ${className}`}>
      {showHeader && <Header />}
      {children}
    </main>
  );
}
