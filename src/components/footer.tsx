import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-border/70">
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-6">
        <p className="text-center text-xs leading-relaxed text-muted-foreground md:text-sm">
          {siteConfig.footer.credit}{" "}
          <span className="gradient-text-loop font-medium">
            {siteConfig.footer.creditHighlight}
          </span>
        </p>
      </div>
    </footer>
  );
}
