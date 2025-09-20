


import { createContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem("user") && localStorage.getItem("token")) {
        try {
          await authAPI.getProfile();
        } catch {
          setUser(null);
          localStorage.clear();
        }
      }
      setAuthChecked(true);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.clear();
  }, [user]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authAPI.login(credentials);
      localStorage.setItem("token", data.token);
      setUser({ email: credentials.email, token: data.token });
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      await authAPI.register(userData);
      return await login({ email: userData.email, password: userData.password });
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try { await authAPI.logout(); } catch {}
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, authChecked }}>
      {children}
    </AuthContext.Provider>
  );
};