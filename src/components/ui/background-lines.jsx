"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundLines = ({
  children,
  className,
}) => {
  return (
    (<div
      className={cn("h-[30rem] md:h-screen w-full dark:bg-black", className)}>
      {children}
    </div>)
  );
};