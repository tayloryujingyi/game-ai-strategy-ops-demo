const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { createObjectCsvWriter } = require("csv-writer");
const { scoreUser } = require("./scoring");

// 输入文件路径
const inputFilePath = path.join(__dirname, "..", "data", "users.csv");

// 输出文件路径
const outputFilePath = path.join(__dirname, "..", "data", "users_scored.csv");

const users = [];

// 读取 CSV
fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (row) => {
    users.push(row);
  })
  .on("end", async () => {
    try {
      // 给每个用户打分
      const scoredUsers = users.map((user) => scoreUser(user));

      // 定义输出表头
      const csvWriter = createObjectCsvWriter({
        path: outputFilePath,
        header: [
          { id: "user_id", title: "user_id" },
          { id: "register_days", title: "register_days" },
          { id: "last_login_days_ago", title: "last_login_days_ago" },
          { id: "login_days_7d", title: "login_days_7d" },
          { id: "avg_session_minutes_7d", title: "avg_session_minutes_7d" },
          { id: "battles_7d", title: "battles_7d" },
          { id: "events_joined_30d", title: "events_joined_30d" },
          { id: "social_interactions_7d", title: "social_interactions_7d" },
          { id: "total_payment", title: "total_payment" },
          { id: "payment_count", title: "payment_count" },
          { id: "last_payment_days_ago", title: "last_payment_days_ago" },
          { id: "first_payment_done", title: "first_payment_done" },
          { id: "favorite_mode", title: "favorite_mode" },
          { id: "device_type", title: "device_type" },
          { id: "region", title: "region" },
          { id: "vip_level", title: "vip_level" },
          { id: "avg_payment_amount", title: "avg_payment_amount" },
          { id: "lifecycle_stage", title: "lifecycle_stage" },
          { id: "churn_risk_score", title: "churn_risk_score" },
          { id: "conversion_score", title: "conversion_score" },
          { id: "ltv_score", title: "ltv_score" },
          { id: "user_segment", title: "user_segment" },
          { id: "recommended_action", title: "recommended_action" },
        ],
      });

      // 写入新的 CSV
      await csvWriter.writeRecords(scoredUsers);

      console.log("处理完成，已生成文件：data/users_scored.csv");
    } catch (error) {
      console.error("处理过程中出错：", error);
    }
  })
  .on("error", (error) => {
    console.error("读取 CSV 文件失败：", error);
  });