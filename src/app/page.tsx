'use client'

import React, { useState, useEffect } from 'react'
import { Home } from "@/components/Home"
import { Projects } from "@/components/Projects"
import { motion, useScroll, useTransform } from "framer-motion"
import About from "@/components/about"
import { WobbleCardDemo } from "@/components/woobleCard"
import LogoCarousel from "@/components/logoCarousel"
import InfiniteSlider from "@/components/InfiniteSlider"

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // Adjust this breakpoint as needed
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const createScrollEffect = (start: number, end: number) => {
    const mobileStart = start * 0.7
    const mobileEnd = end * 0.7

    return {
      opacity: useTransform(
        scrollYProgress, 
        isMobile ? [mobileStart, Math.min(mobileStart + 0.1, mobileEnd)] : [start, Math.min(start + 0.1, end)],
        [0.3, 1]
      ),
      translateY: useTransform(
        scrollYProgress,
        isMobile ? [mobileStart, Math.min(mobileStart + 0.1, mobileEnd)] : [start, Math.min(start + 0.1, end)],
        ['10px', '0px']
      ),
    }
  }

  const projectsEffect = createScrollEffect(0.1, 0.4)
  const aboutEffect = createScrollEffect(0.3, 0.6)
  const contactEffect = createScrollEffect(0.5, 0.8)

  const sectionStyle = (effect: ReturnType<typeof createScrollEffect>) => ({
    ...effect,
    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
  })

  return (
    <div className="flex flex-col min-h-screen ">
      <section
        className="flex-grow relative"
        id="home"
      >
        <Home />
      </section>
      
      <motion.section
        className="w-full py-8 md:py-16 lg:py-24 relative"
        style={sectionStyle(projectsEffect)}
        id="projects"
      >
        <Projects />
      </motion.section>

      <motion.section
        className="w-full py-8 md:py-16 lg:py-24 relative"
        style={sectionStyle(aboutEffect)}
        id="about"
      >
        <About />
      </motion.section>
      <motion.section
          className="w-full relative h-[400px]"
          style={sectionStyle(projectsEffect)}
        >
          <InfiniteSlider />
      </motion.section>
      <motion.section>
        <LogoCarousel />
      </motion.section>
      <motion.section
        className="w-full py-8 md:py-16 lg:py-24 relative"
        style={sectionStyle(contactEffect)}
        id="contact"
      >
        <WobbleCardDemo />
      </motion.section>
    </div>
  )
}