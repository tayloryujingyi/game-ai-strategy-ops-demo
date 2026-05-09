"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type StrategyOverviewProps = {
  data: {
    strategy: string;
    users: number;
  }[];
};

export default function StrategyOverview({ data }: StrategyOverviewProps) {
  return (
    <div className="rounded-3xl border border-pink-100 bg-white/85 p-6 shadow-sm backdrop-blur transition hover:border-pink-200 hover:shadow-md">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 h-1.5 w-12 rounded-full bg-pink-300" />

          <h2 className="text-lg font-semibold tracking-tight text-zinc-950">
            Strategy Recommendation Overview
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Recommended LiveOps actions by player segment
          </p>
        </div>

        <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-zinc-600">
          Action Output
        </span>
      </div>

      <div className="h-72 min-h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          >
            <XAxis
              type="number"
              tick={{ fontSize: 12, fill: "#52525b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              dataKey="strategy"
              type="category"
              width={155}
              tick={{ fontSize: 12, fill: "#52525b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "#fdf2f8" }}
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid #fbcfe8",
                backgroundColor: "rgba(255, 255, 255, 0.96)",
                color: "#18181b",
              }}
            />
            <Bar dataKey="users" fill="#fbcfe8" radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}