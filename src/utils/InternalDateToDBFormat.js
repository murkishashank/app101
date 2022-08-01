export const convertDateToDbFormat = (date) => {
  return date.split("/").reverse().join("-");
};
