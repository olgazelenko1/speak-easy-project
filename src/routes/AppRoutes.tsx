import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import HomePage from "../pages/HomePage/HomePage";
import TeachersPage from "../pages/TeachersPage/TeachersPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/teachers" element={<TeachersPage />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
