import Home from "@/components/Home";
import { Projects } from "@/components/Projects";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-grow">
        <Home />
      </section>
      <section className="w-full py-16 md:py-24">
        <Projects />
      </section>
    </div>
  );
}