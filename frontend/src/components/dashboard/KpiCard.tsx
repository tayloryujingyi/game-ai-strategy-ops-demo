type KpiCardProps = {
  title: string;
  value: string;
  description: string;
};

export default function KpiCard({ title, value, description }: KpiCardProps) {
  return (
    <div className="group rounded-3xl border border-pink-100 bg-white/85 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-md">
      <div className="mb-4 h-1.5 w-12 rounded-full bg-pink-300" />

      <p className="text-sm font-medium text-zinc-700">{title}</p>

      <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
        {value}
      </p>

      <p className="mt-2 text-sm leading-5 text-zinc-500">{description}</p>
    </div>
  );
}