"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const variants = {
    hidden: {
        opacity: 0,
        y: 18,
        filter: "blur(10px) saturate(0)",
        scale: 0.98,
    },
    enter: {
        opacity: 1,
        y: 0,
        filter: "blur(0px) saturate(1)",
        scale: 1,
        transition: {
            duration: 0.42,
            ease: "easeOut" as const,
        },
    },
    exit: {
        opacity: 0,
        y: -12,
        filter: "blur(8px) saturate(0)",
        scale: 1.01,
        transition: {
            duration: 0.28,
            ease: "easeIn" as const,
        },
    },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
                style={{ willChange: "opacity, transform, filter" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
