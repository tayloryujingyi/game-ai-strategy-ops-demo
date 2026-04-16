const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { createObjectCsvWriter } = require("csv-writer");

const inputFilePath = path.join(__dirname, "..", "data", "users_scored.csv");
const targetSegment = process.argv[2];

if (!targetSegment) {
  console.log("请在命令后面输入一个 user_segment，例如：");
  console.log('node src/exportCampaignList.js "High Potential First Purchase"');
  process.exit(1);
}

const users = [];

function formatFileName(segment) {
  return segment
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (row) => {
    users.push(row);
  })
  .on("end", async () => {
    const matchedUsers = users.filter(
      (u) => u.user_segment.toLowerCase() === targetSegment.toLowerCase()
    );

    if (matchedUsers.length === 0) {
      console.log("没有找到这个 user_segment 对应的用户。");
      return;
    }

    const fileName = `${formatFileName(targetSegment)}_list.csv`;
    const outputFilePath = path.join(__dirname, "..", "data", fileName);

    const csvWriter = createObjectCsvWriter({
      path: outputFilePath,
      header: [
        { id: "user_id", title: "user_id" },
        { id: "lifecycle_stage", title: "lifecycle_stage" },
        { id: "user_segment", title: "user_segment" },
        { id: "recommended_action", title: "recommended_action" },
        { id: "churn_risk_score", title: "churn_risk_score" },
        { id: "conversion_score", title: "conversion_score" },
        { id: "ltv_score", title: "ltv_score" },
        { id: "register_days", title: "register_days" },
        { id: "last_login_days_ago", title: "last_login_days_ago" },
        { id: "login_days_7d", title: "login_days_7d" },
        { id: "total_payment", title: "total_payment" },
        { id: "payment_count", title: "payment_count" },
        { id: "favorite_mode", title: "favorite_mode" },
        { id: "device_type", title: "device_type" },
        { id: "region", title: "region" },
        { id: "vip_level", title: "vip_level" },
      ],
    });

    await csvWriter.writeRecords(matchedUsers);

    console.log(`已导出 ${matchedUsers.length} 个用户到: data/${fileName}`);
  })
  .on("error", (error) => {
    console.error("读取 users_scored.csv 失败：", error);
  });