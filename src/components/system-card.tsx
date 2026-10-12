"use client";

import { useId, useRef } from "react";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";

import type { System } from "@/types/system";
import { cn } from "@/lib/utils";

export function SystemCard({
  system,
  priority = false,
}: {
  system: System;
  priority?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const Card = system.downloads ? "button" : "a";

  return (
    <>
      <Card
        href={system.url}
        target={system.downloads ? undefined : "_blank"}
        rel={system.downloads ? undefined : "noopener noreferrer"}
        type={system.downloads ? "button" : undefined}
        aria-haspopup={system.downloads ? "dialog" : undefined}
        onClick={(e) => {
          if (system.downloads) dialog.current?.showModal();
          else e.currentTarget.blur();
        }}
        className={cn(
          "group relative flex w-full min-w-0 cursor-pointer flex-col items-center gap-2 rounded-2xl border border-transparent bg-transparent p-6 text-center",
          "transition-all duration-300 ease-out",
          "hover:z-10 hover:-translate-y-1.5 hover:border-border hover:bg-card/90 hover:shadow-xl hover:shadow-foreground/10 hover:backdrop-blur-sm",
          "focus-visible:z-10 focus-visible:border-border focus-visible:bg-card/90 focus-visible:shadow-xl focus-visible:shadow-foreground/10",
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
              preload={priority}
              fetchPriority={priority ? "high" : "low"}
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
            <p className="max-h-0 overflow-hidden text-base font-medium leading-snug text-foreground/80 opacity-0 transition-all duration-300 ease-out group-hover:max-h-20 group-hover:opacity-100 group-focus-visible:max-h-20 group-focus-visible:opacity-100">
              {system.description}
            </p>
          )}
        </div>

        {system.category && (
          <span className="absolute top-3 left-3 rounded-md bg-muted/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            {system.category}
          </span>
        )}

        <ExternalLink
          className="absolute top-3 right-3 size-4 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        />
      </Card>
      {system.downloads && (
        <dialog
          ref={dialog}
          aria-labelledby={titleId}
          onClick={(e) => {
            if (e.target === e.currentTarget) e.currentTarget.close();
          }}
          className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border bg-card p-0 text-card-foreground shadow-xl backdrop:bg-black/50"
        >
          <div className="p-6">
            <div className="relative mb-6 flex min-h-9 items-center justify-center">
              <h2 id={titleId} className="px-10 text-center text-lg font-semibold">
                ຖ້າບໍ່ມີແອັບສາມາດດາວໂຫຼດໄດ້ ທັງ 
              </h2>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="ປິດ"
                className="absolute top-0 right-0 flex size-9 cursor-pointer items-center justify-center rounded-lg hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {system.downloads.map((download) => (
                <a
                  key={download.url}
                  href={download.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 rounded-xl border border-border p-4 text-center transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="text-base font-semibold">{download.platform}</span>
                  <div className="flex size-24 items-center justify-center rounded-xl bg-white">
                    <Image
                      src={download.image}
                      alt={download.name}
                      width={64}
                      height={64}
                      unoptimized
                    />
                  </div>
                  <span className="text-sm font-semibold">{download.name}</span>
                </a>
              ))}
            </div>
            {system.web && (
              <>
                <h3 className="mt-6 mb-4 text-center text-lg font-semibold">
                  ຫຼື ເຂົ້ານຳໃຊ້
                </h3>
                <a
                  href={system.web.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Image
                    src={system.web.image}
                    alt={system.web.name}
                    width={56}
                    height={56}
                    unoptimized
                  />
                  <span className="text-sm font-semibold">{system.web.name}</span>
                </a>
              </>
            )}
          </div>
        </dialog>
      )}
    </>
  );
}
