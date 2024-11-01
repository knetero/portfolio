"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundLines = ({
  children,
  className,
  // svgOptions
}) => {
  return (
    (<div
      className={cn("h-[30rem] md:h-screen w-full dark:bg-black", className)}>
      {children}
    </div>)
  );
};

// const pathVariants = {
//   initial: { strokeDashoffset: 800, strokeDasharray: "50 800" },
//   animate: {
//     strokeDashoffset: 0,
//     strokeDasharray: "20 800",
//     opacity: [0, 1, 1, 0],
//   },
// };
