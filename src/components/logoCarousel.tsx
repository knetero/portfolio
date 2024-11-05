'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

const logos = [
  { src: '/Images/nextjs.svg', alt: 'Nextjs' },
  { src: '/Images/tailwindcss.svg', alt: 'tailwindcss' },
  { src: '/Images/reactjs.svg', alt: 'reactjs' },
  { src: '/Images/typescript.svg', alt: 'typescript' },
]

export default function LogoCarousel() {
  const scrollerRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (scrollerRef.current) {
      const scroller = scrollerRef.current
      const scrollerContent = Array.from(scroller.children)
      
      // Create two more sets of the logos for seamless scrolling
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        scroller.appendChild(duplicatedItem)
      })
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        scroller.appendChild(duplicatedItem)
      })
    }
  }, [])

  return (
    <div className="w-full py-10  h-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-600">
        Discover the innovative technologies and tools I leverage to create outstanding digital experiences.
      </h2>
      <div className="relative overflow-hidden">
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul ref={scrollerRef} className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {logos.map((logo, index) => (
              <li key={index} className="flex-shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={100}
                  height={100}
                  className="h-24 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 w-[90px] h-[90px]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx global>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 20s linear infinite;
        }
      `}</style>
    </div>
  )
}