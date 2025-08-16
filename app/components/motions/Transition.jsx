"use client";
import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";

const Transition = ({ children }) => {
    const ref = useRef(null);

    const isInView = useInView(ref, { once: false });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }

        return () => {
            mainControls.stop();
        };
    }, [isInView]);

    const transition = {
        duration: 0.8,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
    };

    return (
        <motion.div
            ref={ref}
            variants={{
                hidden: { x: -100, opacity: 0 },
                visible: { x: 0, opacity: 1 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={transition}
        >
            {children}
        </motion.div>
    );
};
export default Transition;
