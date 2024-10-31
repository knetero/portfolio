import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";

export function Home() {
  return (
    (<BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2
        className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-500 to-neutral-100  dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Crafting User <br /> Experiences for the Web.
      </h2>
      <p
        className="max-w-xl mx-auto text-sm md:text-lg text-neutral-200 dark:text-neutral-400 text-center">
        Get the best advices from our experts, including expert artists,
        painters, marathon enthusiasts and RDX, totally free.
      </p>
    </BackgroundLines>)
  );
}

export default Home;
