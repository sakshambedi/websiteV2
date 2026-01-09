"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TechStackIcon from "./TechStackIcon";
import { ScrollReveal } from "./animations/ScrollReveal";
import { StaggeredList } from "./animations/StaggeredList";
import { GridCard } from "./GridBackground";

// Calculate years of experience from start date (Sep 2022)
const calculateYearsExperience = (): number => {
  const startDate = new Date(2022, 8, 1); // September 2022 (month is 0-indexed)
  const now = new Date();
  const diffYears = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(diffYears);
};

interface Project {
  tier: string;
  title: string;
  subtitle: string;
  bullets: string[];
  techStack: { src: string; alt: string }[];
}

const research: Project = {
  tier: "R1",
  title: "3D Point Cloud Diffusion Model",
  subtitle: "University of Manitoba",
  bullets: [
    "Preprocessed raw .ply point cloud data by cleaning noise and normalizing coordinates for model training.",
    "Developed and trained an autoencoder-driven diffusion model to generate high-fidelity synthetic 3D point clouds.",
    "Slashed data collection time from 90–120 days to minutes, significantly reducing costs for agricultural research.",
  ],
  techStack: [
    { src: "/icons/techstack/python.svg", alt: "Python" },
    { src: "/icons/techstack/pytorch.svg", alt: "PyTorch" },
  ],
};

const projects: Project[] = [
  {
    tier: "01",
    title: "Image Classification Web App",
    subtitle: "Summer 2024",
    bullets: [
      "Built a scalable ML pipeline using PyTorch and FastAPI, exposing a RESTful API for real-time image classification.",
      "Designed a responsive React frontend with a focus on intuitive UI/UX.",
      "Deployed on AWS EC2 with Docker, integrating S3 and CloudFront for asset delivery.",
      "Improved platform reliability and team velocity through clear API contracts and modular architecture.",
    ],
    techStack: [
      { src: "/icons/techstack/amazonecs.svg", alt: "Amazon ECS" },
      { src: "/icons/techstack/amazons3.svg", alt: "AWS S3" },
      { src: "/icons/techstack/docker.svg", alt: "Docker" },
      { src: "/icons/techstack/githubactions.svg", alt: "Github Actions" },
      { src: "/icons/techstack/python.svg", alt: "Python" },
      { src: "/icons/techstack/pytorch.svg", alt: "PyTorch" },
      { src: "/icons/techstack/react.svg", alt: "React" },
      { src: "/icons/techstack/FastAPI.svg", alt: "FastAPI" },
    ],
  },
  {
    tier: "02",
    title: "MicroGrad – Deep Learning Framework",
    subtitle: "Summer 2025",
    bullets: [
      "Designed and implemented a deep learning framework with a handwritten autograd engine and optimized CPU tensor kernels using Eigen.",
      "Built for extensible ML/AI workflows with a focus on computational efficiency.",
      "Architecture enables future support for CUDA, Metal, and OpenGL backends for GPU acceleration.",
      "Emphasized performance-critical operations, cross-platform compatibility, and modular infrastructure for rapid model prototyping.",
      "Developed and maintained integration/unit tests using Pytest.",
    ],
    techStack: [
      { src: "/icons/techstack/python.svg", alt: "Python" },
      { src: "/icons/techstack/pytest.svg", alt: "Pytest" },
      { src: "/icons/techstack/cpp.svg", alt: "C++" },
    ],
  },
];

function ProjectCard({
  project,
  isResearch = false,
}: {
  project: Project;
  isResearch?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      const card = cardRef.current;

      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -4,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: cardRef }
  );

  return (
    <GridCard className="group" showCorners>
      <article ref={cardRef} className="p-8">
        <div className="space-y-6">
          <p className="text-coral font-mono text-fluid-sm uppercase tracking-widest">
            {isResearch ? "RESEARCH" : "PROJECT"} {project.tier}
          </p>
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h3 className="font-serif text-fluid-2xl font-semibold text-foreground">
              {project.title}
            </h3>
            <span className="font-mono text-fluid-xs uppercase tracking-widest text-muted-foreground border border-border px-3 py-1.5 bg-muted/30">
              {project.subtitle}
            </span>
          </div>

          {/* Bullets */}
          <StaggeredList className="space-y-3" stagger={0.05} animation="fade-left">
            {project.bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-mono text-fluid-sm mt-1 text-coral shrink-0">→</span>
                <p className="font-mono text-fluid-base text-foreground/80 leading-relaxed">
                  {bullet}
                </p>
              </div>
            ))}
          </StaggeredList>

          {/* Tech Stack */}
          <div className="tech-stack-container">
            {project.techStack.map((tech) => (
              <div key={tech.alt} className="tech-stack-badge">
                <TechStackIcon
                  src={tech.src}
                  alt={tech.alt}
                  index={0}
                  className="dark:invert w-5 h-5"
                />
                <span className="font-mono text-fluid-xs text-muted-foreground">
                  {tech.alt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </article>
    </GridCard>
  );
}

export default function ProjectContent() {
  return (
    <section className="w-full space-y-16">
      {/* Research Section */}
      <div className="space-y-8">
        <ScrollReveal animation="fade-up">
          <div className="flex items-center gap-4">
            <h2 className="text-coral font-serif text-fluid-4xl font-semibold tracking-tight">
              Academic Research
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.1}>
          <ProjectCard project={research} isResearch />
        </ScrollReveal>
      </div>

      {/* Projects Section */}
      <div className="space-y-8">
        <ScrollReveal animation="fade-up">
          <div className="flex items-center gap-4">
            <h2 className="text-coral font-serif text-fluid-4xl font-semibold tracking-tight">
              Featured Work
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
        </ScrollReveal>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} animation="fade-up" delay={index * 0.1}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <ScrollReveal animation="fade-up">
        <div className="flex items-center gap-4 mb-2">
          <h3 className="text-coral font-serif text-fluid-4xl font-semibold tracking-tight">
            Metrics
          </h3>
          <div className="h-px flex-1 bg-border" />
        </div>
      </ScrollReveal>
      
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[          
          { label: "TECHNOLOGIES", value: "15+" },
          { label: "YEARS EXP", value: `${calculateYearsExperience()}+` },          
        ].map((stat, index) => (
          <ScrollReveal key={stat.label} animation="fade-up" delay={index * 0.05}>
            <div className="metric-card text-center">
              <span className="metric-value">{stat.value}</span>
              <span className="metric-label block">{stat.label}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
