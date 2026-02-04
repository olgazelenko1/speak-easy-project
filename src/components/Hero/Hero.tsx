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
          <p className={css.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <Link className={css.button} to="/login">
            Get started
          </Link>
        </div>

        <div className={css.heroImageCard}>
          <img
            className={css.heroImage}
            src="/images/sticker 1.png"
            alt="Teacher Image"
          />
          <svg
            className={css.componentImage}
            width="360"
            height="176"
          >
            <use href="/public/symbol-defs2.svg#Yellow"></use>
          </svg> 
        </div>
      </div>
    </section>
  );
};

export default Hero;
