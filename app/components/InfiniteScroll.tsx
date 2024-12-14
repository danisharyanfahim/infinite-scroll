"use client";
import { useEffect, useState, useRef } from "react";
import { fetchMoviesByPage } from "../utils/server-actions";
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
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderIsVisible = useOnScreen(loaderRef);
  const pageRef = useRef(1); // Start with page 1

  // Function to load movies
  const loadMovies = async () => {
    try {
      const newMovies =
        (await fetchMoviesByPage(
          searchParams,
          pageRef.current,
          moviesPerPage
        )) || [];
      setMovies((prev) => [...prev, ...newMovies]);

      if (newMovies.length < moviesPerPage) {
        setHasMore(false); // No more movies to load
      }
    } catch (error) {
      console.error("Failed to load movies:", error);
    }
  };

  // Reset search logic
  const resetSearch = () => {
    setMovies([]);
    setHasMore(true);
    pageRef.current = 1;
    loadMovies(); // Load the first page of movies
  };

  const numberOfSkeletonCards = () => {
    if (numberOfMovies - movies.length >= 0) {
      return numberOfMovies - movies.length > moviesPerPage
        ? moviesPerPage
        : numberOfMovies - movies.length;
    }
  };

  // Reset state when searchParams or numberOfMovies changes
  useEffect(() => {
    resetSearch();
  }, [searchParams]);

  useEffect(() => {
    if (loaderIsVisible && hasMore) {
      pageRef.current += 1; // Increment page for next set of movies
      loadMovies();
    }
  }, [loaderIsVisible, hasMore]); // Only runs when loader visibility or state changes

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
      <div className="loading-container" ref={loaderRef}>
        {Array(numberOfSkeletonCards())
          .fill(null)
          .map((_, index) => (
            <div key={index} className="movie-card skeleton"></div>
          ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
