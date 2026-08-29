import {
  Building2,
  Eye,
  Users,
  Wallet,
  Globe2,
  Package,
  Cpu,
  Handshake,
  Swords,
  Target,
  Sparkles,
  HeartHandshake,
  Newspaper,
  LineChart,
  ShieldAlert,
  MapPin,
  ShieldCheck,
  GraduationCap,
  Award,
  Gift,
  Star,
  Mail,
  type LucideIcon,
} from "lucide-react";
import type { CompanyProfile } from "@/lib/companyData";

export type FieldKind = "auto" | "url" | "video" | "rating" | "list" | "paragraph";

export interface IntelligenceField {
  key: string;
  label: string;
  kind?: FieldKind;
  value?: string;
}

export interface IntelligenceSection {
  id: string;
  title: string;
  icon: LucideIcon;
  fields: IntelligenceField[];
}

type SectionSchema = Omit<IntelligenceSection, "fields"> & {
  fields: IntelligenceField[];
};

const SCHEMA: SectionSchema[] = [
  {
    id: "identity",
    title: "Company Identity",
    icon: Building2,
    fields: [
      { key: "name", label: "Legal Name" },
      { key: "short_name", label: "Common Name" },
      { key: "category", label: "Category" },
      { key: "nature_of_company", label: "Nature of Company" },
      { key: "incorporation_year", label: "Incorporated" },
      { key: "employee_size", label: "Employee Size" },
    ],
  },
  {
    id: "overview",
    title: "Overview & Vision",
    icon: Eye,
    fields: [
      { key: "overview_text", label: "Overview", kind: "paragraph" },
      { key: "vision_statement", label: "Vision", kind: "paragraph" },
      { key: "mission_statement", label: "Mission", kind: "paragraph" },
      { key: "core_values", label: "Core Values", kind: "list" },
      { key: "history_timeline", label: "History", kind: "list" },
    ],
  },
  {
    id: "leadership",
    title: "Leadership",
    icon: Users,
    fields: [
      { key: "ceo_name", label: "CEO" },
      { key: "ceo_linkedin_url", label: "CEO LinkedIn", kind: "url" },
      { key: "key_leaders", label: "Key Leaders", kind: "list" },
      { key: "board_members", label: "Board Members", kind: "list" },
      { key: "decision_maker_access", label: "Decision Maker Access" },
      { key: "warm_intro_pathways", label: "Warm Intro Pathways", kind: "list" },
    ],
  },
  {
    id: "funding",
    title: "Funding & Financials",
    icon: Wallet,
    fields: [
      { key: "annual_revenue", label: "Annual Revenue" },
      { key: "annual_profit", label: "Annual Profit" },
      { key: "revenue_mix", label: "Revenue Mix", kind: "list" },
      { key: "valuation", label: "Valuation" },
      { key: "yoy_growth_rate", label: "YoY Growth" },
      { key: "profitability_status", label: "Profitability" },
      { key: "key_investors", label: "Key Investors", kind: "list" },
      { key: "recent_funding_rounds", label: "Recent Funding" },
      { key: "total_capital_raised", label: "Total Capital Raised" },
      { key: "burn_rate", label: "Burn Rate" },
      { key: "runway_months", label: "Runway" },
      { key: "burn_multiplier", label: "Burn Multiplier" },
    ],
  },
  {
    id: "presence",
    title: "Global Presence",
    icon: Globe2,
    fields: [
      { key: "headquarters_address", label: "Headquarters" },
      { key: "operating_countries", label: "Operating Countries", kind: "list" },
      { key: "office_count", label: "Office Count" },
      { key: "office_locations", label: "Office Locations", kind: "list" },
      { key: "global_exposure", label: "Global Exposure" },
    ],
  },
  {
    id: "products",
    title: "Products & Services",
    icon: Package,
    fields: [
      { key: "offerings_description", label: "Offerings", kind: "list" },
      { key: "focus_sectors", label: "Focus Sectors", kind: "list" },
      { key: "pain_points_addressed", label: "Pain Points Addressed", kind: "list" },
      { key: "product_pipeline", label: "Product Pipeline", kind: "list" },
      { key: "innovation_roadmap", label: "Innovation Roadmap", kind: "list" },
      { key: "case_studies", label: "Case Studies", kind: "list" },
    ],
  },
  {
    id: "technology",
    title: "Technology Stack",
    icon: Cpu,
    fields: [
      { key: "tech_stack", label: "Tech Stack", kind: "list" },
      { key: "ai_ml_adoption_level", label: "AI / ML Adoption" },
      { key: "tech_adoption_rating", label: "Tech Adoption Rating" },
      { key: "r_and_d_investment", label: "R&D Investment" },
      { key: "intellectual_property", label: "Intellectual Property", kind: "list" },
      { key: "cybersecurity_posture", label: "Cybersecurity Posture", kind: "list" },
      { key: "automation_level", label: "Automation Level" },
    ],
  },
  {
    id: "partnerships",
    title: "Partnerships & Ecosystem",
    icon: Handshake,
    fields: [
      { key: "technology_partners", label: "Technology Partners", kind: "list" },
      { key: "partnership_ecosystem", label: "Partnership Ecosystem", kind: "list" },
      { key: "industry_associations", label: "Industry Associations", kind: "list" },
      { key: "event_participation", label: "Event Participation", kind: "list" },
    ],
  },
  {
    id: "competition",
    title: "Competitive Landscape",
    icon: Swords,
    fields: [
      { key: "key_competitors", label: "Key Competitors", kind: "list" },
      { key: "market_share_percentage", label: "Market Share" },
      { key: "benchmark_vs_peers", label: "Benchmark vs Peers", kind: "list" },
      { key: "competitive_advantages", label: "Competitive Advantages", kind: "list" },
      { key: "weaknesses_gaps", label: "Weaknesses & Gaps", kind: "list" },
      { key: "unique_differentiators", label: "Differentiators", kind: "list" },
    ],
  },
  {
    id: "market",
    title: "Market Opportunity",
    icon: Target,
    fields: [
      { key: "tam", label: "TAM" },
      { key: "sam", label: "SAM" },
      { key: "som", label: "SOM" },
      { key: "future_projections", label: "Future Projections" },
      { key: "strategic_priorities", label: "Strategic Priorities", kind: "list" },
      { key: "go_to_market_strategy", label: "Go-To-Market", kind: "list" },
      { key: "key_challenges_needs", label: "Challenges & Needs", kind: "list" },
    ],
  },
  {
    id: "value-esg",
    title: "Core Value Proposition & ESG",
    icon: Sparkles,
    fields: [
      { key: "core_value_proposition", label: "Value Proposition", kind: "list" },
      { key: "esg_ratings", label: "ESG Ratings", kind: "list" },
      { key: "sustainability_csr", label: "Sustainability & CSR", kind: "list" },
      { key: "carbon_footprint", label: "Carbon Footprint" },
      { key: "ethical_sourcing", label: "Ethical Sourcing", kind: "list" },
      { key: "ethical_standards", label: "Ethical Standards" },
    ],
  },
  {
    id: "culture",
    title: "Culture & Work Life",
    icon: HeartHandshake,
    fields: [
      { key: "work_culture_summary", label: "Culture Summary", kind: "list" },
      { key: "manager_quality", label: "Manager Quality" },
      { key: "psychological_safety", label: "Psychological Safety" },
      { key: "feedback_culture", label: "Feedback Culture", kind: "list" },
      { key: "diversity_metrics", label: "Diversity Metrics", kind: "list" },
      { key: "diversity_inclusion_score", label: "D&I Focus", kind: "list" },
      { key: "burnout_risk", label: "Burnout Risk" },
      { key: "layoff_history", label: "Layoff History" },
      { key: "mission_clarity", label: "Mission Clarity" },
      { key: "crisis_behavior", label: "Crisis Behaviour" },
      { key: "employee_turnover", label: "Employee Turnover" },
      { key: "avg_retention_tenure", label: "Average Tenure" },
    ],
  },
  {
    id: "news",
    title: "Recent News & Milestones",
    icon: Newspaper,
    fields: [
      { key: "recent_news", label: "Recent News", kind: "list" },
      { key: "awards_recognitions", label: "Awards", kind: "list" },
      { key: "hiring_velocity", label: "Hiring Velocity", kind: "list" },
    ],
  },
  {
    id: "sales",
    title: "Sales & Customer Metrics",
    icon: LineChart,
    fields: [
      { key: "top_customers", label: "Top Customers", kind: "list" },
      { key: "sales_motion", label: "Sales Motion" },
      { key: "customer_concentration_risk", label: "Concentration Risk" },
      { key: "customer_acquisition_cost", label: "CAC" },
      { key: "customer_lifetime_value", label: "LTV" },
      { key: "cac_ltv_ratio", label: "CAC : LTV" },
      { key: "churn_rate", label: "Churn Rate" },
      { key: "net_promoter_score", label: "Net Promoter Score" },
      { key: "client_quality", label: "Client Quality", kind: "list" },
    ],
  },
  {
    id: "risk",
    title: "Risk & Compliance",
    icon: ShieldAlert,
    fields: [
      { key: "regulatory_status", label: "Regulatory Status", kind: "list" },
      { key: "legal_issues", label: "Legal Issues", kind: "list" },
      { key: "supply_chain_dependencies", label: "Supply Chain", kind: "list" },
      { key: "geopolitical_risks", label: "Geopolitical Risks", kind: "list" },
      { key: "macro_risks", label: "Macro Risks", kind: "list" },
      { key: "exit_strategy_history", label: "Exit Strategy History" },
    ],
  },
  {
    id: "location",
    title: "Work Location & Commute",
    icon: MapPin,
    fields: [
      { key: "remote_policy_details", label: "Remote Policy" },
      { key: "flexibility_level", label: "Flexibility", kind: "list" },
      { key: "typical_hours", label: "Typical Hours" },
      { key: "overtime_expectations", label: "Overtime" },
      { key: "weekend_work", label: "Weekend Work" },
      { key: "location_centrality", label: "Location Centrality" },
      { key: "public_transport_access", label: "Public Transport", kind: "list" },
      { key: "cab_policy", label: "Cab Policy", kind: "list" },
      { key: "airport_commute_time", label: "Airport Commute" },
      { key: "office_zone_type", label: "Office Zone" },
    ],
  },
  {
    id: "safety",
    title: "Safety & Wellbeing",
    icon: ShieldCheck,
    fields: [
      { key: "area_safety", label: "Area Safety", kind: "list" },
      { key: "safety_policies", label: "Safety Policies", kind: "list" },
      { key: "infrastructure_safety", label: "Infrastructure Safety", kind: "list" },
      { key: "emergency_preparedness", label: "Emergency Preparedness", kind: "list" },
      { key: "health_support", label: "Health Support", kind: "list" },
    ],
  },
  {
    id: "growth",
    title: "Career Growth & Learning",
    icon: GraduationCap,
    fields: [
      { key: "onboarding_quality", label: "Onboarding" },
      { key: "training_spend", label: "Training Spend" },
      { key: "learning_culture", label: "Learning Culture", kind: "list" },
      { key: "mentorship_availability", label: "Mentorship", kind: "list" },
      { key: "internal_mobility", label: "Internal Mobility" },
      { key: "promotion_clarity", label: "Promotion Clarity" },
      { key: "role_clarity", label: "Role Clarity" },
      { key: "early_ownership", label: "Early Ownership" },
      { key: "work_impact", label: "Work Impact", kind: "list" },
      { key: "execution_thinking_balance", label: "Execution vs Thinking" },
      { key: "cross_functional_exposure", label: "Cross-Functional Exposure", kind: "list" },
      { key: "exposure_quality", label: "Exposure Quality" },
      { key: "tools_access", label: "Tools Access", kind: "list" },
      { key: "skill_relevance", label: "Skill Relevance" },
      { key: "exit_opportunities", label: "Exit Opportunities", kind: "list" },
      { key: "network_strength", label: "Network Strength", kind: "list" },
    ],
  },
  {
    id: "brand",
    title: "Brand & Reputation",
    icon: Award,
    fields: [
      { key: "brand_value", label: "Brand Value" },
      { key: "brand_sentiment_score", label: "Brand Sentiment" },
      { key: "external_recognition", label: "External Recognition" },
      { key: "company_maturity", label: "Company Maturity" },
      { key: "customer_testimonials", label: "Testimonials", kind: "list" },
      { key: "marketing_video_url", label: "Marketing Video", kind: "video" },
    ],
  },
  {
    id: "benefits",
    title: "Compensation & Benefits",
    icon: Gift,
    fields: [
      { key: "fixed_vs_variable_pay", label: "Pay Structure" },
      { key: "bonus_predictability", label: "Bonus Predictability" },
      { key: "esops_incentives", label: "ESOPs & Incentives", kind: "list" },
      { key: "family_health_insurance", label: "Family Insurance", kind: "list" },
      { key: "leave_policy", label: "Leave Policy", kind: "list" },
      { key: "relocation_support", label: "Relocation Support", kind: "list" },
      { key: "lifestyle_benefits", label: "Lifestyle Benefits", kind: "list" },
    ],
  },
  {
    id: "digital",
    title: "Digital Presence & Ratings",
    icon: Star,
    fields: [
      { key: "website_url", label: "Website", kind: "url" },
      { key: "linkedin_url", label: "LinkedIn", kind: "url" },
      { key: "twitter_handle", label: "X / Twitter" },
      { key: "facebook_url", label: "Facebook", kind: "url" },
      { key: "instagram_url", label: "Instagram", kind: "url" },
      { key: "website_quality", label: "Website Quality" },
      { key: "website_rating", label: "Website Rating", kind: "rating" },
      { key: "website_traffic_rank", label: "Traffic Rank", kind: "list" },
      { key: "social_media_followers", label: "Social Followers" },
      { key: "glassdoor_rating", label: "Glassdoor", kind: "rating" },
      { key: "indeed_rating", label: "Indeed", kind: "rating" },
      { key: "google_rating", label: "Google", kind: "rating" },
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    icon: Mail,
    fields: [
      { key: "primary_contact_email", label: "Primary Email" },
      { key: "primary_phone_number", label: "Primary Phone" },
      { key: "contact_person_name", label: "Contact Person" },
      { key: "contact_person_title", label: "Contact Title" },
      { key: "contact_person_email", label: "Contact Email" },
      { key: "contact_person_phone", label: "Contact Phone" },
    ],
  },
];

/** Returns the 22-section schema, merging profile values when a profile is passed. */
export function buildIntelligenceSections(
  profile?: CompanyProfile,
): IntelligenceSection[] {
  return SCHEMA.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      value: profile ? (profile[field.key] ?? "") : "",
    })),
  }));
}
