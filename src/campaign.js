const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const inputFilePath = path.join(__dirname, "..", "data", "users_scored.csv");
const targetSegment = process.argv[2];

if (!targetSegment) {
  console.log("请在命令后面输入一个 user_segment，例如：");
  console.log('node src/campaign.js "High Potential First Purchase"');
  process.exit(1);
}

const users = [];

function getCampaignTemplate(segment) {
  const templates = {
    "High Potential First Purchase": {
      goal: "推动首付转化",
      strategy: "给高活跃未付费用户推送轻量首购礼包和限时奖励，降低第一次付费门槛。",
      push: "限时首购礼包已上线，超值奖励等你领取，错过今天再等很久！",
      message: "这类用户活跃度较高，但尚未完成首付，适合使用低门槛礼包和限时福利促成第一次付费。",
    },
    "Churned Waiting Recall": {
      goal: "流失召回",
      strategy: "给沉默用户推送回流奖励、登录礼包和版本更新亮点，唤醒回归兴趣。",
      push: "老朋友回归礼已准备好！登录即可领取专属奖励，看看最近更新了什么吧。",
      message: "这类用户长期未登录，应优先通过低成本回流激励和新版本内容提醒进行召回。",
    },
    "High Value Stable Payer": {
      goal: "高价值用户维护",
      strategy: "提供专属福利、VIP权益、限时高价值活动，增强付费用户粘性与尊贵感。",
      push: "尊享专属福利已解锁，VIP限时活动开启，快来领取你的特别奖励。",
      message: "这类用户历史价值高，应重点维护，避免流失，同时提升其长期活跃和付费深度。",
    },
    "Highly Active Low Payer": {
      goal: "轻度付费提升",
      strategy: "针对高活跃但低付费用户，推荐小额高性价比礼包，逐步提升付费深度。",
      push: "热门超值礼包限时上架，轻松解锁更多资源，助你快速成长！",
      message: "这类用户活跃度高，适合通过低门槛、高性价比的付费内容逐步提升ARPPU。",
    },
    "New Highly Active User": {
      goal: "新用户成长引导",
      strategy: "通过新手任务、成长活动和活跃奖励，帮助用户快速建立留存习惯。",
      push: "新手成长奖励进行中，连续完成任务可领取超多资源，快来参加！",
      message: "这类用户刚注册但活跃度高，适合优先做成长引导和留存培养。",
    },
    "Recent Silent Risk": {
      goal: "流失预防",
      strategy: "对近期活跃下降用户进行轻量提醒，推送短周期奖励和低打扰活动。",
      push: "最近有新活动上线，轻松完成即可领奖，回来看看吧！",
      message: "这类用户还未完全流失，适合通过轻打扰方式提升回流和活跃。",
    },
    "General Active User": {
      goal: "持续观察与轻触达",
      strategy: "维持正常触达频率，结合日常活动与常规福利保持用户参与度。",
      push: "本周热门活动已开启，登录参与即可获得额外奖励！",
      message: "这类用户当前状态较稳定，不建议过度打扰，可维持常规运营节奏。",
    },
  };

  return (
    templates[segment] || {
      goal: "常规运营",
      strategy: "根据用户当前状态保持基础触达。",
      push: "本周活动已开启，欢迎上线体验新内容！",
      message: "当前没有为该细分用户配置专门模板，可先维持常规运营。",
    }
  );
}

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (row) => {
    users.push(row);
  })
  .on("end", () => {
    const matchedUsers = users.filter(
      (u) => u.user_segment.toLowerCase() === targetSegment.toLowerCase()
    );

    console.log("\n==============================");
    console.log(`运营活动建议：${targetSegment}`);
    console.log("==============================\n");

    if (matchedUsers.length === 0) {
      console.log("没有找到这个 user_segment 对应的用户。");
      return;
    }

    const template = getCampaignTemplate(targetSegment);

    console.log(`目标用户数: ${matchedUsers.length}`);
    console.log(`运营目标: ${template.goal}`);
    console.log(`推荐策略: ${template.strategy}`);
    console.log(`示例Push文案: ${template.push}`);
    console.log(`策略说明: ${template.message}`);

    console.log("\n--- 示例用户 ---");
    matchedUsers.slice(0, 5).forEach((user, index) => {
      console.log(
        `${index + 1}. ${user.user_id} | lifecycle: ${user.lifecycle_stage} | conversion: ${user.conversion_score} | ltv: ${user.ltv_score} | action: ${user.recommended_action}`
      );
    });

    console.log("\n==============================\n");
  })
  .on("error", (error) => {
    console.error("读取 users_scored.csv 失败：", error);
  });