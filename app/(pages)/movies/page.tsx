import React from "react";
import InfiniteScroll from "../../components/InfiniteScroll";
import { getNumberOfMovies } from "../../utils/server-actions";
import SearchBar from "../../components/SearchBar";

const Index = async ({
  searchParams,
}: {
  searchParams: Promise<
    { category?: string; title?: string; releaseYear?: number } | undefined
  >;
}) => {
  const numberOfMovies: number = await getNumberOfMovies(searchParams);
  return (
    <div className="movie-page">
      <SearchBar />
      <InfiniteScroll
        searchParams={searchParams}
        numberOfMovies={numberOfMovies}
      />
    </div>
  );
};

export default Index;
