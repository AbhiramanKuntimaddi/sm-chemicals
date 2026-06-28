"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/auth";

export interface AccountState {
	error?: string;
	success?: string;
}

const ProfileSchema = z.object({
	full_name: z.string().trim().max(120),
});

export async function updateProfile(
	_prev: AccountState,
	formData: FormData,
): Promise<AccountState> {
	const profile = await getProfile();
	if (!profile) return { error: "Not signed in." };

	const parsed = ProfileSchema.safeParse({
		full_name: formData.get("full_name"),
	});
	if (!parsed.success) return { error: "Please enter a valid name." };

	const supabase = await createClient();
	const { error } = await supabase
		.from("profiles")
		.update({ full_name: parsed.data.full_name || null, updated_at: new Date().toISOString() })
		.eq("id", profile.id);

	if (error) return { error: "Could not update your name." };
	revalidatePath("/admin/account");
	return { success: "Name updated." };
}

const PasswordSchema = z
	.object({
		password: z.string().min(8, "Use at least 8 characters.").max(200),
		confirm: z.string(),
	})
	.refine((d) => d.password === d.confirm, {
		message: "Passwords do not match.",
		path: ["confirm"],
	});

export async function updatePassword(
	_prev: AccountState,
	formData: FormData,
): Promise<AccountState> {
	const profile = await getProfile();
	if (!profile) return { error: "Not signed in." };

	const parsed = PasswordSchema.safeParse({
		password: formData.get("password"),
		confirm: formData.get("confirm"),
	});
	if (!parsed.success) {
		return { error: parsed.error.issues[0]?.message ?? "Invalid password." };
	}

	const supabase = await createClient();
	const { error } = await supabase.auth.updateUser({
		password: parsed.data.password,
	});
	if (error) return { error: error.message };
	return { success: "Password changed." };
}
