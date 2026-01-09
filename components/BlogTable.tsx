"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import {
  AllPostDataTableInterface,
  BlogPostTableInterface,
} from "@/interface/PostData";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollReveal } from "./animations/ScrollReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function AnimatedBlogRow({
  slug,
  date,
  title,
  category,
  index,
}: BlogPostTableInterface & { index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !rowRef.current) return;

      gsap.from(rowRef.current, {
        opacity: 0,
        x: -20,
        delay: index * 0.05,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: rowRef }
  );

  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    month: "short",
    year: "2-digit",
  }).toUpperCase().replace(" ", " '");

  return (
    <div
      ref={rowRef}
      className="group border-b border-border transition-colors duration-200 hover:bg-muted/30"
    >
      <Link
        href={`/blog/${slug}/`}
        className="flex items-center gap-4 py-5 px-2"
      >
        {/* Index */}
        <span className="document-label w-12 shrink-0 text-muted-foreground">
          [{String(index + 1).padStart(2, "0")}]
        </span>

        {/* Date */}
        <span className="font-mono text-fluid-sm text-muted-foreground w-24 shrink-0 hidden md:block">
          {formattedDate}
        </span>

        {/* Title */}
        <span className="flex-1 font-mono text-fluid-base text-foreground group-hover:text-coral transition-colors">
          {title}
        </span>

        {/* Category Tag */}
        <span className="font-mono text-fluid-xs uppercase tracking-widest text-muted-foreground border border-border px-3 py-1 shrink-0 hidden sm:block">
          {category}
        </span>

        {/* Arrow */}
        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-coral shrink-0" />
      </Link>
    </div>
  );
}

export default function BlogTable({
  allData,
}: {
  allData: AllPostDataTableInterface;
}) {
  if (!allData || allData.length === 0) {
    return (
      <div className="border border-border p-8 text-center">
        <p className="font-mono text-fluid-base text-muted-foreground">
          NO ARTICLES FOUND IN DATABASE.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full space-y-8">
      {/* Header */}
      <ScrollReveal animation="fade-up">
        <div className="flex items-center gap-4">
          <h2 className="text-coral font-serif text-fluid-4xl font-semibold tracking-tight">
            Articles & Notes
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <p className="mt-2 font-mono text-fluid-base text-muted-foreground">
          Technical writings on AI, machine learning, and software engineering.
        </p>
      </ScrollReveal>

      {/* Table Header */}
      <div className="border-b-2 border-foreground">
        <div className="flex items-center gap-4 py-3 px-2 font-mono text-fluid-xs uppercase tracking-widest text-muted-foreground">
          <span className="w-12 shrink-0">IDX</span>
          <span className="w-24 shrink-0 hidden md:block">DATE</span>
          <span className="flex-1">TITLE</span>
          <span className="shrink-0 hidden sm:block">TYPE</span>
          <span className="w-4 shrink-0" />
        </div>
      </div>

      {/* Blog Entries */}
      <div className="divide-y divide-border border-b border-border">
        {allData.map((post, index) => (
          <AnimatedBlogRow
            key={post.slug}
            {...post}
            index={index}
          />
        ))}
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between font-mono text-fluid-xs uppercase tracking-widest text-muted-foreground pt-4">
        <span>TOTAL ENTRIES: {allData.length}</span>
        <span>LAST SYNC: {new Date().toLocaleDateString()}</span>
      </div>
    </section>
  );
}
