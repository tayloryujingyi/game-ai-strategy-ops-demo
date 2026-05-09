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
    <header className="sticky top-0 z-50 border-b border-pink-200/70 bg-pink-100/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-950">
            Game LiveOps Strategy Platform
          </h1>
          <p className="text-sm text-zinc-600">
            Player segmentation, risk scoring, and campaign recommendation
          </p>
        </div>

        <nav className="flex gap-2 rounded-2xl bg-white/60 p-1 shadow-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-zinc-950 shadow-sm"
                    : "text-zinc-700 hover:bg-pink-50 hover:text-zinc-950"
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