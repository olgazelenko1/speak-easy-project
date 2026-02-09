import { useEffect, useState } from "react";
import type { Teacher } from "../../types/teacher";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./FavoritesPage.module.css";
import { useAuth } from "../../hooks/useAuth";
import { getTeachers } from "../../firebase/teachers";

const FavoritesPage = () => {
  const { favorites } = useAuth();
  const [favoriteTeachers, setFavoriteTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setFavoriteTeachers([]);
        setLoading(false);
        return;
      }

      try {
        const allTeachers = await getTeachers();
        const filtered = allTeachers.filter((teacher) => {
          const teacherId =
            teacher.id ||
            `${teacher.name}-${teacher.surname}-${teacher.lesson_info}`;
          return favorites.includes(teacherId);
        });
        setFavoriteTeachers(filtered);
      } catch (error) {
        console.error("Failed to fetch favorite teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  if (loading) return <p>Loading...</p>;

  if (favoriteTeachers.length === 0) {
    return (
      <div className={css.favoriteContainer}>
        <div className={css.mainContainer}>
          ❤️
          <p>You don’t have favorite teachers yet ❤️</p>
          <a href="/teachers" className={css.browseLink}>
            Browse Teachers
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={css.favoriteContainer}>
      <ul className={css.favoritesList}>
        {favoriteTeachers.map((teacher) => (
          <li
            key={
              teacher.id ||
              `${teacher.name}-${teacher.surname}-${teacher.lesson_info}`
            }
          >
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
