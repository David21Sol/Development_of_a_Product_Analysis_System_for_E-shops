import React from "react";
import { Link } from "react-router-dom";

import Search from "./Search";

import Help from "./Help";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img
              width="70"
              height="70"
              src="https://cdn2.iconfinder.com/data/icons/football-line-color/32/soccer-34-256.png"
              alt="Gaming logo"
            />
            <div>
              <h1>D&S GAMING PRODUCTS SEARCH</h1>
              <p>search gaming products from various stores !</p>
            </div>
          </div>
        </Link>

        <Search />
        <Help />
               
      </div>
    </div>
  );
}

export default Header;
