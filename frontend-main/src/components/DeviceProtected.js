import { Navigate } from "react-router-dom";
import useContextStore from "../store/contextStore";

const DeviceProtected = ({ children }) => {
  const deviceLoggedIn = useContextStore((state) => state.deviceLoggedIn);
  console.log(deviceLoggedIn);
  if (deviceLoggedIn == "false") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default DeviceProtected;
