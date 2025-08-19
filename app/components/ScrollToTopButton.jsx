"use client";
import { ChevronUp } from "@deemlol/next-icons";
import { scrollToTop, useScrollToTop } from "../utils/scrollToTop";

const ScrollToTopButton = ({ threshold = 300, className = "" }) => {
    const showScrollTop = useScrollToTop(threshold);

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed bottom-8 right-8 z-50 
                bg-secondary hover:bg-secondary/80 
                text-black p-3 rounded-full 
                shadow-lg transition-all duration-300 ease-in-out
                ${
                    showScrollTop
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-4 pointer-events-none"
                }
                ${className}
            `}
            aria-label="Scroll to top"
        >
            <ChevronUp className="w-6 h-6" />
        </button>
    );
};

export default ScrollToTopButton;
