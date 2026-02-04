import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth } from "./config.ts";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: name });
  }
  return userCredential.user;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};
export const logoutUser = async () => {
  await signOut(auth);
};

export const getCurrentUser = (): User | null => auth.currentUser;
