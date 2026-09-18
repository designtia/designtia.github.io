export type Project = {
  id: string;
  name: string;
  category?: string;
  headline: string;
  description: string;
  outcome?: string;
  media:
    | "portal"
    | "builder"
    | "property"
    | "research"
    | "compliance"
    | "learning"
    | "assessment"
    | "commerce";
  size: "lead" | "wide" | "narrow" | "compact";
  comingSoon?: boolean;
  image?: string;
  href?: string;
};
export const projects: Project[] = [
  {
    id: "01",
    name: "Whirlwind Steel Buildings",
    category: "Industrial Building Platform",
    comingSoon: true,
    headline: "Making complex building configuration easier to navigate",
    description:
      "Designing complex construction workflows, a Project Portal redesign, and an AI-ready design system.",
    media: "portal",
    size: "lead",
  },
  {
    id: "02",
    name: "Kilo / Flox",
    category: "Website Builder Platform",
    comingSoon: true,
    headline: "Turning repeated implementation into a reusable builder",
    description:
      "A configurable system for creating branded pages, quizzes, templates, components, and promotions.",
    outcome: "Page implementation: weeks → days",
    media: "builder",
    size: "lead",
  },
  {
    id: "03",
    name: "Speiz",
    category: "Commercial Real Estate Platform",
    image: "/work/speiz/overview-hero.png",
    headline: "Simplifying warehouse search in a fragmented B2B market",
    description:
      "A commercial real estate platform bringing warehouse search, comparison, and tenant–landlord workflows into one product.",
    media: "property",
    size: "lead",
  },
  {
    id: "04",
    name: "AI Video Research",
    headline: "Turning video responses into usable research insights",
    description:
      "A zero-to-one research platform combining video responses with AI-assisted summaries and qualitative insights.",
    media: "research",
    size: "wide",
  },
  {
    id: "05",
    name: "AML System",
    headline: "Making complex compliance work easier to investigate",
    description:
      "A data-heavy platform for transaction monitoring, case investigation, risk prioritization, and compliance workflows.",
    media: "compliance",
    size: "narrow",
  },
  {
    id: "06",
    name: "Mokyklėlė Pasaka",
    headline: "Redesigning a legacy learning platform for multiple user roles",
    description:
      "A learning platform redesign supporting administrators, teachers, students, and parents.",
    media: "learning",
    size: "compact",
  },
  {
    id: "07",
    name: "AI Car Damage Assessment",
    headline: "Designing an AI-assisted vehicle damage assessment flow",
    description:
      "A responsive workflow for submitting damage evidence and generating structured assessment reports.",
    media: "assessment",
    size: "compact",
  },
  {
    id: "08",
    name: "Tukada",
    headline: "Bringing a specialized engineering business online",
    description:
      "A responsive website and e-commerce experience for commercial vehicle engineering.",
    media: "commerce",
    size: "compact",
  },
];
// Add verified destinations here when available. No personal contact details are assumed.
export const contact = { email: "", linkedin: "" };
