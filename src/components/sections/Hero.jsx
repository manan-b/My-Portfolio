import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motionPresets';
import Button from '@/components/ui/Button';
import { scrollToElement } from '@/lib/utils';
import resumeData from '@/data/resume.json';
import profileImage from '@/assets/manan_image.JPG';
import resumePDF from '@/assets/My Resume.pdf';

/**
 * Hero Section - Enhanced Professional Design
 */
export default function Hero() {
    const [titleIndex, setTitleIndex] = useState(0);
    const titles = [
        'Frontend Developer',
        'React JS Specialist',
        'UI/UX Enthusiast',
        'Web Developer',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prev) => (prev + 1) % titles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-primary)]"
        >
            {/* Animated glow orbs - More subtle */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-5"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500 rounded-full blur-3xl opacity-5"
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Content */}
            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="container-custom relative z-10"
            >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20 max-w-7xl mx-auto">
                    {/* Text Content - Left Side */}
                    <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                        {/* Greeting */}
                        <motion.p
                            variants={staggerItem}
                            className="text-base md:text-lg text-primary-400 font-medium mb-3 tracking-wide"
                        >
                            Hi there! I'm
                        </motion.p>

                        {/* Name */}
                        <motion.h1
                            variants={staggerItem}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                        >
                            <span className="bg-gradient-to-r from-[var(--text-primary)] to-primary-300 bg-clip-text text-transparent">
                                {resumeData.name}
                            </span>
                        </motion.h1>

                        {/* Animated Title */}
                        <motion.div variants={staggerItem} className="mb-8 h-12 md:h-14">
                            <motion.h2
                                key={titleIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary-400"
                            >
                                {titles[titleIndex]}
                            </motion.h2>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={staggerItem}
                            className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                        >
                            Passionate about creating beautiful, functional web experiences.
                            Specializing in modern JavaScript frameworks and responsive design.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={staggerItem}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
                        >
                            <Button
                                as="a"
                                href={resumePDF}
                                download="Manan_Batra_Resume.pdf"
                                variant="primary"
                                size="lg"
                                className="min-w-[200px] shadow-lg hover:shadow-glow transition-all flex items-center gap-2"
                            >
                                Download Resume
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => scrollToElement('contact')}
                                className="min-w-[180px] flex items-center gap-2"
                            >
                                Contact Me
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Profile Picture - Right Side */}
                    <motion.div variants={staggerItem} className="flex-shrink-0 order-1 lg:order-2">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]"
                            style={{
                                filter: 'drop-shadow(0 0 30px rgba(34, 197, 94, 0.3)) drop-shadow(0 0 60px rgba(34, 197, 94, 0.15))'
                            }}
                        >
                            {/* Outer glow effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400/20 to-secondary-400/20 blur-2xl" />

                            {/* Decorative border */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 via-secondary-400 to-primary-500 p-1">
                                <div className="w-full h-full rounded-full bg-[var(--bg-primary)]" />
                            </div>

                            {/* Profile image */}
                            <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-[var(--bg-primary)] shadow-2xl">
                                <img
                                    src={profileImage}
                                    alt="Manan Batra Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Open to Work Badge - Bottom Left Position with Glow */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1, type: "spring" }}
                                className="absolute -left-4 bottom-8 z-20 bg-[var(--bg-primary)] border border-[var(--border-color)]/30 px-4 py-2 rounded-full flex items-center gap-2"
                            >
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                </span>
                                <span className="text-[var(--text-primary)] text-xs font-semibold whitespace-nowrap">
                                    Open to Work
                                </span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
