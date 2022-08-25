export const getUserNameById = (users, userId) => {
  const selectedUser = users.filter((record) => {
    return record.id === userId ? record : "";
  });
  return selectedUser[0]?.userName;
};

export const getIdByUserName = (users, userName) => {
  const selectedUser = users.filter((record) => {
    return record.userName === userName ? record : "";
  });
  return selectedUser[0]?.id;
};
