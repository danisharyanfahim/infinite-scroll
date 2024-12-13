import React from "react";
import InfiniteScroll from "./[slug]/InfiniteScroll";
import { getNumberOfMovies } from "./utils/server-actions";

export const revalidate = 30; //Page checks server for new articles every 30 seconds, also disables auto-caching

const Index = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; title?: string } | undefined>;
}) => {
  const numberOfMovies = await getNumberOfMovies(searchParams);
  return (
    <div className="movie-page">
      <InfiniteScroll
        searchParams={searchParams}
        numberOfMovies={numberOfMovies}
      />
    </div>
  );
};

export default Index;
