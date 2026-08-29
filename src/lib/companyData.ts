/**
 * Pure normalizers. Inputs are the raw JSON shapes (short_json / full_json /
 * skill_levels) so Phase 2 can pipe database rows in untouched.
 */

export type CompanyCategory = "Super Dream" | "Dream" | "Standard" | "Regular";

export interface CompanySummary {
  company_id: number;
  name: string;
  short_name: string;
  logo_url: string;
  category: string;
  company_type: CompanyCategory;
  incorporation_year: string;
  employee_size: string;
  headquarters_address: string;
  operating_countries: string;
  office_locations: string;
  yoy_growth_rate: string;
  website_url: string;
}

export type CompanyProfile = Record<string, string> & {
  name: string;
  short_name: string;
};

export interface DashboardSkill {
  skill_set_id: number;
  skill_set_name: string;
  score: number;
  proficiency: string;
  difficulty: "EXPERT" | "ADVANCED" | "PRO" | "BEGINNER";
  topics: SkillTopic[];
}

export interface SkillTopic {
  level_number: number;
  topic: string;
}

const NULLISH = new Set(["na", "n/a", "none", "-", "null", "undefined", ""]);

export function isNullish(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  return NULLISH.has(String(value).trim().toLowerCase());
}

export function asString(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.map(asString).filter(Boolean).join("; ");
  return "";
}

export function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

/** Split a free-text blob into display items on newlines, bullets, semicolons or periods. */
export function splitItems(value: unknown): string[] {
  const raw = asString(value);
  if (!raw) return [];
  return raw
    .split(/\r?\n|[•·]|;|\.(?=\s|$)/g)
    .map((part) => part.trim().replace(/^[-–—*]\s*/, ""))
    .filter((part) => part.length > 0);
}

export function titleCaseFromCode(code: string): string {
  return code
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function scoreToDifficulty(score: number): DashboardSkill["difficulty"] {
  if (score >= 8) return "EXPERT";
  if (score >= 6) return "ADVANCED";
  if (score >= 4) return "PRO";
  return "BEGINNER";
}

const SUPER_DREAM_COMPANIES = [
  "google",
  "apple",
  "amazon",
  "microsoft",
  "nvidia",
  "openai",
  "palantir",
  "deepmind",
  "atlassian",
  "snowflake",
  "spacex",
];

const DREAM_COMPANIES = [
  "accenture",
  "oracle",
  "cisco",
  "adobe",
  "uber",
  "paypal",
  "servicenow",
  "freshworks",
  "nutanix",
  "guidewire",
  "jpmorgan",
  "morgan stanley",
  "wells fargo",
  "barclays",
  "ibm",
  "sap",
  "flipkart",
  "zerodha",
];

function stableCategory(companyId: number, name: string): CompanyCategory {
  const normalized = name.toLowerCase();
  if (SUPER_DREAM_COMPANIES.some((company) => normalized.includes(company))) {
    return "Super Dream";
  }
  if (DREAM_COMPANIES.some((company) => normalized.includes(company))) return "Dream";

  // Keep unknown companies distributed consistently instead of changing on rerender.
  const hash = [...`${companyId}:${normalized}`].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  return ["Regular", "Standard", "Regular", "Dream"][hash % 4] as CompanyCategory;
}

function normalizeCategory(shortJson: Record<string, unknown>, companyId: number): CompanyCategory {
  const name = asString(shortJson["name"] || shortJson["short_name"]);
  return stableCategory(companyId, name);
}

export function normalizeCompanySummary(short_json: unknown, company_id = 0): CompanySummary {
  const s = asRecord(short_json);
  return {
    company_id,
    name: asString(s["name"]) || "Unnamed company",
    short_name: asString(s["short_name"]),
    logo_url: isNullish(s["logo_url"]) ? "" : asString(s["logo_url"]),
    category: asString(s["category"]),
    company_type: normalizeCategory(s, company_id),
    incorporation_year: asString(s["incorporation_year"]),
    employee_size: asString(s["employee_size"]),
    headquarters_address: asString(s["headquarters_address"]),
    operating_countries: asString(s["operating_countries"]),
    office_locations: asString(s["office_locations"]),
    yoy_growth_rate: asString(s["yoy_growth_rate"]),
    website_url: asString(s["website_url"]),
  };
}

/** Flattens every field of full_json (with short_json as fallback) to strings. */
export function normalizeCompanyProfile(full_json: unknown, short_json?: unknown): CompanyProfile {
  const full = asRecord(full_json);
  const short = asRecord(short_json);
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries({ ...short, ...full })) {
    out[key] = asString(value);
  }
  out["name"] = out["name"] || "Unnamed company";
  out["short_name"] = out["short_name"] || out["name"];
  return out as CompanyProfile;
}

export function normalizeDashboardSkills(skillLevels: unknown): DashboardSkill[] {
  const rows = Array.isArray(skillLevels) ? skillLevels : [];
  return rows
    .map((row) => {
      const r = asRecord(row);
      const score = Number(r["required_level"]) || 0;
      return {
        skill_set_id: Number(r["skill_set_id"]) || 0,
        skill_set_name:
          asString(r["skill_set_name"]) || titleCaseFromCode(asString(r["skill_code"])),
        score,
        proficiency: asString(r["required_proficiency"]),
        difficulty: scoreToDifficulty(score),
        topics: Array.isArray(r["topics"]) ? (r["topics"] as SkillTopic[]) : [],
      };
    })
    .filter((s) => s["skill_set_name"])
    .sort((a, b) => b.score - a.score);
}

/* ---------- Bloom + criticality mapping (Skill Intelligence) ---------- */

export type BloomLevel = "CU" | "AP" | "AS" | "EV" | "CR";

export const BLOOM_META: Record<BloomLevel, { label: string; hex: string; tint: string }> = {
  CU: { label: "Understand", hex: "#3b82f6", tint: "#eff6ff" },
  AP: { label: "Apply", hex: "#22c55e", tint: "#f0fdf4" },
  AS: { label: "Analyse", hex: "#eab308", tint: "#fefce8" },
  EV: { label: "Evaluate", hex: "#ef4444", tint: "#fef2f2" },
  CR: { label: "Create", hex: "#a855f7", tint: "#faf5ff" },
};

export function proficiencyToBloom(level: number): BloomLevel {
  if (level <= 2) return "CU";
  if (level <= 4) return "AP";
  if (level <= 6) return "AS";
  if (level <= 8) return "EV";
  return "CR";
}

export type Criticality = "Critical" | "Important" | "Baseline";

export function scoreToCriticality(score: number): Criticality {
  if (score >= 7) return "Critical";
  if (score >= 5) return "Important";
  return "Baseline";
}

export const CATEGORY_COLORS: Record<CompanyCategory, string> = {
  "Super Dream": "#7c3aed",
  Dream: "#2563eb",
  Standard: "#16a34a",
  Regular: "#d97706",
};
