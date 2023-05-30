import React from "react";

function Categories({ value, onChangeCategory }) {
  const categories = [
    "All",
    "Game",
    "Controller",
    "Keyboard",
    "Mouse",
    "Headset",
    "Console",
    "Key",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index , categoryName)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
