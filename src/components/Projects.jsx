import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";

export function Projects() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-12 w-auto mx-auto">
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
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
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
);

const items = [
  {
    title: "Internet Relay Chat",
    description: "An implementation of Internet Relay Chat using C++.",
    header: <ImageContainer src="/Images/irc.png" alt="Internet Relay Chat" />,
    icon: <IconClipboardCopy className="h-4 w-4 text-white" />,
  },
  {
    title: "Minishell",
    description: "An implementation of Bash in C, providing a lightweight shell environment.",
    header: <ImageContainer src="/Images/minishell.png" alt="Minishell" />,
    icon: <IconFileBroken className="h-4 w-4 text-white" />,
  },
  {
    title: "Cub3d Game",
    description: "An engaging 3D game showcasing innovative design and gameplay.",
    header: <ImageContainer src="/Images/cub3d.png" alt="Cub3d Game" />,
    icon: <IconSignature className="h-4 w-4 text-white" />,
  },
  {
    title: "Online Pong Game",
    description: "A website for playing Ping Pong online, featuring chat and friends functionality.",
    header: <ImageContainer src="/Images/pong2.png" alt="Ping Pong Game" />,
    icon: <IconTableColumn className="h-4 w-4 text-white" />,
  },
  {
    title: "Inception",
    description: "A project exploring the fundamentals of containerization.",
    header: <ImageContainer src="/Images/Docker.png" alt="Inception" />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-white" />,
  },
];