import { LogoCarousel as LogoCarouselComponent } from './ui/logo-carousel';
import Image from 'next/image';

const LogoCarousel = () => {
  const logos = [
    { name: "Next.js", id: 1, img: (props) => <Image src="/Images/next2.svg" alt="Next.js" width={80} height={80} {...props} /> },
    { name: "React.js", id: 2, img: (props) => <Image src="/Images/reactjs.svg" alt="React.js" width={80} height={80} {...props} /> },
    { name: "Tailwind CSS", id: 3, img: (props) => <Image src="/Images/tailwindcss.svg" alt="Tailwind CSS" width={80} height={80} {...props} /> },
    { name: "TypeScript", id: 4, img: (props) => <Image src="/Images/ts.svg" alt="TypeScript" width={80} height={80} {...props} /> },
    { name: "Git", id: 5, img: (props) => <Image src="/Images/git.svg" alt="Git" width={80} height={80} {...props} /> },
    { name: "HTML", id: 6, img: (props) => <Image src="/Images/html.svg" alt="HTML" width={80} height={80} {...props} /> },
    { name: "JavaScript", id: 7, img: (props) => <Image src="/Images/js.svg" alt="JavaScript" width={80} height={80} {...props} /> },
    { name: "VS Code", id: 8, img: (props) => <Image src="/Images/vscode.svg" alt="VS Code" width={80} height={80} {...props} /> },
    { name: "Docker", id: 9, img: (props) => <Image src="/Images/docker.svg" alt="Docker" width={80} height={80} {...props} /> },
    { name: "Figma", id: 10, img: (props) => <Image src="/Images/figma.svg" alt="Figma" width={80} height={80} {...props} /> },
    { name: "Angular", id: 11, img: (props) => <Image src="/Images/angular.svg" alt="Angular" width={80} height={80} {...props} /> },
    { name: "Vue.js", id: 12, img: (props) => <Image src="/Images/vuejs.svg" alt="Vue.js" width={80} height={80} {...props} /> },
  ];

  return (
    <section className="text-white pt-8 pb-4" id="skills">
      <div className="container mx-auto px-4">
        <h2 className="bg-clip-text pb-8 text-transparent bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-center">
          Technologies
        </h2>
        <p className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-100 dark:to-white text-center pb-20 text-neutral-300 dark:text-neutral-400 font-light text-lg sm:text-xl md:text-xl lg:text-2xl">
          Modern frameworks and tools driving <br /> innovative web solutions.
        </p>
        
        <div className="flex justify-center">
          <LogoCarouselComponent logos={logos} columnCount={6} />
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;