"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import BlogTable from "@/components/BlogTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeContent from "@/components/HomeContent";
import Image from "next/image";
import ProjectContent from "@/components/ProjectContent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AllPostDataTableInterface } from "@/interface/PostData";

const ALLOWED_TABS = ["home", "blog", "projects"] as const;
const isAllowedTab = (
  value: string | null,
): value is (typeof ALLOWED_TABS)[number] =>
  value !== null &&
  ALLOWED_TABS.includes(value as (typeof ALLOWED_TABS)[number]);

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

  useEffect(() => {
    // Set active tab based on URL parameter
    if (isAllowedTab(tabParam)) {
      setActiveTab(tabParam);
    } else if (!tabParam) {
      setActiveTab("home");
    }
  }, [tabParam]);

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
    <main className="flex flex-col w-full min-h-screen">
      <NavBar />

      <section className="w-full max-w-5xl flex flex-col flex-grow items-center self-center mx-auto px-8 phone:px-4">
        <Tabs
          value={activeTab}
          defaultValue="home"
          className="w-full flex flex-col py-8 phone:py-6 items-center gap-8"
          onValueChange={handleTabChange}
        >
          <TabsList className="flex w-full max-w-md justify-center gap-8 font-mono font-normal phone:gap-4">
            <TabsTrigger
              value="home"
              className="text-fluid-xl font-rebondG text-gray-600 dark:text-gray-400 aria-selected:text-black dark:aria-selected:text-white aria-selected:underline aria-selected:underline-offset-8 transition-colors duration-200"
              style={{ boxShadow: "none", outline: "none" }}
            >
              home
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className="text-fluid-xl font-rebondG text-gray-600 dark:text-gray-400 aria-selected:text-black dark:aria-selected:text-white aria-selected:underline aria-selected:underline-offset-8 transition-colors duration-200"
              style={{ boxShadow: "none", outline: "none" }}
            >
              blog
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="text-fluid-xl font-rebondG text-gray-600 dark:text-gray-400 aria-selected:text-black dark:aria-selected:text-white aria-selected:underline aria-selected:underline-offset-8 transition-colors duration-200"
              style={{ boxShadow: "none", outline: "none" }}
            >
              projects
            </TabsTrigger>
          </TabsList>
          <TabsContent value="home" className="flex flex-col items-center">
            <HomeContent />
          </TabsContent>
          <TabsContent
            value="blog"
            className="flex w-full flex-col items-center"
          >
            <BlogTable allData={allData} />
          </TabsContent>
          <TabsContent value="projects" className="flex flex-col items-center">
            <ProjectContent />
          </TabsContent>
        </Tabs>

        <div className="mt-auto w-full flex flex-row font-thin justify-center pb-12 md:space-x-16 lg:space-x-16 phone:flex-col phone:space-y-4 phone:items-center phone:pt-8 phone:pb-10 text-black dark:text-white">
          <div className="flex flex-row items-center min-w-fit">
            <a
              href="https://github.com/sakshambedi"
              className="flex flex-row items-center"
            >
              <p className="font-light text-fluid-base font-rebondG">
                github
              </p>
              <Image
                src="/icons/link.svg"
                width={15}
                height={15}
                alt="checkout my work on github"
                className="dark:invert phone:hidden ml-2"
              />
              <Image
                src="/icons/link.svg"
                width={10}
                height={10}
                alt="follow me on linkedin"
                className="dark:invert lg:hidden md:hidden ml-1"
              />
            </a>
          </div>
          <div className="flex flex-row items-center min-w-fit">
            <a
              href="https://www.linkedin.com/in/sakshambedi/"
              className="flex flex-row items-center "
            >
              <p className="font-light text-fluid-base font-rebondG">
                follow me
              </p>
              <Image
                src="/icons/link.svg"
                width={15}
                height={15}
                alt="follow me on linkedin"
                className="dark:invert phone:hidden ml-2"
              />
              <Image
                src="/icons/link.svg"
                width={10}
                height={10}
                alt="follow me on linkedin"
                className="dark:invert lg:hidden md:hidden ml-1"
              />
            </a>
          </div>
          <div className="flex flex-row items-center min-w-fit">
            <a
              href="https://huggingface.co/sakshambedi"
              className="flex flex-row items-center"
            >
              <p className="font-light font-rebondG text-fluid-base">
                hugging face
              </p>
              <Image
                src="/icons/link.svg"
                width={15}
                height={15}
                alt="follow me on linkedin"
                className="phone:hidden ml-2 dark:invert"
              />
              <Image
                src="/icons/link.svg"
                width={10}
                height={10}
                alt="follow me on linkedin"
                className="md:hidden lg:hidden ml-1 dark:invert"
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
