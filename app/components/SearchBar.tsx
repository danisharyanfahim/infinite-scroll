"use client";

import {
  useSearchParams,
  useRouter,
  usePathname,
  redirect,
} from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (search) {
      //If search bar isn't empty
      if (search.includes("#")) {
        params.set("category", search.substring(1));
        params.delete("title"); //If at movies page then do nothing
        params.delete("releaseYear"); //If at movies page then do nothing
      } else if (search.includes("from:")) {
        params.delete("title"); //If at movies page then do nothing
        params.delete("category"); //If at movies page then do nothing
        params.set("releaseYear", search.substring(5));
      } else {
        params.set("title", search);
        params.delete("category"); //If at movies page then do nothing
        params.delete("releaseYear"); //If at movies page then do nothing
      }
      router.push(`/movies/search?${params.toString()}`);
    } else if (pathname !== "/movies") {
      //If search bar is empty and you are not on the movies page then redirect to the movies page
      redirect(`/movies`);
    }
  };

  return (
    <form className="search-bar-container">
      <div className="search-bar-wrapper">
        <input
          className="search-bar"
          type="search"
          value={search}
          name="search"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        />
        <button
          type="submit"
          className="search-button"
          onClick={(e) => handleSubmit(e)}
        >
          <p>
            <IoMdSearch />
          </p>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
