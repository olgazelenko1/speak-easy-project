import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import HomePage from "../pages/HomePage/HomePage";
import TeachersPage from "../pages/TeachersPage/TeachersPage";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  const isAuth = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="favorites"
          element={
            <PrivateRoute isAuth={isAuth}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="teachers" element={<TeachersPage />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
