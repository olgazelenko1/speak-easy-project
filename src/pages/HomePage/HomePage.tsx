import Hero from "../../components/Hero/Hero";
import css from "../../Home.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const HomePage = () => {
  return (
    <div className={css.container}>
      <Header isAuth={false} favoritesCount={0} onLogout={() => {}} />
      <Hero />
      <Footer />
    </div>
  );
};
export default HomePage;
