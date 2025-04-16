import React from "react";
import NavBar from "@/components/NavBar";
import BlogTable from "@/components/BlogTable";
import { getSortedPostsData } from "@/lib/post";
import { AllPostDataTableInterface } from "@/interface/PostData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HomeContent from "@/components/HomeContent";
import Image from "next/image";
import ProjectContent from "@/components/ProjectContent";

export default async function Home() {
  const allData: AllPostDataTableInterface = getSortedPostsData();
  return (
    <main className="flex flex-col w-full min-h-screen">
      <NavBar />

      <section className="w-1/2 flex flex-col flex-grow items-center self-center mx-auto phone:w-10/12 md:w-3/4 phone:mx-0 ">


        <Tabs defaultValue="home" className="w-full flex flex-col py-8 phone:py-5 items-center">
          <TabsList className="w-max space-x-10 align-middle font-mono font-normal phone:space-x-5 md:space-x-7 px-10">
            <TabsTrigger
              value="home"
              className="text-lg font-rebondG phone:text-base text-gray-600 dark:text-gray-400 aria-selected:text-black dark:aria-selected:text-white aria-selected:underline aria-selected:underline-offset-4"
              style={{ boxShadow: 'none', outline: 'none' }}
            >
              home
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className="text-lg font-rebondG phone:text-base text-gray-600 dark:text-gray-400 aria-selected:text-black dark:aria-selected:text-white aria-selected:underline aria-selected:underline-offset-4"
              style={{ boxShadow: 'none', outline: 'none' }}
            >
              blog
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="text-lg font-rebondG phone:text-base text-gray-600 dark:text-gray-400 aria-selected:text-black dark:aria-selected:text-white aria-selected:underline aria-selected:underline-offset-4"
              style={{ boxShadow: 'none', outline: 'none' }}
            >
              projects
            </TabsTrigger>
          </TabsList>
          <TabsContent value="home" className="flex flex-col items-center">
            <HomeContent />
          </TabsContent>
          <TabsContent value="blog" className="flex w-full flex-col items-center">
            <BlogTable allData={allData} />
          </TabsContent>
          <TabsContent value="projects" className="flex flex-col items-center">
            <ProjectContent />
          </TabsContent>
        </Tabs>


        <div className='mt-auto w-full flex flex-row font-thin justify-center pb-12 md:space-x-16 lg:space-x-16 phone:justify-between phone:pt-10 phone:pb-12 text-black dark:text-white'>
          <div className="flex flex-row items-center min-w-fit ">
            <a href="https://github.com/sakshambedi" className="flex flex-row items-center">
              <p className="font-light text-base font-rebondG phone:text-sm">github</p>
              <Image src="/icons/link.svg" width={15} height={15} alt="checkout my work on github" className="dark:invert phone:hidden ml-2" />
              <Image src="/icons/link.svg" width={10} height={10} alt="follow me on linkedin" className="dark:invert lg:hidden md:hidden ml-1" />
            </a>
          </div>
          <div className="flex flex-row items-center min-w-fit ">
            <a href="https://www.linkedin.com/in/sakshambedi/" className="flex flex-row items-center ">
              <p className="font-light text-base font-rebondG phone:text-sm">follow me</p>
              <Image src="/icons/link.svg" width={15} height={15} alt="follow me on linkedin" className="dark:invert phone:hidden ml-2" />
              <Image src="/icons/link.svg" width={10} height={10} alt="follow me on linkedin" className="dark:invert lg:hidden md:hidden ml-1" />
            </a>
          </div>
          <div className="flex flex-row items-center min-w-fit">
            <a href="https://huggingface.co/sakshambedi" className="flex flex-row items-center">
              <p className="font-light font-rebondG text-base phone:text-sm">hugging face</p>
              <Image src="/icons/link.svg" width={15} height={15} alt="follow me on linkedin" className="phone:hidden ml-2 dark:invert" />
              <Image src="/icons/link.svg" width={10} height={10} alt="follow me on linkedin" className="md:hidden lg:hidden ml-1 dark:invert" />
            </a>
          </div>
        </div>
      </section>
    </main >
  );
}
