'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

interface SmoothScrollProps {
    children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
            autoResize: true,
            lerp: 0.1,
            syncTouch: true,
            syncTouchLerp: 0.075,
            touchInertiaMultiplier: 35,
            anchors: true
        });

        function onScroll() {
            // Handle scroll event if needed
        }

        // Expose lenis globally for other components (e.g., modals) to pause/resume scrolling
        // @ts-expect-error - Adding custom property to window object for global Lenis access
        window.__lenis = lenisRef.current;

        lenisRef.current.on('scroll', onScroll);

        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisRef.current?.destroy();
            // @ts-expect-error - Removing custom property from window object
            delete window.__lenis;
        };
    }, []);

    return <>{children}</>;
} 