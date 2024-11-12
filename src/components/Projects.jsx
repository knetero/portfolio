"use client"

import React from "react"
import { BentoGrid, BentoGridItem } from "./ui/bento-grid"
import {
  IconDeviceNintendo,
  IconPingPong,
  IconBrandDocker,
  IconAlignBoxLeftBottom,
  IconMessage,
} from "@tabler/icons-react"
import { ArrowUpRight} from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function Projects() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-12 w-auto mx-auto ">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans py-4 md:py-6 relative z-20 font-bold tracking-tight">
        Featured Projects
      </h2>
      <p className="bg-clip-text text-transparent text-center w-[95%] bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-lg sm:text-2xl tracking-tight">
        Explore a curated selection of projects <br className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white"/> That showcase the power of creativity and innovation.
      </p>
      <BentoGrid className="max-w-5xl sm:mx-auto mx-[20px] ">
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
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
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
        className="absolute top-0 left-0 w-full h-full object-cover "
      />
    </div>
  </div>
)

const ProjectModal = ({ item }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-neutral-300  transition-colors">
          <ArrowUpRight className="h-4 w-4" />
          <span className="sr-only text-white">Learn more about {item.title}</span>
        </Button>
      </DialogTrigger>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="max-w-full sm:max-w-[600px] h-[100%] sm:h-auto p-0 overflow-hidden bg-neutral-900 text-neutral-100 border border-neutral-800 " forceMount>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="sm:p-7 p-20 pb-0">
                <DialogTitle className="text-2xl font-bold text-white">
                  {item.title}
                </DialogTitle>
                <DialogDescription className="text-neutral-400 mt-2">
                  {item.description}
                </DialogDescription>
              </DialogHeader>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 text-white ">Project Details:</h4>
                  <p className="text-neutral-300">{item.details}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Technologies Used:</h4>
                  <ul className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, index) => (
                      <motion.li
                        key={index}
                        className="bg-neutral-800 rounded-full px-3 py-1 text-sm text-neutral-300"
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
              <div className="p-6 sm:bg-neutral-800">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-white text-neutral-900 hover:bg-neutral-200 font-semibold py-2 px-4 rounded-lg transition-all duration-300"
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
    title: "Internet Relay Chat",
    description: "An implementation of Internet Relay Chat using C++.",
    header: <ImageContainer src="/Images/irc.png" alt="Internet Relay Chat" />,
    icon: <IconMessage className="h-4 w-4 text-white" />,
    details: "This project is a fully functional Internet Relay Chat (IRC) server and client implementation. It allows multiple users to communicate in real-time through various channels, supporting private messaging and channel operations.",
    technologies: ["C++", "Socket Programming", "Multi-threading", "Network Protocols"],
  },
  {
    title: "Minishell",
    description: "An implementation of Bash in C, providing a lightweight shell environment.",
    header: <ImageContainer src="/Images/minishell.png" alt="Minishell" />,
    icon: <IconAlignBoxLeftBottom className="h-4 w-4 text-white" />,
    details: "Minishell is a simplified version of a Unix shell, implemented entirely in C. It supports basic shell functionalities such as command execution, environment variable management, and built-in commands.",
    technologies: ["C", "Process Management", "System Calls", "Parsing"],
  },
  {
    title: "Cub3d Game",
    description: "An engaging 3D game showcasing innovative design and gameplay.",
    header: <ImageContainer src="/Images/cub3d.png" alt="Cub3d Game" />,
    icon: <IconDeviceNintendo className="h-4 w-4 text-white" />,
    details: "Cub3d is a 3D game engine built from scratch using raycasting techniques. It renders a 3D-like environment from a 2D map, similar to classic games like Wolfenstein 3D.",
    technologies: ["C", "Raycasting", "Computer Graphics", "Game Development"],
  },
  {
    title: "Online Pong Game",
    description: "A website for playing Ping Pong online, featuring chat and friends functionality.",
    header: <ImageContainer src="/Images/pong2.png" alt="Ping Pong Game" />,
    icon: <IconPingPong className="h-4 w-4 text-white" />,
    details: "This project is a full-stack web application that allows users to play Pong online in real-time. It features user authentication, matchmaking, live gameplay, and a chat system for players to communicate.",
    technologies: ["Next.Js", "React.Js", "Javascipt" , "WebSocket", "HTML5 Canvas", "Tailwind CSS", "Database Management"],
  },
  {
    title: "Inception",
    description: "A project exploring the fundamentals of containerization.",
    header: <ImageContainer src="/Images/Docker.png" alt="Inception" />,
    icon: <IconBrandDocker className="h-4 w-4 text-white" />,
    details: "Inception is a DevOps project focused on containerization using Docker. It involves setting up a small infrastructure composed of different services under specific rules, emphasizing the importance of using Docker Compose.",
    technologies: ["Docker", "Docker Compose", "NGINX", "MariaDB", "WordPress", "Linux"],
  },
]