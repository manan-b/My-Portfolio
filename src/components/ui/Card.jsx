import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/**
 * Card Component
 * Reusable card container with hover effects
 */
export default function Card({ children, className, hover = true, ...props }) {
    const baseStyles =
        'bg-[var(--surface)] rounded-xl border border-[var(--border-color)] p-6 transition-all';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={hover ? { y: -4, boxShadow: 'var(--shadow-xl)' } : {}}
            transition={{ duration: 0.3 }}
            className={cn(baseStyles, 'shadow-[var(--shadow-md)]', className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}
