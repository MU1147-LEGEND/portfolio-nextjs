import { useEffect, useState } from "react";

/**
 * Scroll to top utility function using Lenis
 */
export const scrollToTop = () => {
    if (window.lenis) {
        window.lenis.scrollTo(0, {
            duration: 1.5,
            easing: (t) => 1 - Math.pow(1 - t, 3),
        });
    } else {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    // Keep URL clean
    history.replaceState(null, null, window.location.pathname);
};

/**
 * Hook to track scroll position for showing/hiding scroll-to-top button
 * @param {number} threshold - Scroll position threshold (default: 300px)
 * @returns {boolean} - Whether to show the scroll-to-top button
 */
export const useScrollToTop = (threshold = 300) => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition =
                window.pageYOffset || document.documentElement.scrollTop;
            setShowScrollTop(scrollPosition > threshold);
        };

        // Listen to scroll events
        window.addEventListener("scroll", handleScroll);

        // Also listen to Lenis scroll events if available
        if (window.lenis) {
            window.lenis.on("scroll", handleScroll);
        }

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (window.lenis) {
                window.lenis.off("scroll", handleScroll);
            }
        };
    }, [threshold]);

    return showScrollTop;
};
