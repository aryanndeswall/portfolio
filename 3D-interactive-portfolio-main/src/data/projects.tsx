import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowDownUpIcon, ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiChakraui,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
  SiVite,
  SiNetlify,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiApachemaven,
  SiCplusplus,
  SiArduino,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import css from "styled-jsx/css";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant={"default"} size={"sm"}>
          Visit Website
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <SiChakraui />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
  // +
  vite: {
    title: "Vite",
    bg: "black",
    fg: "white",
    icon: <SiVite />,
  },
  openai: {
    title: "OpenAI",
    bg: "black",
    fg: "white",
    icon: <img src="assets/icons/openai-svgrepo-com_white.svg" alt="OpenAI"/>,
  },
  netlify: {
    title: "Netlify",
    bg: "black",
    fg: "white",
    icon: <SiNetlify/>,
  },
  html: {
    title: "HTML5",
    bg: "black",
    fg: "white",
    icon: <SiHtml5/>,
  },
  css: {
    title: "CSS3",
    bg: "black",
    fg: "white",
    icon: <SiCss3/>,
  },
  bootstrap: {
    title: "Bootstrap",
    bg: "black",
    fg: "white",
    icon: <SiBootstrap/>,
  },
  maven: {
    title: "Maven",
    bg: "black",
    fg: "white",
    icon: <SiApachemaven/>,
  },
  java: {
    title: "Java",
    bg: "black",
    fg: "white",
    icon: <img src="assets/icons/icons8-java.svg" alt="Java"/>,
  },
  cplusplus: {
    title: "C++",
    bg: "black",
    fg: "white",
    icon: <SiCplusplus/>,
  },
  arduino: {
    title: "Arduino",
    bg: "black",
    fg: "white",
    icon: <SiArduino/>,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  { // 01. AuditAI - AI Spend Audit SaaS
    id: "auditai",
    category: "AI SaaS",
    title: "AuditAI - AI Spend Audit & Optimization",
    src: "/assets/projects-screenshots/auditai/1.png",
    screenshots: ["1.png"],
    live: "https://audit-ai-all.vercel.app",
    github: "https://github.com/aryanndeswall",
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.shadcn,
        PROJECT_SKILLS.framerMotion,
      ],
      backend: [
        PROJECT_SKILLS.supabase,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.prisma,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            AuditAI - AI-Powered Spend Audit for Startup Founders
          </TypographyP>
          <TypographyP className="font-mono">
            A premium, no-login AI spend audit tool for startup founders and engineering managers.
            It runs deterministic optimization rules via a custom audit engine to find potential
            savings, generates sanitized public reports, and captures qualified leads post-value
            using a smart email gate.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Tech Stack</TypographyH3>
          <p className="font-mono mb-2">
            Built with Next.js 15, TypeScript, Prisma ORM, PostgreSQL via Supabase,
            Recharts for data visualization, and Resend API for email delivery.
          </p>
          <TypographyH3 className="my-4 mt-8">Key Features</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>No-login audit flow - instant value delivery</li>
            <li>Deterministic AI optimization rule engine</li>
            <li>Sanitized, shareable public audit reports</li>
            <li>Smart email gate for qualified lead capture</li>
            <li>Interactive charts & savings projections via Recharts</li>
          </ul>
        </div>
      );
    },
  },
  { // 02. Agri-Score - AI Agricultural Credit Platform
    id: "agriscore",
    category: "AI Platform",
    title: "Agri-Score - Agricultural Credit Risk AI",
    src: "/assets/projects-screenshots/agriscore/1.png",
    screenshots: ["1.png"],
    live: "https://agriscore-omega.vercel.app",
    github: "https://github.com/aryanndeswall/agriscore",
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.framerMotion,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.supabase,
        PROJECT_SKILLS.firebase,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Agri-Score - Rural Agricultural Land Intelligence
          </TypographyP>
          <TypographyP className="font-mono">
            AI-powered platform for rural agricultural land intelligence and credit risk assessment.
            Uses machine learning models to evaluate agricultural credit risks, integrates with
            Google Earth Engine for spatial analysis, and features interactive maps and data
            visualization for land metrics.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Key Features</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>ML models for agricultural credit risk scoring</li>
            <li>Google Earth Engine integration for spatial land analysis</li>
            <li>Interactive maps & land metric visualizations</li>
            <li>Supabase backend for real-time data management</li>
            <li>FastAPI Python backend for model inference</li>
          </ul>
          <TypographyH3 className="my-4 mt-8">Stack</TypographyH3>
          <p className="font-mono mb-2">
            Flutter frontend | Python FastAPI | Machine Learning | Google Earth Engine | Supabase | Riverpod
          </p>
        </div>
      );
    },
  },
  { // 03. AgriChain - Web3 Blockchain Agricultural Supply Chain
    id: "agrichain",
    category: "Web3 & Blockchain",
    title: "AgriChain - Blockchain Agricultural Supply Chain",
    src: "/assets/projects-screenshots/agrichain/1.png",
    screenshots: ["1.png"],
    live: "https://agrichain-wheat.vercel.app",
    github: "https://github.com/aryanndeswall/geetauni-main",
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.firebase,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.mongo,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            AgriChain - Web3 Agricultural Supply Chain
          </TypographyP>
          <TypographyP className="font-mono">
            Full-stack blockchain agricultural supply chain platform with Flutter web frontend and
            EVM-compatible smart contracts in Solidity. Features KYC via DigiLocker, decentralized
            crop registration, escrow payments, farmer voting, fiat payments via Razorpay, and
            Indian regulatory compliance.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Key Features</TypographyH3>
          <ul className="list-disc ml-6 font-mono space-y-2">
            <li>EVM-compatible Solidity smart contracts</li>
            <li>KYC verification via DigiLocker integration</li>
            <li>Decentralized crop registration & farmer voting</li>
            <li>Escrow payment system for secure transactions</li>
            <li>Razorpay fiat payment gateway integration</li>
            <li>Indian regulatory compliance built-in</li>
          </ul>
          <TypographyH3 className="my-4 mt-8">Stack</TypographyH3>
          <p className="font-mono mb-2">
            Flutter | Solidity | Web3 | Firebase | ethers.js | Razorpay | Mocha/Chai testing
          </p>
        </div>
      );
    },
  },
];
export default projects;
