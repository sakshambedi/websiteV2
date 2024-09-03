import React from "react";
import NavBar from "@/components/NavBar";

import BlogTable from "@/components/BlogTable";

import { getSortedPostsData } from "@/lib/post";
import { AllPostDataTableInterface } from "@/interface/PostData";


export default async function Home() {
  const allData: AllPostDataTableInterface = getSortedPostsData();
  return (
    <main className="flex flex-col  justify-center w-full">
      <div className="min-w-full">
        <NavBar />

      </div>
      <div className="w-9/12 min-h-screen flex flex-col  items-center mx-auto">
        <BlogTable allData={allData} />
      </div>
    </main>
  );
}
