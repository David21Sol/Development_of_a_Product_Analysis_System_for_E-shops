import React from "react";
import { useSelector, useDispatch } from "react-redux"; // redux
import { setCategoryTitle, setCurrentPage } from "../redux/slices/filterSlice";
//axios
import axios from "axios";
//my components
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Product from "../components/ProductBlock/Product";
import Skeleton from "../components/ProductBlock/Skeleton";
import Pagination from "../components/Pagination";
import MyModalConverter from "../components/MyModalConverter/MyModalConverter";
//context
import { SearchContext } from "../App";

function Home() {
  //work with redux
  let categoryTitle = useSelector((state) => state.filter.categoryTitle);
  const sortType = useSelector((state) => state.filter.sortType.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const dispatch = useDispatch();

  //work with context
  const { searchValue } = React.useContext(SearchContext);

  //work with states
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0); //categories

  //
  //const category = categoryTitle !== "All" ? `title_like=${categoryTitle}` : "";
  let category = `title_like=`;

  if (categoryTitle !== "All") {
    category += categoryTitle;
  }
  if (categoryTitle === "Headset") {
    category += "&title_like=Headphone";
  }
  if (categoryTitle === "Game") {
    category += "&title_like=Edition";
  } else {
    categoryTitle += "";
  }

  const sort = sortType;
  const search = searchValue ? `&q=${searchValue}` : "";

  React.useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `http://localhost:3004/products?_page=${currentPage}&_limit=12&${category}&_sort=${sort}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [category, currentPage, sort, search]);

  const onChangeCategory = (id, name) => {
    setCategoryId(id);
    dispatch(setCategoryTitle(name));
    dispatch(setCurrentPage(1));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const products = items.map((obj) => <Product key={obj.imageUrl} {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <MyModalConverter />
        <Sort />
      </div>
      <h2 className="content__title">{categoryTitle}</h2>
      <div className="content__items">{isLoading ? skeletons : products}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
}

export default Home;
