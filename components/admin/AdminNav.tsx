"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNav({ canManage }: { canManage: boolean }) {
	const path = usePathname();

	const links: { href: string; label: string }[] = [
		{ href: "/admin", label: "Overview" },
		...(canManage
			? [
					{ href: "/admin/publish", label: "Publish" },
					{ href: "/admin/users", label: "Users" },
					{ href: "/admin/activity", label: "Activity" },
				]
			: []),
		{ href: "/admin/account", label: "Account" },
	];

	const active = (href: string) =>
		href === "/admin" ? path === "/admin" : path.startsWith(href);

	return (
		<nav className="flex items-center gap-7">
			{links.map((l) => {
				const isActive = active(l.href);
				return (
					<Link key={l.href} href={l.href} className="group relative py-1.5">
						<span
							className={`uppercase tracking-[0.26em] text-[0.66rem] font-bold transition-colors ${
								isActive ? "text-accent-500" : "text-white/55 hover:text-white"
							}`}
						>
							{l.label}
						</span>
						<span
							className={`absolute -bottom-0.5 left-0 h-px bg-accent-500 transition-all duration-300 ${
								isActive ? "w-full" : "w-0 group-hover:w-full"
							}`}
						/>
					</Link>
				);
			})}
		</nav>
	);
}
