import { motion } from 'framer-motion';
import resumeData from '@/data/resume.json';

/**
 * Education Section - Vertical Timeline with Boxes (Turquoise Theme)
 */
export default function Education() {
    const education = resumeData.education || [];

    return (
        <section
            id="education"
            className="section-padding bg-[var(--bg-primary)] relative overflow-hidden"
        >
            <div className="container-custom relative z-10">
                {/*  Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-[var(--text-primary)]">My </span>
                        <span className="text-primary-400">Education</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary-400 to-primary-500 mx-auto rounded-full" />
                </motion.div>

                {/* Timeline Layout - Boxes with Vertical Line */}
                <div className="max-w-5xl mx-auto px-4">
                    <div className="relative">
                        {/* Continuous Vertical Line - Dynamic Height */}
                        <div
                            className="absolute left-[18px] md:left-[38px] top-[40px] w-1 bg-[#065465] rounded-full"
                            style={{ height: `calc(${education.length} * 180px - 130px)` }}
                        />

                        {/* Education Items */}
                        <div className="flex flex-col">
                            {education.length > 0 && (
                                <>
                                    {education.map((edu, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.15 }}
                                            className="relative pl-16 md:pl-24 pb-12 last:pb-0"
                                        >
                                            {/* Vertical Line Segment (connects to next item) */}
                                            {idx !== education.length - 1 && (
                                                <div className="absolute left-[18px] md:left-[38px] top-[32px] bottom-[-32px] w-1 bg-primary-400/20 rounded-full" />
                                            )}

                                            {/* Turquoise Dot with Glow - Centered on Line */}
                                            <div className="absolute left-[8px] md:left-[28px] top-5 z-10">
                                                <div className="w-6 h-6 bg-[var(--bg-primary)] rounded-full border-[3px] border-primary-400 shadow-[0_0_15px_rgba(45,212,191,0.6)]" />
                                            </div>

                                            {/* Content Box */}
                                            <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] hover:border-primary-400/50 hover:shadow-[0_5px_20px_rgba(45,212,191,0.1)] transition-all group relative">
                                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                                    {/* Left - Main Content */}
                                                    <div className="flex-1">
                                                        {/* Degree */}
                                                        <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-primary-400 transition-colors">
                                                            {edu.degree}
                                                        </h3>

                                                        {/* Institution */}
                                                        <div className="flex items-start gap-2 mb-3">
                                                            <svg className="w-5 h-5 text-[var(--text-secondary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                                            </svg>
                                                            <p className="text-base md:text-lg text-[var(--text-secondary)] font-medium">
                                                                {edu.institution}
                                                            </p>
                                                        </div>

                                                        {/* Score */}
                                                        {edu.score && (
                                                            <div className="inline-block bg-[var(--bg-primary)] px-3 py-1 rounded-full border border-[var(--border-color)] group-hover:border-primary-400/30 transition-colors">
                                                                <p className="text-primary-400 text-sm font-medium">
                                                                    {edu.score}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Right - Period */}
                                                    <div className="flex-shrink-0">
                                                        <span className="inline-flex items-center justify-center px-4 py-2 bg-primary-400/10 text-primary-400 text-sm font-bold rounded-lg border border-primary-400/20 group-hover:bg-primary-400/20 transition-colors">
                                                            {edu.period}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
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
