import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Feed from "@/components/feed/Feed";
import HomeHeader from "@/components/feed/HomeHeader";
import { getPosts } from "@/actions/getPosts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <MainLayout>
      <HomeHeader />
      <Feed initialPosts={posts} />
    </MainLayout>
  );
}