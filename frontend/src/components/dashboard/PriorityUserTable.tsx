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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Priority User List
          </h2>
          <p className="text-sm text-gray-500">
            Users prioritized by churn risk, LTV potential, and recommended
            campaign action
          </p>
        </div>

        <button
          onClick={exportCampaignList}
          className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Export Campaign List
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">User ID</th>
              <th className="px-4 py-3 font-medium">Segment</th>
              <th className="px-4 py-3 font-medium">Churn Risk</th>
              <th className="px-4 py-3 font-medium">LTV Potential</th>
              <th className="px-4 py-3 font-medium">Recommended Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {user.userId}
                </td>

                <td className="px-4 py-3 text-gray-700">{user.segment}</td>

                <td className="px-4 py-3 text-gray-700">
                  <span
                    className={
                      user.churnRisk >= 70
                        ? "font-semibold text-red-600"
                        : "text-gray-700"
                    }
                  >
                    {user.churnRisk}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-700">
                  <span
                    className={
                      user.ltvPotential >= 75
                        ? "font-semibold text-green-600"
                        : "text-gray-700"
                    }
                  >
                    {user.ltvPotential}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
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