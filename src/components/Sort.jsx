import { useState } from "react";

export function Sort({
  value,
  onChangeCart,
  isOpen,
  setIsOpen,
  MoreOrLess,
  setMoreOrLess,
}) {
  const nameCategory = [
    { name: "популярности", sortProperty: "rating" },
    { name: "цене", sortProperty: "price" },
    { name: "алфавиту", sortProperty: "name" },
  ];
  const handleClick = (index) => {
    onChangeCart(index);
    setIsOpen(false);
  };
  return (
    <div className="sort">
      <div className="sort__label">
        <div
          className={MoreOrLess ? "sort__arrow" : "sort__arrow active"}
          onClick={() => setMoreOrLess(!MoreOrLess)}
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
