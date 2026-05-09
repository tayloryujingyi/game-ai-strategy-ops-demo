"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import usersScoredData from "@/lib/usersScored.json";

type RawUser = Record<string, unknown>;

type PlayerProfile = {
  userId: string;
  segment: string;
  lifecycleStage: string;
  churnRisk: number;
  ltvPotential: number;
  recommendedAction: string;
  lastLogin: string;
  sessions7d: number;
  avgSessionMinutes: number;
  mapsPlayed7d: number;
  socialInteractions7d: number;
  totalSpend: number;
  riskReasons: string[];
  strategy: string;
};

type CampaignQueueItem = {
  userId: string;
  segment: string;
  churnRisk: number;
  ltvPotential: number;
  recommendedAction: string;
  addedAt: string;
};

function getString(user: RawUser, keys: string[], fallback = "") {
  for (const key of keys) {
    const value = user[key];

    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return String(value);
    }
  }

  return fallback;
}

function getNumber(user: RawUser, keys: string[], fallback = 0) {
  for (const key of keys) {
    const value = user[key];

    if (value !== undefined && value !== null && value !== "") {
      const numberValue = Number(value);

      if (!Number.isNaN(numberValue)) {
        return numberValue;
      }
    }
  }

  return fallback;
}

function generateRiskReasons(player: {
  churnRisk: number;
  ltvPotential: number;
  sessions7d: number;
  avgSessionMinutes: number;
  mapsPlayed7d: number;
  socialInteractions7d: number;
  totalSpend: number;
}) {
  const reasons: string[] = [];

  if (player.churnRisk >= 70) {
    reasons.push("This player has a high churn risk score and should be prioritized for retention actions.");
  } else if (player.churnRisk >= 50) {
    reasons.push("This player shows moderate churn risk and should be monitored before becoming inactive.");
  } else {
    reasons.push("This player currently has a relatively stable activity pattern.");
  }

  if (player.sessions7d <= 3 || player.avgSessionMinutes <= 15) {
    reasons.push("Recent engagement is relatively low based on session frequency or average session duration.");
  } else {
    reasons.push("Recent play activity shows meaningful engagement with the game.");
  }

  if (player.totalSpend > 0 || player.ltvPotential >= 70) {
    reasons.push("Payment history or LTV potential suggests this user may have long-term operation value.");
  } else {
    reasons.push("The user has not shown strong payment behavior yet, so conversion guidance may be needed.");
  }

  if (player.socialInteractions7d <= 2) {
    reasons.push("Low social interaction may reduce retention, so social or team-based guidance can be considered.");
  }

  return reasons;
}

function generateStrategy(action: string) {
  if (action.includes("Recall")) {
    return "Send a return reward, limited-time event reminder, and personalized content recommendation to reactivate this player.";
  }

  if (action.includes("VIP")) {
    return "Provide exclusive rewards, early access benefits, and personalized care to maintain this high-value player.";
  }

  if (action.includes("First Purchase")) {
    return "Offer a low-barrier first-purchase package, starter coupon, or limited-time cosmetic bundle to improve conversion.";
  }

  if (action.includes("Retention")) {
    return "Use daily missions, event reminders, and personalized recommendations to prevent this user from becoming inactive.";
  }

  if (action.includes("New User")) {
    return "Guide this player through beginner missions, recommended maps, and social team-up features to build early habits.";
  }

  return "Apply a personalized LiveOps action based on this player's segment, churn risk, LTV potential, and recent behavior.";
}

