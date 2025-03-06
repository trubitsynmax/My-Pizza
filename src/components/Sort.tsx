import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/slices/filterSlice";
import { useAppSelector } from "../redux/store";

type INameCategory = {
  name: string;
  sortProperty: string;
};

export const nameCategory: Array<INameCategory> = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "name" },
];

type SortProps = {
  value: INameCategory;
  onChangeCart: (index: INameCategory) => void;
  valueSort: boolean;
  onChangeValueSort: (value: boolean) => void;
};

export const Sort: React.FC<SortProps> = ({
  value,
  onChangeCart,
  valueSort,
  onChangeValueSort,
}) => {
  const sortPopup = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const isOpen = useAppSelector((state) => state.filter.isOpen);

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (
        sortPopup.current &&
        !event.composedPath().includes(sortPopup.current)
      ) {
        dispatch(setOpen(isOpen === true && false));
      }
    };

    document.body.addEventListener("click", clickOutside);
    return () => {
      document.body.removeEventListener("click", clickOutside);
    };
  }, []);

  const handleClick = (index: INameCategory) => {
    onChangeCart(index);
    dispatch(setOpen(isOpen === true && false));
  };
  const handleClickValue = (value: boolean) => {
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
};
