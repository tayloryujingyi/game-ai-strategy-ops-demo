import Link from "next/link";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/profile", label: "Player Profile" },
  { href: "/priority-lists", label: "Priority Lists" },
  { href: "/campaign-suggestion", label: "Campaign Suggestion" },
];

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Game Strategy Ops Demo
          </h1>
          <p className="text-sm text-slate-500">
            AI-powered lifecycle operations prototype
          </p>
        </div>

        <nav className="flex gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}