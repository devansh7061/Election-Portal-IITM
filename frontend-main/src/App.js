import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Protected from "./components/Protected";
import DeviceLogin from "./pages/DeviceLogin/DeviceLogin";
import DeviceProtected from "./components/DeviceProtected";
import Thankyou from "./pages/Thankyou/Thankyou";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DeviceLogin />}></Route>
        <Route
          path="/login"
          element={
            <DeviceProtected>
              <Login />
            </DeviceProtected>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route path="/thankyou" element={<Thankyou />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
