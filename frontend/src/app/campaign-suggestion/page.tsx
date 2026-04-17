import Navbar from "@/components/Navbar";

const segmentData = {
  "High Potential First Purchase": {
    goal: "Drive first purchase conversion",
    strategy:
      "Offer lightweight starter bundles and limited-time rewards to reduce the barrier to first purchase.",
    pushCopy:
      "Your starter reward pack is now available. Claim limited-time bonuses and unlock extra value today.",
    users: [
      {
        user_id: "U0023",
        lifecycle: "New User",
        conversion: 59,
        action: "First Purchase Conversion",
      },
      {
        user_id: "U0044",
        lifecycle: "New User",
        conversion: 66,
        action: "First Purchase Conversion",
      },
      {
        user_id: "U0066",
        lifecycle: "New User",
        conversion: 66,
        action: "First Purchase Conversion",
      },
      {
        user_id: "U0082",
        lifecycle: "New User",
        conversion: 66,
        action: "First Purchase Conversion",
      },
    ],
  },
  "Churned Waiting Recall": {
    goal: "Reactivate dormant players",
    strategy:
      "Push recall rewards, version highlights, and login bonuses to bring inactive players back into the game.",
    pushCopy:
      "Welcome back rewards are ready. Log in now to claim your return bonus and check out the latest update.",
    users: [
      {
        user_id: "U0008",
        lifecycle: "Dormant User",
        conversion: 0,
        action: "Recall Campaign",
      },
      {
        user_id: "U0009",
        lifecycle: "Dormant User",
        conversion: 0,
        action: "Recall Campaign",
      },
      {
        user_id: "U0014",
        lifecycle: "Dormant User",
        conversion: 0,
        action: "Recall Campaign",
      },
      {
        user_id: "U0019",
        lifecycle: "Dormant User",
        conversion: 0,
        action: "Recall Campaign",
      },
    ],
  },
  "High Value Stable Payer": {
    goal: "Maintain VIP engagement",
    strategy:
      "Provide exclusive benefits, premium event access, and VIP recognition to increase loyalty and retention.",
    pushCopy:
      "VIP-exclusive rewards are now unlocked. Join the latest premium event and claim your special benefits.",
    users: [
      {
        user_id: "U0022",
        lifecycle: "Core Paying User",
        conversion: 100,
        action: "VIP Maintenance",
      },
      {
        user_id: "U0058",
        lifecycle: "Core Paying User",
        conversion: 100,
        action: "VIP Maintenance",
      },
      {
        user_id: "U0077",
        lifecycle: "Core Paying User",
        conversion: 100,
        action: "VIP Maintenance",
      },
      {
        user_id: "U0015",
        lifecycle: "Core Paying User",
        conversion: 100,
        action: "VIP Maintenance",
      },
    ],
  },
};

const selectedSegment = "High Potential First Purchase";
const current = segmentData[selectedSegment as keyof typeof segmentData];

export default function CampaignSuggestionPage() {
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
            sample users.
          </p>

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <label className="block text-sm font-medium text-slate-700">
              Selected User Segment
            </label>
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
              {selectedSegment}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-medium text-slate-500">
                Campaign Goal
              </h2>
              <p className="mt-3 text-xl font-semibold text-slate-900">
                {current.goal}
              </p>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm xl:col-span-2">
              <h2 className="text-sm font-medium text-slate-500">
                Strategy Recommendation
              </h2>
              <p className="mt-3 text-base text-slate-700">{current.strategy}</p>
            </section>
          </div>

          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Example Push Copy
            </h2>
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              {current.pushCopy}
            </div>
          </section>

          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Sample Users</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500">
                    <th className="px-3 py-3">User ID</th>
                    <th className="px-3 py-3">Lifecycle</th>
                    <th className="px-3 py-3">Conversion Score</th>
                    <th className="px-3 py-3">Recommended Action</th>
                  </tr>
                </thead>
                <tbody>
                  {current.users.map((user) => (
                    <tr
                      key={user.user_id}
                      className="border-b border-slate-100 text-slate-700"
                    >
                      <td className="px-3 py-3 font-medium text-slate-900">
                        {user.user_id}
                      </td>
                      <td className="px-3 py-3">{user.lifecycle}</td>
                      <td className="px-3 py-3">{user.conversion}</td>
                      <td className="px-3 py-3">{user.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}