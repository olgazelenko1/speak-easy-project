import Header from "../Header/Header.tsx";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="theme-yellow">
      <Header />
      <Outlet />
    </div>
  );
};
export default Layout;
