import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
    padding?: "none" | "sm" | "md" | "lg";
};

const paddingStyles = {
    none: "p-0",
    sm: "p-4",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8",
};

export function Card({
    padding = "md",
    className = "",
    children,
    ...props
}: CardProps) {
    return (
        <div
            className={`rounded-3xl border border-border bg-surface shadow-[0_20px_60px_rgba(38,58,46,0.08)] transition-shadow duration-200 ${paddingStyles[padding]} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}