function normalizePlayerProfiles(rawUsers: RawUser[]): PlayerProfile[] {
  return rawUsers.map((user, index) => {
    const userId = getString(
      user,
      ["userId", "user_id", "id", "uid"],
      `U${String(index + 1).padStart(3, "0")}`
    );

    const segment = getString(
      user,
      ["segment", "lifecycleStage", "lifecycle_stage", "player_segment"],
      "General Active User"
    );

    const lifecycleStage = getString(
      user,
      ["lifecycleStage", "lifecycle_stage", "stage"],
      segment
    );

    const churnRisk = getNumber(
      user,
      ["churnRisk", "churn_risk", "churn_risk_score", "churnRiskScore"],
      50
    );

    const ltvPotential = getNumber(
      user,
      ["ltvPotential", "ltv_potential", "ltv_potential_score", "ltvPotentialScore"],
      50
    );

    const recommendedAction = getString(
      user,
      ["recommendedAction", "recommended_action", "action"],
      churnRisk >= 70
        ? "Recall Campaign"
        : ltvPotential >= 75
        ? "VIP Maintenance"
        : "Retention Boost"
    );

    const sessions7d = getNumber(
      user,
      ["sessions7d", "sessions_7d", "session_7d", "login_days_7d"],
      0
    );

    const avgSessionMinutes = getNumber(
      user,
      ["avgSessionMinutes", "avg_session_minutes", "avg_session_duration"],
      0
    );

    const mapsPlayed7d = getNumber(
      user,
      ["mapsPlayed7d", "maps_played_7d", "games_played_7d", "rounds_7d"],
      0
    );

    const socialInteractions7d = getNumber(
      user,
      ["socialInteractions7d", "social_interactions_7d", "team_matches_7d", "friends_added_7d"],
      0
    );

    const totalSpend = getNumber(
      user,
      ["totalSpend", "total_spend", "pay_price", "spend", "payment_amount"],
      0
    );

    const playerBase = {
      churnRisk,
      ltvPotential,
      sessions7d,
      avgSessionMinutes,
      mapsPlayed7d,
      socialInteractions7d,
      totalSpend,
    };

    return {
      userId,
      segment,
      lifecycleStage,
      churnRisk,
      ltvPotential,
      recommendedAction,
      lastLogin: getString(user, ["lastLogin", "last_login", "days_since_last_login"], "N/A"),
      sessions7d,
      avgSessionMinutes,
      mapsPlayed7d,
      socialInteractions7d,
      totalSpend,
      riskReasons: generateRiskReasons(playerBase),
      strategy: generateStrategy(recommendedAction),
    };
  });
}

const playerProfiles = normalizePlayerProfiles(usersScoredData as RawUser[]);

