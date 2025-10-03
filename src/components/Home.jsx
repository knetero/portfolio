'use client';
import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Spotlight } from "@/components/ui/spotlight-new";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from 'next/navigation'
import Image from "next/image";



const smoothScroll = (e, target) => {
  e.preventDefault()
  const element = document.getElementById(target)
  if (element) {
    const headerOffset = 64;
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    })
  }
}

export function Home() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname])

  

  return (
    <BackgroundLines className="flex flex-col items-center justify-center w-full min-h-screen p-4 md:p-8">
      <Spotlight />
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            delay: 0.2, 
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans py-4 md:py-6 relative z-20 font-bold tracking-tight"
        >
          Crafting User <br className="hidden sm:inline " /> Experiences for the Web.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            delay: 0.4,
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="max-w-xl mx-auto  text-base sm:text-lg text-neutral-300 dark:text-neutral-400 mt-4 md:mt-6"
        >
          I architect immersive digital experiences, weaving cutting-edge code with elegant design to create interfaces that captivate and perform.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8 md:mt-10 motion-preset-oscillate motion-duration-2000 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            delay: 0.6,
            duration: 0.5,
            ease: "easeInOut"
          }}
        >
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              delay: 0.7,
              duration: 0.5,
              ease: "easeInOut"
            }}
            className=" flex flex-row items-center gap-2 justify-center bg-white text-black w-full sm:w-auto
            h-12 px-6 text-base font-medium cursor-pointer hover:bg-gray-200 transition-colors duration-200 rounded-full shadow shadow-white/30 shadow-lg"
            onClick={(e) => smoothScroll(e, "projects")}
          >
            Explore my work
            <Image src="/Images/arrow.svg" alt="arrow" width={8} height={8} />
          </motion.button>
        </motion.div>
      </div>
    </BackgroundLines>
  );
}