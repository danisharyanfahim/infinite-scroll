"use server";

import { client, sanityFetch } from "@/app/lib/client";

const makeFirstLetterUpperCase = (text: string) => {
  return text?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
};

export const getNumberOfMovies = async (
  searchParams: Promise<{ category?: string; title?: string } | undefined>
) => {
  const { title } = (await searchParams) || "";
  let movieData;
  if (!title) {
    movieData = await sanityFetch({
      query: `*[_type == 'movie']`,
      revalidate: 30, //Data will be cached for 30 seconds before it becomes stale and is revalidated, also invalidates indefinite caching
    });
  } else {
    const query = `*[_type == 'movie' && title match $title]`;
    movieData = await sanityFetch({
      query: query,
      params: { title: `*${title}*` }, //Will match any title which contains the search term
      revalidate: 30,
    });
  }
  return movieData.length;
};

export const fetchMoviesByPage = async (
  searchParams: Promise<{ category?: string; title?: string } | "">,
  page: number,
  moviesPerPage: number = 3
) => {
  const firstMovie = (page - 1) * moviesPerPage;
  const lastMovie = page * moviesPerPage;
  const { title } = (await searchParams) || "";
  const queryFields = `{'image': posterImage, title, overview, 'slug': slug.current}`;
  let movieQuery, queryFilter;

  if (!title) {
    //Return all movies
    queryFilter = `*[_type == 'movie'][${firstMovie}...${lastMovie}]`;
    const query = queryFilter + queryFields;
    movieQuery = {
      query: query,
      revalidate: 30,
    };
  } else {
    queryFilter = `*[_type == 'movie' && title match $title][${firstMovie}...${lastMovie}]`;
    const query = queryFilter + queryFields;
    movieQuery = {
      query: query,
      params: { title: `*${title}*` },
      revalidate: 30,
    };
  }
  const movieData = await sanityFetch(movieQuery);

  return movieData;
};
