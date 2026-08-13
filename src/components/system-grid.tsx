"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { SystemCard } from "@/components/system-card";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";
import { filterSystems } from "@/lib/search";
import type { System } from "@/types/system";

export function SystemGrid({ systems }: { systems: System[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => filterSystems(systems, query), [query, systems]);

  return (
    <section aria-label="Systems" className="w-full">
      <div className="relative mx-auto mb-6 max-w-xl">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={siteConfig.search.placeholder}
          className="h-12 rounded-xl border-border bg-card pl-12 pr-10 text-base shadow-sm"
          aria-label={siteConfig.search.label}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute top-1/2 right-3 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={siteConfig.search.clearLabel}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 items-start gap-x-4 gap-y-24 auto-rows-[192px] sm:grid-cols-3 md:gap-x-5 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((system, index) => (
            <SystemCard
              key={system.id}
              system={system}
              priority={index < 10}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <Search
            className="size-8 text-muted-foreground/50"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">
            {siteConfig.search.emptyPrefix} &ldquo;{query}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            {siteConfig.search.clearLabel}
          </button>
        </div>
      )}
    </section>
  );
}
