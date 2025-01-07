import { useContext, useEffect, useState } from "react";
import { Card, Categories, Skeleton, Sort } from "../components/script";
import { searchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, setSort } from "../redux/slices/filterSlice";
import axios from "axios";

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
  const inputFilter = `filter=${usersValue}`;

  const isCart = useEffect(() => {
    setIsLoading(true);
    setError(false);
    axios
      .get(
        `https://6766d6fd560fbd14f18c43df.mockapi.io/MyPizza?${isCategory}&${isSort}&order=${isFilter}`
      )
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
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
  console.log("list", listPizza.length > 0, "error", error);
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
          {error ||
            (listPizza.length === 0 && (
              <div>
                К сожалению, произошла какая ошибка или такой пиццы не
                существует, попробуйте повторить попытку позже 😟
              </div>
            ))}
          {isLoading ? skeleton : listPizza}
        </div>
      </div>
    </>
  );
}
