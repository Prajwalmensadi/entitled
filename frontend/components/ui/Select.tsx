import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className = "", ...props }: SelectProps) {
    return (
        <select
            className={`min-h-12 w-full rounded-xl border border-[#ccd5ce] bg-white px-4 text-base text-[#17201a] outline-none transition focus:border-[#2f7652] focus:ring-2 focus:ring-[#dcebe1] disabled:cursor-not-allowed disabled:bg-[#f2f4f2] disabled:opacity-70 ${className}`}
            {...props}
        />
    );
}