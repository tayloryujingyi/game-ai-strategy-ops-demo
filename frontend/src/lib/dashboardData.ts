export const kpiData = [
  {
    title: "Lifecycle Stages",
    value: "5 Types",
    description: "Active / At-risk / Dormant",
  },
  {
    title: "High Churn Risk Users",
    value: "28",
    description: "Churn risk score ≥ 60",
  },
  {
    title: "High LTV Users",
    value: "19",
    description: "LTV potential score ≥ 75",
  },
  {
    title: "First Purchase Opportunities",
    value: "4",
    description: "No payment + high activity",
  },
];

export const lifecycleStageData = [
  { stage: "New User", users: 18 },
  { stage: "Active User", users: 42 },
  { stage: "Dormant User", users: 21 },
  { stage: "At-Risk User", users: 28 },
  { stage: "Core Paying User", users: 19 },
];

export const strategyData = [
  { strategy: "Recall Campaign", users: 28 },
  { strategy: "First Purchase Conversion", users: 4 },
  { strategy: "Retention Boost", users: 16 },
  { strategy: "VIP Maintenance", users: 19 },
  { strategy: "New User Guide", users: 18 },
];

export const priorityUsers = [
  {
    userId: "U023",
    segment: "At-Risk User",
    churnRisk: 82,
    ltvPotential: 65,
    recommendedAction: "Recall Campaign",
  },
  {
    userId: "U041",
    segment: "Core Paying User",
    churnRisk: 35,
    ltvPotential: 91,
    recommendedAction: "VIP Maintenance",
  },
  {
    userId: "U018",
    segment: "New User",
    churnRisk: 20,
    ltvPotential: 48,
    recommendedAction: "New User Guide",
  },
  {
    userId: "U057",
    segment: "Dormant User",
    churnRisk: 76,
    ltvPotential: 52,
    recommendedAction: "Return Reward",
  },
  {
    userId: "U066",
    segment: "Active User",
    churnRisk: 44,
    ltvPotential: 70,
    recommendedAction: "First Purchase Offer",
  },
];