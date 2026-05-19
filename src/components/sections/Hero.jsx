import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motionPresets';
import { scrollToElement } from '@/lib/utils';
import resumeData from '@/data/resume.json';
import resumePDF from '@/assets/Manan_Batra_Resume.pdf';
import profileImage from '@/assets/manan_image.JPG';
import ResumeModal from '@/components/ui/ResumeModal';

const titles = ['Data Engineer', 'ETL Developer', 'Software Engineer', 'Web Developer'];

export default function Hero() {
    const [titleIndex, setTitleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    useEffect(() => {
        const currentTitle = titles[titleIndex];
        let timeout;
        if (isTyping) {
            if (displayedText.length < currentTitle.length) {
                timeout = setTimeout(() => setDisplayedText(currentTitle.slice(0, displayedText.length + 1)), 60);
            } else {
                timeout = setTimeout(() => setIsTyping(false), 1800);
            }
        } else {
            if (displayedText.length > 0) {
                timeout = setTimeout(() => setDisplayedText(displayedText.slice(0, -1)), 35);
            } else {
                setTitleIndex((prev) => (prev + 1) % titles.length);
                setIsTyping(true);
            }
        }
        return () => clearTimeout(timeout);
    }, [displayedText, isTyping, titleIndex]);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-primary)] pt-20"
        >
            {/* Grid background */}
            <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

            {/* Radial fade over grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, var(--bg-primary) 80%)' }}
            />

            {/* Animated glow orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
                animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-primary-500) 8%, transparent), transparent 70%)' }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
                animate={{ x: [0, -60, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-secondary-500) 7%, transparent), transparent 70%)' }}
            />

            {/* Corner HUD decorations */}

            <div className="absolute top-24 right-8 text-primary-400/20 font-mono-ui text-xs hidden lg:block leading-tight text-right pointer-events-none">
                <div>LAT: 18.5204° N</div>
                <div>LNG: 73.8567° E</div>
                <div>LOC: PUNE, IN</div>
            </div>

            {/* Content */}
            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="container-custom relative z-10"
            >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-4">

                    {/* Left — Text Content */}
                    <div className="flex-1 text-center lg:text-left order-2 lg:order-1">

                        {/* Status chip */}
                        <motion.div
                            variants={staggerItem}
                            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                            </span>
                            <span className="font-mono-ui text-xs text-green-400 tracking-widest">OPEN TO WORK</span>
                        </motion.div>

                        {/* Greeting */}
                        <motion.p
                            variants={staggerItem}
                            className="font-mono-ui text-primary-400 text-sm tracking-widest mb-2 uppercase"
                        >
                            &gt;_ Hello, I'm
                        </motion.p>

                        {/* Name */}
                        <motion.h1
                            variants={staggerItem}
                            className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight"
                        >
                            <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: 'linear-gradient(135deg, var(--text-primary) 0%, var(--color-primary-500) 50%, var(--color-secondary-500) 100%)' }}
                            >
                                {resumeData.name}
                            </span>
                        </motion.h1>

                        {/* Typewriter title */}
                        <motion.div variants={staggerItem} className="mb-8 h-10 md:h-12 flex items-center justify-center lg:justify-start gap-2">
                            <span className="font-mono-ui text-primary-400 text-lg sm:text-xl md:text-2xl">&gt;_</span>
                            <span className="font-mono-ui text-[var(--text-primary)] text-lg sm:text-xl md:text-2xl">
                                {displayedText}
                                <span
                                    className="inline-block w-0.5 h-5 md:h-6 bg-primary-400 ml-0.5 align-middle"
                                    style={{ animation: 'blink 0.8s step-end infinite' }}
                                />
                            </span>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={staggerItem}
                            className="text-sm sm:text-base text-[var(--text-secondary)] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 border-l-2 border-primary-400/40 pl-4"
                        >
                            Data Engineer with expertise in scalable pipelines, Spark, Databricks &amp;
                            Medallion Architecture — plus front-end web development with React.js.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={staggerItem}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                        >
                            {/* Primary — Resume */}
                            <div className="relative inline-flex h-12 w-48 font-orbitron text-sm font-semibold tracking-widest uppercase text-[var(--bg-primary)] bg-primary-400 rounded shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-lg)] overflow-hidden group">
                                {/* Default State (Slides out to left) */}
                                <div className="absolute inset-0 flex items-center justify-center gap-2 translate-x-0 group-hover:-translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                    <span>Resume</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>

                                {/* Hover State: Split Actions (Slides in from right) */}
                                <div className="absolute inset-0 flex translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] bg-primary-300">
                                    <button 
                                        onClick={() => setIsResumeModalOpen(true)}
                                        className="flex-1 flex items-center justify-center hover:bg-black/10 transition-colors border-r border-black/10"
                                        title="Preview"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                    <a 
                                        href={resumePDF}
                                        download="Manan_Batra_Resume.pdf"
                                        className="flex-1 flex items-center justify-center hover:bg-black/10 transition-colors"
                                        title="Download"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Secondary — Contact */}
                            <button
                                onClick={() => scrollToElement('contact')}
                                className="relative inline-flex items-center justify-center gap-2 px-6 py-3 font-orbitron text-sm font-semibold tracking-widest uppercase text-primary-400 border border-primary-400/50 rounded hover:border-primary-400 hover:bg-primary-400/10 hover:shadow-[var(--shadow-glow-sm)] transition-all duration-200 overflow-hidden group"
                            >
                                <span className="absolute inset-0 bg-primary-400/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                <span className="relative">Contact Me</span>
                                <svg className="w-4 h-4 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </motion.div>
                    </div>

                    {/* Right — Profile Image */}
                    <motion.div variants={staggerItem} className="flex-shrink-0 order-1 lg:order-2">
                        <div className="group relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[360px] lg:h-[360px] float-anim cursor-pointer">

                            {/* Gradient border ring — glows slightly on hover */}
                            <div
                                className="absolute inset-0 rounded-full p-[3px] transition-all duration-500 shadow-[0_0_15px_var(--color-primary-500)] group-hover:shadow-[0_0_40px_var(--color-primary-500)]"
                                style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500), var(--color-primary-500))', animation: 'border-flow 4s linear infinite', backgroundSize: '200% 200%' }}
                            >
                                <div className="w-full h-full rounded-full bg-[var(--bg-primary)]" />
                            </div>

                            {/* Image */}
                            <div className="absolute inset-[5px] rounded-full overflow-hidden">
                                <img
                                    src={profileImage}
                                    alt="Manan Batra"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Scan overlay on image */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: 'repeating-linear-gradient(to bottom, transparent, transparent 3px, var(--scan-color) 3px, var(--scan-color) 4px)'
                                    }}
                                />
                            </div>

                        </div>
                    </motion.div>

                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <motion.div
                        className="w-px h-10 bg-gradient-to-b from-primary-400/50 to-transparent"
                        animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>

            {/* Resume Modal */}
            <ResumeModal
                isOpen={isResumeModalOpen}
                onClose={() => setIsResumeModalOpen(false)}
                pdfUrl={resumePDF}
            />
        </section>
    );
}
