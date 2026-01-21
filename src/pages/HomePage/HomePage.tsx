import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container">
      <div className="hero-section">
        <div className="hero-main-section">
          <h1>
            Unlock your potential with the best{" "}
            <span className="highlight">language</span> tutors
          </h1>
          <p>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <Link className="button" to="/login" aria-label="Get started">
            Get started
          </Link>
        </div>
        <div className="image-section">
          <img src="/src/assets/react.svg" alt="Teacher with book" />
        </div>
        <div className="info-section">
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
      </div>
    </div>
  );
};
export default HomePage;
