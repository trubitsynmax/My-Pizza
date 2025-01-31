import { useContext, useEffect, useRef, useState } from "react";
import { Card, Categories, Skeleton, Sort } from "../components/script";
import { searchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilter,
  setSort,
  setSearch,
  setValueSort,
} from "../redux/slices/filterSlice";
import qs from "qs";
import { useLocation, useNavigate } from "react-router";
import { nameCategory } from "../components/Sort";
import { fetchPizzaItems } from "../redux/slices/pizzaSlice";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const firstView = useRef(false);

  const getItems = () => {
    const isCategory = filter > 0 ? `category=${filter}` : "";
    const isFilter = valueSort ? "asc" : "desc";
    const isSort = `sortBy=${sort.sortProperty}`;

    dispatch(fetchPizzaItems({ isCategory, isFilter, isSort }));
  };

  const filter = useSelector((state) => state.filter.categoryId);
  const sort = useSelector((state) => state.filter.sort);
  const valueSort = useSelector((state) => state.filter.MoreOrLess);
  const status = useSelector((state) => state.pizza.status);
  const data = useSelector((state) => state.pizza.items);
  const usersValue = useSelector((state) => state.filter.inputValue);

  const onChangeCategory = (id) => {
    dispatch(setFilter(id));
  };
  const onChangeCart = (id) => {
    dispatch(setSort(id));
  };
  const onChangeValueSort = (value) => {
    dispatch(setValueSort(value));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      if (params.valueSort == "false") {
        params.valueSort = false;
      } else {
        params.valueSort = true;
      }
      const sort = nameCategory.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setSearch({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    getItems();
  }, [filter, sort.sortProperty, valueSort]);

  useEffect(() => {
    if (firstView.current) {
      const stringifySearch = qs.stringify({
        sortProperty: sort.sortProperty,
        filter,
        valueSort,
      });
      navigate(`?${stringifySearch}`);
    }
    firstView.current = true;
  }, [filter, sort.sortProperty, valueSort]);

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
          <Categories value={filter} onChangeCategory={onChangeCategory} />
          <Sort
            value={sort}
            onChangeCart={onChangeCart}
            valueSort={valueSort}
            onChangeValueSort={onChangeValueSort}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {status === "error" && (
            <div>
              К сожалению, произошла какая ошибка или такой пиццы не существует,
              попробуйте повторить попытку позже 😟
            </div>
          )}
          {status === "pending" ? skeleton : listPizza}
        </div>
      </div>
    </>
  );
}
