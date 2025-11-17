"use client";
import React from "react";
import { WobbleCard } from "./ui/wobble-card";
import { ArrowUpRight } from 'lucide-react';
import { SocialMedia } from "@/components/SocialMedia";
import SlideTextButton from "./kokonutui/slide-text-button";




export function WobbleCardDemo() {
  return (
    (<div
      className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full motion-preset-oscillate motion-duration-[8000ms]">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-3 bg-neutral-900/50 min-h-[200px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2
            className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Lets Create Something Amazing Together.
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
           Ready to elevate your project from concept to completion? Let's connect and explore the possibilities.
          </p>
        </div>
       
        <div className="relative mt-6 sm:absolute sm:mt-0 sm:top-7 sm:right-10">
          <SlideTextButton
            text={
              <span className="flex items-center gap-2">
                Contact Me
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            }
            hoverText={
              <span className="flex items-center gap-2">
                Let's Talk
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            }
            href="mailto:azabdellah044@gmail.com"
            className="h-10 sm:h-12 min-w-0 w-auto px-4 py-2 bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black dark:hover:bg-white/90 text-sm sm:text-md font-bold shadow-lg shadow-white/30 md:min-w-0"
          />
        </div>
         <SocialMedia />
      </WobbleCard>
    </div>)
  );
}
