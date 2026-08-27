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
            className={`rounded-3xl border border-[#dfe5df] bg-white shadow-[0_16px_50px_rgba(23,59,43,0.06)] ${paddingStyles[padding]} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}