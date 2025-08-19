"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export default function LenisScroll() {
    const lenisRef = useRef();

    useEffect(() => {
        // Make Lenis instance globally accessible
        if (lenisRef.current) {
            window.lenis = lenisRef.current.lenis;
        }
    }, []);

    return (
        <ReactLenis
            ref={lenisRef}
            root
            options={{
                lerp: 0.07,
                duration: 1.4,
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,
                wheelMultiplier: 1.0,
                touchMultiplier: 1.8,
                normalizeWheel: true,
                syncTouch: true,
                syncTouchLerp: 0.12,
                easing: (t) => 1 - Math.pow(1 - t, 3),
            }}
        />
    );
}
