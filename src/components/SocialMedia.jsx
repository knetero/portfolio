import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconBrandLinkedin,
  IconFile,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export function SocialMedia() {
  const links = [
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://linkedin.com/in/abdellah-azeroual-633b5a17a",
      target: "_blank",
    rel: "noopener noreferrer",
    },

    {
        title: "GitHub",
        icon: (
            <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "https://github.com/knetero",
        target: "_blank",
        rel: "noopener noreferrer",
    },
    {
        title: "Twitter",
        icon: (
            <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "https://x.com/azero853",
    },
    {
      title: "Resume",
      icon: (
        <IconFile className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];
  return (
    (<div className="flex items-center justify-center pt-5 w-[20%] ">
      <FloatingDock
        // only for demo, remove for production
        mobileClassName="translate-y-20"
        items={links} />
    </div>)
  );
}
