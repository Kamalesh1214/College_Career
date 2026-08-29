import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BarChart3, BrainCircuit, ChevronDown, Lock, Target, TrendingUp } from "lucide-react";
import { CompanyLogo } from "@/components/CompanyLogo";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompany } from "@/context/CompanyContext";
import { useCompanySkills } from "@/lib/companyApi";
import {
  BLOOM_META,
  proficiencyToBloom,
  scoreToCriticality,
  type BloomLevel,
  type DashboardSkill,
} from "@/lib/companyData";
import { COLLEGE_SHORT } from "@/config/college";

export const Route = createFileRoute("/company/skills")({
  head: () => ({
    meta: [
      { title: `Skill Intelligence — ${COLLEGE_SHORT} Placement Intelligence Hub` },
      {
        name: "description",
        content:
          "Bloom-mapped skill requirements with criticality tiers and 10-level learning roadmaps for each skill.",
      },
      { property: "og:title", content: "Skill Intelligence" },
      {
        property: "og:description",
        content: "Bloom-mapped skill ladders for campus placement readiness.",
      },
    ],
  }),
  component: SkillIntelligence,
});

const BLOOM_ORDER: BloomLevel[] = ["CU", "AP", "AS", "EV", "CR"];

const CRITICALITY_META = [
  {
    label: "Critical",
    hint: "Target level 7-10 — expect deep interview probing",
    hex: "#ef4444",
  },
  { label: "Important", hint: "Target level 5-6 — solid working command", hex: "#eab308" },
  { label: "Baseline", hint: "Target level 1-4 — awareness is enough", hex: "#22c55e" },
];

function SkillCard({ skill }: { skill: DashboardSkill }) {
  const [open, setOpen] = useState(false);
  const bloom = proficiencyToBloom(skill.score);
  const meta = BLOOM_META[bloom];
  const criticality = scoreToCriticality(skill.score);
  const topics = skill.topics;

  return (
    <div className="rounded-2xl border border-border/80 bg-card/90 p-4 shadow-sm shadow-slate-200/40 transition-shadow hover:shadow-md hover:shadow-slate-200/50 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-sm font-semibold text-foreground sm:text-base">
              {skill.skill_set_name}
            </h3>
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
              style={{ color: meta.hex, backgroundColor: meta.tint }}
            >
              {bloom} · {meta.label}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {skill.proficiency} · {criticality}
          </p>
        </div>
        <div className="rounded-xl bg-slate-950 px-3 py-2 text-center text-white">
          <span className="block font-heading text-lg font-bold leading-none">{skill.score}</span>
          <span className="mt-1 block text-[10px] text-slate-400">of 10</span>
        </div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${skill.score * 10}%`, backgroundColor: meta.hex }}
        />
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-dream"
      >
        {open ? "Hide" : "Show"} 10-level roadmap
        <ChevronDown
          className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ol className="mt-3 space-y-1.5">
          {topics.map((topic) => {
            const locked = topic.level_number > skill.score;
            return (
              <li
                key={topic.level_number}
                className={`flex items-start gap-2 rounded-lg border border-border/70 px-3 py-2 text-xs ${
                  locked ? "bg-secondary/40 text-muted-foreground" : "bg-background"
                }`}
              >
                <span className="mt-px w-6 shrink-0 font-semibold">L{topic.level_number}</span>
                <span className="flex-1">{topic.topic}</span>
                {locked && (
                  <span className="flex shrink-0 items-center gap-1 italic">
                    <Lock className="size-3" aria-hidden="true" /> Beyond scope
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function SkillIntelligence() {
  const { ready, selection, summary } = useCompany();
  const skillsQuery = useCompanySkills(selection?.companyId);
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !selection) void navigate({ to: "/", replace: true });
  }, [ready, selection, navigate]);

  const sorted = useMemo(
    () => [...(skillsQuery.data ?? [])].sort((a, b) => b.score - a.score),
    [skillsQuery.data],
  );

  if (skillsQuery.isError) {
    return (
      <div className="space-y-3 p-4 text-center text-sm text-muted-foreground">
        <p>Skill intelligence could not be loaded.</p>
        <button
          type="button"
          onClick={() => void skillsQuery.refetch()}
          className="rounded-md border border-input px-3 py-2 text-foreground"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!ready || !summary || skillsQuery.isLoading) {
    return (
      <div className="space-y-3 p-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4 pb-16 lg:p-8">
      <header className="flex items-center gap-3 border-b border-border/80 pb-5">
        <CompanyLogo
          name={summary.name}
          websiteUrl={summary.website_url}
          logoUrl={summary.logo_url}
          size={40}
        />
        <div>
          <h1 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-2xl">
            {summary.short_name || summary.name} Skill Intelligence
          </h1>
          <p className="text-xs text-muted-foreground">
            Bloom-mapped requirements and level-by-level preparation roadmaps
          </p>
        </div>
      </header>

      <section className="relative mt-6 overflow-hidden rounded-3xl bg-slate-950 px-5 py-7 text-white shadow-xl shadow-slate-900/10 sm:px-8">
        <div className="absolute -bottom-24 -right-10 size-64 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              <BrainCircuit className="size-4" aria-hidden="true" /> Readiness map
            </div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Build the right depth.
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-slate-300">
              Every requirement is mapped to a cognitive level and a practical learning path.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { icon: BarChart3, value: sorted.length, label: "skill areas" },
              {
                icon: Target,
                value: sorted.filter((skill) => skill.score >= 7).length,
                label: "critical",
              },
              {
                icon: TrendingUp,
                value: sorted.length
                  ? `${(sorted.reduce((sum, skill) => sum + skill.score, 0) / sorted.length).toFixed(1)}`
                  : "0",
                label: "avg. target",
              },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="min-w-20 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm"
              >
                <Icon className="mb-3 size-4 text-emerald-300" aria-hidden="true" />
                <p className="font-heading text-2xl font-semibold">{value}</p>
                <p className="mt-1 text-[11px] text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dream">
              Framework
            </p>
            <h2 className="mt-1 font-heading text-lg font-semibold text-foreground">
              Bloom cognitive levels
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">From understanding to creating</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {BLOOM_ORDER.map((code) => {
            const meta = BLOOM_META[code];
            return (
              <div
                key={code}
                className="rounded-xl border border-border/80 p-3 shadow-sm"
                style={{ backgroundColor: meta.tint }}
              >
                <p className="font-heading text-sm font-bold" style={{ color: meta.hex }}>
                  {code}
                </p>
                <p className="text-[11px] text-muted-foreground">{meta.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dream">
              Prioritisation
            </p>
            <h2 className="mt-1 font-heading text-lg font-semibold text-foreground">
              Criticality tiers
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">Where to spend your time</span>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {CRITICALITY_META.map((tier) => (
            <div
              key={tier.label}
              className="rounded-xl border border-border/80 bg-card p-4 shadow-sm"
            >
              <p className="font-heading text-sm font-semibold" style={{ color: tier.hex }}>
                {tier.label}
              </p>
              <p className="text-[11px] text-muted-foreground">{tier.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">Your skill map</h2>
          <span className="text-xs text-muted-foreground">Highest target first</span>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {sorted.map((skill) => (
            <SkillCard key={skill.skill_set_id} skill={skill} />
          ))}
        </div>
      </section>
    </div>
  );
}
