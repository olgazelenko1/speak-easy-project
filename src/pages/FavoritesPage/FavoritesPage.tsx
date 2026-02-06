import { useEffect, useState } from "react";
import type { Teacher } from "../../types/teacher";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    };

    fetchFavorites();
  }, []);

  if (favorites.length === 0) {
    return (
      <div className={css.favoriteContainer}>
        <div className={css.mainContainer}>
          ❤️
          <p>You don’t have favorite teachers yet ❤️</p>
          <a href="/teachers" className={css.browseLink}>
            Teachers
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={css.favoriteContainer}>
      <ul className={css.favoritesList}>
        {favorites.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
