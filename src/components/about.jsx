'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function About() {
  const technologies = [
    { name: "NextJs", id: 6 },
    { name: "React", id: 3 },
    { name: "JavaScript (ES6+)", id: 1 },
  ]

  return (
    <section className="w-full min-h-screen bg-black text-neutral-300 py-20 px-4 md:px-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <motion.h2 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight"
            >
              About Me
            </motion.h2>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-200 dark:to-white space-y-4 text-neutral-300 dark:text-neutral-400 font-light"
            >
              <p>
                Hey! I'm Abdellah, a developer focused on building modern web experiences. 
                I'm passionate about creating clean, efficient applications using Next.js 
                and React. What started as curiosity about how websites work has grown into 
                a deep interest in frontend development and user experience.
              </p>
              <p>
                Recently, I developed{' '}
                <Link href="#" className="text-white hover:underline font-medium">ft_transcendence</Link>,{' '}
                a real-time multiplayer ping pong platform built with Next.js and React. 
                The project features live gameplay, social networking capabilities, and an 
                integrated chat system, demonstrating my ability to create interactive, 
                full-stack web applications. I'm currently focused on building accessible, 
                engaging user experiences and exploring new ways to push the boundaries of 
                web technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-neutral-100 mb-3">Here are a few technologies I've been working with recently:</h3>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {technologies.map((tech) => (
                  <li key={tech.id} className="flex items-center space-x-2 font-bold">
                    <span className="text-white">▹</span>
                    <span>{tech.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <div className="relative w-full max-w-[500px] mx-auto aspect-square group">
              <div className="absolute inset-0 bg-white/20 translate-x-4 translate-y-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 w-full h-full rounded-lg overflow-hidden border-2 border-white">
                <Image
                  src="/Images/avatar.jpg"
                  alt="Profile"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}