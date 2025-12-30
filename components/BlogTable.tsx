"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AllPostDataTableInterface,
  BlogPostTableInterface,
} from "@/interface/PostData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function AnimatedTableRow({
  slug,
  date,
  title,
  category,
  index,
}: BlogPostTableInterface & { index: number }) {
  const rowRef = useRef<HTMLTableRowElement>(null);
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
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: rowRef, dependencies: [prefersReducedMotion, index] }
  );

  const formattedDate = `${new Date(date)
    .toLocaleDateString(undefined, { month: "short" })
    .toLowerCase()} '${new Date(date).getFullYear().toString().slice(-2)}`;

  return (
    <TableRow
      ref={rowRef}
      className="group cursor-pointer border-b border-border/50 transition-colors duration-200 hover:bg-muted/30"
    >
      <TableCell className="text-fluid-base text-left text-muted-foreground w-20 pr-0 pl-0 phone:px-0 phone:w-12 md:w-16 py-4 phone:py-3">
        {formattedDate}
      </TableCell>
      <TableCell className="text-fluid-base text-left px-2 text-foreground phone:px-1 py-4 phone:py-3 md:px-3">
        <Link
          href={`/blog/${slug}/`}
          className="relative inline-block group-hover:text-foreground transition-colors duration-200"
        >
          <span className="relative">
            {title}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground transition-all duration-300 ease-out-expo group-hover:w-full" />
          </span>
        </Link>
      </TableCell>
      <TableCell className="text-fluid-sm text-right text-muted-foreground px-0 w-20 phone:px-0 py-4 phone:py-3 phone:w-12">
        <span className="px-2 py-1 rounded-sm bg-muted/50 text-muted-foreground transition-colors duration-200 group-hover:bg-muted group-hover:text-foreground">
          {category}
        </span>
      </TableCell>
    </TableRow>
  );
}

export default function BlogTable({
  allData,
}: {
  allData: AllPostDataTableInterface;
}) {
  if (!allData || allData.length === 0) {
    return (
      <p className="text-muted-foreground font-mono text-fluid-base">
        No articles found.
      </p>
    );
  }

  return (
    <section className="flex w-full flex-col items-center justify-center font-mono">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-transparent">
            <TableHead className="text-fluid-sm text-left text-muted-foreground font-normal pl-0 phone:px-0">
              date
            </TableHead>
            <TableHead className="text-fluid-sm text-left text-muted-foreground font-normal phone:px-1">
              title
            </TableHead>
            <TableHead className="text-fluid-sm text-right text-muted-foreground font-normal pr-0 phone:px-0">
              category
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allData.map((post, index) => (
            <AnimatedTableRow
              key={post.slug}
              {...post}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
