import { useState, useEffect } from "react";

interface InteractionCounts {
    spark: number;
    dim: number;
    thoughts: number;
    spread: number;
}

interface InteractionActive {
    spark: boolean;
    dim: boolean;
}

interface UseInteractionLogicProps {
    initialCounts: InteractionCounts;
    onInteraction?: (type: string, value: number) => void;
}

export const useInteractionLogic = ({ initialCounts, onInteraction }: UseInteractionLogicProps) => {
    const [counts, setCounts] = useState(initialCounts);
    const [active, setActive] = useState<InteractionActive>({
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

    const handleInteraction = (type: string, onThoughtsClick?: () => void) => {
        if (type === "thoughts") {
            if (onThoughtsClick) onThoughtsClick();
            return;
        }

        if (type === "spread") {
            navigator.clipboard.writeText(window.location.href);

            const newCounts = { ...counts, spread: counts.spread + 1 };
            setCounts(newCounts);

            if (onInteraction) {
                onInteraction("spread", newCounts.spread);
            }
            return;
        }

        let newActive = { ...active };
        let newCounts = { ...counts };

        // @ts-ignore
        const isNowActive = !active[type];

        // @ts-ignore
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
            onInteraction(type, newCounts[type as keyof InteractionCounts]);

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
