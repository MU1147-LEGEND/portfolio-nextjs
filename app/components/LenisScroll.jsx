"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";

export default function LenisScroll() {
    const lenisRef = useRef();
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect if it's a touch device
        const checkTouchDevice = () => {
            return (
                "ontouchstart" in window ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0 ||
                window.innerWidth <= 768 // Also consider mobile screen size
            );
        };

        setIsTouchDevice(checkTouchDevice());

        // Make Lenis instance globally accessible
        if (lenisRef.current) {
            window.lenis = lenisRef.current.lenis;
        }
    }, []);

    // Different configurations for desktop vs mobile/touch
    const desktopOptions = {
        lerp: 0.06, // Even smoother interpolation for premium feel
        duration: 1.5, // Longer duration for ultra-smooth scrolling
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.8, // Slightly reduced for more controlled scrolling
        touchMultiplier: 1.5, // Optimized for trackpad gestures
        normalizeWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.08, // Smoother trackpad interpolation
        easing: (t) => {
            // Custom ultra-smooth easing for premium desktop experience
            return t === 1 ? 1 : 1 - Math.pow(2, -12 * t);
        },
        // Additional smooth scrolling options for desktop
        infinite: false,
        autoResize: true,
        prevent: (node) => node.classList.contains("lenis-stopped"),
    };

    const mobileOptions = {
        lerp: 0.15, // Faster response on mobile
        duration: 0.8, // Shorter duration for snappier feel
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: false, // Disable for touch devices
        wheelMultiplier: 1.0,
        touchMultiplier: 2.5, // More responsive touch
        normalizeWheel: true,
        syncTouch: false, // Disable sync for native feel
        syncTouchLerp: 0.1,
        easing: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), // More dynamic easing
    };

    return (
        <ReactLenis
            ref={lenisRef}
            root
            options={isTouchDevice ? mobileOptions : desktopOptions}
        />
    );
}
