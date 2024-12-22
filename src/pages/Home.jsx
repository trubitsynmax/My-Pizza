import { useEffect, useState } from "react";
import { Card, Categories, Skeleton, Sort } from "../components/script";

export default function Home() {
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
    <>
      <div className="container">
        <div className="content__top">
          <Categories isOpen={isOpen} />
          <Sort isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {error && (
            <div>
              К сожалению, произошла какая ошибка, попробуйте повторить попытку
              позже 😟
            </div>
          )}
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : data.map((item, index) => <Card key={index} {...item} />)}
        </div>
      </div>
    </>
  );
}
