import { useState, type FC } from "react";
import type { Teacher } from "../../types/teacher";
import css from "./TeacherCard.module.css";
import Button from "../Ui/Button/Button";
import BookLessonsModal from "../BookModal/BookModal";

interface Props {
  teacher: Teacher;
}

const TeacherCard: FC<Props> = ({ teacher }) => {
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getFavorites = (): Teacher[] =>
    JSON.parse(localStorage.getItem("favorites") || "[]");

  const isFavorite = getFavorites().some((t) => t.id === teacher.id);

  const toggleFavorite = () => {
    const favorites = getFavorites();

    const updatedFavorites = isFavorite
      ? favorites.filter((t) => t.id !== teacher.id)
      : [...favorites, teacher];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const {
    name,
    surname,
    languages,
    levels,
    rating,
    price_per_hour,
    lessons_done,
    avatar_url,
    lesson_info,
    conditions,
    experience,
    reviews = [],
  } = teacher;

  return (
    <div className={css.teacherContainer}>
      <div className={css.teacherHeader}>
        <p className={css.info}>Lessons online: {lessons_done}</p>
        <p className={css.info}>Rating: {rating}</p>
        <p className={css.info}>Price / 1 hour: ${price_per_hour}</p>

        <button
          className={`${css.favoriteButton} ${isFavorite ? css.favorited : ""}`}
          onClick={toggleFavorite}
          aria-label="Toggle favorite"
        >
          ❤️
        </button>
      </div>

      <div className={css.teacherCard}>
        <div className={css.avatarContainer}>
          <img
            src={avatar_url}
            alt={`${name} ${surname}`}
            className={css.avatar}
          />
        </div>

        <div className={css.details}>
          <h2>
            {name} {surname}
          </h2>

          <p className={css.info}>
            <strong>Speaks:</strong> {languages.join(", ")}
          </p>

          <p className={css.info}>
            <strong>Lesson info:</strong> {lesson_info}
          </p>

          <p className={css.info}>
            <strong>Conditions:</strong> {conditions.join(" ")}
            <strong></strong>{" "}
            {expanded ? experience : `${experience.slice(0, 30)}...`}
          </p>

          <button
            type="button"
            className={css.readMoreButton}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Read less" : "Read more"}
          </button>

          <p className={css.info}>
            <strong>Levels:</strong> {levels.join(", ")}
          </p>

          {expanded && (
            <div className={css.expandedSection}>
              {reviews.length > 0 && (
                <div className={css.reviews}>
                  <h4 className={css.hidden}>Reviews</h4>

                  <ul className={css.reviewsList}>
                    {reviews.map((review, index) => (
                      <li key={index} className={css.review}>
                        <p className={css.info}>
                          <strong>{review.reviewer_name}</strong> ⭐️
                          {review.reviewer_rating}
                        </p>
                        <p>{review.comment}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Button to book a lesson */}

              <Button
                type="button"
                className={css.bookLessonButton}
                onClick={() => setIsModalOpen(true)}
              >
                Book a lesson
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* BookLessonsModal */}
      {isModalOpen && (
        <BookLessonsModal
          isOpen={isModalOpen}
          teacher={{ name, surname, avatar_url }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TeacherCard;
