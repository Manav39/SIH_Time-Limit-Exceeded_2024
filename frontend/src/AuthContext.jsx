import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isDC, setIsDC] = useState(false);
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      setIsAdmin(true);
      setIsLoggedIn(true);
    } else if (role === "user") {
      setIsUser(false);
      setIsLoggedIn(true);
    } else if (role === "department_coordinator") {
      setIsDC(true);
      setIsLoggedIn(true);
    } else {
      setIsAdmin(false);
      setIsLoggedIn(false);
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{ isAdmin, isLoggedIn, login, logout, isUser, isDC }}
    >
      {children}
    </AuthContext.Provider>
  );
};
