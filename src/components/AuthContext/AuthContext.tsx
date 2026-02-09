import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { updateProfile } from "firebase/auth";
import { subscribeToAuth, logoutUser } from "../../firebase/auth";
import {
  AuthContext,
  type AppUser,
} from "./AuthContextCreate";

export { AuthContext };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((firebaseUser) => {
      if (firebaseUser) {
        const stored = localStorage.getItem(`favorites-${firebaseUser.uid}`);
        const localFavorites: string[] = stored ? JSON.parse(stored) : [];
        setUser({ ...firebaseUser, favorites: localFavorites });
        setFavorites(localFavorites);
      } else {
        setUser(null);
        setFavorites([]);
      }
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setFavorites([]);
  };

  const addFavorite = (id: string) => {
    if (!user || favorites.includes(id)) return;
    const updated = [...favorites, id];
    setFavorites(updated);
    localStorage.setItem(`favorites-${user.uid}`, JSON.stringify(updated));
    setUser({ ...user, favorites: updated });
  };

  const removeFavorite = (id: string) => {
    if (!user) return;
    const updated = favorites.filter((fav) => fav !== id);
    setFavorites(updated);
    localStorage.setItem(`favorites-${user.uid}`, JSON.stringify(updated));
    setUser({ ...user, favorites: updated });
  };

  const updateUserProfile = async (data: {
    displayName?: string;
    photoURL?: string;
  }) => {
    if (!user) return;
    await updateProfile(user, data);
    setUser({ ...user, ...data });
  };

  const clearLocalFavorites = () => {
    if (!user) return;
    localStorage.removeItem(`favorites-${user.uid}`);
    setFavorites([]);
    setUser({ ...user, favorites: [] });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        favorites,
        logout,
        addFavorite,
        removeFavorite,
        updateUserProfile,
        clearLocalFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
