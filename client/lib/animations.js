// Animation variants and utilities for Framer Motion

// Stagger animation for lists
export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24,
        },
    },
};

// Slide animations
export const slideIn = {
    left: {
        hidden: { x: -100, opacity: 0 },
        show: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
            },
        },
    },
    right: {
        hidden: { x: 100, opacity: 0 },
        show: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
            },
        },
    },
    up: {
        hidden: { y: 100, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
            },
        },
    },
    down: {
        hidden: { y: -100, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
            },
        },
    },
};

// Scale animations
export const scaleIn = {
    hidden: { scale: 0, opacity: 0 },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15,
        },
    },
};

// Fade animations
export const fadeIn = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

// Hover animations
export const hoverScale = {
    scale: 1.05,
    transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
    },
};

export const hoverLift = {
    y: -8,
    transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
    },
};

export const hoverGlow = {
    boxShadow: "0 0 20px rgba(114, 183, 191, 0.5)",
    transition: {
        duration: 0.3,
    },
};

// Tap animations
export const tapScale = {
    scale: 0.95,
};

// Bounce animation
export const bounce = {
    y: [0, -10, 0],
    transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: 2,
    },
};

// Pulse animation
export const pulse = {
    scale: [1, 1.05, 1],
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
    },
};

// Shimmer effect
export const shimmer = {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
    },
};

// Typing indicator
export const typingDot = {
    y: [0, -10, 0],
    transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
    },
};

// Counter animation utility
export const animateCounter = (from, to, duration = 1000) => {
    return {
        from,
        to,
        duration,
    };
};

// Page transition variants
export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: "easeIn",
        },
    },
};

// Modal animations
export const modalBackdrop = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 0.2,
        },
    },
};

export const modalContent = {
    hidden: { scale: 0.8, opacity: 0 },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25,
        },
    },
};

// Card flip animation
export const cardFlip = {
    rotateY: 180,
    transition: {
        duration: 0.6,
        ease: "easeInOut",
    },
};

// Notification animations
export const notificationSlide = {
    initial: { x: 400, opacity: 0 },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
        },
    },
    exit: {
        x: 400,
        opacity: 0,
        transition: {
            duration: 0.2,
        },
    },
};

// Skeleton loading
export const skeletonPulse = {
    opacity: [0.5, 1, 0.5],
    transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
    },
};

// Spring configurations
export const springConfigs = {
    gentle: { stiffness: 100, damping: 20 },
    wobbly: { stiffness: 200, damping: 10 },
    stiff: { stiffness: 400, damping: 30 },
    slow: { stiffness: 50, damping: 20 },
};
