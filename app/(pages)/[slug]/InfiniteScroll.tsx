"use client";
import { useEffect, useState, useRef } from "react";
import { fetchMovies } from "../utils/server-actions";
import MovieCard, { MovieCardProps } from "@/app/components/MovieCard";
import useOnScreen from "@/app/hooks/useOnScreen";

const moviesPerPage = 3;

const InfiniteScroll = ({
  searchParams,
  numberOfMovies,
}: {
  searchParams: Promise<{ category?: string; title?: string } | undefined>;
  numberOfMovies: number;
}) => {
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderIsVisible = useOnScreen(loaderRef);
  const pageRef = useRef(0);

  const loadMovies = async () => {
    setIsLoading(true);
    try {
      const newMovies = await fetchMovies(
        searchParams,
        pageRef.current,
        moviesPerPage
      );
      setMovies((prev) => [...prev, ...newMovies]);

      if (newMovies.length < moviesPerPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loaderIsVisible && hasMore && !isLoading) {
      pageRef.current += 1; // Increment the page without triggering a re-render using useRef instead of useState
      loadMovies(); // Call loadMovies directly when the loader is visible
    }
  }, [loaderIsVisible, hasMore, isLoading]); //Only runs when loader is visible or any of the dependencies change

  return (
    <div className="infinite-scroll-container">
      <div className="movie-card-container">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            image={movie.image}
            overview={movie.overview}
            slug={movie.slug}
          />
        ))}
      </div>

      {hasMore && (
        <div className="loading-container" ref={loaderRef}>
          {Array(
            numberOfMovies - movies.length > moviesPerPage
              ? moviesPerPage
              : numberOfMovies - movies.length
          )
            .fill(null)
            .map((_, index) => (
              <div key={index} className="movie-card skeleton"></div>
            ))}
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;

/* 
-All that is needed now is to get it to work with the search bar
-And for it to work with the skeleton loader as an animation instead
-Could add lazy loading to the images as well
*/
