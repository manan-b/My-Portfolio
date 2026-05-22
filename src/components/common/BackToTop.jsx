import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BackToTop Component - Fixed button with smooth scroll
 */
export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Scroll to top smoothly with duration control
    const scrollToTop = () => {
        const startPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (startPosition === 0) return;

        const duration = 800; // 800ms
        let start = null;

        const easeInOutCubic = (t) => {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);

            const currentScroll = startPosition * (1 - ease);
            window.scrollTo(0, currentScroll);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-3 sm:p-4 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-2xl hover:shadow-glow-lg transition-all border-2 border-primary-400/30 hover:border-primary-400"
                    aria-label="Back to top"
                    title="Back to top"
                >
                    <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
