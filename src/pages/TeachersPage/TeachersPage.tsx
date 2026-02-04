import { useEffect, useState } from "react";
import type { Teacher } from "../../types/teacher";
import { getTeachers } from "../../firebase/teachers";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./TeacherPage.module.css";

const TeacherList = 4;

const TeachersPage = () => {
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [visibleCount, setVisibleCount] = useState(TeacherList);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await getTeachers();
      setAllTeachers(data);
      setLoading(false);
    };

    fetchTeachers();
  }, []);

  if (loading) return <p>Loading...</p>;

  const visibleTeachers = allTeachers.slice(0, visibleCount);

  return (
    <section className={css.teachers}>
      <ul className={css.teachersList}>
        {visibleTeachers.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>

      {visibleCount < allTeachers.length && (
        <button
          className={css.loadMore}
          onClick={() => setVisibleCount((prev) => prev + TeacherList)}
        >
          Load more
        </button>
      )}
    </section>
  );
};

export default TeachersPage;
