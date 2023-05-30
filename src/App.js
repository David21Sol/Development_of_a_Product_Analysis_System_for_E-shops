import React from "react";
import "./scss/app.scss";
//routes
import { Routes, Route } from "react-router-dom";
//header
import Header from "./components/Header";
//pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

//context
export const SearchContext = React.createContext("");

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
