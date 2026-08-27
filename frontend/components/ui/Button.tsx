import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    loading?: boolean;
};

const baseStyles =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7652] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-[#173b2b] text-white hover:bg-[#24543d] active:bg-[#102a1f]",
    secondary:
        "border border-[#d5dbd6] bg-white text-[#173b2b] hover:bg-[#f2f5f2] active:bg-[#e9eee9]",
};

export function Button({
    variant = "primary",
    loading = false,
    disabled,
    children,
    type = "button",
    ...props
}: ButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            disabled={isDisabled}
            aria-busy={loading || undefined}
            className={`${baseStyles} ${variantStyles[variant]}`}
            {...props}
        >
            {loading ? (
                <>
                    <span
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
                    />
                    <span>Loading…</span>
                </>
            ) : (
                children
            )}
        </button>
    );
}