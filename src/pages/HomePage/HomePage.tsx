import Hero from "../../components/Hero/Hero";
import css from "../../Home.module.css";

const HomePage = () => {
  return (
    <div className={css.container}>
      <Hero />
    </div>
  );
};
export default HomePage;
