import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    loading?: boolean;
};

const baseStyles =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-olive-deep text-white shadow-sm hover:bg-olive active:bg-[#1d2d24]",
    secondary:
        "border border-border bg-surface text-olive-deep hover:bg-sand active:bg-[#ebe3d8]",
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
