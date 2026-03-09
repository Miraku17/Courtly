import { create } from "zustand";

type Role = "PLAYER" | "VENUE_OWNER";

interface User {
  userId: string;
  email: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
