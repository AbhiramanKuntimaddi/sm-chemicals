import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline";

type BaseProps = {
	variant?: Variant;
	className?: string;
	children: React.ReactNode;
};

const TEXT = "text-[12px] font-black uppercase tracking-[0.4em]";

function classes(variant: Variant, className?: string) {
	const base =
		"group relative inline-flex items-center justify-center gap-3 h-14 px-12 rounded-sm cursor-pointer transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed";
	if (variant === "outline")
		return cn(
			base,
			"border border-background-200 text-text-950 transition-colors hover:bg-text-950 hover:text-background-50",
			TEXT,
			className,
		);
	return cn(
		base,
		"overflow-hidden bg-text-950 text-background-50 hover:scale-[1.02]",
		className,
	);
}

function Inner({
	variant,
	children,
}: {
	variant: Variant;
	children: React.ReactNode;
}) {
	if (variant === "outline") return <>{children}</>;
	return (
		<>
			<span
				aria-hidden
				className="absolute inset-0 bg-background-500 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0"
			/>
			<span
				className={cn(
					"relative z-10 inline-flex items-center gap-3 transition-colors duration-500 group-hover:text-black",
					TEXT,
				)}
			>
				{children}
			</span>
		</>
	);
}

export function CtaButton({
	href,
	variant = "primary",
	className,
	children,
	...rest
}: BaseProps & { href: string } & React.ComponentProps<typeof Link>) {
	return (
		<Link href={href} className={classes(variant, className)} {...rest}>
			<Inner variant={variant}>{children}</Inner>
		</Link>
	);
}

export function CtaAnchor({
	variant = "primary",
	className,
	children,
	...rest
}: BaseProps & React.ComponentProps<"a">) {
	return (
		<a className={classes(variant, className)} {...rest}>
			<Inner variant={variant}>{children}</Inner>
		</a>
	);
}

export function CtaSubmit({
	variant = "primary",
	className,
	children,
	...rest
}: BaseProps & React.ComponentProps<"button">) {
	return (
		<button className={classes(variant, className)} {...rest}>
			<Inner variant={variant}>{children}</Inner>
		</button>
	);
}
