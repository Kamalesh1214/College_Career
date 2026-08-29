/**
 * PHASE 1 SEED DATA — hardcoded, no database.
 * Key shapes match the future JSONB columns (short_json / full_json / skill_levels)
 * so Phase 2 can pipe rows straight into the normalizers in src/lib/companyData.ts.
 */

export interface SeedSkillLevel {
  skill_set_id: number;
  skill_set_name: string;
  required_level: number;
  required_proficiency: string;
}

export interface SeedCompany {
  company_id: number;
  short_json: Record<string, unknown>;
  full_json: Record<string, unknown>;
  skill_levels: SeedSkillLevel[];
}

export const SEED_COMPANIES: SeedCompany[] = [
  {
    company_id: 1,
    short_json: {
      name: "Accenture plc",
      short_name: "Accenture",
      logo_url:
        "https://www.accenture.com/_acnmedia/Accenture/Dev/RedesigNAcc_Logo_Black.svg",
      category: "Enterprise",
      company_type: "Dream",
      incorporation_year: 1989,
      employee_size: "740,000 employees",
      headquarters_address: "Dublin, Ireland",
      operating_countries:
        "United States; United Kingdom; India; Germany; France; Japan; Australia; Canada; Brazil; Singapore",
      office_locations:
        "New York, United States; London, United Kingdom; Bangalore, India; Paris, France; Tokyo, Japan; Toronto, Canada; Sydney, Australia; Frankfurt, Germany",
      yoy_growth_rate: "3%",
      website_url: "https://www.accenture.com",
    },
    full_json: {
      // ===== Identity & overview =====
      name: "Accenture plc",
      short_name: "Accenture",
      category: "Enterprise",
      incorporation_year: 1989,
      nature_of_company: "Public",
      overview_text:
        "Accenture is a global professional services company providing strategy, consulting, digital, technology, and operations services, serving large enterprises and governments across more than 120 countries with a strong focus on cloud, AI, and digital transformation.",
      headquarters_address: "Dublin, Ireland",
      operating_countries:
        "United States; United Kingdom; India; Germany; France; Japan; Australia; Canada; Brazil; Singapore",
      office_count: "200+",
      office_locations:
        "New York, United States; London, United Kingdom; Bangalore, India; Paris, France; Tokyo, Japan; Toronto, Canada; Sydney, Australia; Frankfurt, Germany",
      employee_size: "740,000 employees",
      vision_statement:
        "To drive continuous innovation and help the world's leading organizations build their digital core and achieve greater value.",
      mission_statement:
        "Deliver on the promise of technology and human ingenuity to create value and shared success for clients, people, shareholders, partners, and communities.",
      core_values:
        "Client value creation; Integrity; Respect for individuals; Innovation; Stewardship; Best people",
      history_timeline:
        "One of the largest employers of tech talent globally; Invests over $1B annually in R&D and innovation",
      recent_news:
        "2024, Invested $3B in generative AI strategy; 2024, Acquired multiple cloud and AI consulting firms in Europe",
      // ===== Digital presence =====
      website_url: "https://www.accenture.com",
      linkedin_url: "https://www.linkedin.com/company/accenture",
      twitter_handle: "@Accenture",
      facebook_url: "https://www.facebook.com/accenture",
      instagram_url: "https://www.instagram.com/accenture",
      primary_contact_email: "contact@accenture.com",
      primary_phone_number: "NA",
      // ===== Risk & compliance =====
      regulatory_status: "ISO 27001; SOC 2; GDPR Compliance; HIPAA Compliance",
      legal_issues:
        "Periodic labor and contract disputes; no major unresolved global litigation",
      esg_ratings:
        "Net-zero commitment by 2025; Science Based Targets; Diversity equity programs",
      supply_chain_dependencies: "Cloud providers; Software vendors; Talent workforce",
      geopolitical_risks: "Trade regulations; Data privacy laws; Regional conflicts",
      macro_risks: "Global recession; Enterprise IT budget cuts",
      carbon_footprint: "Actively reducing via renewable energy sourcing",
      ethical_sourcing: "Supplier code of conduct; ESG audits",
      // ===== Brand & ratings =====
      marketing_video_url: "https://www.youtube.com/@Accenture",
      customer_testimonials: "Unilever transformation story; Microsoft cloud case",
      website_quality:
        "Enterprise-grade, high clarity, strong thought leadership, polished UX",
      website_rating: "NA",
      website_traffic_rank: "Global 12,000; US 4,000",
      social_media_followers: "15000000",
      glassdoor_rating: "4.1/5",
      indeed_rating: "4.2/5",
      google_rating: "4.3/5",
      awards_recognitions:
        "Fortune Global 500; Great Place to Work Certified; Gartner Magic Quadrant Leader; Forbes Most Admired Companies",
      brand_sentiment_score:
        "Very Positive, strong global brand, high enterprise trust",
      event_participation:
        "World Economic Forum; Microsoft Ignite; AWS re:Invent; Global Fintech Fest",
      // ===== Products & services =====
      pain_points_addressed:
        "Digital transformation complexity; Legacy IT modernization; Cloud migration risk; Talent and skill gaps; Cybersecurity threats; Operational inefficiency",
      focus_sectors:
        "Financials; Health Care; Consumer Discretionary; Industrials; Energy; Telecommunications; Public Sector; Technology",
      offerings_description:
        "Management Consulting; Technology Services; Cloud Solutions; AI & Analytics; Cybersecurity; Business Process Outsourcing; Digital Engineering",
      top_customers:
        "Fortune 500 Enterprises; Global Banks; Government Agencies; Healthcare Systems; Telecom Operators; Energy Majors",
      core_value_proposition:
        "End-to-end transformation; Global delivery scale; Deep industry expertise; Strong technology partnerships; Innovation leadership",
      unique_differentiators:
        "Global delivery network; Industry-specific consulting; Strong alliance ecosystem; Proprietary AI and analytics platforms",
      competitive_advantages:
        "Brand leadership; Scale and geographic reach; Deep enterprise relationships; Strong partner network",
      weaknesses_gaps:
        "High cost structure; Dependency on large enterprise spending cycles; Complex organizational structure",
      key_challenges_needs:
        "Talent retention; Pricing pressure from competitors; Rapid AI disruption; Regulatory compliance across regions",
      key_competitors:
        "IBM Consulting; Deloitte; TCS; Infosys; Capgemini; Cognizant; Wipro; PwC; EY",
      market_share_percentage: "6-7% of global IT services market",
      sales_motion: "Enterprise Field Sales",
      customer_concentration_risk: "No, highly diversified client base",
      exit_strategy_history: "Mature public enterprise; Strategic acquisitions",
      benchmark_vs_peers:
        "Higher revenue than Capgemini; Comparable margins to IBM Consulting; Stronger cloud alliances than TCS",
      future_projections: "Revenue projected $70B by 2027",
      strategic_priorities:
        "Generative AI leadership; Cloud transformation; Sustainability consulting; Emerging markets growth",
      industry_associations: "World Economic Forum; NASSCOM; Business Roundtable",
      case_studies: "Microsoft cloud modernization; Unilever digital supply chain",
      go_to_market_strategy:
        "Enterprise account teams; Strategic alliances; Thought leadership marketing",
      innovation_roadmap: "GenAI platforms; Industry cloud solutions; Cyber resilience tools",
      product_pipeline: "AI copilots; Industry SaaS accelerators",
      tam: "$1.5T global IT and business services",
      sam: "$400B enterprise digital transformation",
      som: "7%",
      // ===== Culture & benefits =====
      leave_policy: "Paid leave; Mental health days",
      health_support: "Health insurance; Mental wellness",
      fixed_vs_variable_pay: "Mostly fixed",
      bonus_predictability: "Moderate",
      esops_incentives: "Stock grants; Performance shares",
      family_health_insurance: "Dependents covered; OPD",
      relocation_support: "Housing; Travel reimbursement",
      lifestyle_benefits: "Wellness programs; Meals; Fitness",
      hiring_velocity:
        "Technology ~15,000 open roles; Consulting ~8,000 open roles; Operations ~6,000 open roles; Sales ~2,000 open roles",
      employee_turnover: "15% annually (industry benchmark estimate)",
      avg_retention_tenure: "4.5 years",
      diversity_metrics: "47% women workforce; Global DEI programs",
      work_culture_summary: "Collaborative; Performance-driven",
      manager_quality: "Strong coaching focus",
      psychological_safety: "High",
      feedback_culture: "Continuous feedback; Annual reviews",
      diversity_inclusion_score: "Gender equity; Inclusive leadership",
      ethical_standards: "High integrity; Compliance-driven",
      burnout_risk: "Moderate",
      layoff_history: "Periodic restructuring",
      mission_clarity: "High",
      sustainability_csr: "Net-zero goals; Community programs",
      crisis_behavior: "Transparent and compliance-driven",
      // ===== Funding & financials =====
      annual_revenue: "$64.1B (FY2024)",
      annual_profit: "$7.2B net income (FY2024)",
      revenue_mix: "Consulting 55%; Managed Services 45%",
      valuation: "$220B market capitalization",
      yoy_growth_rate: "3%",
      profitability_status: "Profitable",
      key_investors: "Vanguard Group; BlackRock; State Street",
      recent_funding_rounds: "Public equity markets, ongoing institutional investment",
      total_capital_raised: "Public market funded",
      customer_acquisition_cost: "$100K+ per enterprise",
      customer_lifetime_value: "$5M+",
      cac_ltv_ratio: "NA",
      churn_rate: "<3%",
      net_promoter_score: "60",
      burn_rate: "Not Applicable, cash-flow positive",
      runway_months: "Not Applicable",
      burn_multiplier: "<1.0",
      // ===== Work location =====
      remote_policy_details: "Hybrid, 60% flexible",
      typical_hours: "Flexible",
      overtime_expectations: "Occasional during project peaks",
      weekend_work: "Rare",
      flexibility_level: "Remote; Hybrid",
      location_centrality: "Central business districts",
      public_transport_access: "Metro; Bus; Train",
      cab_policy: "Ride-hailing; Company transport",
      airport_commute_time: "45 minutes",
      office_zone_type: "IT hub",
      area_safety: "Secure; Well-monitored",
      safety_policies: "Late-night transport; Workplace safety",
      infrastructure_safety: "Fire compliant; Secure access",
      emergency_preparedness: "Medical support; Fire drills",
      // ===== Leadership =====
      ceo_name: "Julie Sweet",
      ceo_linkedin_url: "https://www.linkedin.com/in/juliesweet",
      key_leaders:
        "Julie Sweet, Chair & CEO; Manish Sharma, CEO; Jack Azagury, Group Chief Executive",
      warm_intro_pathways:
        "Fortune 500 board connections; Alumni network; Technology partner ecosystems",
      decision_maker_access:
        "Low, Large enterprise structure with formal procurement and partner-led access",
      contact_person_name: "Julie Sweet",
      contact_person_title: "CEO",
      contact_person_email: "prabhakar.d.phatak@accenture.com",
      contact_person_phone: "793 1578",
      board_members: "Julie Sweet; David Rowland; Former global executives",
      // ===== Career growth =====
      training_spend: "$1,500 per employee/year",
      onboarding_quality: "Industry-leading",
      learning_culture: "Internal LMS; Certifications",
      exposure_quality: "High",
      mentorship_availability: "Leadership mentors; Peer mentors",
      internal_mobility: "High",
      promotion_clarity: "Merit-based; Transparent",
      tools_access: "Enterprise software; Cloud platforms",
      role_clarity: "High",
      early_ownership: "Medium",
      work_impact: "Client-facing; Revenue-linked",
      execution_thinking_balance: "Balanced",
      automation_level: "High",
      cross_functional_exposure: "Consulting; Technology; Sales",
      company_maturity: "Mature enterprise",
      brand_value: "Global top-tier brand",
      client_quality: "Fortune 500; Governments",
      exit_opportunities: "Big Tech; Global consultancies; Industry leadership roles",
      skill_relevance: "Very High",
      external_recognition: "Strong global credibility",
      network_strength: "Global alumni network; Executive connections",
      global_exposure: "Global clients; International teams",
      // ===== Tech =====
      technology_partners:
        "Microsoft; SAP; Oracle; AWS; Google Cloud; Salesforce; NVIDIA",
      intellectual_property:
        "Accenture Labs IP; Industry AI frameworks; Proprietary cloud accelerators",
      r_and_d_investment: "$1.5B annually",
      ai_ml_adoption_level:
        "High, generative AI platforms, AI-led consulting, automation for delivery optimization",
      tech_stack: "SAP; Salesforce; AWS; Microsoft Azure; ServiceNow; Kubernetes; Python",
      cybersecurity_posture: "ISO 27001; SOC 2; Global cyber defense centers",
      partnership_ecosystem: "Microsoft; SAP; Oracle; Google; AWS; Salesforce",
      tech_adoption_rating: "High, Industry Leader; Top-tier among peers",
    },
    skill_levels: [
      {
        skill_set_id: 1,
        skill_set_name: "Data Structures & Algorithms",
        required_level: 8,
        required_proficiency: "Expert",
      },
      {
        skill_set_id: 2,
        skill_set_name: "Object-Oriented Programming",
        required_level: 7,
        required_proficiency: "Advanced",
      },
      {
        skill_set_id: 3,
        skill_set_name: "SQL & Databases",
        required_level: 7,
        required_proficiency: "Advanced",
      },
      {
        skill_set_id: 4,
        skill_set_name: "Cloud Fundamentals (AWS/Azure)",
        required_level: 6,
        required_proficiency: "Proficient",
      },
      {
        skill_set_id: 5,
        skill_set_name: "Operating Systems",
        required_level: 6,
        required_proficiency: "Proficient",
      },
      {
        skill_set_id: 6,
        skill_set_name: "Computer Networks",
        required_level: 5,
        required_proficiency: "Proficient",
      },
      {
        skill_set_id: 7,
        skill_set_name: "Aptitude & Logical Reasoning",
        required_level: 7,
        required_proficiency: "Advanced",
      },
      {
        skill_set_id: 8,
        skill_set_name: "Communication & Behavioral",
        required_level: 7,
        required_proficiency: "Advanced",
      },
      {
        skill_set_id: 9,
        skill_set_name: "Web Development Basics",
        required_level: 5,
        required_proficiency: "Proficient",
      },
      {
        skill_set_id: 10,
        skill_set_name: "System Design (Intro)",
        required_level: 4,
        required_proficiency: "Intermediate",
      },
      {
        skill_set_id: 11,
        skill_set_name: "Git & Version Control",
        required_level: 5,
        required_proficiency: "Proficient",
      },
      {
        skill_set_id: 12,
        skill_set_name: "Generative AI Basics",
        required_level: 4,
        required_proficiency: "Intermediate",
      },
    ],
  },
];
