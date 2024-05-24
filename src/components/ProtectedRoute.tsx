import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state?.user);
  return <>{currentUser ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default ProtectedRoute;
