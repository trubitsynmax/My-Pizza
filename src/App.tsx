import "./scss/app.scss";
import { Header } from "./components/script";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import PizzaInfo from "./components/PizzaInfo/PizzaInfo";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<PizzaInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
