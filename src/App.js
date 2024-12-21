import "./scss/app.scss";
import { Header, Sort } from "./components/script";
import { Categories } from "./components/script";
import { Card } from "./components/script";
import { data } from "./assets/data";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="wrapper" onClick={isOpen ? () => setIsOpen(false) : null}>
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {data.map((item) => (
              <Card {...item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
