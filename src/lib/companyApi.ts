import { useQuery } from "@tanstack/react-query";
import {
  normalizeCompanyProfile,
  normalizeCompanySummary,
  normalizeDashboardSkills,
  type CompanyProfile,
  type CompanySummary,
  type DashboardSkill,
  type SkillTopic,
} from "@/lib/companyData";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

type CompanyJsonRow = {
  company_id: number;
  short_json: unknown;
  full_json?: unknown;
};

type SkillLevelRow = {
  company_id: number;
  skill_set_id: number;
  required_level: number;
  required_proficiency_level_id: number | null;
};

type SkillSetRow = {
  skill_set_id: number;
  skill_set_name: string | null;
  short_name: string | null;
};

type ProficiencyRow = {
  proficiency_level_id: number;
  proficiency_name: string | null;
  proficiency_code: string | null;
};

type TopicRow = {
  skill_set_id: number;
  level_number: number;
  topics: unknown;
};

function throwOnError<T>({ data, error }: { data: T; error: unknown }): T {
  if (error) throw error;
  return data;
}

function normalizeTopics(value: unknown, levelNumber: number): SkillTopic[] {
  if (Array.isArray(value)) {
    return value.map((topic) => ({ level_number: levelNumber, topic: String(topic) }));
  }
  if (typeof value === "string" && value.trim()) {
    return [{ level_number: levelNumber, topic: value.trim() }];
  }
  return [];
}

async function fetchCompanies(): Promise<CompanySummary[]> {
  const result = await supabase.from("company_json").select("company_id, short_json");
  const rows = throwOnError(result) as CompanyJsonRow[];
  return rows.map((row) => normalizeCompanySummary(row.short_json, row.company_id));
}

async function fetchCompanyProfile(id: number): Promise<CompanyProfile> {
  const result = await supabase
    .from("company_json")
    .select("company_id, short_json, full_json")
    .eq("company_id", id)
    .single();
  const row = throwOnError(result) as CompanyJsonRow;
  return normalizeCompanyProfile(row.full_json, row.short_json);
}

async function fetchCompanySkills(id: number): Promise<DashboardSkill[]> {
  const [levelsResult, skillSetsResult, proficienciesResult, topicsResult] = await Promise.all([
    supabase
      .from("company_skill_levels")
      .select("company_id, skill_set_id, required_level, required_proficiency_level_id")
      .eq("company_id", id),
    supabase.from("skill_set_master").select("skill_set_id, skill_set_name, short_name"),
    supabase
      .from("proficiency_levels")
      .select("proficiency_level_id, proficiency_name, proficiency_code"),
    supabase.from("skill_set_topics").select("skill_set_id, level_number, topics"),
  ]);

  const levels = throwOnError(levelsResult) as SkillLevelRow[];
  const skillSets = throwOnError(skillSetsResult) as SkillSetRow[];
  const proficiencies = throwOnError(proficienciesResult) as ProficiencyRow[];
  const topicRows = throwOnError(topicsResult) as TopicRow[];
  const skillSetById = new Map(skillSets.map((row) => [row.skill_set_id, row]));
  const proficiencyById = new Map(proficiencies.map((row) => [row.proficiency_level_id, row]));
  const topicsBySkill = new Map<number, SkillTopic[]>();

  for (const row of topicRows) {
    const topics = topicsBySkill.get(row.skill_set_id) ?? [];
    topics.push(...normalizeTopics(row.topics, row.level_number));
    topicsBySkill.set(row.skill_set_id, topics);
  }

  const normalized = normalizeDashboardSkills(
    levels.map((level) => {
      const skillSet = skillSetById.get(level.skill_set_id);
      const proficiency = proficiencyById.get(level.required_proficiency_level_id ?? -1);
      return {
        ...level,
        skill_set_name: skillSet?.skill_set_name || skillSet?.short_name || "",
        required_proficiency: proficiency?.proficiency_name || proficiency?.proficiency_code || "",
      };
    }),
  );

  return normalized.map((skill) => ({
    ...skill,
    topics: (topicsBySkill.get(skill.skill_set_id) ?? []).sort(
      (a, b) => a.level_number - b.level_number,
    ),
  }));
}

export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    enabled: isSupabaseConfigured,
  });
}

export function useCompanyProfile(id: number | undefined) {
  return useQuery({
    queryKey: ["company-profile", id],
    queryFn: () => fetchCompanyProfile(id as number),
    enabled: isSupabaseConfigured && id !== undefined,
  });
}

export function useCompanySkills(id: number | undefined) {
  return useQuery({
    queryKey: ["company-skills", id],
    queryFn: () => fetchCompanySkills(id as number),
    enabled: isSupabaseConfigured && id !== undefined,
  });
}
