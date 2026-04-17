const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const inputFilePath = path.join(__dirname, "..", "data", "users_scored.csv");
const outputFilePath = path.join(
  __dirname,
  "..",
  "frontend",
  "src",
  "lib",
  "usersScored.json"
);

const numberFields = [
  "register_days",
  "last_login_days_ago",
  "login_days_7d",
  "avg_session_minutes_7d",
  "battles_7d",
  "events_joined_30d",
  "social_interactions_7d",
  "total_payment",
  "payment_count",
  "last_payment_days_ago",
  "first_payment_done",
  "vip_level",
  "avg_payment_amount",
  "churn_risk_score",
  "conversion_score",
  "ltv_score",
];

const users = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (row) => {
    const cleanedRow = { ...row };

    numberFields.forEach((field) => {
      if (cleanedRow[field] !== undefined) {
        cleanedRow[field] = Number(cleanedRow[field]);
      }
    });

    users.push(cleanedRow);
  })
  .on("end", () => {
    fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
    fs.writeFileSync(outputFilePath, JSON.stringify(users, null, 2), "utf-8");

    console.log(`转换完成，已生成文件：${outputFilePath}`);
    console.log(`共导出 ${users.length} 条用户数据`);
  })
  .on("error", (error) => {
    console.error("转换失败：", error);
  });