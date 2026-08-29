import { useState } from "react";
import { cn } from "@/lib/utils";

function domainFromUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const normalizedUrl = /^[a-z][a-z\d+.-]*:\/\//i.test(url) ? url : `https://${url}`;
    return new URL(normalizedUrl).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

interface CompanyLogoProps {
  name: string;
  websiteUrl?: string;
  logoUrl?: string;
  size?: number;
  className?: string;
}

/** Prefer Logo.dev, then a website favicon, then an initial-letter circle. */
export function CompanyLogo({ name, websiteUrl, logoUrl, size = 40, className }: CompanyLogoProps) {
  const key = import.meta.env["VITE_LOGO_DEV_PUBLISHABLE_KEY"] as string | undefined;
  const domain = domainFromUrl(websiteUrl);
  const sources: string[] = [];
  if (logoUrl?.trim()) {
    sources.push(
      ...logoUrl
        .split(";")
        .map((source) => source.trim())
        .filter(Boolean),
    );
  }
  if (key && domain) {
    sources.push(`https://img.logo.dev/${domain}?token=${key}&size=${size * 2}`);
  }
  if (domain) {
    sources.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=${size * 2}`);
    sources.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
  }

  const [index, setIndex] = useState(0);
  const src = sources[index];

  if (!src) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg bg-secondary font-heading font-semibold text-foreground",
          className,
        )}
        style={{ width: size, height: size, fontSize: size * 0.42 }}
        aria-hidden="true"
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} logo`}
      loading="lazy"
      width={size}
      height={size}
      onError={() => setIndex((i) => i + 1)}
      className={cn("shrink-0 rounded-lg bg-card object-contain p-1", className)}
      style={{ width: size, height: size }}
    />
  );
}
