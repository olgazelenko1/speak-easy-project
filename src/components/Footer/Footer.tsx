import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={css.footer}>
        <ul className={css.list}>
          <li className={css.listItem}>
            <h3 className={css.heading}>32,000 +</h3>
            <p className={css.text}>Experienced tutors</p>
          </li>
          <li className={css.listItem}>
            <h3 className={css.heading}>300,000 +</h3>
            <p className={css.text}>5-star tutor reviews</p>
          </li>
          <li className={css.listItem}>
            <h3 className={css.heading}>120 +</h3>
            <p className={css.text}>Subjects taught</p>
          </li>
          <li className={css.listItem}>
            <h3 className={css.heading}>200 +</h3>
            <p className={css.text}>Tutor nationalities</p>
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
