"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const campaignSuggestions = [
  {
    strategy: "Recall Campaign",
    targetSegment: "At-Risk / Dormant Users",
    userCount: 28,
    goal: "Reactivate users with high churn risk and recent inactivity.",
    trigger:
      "Churn risk score ≥ 60, days since last login ≥ 7, and historical activity above average.",
    incentive:
      "Limited-time return reward, free customization item, and event participation bonus.",
    message:
      "We noticed you have not joined the latest party event. Come back now to claim a limited-time reward package.",
    successMetrics: ["Return rate", "7-day retention", "Event participation"],
  },
  {
    strategy: "First Purchase Conversion",
    targetSegment: "Active Non-Paying Users",
    userCount: 4,
    goal: "Convert highly active non-paying users into first-time payers.",
    trigger:
      "High sessions in the last 7 days, strong map participation, but no payment history.",
    incentive:
      "Starter bundle, first-purchase coupon, and low-price cosmetic package.",
    message:
      "Unlock your first exclusive look with a beginner-only offer available for a limited time.",
    successMetrics: ["First purchase rate", "ARPPU", "Coupon redemption"],
  },
  {
    strategy: "VIP Maintenance",
    targetSegment: "Core Paying Users",
    userCount: 19,
    goal: "Improve long-term retention and satisfaction of high-value users.",
    trigger:
      "LTV potential score ≥ 75, recent payment activity, and stable engagement.",
    incentive:
      "VIP badge, early access to new content, and personalized reward package.",
    message:
      "Thank you for being one of our core players. Enjoy exclusive rewards prepared for you.",
    successMetrics: ["30-day retention", "Repeat purchase", "VIP engagement"],
  },
  {
    strategy: "Retention Boost",
    targetSegment: "Active Users With Declining Engagement",
    userCount: 16,
    goal: "Prevent active users from moving into churn-risk status.",
    trigger:
      "Recent activity decline, lower session frequency, or reduced social interaction.",
    incentive:
      "Daily mission rewards, friend-team bonus, and personalized UGC map recommendation.",
    message:
      "New challenges are waiting for you. Complete today’s mission and unlock extra rewards.",
    successMetrics: [
      "Session frequency",
      "Mission completion",
      "Social play rate",
    ],
  },
  {
    strategy: "New User Guide",
    targetSegment: "New Highly Active Users",
    userCount: 18,
    goal: "Guide new users toward stable engagement and early habit formation.",
    trigger:
      "Newly registered users with high activity but limited feature exploration.",
    incentive:
      "Beginner questline, map recommendation, and social team-up guidance.",
    message:
      "Start your journey with a beginner guide and discover the most popular maps this week.",
    successMetrics: ["Day-1 retention", "Day-3 retention", "Feature adoption"],
  },
];

type CampaignQueueItem = {
  userId: string;
  segment: string;
  churnRisk: number;
  ltvPotential: number;
  recommendedAction: string;
  addedAt: string;
};

