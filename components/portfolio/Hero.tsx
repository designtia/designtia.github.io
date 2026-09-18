import { sitePath } from "@/lib/site-path";
export function Hero() {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <p className="eyebrow hero-eyebrow">Senior Product Designer</p>
      <h1 id="hero-title">Turning complex workflows into clear, scalable products.</h1>
      <div className="hero-aside">
        <p>
          I work across product strategy, UX, UI, and design systems — from zero-to-one products to
          AI-enabled design and development.
        </p>
        <a className="text-link" href="#work">
          View work <img className="homepage-arrow arrow-down" src={sitePath("/icons/arrow-right.svg")} width={24} height={24} alt="" />
        </a>
      </div>
    </section>
  );
}
