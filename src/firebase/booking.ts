import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "./config";

export interface TeacherPreview {
  name: string;
  surname: string;
  avatar_url: string;
}

export interface BookingData {
  name: string;
  email: string;
  phone_number: string;
  teacher: TeacherPreview;
  reason?: string;
}

const bookingUser = async ({
  name,
  email,
  phone_number,
  reason,
  teacher,
}: BookingData): Promise<void> => {
  try {
    const bookingRef = collection(firestore, "bookings");
    await addDoc(bookingRef, {
      name,
      email,
      phone_number,
      teacher,
      reason,
      booked_at: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error booking user:", error);
    throw new Error("Failed to book lesson");
  }
};

export default bookingUser;
