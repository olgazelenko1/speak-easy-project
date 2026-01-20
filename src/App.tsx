import { Routes, Route } from "react-router-dom";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import TeachersPage from "./pages/TeachersPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/teachers" element={<TeachersPage />} />
    </Routes>
  );
};

export default App;
