"use client";
import { Avatar } from "@/components/ui/avatar";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface ProfileAvatarProps {
  src: StaticImageData | string;
  alt: string;
  name: string;
  title?: string;
  size?: number;
  layoutId?: string;
  className?: string;
}

/**
 * Reusable profile avatar component with name and title
 * Supports motion layoutId for shared element transitions
 */
export function ProfileAvatar({
  src,
  alt,
  name,
  title,
  size = 300,
  layoutId,
  className = "",
}: ProfileAvatarProps) {
  const avatarContent = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Avatar style={{ width: size, height: size }}>
        <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" />
      </Avatar>
      <h1 className="text-3xl font-semibold mt-3 font-serif">{name}</h1>
      {title && <h2 className="italic">{title}</h2>}
    </div>
  );

  if (layoutId) {
    return <motion.div layoutId={layoutId}>{avatarContent}</motion.div>;
  }

  return avatarContent;
}