export default function CampaignSuggestionPage() {
  const [campaignQueue, setCampaignQueue] = useState<CampaignQueueItem[]>([]);

  useEffect(() => {
    const savedQueue = window.localStorage.getItem("campaignQueue");

    if (savedQueue) {
      try {
        const parsedQueue = JSON.parse(savedQueue);

        if (Array.isArray(parsedQueue)) {
          setCampaignQueue(parsedQueue);
        }
      } catch {
        setCampaignQueue([]);
      }
    }
  }, []);

  function removeFromQueue(userId: string) {
    const updatedQueue = campaignQueue.filter((item) => item.userId !== userId);

    setCampaignQueue(updatedQueue);
    window.localStorage.setItem("campaignQueue", JSON.stringify(updatedQueue));
  }

  function clearQueue() {
    setCampaignQueue([]);
    window.localStorage.removeItem("campaignQueue");
  }

  function exportQueueCsv() {
    if (campaignQueue.length === 0) return;

    const headers = [
      "User ID",
      "Segment",
      "Churn Risk",
      "LTV Potential",
      "Recommended Action",
      "Added At",
    ];

    const rows = campaignQueue.map((item) => [
      item.userId,
      item.segment,
      item.churnRisk,
      item.ltvPotential,
      item.recommendedAction,
      item.addedAt,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "campaign-execution-queue.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  function copyBrief(strategy: string) {
    const campaign = campaignSuggestions.find(
      (item) => item.strategy === strategy
    );

    if (!campaign) return;

    const brief = `
Campaign Strategy: ${campaign.strategy}
Target Segment: ${campaign.targetSegment}
User Count: ${campaign.userCount}

Goal:
${campaign.goal}

Trigger Logic:
${campaign.trigger}

Recommended Incentive:
${campaign.incentive}

Suggested Message:
${campaign.message}

Success Metrics:
${campaign.successMetrics.join(", ")}
`;

    navigator.clipboard.writeText(brief);
    alert("Campaign brief copied!");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-8 py-6">
        <div className="mx-auto max-w-7xl">
          {/* Page Title */}
          <section className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Campaign Suggestion
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              AI-assisted LiveOps campaign ideas based on player segmentation,
              churn risk, and LTV potential
            </p>
          </section>

          {/* Campaign Execution Queue */}
          <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Campaign Execution Queue
                </h2>
                <p className="text-sm text-gray-500">
                  Players added from Player Profile for campaign execution
                </p>
              </div>

              {campaignQueue.length > 0 && (
                <div className="flex gap-3">
                  <button
                    onClick={exportQueueCsv}
                    className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                  >
                    Export Queue CSV
                  </button>

                  <button
                    onClick={clearQueue}
                    className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Clear Queue
                  </button>
                </div>
              )}
            </div>

            {campaignQueue.length === 0 ? (
              <div className="rounded-xl bg-gray-50 p-5 text-sm text-gray-500">
                No players added yet. Go to Player Profile and click Add to
                Campaign Queue.
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">User ID</th>
                      <th className="px-4 py-3 font-medium">Segment</th>
                      <th className="px-4 py-3 font-medium">Churn Risk</th>
                      <th className="px-4 py-3 font-medium">LTV Potential</th>
                      <th className="px-4 py-3 font-medium">
                        Recommended Action
                      </th>
                      <th className="px-4 py-3 font-medium">Added At</th>
                      <th className="px-4 py-3 font-medium">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {campaignQueue.map((item) => (
                      <tr key={item.userId} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {item.userId}
                        </td>

                        <td className="px-4 py-3 text-gray-700">
                          {item.segment}
                        </td>

                        <td className="px-4 py-3 text-gray-700">
                          {item.churnRisk}
                        </td>

                        <td className="px-4 py-3 text-gray-700">
                          {item.ltvPotential}
                        </td>

                        <td className="px-4 py-3">
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            {item.recommendedAction}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-gray-500">
                          {item.addedAt}
                        </td>

                        <td className="px-4 py-3">
                          <button
                            onClick={() => removeFromQueue(item.userId)}
                            className="text-sm font-medium text-gray-500 hover:text-gray-900"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Campaign Suggestion Cards */}
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {campaignSuggestions.map((campaign) => (
              <div
                key={campaign.strategy}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {campaign.strategy}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {campaign.targetSegment}
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                    {campaign.userCount} users
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Campaign Goal
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-700">
                      {campaign.goal}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Trigger Logic
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-700">
                      {campaign.trigger}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Recommended Incentive
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-700">
                      {campaign.incentive}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Suggested Message
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-700">
                      {campaign.message}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                      Success Metrics
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {campaign.successMetrics.map((metric) => (
                        <span
                          key={metric}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => copyBrief(campaign.strategy)}
                  className="mt-6 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Copy Campaign Brief
                </button>
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}