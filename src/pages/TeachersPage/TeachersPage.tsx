import { useEffect, useState } from "react";
import type { Teacher } from "../../types/teacher";
import { getTeachers } from "../../firebase/teachers";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./TeacherPage.module.css";
import { Button } from "../../components/Ui/Button/Button";
import { Link } from "react-router-dom";
import TeachersFilters from "../../components/FilterBar/FilterBar";

const TEACHERS_PER_PAGE = 4;

const TeachersPage = () => {
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [visibleCount, setVisibleCount] = useState(TEACHERS_PER_PAGE);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    languages: "All",
    levels: "All",
    price_per_hour: 0,
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        setAllTeachers(data);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    console.log("Filters updated:", filters);
  }, [filters]);

  const filterTeachers = (teachers: Teacher[]) => {
    return teachers.filter((teacher) => {
      const matchLanguage =
        filters.languages === "All" ||
        (Array.isArray(teacher.languages) &&
          teacher.languages.some(
            (lang) => lang.toLowerCase() === filters.languages.toLowerCase(),
          ));

      const matchLevel =
        filters.levels === "All" ||
        (Array.isArray(teacher.levels) &&
          teacher.levels.some(
            (lvl) => lvl.toLowerCase() === filters.levels.toLowerCase(),
          ));

      const matchPrice =
        !filters.price_per_hour ||
        teacher.price_per_hour <=
          parseFloat(filters.price_per_hour.toString() || "0");

      return matchLanguage && matchLevel && matchPrice;
    });
  };

  const filteredTeachers = filterTeachers(allTeachers);
  const visibleTeachers = filteredTeachers.slice(0, visibleCount);

  if (loading) return <p>Loading...</p>;

  return (
    <section className={css.teachers}>
      <div className={css.header}>
        <Link to="/favorites" className={css.favoritesLink}>
          View Favorites
        </Link>
        <Link to="/" className={css.homePage}>
          Home Page
        </Link>
      </div>

      <TeachersFilters
        filters={filters}
        onChange={(updatedFilters) =>
          setFilters((prev) => ({
            ...prev,
            ...updatedFilters,
            price_per_hour: updatedFilters.price_per_hour
              ? parseFloat(updatedFilters.price_per_hour.toString())
              : 0,
          }))
        }
      />

      <ul className={css.teachersList}>
        {visibleTeachers.length > 0 ? (
          visibleTeachers.map((teacher) => (
            <li key={teacher.id}>
              <TeacherCard teacher={teacher} />
            </li>
          ))
        ) : (
          <p>No teachers match your filters.</p>
        )}
      </ul>

      {visibleCount < filteredTeachers.length && (
        <Button
          className={css.loadMore}
          onClick={() => setVisibleCount((prev) => prev + TEACHERS_PER_PAGE)}
        >
          Load more
        </Button>
      )}
    </section>
  );
};

export default TeachersPage;
