'use client'

import React, { useState, useEffect } from 'react'
import { Home } from "@/components/Home"
import { Projects } from "@/components/Projects"
import { motion, useScroll, useTransform } from "framer-motion"
import About from "@/components/about"
import { WobbleCardDemo } from "@/components/woobleCard"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      className="flex flex-col min-h-screen"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.section
        className="flex-grow relative"
        variants={sectionVariants}
        style={{ opacity, scale, y }}
      >
        <section id="home">
          <Home/>
        </section>
      </motion.section>
      <motion.section
        className="w-full py-16 md:py-24 relative"
        variants={sectionVariants}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="projects"
      >
        <Projects />
        <motion.section
        className="w-full py-16 md:py-24 relative"
        variants={sectionVariants}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="about"
        >
          <About />
        </motion.section>
        <motion.section
        className="w-full py-16 md:py-24 relative"
        variants={sectionVariants}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="contact"
        >
          <WobbleCardDemo />
        </motion.section>
      </motion.section>
    </motion.div>
  )
}