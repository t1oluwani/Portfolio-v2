import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Skills } from "@/sections/Skills";
import { Contact } from "@/sections/Contact";

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, [location.hash]);

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
