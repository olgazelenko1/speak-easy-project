import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="theme-yellow">
      <Header isAuth={false} favoritesCount={0} onLogout={() => {}} />
      <Outlet />
    </div>
  );
};
export default Layout;
