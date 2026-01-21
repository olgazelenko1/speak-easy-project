import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
    </div>
  );
};
export default Layout;
