/**
 * Framer Motion Animation Presets
 * Reusable animation variants for consistent animations across the portfolio
 */

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Base animation configurations
export const animationConfig = {
    fast: { duration: 0.15 },
    normal: { duration: 0.3 },
    slow: { duration: 0.5 },
    ease: [0.4, 0, 0.2, 1],
};

// Fade In
export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { ...animationConfig.normal, ease: animationConfig.ease },
};

// Fade In Up
export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { ...animationConfig.normal, ease: animationConfig.ease },
};

// Fade In Down
export const fadeInDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { ...animationConfig.normal, ease: animationConfig.ease },
};

// Slide In Left
export const slideInLeft = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { ...animationConfig.normal, ease: animationConfig.ease },
};

// Slide In Right
export const slideInRight = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { ...animationConfig.normal, ease: animationConfig.ease },
};

// Scale In
export const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { ...animationConfig.normal, ease: animationConfig.ease },
};

// Stagger Container
export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Stagger Item
export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { ...animationConfig.normal, ease: animationConfig.ease },
};

// Page Transition
export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: animationConfig.ease },
};

// Hover Scale
export const hoverScale = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    transition: { ...animationConfig.fast, ease: animationConfig.ease },
};

// Hover Lift (with shadow)
export const hoverLift = {
    rest: { y: 0, boxShadow: 'var(--shadow-md)' },
    hover: {
        y: -8,
        boxShadow: 'var(--shadow-xl)',
        transition: { duration: 0.2, ease: animationConfig.ease },
    },
};

// Rotate In
export const rotateIn = {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 10 },
    transition: { ...animationConfig.normal, ease: animationConfig.ease },
};

// Viewport animation variants
export const viewportVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: animationConfig.ease,
        },
    },
};

// Skill bar animation
export const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
        width: `${level}%`,
        transition: {
            duration: 1,
            ease: animationConfig.ease,
            delay: 0.2,
        },
    }),
};

// Nav link underline
export const underlineVariants = {
    initial: { width: 0 },
    hover: {
        width: '100%',
        transition: { duration: 0.2, ease: animationConfig.ease },
    },
};

/**
 * Wrapper function to disable animations if user prefers reduced motion
 */
export const respectMotionPreference = (variants) => {
    if (prefersReducedMotion()) {
        return {
            initial: variants.animate,
            animate: variants.animate,
            exit: variants.animate,
        };
    }
    return variants;
};
