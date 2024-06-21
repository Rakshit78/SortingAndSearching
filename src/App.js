import React from "react";
import "./App.css";
import "h8k-components";
import SearchSort from "./components/SearchSort";
import booksList from "./data/booksList";

const title = "Search Books";

const App = () => {
  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <SearchSort booksList={booksList} />
    </div>
  );
};

export default App;
