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

const highChurnUsers = [...allUsers]
  .filter((user) => user.churn_risk_score >= 60)
  .sort((a, b) => b.churn_risk_score - a.churn_risk_score)
  .slice(0, 10);

const highLtvUsers = [...allUsers]
  .filter((user) => user.ltv_score >= 60)
  .sort((a, b) => b.ltv_score - a.ltv_score)
  .slice(0, 10);

const firstPurchaseUsers = [...allUsers]
  .filter((user) => user.user_segment === "High Potential First Purchase")
  .sort((a, b) => b.conversion_score - a.conversion_score)
  .slice(0, 10);

function UserTable({
  title,
  scoreLabel,
  scoreKey,
  users,
}: {
  title: string;
  scoreLabel: string;
  scoreKey: "churn_risk_score" | "ltv_score" | "conversion_score";
  users: UserProfile[];
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

      {users.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No matching users found.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="px-3 py-3">User ID</th>
                <th className="px-3 py-3">{scoreLabel}</th>
                <th className="px-3 py-3">Lifecycle</th>
                <th className="px-3 py-3">User Segment</th>
                <th className="px-3 py-3">Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.user_id}
                  className="border-b border-slate-100 text-slate-700"
                >
                  <td className="px-3 py-3 font-medium text-slate-900">
                    {user.user_id}
                  </td>
                  <td className="px-3 py-3">{user[scoreKey]}</td>
                  <td className="px-3 py-3">{user.lifecycle_stage}</td>
                  <td className="px-3 py-3">{user.user_segment}</td>
                  <td className="px-3 py-3">{user.recommended_action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function PriorityListsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-slate-900">Priority Lists</h1>
          <p className="mt-3 text-slate-600">
            Review high-priority users for recall, VIP maintenance, and
            first-purchase conversion based on actual scoring results.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6">
            <UserTable
              title="High Churn Risk Users"
              scoreLabel="Churn Risk Score"
              scoreKey="churn_risk_score"
              users={highChurnUsers}
            />

            <UserTable
              title="High LTV Users"
              scoreLabel="LTV Score"
              scoreKey="ltv_score"
              users={highLtvUsers}
            />

            <UserTable
              title="High Potential First Purchase Users"
              scoreLabel="Conversion Score"
              scoreKey="conversion_score"
              users={firstPurchaseUsers}
            />
          </div>
        </div>
      </main>
    </>
  );
}