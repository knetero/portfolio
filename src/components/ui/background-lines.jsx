"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const BackgroundLines = ({
  children,
  className,
  svgOptions
}) => {
  return (
    (<div
      className={cn("h-[30rem] md:h-screen w-full dark:bg-black", className)}>
      {children}
    </div>)
  );
};