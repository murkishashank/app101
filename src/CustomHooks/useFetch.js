import { useCallback, useState } from "react";

// /**
//  * Returns the sum of a and b
//  * If set to true, the function will return an array
//  * @returns { {},  void} Sum of a and b or an array that contains a, b and the sum of a and b.
//  */
export const useFetch = () => {
  async function fetchUserData(userName) {
    const url = `http://localhost:8080/api/usersByUserName/${userName}`;
    const response = await fetch(url, { method: "GET" });
    console.log("name", response);
    return response.json();
  }

  return [fetchUserData];
};
