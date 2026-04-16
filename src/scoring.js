// 这个文件专门负责“给用户打分和打标签”
// 你可以把它理解成：这个项目的小脑子

function toNumber(value) {
  const num = Number(value);
  return Number.isNaN(num) ? 0 : num;
}

// 1. 判断生命周期阶段
function getLifecycleStage(user) {
  const registerDays = toNumber(user.register_days);
  const lastLoginDaysAgo = toNumber(user.last_login_days_ago);
  const loginDays7d = toNumber(user.login_days_7d);
  const totalPayment = toNumber(user.total_payment);
  const paymentCount = toNumber(user.payment_count);

  if (registerDays <= 7) {
    return "New User";
  }

  if (totalPayment >= 300 && paymentCount >= 5 && lastLoginDaysAgo <= 3) {
    return "Core Paying User";
  }

  if (lastLoginDaysAgo > 10) {
    return "Dormant User";
  }

  if ((lastLoginDaysAgo >= 4 && lastLoginDaysAgo <= 10) || loginDays7d <= 2) {
    return "At-Risk User";
  }

  if (registerDays > 60 && lastLoginDaysAgo <= 2 && loginDays7d <= 3) {
    return "Returning User";
  }

  return "Active User";
}

// 2. 计算流失风险分
function getChurnRiskScore(user) {
  const lastLoginDaysAgo = toNumber(user.last_login_days_ago);
  const loginDays7d = toNumber(user.login_days_7d);
  const avgSessionMinutes7d = toNumber(user.avg_session_minutes_7d);
  const eventsJoined30d = toNumber(user.events_joined_30d);
  const socialInteractions7d = toNumber(user.social_interactions_7d);

  let score = 0;

  if (lastLoginDaysAgo >= 14) {
    score += 40;
  } else if (lastLoginDaysAgo >= 7) {
    score += 30;
  } else if (lastLoginDaysAgo >= 4) {
    score += 20;
  } else if (lastLoginDaysAgo >= 2) {
    score += 10;
  }

  if (loginDays7d <= 1) {
    score += 25;
  } else if (loginDays7d <= 3) {
    score += 15;
  } else if (loginDays7d <= 5) {
    score += 5;
  }

  if (avgSessionMinutes7d < 10) {
    score += 15;
  } else if (avgSessionMinutes7d < 20) {
    score += 8;
  }

  if (eventsJoined30d === 0) {
    score += 10;
  } else if (eventsJoined30d <= 1) {
    score += 5;
  }

  if (socialInteractions7d === 0) {
    score += 10;
  } else if (socialInteractions7d <= 2) {
    score += 5;
  }

  if (score > 100) score = 100;
  return score;
}

// 3. 计算转化潜力分
function getConversionScore(user) {
  const firstPaymentDone = toNumber(user.first_payment_done);
  const loginDays7d = toNumber(user.login_days_7d);
  const avgSessionMinutes7d = toNumber(user.avg_session_minutes_7d);
  const eventsJoined30d = toNumber(user.events_joined_30d);
  const socialInteractions7d = toNumber(user.social_interactions_7d);
  const registerDays = toNumber(user.register_days);

  let score = 0;

  if (firstPaymentDone === 1) {
    return 100;
  }

  if (loginDays7d >= 6) {
    score += 25;
  } else if (loginDays7d >= 4) {
    score += 18;
  } else if (loginDays7d >= 2) {
    score += 10;
  }

  if (avgSessionMinutes7d >= 45) {
    score += 20;
  } else if (avgSessionMinutes7d >= 25) {
    score += 12;
  } else if (avgSessionMinutes7d >= 15) {
    score += 6;
  }

  if (eventsJoined30d >= 5) {
    score += 20;
  } else if (eventsJoined30d >= 3) {
    score += 12;
  } else if (eventsJoined30d >= 1) {
    score += 5;
  }

  if (socialInteractions7d >= 10) {
    score += 20;
  } else if (socialInteractions7d >= 5) {
    score += 12;
  } else if (socialInteractions7d >= 2) {
    score += 5;
  }

  if (registerDays <= 30) {
    score += 10;
  }

  if (score > 100) score = 100;
  return score;
}

