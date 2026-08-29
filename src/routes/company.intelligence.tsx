import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, ExternalLink, FileText, Linkedin, Layers3 } from "lucide-react";
import { CompanyLogo } from "@/components/CompanyLogo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompany } from "@/context/CompanyContext";
import { useCompanyProfile } from "@/lib/companyApi";
import {
  buildIntelligenceSections,
  type IntelligenceField,
  type IntelligenceSection,
} from "@/data/intelligenceData";
import { isNullish, splitItems } from "@/lib/companyData";
import { COLLEGE_SHORT } from "@/config/college";

export const Route = createFileRoute("/company/intelligence")({
  head: () => ({
    meta: [
      { title: `Company Intelligence — ${COLLEGE_SHORT} Placement Intelligence Hub` },
      {
        name: "description",
        content:
          "22-section company intelligence dossier: overview, leadership, financials, technology, culture, risk and more.",
      },
      { property: "og:title", content: "Company Intelligence Dossier" },
      {
        property: "og:description",
        content: "Deep company research for campus placement preparation.",
      },
    ],
  }),
  component: CompanyIntelligence,
});

function NotAvailable() {
  return (
    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
      Not Available
    </span>
  );
}

function Pills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-xs text-foreground"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function renderValue(field: IntelligenceField) {
  const value = field.value ?? "";
  if (isNullish(value)) return <NotAvailable />;

  if (field.kind === "url" || field.kind === "video") {
    return (
      <a
        href={value}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-dream underline-offset-4 hover:underline"
      >
        {field.kind === "video" ? "Watch video" : value.replace(/^https?:\/\//, "")}
        <ExternalLink className="size-3.5" aria-hidden="true" />
      </a>
    );
  }

  if (field.kind === "rating") {
    return (
      <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-sm font-semibold text-foreground">
        {value}
      </span>
    );
  }

  if (field.kind === "paragraph") {
    return <p className="text-sm leading-relaxed text-foreground">{value}</p>;
  }

  if (field.kind === "list") {
    const items = splitItems(value);
    return items.length > 1 ? (
      <Pills items={items} />
    ) : (
      <p className="text-sm text-foreground">{value}</p>
    );
  }

  // auto: detect multi-item strings on ; and ,
  if (/;/.test(value) || (value.split(",").length > 2 && value.length < 240)) {
    const items = value
      .split(/;|,/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (items.length > 1) return <Pills items={items} />;
  }

  return <p className="text-sm text-foreground">{value}</p>;
}

function FieldRow({ field }: { field: IntelligenceField }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border/70 py-3 last:border-0 sm:flex-row sm:gap-4">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:w-1/3">
        {field.label}
      </dt>
      <dd className="sm:w-2/3">{renderValue(field)}</dd>
    </div>
  );
}

const SectionCard = memo(function SectionCard({
  section,
  refCallback,
}: {
  section: IntelligenceSection;
  refCallback: (el: HTMLElement | null) => void;
}) {
  const Icon = section.icon;
  const filled = section.fields.filter((f) => !isNullish(f.value)).length;

  return (
    <section
      ref={refCallback}
      id={section.id}
      className="scroll-mt-32 rounded-2xl border border-border/80 bg-card/90 p-4 shadow-sm shadow-slate-200/40 transition-shadow hover:shadow-md hover:shadow-slate-200/50 sm:p-5"
    >
      <header className="mb-3 flex items-center gap-3 border-b border-border/80 pb-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
          <Icon className="size-4.5" aria-hidden="true" />
        </span>
        <h2 className="flex-1 font-heading text-base font-semibold text-foreground sm:text-lg">
          {section.title}
        </h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
          {filled}/{section.fields.length}
        </span>
      </header>
      <dl>
        {section.fields.map((field) => (
          <FieldRow key={field.key} field={field} />
        ))}
      </dl>
    </section>
  );
});

function CompanyIntelligence() {
  const { ready, selection, summary } = useCompany();
  const profileQuery = useCompanyProfile(selection?.companyId);
  const profile = profileQuery.data ?? null;
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (ready && !selection) void navigate({ to: "/", replace: true });
  }, [ready, selection, navigate]);

  const sections = useMemo(() => buildIntelligenceSections(profile ?? undefined), [profile]);
  const fieldCount = sections.reduce((total, section) => total + section.fields.length, 0);
  const filledCount = sections.reduce(
    (total, section) => total + section.fields.filter((field) => !isNullish(field.value)).length,
    0,
  );
  const completion = fieldCount ? Math.round((filledCount / fieldCount) * 100) : 0;

  const scrollToSection = useCallback((idx: number) => {
    const el = sectionRefs.current[idx];
    if (!el) return;
    isScrollingRef.current = true;
    setActive(idx);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (isScrollingRef.current) return;
      let current = 0;
      sectionRefs.current.forEach((el, idx) => {
        if (el && el.getBoundingClientRect().top <= 180) current = idx;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    tabRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  if (profileQuery.isError) {
    return (
      <div className="space-y-3 p-4 text-center text-sm text-muted-foreground">
        <p>Company intelligence could not be loaded.</p>
        <Button onClick={() => void profileQuery.refetch()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  if (!ready || !summary || profileQuery.isLoading || !profile) {
    return (
      <div className="space-y-3 p-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="pb-16">
      <div className="sticky top-0 z-20 border-b border-border/80 bg-card/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 lg:px-8">
          <CompanyLogo
            name={summary.name}
            websiteUrl={summary.website_url}
            logoUrl={summary.logo_url}
            size={40}
          />
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-heading text-base font-semibold text-foreground sm:text-lg">
              {summary.name}
            </h1>
            {!isNullish(profile["category"]) && (
              <span className="mt-0.5 inline-block rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                {profile["category"]}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isNullish(profile["website_url"]) && (
              <Button asChild variant="outline" size="sm">
                <a href={profile["website_url"]} target="_blank" rel="noreferrer noopener">
                  <ExternalLink className="size-4" /> Website
                </a>
              </Button>
            )}
            {!isNullish(profile["linkedin_url"]) && (
              <Button asChild variant="outline" size="sm">
                <a href={profile["linkedin_url"]} target="_blank" rel="noreferrer noopener">
                  <Linkedin className="size-4" /> LinkedIn
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto border-t border-border/80 px-3 py-2 lg:px-7">
          {sections.map((section, idx) => (
            <button
              key={section.id}
              type="button"
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              onClick={() => scrollToSection(idx)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                active === idx
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-5 py-7 text-white shadow-xl shadow-slate-900/10 sm:px-8 sm:py-9">
          <div className="absolute -right-16 -top-20 size-64 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                <FileText className="size-4" aria-hidden="true" /> Research dossier
              </div>
              <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Know the company before you meet it.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                A structured view of {summary.short_name || summary.name} across its market,
                culture, technology, and career signals.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="min-w-20 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
                <CheckCircle2 className="mb-3 size-4 text-emerald-300" />
                <p className="font-heading text-2xl font-semibold">{completion}%</p>
                <p className="mt-1 text-[11px] text-slate-300">profile covered</p>
              </div>
              <div className="min-w-20 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
                <Layers3 className="mb-3 size-4 text-cyan-300" />
                <p className="font-heading text-2xl font-semibold">{sections.length}</p>
                <p className="mt-1 text-[11px] text-slate-300">intelligence areas</p>
              </div>
              <div className="min-w-20 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
                <FileText className="mb-3 size-4 text-amber-300" />
                <p className="font-heading text-2xl font-semibold">{filledCount}</p>
                <p className="mt-1 text-[11px] text-slate-300">known signals</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {sections.map((section, idx) => (
            <SectionCard
              key={section.id}
              section={section}
              refCallback={(el) => {
                sectionRefs.current[idx] = el;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
