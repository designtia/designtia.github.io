import { sitePath } from "@/lib/site-path";
export function Header({ home = true }: { home?: boolean }) {
  const prefix = home ? "" : sitePath("/");
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="wordmark" href={`${prefix}#top`}>
          Valentina Pashentsava<span className="name-dot">.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href={`${prefix}#work`}>Work</a>
          <a href={`${prefix}#about`}>About</a>
          <a href={`${prefix}#contact`}>
            Contact <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
