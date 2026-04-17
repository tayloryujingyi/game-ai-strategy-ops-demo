export type UserProfile = {
  user_id: string;
  lifecycle_stage: string;
  user_segment: string;
  recommended_action: string;
  churn_risk_score: number;
  conversion_score: number;
  ltv_score: number;
  register_days: number;
  last_login_days_ago: number;
  login_days_7d: number;
  avg_session_minutes_7d: number;
  battles_7d: number;
  events_joined_30d: number;
  social_interactions_7d: number;
  total_payment: number;
  payment_count: number;
  last_payment_days_ago: number;
  first_payment_done: number;
  avg_payment_amount: number;
  vip_level: number;
  favorite_mode: string;
};

export const mockUsers: UserProfile[] = [
  {
    user_id: "U0015",
    lifecycle_stage: "Core Paying User",
    user_segment: "High Value Stable Payer",
    recommended_action: "VIP Maintenance",
    churn_risk_score: 0,
    conversion_score: 100,
    ltv_score: 86,
    register_days: 15,
    last_login_days_ago: 0,
    login_days_7d: 7,
    avg_session_minutes_7d: 40,
    battles_7d: 95,
    events_joined_30d: 6,
    social_interactions_7d: 50,
    total_payment: 499.99,
    payment_count: 25,
    last_payment_days_ago: 0,
    first_payment_done: 1,
    avg_payment_amount: 20.0,
    vip_level: 10,
    favorite_mode: "PvP",
  },
  {
    user_id: "U0019",
    lifecycle_stage: "Dormant User",
    user_segment: "Churned Waiting Recall",
    recommended_action: "Recall Campaign",
    churn_risk_score: 100,
    conversion_score: 0,
    ltv_score: 0,
    register_days: 300,
    last_login_days_ago: 200,
    login_days_7d: 0,
    avg_session_minutes_7d: 0,
    battles_7d: 0,
    events_joined_30d: 0,
    social_interactions_7d: 0,
    total_payment: 0,
    payment_count: 0,
    last_payment_days_ago: 999,
    first_payment_done: 0,
    avg_payment_amount: 0,
    vip_level: 0,
    favorite_mode: "PvE",
  },
  {
    user_id: "U0022",
    lifecycle_stage: "Core Paying User",
    user_segment: "High Value Stable Payer",
    recommended_action: "VIP Maintenance",
    churn_risk_score: 0,
    conversion_score: 100,
    ltv_score: 100,
    register_days: 11,
    last_login_days_ago: 0,
    login_days_7d: 7,
    avg_session_minutes_7d: 50,
    battles_7d: 140,
    events_joined_30d: 8,
    social_interactions_7d: 60,
    total_payment: 999.0,
    payment_count: 50,
    last_payment_days_ago: 0,
    first_payment_done: 1,
    avg_payment_amount: 19.98,
    vip_level: 10,
    favorite_mode: "PvP",
  },
  {
    user_id: "U0023",
    lifecycle_stage: "New User",
    user_segment: "High Potential First Purchase",
    recommended_action: "First Purchase Conversion",
    churn_risk_score: 12,
    conversion_score: 59,
    ltv_score: 20,
    register_days: 3,
    last_login_days_ago: 1,
    login_days_7d: 5,
    avg_session_minutes_7d: 20,
    battles_7d: 32,
    events_joined_30d: 1,
    social_interactions_7d: 12,
    total_payment: 0,
    payment_count: 0,
    last_payment_days_ago: 999,
    first_payment_done: 0,
    avg_payment_amount: 0,
    vip_level: 0,
    favorite_mode: "PvP",
  },
];

export function getUserById(userId: string) {
  return mockUsers.find(
    (user) => user.user_id.toUpperCase() === userId.trim().toUpperCase()
  );
}