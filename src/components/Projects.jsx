"use client"

import React from "react"
import { BentoGrid, BentoGridItem } from "./ui/bento-grid"
import {
  IconDeviceNintendo,
  IconPingPong,
  IconBrandDocker,
  IconAlignBoxLeftBottom,
  IconMessage,
  IconMovie,
  IconMusic,
  IconUser,
  IconHaze,
} from "@tabler/icons-react"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function Projects() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-12 w-auto mx-auto py-10">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans py-4 md:py-6 relative z-20 font-bold tracking-tight">
        Featured Projects
      </h2>
      <p className="bg-clip-text text-transparent text-center w-[95%] bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-lg sm:text-2xl tracking-tight">
        Explore a curated selection of projects <br className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white"/> That showcase the power of creativity and innovation.
      </p>
      
      <BentoGrid className="max-w-5xl sm:mx-auto mx-[20px]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={
              <div className="flex items-center gap-2">
                {item.title}
                <ProjectModal item={item} />
              </div>
            }
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={`${i === 3 || i === 6 ? "md:col-span-2" : ""} bg-black group transition-all ease-out duration-300 border border-neutral-900 hover:border-neutral-700`}
          />
        ))}
      </BentoGrid>
    </div>
  )
}

const ImageContainer = ({ src, alt }) => (
  <div className="w-full h-full grid place-items-center overflow-hidden rounded-xl bg-neutral-900">
    <div className="w-full h-0 pt-[40.25%] relative">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-400 ease-out group-hover:scale-105"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      />
    </div>
  </div>
)

