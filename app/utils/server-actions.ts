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
  const { title, category } = (await searchParams) || "";
  let movieData;
  if (title) {
    const query = `*[_type == 'movie' && title match $title]`;
    movieData = await sanityFetch({
      query: query,
      params: { title: `*${title}*` }, //Will match any title which contains the search term
      revalidate: 30,
    });
  } else if (category) {
    const query = `*[_type == 'movie' && $category in categories[]]`;
    movieData = await sanityFetch({
      query: query,
      params: { category: `${makeFirstLetterUpperCase(category)}` }, //Will match any title which contains the search term
      revalidate: 30,
    });
  } else {
    movieData = await sanityFetch({
      query: `*[_type == 'movie']`,
      revalidate: 30, //Data will be cached for 30 seconds before it becomes stale and is revalidated, also invalidates indefinite caching
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
  const { title, category } = (await searchParams) || "";
  const queryFields = `{'image': posterImage, title, overview, 'slug': slug.current}`;
  let movieQuery, queryFilter;

  if (title) {
    queryFilter = `*[_type == 'movie' && title match $title][${firstMovie}...${lastMovie}]`;
    const query = queryFilter + queryFields;
    movieQuery = {
      query: query,
      params: { title: `*${title}*` },
      revalidate: 30,
    };
  } else if (category) {
    queryFilter = `*[_type == 'movie' && $category in categories[]][${firstMovie}...${lastMovie}]`;
    const query = queryFilter + queryFields;
    movieQuery = {
      query: query,
      params: { category: `${makeFirstLetterUpperCase(category)}` },
      revalidate: 30,
    };
  } else {
    //Return all movies
    queryFilter = `*[_type == 'movie'][${firstMovie}...${lastMovie}]`;
    const query = queryFilter + queryFields;
    movieQuery = {
      query: query,
      revalidate: 30,
    };
  }
  const movieData = await sanityFetch(movieQuery);

  return movieData;
};