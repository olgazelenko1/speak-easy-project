import { useEffect, useState } from "react";
import type { FC } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { subscribeToAuth } from "../firebase/auth";
import { type User } from "firebase/auth";

interface Props {
  children: ReactNode;
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default PrivateRoute;
