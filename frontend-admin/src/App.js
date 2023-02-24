import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./pages/admin/Navbar.js";
import Login from "./pages/login/Login.js";
import Protected from "./components/Protected";
import StartEnd from "./pages/admin/StartEnd.js";
import AddVoter from "./pages/admin/AddVoter.js";
import AddNode from "./pages/admin/AddNode.js";
import ViewStats from "./pages/admin/ViewStats.js";

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
          path="/navbar"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            </Protected>
          }
        />
        <Route
        path="/addvoter"
        element= {
          <AddVoter />
        }
        />
        <Route
        path="/addnode"
        element= {
          <AddNode />
        }
        />
        <Route
        path="/viewstats"
        element= {
          <ViewStats />
        }
        />
        <Route
        path="/startend"
        element= {
          <StartEnd />
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
