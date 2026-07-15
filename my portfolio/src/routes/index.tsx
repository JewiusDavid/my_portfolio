import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import {
  ArrowUpRight,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Plus,
  X,
  Code2,
  Database,
  Cpu,
  Sparkles,
  GraduationCap,
  Award,
  Target,
  CheckCircle2,
  Layers,
} from "lucide-react";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import projectMoisture from "@/assets/project-moisture.jpg";
import projectSms from "@/assets/project-sms.jpg";
import projectPortfolio from "@/assets/project-portfolio.jpg";
import projectWeb from "@/assets/project-web.jpg";
import certPython from "@/assets/cert-python.jpg";
import certAI from "@/assets/cert-ai.jpg";
import certDsa from "@/assets/cert-dsa.jpg";

export const Route = createFileRoute("/")({
  component: PortfolioPage,
  head: () => ({
    meta: [
      {
        property: "og:title",
        content: "Jewius David Devanesan — AI/ML Engineering Portfolio",
      },
    ],
  }),
});

const RESUME_URL = resumeAsset.url;
const NAME = "Jewius David Devanesan";
const TITLE = "AI/ML Engineering Student";
const EMAIL = "ajddevanesan@gmail.com";
const PHONE = "+91 7826001320";
const LINKEDIN = "https://www.linkedin.com/";
const GITHUB = "https://github.com/";

/* --------------------------- Ambient Background --------------------------- */

function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  // Brand glow dims as we scroll down
  const dim = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.55, 0.3]);
  const shift = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const dimSpring = useSpring(dim, { stiffness: 40, damping: 20 });
  // Overall darkness (deeper as scrolled)
  const darkness = useTransform(scrollYProgress, [0, 1], [0, 0.55]);
  const darknessSpring = useSpring(darkness, { stiffness: 30, damping: 22 });

  // Scroll-direction driven holographic flicker (activates when scrolling UP)
  const [holo, setHolo] = useState(0); // 0 → 1
  useEffect(() => {
    let last = window.scrollY;
    let target = 0;
    let raf = 0;
    const tick = () => {
      setHolo((prev) => prev + (target - prev) * 0.08);
      raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - last;
      last = y;
      if (dy < -1) target = 1; // scrolling up
      else if (dy > 1) target = 0; // scrolling down
      // decay
      window.clearTimeout((onScroll as unknown as { t?: number }).t);
      (onScroll as unknown as { t?: number }).t = window.setTimeout(
        () => (target = 0),
        900
      ) as unknown as number;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-lines opacity-[0.35]" />
      {/* Radial brand glow */}
      <motion.div
        style={{ opacity: dimSpring, y: shift }}
        className="absolute inset-x-0 top-0 h-[85vh]"
      >
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
      </motion.div>
      {/* Soft orange orbs */}
      <motion.div
        style={{ opacity: dimSpring }}
        className="absolute -left-32 top-40 h-96 w-96 rounded-full blur-[120px]"
      >
        <div className="h-full w-full rounded-full bg-brand/25" />
      </motion.div>
      <motion.div
        style={{ opacity: dimSpring }}
        className="absolute right-0 top-[60vh] h-[28rem] w-[28rem] rounded-full blur-[140px]"
      >
        <div className="h-full w-full rounded-full bg-brand/15" />
      </motion.div>
      {/* Data-flow lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="line-grad" x1="0" x2="1">
            <stop offset="0" stopColor="var(--brand)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--brand)" stopOpacity="1" />
            <stop offset="1" stopColor="var(--brand)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.15, 0.4, 0.65, 0.85].map((y, i) => (
          <line
            key={i}
            x1="0"
            x2="100%"
            y1={`${y * 100}%`}
            y2={`${y * 100}%`}
            stroke="url(#line-grad)"
            strokeWidth="1"
          />
        ))}
      </svg>
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />

      {/* Darkening layer — deepens as we scroll down */}
      <motion.div
        style={{ opacity: darknessSpring }}
        className="absolute inset-0 bg-background"
      />

      {/* Holographic projection layer — flickers in when scrolling up */}
      <HoloLayer intensity={holo} />
    </div>
  );
}

function HoloLayer({ intensity }: { intensity: number }) {
  // Flicker: multiplicative jitter, only when intensity > threshold
  const [flick, setFlick] = useState(1);
  useEffect(() => {
    let raf = 0;
    let t0 = performance.now();
    const loop = (t: number) => {
      const dt = t - t0;
      // fast, film-projector style flicker
      const base =
        0.55 +
        0.45 *
          (0.5 +
            0.5 *
              Math.sin(dt * 0.045) *
              Math.sin(dt * 0.017) *
              Math.cos(dt * 0.031));
      // occasional dropout
      const drop = Math.random() < 0.06 ? 0.35 + Math.random() * 0.3 : 1;
      setFlick(base * drop);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const opacity = Math.max(0, Math.min(1, intensity)) * flick;

  return (
    <div
      className="absolute inset-0"
      style={{ opacity, transition: "opacity 120ms linear" }}
    >
      {/* Orange projector cone from bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 110%, color-mix(in oklab, var(--brand) 55%, transparent) 0%, transparent 60%)",
        }}
      />
      {/* Top haze */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in oklab, var(--brand) 25%, transparent) 0%, transparent 65%)",
        }}
      />
      {/* Scanlines */}
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, color-mix(in oklab, var(--brand) 22%, transparent) 2px, color-mix(in oklab, var(--brand) 22%, transparent) 3px)",
        }}
      />
      {/* Vertical light beams */}
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          background:
            "repeating-linear-gradient(90deg, transparent 0px, transparent 120px, color-mix(in oklab, var(--brand) 10%, transparent) 120px, color-mix(in oklab, var(--brand) 10%, transparent) 121px)",
        }}
      />
      {/* Moving sweep */}
      <div
        className="absolute inset-x-0 h-40 mix-blend-screen"
        style={{
          top: `${(performance.now() / 20) % 100}%`,
          background:
            "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--brand) 40%, transparent), transparent)",
          filter: "blur(6px)",
        }}
      />
      {/* Chromatic vignette */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 220px color-mix(in oklab, var(--brand) 40%, transparent)",
        }}
      />
    </div>
  );
}





