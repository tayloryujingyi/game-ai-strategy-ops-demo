"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const playerProfiles = [
  {
    userId: "U023",
    segment: "At-Risk User",
    lifecycleStage: "At-Risk User",
    churnRisk: 82,
    ltvPotential: 65,
    recommendedAction: "Recall Campaign",
    lastLogin: "9 days ago",
    sessions7d: 2,
    avgSessionMinutes: 12,
    mapsPlayed7d: 4,
    socialInteractions7d: 1,
    totalSpend: 18,
    riskReasons: [
      "Login frequency dropped sharply in the last 7 days.",
      "Social interaction is much lower than active users.",
      "Historical engagement suggests reactivation value.",
    ],
    strategy:
      "Send a limited-time return reward, recommend popular UGC maps, and trigger a reminder for the latest event.",
  },
  {
    userId: "U041",
    segment: "Core Paying User",
    lifecycleStage: "Core Paying User",
    churnRisk: 35,
    ltvPotential: 91,
    recommendedAction: "VIP Maintenance",
    lastLogin: "1 day ago",
    sessions7d: 18,
    avgSessionMinutes: 38,
    mapsPlayed7d: 25,
    socialInteractions7d: 12,
    totalSpend: 320,
    riskReasons: [
      "High payment history and stable recent activity.",
      "Strong social participation and content consumption.",
      "Should be maintained with VIP benefits instead of broad coupons.",
    ],
    strategy:
      "Provide exclusive rewards, early access content, and personalized VIP care to improve long-term retention.",
  },
  {
    userId: "U018",
    segment: "New Highly Active User",
    lifecycleStage: "New User",
    churnRisk: 20,
    ltvPotential: 48,
    recommendedAction: "New User Guide",
    lastLogin: "Today",
    sessions7d: 10,
    avgSessionMinutes: 24,
    mapsPlayed7d: 16,
    socialInteractions7d: 5,
    totalSpend: 0,
    riskReasons: [
      "Recently joined but already shows strong activity.",
      "Has not explored enough advanced features yet.",
      "Needs onboarding guidance to form long-term habits.",
    ],
    strategy:
      "Recommend beginner-friendly maps, guide the user to complete quests, and encourage social team-up behavior.",
  },
  {
    userId: "U066",
    segment: "Active Non-Paying User",
    lifecycleStage: "Active User",
    churnRisk: 44,
    ltvPotential: 70,
    recommendedAction: "First Purchase Offer",
    lastLogin: "2 days ago",
    sessions7d: 14,
    avgSessionMinutes: 31,
    mapsPlayed7d: 20,
    socialInteractions7d: 7,
    totalSpend: 0,
    riskReasons: [
      "High activity but no payment history.",
      "Strong content consumption indicates conversion potential.",
      "Low-price starter offer may reduce first-purchase barrier.",
    ],
    strategy:
      "Send a first-purchase coupon, recommend starter cosmetic bundle, and use limited-time offer messaging.",
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

export default function ProfilePage() {
  const [selectedUserId, setSelectedUserId] = useState(playerProfiles[0].userId);
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

  const selectedPlayer =
    playerProfiles.find((player) => player.userId === selectedUserId) ||
    playerProfiles[0];

  const isSelectedPlayerQueued = campaignQueue.some(
    (item) => item.userId === selectedPlayer.userId
  );

  function addToCampaignQueue() {
    if (isSelectedPlayerQueued) return;

    const newQueueItem: CampaignQueueItem = {
      userId: selectedPlayer.userId,
      segment: selectedPlayer.segment,
      churnRisk: selectedPlayer.churnRisk,
      ltvPotential: selectedPlayer.ltvPotential,
      recommendedAction: selectedPlayer.recommendedAction,
      addedAt: new Date().toLocaleString(),
    };

    const updatedQueue = [...campaignQueue, newQueueItem];

    setCampaignQueue(updatedQueue);
    window.localStorage.setItem("campaignQueue", JSON.stringify(updatedQueue));

    alert(`${selectedPlayer.userId} has been added to Campaign Queue.`);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white px-8 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Page Title */}
          <section className="mb-8 rounded-3xl border border-rose-100 bg-white/70 p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-900">
              Player Profile
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Single-player behavior profile, churn diagnosis, and recommended
              LiveOps action
            </p>
          </section>

          {/* User Selector */}
          <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="mb-3 text-sm font-medium text-gray-700">
              Select Player
            </p>

            <div className="flex flex-wrap gap-3">
              {playerProfiles.map((player) => (
                <button
                  key={player.userId}
                  onClick={() => setSelectedUserId(player.userId)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    selectedUserId === player.userId
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {player.userId}
                </button>
              ))}
            </div>
          </section>

          {/* Profile Overview */}
          <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">User ID</p>
              <p className="mt-3 text-3xl font-semibold text-gray-900">
                {selectedPlayer.userId}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {selectedPlayer.segment}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Churn Risk</p>
              <p className="mt-3 text-3xl font-semibold text-gray-900">
                {selectedPlayer.churnRisk}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Higher score means higher churn probability
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">LTV Potential</p>
              <p className="mt-3 text-3xl font-semibold text-gray-900">
                {selectedPlayer.ltvPotential}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Potential long-term user value
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Recommended Action</p>
              <p className="mt-3 text-xl font-semibold text-gray-900">
                {selectedPlayer.recommendedAction}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Suggested operation strategy
              </p>
            </div>
          </section>

          {/* Behavior Metrics */}
          <section className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Behavior Signals
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Recent player behavior used for segmentation and scoring
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Last Login</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {selectedPlayer.lastLogin}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Sessions / 7d</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {selectedPlayer.sessions7d}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Avg. Session Minutes</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {selectedPlayer.avgSessionMinutes}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Maps Played / 7d</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {selectedPlayer.mapsPlayed7d}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Social Interactions</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {selectedPlayer.socialInteractions7d}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Total Spend</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    ${selectedPlayer.totalSpend}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Risk Diagnosis
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Key reasons behind this player's segment and operation priority
              </p>

              <div className="mt-5 space-y-3">
                {selectedPlayer.riskReasons.map((reason) => (
                  <div
                    key={reason}
                    className="rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700"
                  >
                    {reason}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Strategy Recommendation */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Strategy Recommendation
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Suggested campaign action based on lifecycle stage, churn
                  risk, LTV potential, and recent behavior
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                {selectedPlayer.recommendedAction}
              </span>
            </div>

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-sm leading-6 text-gray-700">
                {selectedPlayer.strategy}
              </p>
            </div>

            <button
              onClick={addToCampaignQueue}
              disabled={isSelectedPlayerQueued}
              className={`mt-5 rounded-xl px-4 py-2 text-sm font-medium transition ${
                isSelectedPlayerQueued
                  ? "cursor-not-allowed bg-gray-200 text-gray-500"
                  : "bg-gray-900 text-white hover:bg-gray-700"
              }`}
            >
              {isSelectedPlayerQueued
                ? "Added to Campaign Queue"
                : "Add to Campaign Queue"}
            </button>
          </section>
        </div>
      </main>
    </>
  );
}