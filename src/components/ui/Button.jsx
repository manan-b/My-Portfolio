import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/**
 * Button Component
 * Reusable button with variants and animations
 */
export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}) {
    const baseStyles =
        'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary:
            'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 focus:ring-primary-500 shadow-lg shadow-primary-500/30',
        secondary:
            'bg-gradient-to-r from-secondary-600 to-secondary-500 text-white hover:from-secondary-700 hover:to-secondary-600 focus:ring-secondary-500 shadow-lg shadow-secondary-500/30',
        outline:
            'border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950 focus:ring-primary-500',
        ghost:
            'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] focus:ring-primary-500',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const Component = props.href ? motion.a : motion.button;

    return (
        <Component
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </Component>
    );
}