/* --------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto max-w-6xl px-6 pb-24 pt-32 sm:pt-40"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <span className="brand-chip rounded-full px-3 py-1 text-xs font-medium tracking-wide">
          Available for internships
        </span>
        <span className="hidden items-center gap-1 sm:flex">
          <MapPin className="h-3.5 w-3.5" /> Chennai, Tamil Nadu
        </span>
      </motion.div>

      <div className="mt-8 flex items-start justify-between gap-8">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-brand sm:text-6xl md:text-7xl"
          >
            {NAME}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 inline-flex rounded-2xl bg-foreground px-5 py-2.5 text-lg font-semibold text-background sm:text-xl"
          >
            {TITLE}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Second-year Computer Science and Engineering student specializing in
            Artificial Intelligence and Machine Learning. Skilled in Python,
            SQL, and web technologies — building academic and personal projects
            that turn data into intelligent, useful systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href={RESUME_URL}
              download="Jewius_David_Devanesan.pdf"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[var(--shadow-brand)] transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-surface"
            >
              View Projects <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="ml-1 flex items-center gap-1">
              <SocialIconLink href={LINKEDIN} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialIconLink>
              <SocialIconLink href={GITHUB} label="GitHub">
                <Github className="h-4 w-4" />
              </SocialIconLink>
              <SocialIconLink href={`mailto:${EMAIL}`} label="Email">
                <Mail className="h-4 w-4" />
              </SocialIconLink>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden shrink-0 md:block"
        >
          <div
            className="relative h-24 w-24 rounded-full border border-brand/40"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--brand) 60%, transparent), transparent 70%)",
              boxShadow:
                "0 0 60px color-mix(in oklab, var(--brand) 45%, transparent)",
            }}
          >
            <div className="absolute inset-3 rounded-full border border-brand/60" />
            <div className="absolute inset-6 rounded-full bg-brand" />
          </div>
        </motion.div>

      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
      >
        {[
          { label: "Specialization", value: "AI / ML" },
          { label: "Program", value: "B.E. CSE" },
          { label: "Cohort", value: "2025 — 29" },
          { label: "Based in", value: "Chennai" },
        ].map((s) => (
          <div key={s.label} className="bg-surface/70 px-5 py-5 backdrop-blur">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {s.label}
            </div>
            <div className="mt-1 font-display text-lg font-semibold text-foreground">
              {s.value}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
    >
      {children}
    </a>
  );
}

/* ------------------------------- About/Skills ------------------------------ */

