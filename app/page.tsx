import { getSortedPostsData } from "@/lib/post";
import { AllPostDataTableInterface } from "@/interface/PostData";
import HomeContainer from "./HomeContainer";

export default async function Home() {
  const allData: AllPostDataTableInterface = getSortedPostsData();
  return <HomeContainer allData={allData} />;
}
