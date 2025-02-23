import { useEffect, useRef, useState } from 'react';
import Image from "next/image";

const LogoCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const logos = [
    { src: "/Images/next2.svg", alt: "Next.js" },
    { src: "/Images/reactjs.svg", alt: "React.js" },
    { src: "/Images/tailwindcss.svg", alt: "Tailwind CSS" },
    { src: "/Images/ts.svg", alt: "TypeScript" },
    { src: "/Images/git.svg", alt: "Git" },
    { src: "/Images/html.svg", alt: "HTML" },
    { src: "/Images/js.svg", alt: "javascipt" },
    { src: "/Images/vscode.svg", alt: "vscode" },
    { src: "/Images/docker.svg", alt: "Docker" },
    { src: "/Images/figma.svg", alt: "Figma" },
    { src: "/Images/angular.svg", alt: "Angular" },
    { src: "/Images/vuejs.svg", alt: "Vue.js" },
  ];

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const checkPosition = () => {
      if (!isHovered) {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        } else if (scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft = 1;
        }
      }
    };

    const scroll = () => {
      if (!isHovered && scrollContainer) {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 15);
    const checkInterval = setInterval(checkPosition, 50);

    return () => {
      clearInterval(interval);
      clearInterval(checkInterval);
    };
  }, [isHovered]);

  return (
    <section className="bg-black text-white pt-8 pb-4" id="skills">
      <div className="container mx-auto px-4">
        <h2 className="bg-clip-text pb-8 text-transparent bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-center">
          My Tech Stack
        </h2>
        <p className="bg-clip-text pb-10 text-transparent bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-center pb-20 text-neutral-300 dark:text-neutral-400 font-light text-lg sm:text-xl md:text-xl lg:text-2xl">
          Discover the tools and technologies <br /> I leverage to build outstanding digital experiences.
        </p>
        
        <div className="relative">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />
          
          <div 
            ref={containerRef}
            className="flex overflow-x-hidden relative w-full h-32"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ 
              scrollBehavior: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 mx-8 transition-transform duration-300 w-[54px] h-[54px] sm:w-[80px] sm:h-[80px]"
              >
                <Image 
                  src={logo.src} 
                  alt={logo.alt} 
                  width={80} 
                  height={50} 
                  className="h-16 w-auto"
                  loading={index < logos.length ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;