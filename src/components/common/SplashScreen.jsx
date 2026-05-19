import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    // Check reduced motion preference
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (prefersReducedMotion) {
            onComplete();
            return;
        }

        const duration = 2000;
        const intervalTime = 30;
        const step = 100 / (duration / intervalTime);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 400);
                    return 100;
                }
                return prev + step;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [onComplete, prefersReducedMotion]);

    if (prefersReducedMotion) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100000] bg-[var(--bg-primary)] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary-400)_0%,transparent_50%)] opacity-[0.03]" />

            <div className="relative flex flex-col items-center z-10">
                {/* Logo & Loading Ring */}
                <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                    {/* Outer spinning ring */}
                    <svg className="absolute inset-0 w-full h-full text-primary-400/20" viewBox="0 0 100 100" style={{ animation: 'spin 10s linear infinite' }}>
                        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
                    </svg>

                    {/* Inner glowing ring */}
                    <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] text-primary-400 -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray={`${progress * 2.89} 289`} className="transition-all duration-75 ease-linear" style={{ filter: 'drop-shadow(0 0 6px var(--color-primary-400))' }} />
                    </svg>

                    <span className="font-orbitron text-2xl font-black text-[var(--text-primary)] tracking-widest relative z-10" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
                        <span className="text-primary-400">&lt;</span>
                        MB
                        <span className="text-primary-400">/&gt;</span>
                    </span>
                </div>

                {/* Loading Text */}
                <div className="flex flex-col items-center gap-2">
                    <div className="font-mono-ui text-primary-400 text-sm tracking-[0.3em] uppercase">
                        Initializing
                    </div>
                    <div className="font-mono-ui text-[var(--text-secondary)] text-xs tracking-widest">
                        {Math.round(progress)}%
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </motion.div>
    );
}
