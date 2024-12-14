"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  // Automatically redirect to the /movies page
  useEffect(() => {
    redirect("/movies");
  });

  return (
    <div className="home-page">
      <h1>Redirecting to Movies...</h1>
    </div>
  );
};

export default HomePage;
