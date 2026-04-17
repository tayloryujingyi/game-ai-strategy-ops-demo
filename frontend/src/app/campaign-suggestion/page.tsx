"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import users from "@/lib/usersScored.json";

type UserProfile = {
  user_id: string;
  lifecycle_stage: string;
  user_segment: string;
  recommended_action: string;
  churn_risk_score: number;
  conversion_score: number;
  ltv_score: number;
};

const allUsers = users as UserProfile[];

const segmentTemplates: Record<
  string,
  {
    goal: string;
    strategy: string;
    pushCopy: string;
  }
> = {
  "High Potential First Purchase": {
    goal: "Drive first purchase conversion",
    strategy:
      "Offer lightweight starter bundles and limited-time rewards to reduce the barrier to first purchase.",
    pushCopy:
      "Your starter reward pack is now available. Claim limited-time bonuses and unlock extra value today.",
  },
  "Churned Waiting Recall": {
    goal: "Reactivate dormant players",
    strategy:
      "Push recall rewards, version highlights, and login bonuses to bring inactive players back into the game.",
    pushCopy:
      "Welcome back rewards are ready. Log in now to claim your return bonus and check out the latest update.",
  },
  "High Value Stable Payer": {
    goal: "Maintain VIP engagement",
    strategy:
      "Provide exclusive benefits, premium event access, and VIP recognition to increase loyalty and retention.",
    pushCopy:
      "VIP-exclusive rewards are now unlocked. Join the latest premium event and claim your special benefits.",
  },
  "Highly Active Low Payer": {
    goal: "Increase light upsell conversion",
    strategy:
      "Recommend small-value bundles and time-limited offers to highly active users with low payment depth.",
    pushCopy:
      "A popular value pack is now live. Unlock more resources with a limited-time offer built for active players.",
  },
  "New Highly Active User": {
    goal: "Accelerate early retention",
    strategy:
      "Use early growth missions, onboarding rewards, and milestone incentives to build strong return habits.",
    pushCopy:
      "Your growth rewards are waiting. Complete new-user missions today and unlock extra bonuses.",
  },
  "Recent Silent Risk": {
    goal: "Prevent near-term churn",
    strategy:
      "Use low-friction reminders, short-cycle rewards, and lightweight activity prompts to recover activity.",
    pushCopy:
      "A new activity is now available. Jump back in now and claim a quick reward with minimal effort.",
  },
  "General Active User": {
    goal: "Maintain stable engagement",
    strategy:
      "Keep a steady cadence of regular content, event reminders, and non-intrusive incentives.",
    pushCopy:
      "This week’s featured activity is live. Log in and join to collect additional rewards.",
  },
  "New Low Activity User": {
    goal: "Improve onboarding activation",
    strategy:
      "Focus on simpler onboarding tasks, starter guidance, and low-pressure incentives to increase engagement.",
    pushCopy:
      "Need a boost? New-user support rewards are now available to help you get started faster.",
  },
};

const segmentOptions = Array.from(
  new Set(allUsers.map((user) => user.user_segment))
).sort();

const defaultSegment =
  segmentOptions.find(
    (segment) => segment === "High Potential First Purchase"
  ) || segmentOptions[0];

export default function CampaignSuggestionPage() {
  const [selectedSegment, setSelectedSegment] = useState(defaultSegment);

  const currentTemplate =
    segmentTemplates[selectedSegment] || {
      goal: "Maintain core engagement",
      strategy:
        "Use standard lifecycle-aligned messaging and regular event prompts for this segment.",
      pushCopy:
        "A new in-game event is now available. Log in to explore the latest content and rewards.",
    };

  const matchedUsers = allUsers
    .filter((user) => user.user_segment === selectedSegment)
    .sort((a, b) => b.conversion_score - a.conversion_score)
    .slice(0, 10);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-slate-900">
            Campaign Suggestion
          </h1>
          <p className="mt-3 text-slate-600">
            Review segment-level campaign goals, strategy recommendations, and
            sample users based on actual scoring results.
          </p>

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <label className="block text-sm font-medium text-slate-700">
              Selected User Segment
            </label>
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
            >
              {segmentOptions.map((segment) => (
                <option key={segment} value={segment}>
                  {segment}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-medium text-slate-500">
                Campaign Goal
              </h2>
              <p className="mt-3 text-xl font-semibold text-slate-900">
                {currentTemplate.goal}
              </p>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-medium text-slate-500">
                Matched Users
              </h2>
              <p className="mt-3 text-xl font-semibold text-slate-900">
                {matchedUsers.length}
              </p>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-medium text-slate-500">
                Primary Action
              </h2>
              <p className="mt-3 text-xl font-semibold text-slate-900">
                {matchedUsers[0]?.recommended_action || "No action available"}
              </p>
            </section>
          </div>

          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Strategy Recommendation
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              {currentTemplate.strategy}
            </p>
          </section>

          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Example Push Copy
            </h2>
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              {currentTemplate.pushCopy}
            </div>
          </section>

          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Sample Users
            </h2>

            {matchedUsers.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">
                No users found for this segment.
              </p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-500">
                      <th className="px-3 py-3">User ID</th>
                      <th className="px-3 py-3">Lifecycle</th>
                      <th className="px-3 py-3">Conversion Score</th>
                      <th className="px-3 py-3">LTV Score</th>
                      <th className="px-3 py-3">Recommended Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchedUsers.map((user) => (
                      <tr
                        key={user.user_id}
                        className="border-b border-slate-100 text-slate-700"
                      >
                        <td className="px-3 py-3 font-medium text-slate-900">
                          {user.user_id}
                        </td>
                        <td className="px-3 py-3">{user.lifecycle_stage}</td>
                        <td className="px-3 py-3">{user.conversion_score}</td>
                        <td className="px-3 py-3">{user.ltv_score}</td>
                        <td className="px-3 py-3">
                          {user.recommended_action}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}