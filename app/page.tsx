import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { ProjectItem } from "@/components/portfolio/ProjectItem";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Reveal } from "@/components/portfolio/Reveal";
import { getProjectHref } from "@/content/case-studies";
import { projects } from "@/lib/projects";
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <div id="top" />
      <Header />
      <main>
        <Hero />
        <section id="work" className="projects shell" aria-label="Projects">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={{ ...project, href: getProjectHref(project.id) ?? project.href }} />
          ))}
        </section>
        <About />
        <Contact />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
