import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("wtToken");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("wtToken", JSON.stringify(userToken));
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem("wtToken");
    setToken();
  };

  return {
    setToken: saveToken,
    removeToken,
    token,
  };
}
