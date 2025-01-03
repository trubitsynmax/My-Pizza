import { useContext, useEffect, useState } from "react";
import { Card, Categories, Skeleton, Sort } from "../components/script";
import { searchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, setSort } from "../redux/slices/filterSlice";

export default function Home() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.categoryId);
  const sort = useSelector((state) => state.filter.sort);
  const onChangeCategory = (id) => {
    dispatch(setFilter(id));
  };
  const onChangeCart = (id) => {
    dispatch(setSort(id));
  };
  const { usersValue } = useContext(searchContext);

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [MoreOrLess, setMoreOrLess] = useState(true);
  const isCategory = filter > 0 ? `category=${filter}` : "";
  const isFilter = MoreOrLess ? "asc" : "desc";
  const isSort = `sortBy=${sort.sortProperty}`;
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
  }, [filter, sort.sortProperty, MoreOrLess]);

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
            value={filter}
            onChangeCategory={onChangeCategory}
          />
          <Sort
            value={sort}
            onChangeCart={onChangeCart}
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
