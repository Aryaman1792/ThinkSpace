import { useState, useEffect } from "react";

export const useInteractionLogic = ({ initialCounts, onInteraction, shareUrl, shareTitle }) => {
    const [counts, setCounts] = useState(initialCounts);
    const [active, setActive] = useState({
        spark: false,
        dim: false,
    });

    // Sync counts when initialCounts changes (e.g. when comments are added)
    // We only update if the values are actually different to avoid unnecessary re-renders
    // and we specifically check for thoughts count updates from parent
    useEffect(() => {
        setCounts(prev => ({
            ...prev,
            thoughts: initialCounts.thoughts
        }));
    }, [initialCounts.thoughts]);

    const handleInteraction = async (type, onThoughtsClick) => {
        if (type === "thoughts") {
            if (onThoughtsClick) onThoughtsClick();
            return;
        }

        if (type === "spread") {
            const url = shareUrl
                ? (shareUrl.startsWith('http') ? shareUrl : `${window.location.origin}${shareUrl}`)
                : window.location.href;

            const title = shareTitle || "Check this out on ThinkSpace!";

            try {
                await navigator.clipboard.writeText(url);
                window.alert("Link copied to clipboard!");
            } catch (error) {
                console.error("Error sharing:", error);
                // Fallback if clipboard fails (rare but possible)
                window.alert("Failed to copy link.");
            }

            const newCounts = { ...counts, spread: counts.spread + 1 };
            setCounts(newCounts);

            if (onInteraction) {
                onInteraction("spread", newCounts.spread);
            }
            return;
        }

        let newActive = { ...active };
        let newCounts = { ...counts };

        const isNowActive = !active[type];

        newActive[type] = isNowActive;

        if (type === "spark") {
            newCounts.spark = isNowActive ? counts.spark + 1 : counts.spark - 1;
            if (isNowActive && active.dim) {
                newActive.dim = false;
                newCounts.dim -= 1;
            }
        } else if (type === "dim") {
            newCounts.dim = isNowActive ? counts.dim + 1 : counts.dim - 1;
            if (isNowActive && active.spark) {
                newActive.spark = false;
                newCounts.spark -= 1;
            }
        }

        setActive(newActive);
        setCounts(newCounts);

        if (onInteraction) {
            onInteraction(type, newCounts[type]);

            if (type === "spark" && isNowActive && active.dim) {
                onInteraction("dim", newCounts.dim);
            }
            if (type === "dim" && isNowActive && active.spark) {
                onInteraction("spark", newCounts.spark);
            }
        }
    };

    return {
        counts,
        active,
        handleInteraction,
        setCounts
    };
};