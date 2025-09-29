import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <header className="card header-gradient p-6 rounded-xl">
        <h1 className="text-2xl font-semibold text-blue-800">Unified Data Explorer</h1>
        <p className="text-gray-600 mt-1">Select a collection from the sidebar to view data.</p>
      </header>
      <section className="grid md:grid-cols-3 gap-4">
        {[
          { href: "/users", title: "Users" },
          { href: "/session_tracking", title: "Session Tracking" },
          { href: "/app_deployments", title: "App Deployments" },
        ].map((c) => (
          <Link key={c.href} href={c.href} className="card p-5 rounded-xl hover:shadow transition">
            <div className="text-blue-700 font-medium">{c.title}</div>
            <div className="text-gray-500 text-sm mt-1">View read-only data</div>
          </Link>
        ))}
      </section>
    </div>
  );
}
