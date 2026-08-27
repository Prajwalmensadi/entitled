import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
    return (
        <input
            className={`min-h-12 w-full rounded-xl border border-[#ccd5ce] bg-white px-4 text-base text-[#17201a] outline-none transition placeholder:text-[#a0a8a2] focus:border-[#2f7652] focus:ring-2 focus:ring-[#dcebe1] disabled:cursor-not-allowed disabled:bg-[#f2f4f2] disabled:opacity-70 ${className}`}
            {...props}
        />
    );
}