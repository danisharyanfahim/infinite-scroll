import React from "react";
import { urlFor } from "../lib/sanity";
import Link from "next/link";

export interface MovieCardProps {
  title: string;
  image: any;
  overview: string;
  slug: string;
}

const MovieCard = ({ title, image, overview, slug }: MovieCardProps) => {
  return (
    <Link href={`/movies/${slug}`}>
      <div className="movie-card">
        <figure className="image-container">
          <img
            src={urlFor(image).url()}
            alt="movie-poster"
            className="poster-image"
          />
        </figure>
        <h4 className="title">{title}</h4>
        <p className="overview">{overview}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
