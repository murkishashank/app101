export const useFetch = () => {
  async function fetchUserData(userName) {
    const url = `/api/usersByUserName/${userName}`;
    const response = await fetch(url, { method: "GET" });
    return response.json();
  }

  return [fetchUserData];
};