export default function ProfilePage() {
  const [selectedUserId, setSelectedUserId] = useState(
    playerProfiles[0]?.userId || ""
  );
  const [campaignQueue, setCampaignQueue] = useState<CampaignQueueItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredPlayers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return playerProfiles.slice(0, 100);
    }

    return playerProfiles
      .filter((player) => {
        return (
          player.userId.toLowerCase().includes(query) ||
          player.segment.toLowerCase().includes(query) ||
          player.recommendedAction.toLowerCase().includes(query)
        );
      })
      .slice(0, 100);
  }, [searchQuery]);

  const isSelectedPlayerQueued = selectedPlayer
    ? campaignQueue.some((item) => item.userId === selectedPlayer.userId)
    : false;

  function addToCampaignQueue() {
    if (!selectedPlayer || isSelectedPlayerQueued) return;

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

  if (!selectedPlayer) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-50 to-white px-8 py-8">
          <div className="mx-auto max-w-7xl">
            <section className="rounded-3xl border border-pink-100 bg-white/85 p-6 shadow-sm">
              <h1 className="text-2xl font-semibold text-zinc-950">
                Player Profile
              </h1>
              <p className="mt-2 text-zinc-500">
                No player data found. Please check usersScored.json.
              </p>
            </section>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-50 to-white px-8 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Page Title */}
          <section className="mb-8 rounded-3xl border border-pink-100 bg-white/85 p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-zinc-950">
              Player Profile
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Single-player behavior profile, churn diagnosis, and recommended
              LiveOps action
            </p>
            <p className="mt-3 text-sm text-zinc-400">
              Loaded {playerProfiles.length} players from usersScored.json
            </p>
          </section>

          {/* User Selector */}
          <section className="mb-6 rounded-3xl border border-pink-100 bg-white/85 p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-800">
                  Select Player
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  Search by user ID, segment, or recommended action.
                </p>
              </div>

              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search user, segment, action..."
                className="w-full rounded-xl border border-pink-100 bg-white px-4 py-2 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 md:w-80"
              />
            </div>

            <div className="flex max-h-32 flex-wrap gap-3 overflow-y-auto rounded-2xl bg-pink-50/60 p-3">
              {filteredPlayers.map((player) => (
                <button
                  key={player.userId}
                  onClick={() => setSelectedUserId(player.userId)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    selectedUserId === player.userId
                      ? "bg-zinc-950 text-white"
                      : "bg-white text-zinc-700 hover:bg-pink-100"
                  }`}
                >
                  {player.userId}
                </button>
              ))}
            </div>
          </section>

          {/* Profile Overview */}
          <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-pink-100 bg-white/85 p-5 shadow-sm">
              <p className="text-sm text-zinc-500">User ID</p>
              <p className="mt-3 text-3xl font-semibold text-zinc-950">
                {selectedPlayer.userId}
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                {selectedPlayer.segment}
              </p>
            </div>

            <div className="rounded-3xl border border-pink-100 bg-white/85 p-5 shadow-sm">
              <p className="text-sm text-zinc-500">Churn Risk</p>
              <p className="mt-3 text-3xl font-semibold text-zinc-950">
                {selectedPlayer.churnRisk}
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Higher score means higher churn probability
              </p>
            </div>

            <div className="rounded-3xl border border-pink-100 bg-white/85 p-5 shadow-sm">
              <p className="text-sm text-zinc-500">LTV Potential</p>
              <p className="mt-3 text-3xl font-semibold text-zinc-950">
                {selectedPlayer.ltvPotential}
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Potential long-term user value
              </p>
            </div>

            <div className="rounded-3xl border border-pink-100 bg-white/85 p-5 shadow-sm">
              <p className="text-sm text-zinc-500">Recommended Action</p>
              <p className="mt-3 text-xl font-semibold text-zinc-950">
                {selectedPlayer.recommendedAction}
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Suggested operation strategy
              </p>
            </div>
          </section>

          {/* Behavior Metrics */}
          <section className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-pink-100 bg-white/85 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-950">
                Behavior Signals
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Recent player behavior used for segmentation and scoring
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-pink-50 p-4">
                  <p className="text-xs text-zinc-500">Last Login</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-950">
                    {selectedPlayer.lastLogin}
                  </p>
                </div>

                <div className="rounded-2xl bg-pink-50 p-4">
                  <p className="text-xs text-zinc-500">Sessions / 7d</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-950">
                    {selectedPlayer.sessions7d}
                  </p>
                </div>

                <div className="rounded-2xl bg-pink-50 p-4">
                  <p className="text-xs text-zinc-500">Avg. Session Minutes</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-950">
                    {selectedPlayer.avgSessionMinutes}
                  </p>
                </div>

                <div className="rounded-2xl bg-pink-50 p-4">
                  <p className="text-xs text-zinc-500">Maps Played / 7d</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-950">
                    {selectedPlayer.mapsPlayed7d}
                  </p>
                </div>

                <div className="rounded-2xl bg-pink-50 p-4">
                  <p className="text-xs text-zinc-500">Social Interactions</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-950">
                    {selectedPlayer.socialInteractions7d}
                  </p>
                </div>

                <div className="rounded-2xl bg-pink-50 p-4">
                  <p className="text-xs text-zinc-500">Total Spend</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-950">
                    ${selectedPlayer.totalSpend}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-pink-100 bg-white/85 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-950">
                Risk Diagnosis
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Key reasons behind this player's segment and operation priority
              </p>

              <div className="mt-5 space-y-3">
                {selectedPlayer.riskReasons.map((reason) => (
                  <div
                    key={reason}
                    className="rounded-2xl bg-pink-50 p-4 text-sm leading-6 text-zinc-700"
                  >
                    {reason}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Strategy Recommendation */}
          <section className="rounded-3xl border border-pink-100 bg-white/85 p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-950">
                  Strategy Recommendation
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Suggested campaign action based on lifecycle stage, churn
                  risk, LTV potential, and recent behavior
                </p>
              </div>

              <span className="rounded-full bg-pink-50 px-3 py-1 text-sm font-medium text-zinc-700 ring-1 ring-pink-100">
                {selectedPlayer.recommendedAction}
              </span>
            </div>

            <div className="rounded-2xl bg-pink-50 p-5">
              <p className="text-sm leading-6 text-zinc-700">
                {selectedPlayer.strategy}
              </p>
            </div>

            <button
              onClick={addToCampaignQueue}
              disabled={isSelectedPlayerQueued}
              className={`mt-5 rounded-xl px-4 py-2 text-sm font-medium transition ${
                isSelectedPlayerQueued
                  ? "cursor-not-allowed bg-zinc-100 text-zinc-400"
                  : "bg-pink-300 text-zinc-950 shadow-sm hover:bg-pink-400"
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