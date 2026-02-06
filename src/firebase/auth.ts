import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  type User,
  type UserCredential,
} from "firebase/auth";
import { auth } from "./config";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  const userCredential: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential.user;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<User> => {
  const userCredential: UserCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const subscribeToAuth = (callback: (user: User | null) => void) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    callback(user);
  });
  return unsubscribe;
};
