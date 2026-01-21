import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import FavoritesPage from "../pages/FavoritesPage";
import HomePage from "../pages/HomePage";
import TeachersPage from "../pages/TeachersPage";

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
