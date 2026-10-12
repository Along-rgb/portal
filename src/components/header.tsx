import Image from "next/image";

import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="flex items-center justify-center py-2">
      <div className="flex items-center gap-2.5">
        <Image
          src={siteConfig.logo.src}
          alt={siteConfig.logo.alt}
          width={siteConfig.logo.width}
          height={siteConfig.logo.height}
          className="size-30 object-contain"
          preload
          fetchPriority="high"
          unoptimized
        />
        <span className="text-base font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </span>
      </div>
    </header>
  );
}
