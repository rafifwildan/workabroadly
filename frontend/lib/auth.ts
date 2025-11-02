// File: frontend/lib/auth.ts
// Utility functions untuk authentication dan token management

export const AUTH_TOKEN_KEY = 'workabroadly_token';

/**
 * Simpan token ke localStorage
 * Dipanggil setelah user berhasil login
 */
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
};

/**
 * Ambil token dari localStorage
 * Returns token string atau null jika tidak ada
 */
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
};

/**
 * Hapus token dari localStorage (logout)
 */
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

/**
 * Check apakah user sudah login
 * Quick check tanpa verify token ke backend
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

/**
 * Get user info dari backend
 * Returns user data atau null jika token invalid
 */
export const getCurrentUser = async () => {
  const token = getAuthToken();
  
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Token invalid atau expired
      removeAuthToken();
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    removeAuthToken();
    return null;
  }
};

/**
 * Logout user
 * Memanggil backend logout endpoint dan menghapus token
 */
export const logout = async (): Promise<void> => {
  const token = getAuthToken();
  
  if (token) {
    try {
      // Call backend logout endpoint
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
  
  // Always remove token from localStorage
  removeAuthToken();
  
  // Remove token from cookie
  if (typeof document !== 'undefined') {
    document.cookie = 'workabroadly_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
  }
  
  // Redirect to login
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};
