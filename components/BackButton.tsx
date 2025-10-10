"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  label?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
}

/**
 * Reusable back navigation button
 * Defaults to going to home page
 */
export function BackButton({ 
  href = "/", 
  label = "Go Home", 
  className = "", 
  variant = "outline" 
}: BackButtonProps) {
  const router = useRouter();

  return (
    <Button 
      variant={variant} 
      className={`${className}`} 
      onClick={() => router.push(href)}
    >
      <ChevronLeft /> {label}
    </Button>
  );
}
