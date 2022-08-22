export const getDateFormat = (date) => {
  return new Date(date).toLocaleDateString("fr-FR");
};

export const convertDateToDbFormat = (date) => {
  return date.split("/").reverse().join("-");
};
