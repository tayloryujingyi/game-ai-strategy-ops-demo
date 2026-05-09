import Navbar from "@/components/Navbar";
import PriorityUserTable from "@/components/dashboard/PriorityUserTable";
import { priorityUsers } from "@/lib/dashboardData";

const prioritySegments = [
  {
    title: "High Churn Risk Users",
    value: "28",
    description: "Users with churn risk score ≥ 60",
    action: "Recall Campaign",
  },
  {
    title: "High LTV Users",
    value: "19",
    description: "Users with LTV potential score ≥ 75",
    action: "VIP Maintenance",
  },
  {
    title: "High Potential First Purchase Users",
    value: "4",
    description: "High activity users with no payment history",
    action: "First Purchase Offer",
  },
];

const actionPlans = [
  {
    title: "Recall Campaign",
    target: "At-Risk / Dormant Users",
    description:
      "Send return rewards, limited-time event reminders, and personalized content recommendations to reactivate users.",
  },
  {
    title: "VIP Maintenance",
    target: "Core Paying Users",
    description:
      "Provide exclusive rewards, early access benefits, and personalized retention care for high-value users.",
  },
  {
    title: "First Purchase Offer",
    target: "Active Non-Paying Users",
    description:
      "Use starter bundles, first-purchase coupons, and low-barrier payment incentives to improve conversion.",
  },
];

export default function PriorityListsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-8 py-6">
        <div className="mx-auto max-w-7xl">
          {/* Page Title */}
          <section className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Priority User Lists
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Prioritized player groups for campaign execution and LiveOps
              decision-making
            </p>
          </section>

          {/* Priority Segment Cards */}
          <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {prioritySegments.map((segment) => (
              <div
                key={segment.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-gray-500">{segment.title}</p>
                <p className="mt-3 text-3xl font-semibold text-gray-900">
                  {segment.value}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {segment.description}
                </p>

                <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3">
                  <p className="text-xs text-gray-500">Recommended Action</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {segment.action}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Campaign Execution Queue */}
          <section className="mb-6">
            <PriorityUserTable users={priorityUsers} />
          </section>

          {/* Action Plan Cards */}
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {actionPlans.map((plan) => (
              <div
                key={plan.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {plan.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">{plan.target}</p>
                </div>

                <p className="text-sm leading-6 text-gray-600">
                  {plan.description}
                </p>

                <button className="mt-5 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
                  Generate Campaign Brief
                </button>
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}