import { describe, expect, it } from "vitest";
import { SEED_COMPANIES } from "@/data/seedCompanies";
import {
  isNullish,
  normalizeCompanyProfile,
  normalizeCompanySummary,
  normalizeDashboardSkills,
  proficiencyToBloom,
  scoreToCriticality,
  scoreToDifficulty,
  splitItems,
} from "@/lib/companyData";
import { buildIntelligenceSections } from "@/data/intelligenceData";
import { SKILL_TOPICS } from "@/data/skillTopics";

const seed = SEED_COMPANIES[0]!;

describe("phase 1 seed data layer", () => {
  it("normalizes the seed summary", () => {
    const summary = normalizeCompanySummary(seed.short_json, seed.company_id);
    expect(summary.name).toBe("Accenture plc");
    expect(summary.company_type).toBe("Dream");
  });

  it("categorizes known companies consistently", () => {
    expect(normalizeCompanySummary({ name: "Microsoft Corporation" }).company_type).toBe(
      "Super Dream",
    );
    expect(normalizeCompanySummary({ name: "Accenture plc" }).company_type).toBe("Dream");
    expect(normalizeCompanySummary({ name: "Acko General Insurance" }).company_type).toBe(
      "Regular",
    );
  });

  it("normalizes the full profile", () => {
    const profile = normalizeCompanyProfile(seed.full_json, seed.short_json);
    expect(profile["ceo_name"]).toBe("Julie Sweet");
    expect(Object.keys(profile).length).toBeGreaterThan(150);
  });

  it("builds all 22 intelligence sections with values", () => {
    const sections = buildIntelligenceSections(
      normalizeCompanyProfile(seed.full_json, seed.short_json),
    );
    expect(sections).toHaveLength(22);
    expect(sections[0]!.fields.some((f) => f.value)).toBe(true);
  });

  it("normalizes 12 skills with 10-level roadmaps", () => {
    const skills = normalizeDashboardSkills(seed.skill_levels);
    expect(skills).toHaveLength(12);
    expect(skills[0]!.score).toBe(8);
    for (const skill of skills) {
      expect(SKILL_TOPICS[skill.skill_set_id]).toHaveLength(10);
    }
  });

  it("maps helpers correctly", () => {
    expect(proficiencyToBloom(1)).toBe("CU");
    expect(proficiencyToBloom(10)).toBe("CR");
    expect(scoreToCriticality(7)).toBe("Critical");
    expect(scoreToCriticality(3)).toBe("Baseline");
    expect(scoreToDifficulty(8)).toBe("EXPERT");
    expect(isNullish("NA")).toBe(true);
    expect(splitItems("A; B; C")).toEqual(["A", "B", "C"]);
  });
});
