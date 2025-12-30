"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TechStackIcon from "./TechStackIcon";
import { ScrollReveal } from "./animations/ScrollReveal";
import { StaggeredList } from "./animations/StaggeredList";
import { AnimatedText } from "./animations/AnimatedText";

interface Project {
  title: string;
  subtitle: string;
  bullets: string[];
  techStack: { src: string; alt: string }[];
}

const research: Project = {
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
  index,
}: {
  project: Project;
  index: number;
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
    <ScrollReveal animation="fade-up" delay={index * 0.1}>
      <article
        ref={cardRef}
        className="group relative p-6 -mx-6 rounded-lg transition-colors duration-300 hover:bg-muted/50"
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-start gap-2">
            <h3 className="text-fluid-xl font-rebondG font-semibold text-foreground">
              {project.title}
            </h3>
            <span className="text-fluid-sm font-mono text-muted-foreground shrink-0">
              {project.subtitle}
            </span>
          </div>

          {/* Bullets */}
          <StaggeredList className="space-y-2" stagger={0.05} animation="fade-left">
            {project.bullets.map((bullet, i) => (
              <li
                key={i}
                className="list-disc list-outside ml-5 text-fluid-base font-mono text-foreground/70"
              >
                {bullet}
              </li>
            ))}
          </StaggeredList>

          {/* Tech Stack */}
          <div className="flex flex-row flex-wrap pt-4 gap-6 phone:gap-5">
            {project.techStack.map((tech, i) => (
              <TechStackIcon
                key={tech.alt}
                src={tech.src}
                alt={tech.alt}
                index={i}
                className="dark:invert w-7 h-7 phone:w-6 phone:h-6 transition-transform duration-200 hover:scale-110"
              />
            ))}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export default function ProjectContent() {
  return (
    <section className="w-full space-y-12">
      {/* Research Section */}
      <div className="space-y-6">
        <ScrollReveal animation="fade-up">
          <h2 className="font-rebondG text-fluid-3xl tracking-heading text-foreground">
            <AnimatedText as="span" animation="words" trigger="scroll">
              Research
            </AnimatedText>
          </h2>
        </ScrollReveal>

        <ProjectCard project={research} index={0} />
      </div>

      {/* Projects Section */}
      <div className="space-y-6">
        <ScrollReveal animation="fade-up">
          <h2 className="font-rebondG text-fluid-3xl tracking-heading text-foreground">
            <AnimatedText as="span" animation="words" trigger="scroll">
              Projects
            </AnimatedText>
          </h2>
        </ScrollReveal>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
