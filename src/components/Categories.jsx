import { useState } from "react";

export function Categories({ value, onChangeCategory }) {
  const categories = [
    { name: "Все", id: 0 },
    { name: "Мясные", id: 1 },
    { name: "Вегетарианская", id: 2 },
    { name: "Гриль", id: 3 },
    { name: "Острые", id: 4 },
    { name: "Закрытые", id: 5 },
  ];
  const [openCategories, setOpenCategories] = useState(false);
  const handleClick = (index) => {
    onChangeCategory(index);
    setOpenCategories(false);
  };
  const widthWindow = window.innerWidth;

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
      <ul className={openCategories ? "active" : null}>
        {categories.map((item, index) => (
          <li
            onClick={() => handleClick(index)}
            key={item.id}
            className={value === index ? "active" : null}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
