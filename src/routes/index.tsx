import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Award,
  Brain,
  Briefcase,
  Code2,
  Cpu,
  Download,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Palette,
  Rocket,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react";
import {
  SiBootstrap,
  SiCanvas,
  SiCplusplus,
  SiCss,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

import Navbar from "@/components/portfolio/Navbar";
import { Counter } from "@/components/portfolio/Counter";
import { useTypewriter } from "@/hooks/useTypewriter";
import heroIllustration from "@/assets/hero-illustration.png";
import aboutIllustration from "@/assets/about-illustration.png";
import projectAiAssistant from "@/assets/project-ai-assistant.png";
import projectAdidas from "@/assets/project-adidas.png";
import projectMultiquiz from "@/assets/project-multiquiz.png";
import projectTodo from "@/assets/project-todo.png";

const HeroScene = lazy(() => import("@/components/portfolio/HeroScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Mehak Shehzadi — Frontend & React developer from Sialkot, Pakistan. Building responsive, interactive, AI-forward web experiences.",
      },
    ],
  }),
  component: Portfolio,
});

/* ------------------------------ Data ------------------------------ */

const social = {
  github: "https://github.com/vibxanu",
  linkedin: "https://www.linkedin.com/in/vibxanu",
  email: "04mehakshehzadi@gmail.com",
};

const education = [
  {
    school: "Government College Women University, Sialkot",
    degree: "Bachelor of Science in Information Technology",
    score: "CGPA 3.4 / 4.0",
    status: "In progress",
    icon: GraduationCap,
  },
  {
    school: "Nisa Girls College, Sialkot",
    degree: "Intermediate (ICS)",
    score: "969 / 1100",
    status: "Completed",
    icon: Award,
  },
  {
    school: "Government Christian Girls High School",
    degree: "Matriculation (Science)",
    score: "919 / 1100",
    status: "Completed",
    icon: Award,
  },
];

const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    items: [
      { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", Icon: SiCss, color: "#1572B6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
    ],
  },
  {
    title: "Programming",
    icon: Cpu,
    items: [
      { name: "C++", Icon: SiCplusplus, color: "#00599C" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "Java", Icon: SiOpenjdk, color: "#f89820" },
    ],
  },
  {
    title: "Database",
    icon: Layers,
    items: [
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    title: "Tools",
    icon: Wand2,
    items: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
      { name: "VS Code", Icon: VscVscode, color: "#007ACC" },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
      { name: "Canva", Icon: SiCanvas, color: "#00C4CC" },
    ],
  },
  {
    title: "Other",
    icon: Sparkles,
    items: [
      { name: "REST APIs", Icon: Rocket, color: "#8B5CF6" },
      { name: "Responsive", Icon: Layers, color: "#06B6D4" },
      { name: "UI / UX", Icon: Palette, color: "#EC4899" },
      { name: "AI Tools", Icon: Brain, color: "#6366F1" },
    ],
  },
];

const projects: {
  title: string;
  desc: string;
  image: string;
  tags: string[];
  github: string;
  demo: string | null;
}[] = [
  {
    title: "AI Assistant Pro",
    desc: "An AI-powered study assistant that generates summaries, quizzes, questions and study plans for students, built with Python and Streamlit.",
    image: projectAiAssistant,
    tags: ["Python", "Streamlit", "AI", "NLP"],
    github: "https://github.com/vibxanu/ai-assistant-pro",
    demo: null,
  },
  {
    title: "Adidas PSD Task",
    desc: "A responsive Adidas-inspired landing page featuring a hero slider, thumbnail carousel, video popup and validated contact form.",
    image: projectAdidas,
    tags: ["HTML", "CSS", "JavaScript", "Responsive"],
    github: "https://github.com/vibxanu/adidas-psd-task",
    demo: null,
  },
  {
    title: "MultiQuiz Website",
    desc: "An interactive quiz web app with an MCQ engine, live scoring and a clean result page — pure HTML, CSS and JavaScript.",
    image: projectMultiquiz,
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/vibxanu/multiquiz-website",
    demo: null,
  },
  {
    title: "Todo List App",
    desc: "A minimal todo list with due dates, Low/Medium/High priorities and local-storage persistence so tasks stay across sessions.",
    image: projectTodo,
    tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    github: "https://github.com/vibxanu/todo-list",
    demo: null,
  },
];

