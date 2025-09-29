import { fetchList } from "@/src/lib/api";
import DynamicTable from "@/src/components/DynamicTable";

type SessionTracking = {
  _id: string;
  task_id?: string | null;
  tenant_id?: string | null;
  organization_name?: string | null;
  user_id?: string | null;
  User_name?: string | null;
  project_id?: string | null;
  container_id?: string | null;
  service_type?: string | null;
  session_start?: string | null;
  session_end?: string | null;
  status?: string | null;
  total_cost?: number | null;
  agent_costs?: any;
  cost_history?: Array<{
    timestamp?: string | null;
    agent_costs?: any;
    total_cost?: number | null;
  }> | null;
  last_updated?: string | null;
  session_data?: {
    llm_model?: string | null;
    session_name?: string | null;
    description?: string | null;
    platform?: string | null;
    selected_repos?: {
      all_repositories?: boolean | null;
      repositories?: string[] | null;
    } | null;
  } | null;
  created_at?: string | null;
};

export default async function SessionsPage() {
  const data = await fetchList<SessionTracking>("/api/session_tracking");
  return (
    <div className="space-y-4">
      <header className="card header-gradient p-5 rounded-xl">
        <h2 className="text-xl font-semibold text-blue-800">Session Tracking</h2>
        <p className="text-gray-600 text-sm">Read-only view of sessions with costs and metadata.</p>
      </header>
      <DynamicTable items={data.items as any[]} />
    </div>
  );
}
