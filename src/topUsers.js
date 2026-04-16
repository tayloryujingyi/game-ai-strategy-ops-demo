const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const inputFilePath = path.join(__dirname, "..", "data", "users_scored.csv");
const users = [];

function printTopUsers(title, data, scoreField, limit = 10) {
  console.log(`\n==============================`);
  console.log(title);
  console.log(`==============================`);

  data
    .sort((a, b) => Number(b[scoreField]) - Number(a[scoreField]))
    .slice(0, limit)
    .forEach((user, index) => {
      console.log(
        `${index + 1}. ${user.user_id} | ${scoreField}: ${user[scoreField]} | lifecycle: ${user.lifecycle_stage} | segment: ${user.user_segment} | action: ${user.recommended_action}`
      );
    });
}

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (row) => {
    users.push(row);
  })
  .on("end", () => {
    printTopUsers("Top 10 高流失风险用户", [...users], "churn_risk_score");
    printTopUsers("Top 10 高LTV潜力用户", [...users], "ltv_score");
    printTopUsers("Top 10 高转化潜力用户", [...users], "conversion_score");

    console.log(`\n==============================`);
    console.log("高潜首付用户名单");
    console.log(`==============================`);

    const firstPurchaseUsers = users.filter(
      (u) => u.user_segment === "High Potential First Purchase"
    );

    if (firstPurchaseUsers.length === 0) {
      console.log("当前没有识别到 High Potential First Purchase 用户");
    } else {
      firstPurchaseUsers.forEach((user, index) => {
        console.log(
          `${index + 1}. ${user.user_id} | conversion: ${user.conversion_score} | lifecycle: ${user.lifecycle_stage} | action: ${user.recommended_action}`
        );
      });
    }
  })
  .on("error", (error) => {
    console.error("读取 users_scored.csv 失败：", error);
  });