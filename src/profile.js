const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const inputFilePath = path.join(__dirname, "..", "data", "users_scored.csv");

// 从命令行拿 user_id
const targetUserId = process.argv[2];

if (!targetUserId) {
  console.log("请在命令后面输入一个 user_id，例如：");
  console.log("node src/profile.js U0015");
  process.exit(1);
}

const users = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (row) => {
    users.push(row);
  })
  .on("end", () => {
    const user = users.find(
      (u) => u.user_id.toUpperCase() === targetUserId.toUpperCase()
    );

    if (!user) {
      console.log(`没有找到 user_id = ${targetUserId} 的用户`);
      return;
    }

    console.log("\n==============================");
    console.log("玩家画像查询结果");
    console.log("==============================\n");

    console.log(`用户ID: ${user.user_id}`);
    console.log(`生命周期阶段: ${user.lifecycle_stage}`);
    console.log(`用户细分: ${user.user_segment}`);
    console.log(`推荐动作: ${user.recommended_action}`);

    console.log("\n--- 分数 ---");
    console.log(`流失风险分: ${user.churn_risk_score}`);
    console.log(`转化潜力分: ${user.conversion_score}`);
    console.log(`LTV潜力分: ${user.ltv_score}`);

    console.log("\n--- 基础行为数据 ---");
    console.log(`注册天数: ${user.register_days}`);
    console.log(`距上次登录天数: ${user.last_login_days_ago}`);
    console.log(`近7天登录天数: ${user.login_days_7d}`);
    console.log(`近7天平均在线时长: ${user.avg_session_minutes_7d}`);
    console.log(`近7天战斗次数: ${user.battles_7d}`);
    console.log(`近30天参与活动次数: ${user.events_joined_30d}`);
    console.log(`近7天社交互动次数: ${user.social_interactions_7d}`);

    console.log("\n--- 付费数据 ---");
    console.log(`累计付费金额: ${user.total_payment}`);
    console.log(`付费次数: ${user.payment_count}`);
    console.log(`距上次付费天数: ${user.last_payment_days_ago}`);
    console.log(`是否完成首付: ${user.first_payment_done}`);
    console.log(`平均付费金额: ${user.avg_payment_amount}`);

    console.log("\n--- 其他信息 ---");
    console.log(`偏好模式: ${user.favorite_mode}`);
    console.log(`设备类型: ${user.device_type}`);
    console.log(`地区: ${user.region}`);
    console.log(`VIP等级: ${user.vip_level}`);

    console.log("\n==============================\n");
  })
  .on("error", (error) => {
    console.error("读取 users_scored.csv 失败：", error);
  });