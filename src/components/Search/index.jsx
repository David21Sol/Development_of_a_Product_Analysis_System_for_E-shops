import React from "react";

//redux
import { useDispatch } from "react-redux"; // redux
import { setCurrentPage } from "../../redux/slices/filterSlice";
//loadash.debounce
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";
import { SearchContext } from "../../App";

function Search() {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("");
  const { setSearchValue } = React.useContext(SearchContext);

  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 400),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
    dispatch(setCurrentPage(1));
  };

  return (
    <div className={styles.root}>
      <img
        className={styles.icon}
        src="https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-glyph-1/32/-_Magnifier-Search-Zoom--256.png"
        alt="search-logo"
      />
      <input
        ref={inputRef}
        value={value}
        className={styles.input}
        onChange={onChangeInput}
        placeholder="Search product here..."
      />

      {value && (
        <img
          onClick={onClickClear}
          className={styles.clear}
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-256.png"
          alt="clearInput"
        ></img>
      )}
    </div>
  );
}

export default Search;
