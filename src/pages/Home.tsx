import React, { useEffect, useRef } from "react";
import { Card, Categories, Skeleton, Sort } from "../components/script";
import {
  setFilter,
  setSort,
  setSearch,
  setValueSort,
} from "../redux/slices/filter/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router";
import { nameCategory } from "../components/Sort/Sort";
import { fetchPizzaItems } from "../redux/utils/asyncAction/fetchAction";
import { useAppDispatch, useAppSelector } from "../redux/store";

type INameCategory = {
  name: string;
  sortProperty: string;
};

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef<boolean>(false);
  const firstView = useRef<boolean>(false);

  const getItems = () => {
    const isCategory = filter > 0 ? `category=${filter}` : "";
    const isFilter = valueSort ? "asc" : "desc";
    const isSort = `sortBy=${sort.sortProperty}`;
    dispatch(fetchPizzaItems({ isCategory, isFilter, isSort }));
  };

  const filter = useAppSelector((state) => state.filter.categoryId);
  const sort = useAppSelector((state) => state.filter.sort);
  const valueSort = useAppSelector((state) => state.filter.MoreOrLess);
  const status = useAppSelector((state) => state.pizza.status);
  const data = useAppSelector((state) => state.pizza.items);
  const usersValue = useAppSelector((state) => state.filter.inputValue);
  const cartItem = useAppSelector((state) => state.cart.item);

  useEffect(() => {
    if (cartItem.length > 0) {
      const json = JSON.stringify(cartItem);
      localStorage.setItem("items", json);
    }
  }, [cartItem]);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setFilter(id));
  }, []);
  const onChangeCart = React.useCallback((id: INameCategory) => {
    dispatch(setSort(id));
  }, []);
  const onChangeValueSort = React.useCallback((value: boolean) => {
    dispatch(setValueSort(value));
  }, []);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      if (params.valueSort == "false") {
        params.valueSort = "false";
      } else {
        params.valueSort = "true";
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

    .map((item, index: number) => <Card key={index} {...item} />);
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
};

export default Home;
