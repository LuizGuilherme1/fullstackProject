import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  function login(token) {
    localStorage.setItem("token", token);
    setAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem("token");
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{ authenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}