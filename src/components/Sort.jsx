import { useEffect, useRef, useState } from "react";
import qs from "qs";

import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/slices/filterSlice";

export const nameCategory = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "name" },
];

export function Sort({ value, onChangeCart, valueSort, onChangeValueSort }) {
  const sortPopup = useRef();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.filter.isOpen);

  useEffect(() => {
    const clickOutside = (event) => {
      if (!event.composedPath().includes(sortPopup.current)) {
        dispatch(setOpen(isOpen === true && false));
      }
    };

    document.body.addEventListener("click", clickOutside);
    return () => {
      document.body.removeEventListener("click", clickOutside);
    };
  }, []);

  const handleClick = (index) => {
    onChangeCart(index);
    dispatch(setOpen(isOpen === true && false));
  };
  const handleClickValue = (value) => {
    onChangeValueSort(value);
  };

  return (
    <div className="sort" ref={sortPopup}>
      <div className="sort__label">
        <div
          className={valueSort ? "sort__arrow" : "sort__arrow active"}
          onClick={() => handleClickValue(valueSort)}
        >
          <span></span>
        </div>
        <b>Сортировка по:</b>
        <span onClick={() => dispatch(setOpen(!isOpen))}>{value.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {nameCategory.map((item, index) => (
              <li key={index} onClick={() => handleClick(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