const experience = [
  {
    role: "Freelance Frontend Developer",
    org: "Self-employed",
    time: "2024 — Present",
    points: [
      "Designed and shipped responsive React landing pages for small businesses.",
      "Translated Figma designs into pixel-perfect, animated UIs.",
    ],
  },
  {
    role: "React Developer — Personal Projects",
    org: "Open Source & Learning",
    time: "2023 — Present",
    points: [
      "Built multiple full-stack style prototypes exploring AI, dashboards and e-commerce flows.",
      "Contributed learnings and UI components publicly on GitHub.",
    ],
  },
  {
    role: "UI/UX Explorations",
    org: "Figma & Canva",
    time: "2022 — Present",
    points: [
      "Prototyped mobile and web interfaces with a focus on accessibility and clarity.",
      "Iterated designs based on peer feedback and usability heuristics.",
    ],
  },
];

const services = [
  { icon: Code2, title: "Frontend Development", desc: "Semantic HTML, modern CSS, and clean JavaScript that ages well." },
  { icon: SiReact, title: "React Development", desc: "Component-driven React apps with hooks, routing and delightful state." },
  { icon: Layers, title: "Responsive Web Design", desc: "Interfaces that feel native from 320px to 4K, no exceptions." },
  { icon: Palette, title: "UI / UX Design", desc: "Wireframes to polished prototypes in Figma, focused on real users." },
  { icon: Rocket, title: "Website Development", desc: "Marketing sites, portfolios and dashboards built to convert." },
  { icon: Wand2, title: "Website Redesign", desc: "Modern makeovers with animation, motion and performance in mind." },
];

const features = [
  { icon: Code2, title: "Frontend Development", desc: "React, Tailwind and the modern web platform." },
  { icon: Palette, title: "UI/UX Design", desc: "Human-first interfaces with taste and rhythm." },
  { icon: Brain, title: "Problem Solving", desc: "Curious, calm, and shipping-oriented mindset." },
  { icon: Sparkles, title: "AI & Continuous Learning", desc: "Exploring AI tooling and new frameworks daily." },
];

/* --------------------------- Reusable bits --------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {desc && <p className="mt-4 text-base text-muted-foreground">{desc}</p>}
    </motion.div>
  );
}

/* --------------------------------- Page --------------------------------- */

function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

/* --------------------------------- Mouse Glow --------------------------------- */

function MouseGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
      style={{
        background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, oklch(0.72 0.14 210 / 0.12), transparent 60%)`,
        transition: "background 0.15s ease-out",
      }}
    />
  );
}

/* --------------------------------- Hero --------------------------------- */

function Hero() {
  const typed = useTypewriter(
    ["Frontend Developer.", "React Developer.", "UI / UX Designer.", "AI Enthusiast."],
    75,
    1200,
  );

  return (
    <section id="home" className="relative isolate pt-28 pb-20 sm:pt-32 lg:pt-40">
      {/* Ambient blobs */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden grid-bg opacity-60" />
      <div aria-hidden className="absolute -top-24 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-blob" />
      <div aria-hidden className="absolute top-40 right-10 -z-10 h-80 w-80 rounded-full bg-secondary/25 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs text-muted-foreground"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            Available for internships & freelance
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-5 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Hi, I'm <span className="text-gradient">Mehak Shehzadi</span>
          </motion.h1>

          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-2xl text-muted-foreground sm:text-3xl"
          >
            I'm a{" "}
            <span className="text-foreground">{typed}</span>
            <span className="ml-1 inline-block h-6 w-[2px] translate-y-1 bg-accent animate-blink" />
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            BS Information Technology student crafting responsive, interactive and AI-forward
            web experiences with React, Tailwind and a designer's eye for detail.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:-translate-y-0.5 hover:shadow-glow-strong"
            >
              <Download size={16} /> Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-medium transition hover:-translate-y-0.5"
            >
              <Mail size={16} /> Contact me
            </a>
            <a
              href={social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-full glass transition hover:-translate-y-0.5 hover:text-accent"
            >
              <Github size={18} />
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-full glass transition hover:-translate-y-0.5 hover:text-accent"
            >
              <Linkedin size={18} />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-3 text-xs text-muted-foreground">
            <MapPin size={14} className="text-accent" />
            <span>Sialkot, Pakistan</span>
          </motion.div>
        </motion.div>

        {/* Illustration + 3D scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative mx-auto aspect-square w-full max-w-[520px]"
        >
          <div className="absolute inset-0 rounded-[40%] bg-gradient-primary opacity-30 blur-3xl" />
          <div className="absolute inset-0">
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </div>
          <motion.img
            src={heroIllustration}
            alt="Illustration of Mehak Shehzadi, frontend developer"
            width={1024}
            height={1024}
            className="relative z-10 h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(99,102,241,0.35)] animate-float"
          />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mx-auto mt-14 flex w-fit flex-col items-center gap-2 text-xs text-muted-foreground"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="grid h-9 w-9 place-items-center rounded-full glass"
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
}

/* --------------------------------- About --------------------------------- */

function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="About me" title="Designing & shipping delightful UIs" />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute inset-0 rounded-[38%] bg-gradient-primary opacity-25 blur-3xl" />
            <div className="relative rounded-3xl glass-strong p-3">
              <img
                src={aboutIllustration}
                alt="Female developer working on a laptop"
                loading="lazy"
                width={1024}
                height={1024}
                className="w-full rounded-2xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              I am <span className="text-foreground font-medium">Mehak Shehzadi</span>, a BS
              Information Technology student passionate about Frontend Development, React.js,
              JavaScript, UI/UX Design, and Artificial Intelligence. I enjoy building
              responsive, interactive, and user-friendly web applications while continuously
              learning modern technologies. My goal is to become a professional Software
              Engineer capable of creating innovative digital experiences.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl glass p-4"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                    <f.icon size={18} className="text-primary-foreground" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{f.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { n: 15, s: "+", l: "Projects built" },
                { n: 3, s: "+", l: "Years learning" },
                { n: 100, s: "%", l: "Passion" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl glass p-4 text-center">
                  <div className="font-display text-3xl font-bold text-gradient">
                    <Counter to={s.n} suffix={s.s} />
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Education --------------------------------- */

function Education() {
  return (
    <section id="education" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Education"
          title="Academic journey"
          desc="A steady path from science foundations to information technology."
        />

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block"
          />

          <div className="space-y-6 md:space-y-10">
            {education.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={e.school}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className={`md:grid md:grid-cols-2 md:gap-10 ${left ? "" : "md:[&>*:first-child]:col-start-2"}`}
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group relative rounded-2xl glass-strong p-6 transition"
                  >
                    <div
                      aria-hidden
                      className="absolute left-1/2 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-primary shadow-glow md:block"
                      style={{ [left ? "right" : "left"]: "-1.5rem", left: "auto" } as never}
                    />
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                        <e.icon size={20} className="text-primary-foreground" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold">{e.degree}</h3>
                          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
                            {e.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{e.school}</p>
                        <p className="mt-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium">
                          <Sparkles size={12} className="text-accent" /> {e.score}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Skills --------------------------------- */

function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Skills"
          title="My technical toolbox"
          desc="Tools and technologies I use to bring ideas to life."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: gi * 0.05 }}
              className="rounded-3xl glass-strong p-6"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                  <g.icon size={18} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">{g.title}</h3>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {g.items.map((s) => (
                  <motion.div
                    key={s.name}
                    whileHover={{ y: -4, scale: 1.04 }}
                    className="group flex flex-col items-center gap-2 rounded-xl bg-white/5 p-3 text-center transition hover:bg-white/10"
                  >
                    <s.Icon size={26} style={{ color: s.color }} className="transition group-hover:drop-shadow-[0_0_10px_currentColor]" />
                    <span className="text-[11px] text-muted-foreground">{s.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Projects --------------------------------- */

function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Projects"
          title="Featured work"
          desc="A few builds that show how I approach interfaces and interaction."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group flex h-full flex-col overflow-hidden rounded-3xl glass-strong"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={832}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3 pt-4">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium transition hover:-translate-y-0.5"
                  >
                    <Github size={14} /> Code
                  </a>
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
                  >
                    Live demo <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Experience --------------------------------- */

function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Experience"
          title="Where I've been building"
          desc="A blend of freelance work, personal projects and design exploration."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {experience.map((x, i) => (
            <motion.div
              key={x.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl glass-strong p-6"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                  <Briefcase size={18} className="text-primary-foreground" />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {x.time}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{x.role}</h3>
              <p className="text-sm text-accent">{x.org}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {x.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-primary" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Services --------------------------------- */

function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Services"
          title="What I can build for you"
          desc="From landing pages to polished dashboards — designed and coded end-to-end."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl glass-strong p-7"
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-primary opacity-0 blur-3xl transition group-hover:opacity-40"
              />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
                  <s.icon size={20} className="text-primary-foreground" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Contact --------------------------------- */

function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const subject = String(form.get("subject") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (name.length < 2) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email.");
    if (subject.length < 2) return setError("Please add a subject.");
    if (message.length < 10) return setError("Message should be at least 10 characters.");

    try {
      setStatus("loading");
      const { supabase } = await import("@/integrations/supabase/client");
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert({ name, email, subject, message });
      if (dbError) throw dbError;
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Something went wrong. Please try again or email me directly.");
    }
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something"
          desc="Open to internships, freelance and full-time roles."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl glass-strong p-7"
          >
            <h3 className="text-xl font-semibold">Get in touch</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              I'd love to hear about your project or opportunity. Reach out and I'll reply within a day.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <ContactRow icon={Mail} label="Email" value={social.email} href={`mailto:${social.email}`} />
              <ContactRow icon={Github} label="GitHub" value="github.com/vibxanu" href={social.github} />
              <ContactRow icon={Linkedin} label="LinkedIn" value="linkedin.com/in/vibxanu" href={social.linkedin} />
              <ContactRow icon={MapPin} label="Location" value="Sialkot, Pakistan" />
            </ul>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl glass-strong p-7"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field name="name" label="Name" placeholder="Your name" />
              <Field name="email" type="email" label="Email" placeholder="you@email.com" />
            </div>
            <div className="mt-4">
              <Field name="subject" label="Subject" placeholder="What's it about?" />
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me a bit about your idea…"
                maxLength={1500}
                className="mt-1.5 w-full resize-none rounded-2xl bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 transition placeholder:text-muted-foreground/60 focus:ring-primary"
              />
            </div>

            {error && (
              <p className="mt-3 text-xs text-destructive">{error}</p>
            )}
            {status === "success" && (
              <p className="mt-3 text-xs text-green-400">Thanks! Your message is on its way.</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:-translate-y-0.5 disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending
                </>
              ) : (
                <>
                  <Send size={16} /> Send message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 transition group-hover:bg-white/10">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
        <Icon size={16} className="text-primary-foreground" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm">{value}</div>
      </div>
    </div>
  );
  return (
    <li>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="group block">
          {inner}
        </a>
      ) : (
        <div className="group">{inner}</div>
      )}
    </li>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        maxLength={200}
        className="mt-1.5 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 transition placeholder:text-muted-foreground/60 focus:ring-primary"
      />
    </label>
  );
}

/* --------------------------------- Footer --------------------------------- */

function Footer() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.9, 1], [0.6, 1]);
  return (
    <footer className="relative mt-10 pt-20">
      <svg
        aria-hidden
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute -top-1 left-0 h-16 w-full text-primary/20"
      >
        <path
          fill="currentColor"
          d="M0,64L60,58.7C120,53,240,43,360,58.7C480,75,600,117,720,117.3C840,117,960,75,1080,58.7C1200,43,1320,53,1380,58.7L1440,64L1440,120L0,120Z"
        />
      </svg>
      <motion.div style={{ opacity }} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-3">
            <div>
              <a href="#home" className="inline-flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground shadow-glow">
                  M
                </span>
                <span className="font-display text-lg font-semibold text-gradient">Mehak.dev</span>
              </a>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Frontend & React developer building interactive, thoughtful web experiences.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Quick links</h4>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
                {["about", "education", "skills", "projects", "services", "contact"].map((id) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="text-muted-foreground transition hover:text-foreground"
                    >
                      {id[0].toUpperCase() + id.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Say hello</h4>
              <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                <a href={`mailto:${social.email}`} className="hover:text-foreground">{social.email}</a>
                <span>Sialkot, Pakistan</span>
              </div>
              <div className="mt-4 flex gap-2">
                <SocialIcon href={social.github} label="GitHub"><Github size={16} /></SocialIcon>
                <SocialIcon href={social.linkedin} label="LinkedIn"><Linkedin size={16} /></SocialIcon>
                <SocialIcon href={`mailto:${social.email}`} label="Email"><Mail size={16} /></SocialIcon>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} Mehak Shehzadi. Crafted with care.</p>
            <p>Built with React, Tailwind, Three.js & Framer Motion.</p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full glass transition hover:-translate-y-0.5 hover:text-accent"
    >
      {children}
    </a>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow-strong transition hover:-translate-y-0.5"
    >
      <ArrowUp size={18} />
    </motion.button>
  );
}
