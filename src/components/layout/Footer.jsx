import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] py-8 border-t border-[var(--border-color)]">
            <div className="container-custom text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-lg mb-2 font-medium">
                        Designed and built by <span className="text-primary-400 font-bold">Manan Batra</span>
                    </p>
                    <p className="text-sm text-[var(--text-tertiary)]">
                        &copy; {new Date().getFullYear()} Manan Batra. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
