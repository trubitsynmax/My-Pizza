import "./scss/app.scss";
import { Header } from "./components/script";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://6766d6fd560fbd14f18c43df.mockapi.io/MyPizza")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      })
      .catch((e) => setError(true));
  }, []);
  return (
    <div className="wrapper" onClick={isOpen ? () => setIsOpen(false) : null}>
      <Header />
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                error={error}
                isLoading={isLoading}
                data={data}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
