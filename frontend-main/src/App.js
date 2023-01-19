import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Protected from "./components/Protected";
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        ></Route>
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
