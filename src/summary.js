const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const inputFilePath = path.join(__dirname, "..", "data", "users_scored.csv");

const users = [];

function countByField(data, fieldName) {
  const result = {};
  for (const item of data) {
    const key = item[fieldName] || "Unknown";
    result[key] = (result[key] || 0) + 1;
  }
  return result;
}

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (row) => {
    users.push(row);
  })
  .on("end", () => {
    console.log("\n=== 玩家总数 ===");
    console.log(users.length);

    console.log("\n=== 生命周期阶段分布 ===");
    console.log(countByField(users, "lifecycle_stage"));

    console.log("\n=== 用户细分分布 ===");
    console.log(countByField(users, "user_segment"));

    console.log("\n=== 推荐动作分布 ===");
    console.log(countByField(users, "recommended_action"));

    const highChurnUsers = users.filter(
      (u) => Number(u.churn_risk_score) >= 60
    );
    console.log("\n=== 高流失风险用户数（>=60） ===");
    console.log(highChurnUsers.length);

    const highLtvUsers = users.filter(
      (u) => Number(u.ltv_score) >= 60
    );
    console.log("\n=== 高LTV潜力用户数（>=60） ===");
    console.log(highLtvUsers.length);

    const highConversionUsers = users.filter(
      (u) => Number(u.conversion_score) >= 60
    );
    console.log("\n=== 高转化潜力用户数（>=60） ===");
    console.log(highConversionUsers.length);
  })
  .on("error", (error) => {
    console.error("读取 users_scored.csv 失败：", error);
  });