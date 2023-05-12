import clsx from "clsx";
import InputMask from "react-input-mask";

interface InputMaskGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  error?: string;
  mask: string;
}

export function InputMaskGroup({
  label,
  name,
  placeholder,
  error,
  children,
  mask,
  ...rest
}: InputMaskGroupProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-800">
        {label}
      </label>
      <InputMask
        id={name}
        mask={mask}
        className={clsx(
          "mt-3 px-6 py-4 w-[450px] border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500",
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
