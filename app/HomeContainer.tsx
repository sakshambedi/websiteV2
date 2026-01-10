"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import BlogTable from "@/components/BlogTable";
import HomeContent from "@/components/HomeContent";
import ProjectContent from "@/components/ProjectContent";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ArrowUpRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AllPostDataTableInterface } from "@/interface/PostData";

const ALLOWED_TABS = ["home", "blog", "projects"] as const;
const isAllowedTab = (
  value: string | null
): value is (typeof ALLOWED_TABS)[number] =>
  value !== null &&
  ALLOWED_TABS.includes(value as (typeof ALLOWED_TABS)[number]);

const socialLinks = [
  { name: "GITHUB", href: "https://github.com/sakshambedi" },
  { name: "LINKEDIN", href: "https://www.linkedin.com/in/sakshambedi/" },
  { name: "HUGGING FACE", href: "https://huggingface.co/sakshambedi" },
];

export default function HomeContainer({
  allData,
}: {
  allData: AllPostDataTableInterface;
}) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState("home");
  const [winnipegTime, setWinnipegTime] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAllowedTab(tabParam)) {
      setActiveTab(tabParam);
    } else if (!tabParam) {
      setActiveTab("home");
    }
  }, [tabParam]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const winnipegTimeString = now.toLocaleString("en-US", {
        timeZone: "America/Winnipeg",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setWinnipegTime(winnipegTimeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

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
    <div className="flex flex-col w-full min-h-screen bg-background">
      <NavBar />

      <main className="flex-1">
        <div className="w-full px-4 lg:px-8 py-12">
          <Tabs
            value={activeTab}
            defaultValue="home"
            className="w-full flex flex-col"
            onValueChange={handleTabChange}
          >
            {/* Tab Content - No Tab Navigation UI */}
            <div className="w-full">
              <TabsContent value="home" className="flex w-full flex-col mt-0">
                <HomeContent />
              </TabsContent>
              <TabsContent value="blog" className="flex w-full flex-col mt-0">
                <BlogTable allData={allData} />
              </TabsContent>
              <TabsContent value="projects" className="flex w-full flex-col mt-0">
                <ProjectContent />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer id="contact" className="w-full bg-foreground text-background">
        {/* Main Footer Content */}
        <div className="px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left: CTA */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-coral" />
                <span className="font-mono text-fluid-sm uppercase tracking-widest text-background/70">
                  Get In Touch
                </span>
              </div>
              <h2 className="font-serif text-fluid-4xl font-semibold italic">
                Let&apos;s Connect
              </h2>
              <p className="max-w-md font-mono text-fluid-base text-background/70">
                Interested in AI/ML projects, collaborations, or just want to chat about
                technology? I&apos;d love to hear from you.
              </p>
              <a
                href="mailto:hello@sakshambedi.com"
                className="inline-flex items-center gap-2 border-2 border-background px-6 py-3 font-mono text-fluid-sm uppercase tracking-widest transition-colors hover:bg-background hover:text-foreground"
              >
                SEND EMAIL
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Right: Links */}
            <div className="flex flex-col justify-between gap-8 lg:items-end">
              <div className="space-y-4">
                <span className="font-mono text-fluid-xs uppercase tracking-widest text-background/50">
                  CONNECT
                </span>
                <nav className="flex flex-col gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 font-mono text-fluid-sm uppercase tracking-widest text-background transition-colors hover:text-background/70"
                    >
                      {link.name}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20">
          <div className="px-4 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-fluid-xs uppercase tracking-widest text-background/50">
              <span>{winnipegTime} @ WINNIPEG, MB</span>
              <span>BUILT WITH ❤️</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
