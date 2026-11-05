import { AppImage } from "@/components/app-image";

import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="flex items-center justify-center py-2">
      <div className="flex items-center gap-2.5">
        <AppImage
          src={siteConfig.logo.src}
          alt={siteConfig.logo.alt}
          width={siteConfig.logo.width}
          height={siteConfig.logo.height}
          className="size-30 object-contain"
          loading="eager"
          fetchPriority="high"
        />
        <span className="text-base font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </span>
      </div>
    </header>
  );
}
