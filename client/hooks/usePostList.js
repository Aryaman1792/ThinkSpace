import { useState } from "react";

export const usePostList = (initialPosts) => {
    const [posts, setPosts] = useState(initialPosts || []);
    const [selectedPost, setSelectedPost] = useState(null);

    const updatePostStats = (postId, type, value) => {
        setPosts(prevPosts => prevPosts.map(p => {
            if (p.id === postId || p._id === postId) {
                // Handle both nested stats and flat properties
                if (p.stats) {
                    return {
                        ...p,
                        stats: {
                            ...p.stats,
                            [type]: value
                        }
                    };
                } else {
                    return {
                        ...p,
                        [type]: value
                    };
                }
            }
            return p;
        }));

        if (selectedPost && (selectedPost.id === postId || selectedPost._id === postId)) {
            setSelectedPost((prev) => {
                if (prev.stats) {
                    return {
                        ...prev,
                        stats: {
                            ...prev.stats,
                            [type]: value
                        }
                    };
                } else {
                    return {
                        ...prev,
                        [type]: value
                    };
                }
            });
        }
    };

    const incrementThoughts = (postId) => {
        // Helper to increment thought count (usually from comments)
        // This is a bit complex because we need the current value, 
        // but often we just want to trigger a re-render or update from the modal.
        // For now, we rely on the modal calling updatePostStats with the new count.
    };

    return {
        posts,
        setPosts,
        selectedPost,
        setSelectedPost,
        updatePostStats,
        incrementThoughts
    };
};