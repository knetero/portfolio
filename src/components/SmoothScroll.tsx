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
        // Detect if device is mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        ) || window.innerWidth < 768;

        // Use optimized settings for mobile devices
        const mobileConfig = {
            duration: 0.8,
            easing: (t: number) => t, // Linear easing for better performance
            orientation: 'vertical' as const,
            gestureOrientation: 'vertical' as const,
            smoothWheel: false, // Disable for mobile
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            infinite: false,
            autoResize: true,
            lerp: 0.25, // Higher lerp = more responsive
            syncTouch: false, // Disable sync touch for better performance
            syncTouchLerp: 0.1,
            touchInertiaMultiplier: 15, // Reduced for better performance
            anchors: true
        };

        // Desktop configuration with smoother animations
        const desktopConfig = {
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical' as const,
            gestureOrientation: 'vertical' as const,
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
        };

        lenisRef.current = new Lenis(isMobile ? mobileConfig : desktopConfig);

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