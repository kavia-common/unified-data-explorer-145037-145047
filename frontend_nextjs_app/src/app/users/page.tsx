'use client';

import { useEffect, useState } from "react";
import { fetchList } from "@/lib/api";
import DynamicTable from "@/components/DynamicTable";

type User = {
  _id: string;
  referral_code?: string | null;
  referral_stats?: {
    total_referrals?: number | null;
    verified_referrals?: number | null;
    last_referral_date?: string | null;
  } | null;
  referral_history?: Array<{
    user_id?: string | null;
    user_email?: string | null;
    user_name?: string | null;
    referred_at?: string | null;
    verified_at?: string | null;
    status?: string | null;
  }> | null;
};

export default function UsersPage() {
  const [items, setItems] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchList<User>("/api/users");
        if (!cancelled) {
          setItems(data.items);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4">
      <header className="card header-gradient p-5 rounded-xl">
        <h2 className="text-xl font-semibold text-blue-800">Users</h2>
        <p className="text-gray-600 text-sm">Read-only view of users and referral activity.</p>
      </header>
      {loading && <div className="p-4 text-gray-500">Loading…</div>}
      {error && <div className="p-4 text-red-600">Error: {error}</div>}
      {!loading && !error && (
        <DynamicTable items={items as Array<Record<string, unknown>>} />
      )}
    </div>
  );
}
