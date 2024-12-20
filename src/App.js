import "./scss/app.scss";
import { Header } from "./components/script";
import { Categories } from "./components/script";
import { Card } from "./components/script";
function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <Card title="Маргарита" price={450} />
            <Card title="4 сыра" price={560} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
