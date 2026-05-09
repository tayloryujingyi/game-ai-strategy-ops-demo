type KpiCardProps = {
  title: string;
  value: string;
  description: string;
};

export default function KpiCard({ title, value, description }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-gray-900">{value}</p>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}