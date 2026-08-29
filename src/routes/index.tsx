import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BriefcaseBusiness, Search, Sparkles, Target, TrendingUp, X } from "lucide-react";
import { CompanyCard } from "@/components/CompanyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CATEGORY_COLORS, type CompanyCategory, type CompanySummary } from "@/lib/companyData";
import { useCompanies } from "@/lib/companyApi";
import { useCompany } from "@/context/CompanyContext";
import { COLLEGE_SHORT, PORTAL_SUBTITLE, PORTAL_TITLE } from "@/config/college";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${COLLEGE_SHORT} Placement Intelligence Hub — Company Research` },
      {
        name: "description",
        content:
          "Research recruiting companies and skill requirements in one place. Placement analytics and company intelligence for campus placements.",
      },
      { property: "og:title", content: `${COLLEGE_SHORT} Placement Intelligence Hub` },
      {
        property: "og:description",
        content: "Company research and skill intelligence for campus placements.",
      },
    ],
  }),
  component: Index,
});

const FILTERS: Array<"All" | CompanyCategory> = [
  "All",
  "Super Dream",
  "Dream",
  "Standard",
  "Regular",
];

function Index() {
  const navigate = useNavigate();
  const { selectCompany } = useCompany();
  const companiesQuery = useCompanies();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query), 200);
    return () => window.clearTimeout(t);
  }, [query]);

  const companies = useMemo(() => companiesQuery.data ?? [], [companiesQuery.data]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: companies.length };
    for (const c of companies) {
      map[c.company_type] = (map[c.company_type] ?? 0) + 1;
    }
    return map;
  }, [companies]);

  const visible = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    return companies.filter((c) => {
      const matchesFilter = filter === "All" || c.company_type === filter;
      const matchesQuery =
        !q ||
        `${c.name} ${c.short_name} ${c.category} ${c.headquarters_address}`
          .toLowerCase()
          .includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [companies, debounced, filter]);

  const handleSelect = useCallback(
    (company: CompanySummary) => {
      selectCompany({
        companyId: company.company_id,
        companyName: company.name,
        logoUrl: company.logo_url,
      });
      void navigate({ to: "/company/intelligence" });
    },
    [selectCompany, navigate],
  );

  const reset = useCallback(() => {
    setQuery("");
    setFilter("All");
  }, []);

  return (
    <div className="min-h-svh">
      <nav className="bg-card/90 backdrop-blur-md sticky top-0 z-50 bg-gray-900s">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-4 pr-16 sm:px-6 sm:pr-20">
          <div className="flex items-center gap-3">
            <img
              src="/favicon.ico?v=2"
              alt=""
              width="40"
              height="40"
              className="size-10 object-contain"
            />
            <div className="leading-none">
              <p className="font-heading text-base font-semibold tracking-tight text-foreground">
                Company Intelligence
              </p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                {COLLEGE_SHORT} Placement Analytics
              </p>
            </div>
          </div>
          <span className="hidden items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-semibold text-muted-foreground sm:inline-flex">
            <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_hsl(142_72%_45%/0.14)]" />
            Research Portal
          </span>
        </div>
      </nav>
      <header className="border-b border-border/80 bg-card/75 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            <span className="h-px w-7 bg-brand" />
            <span>Campus Placement Intelligence</span>
          </div>
          <h1 className="mt-6 max-w-3xl font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
            {PORTAL_TITLE}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            {PORTAL_SUBTITLE}
          </p>
          <div className="relative mt-7 max-w-2xl">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies, industries or locations"
              aria-label="Search companies"
              className="h-12 w-full rounded-xl border border-input bg-background/95 pl-10 pr-10 text-sm text-foreground shadow-[0_8px_24px_hsl(222_47%_11%/0.06)] outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-9">
        <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Companies tracked", value: counts["All"], icon: BriefcaseBusiness },
            { label: "Super Dream", value: counts["Super Dream"] ?? 0, icon: Sparkles },
            { label: "Dream roles", value: counts["Dream"] ?? 0, icon: TrendingUp },
            { label: "Categories", value: FILTERS.length - 1, icon: Target },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border/80 bg-card/80 p-3.5 shadow-[0_1px_2px_hsl(222_47%_11%/0.03)]"
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] font-medium uppercase tracking-wide">
                  {stat.label}
                </span>
                <stat.icon className="size-4 text-dream" aria-hidden="true" />
              </div>
              <p className="mt-2 font-heading text-2xl font-semibold text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
              Explore Companies
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Browse by placement tier or search the directory.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => {
              const isActive = filter === item;
              const color = item === "All" ? "#334155" : CATEGORY_COLORS[item as CompanyCategory];
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-all hover:-translate-y-px"
                  style={{
                    color: isActive ? "#ffffff" : color,
                    backgroundColor: isActive ? color : `${color}12`,
                    borderColor: isActive ? color : `${color}33`,
                  }}
                >
                  {item} ({counts[item] ?? 0})
                </button>
              );
            })}
          </div>
        </div>

        {companiesQuery.isLoading ? (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        ) : companiesQuery.isError ? (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <h2 className="font-heading text-base font-semibold text-foreground">
              Companies could not be loaded
            </h2>
            <Button
              onClick={() => void companiesQuery.refetch()}
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </div>
        ) : companies.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <h2 className="font-heading text-base font-semibold text-foreground">
              No companies are available
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Supabase returned no visible rows from company_json. Check the table data and its
              public read policy.
            </p>
            <Button
              onClick={() => void companiesQuery.refetch()}
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </div>
        ) : visible.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <h2 className="font-heading text-base font-semibold text-foreground">
              No companies match your filters
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search term or category.
            </p>
            <Button onClick={reset} className="mt-4" variant="outline">
              Reset
            </Button>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((company) => (
              <CompanyCard key={company.company_id} company={company} onSelect={handleSelect} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
