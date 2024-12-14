import InfiniteScroll from "@/app/components/InfiniteScroll";
import SearchBar from "@/app/components/SearchBar";
import { getNumberOfMovies } from "@/app/utils/server-actions";
import React from "react";

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; title?: string } | undefined>;
}) => {
  const numberOfMovies = await getNumberOfMovies(searchParams);
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

export default Search;
