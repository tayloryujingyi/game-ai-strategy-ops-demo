"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type LifecycleChartProps = {
  data: {
    stage: string;
    users: number;
  }[];
};

export default function LifecycleChart({ data }: LifecycleChartProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Lifecycle Stage Distribution
        </h2>
        <p className="text-sm text-gray-500">
          Player distribution by lifecycle stage
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="stage"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}