"use client";
import React from "react";
import { WobbleCard } from "./ui/wobble-card";
import { Button } from "./ui/button";
import { ArrowUpRight } from 'lucide-react';


export function WobbleCardDemo() {
  return (
    (<div
      className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto  w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-3 bg-neutral-900/50 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2
            className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Lets Create Something Amazing Together.
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
           Ready to elevate your project from concept to completion? Let's connect and explore the possibilities.
          </p>
        </div>
       
         <Button
            className="relative mt-6 sm:absolute sm:mt-0 sm:top-7 sm:right-10 text-sm sm:text-md bg-white text-black font-bold hover:bg-gray-200 transition-colors duration-200 w-32 sm:w-40 h-10 sm:h-12 rounded-lg flex items-center justify-center gap-2"
         >
            Contact Me
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
         </Button>
      </WobbleCard>
    </div>)
  );
}
