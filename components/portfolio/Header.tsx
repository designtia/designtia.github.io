import { sitePath } from "@/lib/site-path";
export function Header({ home = true, caseStudy = false }: { home?: boolean; caseStudy?: boolean }) {
  const prefix = home ? "" : sitePath("/");
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="wordmark" href={`${prefix}#top`}>
          Valentina Pashentsava{!caseStudy && <span className="name-dot">.</span>}
        </a>
        <nav aria-label="Main navigation">
          {caseStudy ? <>
            <a href={sitePath('/')}>Home</a>
            <a href={`${prefix}#work`}>Projects</a>
            <a href={`${prefix}#about`}>Experience</a>
          </> : <>
            <a href={`${prefix}#work`}>Work</a>
            <a href={`${prefix}#about`}>About</a>
          </>}
          <a href={`${prefix}#contact`}>
            Contact {caseStudy ? <img className="navigation-arrow" src={sitePath("/icons/arrow-right-up.svg")} width={16} height={16} alt="" /> : <span aria-hidden="true">↗</span>}
          </a>
        </nav>
      </div>
    </header>
  );
}
