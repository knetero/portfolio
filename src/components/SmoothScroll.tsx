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
        // Detect if device is mobile with passive check
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        ) || window.innerWidth < 768;

        // Use optimized settings for mobile devices
        const mobileConfig = {
            duration: 0.6, // Reduced for faster response
            easing: (t: number) => t, // Linear easing for better performance
            orientation: 'vertical' as const,
            gestureOrientation: 'vertical' as const,
            smoothWheel: false, // Disable for mobile
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            infinite: false,
            autoResize: true,
            lerp: 0.3, // Higher lerp = more responsive
            syncTouch: false, // Disable sync touch for better performance
            syncTouchLerp: 0.1,
            touchInertiaMultiplier: 12, // Reduced for better performance
        };

        // Desktop configuration with smoother animations
        const desktopConfig = {
            duration: 1.0, // Reduced from 1.2 for better performance
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical' as const,
            gestureOrientation: 'vertical' as const,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
            autoResize: true,
            lerp: 0.12, // Slightly increased for more responsive feel
            syncTouch: true,
            syncTouchLerp: 0.075,
            touchInertiaMultiplier: 30, // Slightly reduced
        };

        lenisRef.current = new Lenis(isMobile ? mobileConfig : desktopConfig);

        // Expose lenis globally for other components (e.g., modals) to pause/resume scrolling
        // @ts-expect-error - Adding custom property to window object for global Lenis access
        window.__lenis = lenisRef.current;

        let rafId: number;
        function raf(time: number) {
            lenisRef.current?.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            lenisRef.current?.destroy();
            // @ts-expect-error - Removing custom property from window object
            delete window.__lenis;
        };
    }, []);

    return <>{children}</>;
} 