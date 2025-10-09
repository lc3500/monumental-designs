"use client";
import { LayoutGroup } from "framer-motion";
import React from "react";

export default function MotionLayout({ children }: { children: React.ReactNode }) {
  return <LayoutGroup>{children}</LayoutGroup>;
}
