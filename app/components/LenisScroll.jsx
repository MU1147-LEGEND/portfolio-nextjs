"use client";

import { ReactLenis } from "lenis/react";

export default function LenisScroll() {
    return (
        <ReactLenis
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
