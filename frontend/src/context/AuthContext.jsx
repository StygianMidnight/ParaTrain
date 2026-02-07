import React, { createContext, useContext, useState, useEffect } from "react";

const AUTH_KEY = "paratrain_auth";
const USER_KEY = "paratrain_user";
const ROLE_KEY = "paratrain_role";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("User");
  const [role, setRole] = useState("patient"); // 'patient' | 'doctor'

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    const name = localStorage.getItem(USER_KEY);
    const r = localStorage.getItem(ROLE_KEY);
    if (stored === "true") setIsAuthenticated(true);
    if (name) setUser(name);
    if (r === "doctor" || r === "patient") setRole(r);
  }, []);

  const login = (username, password) => {
    const u = String(username).trim();
    const p = String(password).trim();
    // Patient: 123 / 123
    if (u === "123" && p === "123") {
      setIsAuthenticated(true);
      setUser(u);
      setRole("patient");
      localStorage.setItem(AUTH_KEY, "true");
      localStorage.setItem(USER_KEY, u);
      localStorage.setItem(ROLE_KEY, "patient");
      return true;
    }
    // Doctor: ABC / ABC
    if (u === "ABC" && p === "ABC") {
      setIsAuthenticated(true);
      setUser(u);
      setRole("doctor");
      localStorage.setItem(AUTH_KEY, "true");
      localStorage.setItem(USER_KEY, u);
      localStorage.setItem(ROLE_KEY, "doctor");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser("User");
    setRole("patient");
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ROLE_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, role }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
