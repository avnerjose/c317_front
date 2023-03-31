import type { ZodError } from "zod";

type FormErrors<T> = {
  [Property in keyof T]: string | undefined;
};

type FormattedErrors<T> = {
  [Property in keyof T]: {
    _errors: string[];
  };
};

export const generateFormErrors = <T>(errors: ZodError<T>): FormErrors<T> => {
  const formattedErrors = errors.format() as FormattedErrors<T>;
  const formErrors = {} as FormErrors<T>;

  (Object.keys(formattedErrors) as (keyof typeof formattedErrors)[]).forEach(
    (key) => {
      if (key !== "_errors") {
        formErrors[key] = formattedErrors[key]._errors[0];
      }
    }
  );

  return formErrors;
};
