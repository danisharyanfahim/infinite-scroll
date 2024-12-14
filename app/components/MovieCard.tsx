import React from "react";
import { urlFor } from "../lib/client";
import Link from "next/link";
import { IoStarSharp } from "react-icons/io5";
import Tag from "./Tag";
import { FaPlay } from "react-icons/fa";

export interface MovieCardProps {
  title: string;
  image: any;
  link: string;
  rating: number;
  lang: string;
  releaseYear: number;
  categories: string[];
}

const MovieCard = ({
  title,
  image,
  link,
  rating,
  lang,
  releaseYear,
  categories,
}: MovieCardProps) => {
  return (
    <div className="movie-card">
      <figure className="image-container">
        <img
          src={urlFor(image).url()}
          alt="movie-poster"
          className="poster-image"
          loading="lazy"
        />
      </figure>
      <div className="play-button-container">
        <Link href={link} className="play-button">
          <FaPlay />
        </Link>
      </div>
      <div className="content-container">
        <h4 className="title">{title}</h4>
        <p className="release-year">{releaseYear}</p>
        <p className="language">{lang}</p>
        <div className="rating-container">
          {Array(rating)
            .fill(null)
            .map((_, index) => {
              return <IoStarSharp key={index} className="star" />;
            })}
        </div>
        <div className="category-container">
          {categories.map((category) => {
            return <Tag>{category}</Tag>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
