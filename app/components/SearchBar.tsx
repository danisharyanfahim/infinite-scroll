"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("title", search);
    } else {
      params.delete("title");
    }
    router.push(`/movies?${params.toString()}`); // Update the URL with the new params
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
          <IoMdSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
