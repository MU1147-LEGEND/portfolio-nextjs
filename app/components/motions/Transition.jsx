"use client";
import { motion } from "motion/react";

const Transition = ({ children }) => {
    const transition = {
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
    };

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={transition}
        >
            {children}
        </motion.div>
    );
};
export default Transition;
