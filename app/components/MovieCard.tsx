import React from "react";
import { urlFor } from "../lib/client";
import Link from "next/link";
import { IoStarSharp } from "react-icons/io5";
import Tag from "./Tag";
import { FaPlay } from "react-icons/fa";
import { formatTime } from "../utils/utils";

export interface MovieCardProps {
  title: string;
  image: any;
  link: string;
  rating: number;
  lang: string;
  length: number;
  releaseYear: number;
  categories: string[];
}

const MovieCard = ({
  title,
  image,
  link,
  rating,
  lang,
  length,
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
        <p className="length">{formatTime(length)}</p>
        <div className="rating-container">
          {Array(rating)
            .fill(null)
            .map((_, index) => {
              return <IoStarSharp key={index} className="star" />;
            })}
        </div>
        <div className="category-container">
          {categories.map((category, index) => {
            return <Tag key={index}>{category}</Tag>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
