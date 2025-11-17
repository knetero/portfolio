"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import SlideTextButton from "./kokonutui/slide-text-button";


const smoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  target: string,
) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  if (target === "resume" || target.includes("AbdellahResume.pdf")) {
    window.open("/AbdellahResume.pdf", "_blank");
  } else {
    const el = document.getElementById(target);
    if (el) {
      const headerOffset = 64;
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
};

/* --------------------------------------------------------------------------
 * Core components from the provided UI snippet (slightly adapted)
 * ------------------------------------------------------------------------*/
interface NavbarWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const NavbarWrapper = ({ children, className }: NavbarWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-4 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.nav
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34,42,53,0.06), 0 1px 1px rgba(0,0,0,0.05), 0 0 0 1px rgba(34,42,53,0.04), 0 0 4px rgba(34,42,53,0.08), 0 16px 68px rgba(47,48,55,0.05), 0 1px 0 rgba(255,255,255,0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      style={{ minWidth: "780px" }}
      data-visible={visible}
      className={cn(
        "group relative mx-auto hidden max-w-7xl flex-row items-center justify-between rounded-full bg-black px-4 py-2 lg:flex",
        visible && "bg-black",
        className,
      )}
    >
      {children}
    </motion.nav>
  );
};

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}

const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium transition lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          key={item.name}
          href={item.link}
          onClick={(e) => {
            if (onItemClick) onItemClick();
            smoothScroll(e, item.link.replace("#", ""));
          }}
          onMouseEnter={() => setHovered(idx)}
          className={cn(
            "relative px-4 py-2 transition-colors",
            // default states based on nav visibility
            "group-data-[visible=false]:text-white group-data-[visible=false]:hover:text-gray-300",
            "group-data-[visible=true]:text-white group-data-[visible=true]:hover:text-gray-300",
            // ensure readable colour when pill is active
            hovered === idx && "!text-black dark:!text-white"
          )}
        >
          {hovered === idx && (
            <motion.span
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

const NavbarLogo = () => (
  <a
    href="#home"
    className="relative z-20 mr-4 flex items-center space-x-2 rounded-lg bg-transparent p-1"
    onClick={(e) => smoothScroll(e, "home")}
  >
    <Image
      src="/Images/Logo.svg"
      alt="Logo"
      width={30}
      height={30}
      className="transition"
    />
    <span className="sr-only">Home</span>
  </a>
);

/* --------------------------------------------------------------------------
 * Public component composing everything together
 * ------------------------------------------------------------------------*/

export default function ResizableNavbar() {
  const links = [
    { name: "Home", link: "#home" },
    { name: "Projects", link: "#projects" },
    { name: "About", link: "#about" },
    { name: "Skills", link: "#skills" },
    { name: "Resume", link: "/AbdellahResume.pdf" },
  ];

  // Mobile state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop navbar (lg and up) */}
      <div className="hidden lg:block">
        <NavbarWrapper>
          <NavBody>
            <NavbarLogo />
            <NavItems items={links} />
            <div className="relative z-50 ml-auto flex-shrink-0">
              <SlideTextButton
                text="Contact Me"
                hoverText="Let's Talk"
                href="#contact"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => smoothScroll(e, "contact")}
                className="h-[36px] min-w-0 w-auto px-4 py-2 bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black dark:hover:bg-white/90 text-sm font-bold shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset] md:min-w-0"
              />
            </div>
          </NavBody>
        </NavbarWrapper>
      </div>

      {/* Mobile navbar (below lg) */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-black px-4 py-4 lg:hidden">
        <NavbarLogo />
        <button onClick={() => setIsOpen((p) => !p)} aria-label="Toggle Menu" className="text-white focus:outline-none">
          {isOpen ? <IconX className="h-6 w-6" /> : <IconMenu2 className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center space-y-6 lg:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.name}
                href={l.link}
                className="text-xl text-white font-light hover:text-gray-300"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  setIsOpen(false);
                  smoothScroll(e, l.link.replace("#", ""));
                }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.1 + i * 0.05 } }}
              >
                {l.name}
              </motion.a>
            ))}
            <SlideTextButton
              text="Contact Me"
              hoverText="Let's Talk"
              href="#contact"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { setIsOpen(false); smoothScroll(e, "contact"); }}
              className="h-[36px] min-w-0 px-4 py-2 bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black dark:hover:bg-white/90 text-sm font-bold shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 