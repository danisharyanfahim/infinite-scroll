import InfiniteScroll from "@/app/components/InfiniteScroll";
import SearchBar from "@/app/components/SearchBar";
import { getNumberOfMovies } from "@/app/utils/server-actions";
import React from "react";

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<
    { category?: string; title?: string; releaseYear?: number } | undefined
  >;
}) => {
  const numberOfMovies: number = await getNumberOfMovies(searchParams);
  return (
    <div className="movie-page">
      <header>
        <h1 className="title-container">
          Movies
          <span className="colored">App</span>
        </h1>
      </header>
      <SearchBar />
      <InfiniteScroll
        searchParams={searchParams}
        numberOfMovies={numberOfMovies}
      />
    </div>
  );
};

export default Search;
