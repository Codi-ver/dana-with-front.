// hooks/useAuth.js
import { useState, useEffect, useCallback } from "react";

const TOKEN_KEY = "auth_token";

export const useAuth = () => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(false);

  // ذخیره توکن
  const saveToken = useCallback((newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  }, []);

  // حذف توکن (خروج)
  const removeToken = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  // بررسی معتبر بودن توکن
  const isAuthenticated = !!token;

  return {
    token,
    isAuthenticated,
    loading,
    saveToken,
    removeToken,
  };
};
