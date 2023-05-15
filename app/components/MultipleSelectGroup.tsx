import type { ClassNamesConfig } from "react-select";
import type { StateManagerProps } from "react-select/dist/declarations/src/stateManager";
import Select from "react-select";
import clsx from "clsx";

interface MultipleSelectGroupProps<T> extends StateManagerProps<T> {
  label: string;
  error?: string;
  append?: React.ReactNode;
}

const selectStyles: ClassNamesConfig = {
  group: () => "bg-gray-700",
  groupHeading: () => "bg-gray-700",
  placeholder: () => "text-gray-500",
  input: () => "px-6 py-3 caret-transparent",
  container: (state) =>
    clsx(
      "rounded-lg focus-within:outline focus-within:outline-green-500 w-full",
      {
        "bg-caret-up-down bg-no-repeat bg-[right_8px_top_50%]":
          !state.hasValue && state.selectProps.options.length > 0,
      }
    ),
  control: (state) =>
    clsx(
      "h-full border border-gray-200 rounded-lg text-gray-800 bg-transparent shadow-none",
      {
        "border-red-500 focus:outline-red-500": !!state.selectProps[
          "aria-errormessage"
        ],
      }
    ),
  multiValue: () => "bg-gray-200 text-gray-700",
  multiValueRemove: () => "hover:bg-red-200 hover:text-red-500",
  option: (state) =>
    clsx("hover:bg-gray-200", {
      "bg-gray-100": state.isFocused,
    }),
  dropdownIndicator: () => "hidden",
  indicatorSeparator: () => "hidden",
};

export function MultipleSelectGroup<T>({
  name,
  label,
  error,
  append: Append,
  ...rest
}: MultipleSelectGroupProps<T>) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-gray-800 mb-3">
        {label}
      </label>
      {Append ? (
        <>
          <div className="flex items-center gap-2">
            <Select
              id={name}
              classNames={selectStyles as any}
              isMulti
              aria-errormessage={error}
              {...rest}
            />
            {Append}
          </div>
        </>
      ) : (
        <Select
          id={name}
          classNames={selectStyles as any}
          isMulti
          aria-errormessage={error}
          {...rest}
        />
      )}
      {error && <span className="text-sm text-red-500 mt-2">{error}</span>}
    </div>
  );
}
