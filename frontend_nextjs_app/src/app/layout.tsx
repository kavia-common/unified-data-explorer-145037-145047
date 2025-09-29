import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unified Data Explorer",
  description: "Dashboard for viewing MongoDB collections",
};

const collections = [
  { key: "users", label: "Users" },
  { key: "session_tracking", label: "Session Tracking" },
  { key: "app_deployments", label: "App Deployments" },
];

function Sidebar({ current }: { current?: string }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600/10 text-blue-700 shadow-sm">⛵</span>
        <span>Ocean Dashboard</span>
      </div>
      <nav className="py-2">
        {collections.map((c) => {
          const isActive = current === c.key;
          return (
            <Link
              key={c.key}
              href={`/${c.key}`}
              className={`navlink ${isActive ? "active" : ""}`}
            >
              {c.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  // We cannot detect current route here on server layout easily without hooks;
  // links will still show proper active state on client pages if desired.
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="app-shell">
          <Sidebar />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
