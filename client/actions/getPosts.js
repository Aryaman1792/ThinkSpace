"use server";

export async function getPosts() {
    try {
        const res = await fetch('http://localhost:5001/api/posts', {
            cache: 'no-store',
            next: { revalidate: 0 }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data.posts || [];
    } catch (error) {
        console.error("Failed to fetch posts:", error.message);
        return [];
    }
}