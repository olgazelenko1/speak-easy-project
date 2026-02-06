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
  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favorites.some((t: Teacher) => t.id === teacher.id);
  });

  const getFavorites = (): Teacher[] =>
    JSON.parse(localStorage.getItem("favorites") || "[]");

  const toggleFavorite = () => {
    const favorites = getFavorites();

    let updatedFavorites: Teacher[];

    if (isFavorite) {
      updatedFavorites = favorites.filter((t) => t.id !== teacher.id);
    } else {
      updatedFavorites = [...favorites, teacher];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite((prev) => !prev);
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
        <div className={css.languagesContainer}>
          {" "}
          <h3 className={css.languages}>Languages</h3>{" "}
        </div>{" "}
        <svg className={css.starIcon} width="16" height="16">
          {" "}
          <use href="/public/pack.svg#book-open-01"></use>{" "}
        </svg>{" "}
        <p className={css.info}>Lessons online: {lessons_done}</p>{" "}
        <svg className={css.starIcon} width="1" height="16">
          {" "}
          <use href="/public/pack.svg#Vector5"></use>{" "}
        </svg>{" "}
        <p className={css.info}>Lessons done: {lessons_done}</p>{" "}
        <svg className={css.starIcon} width="1" height="16">
          {" "}
          <use href="/public/pack.svg#Vector5"></use>{" "}
        </svg>{" "}
        <div className={css.ratingContainer}>
          {" "}
          <img
            className={css.ratingIcon}
            src="/public/images/star.jpg"
            alt="Rating Icon"
          />{" "}
          <p className={css.info}>Rating: {rating}</p>{" "}
        </div>{" "}
        <svg className={css.starIcon} width="1" height="16">
          {" "}
          <use href="/public/pack.svg#Vector5"></use>{" "}
        </svg>{" "}
        <p className={css.info}>
          {" "}
          Price / 1 hour:{" "}
          <span className={css.infoPrice}>${price_per_hour}</span>{" "}
        </p>
        {/* FAVORITE */}
        <button
          className={`${css.favoriteButton} ${isFavorite ? css.favorited : ""}`}
          onClick={toggleFavorite}
          aria-label="Toggle favorite"
        >
          <svg width="26" height="26">
            <use href="/public/hurt.svg#Vector2" />
          </svg>
        </button>
      </div>

      {/* CARD */}
      <div className={css.teacherCard}>
        <div className={css.avatarContainer}>
          <img
            src={avatar_url}
            alt={`${name} ${surname}`}
            className={css.avatar}
          />
        </div>

        <div className={css.details}>
          <h2 className={css.teacherName}>
            {name} {surname}
          </h2>

          <p className={css.info}>
            <strong className={css.infoSpan}>Speaks:</strong>{" "}
            {languages.join(", ")}
          </p>

          <p className={css.info}>
            <strong className={css.infoSpan}>Lesson info:</strong> {lesson_info}
          </p>

          <p className={css.info}>
            <strong className={css.infoSpan}>Conditions:</strong>{" "}
            {conditions.join(", ")}
          </p>

          <p className={css.info}>
            <strong className={css.infoSpan}>Experience:</strong>{" "}
            {expanded ? experience : `${experience.slice(0, 80)}...`}
          </p>

          <button
            type="button"
            className={css.readMoreButton}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Read less" : "Read more"}
          </button>

          <div className={css.levels}>
            {levels.map((level) => (
              <span key={level} className={css.level}>
                {level}
              </span>
            ))}
          </div>

          {expanded && reviews.length > 0 && (
            <div className={css.expandedSection}>
              <ul className={css.reviewsList}>
                {reviews.map((review, index) => (
                  <li key={index} className={css.reviewItem}>
                    <p>
                      <strong>{review.reviewer_name}</strong>
                    </p>
                    <p>⭐ {review.reviewer_rating}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {expanded && (
            <Button
              type="button"
              className={css.bookLessonButton}
              onClick={() => setIsModalOpen(true)}
            >
              Book a lesson
            </Button>
          )}
        </div>
      </div>

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
