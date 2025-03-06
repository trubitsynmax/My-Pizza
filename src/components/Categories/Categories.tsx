import React, { useState } from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    const categories = [
      { name: "Все", id: 0 },
      { name: "Мясные", id: 1 },
      { name: "Вегетарианская", id: 2 },
      { name: "Гриль", id: 3 },
      { name: "Острые", id: 4 },
      { name: "Закрытые", id: 5 },
    ];
    const [openCategories, setOpenCategories] = useState<boolean>(false);
    const handleClick = (index: number) => {
      onChangeCategory(index);
      setOpenCategories(false);
    };
    const widthWindow: number = window.innerWidth;

    return (
      <div className="categories">
        {widthWindow <= 750 && (
          <div className="sort__label">
            <b>Категории пицц:</b>
            <span onClick={() => setOpenCategories(!openCategories)}>
              {categories[value].name}
            </span>
          </div>
        )}
        <ul className={openCategories ? "active" : ""}>
          {categories.map(
            (item: { name: string; id: number }, index: number) => (
              <li
                onClick={() => handleClick(index)}
                key={item.id}
                className={value === index ? "active" : ""}
              >
                {item.name}
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
);
