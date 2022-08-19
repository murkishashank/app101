export const getSavePayload = (financialRecords) => {
  return financialRecords.map((record) => {
    const { firstName, lastName, id, designation, ...rest } = record;
    return { ...rest };
  });
};
