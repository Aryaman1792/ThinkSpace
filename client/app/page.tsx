import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Feed from "@/components/feed/Feed";
import { getPosts } from "@/actions/getPosts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Home Feed</h1>
        <p className="text-slate-500">Your daily dose of inspiration.</p>
      </div>
      <Feed initialPosts={posts} />
    </MainLayout>
  );
}
