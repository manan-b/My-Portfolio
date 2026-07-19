import { motion } from 'framer-motion';
import { useState } from 'react';
import resumeData from '@/data/resume.json';
import cheggCertificate from '@/assets/Offer Letter@CHEGG.pdf';

const certificateLinks = {
    'Persistent Systems': null,
    'Revature': null,
    'Chegg India': cheggCertificate,
};

const companyMeta = {
    'Persistent Systems': {
        domain: 'Data Engineering',
        location: 'Pune, Maharashtra',
        glow: 'rgba(52,211,153,0.25)',
        accentFrom: '#34d399',
        accentTo: '#14b8a6',
        dotColor: 'bg-emerald-400',
        labelColor: 'text-emerald-400',
        badgeBg: 'bg-emerald-400/10',
        badgeBorder: 'border-emerald-400/30',
        badgeText: 'text-emerald-400',
        roleLabel: 'Consulting',
    },
    'Revature': {
        domain: 'Tech Training',
        location: 'Chennai, Tamil Nadu',
        glow: 'rgba(56,189,248,0.25)',
        accentFrom: '#38bdf8',
        accentTo: '#3b82f6',
        dotColor: 'bg-sky-400',
        labelColor: 'text-sky-400',
        badgeBg: 'bg-sky-400/10',
        badgeBorder: 'border-sky-400/30',
        badgeText: 'text-sky-400',
        roleLabel: 'Engineering',
    },
    'Chegg India': {
        domain: 'EdTech',
        location: 'Remote',
        glow: 'rgba(167,139,250,0.25)',
        accentFrom: '#a78bfa',
        accentTo: '#8b5cf6',
        dotColor: 'bg-violet-400',
        labelColor: 'text-violet-400',
        badgeBg: 'bg-violet-400/10',
        badgeBorder: 'border-violet-400/30',
        badgeText: 'text-violet-400',
        roleLabel: 'Education',
    },
};

