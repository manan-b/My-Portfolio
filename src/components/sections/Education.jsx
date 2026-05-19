import { motion } from 'framer-motion';
import { useState } from 'react';
import resumeData from '@/data/resume.json';

// Color config per education entry (cycles if more than 3)
const entryColors = [
    {
        dotColor: 'bg-emerald-400',
        glow: 'rgba(52,211,153,0.25)',
        accentFrom: '#34d399',
        accentTo: '#14b8a6',
        labelColor: 'text-emerald-400',
        badgeBg: 'bg-emerald-400/10',
        badgeBorder: 'border-emerald-400/30',
        badgeText: 'text-emerald-400',
    },
    {
        dotColor: 'bg-sky-400',
        glow: 'rgba(56,189,248,0.25)',
        accentFrom: '#38bdf8',
        accentTo: '#3b82f6',
        labelColor: 'text-sky-400',
        badgeBg: 'bg-sky-400/10',
        badgeBorder: 'border-sky-400/30',
        badgeText: 'text-sky-400',
    },
    {
        dotColor: 'bg-violet-400',
        glow: 'rgba(167,139,250,0.25)',
        accentFrom: '#a78bfa',
        accentTo: '#8b5cf6',
        labelColor: 'text-violet-400',
        badgeBg: 'bg-violet-400/10',
        badgeBorder: 'border-violet-400/30',
        badgeText: 'text-violet-400',
    },
];

function EducationCard({ edu, index, total }) {
    const [hovered, setHovered] = useState(false);
    const meta = entryColors[index % entryColors.length];
    const isLast = index === total - 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.18, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex gap-6 md:gap-10"
        >
            {/* Left — Timeline Track */}
            <div className="hidden md:flex flex-col items-center flex-shrink-0 w-12">
                <div className="flex flex-col items-center mt-8">
                    {/* Numbered pulse dot */}
                    <motion.div
                        animate={hovered
                            ? { scale: 1.3, boxShadow: `0 0 20px ${meta.glow}, 0 0 40px ${meta.glow}` }
                            : { scale: 1, boxShadow: `0 0 8px ${meta.glow}` }
                        }
                        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        className={`w-9 h-9 rounded-full ${meta.dotColor} z-10 flex-shrink-0 flex items-center justify-center border-2 border-[var(--bg-secondary)]`}
                    >
                        <span className="font-orbitron font-bold text-[var(--bg-primary)] text-xs">{index + 1}</span>
                    </motion.div>
                </div>
                {/* Connector line */}
                {!isLast && (
                    <div
                        className="flex-1 w-px mt-3 opacity-40"
                        style={{ background: `linear-gradient(to bottom, ${meta.accentFrom}, transparent)` }}
                    />
                )}
            </div>

            {/* Right — Card */}
            <div className="flex-1 pb-10 last:pb-0">
                <motion.div
                    onHoverStart={() => setHovered(true)}
                    onHoverEnd={() => setHovered(false)}
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="relative rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                        boxShadow: hovered
                            ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${meta.glow}`
                            : `0 4px 24px rgba(0,0,0,0.25)`,
                        border: `1px solid ${hovered ? meta.accentFrom + '55' : 'var(--border-color)'}`,
                    }}
                >
                    {/* ── Header Band ── */}
                    <div
                        className="relative px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                        style={{
                            background: `linear-gradient(135deg, ${meta.accentFrom}22 0%, ${meta.accentTo}10 100%)`,
                            borderBottom: `1px solid ${meta.accentFrom}30`,
                        }}
                    >
                        {/* Left accent stripe */}
                        <div
                            className="absolute left-0 top-0 bottom-0 w-1"
                            style={{ background: `linear-gradient(to bottom, ${meta.accentFrom}, ${meta.accentTo})` }}
                        />

                        <div className="flex items-center gap-3 pl-2">
                            <h3
                                className="font-orbitron text-xl sm:text-2xl font-bold leading-tight"
                                style={{ color: meta.accentFrom }}
                            >
                                {edu.institution}
                            </h3>
                        </div>

                        {/* Period pill */}
                        <div
                            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono-ui text-xs font-semibold tracking-wider"
                            style={{
                                background: `${meta.accentFrom}15`,
                                border: `1px solid ${meta.accentFrom}45`,
                                color: meta.accentFrom,
                            }}
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {edu.period}
                        </div>
                    </div>

                    {/* ── Card Body ── */}
                    <div
                        className="px-6 sm:px-8 py-6"
                        style={{ background: 'linear-gradient(160deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)' }}
                    >
                        {/* Log ID */}
                        <div className="font-mono-ui text-[10px] tracking-widest text-primary-400/40 uppercase mb-4">
                            [LOG_{String(index + 1).padStart(2, '0')}] &gt; ACADEMIC_RECORD
                        </div>

                        {/* Role title + location row */}
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                            <p className="text-[var(--text-primary)] font-semibold text-base sm:text-lg tracking-wide">
                                {edu.degree}
                            </p>
                            {edu.score && (
                                <>
                                    <span className="text-[var(--border-color)]">·</span>
                                    <span className="flex items-center gap-1 font-mono-ui text-xs text-[var(--text-secondary)]">
                                        <span className="text-primary-400/50">GPA:</span>
                                        {edu.score}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Accent divider */}
                        <div className="mb-2 h-px w-full rounded"
                            style={{ background: `linear-gradient(90deg, ${meta.accentFrom}50, transparent)` }} />

                    </div>

                    {/* Scan-line overlay */}
                    <div className="absolute inset-0 pointer-events-none rounded-2xl"
                        style={{ background: 'repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,212,255,0.006) 3px, rgba(0,212,255,0.006) 4px)' }} />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function Education() {
    const education = resumeData.education || [];

    return (
        <section id="education" className="section-padding bg-[var(--bg-secondary)] relative overflow-hidden">

            {/* Dot grid */}
            <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)' }} />

            <div className="container-custom relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 sm:mb-20"
                >

                    <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-[var(--text-primary)]">My </span>
                        <span className="text-primary-400">Education</span>
                    </h2>
                    <div className="glow-divider w-24 mx-auto" />
                </motion.div>

                {/* Timeline */}
                <div className="flex flex-col">
                    {education.map((edu, idx) => (
                        <EducationCard key={idx} edu={edu} index={idx} total={education.length} />
                    ))}
                </div>
            </div>
        </section>
    );
}
