import { create } from "zustand";
import { setAccessToken, removeAccessToken } from "@/lib/cookies";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;

  //Actions
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,

  //Actions
  setAccessToken: (token: string) => set({ token, isAuthenticated: true }),
  removeAccessToken: () => set({ token: null, isAuthenticated: false }),
  login: (token: string) => {
    setAccessToken(token);
    set({ token, isAuthenticated: true });
  },

  logout: () => {
    removeAccessToken();
    set({ token: null, isAuthenticated: false });
    window.location.href = "/login";
  },
}));
