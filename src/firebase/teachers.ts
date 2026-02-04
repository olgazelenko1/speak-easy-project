import { get, ref } from "firebase/database";
import { db } from "./config";
import type { Teacher } from "../types/teacher";

type TeacherFromDB = Omit<Teacher, "id">;

export const getTeachers = async (): Promise<Teacher[]> => {
  try {
    const snapshot = await get(ref(db, "teachers"));
    if (!snapshot.exists()) return [];

    const data: Record<string, TeacherFromDB> = snapshot.val();

    return Object.entries(data).map(([id, t]) => ({
      id,
      name: t.name,
      surname: t.surname,
      avatar_url: t.avatar_url,
      price_per_hour: t.price_per_hour,
      rating: t.rating,
      lessons_done: t.lessons_done,
      lesson_info: t.lesson_info,
      experience: t.experience,
      languages: t.languages || [],
      levels: t.levels || [],
      conditions: t.conditions || [],
      reviews: t.reviews || [],
    }));
  } catch (error) {
    console.error("Failed to fetch teachers:", error);
    return [];
  }
};
