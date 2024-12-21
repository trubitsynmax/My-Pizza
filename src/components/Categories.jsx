import { useState } from "react";

const data = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

export function Categories() {
  const [selectCategory, setSelectCategory] = useState(0);
  const handleClick = (index) => {
    setSelectCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {data.map((item, index) => (
          <li
            onClick={() => handleClick(index)}
            className={selectCategory === index ? "active" : null}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
