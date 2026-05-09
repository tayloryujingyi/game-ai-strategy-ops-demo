"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/profile", label: "Player Profile" },
  { href: "/priority-lists", label: "Priority Lists" },
  { href: "/campaign-suggestion", label: "Campaign Suggestion" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Game LiveOps Strategy Platform
          </h1>
          <p className="text-sm text-slate-500">
            Player segmentation, risk scoring, and campaign recommendation
          </p>
        </div>

        <nav className="flex gap-2 rounded-2xl bg-slate-50 p-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}