import { type FC, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
  children: ReactNode;
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default PrivateRoute;
