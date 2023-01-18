import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}
        ></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
