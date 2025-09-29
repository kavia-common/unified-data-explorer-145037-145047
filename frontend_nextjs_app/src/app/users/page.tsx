import { fetchList } from "@/src/lib/api";
import DynamicTable from "@/src/components/DynamicTable";

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

export default async function UsersPage() {
  const data = await fetchList<User>("/api/users");
  return (
    <div className="space-y-4">
      <header className="card header-gradient p-5 rounded-xl">
        <h2 className="text-xl font-semibold text-blue-800">Users</h2>
        <p className="text-gray-600 text-sm">Read-only view of users and referral activity.</p>
      </header>
      <DynamicTable items={data.items as any[]} />
    </div>
  );
}
