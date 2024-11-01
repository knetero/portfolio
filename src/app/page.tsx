import Home from "@/components/Home";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Projects } from "@/components/Projects";


export default function HomePage() {
  return (
    <>
      <div className="w-full h-screen">
      <Home /> 
      {/* <ShootingStars className="your-class-name" /> */}
      <div className="w-full h-[90%] flex items-center justify-center">
        {/* Render the projects component */}
        <Projects />
      </div>

      </div>

  </>
  );
}
