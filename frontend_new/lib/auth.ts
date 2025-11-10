// Auth utilities for token management and user state

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  tokens?: number;
  credits?: number;
  planTier?: string;

  // Onboarding fields
  primaryInterest?: string;
  originCountry?: string;
  targetCulture?: string;
  employeeType?: string;
  educationLevel?: string;
  industry?: string;
  occupation?: string;
  yearsOfExperience?: string;
  hasCompletedOnboarding?: boolean;
}

// Token Management
export const saveToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

// User Management
export const saveUser = (user: User): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getUser = (): User | null => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
};

// Auth Status
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Logout
export const logout = async (): Promise<void> => {
  const token = getToken();

  if (token) {
    try {
      // Call backend logout endpoint
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // Clear local storage
  removeToken();

  // Redirect to login
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

// Fetch current user from backend
export const fetchCurrentUser = async (): Promise<User | null> => {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Token invalid or expired, clear it
      removeToken();
      return null;
    }

    const user = await response.json();
    saveUser(user);
    return user;
  } catch (error) {
    console.error("Fetch user error:", error);
    return null;
  }
};

// Get authorization header for API requests
export const getAuthHeader = (): { Authorization: string } | {} => {
  const token = getToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};
