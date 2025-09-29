'use client';

import { useEffect, useState } from "react";
import { fetchList } from "@/lib/api";
import DynamicTable from "@/components/DynamicTable";

type AppDeployment = {
  _id: string;
  app_id?: string | null;
  app_url?: string | null;
  artifact_path?: string | null;
  branch_name?: string | null;
  build_path?: string | null;
  command?: string | null;
  created_at?: string | null;
  custom_domain?: string | null;
  deployment_id?: string | null;
  job_id?: string | null;
  message?: string | null;
  project_id?: string | null;
  project_name?: string | null;
  root_path?: string | null;
  status?: string | null;
  subdomain?: string | null;
  task_id?: string | null;
  tenant_id?: string | null;
  tenant_name?: string | null;
  updated_at?: string | null;
  artifact_count?: number | null;
  domain_status?: string | null;
  domain_checked_at?: string | null;
};

export default function AppDeploymentsPage() {
  const [items, setItems] = useState<AppDeployment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchList<AppDeployment>("/api/app_deployments");
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
        <h2 className="text-xl font-semibold text-blue-800">App Deployments</h2>
        <p className="text-gray-600 text-sm">Read-only view of deployment records.</p>
      </header>
      {loading && <div className="p-4 text-gray-500">Loading…</div>}
      {error && <div className="p-4 text-red-600">Error: {error}</div>}
      {!loading && !error && (
        <DynamicTable items={items as Array<Record<string, unknown>>} />
      )}
    </div>
  );
}
