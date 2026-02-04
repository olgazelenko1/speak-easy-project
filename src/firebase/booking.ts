import { firestore } from "./config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface BokkingData {
  name: string;
  email: string;
  phone_number: number;
}
const bookingUser = async ({
  name,
  email,
  phone_number,
}: BokkingData): Promise<void> => {
  try {
    const bokkingRef = collection(firestore, "bookings");
    await addDoc(bokkingRef, {
      name,
      email,
      phone_number,
      booked_at: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error booking user:", error);
    throw error;
  }
};
export default bookingUser;
