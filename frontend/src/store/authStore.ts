import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { User, authApi, RegisterData, LoginData } from '../lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  updatePreferences: (preferences: { selectedTheme?: string }) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

  login: async (data: LoginData) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await authApi.login(data);
          
          // Store token in localStorage
          localStorage.setItem('access_token', response.access_token);
          
          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: unknown) {
          // Narrow unknown error to get a helpful message
          const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message || 'Login failed' : 'Login failed';
          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
          });
          throw error;
        }
      },

  register: async (data: RegisterData) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await authApi.register(data);
          
          // Store token in localStorage
          localStorage.setItem('access_token', response.access_token);
          
          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: unknown) {
          const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message || 'Registration failed' : 'Registration failed';
          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      logout: () => {
        // Clear localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      loadUser: async () => {
        try {
          const token = localStorage.getItem('access_token');
          if (!token) {
            set({ isAuthenticated: false });
            return;
          }

          set({ isLoading: true });
          
          const user = await authApi.getProfile();
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message || 'Failed to update preferences' : 'Failed to update preferences';
          set({ error: errorMessage });

          // Token is invalid, clear everything
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      updatePreferences: async (preferences: { selectedTheme?: string }) => {
        try {
          const updatedUser = await authApi.updatePreferences(preferences);
          
          set({
            user: updatedUser,
          });
        } catch (error: unknown) {
          const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message || 'Failed to update preferences' : 'Failed to update preferences';
          set({ error: errorMessage });
          throw error;
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
