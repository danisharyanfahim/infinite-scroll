"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Tag = ({ children }: { children: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      className="tag"
      onClick={() => {
        if (pathname === "/movies") {
          router.push(`movies/search?category=${children}`);
        } else {
          router.push(`search?category=${children}`);
        }
      }}
    >
      <p>{children}</p>
    </button>
  );
};

export default Tag;
