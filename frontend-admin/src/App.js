import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import Protected from "./components/Protected";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/admin"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Admin isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
