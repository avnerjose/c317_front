import clsx from "clsx";

interface SelectGroupProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  placeholder?: string;
  error?: string;
  children?: React.ReactNode;
  isSmall?: boolean;
}

export function SelectGroup({
  label,
  name,
  placeholder,
  error,
  children,
  className,
  isSmall = false,
  ...rest
}: SelectGroupProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-800">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={clsx(
          "block mt-3 px-6 py-4 border border-gray-200 relative rounded-lg text-gray-800  bg-transparent appearance-none bg-caret-up-down bg-no-repeat bg-[right_8px_top_50%] " +
            className,
          {
            "border-red-500 focus:outline-red-500": error,
            "focus:outline-green-500": !error,
            "w-[450px]": !isSmall,
            "w-full": isSmall,
          }
        )}
        {...rest}
      >
        <option disabled>{placeholder}</option>
        {children}
      </select>
      {error && <span className="text-sm text-red-500 mt-2">{error}</span>}
    </div>
  );
}
