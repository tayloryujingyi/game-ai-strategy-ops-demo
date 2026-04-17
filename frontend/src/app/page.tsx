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

const lifecycleTypes = new Set(allUsers.map((user) => user.lifecycle_stage)).size;
const highChurnCount = allUsers.filter((user) => user.churn_risk_score >= 60).length;
const highLtvCount = allUsers.filter((user) => user.ltv_score >= 60).length;
const firstPurchaseCount = allUsers.filter(
  (user) => user.user_segment === "High Potential First Purchase"
).length;

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-slate-900">
            AI-Powered Player Lifecycle Strategy Platform
          </h1>
          <p className="mt-3 text-slate-600">
            A lightweight game operations dashboard prototype for lifecycle
            segmentation, churn analysis, conversion opportunity detection, and
            campaign strategy support.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-medium text-slate-500">
                Lifecycle Stages
              </h2>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {lifecycleTypes} Types
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Based on current lifecycle classification results
              </p>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-medium text-slate-500">
                High Churn Risk Users
              </h2>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {highChurnCount}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Users with churn_risk_score greater than or equal to 60
              </p>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-medium text-slate-500">
                High LTV Users
              </h2>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {highLtvCount}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Users with strong long-term value potential
              </p>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-medium text-slate-500">
                First Purchase Opportunities
              </h2>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {firstPurchaseCount}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                High-potential users for first purchase conversion
              </p>
            </section>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Project Scope
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>• Lifecycle stage classification</li>
                <li>• Churn risk / conversion / LTV scoring</li>
                <li>• Player profile lookup</li>
                <li>• Priority user list filtering</li>
                <li>• Segment-level campaign suggestions</li>
                <li>• Campaign list export</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Current Demo Coverage
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>• Real user search from exported JSON</li>
                <li>• Priority user list display</li>
                <li>• Campaign recommendation prototype</li>
                <li>• Dashboard metrics powered by actual scoring output</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}