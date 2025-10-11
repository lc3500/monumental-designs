import { useState } from "react";
import Image, { ImageProps } from "next/image";

export default function LazyImage(props: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse rounded-lg z-10" />
      )}
      <Image
        {...props}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          ...props.style,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}