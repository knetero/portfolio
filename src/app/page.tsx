'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Home } from "@/components/Home"
import { motion, useScroll, useTransform } from "framer-motion"

// Dynamically import components below the fold for better initial load
const Projects = dynamic(() => import("@/components/Projects").then(mod => ({ default: mod.Projects })), {
  loading: () => <div className="w-full py-8 md:py-16 lg:py-24 flex items-center justify-center"><div className="animate-pulse text-neutral-400">Loading...</div></div>,
});

const About = dynamic(() => import("@/components/about"), {
  loading: () => <div className="w-full py-8 md:py-16 lg:py-24 flex items-center justify-center"><div className="animate-pulse text-neutral-400">Loading...</div></div>,
});

const InfiniteSlider = dynamic(() => import("@/components/InfiniteSlider"), {
  ssr: false,
  loading: () => null,
});

const LogoCarousel = dynamic(() => import("@/components/logoCarousel"), {
  ssr: false,
  loading: () => null,
});

const WobbleCardDemo = dynamic(() => import("@/components/woobleCard").then(mod => ({ default: mod.WobbleCardDemo })), {
  loading: () => <div className="w-full py-8 flex items-center justify-center"><div className="animate-pulse text-neutral-400">Loading...</div></div>,
});

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    
    // Debounce resize event for better performance
    let resizeTimer: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkMobile, 150)
    }

    window.addEventListener('resize', debouncedResize, { passive: true })
    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', debouncedResize)
    }
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
      y: useTransform(
        scrollYProgress,
        isMobile ? [mobileStart, Math.min(mobileStart + 0.1, mobileEnd)] : [start, Math.min(start + 0.1, end)],
        ['20px', '0px']
      ),
    }
  }

  const projectsEffect = createScrollEffect(0.1, 0.4)
  const aboutEffect = createScrollEffect(0.3, 0.6)
  const sliderEffect = createScrollEffect(0.5, 0.7)
  const contactEffect = createScrollEffect(0.7, 0.9)

  const sectionStyle = (effect: ReturnType<typeof createScrollEffect>) => ({
    ...effect,
    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
  })

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

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
        style={sectionStyle(sliderEffect)}
      >
        <InfiniteSlider />
      </motion.section>

      <motion.section
        style={{
          opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 1]),
        }}
      >
        <LogoCarousel />
      </motion.section>

      <motion.section
        className="w-full py-8 md:py-16 lg:py-24 relative "
        style={sectionStyle(contactEffect)}
        id="contact"
      >
        <motion.div

        >
          <WobbleCardDemo />
        </motion.div>
      </motion.section>
    </div>
  )
}