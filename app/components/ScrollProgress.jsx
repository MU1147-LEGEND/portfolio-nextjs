"use client";
import { useState, useEffect } from "react";
import { motion, useScroll } from "motion/react";

// export default function ScrollProgress() {
//     const [scrollWidth, setScrollWidth] = useState(0);

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollTop = window.scrollY;
//             const docHeight = document.body.scrollHeight - window.innerHeight;
//             const scrollPercent = (scrollTop / docHeight) * 100;
//             setScrollWidth(scrollPercent);
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     return (
//         <div
//             className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#0186df] via-[#d60698] to-[#7206ff] z-50"
//             style={{ width: `${scrollWidth}%` }}
//         />
//     );
// }

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    originX: 0,
                    background:
                        "linear-gradient(to right, #0186df, #d60698, #7206ff, #ff0088, #44dd88)",
                    zIndex: 50,
                }}
            />
        </>
    );
}
