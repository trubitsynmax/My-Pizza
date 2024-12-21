import { useState } from "react";

const categories = [
  { name: "Все", id: 0 },
  { name: "Мясные", id: 1 },
  { name: "Вегетарианская", id: 2 },
  { name: "Гриль", id: 3 },
  { name: "Острые", id: 4 },
  { name: "Закрытые", id: 5 },
];

export function Categories() {
  const [selectCategory, setSelectCategory] = useState(0);
  const handleClick = (index) => {
    setSelectCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => handleClick(index)}
            key={item.id}
            className={selectCategory === index ? "active" : null}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
