"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.1 + i * 0.1 },
    }),
  }

  return (
    <header className="fixed top-0 z-50 w-full flex items-center justify-center bg-black text-white">
      <div className="flex flex-row h-16 items-center justify-between w-full px-4 md:px-6 max-w-[2000px]">
        <Link href="/" className="flex items-center space-x-2">
        <Image src="./Images/Logo.svg" alt="Logo" width={40} height={40} />
        </Link>
        <nav className="hidden md:flex space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px]">
                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        href="/about"
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 hover:bg-accent"
                      >
                         <div className="text-sm font-medium leading-none group-hover:underline">Experience</div>
                         <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          View my professional journey and expertise
                        </div>
                      </Link>
                      <Link
                        href="/skills"
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 hover:bg-accent"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">Skills</div>
                        <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Explore my technical skills and competencies
                        </div>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/projects" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center text-gray-300 hover:text-white transition-colors duration-200">
                    Projects
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center text-gray-300 hover:text-white transition-colors duration-200">
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="hidden md:block">
          <Button className="bg-white text-black hover:bg-gray-200 transition-colors duration-200">
            Contact Me
          </Button>
        </div>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 md:hidden"
          >
            <div className="flex flex-col h-full justify-center items-center relative">
              <motion.button
                className="absolute top-4 right-4 text-white focus:outline-none"
                onClick={toggleMenu}
                aria-label="Close menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                <X className="h-8 w-8" />
              </motion.button>
              <nav className="flex flex-col space-y-6 text-center">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About" },
                  { href: "/projects", label: "Projects" },
                  { href: "/blog", label: "Blog" },
                ].map((link, i) => (
                  <motion.div key={link.href} custom={i} variants={linkVariants}>
                    <Link
                      href={link.href}
                      className="text-2xl font-semibold text-white hover:text-gray-300 transition-colors duration-200"
                      onClick={toggleMenu}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                variants={linkVariants}
                custom={4}
                className="mt-8"
              >
                <Button
                  className="bg-white text-black hover:bg-gray-200 transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Contact Me
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}