import clsx from "clsx";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  error?: string;
}

export function InputGroup({
  label,
  name,
  placeholder,
  error,
  children,
  ...rest
}: InputGroupProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-800">
        {label}
      </label>
      <input
        id={name}
        className={clsx(
          "mt-3 px-6 py-4 w-[450px] border border-gray-200 rounded-lg  text-gray-800 placeholder-gray-500",
          {
            "border-red-500 focus:outline-red-500": error,
            "focus:outline-green-500": !error,
          }
        )}
        name={name}
        placeholder={placeholder}
        {...rest}
      />
      {error && <span className="text-sm text-red-500 mt-2">{error}</span>}
    </div>
  );
}
