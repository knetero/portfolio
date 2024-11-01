import GridBackgroundDemo from "@/components/Home";
import { ShootingStars } from "@/components/ui/shooting-stars";


export default function HomePage() {
  return (
    <div>
      <GridBackgroundDemo />
      <ShootingStars className="your-class-name" />
    </div>
  );
}
