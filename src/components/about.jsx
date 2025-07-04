'use client'

import { motion} from "framer-motion"
import Image from "next/image"
import Link from "next/link"


const smoothScroll = (e, target) => {
  e.preventDefault()
  const element = document.getElementById(target)
  if (element) {
    const headerOffset = 64 // Adjust this value based on your header height
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    })
  }
}


export default function About() {
  const technologies = [
    { name: "Next.js", id: 6 },
    { name: "React", id: 3 },
    { name: "Angular", id: 4 },
    { name: "Vue.js", id: 5 },
    { name: "JavaScript (ES6+)", id: 1 },
    { name: "TailwindCSS", id: 2 },
  ]

  return (
    <section className="w-full min-h-screen text-neutral-300 py-20 px-4 md:px-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <span className="text-sm font-medium text-neutral-400 tracking-widest uppercase">Who I am</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white">
                About Me
              </h2>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-5 text-lg leading-relaxed font-light"
            >
              <p className="text-neutral-100">
                Hey! I'm <span className="font-medium text-white">Abdellah</span>, a developer focused on building modern web experiences. 
                I'm passionate about creating clean, efficient applications using Next.js 
                and React. What started as curiosity about how websites work has grown into 
                a deep interest in frontend development and user experience.
              </p>
              <p className="text-neutral-200">
                Recently, I developed{' '}
                <Link href="#projects" onClick={(e) => smoothScroll(e, "projects")} className="relative text-white font-medium group">
                  ft_transcendence
                  <motion.div 
                    className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300 ease-out"
                  />
                </Link>,{' '}
                a real-time multiplayer ping pong platform built with Next.js and React. 
                The project features live gameplay, social networking capabilities, and an 
                integrated chat system, demonstrating my ability to create interactive, 
                frontend web applications. I'm currently focused on building accessible, 
                engaging user experiences and exploring new ways to push the boundaries of 
                web technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-2"
            >
              <h3 className="text-white font-medium text-lg mb-4 border-l-4 border-neutral-500 pl-3">Technologies I've been working with recently:</h3>
              <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                {technologies.map((tech, index) => (
                  <motion.li
                    key={tech.id}
                    className="flex items-center space-x-2 font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20 
                    }}
                  >
                    <span className="text-white text-lg">▹</span>
                    <span className="text-neutral-100">{tech.name}</span>
                  </motion.li>
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
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-700 to-neutral-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-3" />
              <div className="relative z-10 w-full h-full rounded-lg overflow-hidden border-4 border-neutral-700 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 mix-blend-overlay" />
                <Image
                  src="/Images/MYPIC.jpg"
                  alt="Profile"
                  width={500}
                  height={500}
                  quality={100}
                  priority
                  className="object-cover w-full h-full transition-all duration-300 transform group-hover:scale-105 grayscale-[50%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-full opacity-75 blur-xl " />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-full opacity-75 blur-xl" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}