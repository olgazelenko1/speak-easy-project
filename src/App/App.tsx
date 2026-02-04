import AppRoutes from "../routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer className="my-toast-container" />
    </>
  );
};

export default App;
