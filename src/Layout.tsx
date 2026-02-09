import { Outlet } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import Header from "./components/Header/Header";
import { useAuth } from "./hooks/useAuth";

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <Header
        isAuth={!!user}
        favoritesCount={user?.favorites.length || 0}
        onLogout={logout}
      />
      <Outlet />
      <ThemeToggle />
    </div>
  );
};

export default Layout;
