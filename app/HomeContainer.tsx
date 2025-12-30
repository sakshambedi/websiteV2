"use client";
import React, { useEffect, useState, useRef } from "react";
import NavBar from "@/components/NavBar";
import BlogTable from "@/components/BlogTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeContent from "@/components/HomeContent";
import { ArrowUpRight } from "lucide-react";
import ProjectContent from "@/components/ProjectContent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AllPostDataTableInterface } from "@/interface/PostData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { StaggeredList } from "@/components/animations/StaggeredList";

const ALLOWED_TABS = ["home", "blog", "projects"] as const;
const isAllowedTab = (
  value: string | null
): value is (typeof ALLOWED_TABS)[number] =>
  value !== null &&
  ALLOWED_TABS.includes(value as (typeof ALLOWED_TABS)[number]);

const socialLinks = [
  { name: "github", href: "https://github.com/sakshambedi" },
  { name: "linkedin", href: "https://www.linkedin.com/in/sakshambedi/" },
  { name: "hugging face", href: "https://huggingface.co/sakshambedi" },
];

export default function HomeContainer({
  allData,
}: {
  allData: AllPostDataTableInterface;
}) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouter();
  const pathname = usePathname();
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAllowedTab(tabParam)) {
      setActiveTab(tabParam);
    } else if (!tabParam) {
      setActiveTab("home");
    }
  }, [tabParam]);

  // Animate tab indicator
  useGSAP(
    () => {
      if (!tabsRef.current || !indicatorRef.current) return;

      const activeTabEl = tabsRef.current.querySelector(
        '[data-state="active"]'
      ) as HTMLElement;
      if (!activeTabEl) return;

      gsap.to(indicatorRef.current, {
        x: activeTabEl.offsetLeft,
        width: activeTabEl.offsetWidth,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    { scope: tabsRef, dependencies: [activeTab] }
  );

  // Animate tab content on change
  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    },
    { dependencies: [activeTab] }
  );

  const handleTabChange = (value: string) => {
    if (!isAllowedTab(value)) return;
    setActiveTab(value);
    if (!pathname) return;

    const params = new URLSearchParams(searchParams.toString());
    if (value === "home") {
      params.delete("tab");
    } else {
      params.set("tab", value);
    }
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <main className="flex flex-col w-full min-h-screen bg-background">
      <NavBar />

      <section className="w-full max-w-5xl flex flex-col flex-grow items-center self-center mx-auto px-8 phone:px-4">
        <Tabs
          value={activeTab}
          defaultValue="home"
          className="w-full flex flex-col py-8 phone:py-6 items-center gap-8"
          onValueChange={handleTabChange}
        >
          <div ref={tabsRef} className="relative">
            <TabsList className="flex w-full max-w-md justify-center gap-8 font-mono font-normal phone:gap-4 bg-transparent">
              <TabsTrigger
                value="home"
                className="relative text-fluid-xl font-rebondG text-muted-foreground data-[state=active]:text-foreground transition-colors duration-300 bg-transparent hover:text-foreground/80"
                style={{ boxShadow: "none", outline: "none" }}
              >
                home
              </TabsTrigger>
              <TabsTrigger
                value="blog"
                className="relative text-fluid-xl font-rebondG text-muted-foreground data-[state=active]:text-foreground transition-colors duration-300 bg-transparent hover:text-foreground/80"
                style={{ boxShadow: "none", outline: "none" }}
              >
                blog
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="relative text-fluid-xl font-rebondG text-muted-foreground data-[state=active]:text-foreground transition-colors duration-300 bg-transparent hover:text-foreground/80"
                style={{ boxShadow: "none", outline: "none" }}
              >
                projects
              </TabsTrigger>
            </TabsList>
            {/* Animated underline indicator */}
            <div
              ref={indicatorRef}
              className="absolute -bottom-1 h-px bg-foreground"
              style={{ width: 0 }}
            />
          </div>

          <div ref={contentRef} className="w-full">
            <TabsContent
              value="home"
              className="flex flex-col items-center mt-0"
            >
              <HomeContent />
            </TabsContent>
            <TabsContent
              value="blog"
              className="flex w-full flex-col items-center mt-0"
            >
              <BlogTable allData={allData} />
            </TabsContent>
            <TabsContent
              value="projects"
              className="flex flex-col items-center mt-0"
            >
              <ProjectContent />
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer with magnetic social links */}
        <footer className="mt-auto w-full py-12 phone:py-8">
          <StaggeredList
            className="flex flex-row justify-center gap-12 phone:flex-col phone:gap-4 phone:items-center"
            stagger={0.1}
          >
            {socialLinks.map((link) => (
              <MagneticButton
                key={link.name}
                as="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                strength={0.3}
              >
                <span className="flex items-center gap-1.5 font-rebondG text-fluid-base font-light text-foreground">
                  <span className="hover-underline">{link.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-300 ease-out-expo group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                </span>
              </MagneticButton>
            ))}
          </StaggeredList>
        </footer>
      </section>
    </main>
  );
}
