"use client";
import React from "react";
import Link from "next/link";
import { ScrollReveal } from "./animations/ScrollReveal";
import { StaggeredList } from "./animations/StaggeredList";
import { GridCard } from "./GridBackground";
import { NeuralNetworkAnimation } from "./animations/NeuralNetworkAnimation";

const skills = [
  { category: "AI & Python", items: "LangChain, PyTorch, FastAPI, vector databases" },
  { category: "Data & Platforms", items: "Supabase, SQL, Microsoft Fabric, NumPy" },
  { category: "Ops & Tooling", items: "AWS (EC2, S3, CloudFront), Docker, GitHub Actions, Dynatrace" },
];

const experience = [
  {
    tier: "01",
    title: "AI Software Engineer",
    company: "Murray Chevrolet",
    location: "Winnipeg, MB",
    period: "Sept 2025 – Present",
    bullets: [
      "Deliver dealership AI copilots and predictive analytics that streamline sales and service decisions.",
      "Partner with sales, marketing, and data teams to roll out ML tools and mentor co-ops on responsible AI use.",
    ],
  },
  {
    tier: "02",
    title: "Software Developer & Project Coordinator",
    company: "Daemon Defense Systems",
    location: "Winnipeg, MB",
    period: "Sep 2022 – Jan 2025",
    bullets: [
      "Led client workshops to launch HIPAA-compliant RIS-PACS across 80+ sites with zero disruption.",
      "Coordinated engineers and vendors to deploy Azure and Dynatrace observability and resolve issues fast.",
    ],
  },
  {
    tier: "03",
    title: "Software Developer Intern",
    company: "InfoMagnetics Technologies",
    location: "Winnipeg, MB",
    period: "May 2022 – Sep 2022",
    bullets: [
      "Integrated Loqate API with IBM MDM to deliver secure, normalized healthcare data flows.",
      "Championed Jira adoption and agile cadences, lifting team throughput by 20% and improving communication.",
    ],
  },
];

export default function HomeContent() {
  return (
    <div className="w-full space-y-24">
      {/* Hero Section - Split Layout */}
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: Large Headline + CTA */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="space-y-8">
            <h1 className="font-serif text-fluid-6xl font-semibold leading-[1.1] tracking-tight lg:text-fluid-7xl">
              Building
              <br />
              intelligent
              <br />
              systems
            </h1>

            <p className="max-w-lg font-mono text-fluid-base leading-relaxed text-foreground/80">
              I&apos;m Saksham Bedi, an AI software engineer developing production-ready
              ML systems that stay compliant, deliver clear business results, and keep
              teams aligned. Currently at Murray Chevrolet, building dealership AI copilots
              and predictive analytics.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="#contact" className="atlas-cta">
                CONTACT ME
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Neural Network Animation */}
        <div className="space-y-8">
          <ScrollReveal animation="fade-up" delay={0.3}>
            <GridCard className="hidden lg:block p-6" showCorners showGrid={false}>
              <div className="relative h-96">
                <NeuralNetworkAnimation />
              </div>
            </GridCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Skills Section */}
      <ScrollReveal animation="fade-up" delay={0.15}>
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-coral font-serif text-fluid-4xl font-semibold tracking-tight">
              Technical Skills
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <StaggeredList className="space-y-4" stagger={0.08}>
            {skills.map((skill, index) => (
              <div key={skill.category} className="flex items-start gap-4">
                <span className="document-label w-8 shrink-0 text-muted-foreground">
                  [{String(index + 1).padStart(2, "0")}]
                </span>
                <p className="font-mono text-fluid-base">
                  <span className="font-semibold text-foreground">
                    {skill.category}:{" "}
                  </span>
                  <span className="text-muted-foreground">{skill.items}</span>
                </p>
              </div>
            ))}
          </StaggeredList>
        </section>
      </ScrollReveal>

      {/* Work Experience Section */}
      <section className="space-y-8">
        <ScrollReveal animation="fade-up">
          <div className="flex items-center gap-4">
            <h2 className="text-coral font-serif text-fluid-4xl font-semibold tracking-tight">
              Work Experience
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {experience.map((job, index) => (
            <ScrollReveal
              key={job.title + job.company}
              animation="fade-up"
              delay={index * 0.1}
            >
              <GridCard className="group" showCorners>
                <article className="relative p-5 lg:p-8">
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 lg:gap-4">
                      <div>
                        <h3 className="font-serif text-fluid-2xl font-semibold text-foreground">
                          {job.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-fluid-sm">
                          <span className="text-foreground font-medium">{job.company}</span>
                          <span className="hidden lg:inline text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{job.location}</span>
                        </div>
                      </div>
                      <span className="shrink-0 self-start px-3 py-1 border border-border text-muted-foreground bg-muted/30 font-mono text-fluid-sm">
                        {job.period}
                      </span>
                    </div>

                    <StaggeredList
                      className="space-y-2 pt-2"
                      stagger={0.05}
                      animation="fade-left"
                    >
                      {job.bullets.map((bullet, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="font-mono text-fluid-sm mt-1 text-coral shrink-0">→</span>
                          <p className="font-mono text-fluid-base text-foreground/80 leading-relaxed">
                            {bullet}
                          </p>
                        </div>
                      ))}
                    </StaggeredList>
                  </div>
                </article>
              </GridCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <ScrollReveal animation="fade-up" delay={0.1}>
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-coral font-serif text-fluid-4xl font-semibold tracking-tight">
              Education
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <GridCard className="p-8" showCorners>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-fluid-xl font-semibold text-foreground">
                  B.Sc. in Computer Science
                </h3>
                <p className="mt-2 font-mono text-fluid-base text-muted-foreground">
                  University of Manitoba
                </p>
              </div>
              <span className="font-mono text-fluid-sm px-3 py-1.5 border border-border text-muted-foreground bg-muted/30">
                2020 — 2025
              </span>
            </div>
          </GridCard>
        </section>
      </ScrollReveal>

      {/* Philosophy Section */}
      <ScrollReveal animation="fade-up" delay={0.1}>
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-coral font-serif text-fluid-4xl font-semibold tracking-tight">
              Philosophy
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <p className="font-mono text-fluid-base text-foreground/80 leading-relaxed max-w-3xl">
            Build production-ready AI systems that are interpretable, scalable, and aligned with real business goals. 
            Focus on clean architecture, automation, and delivering measurable impact—not just research prototypes.
          </p>
        </section>
      </ScrollReveal>
    </div>
  );
}
