import { memo } from "react";
import { ArrowRight, MapPin, TrendingDown, TrendingUp, Users } from "lucide-react";
import { CompanyLogo } from "@/components/CompanyLogo";
import { CATEGORY_COLORS, isNullish, type CompanySummary } from "@/lib/companyData";

function Value({ text }: { text: string }) {
  if (isNullish(text)) {
    return <span className="italic text-muted-foreground">not publicly available</span>;
  }
  return <span className="truncate">{text}</span>;
}

interface CompanyCardProps {
  company: CompanySummary;
  onSelect: (company: CompanySummary) => void;
}

export const CompanyCard = memo(function CompanyCard({ company, onSelect }: CompanyCardProps) {
  const color = CATEGORY_COLORS[company.company_type];
  const growth = company.yoy_growth_rate;
  const negative = growth.trim().startsWith("-");
  const GrowthIcon = negative ? TrendingDown : TrendingUp;

  return (
    <button
      type="button"
      onClick={() => onSelect(company)}
      className="group relative flex h-full w-full flex-col gap-3 rounded-xl border border-border/80 bg-card/90 p-4 text-left shadow-[0_1px_2px_hsl(222_47%_11%/0.04)] transition-all hover:-translate-y-0.5 hover:border-dream/40 hover:bg-card hover:shadow-[0_12px_30px_hsl(222_47%_11%/0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start justify-between gap-3">
        <CompanyLogo
          name={company.name}
          websiteUrl={company.website_url}
          logoUrl={company.logo_url}
          size={44}
        />
        <span
          className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
          style={{ color, backgroundColor: `${color}14` }}
        >
          {company.company_type}
        </span>
      </div>

      <div>
        <h3 className="font-heading text-base font-semibold leading-tight text-foreground">
          {company.name}
        </h3>
        <p className="text-xs text-muted-foreground">
          <Value text={company.short_name} />
        </p>
      </div>

      <dl className="mt-auto space-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          <Value text={company.headquarters_address} />
        </div>
        <div className="flex items-center gap-2">
          <Users className="size-3.5 shrink-0" aria-hidden="true" />
          <Value text={company.employee_size} />
        </div>
        <div className="flex items-center gap-2">
          <GrowthIcon
            className={`size-3.5 shrink-0 ${negative ? "text-destructive" : ""}`}
            aria-hidden="true"
          />
          {isNullish(growth) ? (
            <span className="italic">not publicly available</span>
          ) : (
            <span className={negative ? "text-destructive" : ""}>{growth} YoY</span>
          )}
        </div>
      </dl>

      <ArrowRight
        className="absolute bottom-4 right-4 size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
        aria-hidden="true"
      />
    </button>
  );
});
