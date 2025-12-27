import { getSortedPostsData } from "@/lib/post";
import { AllPostDataTableInterface } from "@/interface/PostData";
import HomeContainer from "./HomeContainer";
import { Suspense } from "react";

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export default async function Home() {
  const allData: AllPostDataTableInterface = getSortedPostsData();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContainer allData={allData} />
    </Suspense>
  );
}
