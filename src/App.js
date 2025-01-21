import "./scss/app.scss";
import { Header } from "./components/script";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import React, { useState } from "react";

export const searchContext = React.createContext();

function App() {
  const [usersValue, setUsersValue] = useState("");

  return (
    <div className="wrapper">
      <searchContext.Provider value={{ usersValue, setUsersValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </searchContext.Provider>
    </div>
  );
}

export default App;
