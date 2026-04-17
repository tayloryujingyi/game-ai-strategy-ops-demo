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
  register_days: number;
  last_login_days_ago: number;
  login_days_7d: number;
  avg_session_minutes_7d: number;
  battles_7d: number;
  events_joined_30d: number;
  social_interactions_7d: number;
  total_payment: number;
  payment_count: number;
  last_payment_days_ago: number;
  first_payment_done: number;
  avg_payment_amount: number;
  vip_level: number;
  favorite_mode: string;
};

function getUserById(userId: string) {
  return (users as UserProfile[]).find(
    (user) => user.user_id.toUpperCase() === userId.trim().toUpperCase()
  );
}

export default function ProfilePage() {
  const [inputValue, setInputValue] = useState("U0015");
  const [searchedUserId, setSearchedUserId] = useState("U0015");

  const user = getUserById(searchedUserId);

  function handleSearch() {
    setSearchedUserId(inputValue);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold text-slate-900">Player Profile</h1>
          <p className="mt-3 text-slate-600">
            Inspect lifecycle stage, user segment, scoring results, and
            behavioral signals for an individual player.
          </p>

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <label className="block text-sm font-medium text-slate-700">
              Search by user_id
            </label>
            <div className="mt-3 flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter user_id, e.g. U0015"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
              />
              <button
                onClick={handleSearch}
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
              >
                Search
              </button>
            </div>
          </div>

          {!user ? (
            <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                User not found
              </h2>
              <p className="mt-3 text-slate-600">
                No player matched the user_id:{" "}
                <span className="font-medium text-slate-900">
                  {searchedUserId}
                </span>
              </p>
            </section>
          ) : (
            <>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <section className="rounded-2xl bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-medium text-slate-500">
                    Lifecycle Stage
                  </h2>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">
                    {user.lifecycle_stage}
                  </p>
                </section>

                <section className="rounded-2xl bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-medium text-slate-500">
                    User Segment
                  </h2>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">
                    {user.user_segment}
                  </p>
                </section>

                <section className="rounded-2xl bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-medium text-slate-500">
                    Recommended Action
                  </h2>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">
                    {user.recommended_action}
                  </p>
                </section>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <section className="rounded-2xl bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-medium text-slate-500">
                    Churn Risk Score
                  </h2>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">
                    {user.churn_risk_score}
                  </p>
                </section>

                <section className="rounded-2xl bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-medium text-slate-500">
                    Conversion Score
                  </h2>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">
                    {user.conversion_score}
                  </p>
                </section>

                <section className="rounded-2xl bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-medium text-slate-500">
                    LTV Score
                  </h2>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">
                    {user.ltv_score}
                  </p>
                </section>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <section className="rounded-2xl bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Behavioral Signals
                  </h2>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <p>register_days: {user.register_days}</p>
                    <p>last_login_days_ago: {user.last_login_days_ago}</p>
                    <p>login_days_7d: {user.login_days_7d}</p>
                    <p>
                      avg_session_minutes_7d:{" "}
                      {user.avg_session_minutes_7d}
                    </p>
                    <p>battles_7d: {user.battles_7d}</p>
                    <p>events_joined_30d: {user.events_joined_30d}</p>
                    <p>
                      social_interactions_7d: {user.social_interactions_7d}
                    </p>
                  </div>
                </section>

                <section className="rounded-2xl bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Payment Signals
                  </h2>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <p>total_payment: {user.total_payment}</p>
                    <p>payment_count: {user.payment_count}</p>
                    <p>
                      last_payment_days_ago: {user.last_payment_days_ago}
                    </p>
                    <p>first_payment_done: {user.first_payment_done}</p>
                    <p>avg_payment_amount: {user.avg_payment_amount}</p>
                    <p>vip_level: {user.vip_level}</p>
                    <p>favorite_mode: {user.favorite_mode}</p>
                  </div>
                </section>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}