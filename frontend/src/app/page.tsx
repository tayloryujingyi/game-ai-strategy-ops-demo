import Navbar from "@/components/Navbar";
import KpiCard from "@/components/dashboard/KpiCard";
import LifecycleChart from "@/components/dashboard/LifecycleChart";
import StrategyOverview from "@/components/dashboard/StrategyOverview";
import PriorityUserTable from "@/components/dashboard/PriorityUserTable";

import {
  kpiData,
  lifecycleStageData,
  strategyData,
  priorityUsers,
} from "@/lib/dashboardData";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white px-8 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Page Title */}
          <section className="mb-8 rounded-3xl border border-rose-100 bg-white/70 p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-900">
              Game LiveOps Strategy Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              AI-powered player lifecycle segmentation and campaign strategy
              recommendation
            </p>
          </section>

          {/* KPI Cards */}
          <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((item) => (
              <KpiCard
                key={item.title}
                title={item.title}
                value={item.value}
                description={item.description}
              />
            ))}
          </section>

          {/* Charts */}
          <section className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <LifecycleChart data={lifecycleStageData} />
            <StrategyOverview data={strategyData} />
          </section>

          {/* Priority User Table */}
          <section>
            <PriorityUserTable users={priorityUsers} />
          </section>
        </div>
      </main>
    </>
  );
}