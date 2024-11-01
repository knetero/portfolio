'use client';

import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { motion } from "framer-motion";




export function Home() {
  return (
    <>
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2
        className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Crafting User <br /> Experiences for the Web.
      </h2>
      <p
        className="max-w-xl mx-auto text-sm md:text-lg text-neutral-300 dark:text-neutral-400 text-center">
       I architect immersive digital experiences,weaving cutting-edge code with elegant design to create interfaces that captivate and perform.
      </p>
      
    <div className="pointer-events-auto">
      <motion.div 
        className="flex flex-row items-center justify-center space-x-7 mt-10 w-full"
      >
        <button className="bg-white text-black w-[120px] h-[40px] sm:w-[145px] sm:h-[40px] text-sm sm:text-md cursor-pointer hover:bg-gray-200 transition-colors duration-200 rounded-lg">Explore my work</button>
        <button className="bg-white text-black w-[120px] h-[40px] sm:w-[130px] sm:h-[40px] text-sm sm:text-md cursor-pointer hover:bg-gray-200 transition-colors duration-200 rounded-lg">Get in Touch</button>
      </motion.div>
    </div>
    </BackgroundLines>
    </>
  );
}

export default Home;
