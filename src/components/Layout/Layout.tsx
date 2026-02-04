import { Outlet } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Layout = () => {
  return (
    <div>
      <Outlet />
      <ThemeToggle />
    </div>
  );
};

export default Layout;
