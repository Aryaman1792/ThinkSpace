import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

const GlassCard = ({ children, className, hoverEffect = true, shimmer = false, ...props }) => {
    const ref = useRef(null);

    // 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current || !hoverEffect) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={cn(
                "glass-panel rounded-3xl p-6 relative overflow-hidden border border-white/20 shadow-xl backdrop-blur-xl bg-white/10",
                shimmer && "before:absolute before:inset-0 before:animate-shimmer before:z-0",
                className
            )}
            style={hoverEffect ? {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            } : {}}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={hoverEffect ? {
                y: -8,
                boxShadow: "0 20px 40px -10px rgba(114, 183, 191, 0.3), 0 0 20px rgba(114, 183, 191, 0.2)",
                scale: 1.02,
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                }
            } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: props.delay || 0,
            }}
            {...props}
        >
            <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;
