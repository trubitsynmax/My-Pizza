import { useState } from "react";
import qs from "qs";
export const nameCategory = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "name" },
];

export function Sort({
  value,
  onChangeCart,
  isOpen,
  setIsOpen,
  valueSort,
  onChangeValueSort,
}) {
  const handleClick = (index) => {
    onChangeCart(index);
    setIsOpen(false);
  };
  const handleClickValue = (value) => {
    onChangeValueSort(value);
  };
  return (
    <div className="sort">
      <div className="sort__label">
        <div
          className={valueSort ? "sort__arrow" : "sort__arrow active"}
          onClick={() => handleClickValue(valueSort)}
        >
          <span></span>
        </div>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{value.name}</span>
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
