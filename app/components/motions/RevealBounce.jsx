"use client";

import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";

const RevealBounce = ({ children, delay = 0.1, className }) => {
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
        duration: 0.4,
        delay,
        ease: [0, 0.71, 0.2, 1.01],
    };

    return (
        <motion.div
            ref={ref}
            variants={{
                hidden: { opacity: 0, x: -75, y: 75 },
                visible: { opacity: 1, x: 0, y: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={transition}
            className={className}
        >
            {children}
        </motion.div>
    );
};
export default RevealBounce;
