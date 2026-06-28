import { createClient } from "@/lib/supabase/server";
import { DEV_BYPASS, type Role } from "@/lib/auth";

export interface Member {
	id: string;
	email: string;
	full_name: string | null;
	role: Role;
	created_at: string;
}

const DEV_MEMBERS: Member[] = [
	{
		id: "dev",
		email: "dev@local",
		full_name: "Developer",
		role: "founder",
		created_at: new Date().toISOString(),
	},
	{
		id: "sample-admin",
		email: "admin@smchemicals.co.in",
		full_name: "Site Admin",
		role: "admin",
		created_at: new Date().toISOString(),
	},
	{
		id: "sample-editor",
		email: "editor@smchemicals.co.in",
		full_name: "Content Editor",
		role: "editor",
		created_at: new Date().toISOString(),
	},
];

export async function getProfiles(): Promise<Member[]> {
	if (DEV_BYPASS) return DEV_MEMBERS;
	const supabase = await createClient();
	const { data } = await supabase
		.from("profiles")
		.select("id, email, full_name, role, created_at")
		.order("created_at", { ascending: true });
	return (data as Member[]) ?? [];
}
