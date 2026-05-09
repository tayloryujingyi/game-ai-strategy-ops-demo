"use client";

type PriorityUser = {
  userId: string;
  segment: string;
  churnRisk: number;
  ltvPotential: number;
  recommendedAction: string;
};

type PriorityUserTableProps = {
  users: PriorityUser[];
};

function escapeCsvValue(value: string | number) {
  const stringValue = String(value);

  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

export default function PriorityUserTable({ users }: PriorityUserTableProps) {
  function exportCampaignList() {
    const headers = [
      "User ID",
      "Segment",
      "Churn Risk",
      "LTV Potential",
      "Recommended Action",
    ];

    const rows = users.map((user) => [
      user.userId,
      user.segment,
      user.churnRisk,
      user.ltvPotential,
      user.recommendedAction,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCsvValue).join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "priority-campaign-list.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-3xl border border-pink-100 bg-white/85 p-6 shadow-sm backdrop-blur transition hover:border-pink-200 hover:shadow-md">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <div className="mb-3 h-1.5 w-12 rounded-full bg-pink-300" />

          <h2 className="text-lg font-semibold tracking-tight text-zinc-950">
            Priority User List
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Users prioritized by churn risk, LTV potential, and recommended
            campaign action
          </p>
        </div>

        <button
          onClick={exportCampaignList}
          className="rounded-xl bg-pink-300 px-4 py-2 text-sm font-medium text-zinc-950 shadow-sm transition hover:bg-pink-400"
        >
          Export Campaign List
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-pink-100 bg-white/75">
        <table className="w-full text-left text-sm">
          <thead className="bg-pink-50 text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">User ID</th>
              <th className="px-4 py-3 font-medium">Segment</th>
              <th className="px-4 py-3 font-medium">Churn Risk</th>
              <th className="px-4 py-3 font-medium">LTV Potential</th>
              <th className="px-4 py-3 font-medium">Recommended Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-pink-100">
            {users.map((user) => (
              <tr key={user.userId} className="transition hover:bg-pink-50/60">
                <td className="px-4 py-3 font-semibold text-zinc-950">
                  {user.userId}
                </td>

                <td className="px-4 py-3 text-zinc-700">{user.segment}</td>

                <td className="px-4 py-3">
                  <span
                    className={
                      user.churnRisk >= 70
                        ? "font-semibold text-zinc-950"
                        : "text-zinc-700"
                    }
                  >
                    {user.churnRisk}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={
                      user.ltvPotential >= 75
                        ? "font-semibold text-zinc-950"
                        : "text-zinc-700"
                    }
                  >
                    {user.ltvPotential}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-zinc-700 ring-1 ring-pink-100">
                    {user.recommendedAction}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}