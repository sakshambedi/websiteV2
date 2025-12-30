"use client";
import React from "react";
import { ScrollReveal } from "./animations/ScrollReveal";
import { StaggeredList } from "./animations/StaggeredList";

const skills = [
  { category: "AI & Python", items: "LangChain, PyTorch, FastAPI, vector databases" },
  { category: "Data & Platforms", items: "Supabase, SQL, Microsoft Fabric, NumPy" },
  { category: "Ops & Tooling", items: "AWS (EC2, S3, CloudFront), Docker, GitHub Actions, Dynatrace" },
];

const experience = [
  {
    title: "AI Software Engineer",
    company: "Murray Chevrolet",
    location: "Winnipeg, MB",
    period: "Jan 2025 – Present",
    bullets: [
      "Deliver dealership AI copilots and predictive analytics that streamline sales and service decisions.",
      "Partner with sales, marketing, and data teams to roll out ML tools and mentor co-ops on responsible AI use.",
    ],
  },
  {
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
    <div className="w-full pt-6 space-y-16 phone:space-y-12">
      {/* Bio Section */}
      <ScrollReveal animation="fade-up" delay={0.1}>
        <div className="space-y-4">
          <p className="text-fluid-base font-mono text-muted-foreground">
            Hi!
          </p>
          <p className="text-fluid-base font-mono text-foreground/80 leading-relaxed">
            I&apos;m Saksham Bedi, an AI software engineer at Murray Chevrolet and
            Computer Science student at the University of Manitoba. I build
            production-ready ML systems that stay compliant, deliver clear
            business results, and keep teams aligned; outside work you&apos;ll find me
            playing squash, golf, chess, or watching F1.
          </p>
        </div>
      </ScrollReveal>

      {/* Skills Section */}
      <ScrollReveal animation="fade-up" delay={0.15}>
        <section className="space-y-6">
          <h2 className="font-rebondG text-fluid-3xl tracking-heading text-foreground">
            Skills
          </h2>
          <StaggeredList className="space-y-3" stagger={0.08}>
            {skills.map((skill) => (
              <p key={skill.category} className="font-mono text-fluid-base">
                <span className="font-semibold text-foreground">
                  {skill.category}:{" "}
                </span>
                <span className="text-muted-foreground">{skill.items}</span>
              </p>
            ))}
          </StaggeredList>
        </section>
      </ScrollReveal>

      {/* Work Experience Section */}
      <section className="space-y-8">
        <ScrollReveal animation="fade-up">
          <h2 className="font-rebondG text-fluid-3xl tracking-heading text-foreground">
            Work Experience
          </h2>
        </ScrollReveal>

        <div className="relative space-y-10">
          {/* Timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border phone:hidden" />

          {experience.map((job, index) => (
            <ScrollReveal
              key={job.title + job.company}
              animation="fade-up"
              delay={index * 0.1}
            >
              <div className="relative pl-6 phone:pl-0">
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-foreground -translate-x-[3px] phone:hidden" />

                <div className="space-y-3">
                  <div>
                    <h3 className="text-fluid-xl font-rebondG font-semibold text-foreground">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap justify-between items-center gap-2 mt-1">
                      <p className="text-fluid-base font-mono text-muted-foreground">
                        {job.company}, {job.location}
                      </p>
                      <time className="text-fluid-sm font-mono text-muted-foreground/70">
                        {job.period}
                      </time>
                    </div>
                  </div>

                  <StaggeredList
                    className="space-y-2"
                    stagger={0.05}
                    animation="fade-left"
                  >
                    {job.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="list-disc list-outside ml-5 text-fluid-base font-mono text-foreground/70"
                      >
                        {bullet}
                      </li>
                    ))}
                  </StaggeredList>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <ScrollReveal animation="fade-up" delay={0.1} trigger="load">
        <section className="space-y-4">
          <h2 className="font-rebondG text-fluid-3xl tracking-heading text-foreground">
            Education
          </h2>
          <div className="space-y-1">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <h3 className="font-mono text-fluid-lg text-foreground">
                B.Sc. in Computer Science
              </h3>
              <span className="font-mono text-fluid-base text-muted-foreground">
                2020 - 2025
              </span>
            </div>
            <p className="font-mono text-fluid-base text-muted-foreground">
              University of Manitoba
            </p>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
