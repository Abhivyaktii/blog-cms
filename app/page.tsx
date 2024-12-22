import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  description: string;
  published_at: string;
  url: string;
};

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("https://dev.to/api/articles?username=abhivyaktii", {
    next: { revalidate: 60 }, // Optional: Revalidate cache every 60 seconds
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export default async function Home() {
  const posts = await fetchPosts();
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link href="/new">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-sm text-muted-foreground">{post.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-green-600">Published</span>
                  <span className="text-muted-foreground">
                    {new Date(post.published_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link href={post.url} passHref>
                  <Button variant="outline" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
