import React from "react";
import NavBar from "@/components/NavBar";
import BlogTable from "@/components/BlogTable";
import { getSortedPostsData } from "@/lib/post";
import { AllPostDataTableInterface } from "@/interface/PostData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HomeContent from "@/components/HomeContent";
import Image from "next/image";
import WorkContent from "@/components/WorkContent";


export default async function Home() {
  const allData: AllPostDataTableInterface = getSortedPostsData();
  return (
    <main className="flex flex-col  justify-center w-full ">
      <NavBar />

      <section className="w-1/2 min-h-screen flex flex-col  items-center self-center mx-auto phone:w-10/12 md:w-3/4 phone:mx-0 ">
        <Tabs defaultValue="home" className="w-full py-10 phone:py-5 align-middle ">
          <TabsList className="w-full space-x-10 align-middle font-mono font-normal focus:shadow-none shadow-none outline-none phone:space-x-5 md:space-x-7">
            <TabsTrigger value="home" className="text-lg phone:text-base" style={{ boxShadow: 'none', outline: 'none' }} >home</TabsTrigger>
            <TabsTrigger value="blog" className="text-lg phone:text-base" style={{ boxShadow: 'none', outline: 'none' }}>blog</TabsTrigger>
            <TabsTrigger value="work" className="text-lg phone:text-base" style={{ boxShadow: 'none', outline: 'none' }}>work</TabsTrigger>
          </TabsList>
          <TabsContent value="home" className="flex flex-col items-center">
            <HomeContent />
            {/* home */}
          </TabsContent>
          <TabsContent value="blog" className="flex flex-col items-center">
            <BlogTable allData={allData} />
          </TabsContent>
          <TabsContent value="work" className="flex flex-col items-center">
            <WorkContent />
          </TabsContent>
        </Tabs>


        <div className='w-full flex flex-row font-thin justify-center pt-5 pb-24 md:space-x-16 lg:space-x-16 phone:justify-between  phone:pt-10 phone:pb-12 '>
          <div className="flex flex-row items-center min-w-fit ">
            <a href="https://github.com/sakshambedi" className="flex flex-row items-center">
              <p className="font-light text-base phone:text-sm">github</p>
              <Image src="/icons/link.svg" width={15} height={15} alt="checkout my work on github" className="dark:invert phone:hidden ml-2" />
              <Image src="/icons/link.svg" width={10} height={10} alt="follow me on linkedin" className="dark:invert lg:hidden md:hidden ml-1" />
            </a>
          </div>
          <div className="flex flex-row items-center min-w-fit ">
            <a href="https://www.linkedin.com/in/sakshambedi/" className="flex flex-row items-center ">
              <p className="font-light text-base phone:text-sm">follow me</p>
              <Image src="/icons/link.svg" width={15} height={15} alt="follow me on linkedin" className="dark:invert phone:hidden ml-2" />
              <Image src="/icons/link.svg" width={10} height={10} alt="follow me on linkedin" className="dark:invert lg:hidden md:hidden ml-1" />
            </a>
          </div>
          <div className="flex flex-row items-center min-w-fit">
            <a href="https://huggingface.co/sakshambedi" className="flex flex-row items-center">
              <p className="font-light text-base phone:text-sm">hugging face</p>
              <Image src="/icons/link.svg" width={15} height={15} alt="follow me on linkedin" className=" phone:hidden ml-2 dark:invert" />
              <Image src="/icons/link.svg" width={10} height={10} alt="follow me on linkedin" className="md:hidden lg:hidden ml-1 dark:invert" />
            </a>
          </div>
        </div>
      </section>
    </main >
  );
}
