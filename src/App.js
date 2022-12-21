import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggenInRoutes from "./routes/NotLoggenInRoutes";
import Activate from "./pages/home/activate";
import Reset from "./pages/reset";


function App() {
  return (
    <div>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggenInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
