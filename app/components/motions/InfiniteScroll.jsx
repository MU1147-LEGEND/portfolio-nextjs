"use client";

import { motion, useAnimation } from "motion/react";
import { useEffect, useRef, useState } from "react";

const InfiniteScroll = ({
    children,
    itemWidth = 98,
    gap = 16,
    duration = 25,
    direction = "left",
    pauseOnHover = false,
    className = "",
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const controls = useAnimation();
    const containerRef = useRef(null);

    // Calculate the number of items
    const itemCount = Array.isArray(children) ? children.length : 1;

    // Calculate animation distance
    const animationDistance = itemCount * (itemWidth + gap);

    // Determine animation direction
    const startX = direction === "left" ? 0 : -animationDistance;
    const endX = direction === "left" ? -animationDistance : 0;

    // Start the animation
    const startAnimation = () => {
        controls.start({
            x: [startX, endX],
            transition: {
                repeat: Infinity,
                repeatType: "loop",
                duration: duration,
                ease: "linear",
            },
        });
    };

    // Stop the animation
    const stopAnimation = () => {
        controls.stop();
    };

    // Initialize animation
    useEffect(() => {
        if (!isPaused && !isDragging) {
            startAnimation();
        } else {
            stopAnimation();
        }
    }, [isPaused, isDragging, controls, startX, endX, duration]);

    // Handle mouse/touch events
    const handleMouseEnter = () => {
        if (pauseOnHover) {
            setIsPaused(true);
        }
    };

    const handleMouseLeave = () => {
        if (pauseOnHover) {
            setIsPaused(false);
        }
    };

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = (event, info) => {
        setIsDragging(false);

        // Simple momentum effect
        const velocity = info.velocity.x;

        if (Math.abs(velocity) > 500) {
            const momentum = velocity * 0.1;

            controls.start({
                x: `+=${momentum}`,
                transition: {
                    type: "spring",
                    damping: 30,
                    stiffness: 200,
                },
            });
        }
    };

    return (
        <div
            className={`relative overflow-hidden select-none ${className}`}
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="flex cursor-grab active:cursor-grabbing"
                animate={controls}
                drag="x"
                dragConstraints={{ left: -animationDistance, right: 0 }}
                dragElastic={0.1}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                whileDrag={{ cursor: "grabbing" }}
                style={{
                    width: `${itemCount * 2 * (itemWidth + gap)}px`,
                    gap: `${gap}px`,
                    userSelect: "none",
                    touchAction: "pan-x",
                }}
            >
                {/* First set of children */}
                {children}

                {/* Duplicate set for seamless loop */}
                {children}
            </motion.div>
        </div>
    );
};

export default InfiniteScroll;
