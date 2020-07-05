import React from "react";
import SearchBar from "../../components/SearchBar";
import Category from "../../components/Category";
import ContentList from "../../components/ContentList";
import LoadingCircle from "../../components/ScrollView/LoadingCircle";

const Home: React.FC = () => {
  return (
    <div>
      <SearchBar></SearchBar>
      <Category></Category>
      <ContentList></ContentList>
    </div>
  );
};

export default Home;
