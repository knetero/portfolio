import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from 'next/image';

export function Projects() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-8 w-auto mx-auto">
      <h2
          className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans py-4 md:py-6 relative z-20 font-bold tracking-tight"
        >
          Featured Projects
        </h2>
        <p className="bg-clip-text text-transparent text-center w-[95%] bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-lg sm:text-2xl tracking-tight">
          Explore a curated selection of projects <br className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white"/> That showcase the power of creativity and innovation.
        </p>
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""} />
        ))}
    </BentoGrid>
        </div>
  );
}
const Skeleton = () => (
  <div 
    className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 "></div>
);
const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-white" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-white" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-white" />,
  },
  {
    title: "Ping Pong Game",
    description:
      "Understand the impact of effective communication in our lives.",
    header: (
      <div className="flex justify-center bg-[#9FB3C0] h-full min-h-[7rem]">
        <Image 
          src="/Images/pong.jpeg" 
          className="w-[80%] h-[98%] min-h-[6rem] " 
          alt="pingpong" 
          width={200} 
          height={200} 
        />
      </div>
    ),
    icon: <IconTableColumn className="h-4 w-4 text-white" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-white" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-white" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-white" />,
  },
];
