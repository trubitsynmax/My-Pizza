import React, { useState } from "react";
import { addItem, minusItem } from "../../redux/slices/cart/cartSlice";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { TItem } from "../../redux/utils/types";

export const Card: React.FC<TItem> = ({
  name,
  price,
  sizes,
  types,
  imageUrl,
  id,
}) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) =>
    state.cart.item.filter((obj) => obj.id == id)
  );
  const totalPrice = item.map((i) => i.count);
  const [type, setType] = useState(0);
  const [sizePizza, setSizePizza] = useState(0);
  const typesNames = ["тонкое", "традиционное"];
  const handleClick = () => {
    const items = {
      id,
      name,
      imageUrl,
      price,
      type: typesNames[type],
      size: sizes[sizePizza],
    };
    dispatch(addItem(items));
  };

  const handleClickLess = () => {
    dispatch(minusItem({ id, size: sizes[sizePizza], type: typesNames[type] }));
  };
  return (
    <div className="pizza-block">
      {
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
      }
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((item: number) => (
            <li
              className={type == item ? "active" : ""}
              key={item}
              onClick={() => setType(item)}
            >
              {typesNames[item]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((item: number, index: number) => (
            <li
              className={sizePizza == index ? "active" : ""}
              key={item}
              onClick={() => setSizePizza(index)}
            >
              {item} см
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div className="pizza-block__control">
          {!totalPrice.length ? (
            <button
              className="button button--outline button--add"
              onClick={() => handleClick()}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Добавить</span>
            </button>
          ) : (
            <>
              <div
                className="pizza-block__less"
                onClick={() => handleClickLess()}
              >
                <span></span>
              </div>
              <div className="pizza-block__count" onClick={() => handleClick()}>
                {totalPrice.reduce(
                  (sum: number, number: number) => sum + number,
                  0
                )}
              </div>
              <div className="pizza-block__more" onClick={() => handleClick()}>
                <span></span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
