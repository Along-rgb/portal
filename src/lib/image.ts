export function optimizedImagePath(src: string): string {
  return /^\/images\/(?!optimized\/).+\.(?:png|jpe?g|ico)$/i.test(src)
    ? src.replace("/images/", "/images/optimized/") + ".webp"
    : src;
}

export function imageSource(src: string, failedSrc: string | null, fallbackSrc: string): string {
  const optimizedSrc = optimizedImagePath(src);
  if (failedSrc === src) return fallbackSrc;
  return failedSrc === optimizedSrc ? src : optimizedSrc;
}
