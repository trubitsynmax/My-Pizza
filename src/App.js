import "./scss/app.scss";
import { Header } from "./components/script";
import { Categories } from "./components/script";
import { Card } from "./components/script";
import { data } from "./assets/data";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {data.map((item, index) => (
              <Card {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
