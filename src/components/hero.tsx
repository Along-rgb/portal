"use client";

import { useState } from "react";
import TextType from "@/components/text-type";
import BlurText from "@/components/blur-text";
import { siteConfig } from "@/config/site";

export function Hero() {
  const [headingDone, setHeadingDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);

  return (
    <section className="flex flex-col items-center gap-4 pt-0 pb-6 text-center md:pt-1 md:pb-8">
      <TextType
        as="h1"
        text={siteConfig.hero.heading}
        typingSpeed={100}
        pauseDuration={999999}
        loop={false}
        showCursor={false}
        onSentenceComplete={() => setHeadingDone(true)}
        className={`px-2 py-3 text-3xl font-bold !tracking-normal leading-[1.7] text-foreground md:text-4xl lg:text-5xl ${headingDone ? "shiny-text" : ""}`}
      />
      <div className="grid">
        <p
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 flex max-w-xl flex-wrap justify-center px-2 py-2 text-base leading-[1.9] md:text-lg"
        >
          {siteConfig.hero.subtitle}
        </p>
        {headingDone && (
          <BlurText
            text={siteConfig.hero.subtitle}
            animateBy="words"
            direction="bottom"
            delay={300}
            stepDuration={0.6}
            immediateStart
            onAnimationComplete={() => setSubtitleDone(true)}
            className={`col-start-1 row-start-1 max-w-xl px-2 py-2 text-base leading-[1.9] text-muted-foreground md:text-lg ${subtitleDone ? "shiny-text" : ""}`}
          />
        )}
      </div>
    </section>
  );
}