const skillGroups = [
  {
    icon: Code2,
    label: "Languages",
    items: ["Python", "Java", "C", "C++", "SQL"],
  },
  {
    icon: Cpu,
    label: "Web",
    items: ["HTML", "CSS", "JavaScript"],
  },
  {
    icon: Database,
    label: "Tools",
    items: ["Git", "GitHub", "VS Code", "MySQL", "Jupyter Notebook"],
  },
];

const strengths = [
  "Problem Solving",
  "Analytical Thinking",
  "Adaptability",
  "Time Management",
];

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader
        kicker="About"
        title="A calm, analytical approach to intelligent systems"
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="glass-panel rounded-3xl p-7 lg:col-span-2">
          <div className="flex items-center gap-2 text-brand">
            <GraduationCap className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              Education
            </span>
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold">
            B.E. Computer Science and Engineering
          </h3>
          <p className="mt-1 text-muted-foreground">
            Artificial Intelligence and Machine Learning · Jeppiaar Engineering
            College, Chennai
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
            2025 — 2029
          </div>

          <div className="mt-8 h-px bg-border" />

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {skillGroups.map((g) => (
              <div key={g.label}>
                <div className="flex items-center gap-2 text-brand">
                  <g.icon className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-widest">
                    {g.label}
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-7">
          <div className="flex items-center gap-2 text-brand">
            <Sparkles className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              Strengths
            </span>
          </div>
          <ul className="mt-5 space-y-4">
            {strengths.map((s, i) => (
              <li key={s} className="flex items-center gap-4">
                <span className="font-display text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-medium">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Projects -------------------------------- */

type Project = {
  title: string;
  image: string;
  meta: string;
  about: string;
  stack: string[];
  objectives: string[];
  advantages: string[];
  datasets: string[];
  info: string;
};

const projects: Project[] = [
  {
    title: "Moisture Irrigation",
    image: projectMoisture,
    meta: "IoT · Automation",
    about:
      "Sensor-driven irrigation prototype that reads soil moisture and controls watering — an early exploration into embedded intelligence and closed-loop systems.",
    stack: ["Python", "Sensors", "Automation"],
    objectives: [
      "Read real-time soil moisture with capacitive sensors",
      "Trigger a water pump only when moisture drops below threshold",
      "Log every irrigation cycle for later analysis",
    ],
    advantages: [
      "Reduces water usage by only watering when needed",
      "Fully autonomous — no manual intervention required",
      "Foundation for larger precision-agriculture systems",
    ],
    datasets: [
      "Local sensor telemetry (moisture %, timestamp)",
      "Reference thresholds from agricultural crop-water guides",
    ],
    info:
      "A closed-loop embedded system combining a microcontroller, moisture sensors and a relay-driven pump. Python controls the decision layer and stores cycle data for later ML-driven scheduling.",
  },
  {
    title: "Student Management System",
    image: projectSms,
    meta: "Data · CRUD",
    about:
      "Full-stack academic records system with structured schemas, CRUD workflows, and clean query patterns for reliable student data operations.",
    stack: ["Python", "MySQL"],
    objectives: [
      "Design a normalized schema for students, courses and grades",
      "Provide clean CRUD flows for administrators",
      "Support efficient reporting queries",
    ],
    advantages: [
      "Single source of truth for academic records",
      "Fast lookups through indexed relational queries",
      "Extensible to attendance, fees and analytics modules",
    ],
    datasets: [
      "Synthetic student roster (name, id, department)",
      "Course catalogue and grade sheets",
    ],
    info:
      "Relational-database driven system exercising schema design, referential integrity and set-based queries. Python drives the interaction layer while MySQL owns persistence.",
  },
  {
    title: "Personal Portfolio Website",
    image: projectPortfolio,
    meta: "Web · Design",
    about:
      "Hand-built portfolio focused on clarity, typography and motion — the earlier iteration of the site you're viewing now.",
    stack: ["HTML", "CSS", "JavaScript"],
    objectives: [
      "Communicate identity and skills in under 10 seconds",
      "Ship a static, fast-loading site with no framework overhead",
      "Practise typography, spacing and motion fundamentals",
    ],
    advantages: [
      "Zero-dependency, blazing-fast delivery",
      "Full control over every pixel and animation",
      "Serves as a live sandbox for design iteration",
    ],
    datasets: [
      "Own resume content (skills, projects, education)",
      "Design references from Apple, Stripe, Linear",
    ],
    info:
      "A vanilla web build emphasising restraint — semantic HTML, custom CSS variables and hand-rolled JS transitions. The direct ancestor of this current React-based portfolio.",
  },
  {
    title: "Web Experiments",
    image: projectWeb,
    meta: "Web · Prototyping",
    about:
      "Ongoing experiments in interactive UI, animation and layout — small builds that sharpen fundamentals in modern front-end engineering.",
    stack: ["HTML", "CSS", "JavaScript"],
    objectives: [
      "Prototype one small interaction pattern per week",
      "Study easing, timing and choreography in motion",
      "Build a reusable library of UI primitives",
    ],
    advantages: [
      "Rapid iteration on ideas without production overhead",
      "Deep understanding of browser rendering & CSS",
      "Ready-to-remix components for future projects",
    ],
    datasets: [
      "Curated interaction references from Awwwards & Dribbble",
      "CSS specification test cases",
    ],
    info:
      "A rolling collection of interactive prototypes exploring scroll effects, canvas motion and layout systems — treated like an engineering journal rather than a product.",
  },
];

function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader kicker="Projects" title="Selected work & experiments" />
      <div className="mt-14 space-y-8">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.title}
            project={p}
            index={i}
            onOpen={() => setActive(p)}
          />
        ))}
      </div>
      <ProjectHologram project={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const flip = index % 2 === 1;
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel group relative block w-full overflow-hidden rounded-3xl p-5 text-left sm:p-6"
    >
      <div
        className={`grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center ${
          flip ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Image with orange frame */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-1.5 rounded-[1.6rem] opacity-80"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--brand) 80%, transparent), color-mix(in oklab, var(--brand) 20%, transparent) 60%, transparent)",
            }}
          />
          <div className="relative overflow-hidden rounded-2xl border border-brand/50 bg-background shadow-[var(--shadow-brand)]">
            <div className="aspect-[4/3] w-full">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                width={1280}
                height={960}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            {/* Orange corner accents */}
            <span className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-brand" />
            <span className="pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-brand" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-brand" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-brand" />
            {/* Scanline overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, color-mix(in oklab, var(--brand) 8%, transparent) 3px, color-mix(in oklab, var(--brand) 8%, transparent) 4px)",
              }}
            />
          </div>
        </div>

        {/* Heading + about */}
        <div className="min-w-0 px-1 sm:px-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-8 bg-brand/60" />
            <span>{project.meta}</span>
          </div>
          <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {project.about}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-transform group-hover:translate-x-1">
            View holographic details <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

/* --------------------------- Project Hologram Modal ----------------------- */

function ProjectHologram({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: -12, y: 30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              transformStyle: "preserve-3d",
              background:
                "linear-gradient(160deg, color-mix(in oklab, var(--brand) 8%, oklch(0.16 0.008 60)) 0%, oklch(0.14 0.005 60) 60%)",
              boxShadow:
                "0 0 0 1px color-mix(in oklab, var(--brand) 40%, transparent), 0 40px 120px -30px color-mix(in oklab, var(--brand) 45%, transparent), inset 0 1px 0 color-mix(in oklab, white 10%, transparent)",
            }}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl p-6 sm:p-10"
          >
            {/* Hologram scanlines */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, color-mix(in oklab, var(--brand) 14%, transparent) 2px, color-mix(in oklab, var(--brand) 14%, transparent) 3px)",
              }}
            />
            {/* Corner brackets */}
            <span className="pointer-events-none absolute left-3 top-3 h-8 w-8 border-l-2 border-t-2 border-brand" />
            <span className="pointer-events-none absolute right-3 top-3 h-8 w-8 border-r-2 border-t-2 border-brand" />
            <span className="pointer-events-none absolute bottom-3 left-3 h-8 w-8 border-b-2 border-l-2 border-brand" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-8 w-8 border-b-2 border-r-2 border-brand" />
            {/* Flicker glow */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0.15 }}
              animate={{ opacity: [0.12, 0.22, 0.14, 0.2, 0.13] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in oklab, var(--brand) 40%, transparent), transparent 60%)",
              }}
            />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand/40 bg-background/60 text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative">
              <div className="brand-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
                Holographic Projection · {project.meta}
              </div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="mt-4 font-display text-3xl font-bold tracking-tight text-brand sm:text-4xl"
                style={{
                  textShadow:
                    "0 0 24px color-mix(in oklab, var(--brand) 55%, transparent)",
                }}
              >
                {project.title}
              </motion.h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/85 sm:text-base">
                {project.info}
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <HoloBlock
                  icon={Target}
                  label="Objectives"
                  items={project.objectives}
                  delay={0.2}
                />
                <HoloBlock
                  icon={CheckCircle2}
                  label="Advantages"
                  items={project.advantages}
                  delay={0.3}
                />
                <HoloBlock
                  icon={Layers}
                  label="Datasets"
                  items={project.datasets}
                  delay={0.4}
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HoloBlock({
  icon: Icon,
  label,
  items,
  delay,
}: {
  icon: typeof Target;
  label: string;
  items: string[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-2xl border border-brand/30 bg-background/40 p-5 backdrop-blur"
      style={{
        boxShadow:
          "inset 0 0 40px color-mix(in oklab, var(--brand) 8%, transparent)",
      }}
    >
      <div className="flex items-center gap-2 text-brand">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-widest">
          {label}
        </span>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-foreground/85">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ------------------------------ Certificates ------------------------------ */

type Certificate = {
  title: string;
  issuer: string;
  focus: string;
  image: string;
};

const certificates: Certificate[] = [
  {
    title: "Python Fundamentals",
    issuer: "Self-paced program",
    focus: "Core Python, data structures, scripting fundamentals",
    image: certPython,
  },
  {
    title: "Essentials of AI",
    issuer: "Self-paced program",
    focus: "AI foundations, ML lifecycle, applied intuition",
    image: certAI,
  },
  {
    title: "DSA using Python",
    issuer: "Self-paced program",
    focus: "Algorithms, complexity analysis, problem solving",
    image: certDsa,
  },
];

function Certificates() {
  const [active, setActive] = useState<Certificate | null>(null);
  return (
    <section id="certificates" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader
        kicker="Certifications"
        title="Foundations, continuously reinforced"
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {certificates.map((c, i) => (
          <CertificateCard
            key={c.title}
            cert={c}
            index={i}
            onOpen={() => setActive(c)}
          />
        ))}
      </div>

      <CertificateModal cert={active} onClose={() => setActive(null)} />
    </section>
  );
}

function CertificateCard({
  cert,
  index,
  onOpen,
}: {
  cert: Certificate;
  index: number;
  onOpen: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      style={{ perspective: "1600px" }}
      className="h-72 w-full"
    >
      <motion.button
        type="button"
        onClick={onOpen}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full text-left outline-none"
        aria-label={`Open ${cert.title}`}
      >
        {/* Front */}
        <div
          className="glass-panel absolute inset-0 flex flex-col justify-between rounded-3xl p-6"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-center justify-between">
            <div className="brand-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
              <Award className="h-3.5 w-3.5" /> Certificate
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold leading-tight">
              {cert.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Hover to flip</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Back — certificate image */}
        <div
          className="absolute inset-0 overflow-hidden rounded-3xl border border-brand/50"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow:
              "0 20px 60px -20px color-mix(in oklab, var(--brand) 40%, transparent)",
          }}
        >
          <img
            src={cert.image}
            alt={`${cert.title} certificate`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-brand">
              Click to expand
            </div>
            <div className="mt-1 font-display text-sm font-semibold">
              {cert.title}
            </div>
          </div>
          <span className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-brand" />
          <span className="pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-brand" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-brand" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-brand" />
        </div>
      </motion.button>
    </motion.div>
  );
}


function CertificateModal({
  cert,
  onClose,
}: {
  cert: Certificate | null;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    setZoom(1);
    if (!cert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel relative w-full max-w-3xl rounded-3xl p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="overflow-hidden rounded-2xl border border-brand/40">
              <motion.div
                animate={{ scale: zoom }}
                transition={{ duration: 0.4 }}
                style={{ transformOrigin: "center" }}
              >
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  className="h-auto w-full object-contain"
                />
              </motion.div>
            </div>

            <div className="mt-6 flex flex-col items-start justify-between gap-3 text-sm sm:flex-row sm:items-center">
              <div>
                <div className="font-display text-lg font-semibold">
                  {cert.title}
                </div>
                <div className="text-muted-foreground">
                  {cert.issuer} · {cert.focus}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom((z) => Math.max(0.75, z - 0.15))}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Zoom −
                </button>
                <button
                  onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Zoom +
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


/* --------------------------------- Contact -------------------------------- */

function Contact() {
  const items = [
    { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Phone, label: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
    { icon: Linkedin, label: "LinkedIn", href: LINKEDIN },
    { icon: Github, label: "GitHub", href: GITHUB },
  ];
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-10 sm:p-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand">
            Contact
          </div>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Let's build something intelligent together.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Open to internships, research collaborations, and thoughtful
            engineering conversations.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {items.map((it) => (
              <a
                key={it.label}
                href={it.href}
                target={it.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-border bg-surface/60 px-5 py-4 backdrop-blur transition-colors hover:border-brand/50"
              >
                <div className="flex items-center gap-3">
                  <div className="brand-chip flex h-9 w-9 items-center justify-center rounded-full">
                    <it.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{it.label}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-brand" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-16 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
        <div>© {new Date().getFullYear()} {NAME}. Crafted in Chennai.</div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
          <span>Portfolio v1 · AI/ML Focus</span>
        </div>
      </footer>
    </section>
  );
}

/* ------------------------- Section Header (shared) ------------------------ */

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="flex items-end justify-between gap-6"
    >
      <div>
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-brand">
          <span className="h-px w-8 bg-brand" />
          {kicker}
        </div>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
    </motion.div>
  );
}

/* ---------------------------- Floating Nav Bar ---------------------------- */

function TopNav() {
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-1/2 top-5 z-40 -translate-x-1/2"
    >
      <nav className="glass-panel flex items-center gap-1 rounded-full px-2 py-1.5">
        <a
          href="#home"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-brand-foreground">
            J
          </span>
          <span className="hidden sm:inline">Jewius</span>
        </a>
        {sections.slice(1).map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="hidden rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
          >
            {s.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}

/* ------------------------ Floating Action Menu (FAB) ---------------------- */

function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const items = useMemo(
    () => [
      {
        icon: Download,
        label: "Download Resume",
        onClick: () => {
          const a = document.createElement("a");
          a.href = RESUME_URL;
          a.download = "Jewius_David_Devanesan.pdf";
          a.click();
          setOpen(false);
        },
      },
      {
        icon: FileText,
        label: "Preview Resume",
        onClick: () => {
          setPreviewOpen(true);
          setOpen(false);
        },
      },
      {
        icon: Linkedin,
        label: "LinkedIn",
        onClick: () => window.open(LINKEDIN, "_blank"),
      },
      {
        icon: Github,
        label: "GitHub",
        onClick: () => window.open(GITHUB, "_blank"),
      },
      {
        icon: Mail,
        label: "Email",
        onClick: () => (window.location.href = `mailto:${EMAIL}`),
      },
    ],
    []
  );

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {open &&
            items.map((it, i) => (
              <motion.button
                key={it.label}
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={it.onClick}
                className="glass-panel group flex items-center gap-3 rounded-full py-2 pl-4 pr-2 text-sm font-medium"
              >
                <span className="text-foreground">{it.label}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-brand-foreground">
                  <it.icon className="h-4 w-4" />
                </span>
              </motion.button>
            ))}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.94 }}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          aria-label="Open quick actions"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-[var(--shadow-brand)]"
        >
          <Plus className="h-6 w-6" strokeWidth={2.5} />
        </motion.button>
      </div>

      <ResumePreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
}

function ResumePreviewModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel relative h-[85vh] w-full max-w-4xl overflow-hidden rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FileText className="h-4 w-4 text-brand" /> Resume Preview
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={RESUME_URL}
                  download="Jewius_David_Devanesan.pdf"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <iframe
              title="Resume preview"
              src={RESUME_URL}
              className="h-[calc(85vh-49px)] w-full bg-background"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------------- Page ---------------------------------- */

function PortfolioPage() {
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <TopNav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <FloatingActions />
    </div>
  );
}
