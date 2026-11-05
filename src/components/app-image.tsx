"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

import { imageSource } from "@/lib/image";

type AppImageProps = Omit<ImageProps, "src" | "onError" | "placeholder" | "blurDataURL"> & {
  src: string;
  fallbackSrc?: string;
};

const placeholder = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><path fill="#e2e8f0" d="M0 0h8v8H0z"/></svg>'
)}`;

export function AppImage({
  src,
  alt,
  fallbackSrc = "/images/LogoEDL.png",
  ...props
}: AppImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageSrc = imageSource(src, failedSrc, fallbackSrc);

  return (
    <Image
      {...props}
      key={imageSrc}
      src={imageSrc}
      alt={alt}
      placeholder="blur"
      blurDataURL={placeholder}
      onError={() => {
        if (imageSrc !== fallbackSrc) setFailedSrc(imageSrc);
      }}
    />
  );
}
