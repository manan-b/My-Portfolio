import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import resumeData from '@/data/resume.json';
import eoxsCertificate from '@/assets/EOXS Letter of Employeement.pdf';
import cheggCertificate from '@/assets/Offer Letter@CHEGG.pdf';

/**
 * Experience Section - Vertical Timeline with Boxes (Turquoise Theme)
 */

// Map company names to their respective certificate PDFs
const certificateLinks = {
    'EOXS': eoxsCertificate,
    'Chegg India': cheggCertificate,
    'Wiperspray': null
};

export default function Experience() {
    const experiences = resumeData.experience || [];
    const [expandedItems, setExpandedItems] = useState({});
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile viewport
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleExpanded = (index) => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Calculate dynamic height based on expanded items
    const calculateTimelineHeight = () => {
        const baseHeight = 250; // base height per item
        const expandedBonus = 80; // extra height when expanded

        let totalHeight = experiences.length * baseHeight;
        Object.keys(expandedItems).forEach(key => {
            if (expandedItems[key] && isMobile) {
                totalHeight += expandedBonus;
            }
        });

        // Adjusted subtraction to ensure line ends behind the last dot
        return `${totalHeight - 160}px`;
    };

    return (
        <section
            id="experience"
            className="section-padding bg-[var(--bg-primary)] relative overflow-hidden"
        >
            <div className="container-custom relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="text-primary-400">Work </span>
                        <span className="text-[var(--text-primary)]">Experience</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary-400 to-primary-500 mx-auto rounded-full" />
                </motion.div>

                {/* Timeline Layout - Boxes with Vertical Line */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="relative">
                        {/* Continuous Vertical Line - Dynamic Height */}
                        <div
                            className="hidden md:block absolute left-[14px] sm:left-[18px] md:left-[38px] top-[40px] w-0.5 sm:w-1 bg-[#065465] rounded-full transition-all duration-500"
                            style={{ height: calculateTimelineHeight() }}
                        />

                        {/* Experience Items */}
                        <div className="flex flex-col">
                            {experiences.length > 0 && (
                                <>
                                    {experiences.map((exp, idx) => {
                                        const isExpanded = expandedItems[idx];
                                        const showReadMore = isMobile && exp.highlights && exp.highlights.length > 2;
                                        const displayHighlights = showReadMore && !isExpanded
                                            ? exp.highlights.slice(0, 2)
                                            : exp.highlights;

                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -30 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.15 }}
                                                className="relative pl-0 md:pl-24 pb-10 sm:pb-12 last:pb-0"
                                            >
                                                {/* Turquoise Dot with Glow - Centered on Line */}
                                                <div className="hidden md:block absolute left-[6px] sm:left-[8px] md:left-[28px] top-3 sm:top-5 z-10">
                                                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[var(--bg-primary)] rounded-full border-2 sm:border-[3px] border-primary-400 shadow-[0_0_10px_rgba(45,212,191,0.5)] sm:shadow-[0_0_15px_rgba(45,212,191,0.6)]" />
                                                </div>

                                                {/* Content Box */}
                                                {certificateLinks[exp.company] ? (
                                                    <a
                                                        href={certificateLinks[exp.company]}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block bg-[var(--bg-secondary)] rounded-xl p-4 sm:p-5 md:p-6 border border-[var(--border-color)] hover:border-primary-400/50 hover:shadow-[0_5px_20px_rgba(45,212,191,0.1)] transition-all group relative cursor-pointer"
                                                    >
                                                        <div className="flex flex-col gap-3 sm:gap-4">
                                                            {/* Top Row: Title/Company + Period */}
                                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                                                                {/* Left - Main Content */}
                                                                <div className="flex-1 w-full order-2 sm:order-1">
                                                                    {/* Title */}
                                                                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-primary-400 transition-colors">
                                                                        {exp.title}
                                                                    </h3>

                                                                    {/* Period - Mobile Only (Below Title) */}
                                                                    <div className="block sm:hidden mb-3">
                                                                        <span className="text-primary-400 text-xs font-medium">
                                                                            {exp.period}
                                                                        </span>
                                                                    </div>

                                                                    {/* Company */}
                                                                    <div className="flex items-start gap-2 mb-0">
                                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-secondary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[var(--text-secondary)] font-medium">
                                                                            {exp.company}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                {/* Right - Period (Desktop Only) */}
                                                                <div className="hidden sm:block flex-shrink-0 order-1 sm:order-2">
                                                                    <span className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-400/10 text-primary-400 text-xs sm:text-sm font-bold rounded-lg border border-primary-400/20 group-hover:bg-primary-400/20 transition-colors">
                                                                        {exp.period}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Highlights - Full Width */}
                                                            {displayHighlights && displayHighlights.length > 0 && (
                                                                <div className="space-y-2 mt-2">
                                                                    {displayHighlights.map((highlight, highlightIdx) => (
                                                                        <div key={highlightIdx} className="flex items-start gap-3">
                                                                            <div className="mt-1.5 flex-shrink-0">
                                                                                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                                                                            </div>
                                                                            <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed flex-1">
                                                                                {highlight}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                    {showReadMore && (
                                                                        <div className="flex justify-center sm:justify-start w-full">
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    toggleExpanded(idx);
                                                                                }}
                                                                                className="text-primary-400 text-xs font-medium hover:text-primary-300 transition-colors mt-2 flex items-center gap-1"
                                                                            >
                                                                                {isExpanded ? 'Read Less' : 'Read More'}
                                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </a>
                                                ) : (
                                                    <div className="bg-[var(--bg-secondary)] rounded-xl p-4 sm:p-5 md:p-6 border border-[var(--border-color)] hover:border-primary-400/50 hover:shadow-[0_5px_20px_rgba(45,212,191,0.1)] transition-all group relative">
                                                        <div className="flex flex-col gap-3 sm:gap-4">
                                                            {/* Top Row: Title/Company + Period */}
                                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                                                                {/* Left - Main Content */}
                                                                <div className="flex-1 w-full order-2 sm:order-1">
                                                                    {/* Title */}
                                                                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-primary-400 transition-colors">
                                                                        {exp.title}
                                                                    </h3>

                                                                    {/* Period - Mobile Only (Below Title) */}
                                                                    <div className="block sm:hidden mb-3">
                                                                        <span className="text-primary-400 text-xs font-medium">
                                                                            {exp.period}
                                                                        </span>
                                                                    </div>

                                                                    {/* Company */}
                                                                    <div className="flex items-start gap-2 mb-0">
                                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-secondary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[var(--text-secondary)] font-medium">
                                                                            {exp.company}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                {/* Right - Period (Desktop Only) */}
                                                                <div className="hidden sm:block flex-shrink-0 order-1 sm:order-2">
                                                                    <span className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-400/10 text-primary-400 text-xs sm:text-sm font-bold rounded-lg border border-primary-400/20 group-hover:bg-primary-400/20 transition-colors">
                                                                        {exp.period}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Highlights - Full Width */}
                                                            {displayHighlights && displayHighlights.length > 0 && (
                                                                <div className="space-y-2 mt-2">
                                                                    {displayHighlights.map((highlight, highlightIdx) => (
                                                                        <div key={highlightIdx} className="flex items-start gap-3">
                                                                            <div className="mt-1.5 flex-shrink-0">
                                                                                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                                                                            </div>
                                                                            <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed flex-1">
                                                                                {highlight}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                    {showReadMore && (
                                                                        <div className="flex justify-center sm:justify-start w-full">
                                                                            <button
                                                                                onClick={() => toggleExpanded(idx)}
                                                                                className="text-primary-400 text-xs font-medium hover:text-primary-300 transition-colors mt-2 flex items-center gap-1"
                                                                            >
                                                                                {isExpanded ? 'Read Less' : 'Read More'}
                                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
