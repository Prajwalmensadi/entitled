import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;
export function Input({ className = "", ...props }: InputProps) {
    return (
        <input
            className={`min-h-12 w-full rounded-xl border border-border bg-surface px-4 text-base text-foreground outline-none transition-all duration-200 placeholder:text-muted-light focus:border-terracotta focus:ring-2 focus:ring-[#ead6cc] focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-sand disabled:opacity-70 ${className}`}
            {...props}
        />
    );
  }
  