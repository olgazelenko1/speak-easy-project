import css from "./Hero.module.css";
import style from "../../Home.module.css";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import CountUp from "react-countup";

const Hero = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <section className={css.heroSection}>
      <div className={style.container}>
        <div className={css.heroRow}>
          <div className={css.heroCard}>
            <h1 className={css.title}>
              Unlock your potential with the best{" "}
              <span className={css.highlight}>language</span> tutors
            </h1>
            <p className={css.text}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
            <button className={css.button} onClick={() => setIsLoginOpen(true)}>
              Get started
            </button>
          </div>

          <div className={css.heroImageCard}>
            <img
              className={css.heroImage}
              src="/images/sticker 1.png"
              alt="Teacher Image"
            />
            <div className={css.componentImageWrapper}>
              <svg className={css.component} width="360" height="176">
                <use href="/public/mac.svg#icon-Union"></use>
              </svg>
            </div>
            <div className={css.componentIconWrapper}>
              <svg className={css.componentIcon} width="47" height="56">
                <use href="/public/apple.svg#icon-untitled"></use>
              </svg>
            </div>
          </div>
        </div>

        <div className={css.heroFooter}>
          <div className={style.container}>
            <dl className={css.statsList}>
              <div className={css.statsItem}>
                <dt className={css.statsValue}>
                  <CountUp start={0} end={32000} duration={5} separator="," /> +
                </dt>
                <dd className={css.statsLabel}>Experienced tutors</dd>
              </div>

              <div className={css.statsItem}>
                <dt className={css.statsValue}>
                  <CountUp start={0} end={300000} duration={6} separator="," />{" "}
                  +
                </dt>
                <dd className={css.statsLabel}>5-star tutor reviews</dd>
              </div>

              <div className={css.statsItem}>
                <dt className={css.statsValue}>
                  <CountUp start={0} end={120} duration={7} separator="," /> +
                </dt>
                <dd className={css.statsLabel}>Subjects taught</dd>
              </div>

              <div className={css.statsItem}>
                <dt className={css.statsValue}>
                  <CountUp start={0} end={200} duration={5} separator="," /> +
                </dt>
                <dd className={css.statsLabel}>Tutor nationalities</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </section>
  );
};

export default Hero;
