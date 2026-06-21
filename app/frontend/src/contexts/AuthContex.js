import { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
