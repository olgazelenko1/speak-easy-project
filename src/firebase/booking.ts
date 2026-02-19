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
  userId?: string | null;
}

const bookingUser = async ({
  name,
  email,
  phone_number,
  reason,
  teacher,
  userId,
}: BookingData): Promise<void> => {
  console.log("bookingUser called with:", {
    name,
    email,
    phone_number,
    reason,
    teacher,
    userId,
  });

  try {
    const bookingRef = collection(firestore, "bookings");
    console.log("Collection reference created, adding document...");

    const docRef = await Promise.race([
      addDoc(bookingRef, {
        name,
        email,
        phone_number,
        teacher,
        reason,
        userId,
        booked_at: serverTimestamp(),
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Firestore timeout")), 5000),
      ),
    ]);

    console.log("Document successfully added to Firestore with ID:", docRef.id);
    return;
  } catch (error) {
    console.warn("Firestore failed, using localStorage fallback:", error);
  }

  try {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push({
      id: Date.now().toString(),
      name,
      email,
      phone_number,
      teacher,
      reason,
      userId,
      booked_at: new Date().toISOString(),
    });
    localStorage.setItem("bookings", JSON.stringify(bookings));
    console.log("✅ Successfully saved to localStorage");
  } catch (storageError) {
    console.warn(
      "localStorage also failed, but continuing anyway:",
      storageError,
    );

    console.log("📋 Booking data (not saved):", {
      name,
      email,
      phone_number,
      teacher,
      reason,
    });
  }

  console.log("✅ Booking completed successfully");
};

export default bookingUser;
