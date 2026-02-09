import { createContext } from "react";
import type { User } from "firebase/auth";

export interface AppUser extends User {
  favorites: string[];
}

export interface AuthContextType {
  user: AppUser | null;
  favorites: string[];
  logout: () => Promise<void>;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  updateUserProfile: (data: {
    displayName?: string;
    photoURL?: string;
  }) => Promise<void>;
  clearLocalFavorites: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
