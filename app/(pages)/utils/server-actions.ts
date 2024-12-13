"use server";

import { client } from "@/app/lib/sanity";

export const getNumberOfMovies = async (
  searchParams: Promise<{ category?: string; title?: string } | undefined>
) => {
  const query = `*[_type == 'movie']`;
  const movieData = await client.fetch(query);
  return movieData.length;
};

export const fetchMovies = async (
  searchParams: Promise<{ category?: string; title?: string } | undefined>,
  page: number,
  moviesPerPage: number = 3
) => {
  const firstMovie = (page - 1) * moviesPerPage;
  const lastMovie = page * moviesPerPage;
  const query = `*[_type == 'movie'][${firstMovie}...${lastMovie}]{'image': posterImage, title, overview, 'slug': slug.current}`;

  const movieData = await client.fetch(query);
  return movieData;
};
