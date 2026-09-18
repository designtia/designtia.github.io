import { sitePath } from "@/lib/site-path";
export function Footer({ refined = false }: { refined?: boolean }) {
  return (
    <footer className="footer shell">
      <span>Valentina Pashentsava</span>
      <span>Senior Product Designer</span>
      <a href="#top" aria-label="Back to top">
        {refined ? <img src={sitePath("/icons/arrow-right.svg")} width={24} height={24} alt="" style={{ transform: "rotate(-90deg)" }} /> : "↑"}
      </a>
    </footer>
  );
}
