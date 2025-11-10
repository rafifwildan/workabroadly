"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, getToken, getUser, saveUser, removeToken, fetchCurrentUser as fetchUser } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    setIsLoading(true);
    const token = getToken();

    if (token) {
      // Try to get user from localStorage first
      const cachedUser = getUser();
      if (cachedUser) {
        setUser(cachedUser);
      }

      // Then fetch fresh user data from backend
      const freshUser = await fetchUser();
      if (freshUser) {
        setUser(freshUser);
      } else {
        // Token invalid, clear everything
        setUser(null);
      }
    }

    setIsLoading(false);
  };

  const login = async (token: string) => {
    // This function is called after successful OAuth callback
    // Token is already saved by the callback page
    const user = await fetchUser();
    if (user) {
      setUser(user);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  const refreshUser = async () => {
    const freshUser = await fetchUser();
    if (freshUser) {
      setUser(freshUser);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
