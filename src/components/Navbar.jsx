"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

// Enhanced smooth scroll function
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

  const buttonVariants = {
    tap: { scale: 0.95 },
    hover: { scale: 1.05 },
  }

  return (
    <header className="fixed top-0 z-50 w-full w-[100vw] flex items-center justify-center bg-black sm:bg-transparent text-white pt-4">
      <div className="flex flex-row h-16 items-center justify-between w-full px-4 md:px-6 max-w-[2000px]">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/Images/Logo.svg" alt="Logo" width={40} height={40} />
        </Link>
        <nav className="hidden md:flex flex flex-col items-center h-16 w-[500px] justify-center space-x-4 rounded-full bg-white/30 backdrop-blur-lg  dark:border-neutral-800">
          <NavigationMenu>
            <NavigationMenuList>
              {[
                { href: "/", label: "Home", id: "home" },
                { href: "#projects", label: "Projects", id: "projects" },
                { href: "/about", label: "About", id: "about" },
                { href: "/skills", label: "Skills", id: "skills" },
                { href: "/resume", label: "Resume", id: "resume" },
              ].map((link) => (
                <NavigationMenuItem key={link.id}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink 
                      className="group inline-flex h-9 w-max items-center justify-center text-gray-300 hover:text-white transition-colors duration-200"
                      onClick={(e) => smoothScroll(e, link.id)}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="hidden md:block">
          <Button 
            className="bg-white text-black hover:bg-gray-200 transition-colors duration-200"
            onClick={(e) => smoothScroll(e, "contact")}
          >
            Contact Me
          </Button>
        </div>
        <motion.button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          variants={buttonVariants}
          whileTap="tap"
          whileHover="hover"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-50 bg-black md:hidden"
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
                  { href: "/", label: "Home", id: "home" },
                  { href: "/about", label: "About", id: "about" },
                  { href: "#projects", label: "Projects", id: "projects" },
                ].map((link, i) => (
                  <motion.div key={link.href} custom={i} variants={linkVariants}>
                    <Link
                      href={link.href}
                      className="text-xl text-white hover:text-gray-300 transition-colors duration-200 font-light"
                      onClick={(e) => {
                        smoothScroll(e, link.id)
                        toggleMenu()
                      }}
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
                  onClick={(e) => {
                    smoothScroll(e, "contact")
                    toggleMenu()
                  }}
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