import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandLinkedin,
  IconFile,
} from "@tabler/icons-react";
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
      href: "/AbdellahResume.pdf",
    },
  ];
  return (
    (<div className="flex items-center justify-center pt-5 w-[20%] ">
      <FloatingDock
        items={links} />
    </div>)
  );
}
