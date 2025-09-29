import { fetchList } from "@/src/lib/api";
import DynamicTable from "@/src/components/DynamicTable";

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

export default async function AppDeploymentsPage() {
  const data = await fetchList<AppDeployment>("/api/app_deployments");
  return (
    <div className="space-y-4">
      <header className="card header-gradient p-5 rounded-xl">
        <h2 className="text-xl font-semibold text-blue-800">App Deployments</h2>
        <p className="text-gray-600 text-sm">Read-only view of deployment records.</p>
      </header>
      <DynamicTable items={data.items as any[]} />
    </div>
  );
}
