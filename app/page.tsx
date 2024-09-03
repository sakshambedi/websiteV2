import React from "react";
import NavBar from "@/components/NavBar";

import BlogTable from "@/components/BlogTable";

import { getSortedPostsData } from "@/lib/post";
import { AllPostDataTableInterface } from "@/interface/PostData";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function Home() {
  const allData: AllPostDataTableInterface = getSortedPostsData();
  return (
    <main className="flex flex-col  justify-center w-full">
      <div className="min-w-full">
        <NavBar />

      </div>
      <div className="w-7/12 min-h-screen flex flex-col  items-center mx-auto">
        <Tabs defaultValue="home" className="w-full py-10 align-middle">
          <TabsList className="w-full align-middle font-mono font-normal  focus:shadow-none shadow-none outline-none">
            <TabsTrigger value="home" className="text-lg " style={{ boxShadow: 'none', outline: 'none' }} >home</TabsTrigger>
            <TabsTrigger value="blog" className="text-lg" style={{ boxShadow: 'none', outline: 'none' }}>blog</TabsTrigger>
            <TabsTrigger value="work" className="text-lg" style={{ boxShadow: 'none', outline: 'none' }}>work</TabsTrigger>
          </TabsList>
          <TabsContent value="home" className="flex flex-col items-center">This is the home.</TabsContent>
          <TabsContent value="blog" className="flex flex-col items-center">
            <BlogTable allData={allData} />
          </TabsContent>
          <TabsContent value="work" className="flex flex-col items-center">
            This will be work
          </TabsContent>
        </Tabs>


      </div>
    </main>
  );
}
