import { Navigate } from "react-router-dom";
import useContextStore from "../store/contextStore";

const Protected = ({ children }) => {
  const isLoggedIn = useContextStore((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  if (isLoggedIn == "false") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protected;
