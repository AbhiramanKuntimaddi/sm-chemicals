import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Role = "founder" | "admin" | "editor";

export interface Profile {
	id: string;
	email: string;
	role: Role;
	full_name: string | null;
}

// DEV BYPASS — when ADMIN_DEV=true the admin is open without Supabase auth.
// Local development only. Never set ADMIN_DEV in a production environment.
export const DEV_BYPASS = process.env.ADMIN_DEV === "true";

const DEV_PROFILE: Profile = {
	id: "dev",
	email: "dev@local",
	role: "founder",
	full_name: "Developer",
};

export async function getSessionUser() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
}

export async function getProfile(): Promise<Profile | null> {
	if (DEV_BYPASS) return DEV_PROFILE;
	const user = await getSessionUser();
	if (!user) return null;
	const supabase = await createClient();
	const { data } = await supabase
		.from("profiles")
		.select("id, email, role, full_name")
		.eq("id", user.id)
		.single();
	return (data as Profile) ?? null;
}

const ROLE_RANK: Record<Role, number> = { editor: 1, admin: 2, founder: 3 };

export async function requireRole(min: Role): Promise<Profile> {
	if (DEV_BYPASS) return DEV_PROFILE;
	const profile = await getProfile();
	if (!profile) redirect("/admin/login");
	if (ROLE_RANK[profile.role] < ROLE_RANK[min]) redirect("/admin");
	return profile;
}