function ExperienceCard({ exp, index }) {
    const [hovered, setHovered] = useState(false);
    const cert = certificateLinks[exp.company];
    const meta = companyMeta[exp.company] || companyMeta['Chegg India'];
    const isLast = index === (resumeData.experience?.length ?? 0) - 1;
    const isActive = exp.period?.toLowerCase().includes('present');

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.18, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex gap-6 md:gap-10"
        >
            {/* Left — Timeline Track */}
            <div className="hidden md:flex flex-col items-center flex-shrink-0 w-14">
                <div className="flex flex-col items-center mt-6 relative">
                    {/* Subtle outer orbital ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        className="absolute w-14 h-14 rounded-full"
                        style={{
                            border: `1px solid transparent`,
                            borderTopColor: `${meta.accentFrom}40`,
                            borderRightColor: `${meta.accentFrom}15`,
                        }}
                    />
                    {/* Hexagonal node */}
                    <motion.div
                        animate={hovered
                            ? { scale: 1.15, boxShadow: `0 0 20px ${meta.glow}, 0 0 40px ${meta.glow}` }
                            : { scale: 1, boxShadow: `0 0 8px ${meta.glow}` }
                        }
                        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                        className="w-12 h-12 z-10 flex-shrink-0 flex items-center justify-center relative"
                        style={{
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                            background: `linear-gradient(135deg, ${meta.accentFrom}, ${meta.accentTo})`,
                        }}
                    >
                        {/* Inner cutout */}
                        <div
                            className="absolute inset-[2px] flex items-center justify-center"
                            style={{
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                background: 'var(--bg-secondary)',
                            }}
                        >
                            <span
                                className="font-orbitron font-bold text-xs"
                                style={{ color: meta.accentFrom }}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </span>
                        </div>
                    </motion.div>
                </div>
                {/* Connector — gradient line with flowing energy dot */}
                {!isLast && (
                    <div className="relative flex-1 mt-4" style={{ width: '2px' }}>
                        <div
                            className="absolute inset-0"
                            style={{
                                width: '2px',
                                background: `linear-gradient(to bottom, ${meta.accentFrom}60, ${meta.accentFrom}15)`,
                                borderRadius: '1px',
                            }}
                        />
                        {/* Flowing energy dot */}
                        <motion.div
                            className="absolute left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full"
                            style={{
                                backgroundColor: meta.accentFrom,
                                boxShadow: `0 0 10px ${meta.glow}, 0 0 4px ${meta.accentFrom}`,
                            }}
                            animate={{ top: ['0%', '100%'], opacity: [1, 0.3] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
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
                                {exp.company}
                            </h3>

                            {isActive && (
                                <span className="relative inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono-ui font-bold tracking-widest uppercase"
                                    style={{ background: `${meta.accentFrom}20`, border: `1px solid ${meta.accentFrom}60`, color: meta.accentFrom }}>
                                    <span className="relative flex w-1.5 h-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                            style={{ backgroundColor: meta.accentFrom }} />
                                        <span className="relative inline-flex rounded-full w-1.5 h-1.5"
                                            style={{ backgroundColor: meta.accentFrom }} />
                                    </span>
                                    ACTIVE
                                </span>
                            )}
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
                            {exp.period}
                        </div>
                    </div>

                    {/* ── Card Body ── */}
                    <div
                        className="px-6 sm:px-8 py-6"
                        style={{ background: 'linear-gradient(160deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)' }}
                    >
                        {/* Role title + location row */}
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                            <p className="text-[var(--text-primary)] font-semibold text-base sm:text-lg tracking-wide">
                                {exp.title}
                            </p>
                            <span className="text-[var(--border-color)]">·</span>
                            <span className="flex items-center gap-1 font-mono-ui text-xs text-[var(--text-secondary)]">
                                <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                {meta.location}
                            </span>
                            {cert && (
                                <>
                                    <span className="text-[var(--border-color)]">·</span>
                                    <a href={cert} target="_blank" rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-1 font-mono-ui text-xs transition-colors"
                                        style={{ color: meta.accentFrom }}>
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Certificate
                                    </a>
                                </>
                            )}
                        </div>

                        {/* Accent divider */}
                        <div className="mb-5 h-px w-full rounded"
                            style={{ background: `linear-gradient(90deg, ${meta.accentFrom}50, transparent)` }} />

                        {/* Highlights */}
                        {exp.highlights && exp.highlights.length > 0 && (
                            <ul className="space-y-3.5">
                                {exp.highlights.map((highlight, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.18 + i * 0.07, duration: 0.4 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="mt-[7px] flex-shrink-0 flex items-center gap-1.5">
                                            <div
                                                className="w-2 h-2 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: meta.accentFrom, boxShadow: `0 0 8px ${meta.glow}` }}
                                            />
                                            <div className="w-5 h-px" style={{ background: `linear-gradient(90deg, ${meta.accentFrom}70, transparent)` }} />
                                        </div>
                                        <p className="text-[var(--text-primary)] text-sm sm:text-[0.9rem] leading-relaxed opacity-90">
                                            {highlight}
                                        </p>
                                    </motion.li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Scan-line overlay */}
                    <div className="absolute inset-0 pointer-events-none rounded-2xl"
                        style={{ background: 'repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,212,255,0.006) 3px, rgba(0,212,255,0.006) 4px)' }} />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function Experience() {
    const experiences = resumeData.experience || [];

    return (
        <section id="experience" className="section-padding bg-[var(--bg-secondary)] relative overflow-hidden">

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
                        <span className="text-primary-400">Work </span>
                        <span className="text-[var(--text-primary)]">Experience</span>
                    </h2>
                    <div className="glow-divider w-24 mx-auto mb-5" />
                    <p className="text-[var(--text-secondary)] font-mono-ui text-sm max-w-xl mx-auto">
                        A timeline of roles where I built products, engineered systems, and delivered measurable impact.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="flex flex-col">
                    {experiences.map((exp, idx) => (
                        <ExperienceCard key={idx} exp={exp} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
