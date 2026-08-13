import Image from "next/image";
import { ExternalLink } from "lucide-react";

import type { System } from "@/types/system";
import { cn } from "@/lib/utils";

export function SystemCard({
  system,
  priority = false,
}: {
  system: System;
  priority?: boolean;
}) {
  return (
    <a
      href={system.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.currentTarget.blur()}
      className={cn(
        "group relative flex flex-col items-center gap-2 rounded-2xl border border-transparent bg-transparent p-6 text-center",
        "transition-all duration-300 ease-out",
        "hover:z-10 hover:-translate-y-1.5 hover:border-border hover:bg-card/90 hover:shadow-xl hover:shadow-foreground/10 hover:backdrop-blur-sm",
        "focus-within:z-10 focus-within:border-border focus-within:bg-card/90 focus-within:shadow-xl focus-within:shadow-foreground/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none"
      )}
      aria-label={`${system.name}${system.description ? ` — ${system.description}` : ""}`}
    >
      <div className="relative flex size-28 items-center justify-center overflow-hidden rounded-2xl transition-transform duration-300 ease-out group-hover:scale-110 group-hover:drop-shadow-lg motion-reduce:group-hover:scale-100">
        {system.image ? (
          <Image
            src={system.image}
            alt={`${system.name} logo`}
            fill
            className="object-contain"
            style={
              system.imageScale
                ? { transform: `scale(${system.imageScale})` }
                : undefined
            }
            sizes="112px"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            unoptimized
          />
        ) : (
          <div className="flex size-full items-center justify-center text-2xl font-bold text-muted-foreground/40">
            {system.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex w-fit max-w-[180px] flex-col items-center gap-1">
          <h3 className="w-full truncate text-sm font-semibold leading-tight text-card-foreground transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:text-lg group-hover:text-primary motion-reduce:group-hover:translate-y-0">
            {system.name}
          </h3>
          <span
            className="h-0.5 w-0 rounded-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 transition-all duration-300 ease-out group-hover:w-full"
            aria-hidden="true"
          />
        </div>
        {system.description && (
          <p className="max-h-0 overflow-hidden text-base font-medium leading-snug text-foreground/80 opacity-0 transition-all duration-300 ease-out group-hover:max-h-20 group-hover:opacity-100 group-focus-within:max-h-20 group-focus-within:opacity-100">
            {system.description}
          </p>
        )}
      </div>

      {system.category && (
        <span className="absolute top-3 left-3 rounded-md bg-muted/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          {system.category}
        </span>
      )}

      <ExternalLink
        className="absolute top-3 right-3 size-4 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        aria-hidden="true"
      />
    </a>
  );
}
