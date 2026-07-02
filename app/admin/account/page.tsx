import { requireStaff } from "@/lib/auth";
import { AccountForms } from "./AccountForms";

export const metadata = { title: "Account" };

export default async function AccountPage() {
	const profile = await requireStaff();

	return (
		<div className="mx-auto max-w-2xl px-6 py-16 md:px-10 md:py-20">
			<div className="mb-12">
				<div className="mb-5 flex items-center gap-3">
					<span className="h-px w-7 bg-accent-500" />
					<span className="uppercase tracking-[0.5em] text-accent-500 text-[0.6rem] font-black">
						Account
					</span>
				</div>
				<h1 className="text-white text-5xl font-bold tracking-tighter leading-[0.9]">
					Your account
				</h1>
				<p className="mt-5 text-white/45 text-sm font-light tracking-wide">
					{profile.email}
					<span className="mx-2 text-white/20">/</span>
					<span className="uppercase tracking-[0.2em] text-accent-500 text-xs font-bold">
						{profile.role}
					</span>
				</p>
			</div>

			<AccountForms fullName={profile.full_name ?? ""} />
		</div>
	);
}
