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
    <div className="rounded-3xl border border-pink-100 bg-white/85 p-6 shadow-sm backdrop-blur transition hover:border-pink-200 hover:shadow-md">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 h-1.5 w-12 rounded-full bg-pink-300" />

          <h2 className="text-lg font-semibold tracking-tight text-zinc-950">
            Lifecycle Stage Distribution
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Player distribution by lifecycle stage
          </p>
        </div>

        <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-zinc-600">
          Segmentation
        </span>
      </div>

      <div className="h-72 min-h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
          >
            <XAxis
              dataKey="stage"
              tick={{ fontSize: 12, fill: "#52525b" }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={60}
            />
            <YAxis
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
            <Bar dataKey="users" fill="#f9a8d4" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}