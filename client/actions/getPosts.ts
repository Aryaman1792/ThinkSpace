"use server";

export async function getPosts() {
    try {
        const res = await fetch('http://localhost:5000/api/posts', {
            cache: 'no-store',
            next: { revalidate: 0 }
        });

        if (!res.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await res.json();
        return data.posts;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
}
