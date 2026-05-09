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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Strategy Recommendation Overview
        </h2>
        <p className="text-sm text-gray-500">
          Recommended LiveOps actions by player segment
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis
              dataKey="strategy"
              type="category"
              width={150}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="users" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}