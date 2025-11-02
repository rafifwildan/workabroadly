// File: frontend/lib/api.ts
// API Client dengan automatic token injection untuk semua requests

import { getAuthToken, removeAuthToken } from './auth';

/**
 * API Client class untuk handle semua HTTP requests ke backend
 */
export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010';
  }

  /**
   * Generic fetch method dengan automatic auth header
   */
  private async fetchWithAuth(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const token = getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    } as Record<string, string>;
    
    // Add auth token jika ada
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });
    
    // Jika token invalid/expired, logout otomatis
    if (response.status === 401 || response.status === 403) {
      removeAuthToken();
      // Redirect ke login jika di browser
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return response;
  }

  /**
   * GET request
   * Example: await apiClient.get('/api/scenarios')
   */
  async get<T>(endpoint: string): Promise<T> {
    const response = await this.fetchWithAuth(endpoint);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * POST request
   * Example: await apiClient.post('/api/chat/send', { message: 'Hello' })
   */
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await this.fetchWithAuth(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * PUT request
   * Example: await apiClient.put('/api/profile', { name: 'New Name' })
   */
  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await this.fetchWithAuth(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * DELETE request
   * Example: await apiClient.delete('/api/scenarios/123')
   */
  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.fetchWithAuth(endpoint, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Example usage in components:
/*
import { apiClient } from '@/lib/api';

// In your component
const fetchScenarios = async () => {
  try {
    const scenarios = await apiClient.get('/api/scenarios');
    setScenarios(scenarios);
  } catch (error) {
    console.error('Error fetching scenarios:', error);
  }
};

const sendMessage = async (message: string) => {
  try {
    const response = await apiClient.post('/api/chat/send', { message });
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
*/
