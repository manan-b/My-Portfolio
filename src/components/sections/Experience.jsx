import { motion } from 'framer-motion';
import resumeData from '@/data/resume.json';
import eoxsCertificate from '@/assets/EOXS Letter of Employeement.pdf';
import cheggCertificate from '@/assets/Offer Letter@CHEGG.pdf';

/**
 * Experience Section - Vertical Timeline with Boxes (Turquoise Theme)
 */
export default function Experience() {
    const experiences = resumeData.experience || [];

    // Map company names to their respective certificate PDFs
    const certificateLinks = {
        'EOXS': eoxsCertificate,
        'Chegg India': cheggCertificate,
        'Wiperspray': null // No certificate for Wiperspray yet
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
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-primary-400">Work </span>
                        <span className="text-[var(--text-primary)]">Experience</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary-400 to-primary-500 mx-auto rounded-full" />
                </motion.div>

                {/* Timeline Layout - Boxes with Vertical Line */}
                <div className="max-w-5xl mx-auto px-4">
                    <div className="relative">
                        {/* Continuous Vertical Line - Dynamic Height */}
                        <div
                            className="absolute left-[18px] md:left-[38px] top-[40px] w-1 bg-[#065465] rounded-full"
                            style={{ height: `calc(${experiences.length} * 250px - 140px)` }}
                        />

                        {/* Experience Items */}
                        <div className="flex flex-col">
                            {experiences.length > 0 && (
                                <>
                                    {experiences.map((exp, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.15 }}
                                            className="relative pl-16 md:pl-24 pb-12 last:pb-0"
                                        >
                                            {/* Vertical Line Segment (connects to next item) */}
                                            {idx !== experiences.length - 1 && (
                                                <div className="absolute left-[18px] md:left-[38px] top-[32px] bottom-[-32px] w-1 bg-primary-400/20 rounded-full" />
                                            )}

                                            {/* Turquoise Dot with Glow - Centered on Line */}
                                            <div className="absolute left-[8px] md:left-[28px] top-5 z-10">
                                                <div className="w-6 h-6 bg-[var(--bg-primary)] rounded-full border-[3px] border-primary-400 shadow-[0_0_15px_rgba(45,212,191,0.6)]" />
                                            </div>

                                            {/* Content Box */}
                                            {certificateLinks[exp.company] ? (
                                                <a
                                                    href={certificateLinks[exp.company]}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] hover:border-primary-400/50 hover:shadow-[0_5px_20px_rgba(45,212,191,0.1)] transition-all group relative cursor-pointer"
                                                >
                                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                                        {/* Left - Main Content */}
                                                        <div className="flex-1">
                                                            {/* Title */}
                                                            <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-primary-400 transition-colors">
                                                                {exp.title}
                                                            </h3>

                                                            {/* Company */}
                                                            <div className="flex items-start gap-2 mb-3">
                                                                <svg className="w-5 h-5 text-[var(--text-secondary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                                                                </svg>
                                                                <p className="text-base md:text-lg text-[var(--text-secondary)] font-medium">
                                                                    {exp.company}
                                                                </p>
                                                            </div>

                                                            {/* Highlights */}
                                                            {exp.highlights && exp.highlights.length > 0 && (
                                                                <div className="space-y-2 mt-4">
                                                                    {exp.highlights.map((highlight, highlightIdx) => (
                                                                        <div key={highlightIdx} className="flex items-start gap-3">
                                                                            <div className="mt-1.5 flex-shrink-0">
                                                                                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                                                                            </div>
                                                                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1">
                                                                                {highlight}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Right - Period */}
                                                        <div className="flex-shrink-0">
                                                            <span className="inline-flex items-center justify-center px-4 py-2 bg-primary-400/10 text-primary-400 text-sm font-bold rounded-lg border border-primary-400/20 group-hover:bg-primary-400/20 transition-colors">
                                                                {exp.period}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                            ) : (
                                                <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] hover:border-primary-400/50 hover:shadow-[0_5px_20px_rgba(45,212,191,0.1)] transition-all group relative">
                                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                                        {/* Left - Main Content */}
                                                        <div className="flex-1">
                                                            {/* Title */}
                                                            <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-primary-400 transition-colors">
                                                                {exp.title}
                                                            </h3>

                                                            {/* Company */}
                                                            <div className="flex items-start gap-2 mb-3">
                                                                <svg className="w-5 h-5 text-[var(--text-secondary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                                                                </svg>
                                                                <p className="text-base md:text-lg text-[var(--text-secondary)] font-medium">
                                                                    {exp.company}
                                                                </p>
                                                            </div>

                                                            {/* Highlights */}
                                                            {exp.highlights && exp.highlights.length > 0 && (
                                                                <div className="space-y-2 mt-4">
                                                                    {exp.highlights.map((highlight, highlightIdx) => (
                                                                        <div key={highlightIdx} className="flex items-start gap-3">
                                                                            <div className="mt-1.5 flex-shrink-0">
                                                                                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                                                                            </div>
                                                                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1">
                                                                                {highlight}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Right - Period */}
                                                        <div className="flex-shrink-0">
                                                            <span className="inline-flex items-center justify-center px-4 py-2 bg-primary-400/10 text-primary-400 text-sm font-bold rounded-lg border border-primary-400/20 group-hover:bg-primary-400/20 transition-colors">
                                                                {exp.period}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
