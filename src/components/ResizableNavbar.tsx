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

/* --------------------------------------------------------------------------
 * Helper: smooth scroll to page sections or open resume in new tab
 * ------------------------------------------------------------------------*/
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
    <>
      {/* SVG filter for liquid glass displacement effect */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="liquidGlassFilter">
            <feTurbulence 
              type="turbulence" 
              baseFrequency="0.01" 
              numOctaves="2" 
              result="turbulence" 
            />
            <feDisplacementMap 
              in="SourceGraphic"
              in2="turbulence"    
              scale="50" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      <motion.nav
        animate={{
          width: visible ? "40%" : "100%",
          y: visible ? 20 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 50 }}
        style={{ 
          minWidth: "780px",
          backdropFilter: "brightness(1.1) blur(10px) url(#liquidGlassFilter)",
          WebkitBackdropFilter: "brightness(1.1) blur(10px)",
          filter: "drop-shadow(-8px -10px 46px rgba(0, 0, 0, 0.37))",
          boxShadow: visible
            ? "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)"
            : "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.5), inset 0 0 8px 1px rgba(255, 255, 255, 0.5)",
        }}
        data-visible={visible}
        className={cn(
          "group relative mx-auto hidden max-w-7xl flex-row items-center justify-between rounded-full px-4 py-2 lg:flex overflow-hidden",
          "border border-white/50",
          "bg-white/10",
          className,
        )}
      >
        <div className="relative z-10 flex w-full items-center justify-between">
          {children}
        </div>
      </motion.nav>
    </>
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
            "relative px-4 py-2 transition-all duration-300",
            // default states - white text with glass effect
            "text-white/90 hover:text-white hover:scale-105 font-medium drop-shadow-lg",
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

const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (React.ComponentPropsWithoutRef<"a"> | React.ComponentPropsWithoutRef<"button">)) => {
  const baseStyles =
    "inline-block cursor-pointer rounded-md px-4 py-2 text-center text-sm font-bold transition duration-200 hover:-translate-y-0.5";

  const variantStyles = {
    primary:
      "bg-white/10 text-white border border-white/50 font-semibold hover:bg-white/20 hover:scale-105 transition-all",
    secondary: "bg-transparent text-white border border-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  } as const;

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      style={{
        backdropFilter: "brightness(1.1) blur(10px)",
        WebkitBackdropFilter: "brightness(1.1) blur(10px)",
        boxShadow: "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)",
        filter: "drop-shadow(-4px -5px 20px rgba(0, 0, 0, 0.3))",
        ...("style" in props && props.style ? props.style : {}),
      }}
      {...props}
    >
      {children}
    </Tag>
  );
};

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
            <div className="ml-auto">
              <NavbarButton onClick={(e: React.MouseEvent<HTMLButtonElement>) => smoothScroll(e, "contact")}>Contact Me</NavbarButton>
            </div>
          </NavBody>
        </NavbarWrapper>
      </div>

      {/* Mobile navbar (below lg) */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 lg:hidden">
        <NavbarLogo />
        <button 
          onClick={() => setIsOpen((p) => !p)} 
          aria-label="Toggle Menu" 
          className="text-white focus:outline-none p-2 rounded-xl border border-white/50 hover:bg-white/20 transition-all"
          style={{
            backdropFilter: "brightness(1.1) blur(10px)",
            WebkitBackdropFilter: "brightness(1.1) blur(10px)",
            boxShadow: "inset 4px 4px 0px -4px rgba(255, 255, 255, 0.6), inset 0 0 6px 1px rgba(255, 255, 255, 0.6)",
            filter: "drop-shadow(-4px -5px 20px rgba(0, 0, 0, 0.3))",
          }}
        >
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 lg:hidden"
          >
            {/* Liquid glass backdrop layers */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
            
            <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.name}
                  href={l.link}
                  className="text-2xl text-white hover:text-white/90 font-light transition-all duration-300 inline-block px-8 py-3 rounded-2xl hover:scale-110 border border-transparent hover:border-white/50"
                  style={{
                    backdropFilter: "brightness(1.05) blur(8px)",
                    WebkitBackdropFilter: "brightness(1.05) blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "inset 4px 4px 0px -4px rgba(255, 255, 255, 0.6), inset 0 0 6px 1px rgba(255, 255, 255, 0.6)";
                    e.currentTarget.style.filter = "drop-shadow(-4px -5px 20px rgba(0, 0, 0, 0.3))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.filter = "";
                  }}
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
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.1 + links.length * 0.05 } }}
              >
                <NavbarButton onClick={(e: React.MouseEvent<HTMLButtonElement>) => { setIsOpen(false); smoothScroll(e, "contact"); }}>
                  Contact Me
                </NavbarButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 