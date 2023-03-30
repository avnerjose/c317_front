import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger";
}

export function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "py-5 rounded-lg font-bold transition-colors w-full " + className,
        {
          "bg-green-500 hover:bg-green-700  focus:outline-green-700 text-white":
            variant === "primary",
          "text-red-500 border border-red-500 hover:bg-red-200 focus:outline-red-500":
            variant === "danger",
        }
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
