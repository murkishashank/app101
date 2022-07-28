export const useFetch = () => {
  async function fetchUserData(userName) {
    const url = `http://localhost:8080/api/usersByUserName/${userName}`;
    const response = await fetch(url, { method: "GET" });
    return response.json();
  }

  return [fetchUserData];
};
