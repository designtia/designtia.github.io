import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { ProjectItem } from "@/components/portfolio/ProjectItem";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Reveal } from "@/components/portfolio/Reveal";
import speiz from "@/content/case-studies/speiz-editorial.json";
import { caseStudies, getProjectHref } from "@/content/case-studies";
import { projects } from "@/lib/projects";
import localFont from "next/font/local";
import "@/components/portfolio/homepage.css";
const geist = localFont({ src: '../components/case-study/editorial/fonts/geist-latin.woff2', weight: '100 900', display: 'swap', variable: '--font-geist' });
export default function Home() {
  return (
    <div className={`homepage ${geist.variable}`}>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <div id="top" />
      <Header caseStudy />
      <main>
        <Hero />
        <section id="work" className="projects shell" aria-label="Projects">
          {projects.map((project) => {
            const study = caseStudies.find(study => study.projectId === project.id);
            const isSpeiz = study?.slug === 'speiz';
            return <ProjectItem key={project.id} project={{
              ...project,
              image: isSpeiz ? speiz.media.hero.image.src : study?.heroImage?.src ?? project.image,
              headline: isSpeiz ? speiz.headline : project.headline,
              description: isSpeiz ? "A commercial real estate platform for finding and evaluating warehouse spaces across Norway." : project.description,
              href: getProjectHref(project.id) ?? project.href,
            }} />;
          })}
        </section>
        <About />
        <Contact />
      </main>
      <Footer refined />
      <Reveal />
    </div>
  );
}
