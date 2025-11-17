import { LogoLoop } from './LogoLoop';

const LogoCarousel = () => {
  const logos = [
    { src: "/Images/next2.svg", alt: "Next.js", width: 80, height: 80 },
    { src: "/Images/reactjs.svg", alt: "React.js", width: 80, height: 80 },
    { src: "/Images/tailwindcss.svg", alt: "Tailwind CSS", width: 80, height: 80 },
    { src: "/Images/ts.svg", alt: "TypeScript", width: 80, height: 80 },
    { src: "/Images/git.svg", alt: "Git", width: 80, height: 80 },
    { src: "/Images/html.svg", alt: "HTML", width: 80, height: 80 },
    { src: "/Images/js.svg", alt: "JavaScript", width: 80, height: 80 },
    { src: "/Images/vscode.svg", alt: "VS Code", width: 80, height: 80 },
    { src: "/Images/docker.svg", alt: "Docker", width: 80, height: 80 },
    { src: "/Images/figma.svg", alt: "Figma", width: 80, height: 80 },
    { src: "/Images/angular.svg", alt: "Angular", width: 80, height: 80 },
    { src: "/Images/vuejs.svg", alt: "Vue.js", width: 80, height: 80 },
  ];

  return (
    <section className="text-white pt-8 pb-4" id="skills">
      <div className="container mx-auto px-4">
        <h2 className="bg-clip-text pb-8 text-transparent bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-center">
          My Tech Stack
        </h2>
        <p className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-center pb-20 text-neutral-300 dark:text-neutral-400 font-light text-lg sm:text-xl md:text-xl lg:text-2xl">
          Discover the tools and technologies <br /> I leverage to build outstanding digital experiences.
        </p>
        
        <LogoLoop
          logos={logos}
          speed={120}
          direction="left"
          logoHeight={64}
          gap={64}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="rgb(0, 0, 0)"
          scaleOnHover={true}
          ariaLabel="Technology stack logos"
          className="w-full"
        />
      </div>
    </section>
  );
};

export default LogoCarousel;