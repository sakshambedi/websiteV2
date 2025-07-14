"use client";

import { AllPostDataTableInterface } from "@/interface/PostData";

// Client-side cache for blog data
let cachedBlogData: AllPostDataTableInterface | null = null;

export function getClientSidePostsData(): AllPostDataTableInterface {
  if (!cachedBlogData) {
    try {
      if (typeof window !== "undefined" && window.__BLOG_DATA__) {
        cachedBlogData = window.__BLOG_DATA__;
      }
    } catch (error) {
      console.error("Error fetching blog data on client side:", error);
      return [];
    }
  }

  return cachedBlogData || [];
}

declare global {
  interface Window {
    __BLOG_DATA__?: AllPostDataTableInterface;
  }
}
