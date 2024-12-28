import "./scss/app.scss";
import { Header } from "./components/script";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";
import { useState } from "react";

function App() {
  const [usersValue, setUsersValue] = useState("");

  return (
    <div className="wrapper">
      <Header usersValue={usersValue} setUsersValue={setUsersValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home usersValue={usersValue} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
