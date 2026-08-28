import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className = "", ...props }: SelectProps) {
    return (
        <select
            className={`min-h-12 w-full rounded-xl border border-border bg-surface px-4 text-base text-foreground outline-none transition-all duration-200 focus:border-terracotta focus:ring-2 focus:ring-[#ead6cc] focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-sand disabled:opacity-70 ${className}`}
            {...props}
        />
    );
}