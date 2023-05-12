export const convertToPhoneNumberFormat = (number: string) => {
  const regex = new RegExp("(\\d{2})(\\d{5})(\\d{4})");
  return number.replace(regex, "($1) $2-$3");
};
