import { Link } from "react-router-dom";
import css from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={css.heroSection}>
      <div className={css.heroRow}>
        <div className={css.heroCard}>
          <h1 className={css.title}>
            Unlock your potential with the best{" "}
            <span className={css.highlight}>language</span> tutors
          </h1>
          <p className={css.subtitle}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <Link className={css.button} to="/login">
            Get started
          </Link>
        </div>

        <div className={css.heroImageCard}></div>
      </div>

      <div className={css.infoCard}>
        <ul>
          <li>
            <h3>32,000 +</h3>
            <p>Experienced tutors</p>
          </li>
          <li>
            <h3>300,000 +</h3>
            <p>5-star tutor reviews</p>
          </li>
          <li>
            <h3>120 +</h3>
            <p>Subjects taught</p>
          </li>
          <li>
            <h3>200 +</h3>
            <p>Tutor nationalities</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Hero;
