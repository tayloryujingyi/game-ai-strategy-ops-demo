console.log("\n========================================");
console.log("AI-Powered Player Lifecycle Strategy Platform");
console.log("========================================\n");

console.log("这是一个基于 Node.js 的游戏玩家生命周期运营原型系统，当前支持以下功能：\n");

console.log("1. 批量打分与分层");
console.log("   node src/processUsers.js");
console.log("   作用：读取 users.csv，生成 users_scored.csv\n");

console.log("2. 整体分布统计");
console.log("   node src/summary.js");
console.log("   作用：查看生命周期阶段、用户细分、推荐动作等整体分布\n");

console.log("3. 单用户画像查询");
console.log("   node src/profile.js U0015");
console.log("   作用：查看某个玩家的画像、分数和推荐动作\n");

console.log("4. 重点用户名单筛选");
console.log("   node src/topUsers.js");
console.log("   作用：查看高流失、高LTV、高转化用户 Top 名单\n");

console.log("5. 分群运营建议生成");
console.log('   node src/campaign.js "High Potential First Purchase"');
console.log("   作用：针对某个 user segment 生成运营目标、策略和示例文案\n");

console.log("推荐你先运行这几个命令体验：\n");
console.log("   node src/summary.js");
console.log("   node src/profile.js U0015");
console.log("   node src/topUsers.js");
console.log('   node src/campaign.js "High Potential First Purchase"\n');

console.log("========================================\n");