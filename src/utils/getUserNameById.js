export const getUserNameById = (users, userId) => {
  const selectedUser = users.filter((record) => {
    if (record.id === userId) {
      return record;
    }
  });
  return selectedUser[0]?.userName;
};

export const getIdByUserName = (users, userName) => {
  const selectedUser = users.filter((record) => {
    if (record.userName === userName) {
      return record;
    }
  });
  return selectedUser[0]?.id;
};