const ProjectModal = ({ item }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow || "";
    const originalBodyOverflow = document.body.style.overflow || "";

    if (isOpen) {
      // Prevent native scroll via CSS
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      // Flag for Lenis / libraries that scroll is locked
      document.body.setAttribute("data-scroll-locked", "1");
      document.body.setAttribute("data-lenis-prevent", "true");

      // Pause Lenis smooth scroll if available
      // @ts-expect-error - Using global Lenis instance exposed for modal control
      window.__lenis?.stop?.();
    } else {
      // Resume scroll
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;

      document.body.removeAttribute("data-scroll-locked");
      document.body.removeAttribute("data-lenis-prevent");

      // @ts-expect-error - Using global Lenis instance exposed for modal control
      window.__lenis?.start?.();
    }

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;

      document.body.removeAttribute("data-scroll-locked");
      document.body.removeAttribute("data-lenis-prevent");

      // @ts-expect-error - Using global Lenis instance exposed for modal control
      window.__lenis?.start?.();
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors">
          <ArrowUpRight className="h-4 w-4" />
          <span className="sr-only text-white">Learn more about {item.title}</span>
        </Button>
      </DialogTrigger>
      <AnimatePresence>
        {isOpen && (
          <DialogContent
            className="max-w-[95vw] xs:max-w-[90vw] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] max-h-[90vh] w-full p-0 overflow-y-auto md:overflow-hidden scrollbar-hide bg-neutral-900 text-neutral-100 border border-neutral-800"
            forceMount
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              <div className="relative w-full h-32 xs:h-40 sm:h-48 md:h-52">
                <Image
                  src={item.header.props.src}
                  alt={item.header.props.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, 800px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
              </div>
              <DialogHeader className="px-5 py-4 sm:px-6 md:px-8">
                <DialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3 mb-2">
                  {item.icon}
                  {item.title}
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base text-neutral-400 mt-1">
                  {item.description}
                </DialogDescription>
              </DialogHeader>
              <div className="px-5 sm:px-6 md:px-8 flex-1 flex flex-col md:flex-row md:gap-10 pb-4">
                <div className="md:flex-1 mb-4 md:mb-0">
                  <h4 className="text-base sm:text-lg font-semibold mb-3 text-white">Project Details:</h4>
                  <p className="text-sm sm:text-base text-neutral-300 line-clamp-4 md:line-clamp-none">{item.details}</p>
                </div>
                <div className="mt-5 md:mt-0 md:flex-1">
                  <h4 className="text-base sm:text-lg font-semibold mb-3 text-white">Technologies Used:</h4>
                  <ul className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, index) => (
                      <motion.li
                        key={index}
                        className="bg-neutral-800 rounded-full px-3 py-1.5 text-xs sm:text-sm text-neutral-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        {tech}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-5 sm:p-6 mt-auto bg-neutral-800 flex flex-col xs:flex-row gap-3">
                {item.link && (
                  <Button
                    onClick={() => window.open(item.link, '_blank')}
                    className="w-full bg-neutral-700 text-neutral-100 text-sm sm:text-base border border-neutral-600 hover:bg-neutral-600 hover:text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition-all duration-300"
                  >
                    View Project
                  </Button>
                )}
                <Button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-white text-neutral-900 text-sm sm:text-base hover:bg-neutral-200 font-semibold py-2 px-3 sm:px-4 rounded-lg transition-all duration-300"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

const items = [
  {
    title: "TACTUNE",
    description: "A dynamic sonic sound branding agency site featuring interactive project gallery and client request form.",
    header: <ImageContainer src="/Images/Tactune.png" alt="TACTUNE - Sound Branding Agency" />,
    icon: <IconMusic className="h-4 w-4 text-white" />,
    details: "As a Freelance Frontend Developer, I developed a modern sound branding agency website using Next.js and Tailwind CSS. The site features smooth Framer Motion animations, an interactive project gallery, and a client request system. Achieved a 95% Lighthouse score through performance optimizations and mobile-first design principles.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design", "Performance Optimization"],
    link: "https://music-mauve-one.vercel.app/",
  },
  {
    title: "WATCHWISE - IMDB CLONE",
    description: "A responsive, modern UI IMDb clone using Next.js and Tailwind CSS, fetching meta-data from TMDB API for trending movies/TV shows and user search results.",
    header: <ImageContainer src="/Images/watchWise.jpg" alt="WATCHWISE - IMDB CLONE" />,
    icon: <IconMovie className="h-4 w-4 text-white" />,
    details: "This project implements user authentication via NextAuth.js, allowing users to create watchlists with persistent storage. Features include real-time search functionality, custom movie/tv show collections, and responsive design for optimal viewing on all devices.",
    technologies: ["Next.js", "Tailwind CSS", "NextAuth.js", "TMDB API"],
    link: "https://watchwise-one.vercel.app/",
  },
  {
    title: "Angular Portfolio",
    description: "A responsive, modern portfolio website built with Angular and Tailwind CSS, showcasing projects and skills.",
    header: <ImageContainer src="/Images/angularPortfolio.png" alt="Angular Portfolio" />,
    icon: <IconUser className="h-4 w-4 text-white" />,
    details: "This project is a responsive, modern portfolio website built with Angular and Tailwind CSS. It showcases projects and skills, providing a clean and professional online presence. Through this project, I practiced Angular fundamentals including components, services,and state management.",
    technologies: ["Angular", "Tailwind CSS", "Responsive Design", "Web Development"],
    link: "https://angular-portfolio-flame-delta.vercel.app/",
  },
  {
    title: "Online PingPong Game",
    description: "A website for playing Ping Pong online, featuring chat and friends functionality.",
    header: <ImageContainer src="/Images/pong2.png" alt="Ping Pong Game" />,
    icon: <IconPingPong className="h-4 w-4 text-white" />,
    details: "This project is a full-stack web application that allows users to play Pong online in real-time. It features user authentication, matchmaking, live gameplay, and a chat system for players to communicate.",
    technologies: ["Next.Js", "React.Js", "Javascipt" , "WebSocket", "HTML5 Canvas", "Tailwind CSS", "Database Management"],
    link: "https://github.com/knetero/PingPong",
  },
  {
    title: "Angular Weather App",
    description: "A weather app that allows users to search for weather information for a specific city.",
    header: <ImageContainer src="/Images/weatherapp.png" alt="Weather App" />,
    icon: <IconHaze className="h-4 w-4 text-white" />,
    details: "This project is a weather app that allows users to search for weather information for a specific city. It uses the OpenWeatherMap API to fetch weather data and displays it in a user-friendly format.",
    technologies: ["Angular", "Tailwind CSS", "OpenWeatherMap API"],
    link: "https://angular-weather-rouge.vercel.app/",
  },
  {
    title: "Minishell",
    description: "An implementation of Bash in C, providing a lightweight shell environment.",
    header: <ImageContainer src="/Images/minishell.png" alt="Minishell" />,
    icon: <IconAlignBoxLeftBottom className="h-4 w-4 text-white" />,
    details: "Minishell is a simplified version of a Unix shell, implemented entirely in C. It supports basic shell functionalities such as command execution, environment variable management, and built-in commands.",
    technologies: ["C", "Process Management", "System Calls", "Parsing"],
    link: "https://github.com/knetero/minishell",
  },
  {
    title: "Internet Relay Chat",
    description: "An implementation of Internet Relay Chat using C++.",
    header: <ImageContainer src="/Images/irc.jpg" alt="Internet Relay Chat" />,
    icon: <IconMessage className="h-4 w-4 text-white" />,
    details: "This project is a fully functional Internet Relay Chat (IRC) server and client implementation. It allows multiple users to communicate in real-time through various channels, supporting private messaging and channel operations.",
    technologies: ["C++", "Socket Programming", "Multi-threading", "Network Protocols"],
    link: "https://github.com/knetero/IRC",
  },
  {
    title: "Cub3d Game",
    description: "An engaging 3D game showcasing innovative design and gameplay.",
    header: <ImageContainer src="/Images/cub3d.png" alt="Cub3d Game" />,
    icon: <IconDeviceNintendo className="h-4 w-4 text-white" />,
    details: "Cub3d is a 3D game engine built from scratch using raycasting techniques. It renders a 3D-like environment from a 2D map, similar to classic games like Wolfenstein 3D.",
    technologies: ["C", "Raycasting", "Computer Graphics", "Game Development"],
    link: "https://github.com/knetero/cub3d",
  },
 
  {
    title: "Inception",
    description: "A project exploring the fundamentals of containerization.",
    header: <ImageContainer src="/Images/Docker.png" alt="Inception" />,
    icon: <IconBrandDocker className="h-4 w-4 text-white" />,
    details: "Inception is a DevOps project focused on containerization using Docker. It involves setting up a small infrastructure composed of different services under specific rules, emphasizing the importance of using Docker Compose.",
    technologies: ["Docker", "Docker Compose", "NGINX", "MariaDB", "WordPress", "Linux"],
    link: "https://github.com/knetero/inception",
  },
  
]