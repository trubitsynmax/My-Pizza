import { useEffect, useState } from "react";
import { Card, Categories, Skeleton, Sort } from "../components/script";

export default function Home({ usersValue }) {
  const [selectCategory, setSelectCategory] = useState(0);
  const [selectCart, setSelectCart] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [MoreOrLess, setMoreOrLess] = useState(true);
  const isCategory = selectCategory > 0 ? `category=${selectCategory}` : "";
  const isFilter = MoreOrLess ? "asc" : "desc";
  const isSort = `sortBy=${selectCart.sortProperty}`;
  const isCart = useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6766d6fd560fbd14f18c43df.mockapi.io/MyPizza?${isCategory}&${isSort}&order=${isFilter}`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      })
      .catch((e) => setError(true));
  }, [selectCategory, selectCart, MoreOrLess]);

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const listPizza = data
    .filter((item) => {
      if (item.name.toLowerCase().includes(usersValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((item, index) => <Card key={index} {...item} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            isOpen={isOpen}
            value={selectCategory}
            onChangeCategory={(id) => setSelectCategory(id)}
          />
          <Sort
            value={selectCart}
            onChangeCart={(id) => setSelectCart(id)}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            MoreOrLess={MoreOrLess}
            setMoreOrLess={setMoreOrLess}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {error && (
            <div>
              К сожалению, произошла какая ошибка, попробуйте повторить попытку
              позже 😟
            </div>
          )}
          {isLoading ? skeleton : listPizza}
        </div>
      </div>
    </>
  );
}