// 4. 计算 LTV 潜力分
function getLtvScore(user) {
  const totalPayment = toNumber(user.total_payment);
  const paymentCount = toNumber(user.payment_count);
  const loginDays7d = toNumber(user.login_days_7d);
  const avgSessionMinutes7d = toNumber(user.avg_session_minutes_7d);
  const eventsJoined30d = toNumber(user.events_joined_30d);
  const socialInteractions7d = toNumber(user.social_interactions_7d);

  let score = 0;

  if (totalPayment >= 500) {
    score += 35;
  } else if (totalPayment >= 200) {
    score += 25;
  } else if (totalPayment >= 50) {
    score += 15;
  } else if (totalPayment > 0) {
    score += 8;
  }

  if (paymentCount >= 8) {
    score += 20;
  } else if (paymentCount >= 4) {
    score += 12;
  } else if (paymentCount >= 1) {
    score += 6;
  }

  if (loginDays7d >= 6) {
    score += 15;
  } else if (loginDays7d >= 4) {
    score += 10;
  } else if (loginDays7d >= 2) {
    score += 5;
  }

  if (avgSessionMinutes7d >= 45) {
    score += 10;
  } else if (avgSessionMinutes7d >= 25) {
    score += 6;
  }

  if (eventsJoined30d >= 5) {
    score += 10;
  } else if (eventsJoined30d >= 2) {
    score += 5;
  }

  if (socialInteractions7d >= 8) {
    score += 10;
  } else if (socialInteractions7d >= 3) {
    score += 5;
  }

  if (score > 100) score = 100;
  return score;
}

// 5. 细分用户标签
function getUserSegment(user, lifecycleStage, conversionScore) {
  const registerDays = toNumber(user.register_days);
  const loginDays7d = toNumber(user.login_days_7d);
  const avgSessionMinutes7d = toNumber(user.avg_session_minutes_7d);
  const totalPayment = toNumber(user.total_payment);
  const eventsJoined30d = toNumber(user.events_joined_30d);
  const socialInteractions7d = toNumber(user.social_interactions_7d);
  const lastLoginDaysAgo = toNumber(user.last_login_days_ago);
  const paymentCount = toNumber(user.payment_count);

  if (totalPayment >= 300 && paymentCount >= 5 && lastLoginDaysAgo <= 3) {
    return "High Value Stable Payer";
  }

  if (lastLoginDaysAgo > 10) {
    return "Churned Waiting Recall";
  }

  if (lastLoginDaysAgo >= 4 && lastLoginDaysAgo <= 10) {
    return "Recent Silent Risk";
  }

  if (
  totalPayment === 0 &&
  loginDays7d >= 5 &&
  avgSessionMinutes7d >= 20 &&
  socialInteractions7d >= 5 &&
  conversionScore >= 45
) {
  return "High Potential First Purchase";
}

  if (totalPayment === 0 && loginDays7d >= 5 && avgSessionMinutes7d >= 25) {
    return "Highly Active Non-Payer";
  }

  if (
  totalPayment > 0 &&
  totalPayment < 50 &&
  loginDays7d >= 6 &&
  avgSessionMinutes7d >= 20
) {
  return "Highly Active Low Payer";
}

  if (registerDays <= 14 && loginDays7d >= 5) {
    return "New Highly Active User";
  }

  if (registerDays <= 14 && loginDays7d <= 3) {
    return "New Low Activity User";
  }

  if (lifecycleStage === "At-Risk User") {
    return "General At-Risk User";
  }

  return "General Active User";
}

// 6. 推荐动作
function getRecommendedAction(userSegment, lifecycleStage) {
  if (lifecycleStage === "Dormant User") {
    return "Recall Campaign";
  }

  if (lifecycleStage === "At-Risk User") {
    return "Retention Boost";
  }

  if (userSegment === "High Potential First Purchase") {
    return "First Purchase Conversion";
  }

  if (userSegment === "Highly Active Non-Payer") {
    return "First Purchase Conversion";
  }

  if (userSegment === "High Value Stable Payer") {
    return "VIP Maintenance";
  }

  if (userSegment === "Highly Active Low Payer") {
    return "Upsell Light Package";
  }

  if (userSegment === "New Highly Active User") {
    return "New User Growth Guide";
  }

  if (userSegment === "Churned Waiting Recall") {
    return "Recall Campaign";
  }

  return "Light Touch Observation";
}

// 7. 把所有结果整合起来
function scoreUser(user) {
  const lifecycleStage = getLifecycleStage(user);
  const churnRiskScore = getChurnRiskScore(user);
  const conversionScore = getConversionScore(user);
  const ltvScore = getLtvScore(user);
  const userSegment = getUserSegment(user, lifecycleStage, conversionScore);
  const recommendedAction = getRecommendedAction(userSegment, lifecycleStage);

  return {
    ...user,
    lifecycle_stage: lifecycleStage,
    churn_risk_score: churnRiskScore,
    conversion_score: conversionScore,
    ltv_score: ltvScore,
    user_segment: userSegment,
    recommended_action: recommendedAction,
  };
}

module.exports = {
  scoreUser,
};