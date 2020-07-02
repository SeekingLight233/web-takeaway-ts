import React from "react";
import SearchBar from "../../components/SearchBar";
import Category from "../../components/Category";

const Home: React.FC = () => {
  return (
    <div>
      <SearchBar></SearchBar>
      <Category></Category>
    </div>
  );
};

export default Home;
