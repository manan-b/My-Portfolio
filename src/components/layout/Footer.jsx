import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="relative bg-[var(--bg-primary)] text-[var(--text-secondary)] py-8 overflow-hidden">

            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)' }} />

            {/* Background dots */}
            <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />

            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-3"
                >
                    {/* Logo */}
                    <div className="flex items-center gap-1 group">
                        <span className="font-orbitron text-xl font-black tracking-widest relative">
                            <span className="text-primary-400 transition-all duration-300">
                                &lt;
                            </span>
                            <span className="text-[var(--text-primary)] group-hover:text-white transition-all duration-300 mx-[1px]">
                                MB
                            </span>
                            <span className="text-primary-400 transition-all duration-300">
                                /&gt;
                            </span>
                        </span>
                    </div>

                    {/* Terminal line */}
                    <p className="font-mono-ui text-xs text-[var(--text-tertiary)] tracking-widest">
                        // Designed &amp; built by{' '}
                        <span className="text-primary-400">Manan Batra</span>
                    </p>

                    <p className="font-mono-ui text-xs text-[var(--text-tertiary)] tracking-widest opacity-60">
                        &copy; {new Date().getFullYear()} Manan Batra · All rights reserved
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
