import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motionPresets';
import resumeData from '@/data/resume.json';
import viewTubeImg from '@/assets/ViewTube.png';
import movieRecImg from '@/assets/Movie_Recommendation_System.png';
import portfolioImg from '@/assets/Portfolio_ss.png';
import healthcareImg from '@/assets/healthcare_pipeline.png';

const projectImages = {
    'Healthcare Patient Analytics Pipeline': healthcareImg,
    'ViewTube ~ YouTube Clone': viewTubeImg,
    'Movie Recommendation System': movieRecImg,
    'Portfolio Website': portfolioImg,
};

export default function Projects() {
    const projects = resumeData.projects || [];
    const [expandedProject, setExpandedProject] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [expandedBullets, setExpandedBullets] = useState({});

    const toggleTech = (index) => setExpandedProject(expandedProject === index ? null : index);
    const toggleBullets = (index) => setExpandedBullets(prev => ({ ...prev, [index]: !prev[index] }));

    return (
        <section id="projects" className="section-padding bg-[var(--bg-primary)] relative overflow-hidden">

            {/* Grid background */}
            <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, var(--bg-primary) 80%)' }} />

            <div className="container-custom relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14 sm:mb-18"
                >
                    <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-[var(--text-primary)]">Featured </span>
                        <span className="text-primary-400">Projects</span>
                    </h2>
                    <div className="glow-divider w-24 mx-auto mb-5" />
                    <p className="text-[var(--text-secondary)] font-mono-ui text-sm max-w-xl mx-auto">
                        Explore recent work — modern solutions, innovative systems, and best engineering practices.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto px-0 items-stretch"
                >
                    {projects.map((project, index) => {
                        const isExpanded = expandedProject === index;
                        const isHovered = hoveredIndex === index;
                        const displayedTech = isExpanded ? project.technologies : project.technologies.slice(0, 5);
                        const remainingCount = project.technologies.length - 5;
                        const projectImage = projectImages[project.name] || project.image;

                        return (
                            <motion.div
                                key={index}
                                variants={staggerItem}
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                className="group relative h-full"
                            >
                                {/* Glow border on hover */}
                                <motion.div
                                    className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(0,212,255,0.4), rgba(77,124,255,0.3), rgba(0,212,255,0.1))',
                                        filter: 'blur(12px)',
                                    }}
                                />

                                {/* Card */}
                                <div
                                    onClick={() => project.link && window.open(project.link, '_blank')}
                                    className="relative rounded-xl border border-[var(--border-color)] group-hover:border-primary-400/40 transition-all duration-400 h-full flex flex-col overflow-hidden cursor-pointer"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)',
                                        boxShadow: isHovered ? '0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(0,212,255,0.08)' : '0 4px 20px rgba(0,0,0,0.3)',
                                    }}
                                >
                                    {/* Left accent bar */}
                                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-400/80 via-primary-400/30 to-transparent" />

                                    <div className="p-5 sm:p-6 flex flex-col flex-1">

                                        {/* Project ID */}
                                        <div className="font-mono-ui text-[10px] tracking-widest text-primary-400/40 uppercase mb-3">
                                            PROJECT://{String(index + 1).padStart(2, '0')}
                                        </div>

                                        {/* Image */}
                                        <div className="relative h-40 sm:h-48 mb-5 overflow-hidden rounded-lg border border-[var(--border-color)] group-hover:border-primary-400/30 transition-colors">
                                            {/* Scan overlay on image */}
                                            <div className="absolute inset-0 z-10 pointer-events-none"
                                                style={{ background: 'repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,212,255,0.025) 3px, rgba(0,212,255,0.025) 4px)' }} />
                                            {/* HUD corner brackets on image */}
                                            <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t border-l border-primary-400/60 z-20" />
                                            <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t border-r border-primary-400/60 z-20" />
                                            <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b border-l border-primary-400/60 z-20" />
                                            <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b border-r border-primary-400/60 z-20" />

                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/70 to-transparent z-10" />
                                            <img
                                                src={projectImage}
                                                alt={project.name}
                                                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${project.name === 'Healthcare Patient Analytics Pipeline' ? 'object-center' : 'object-top'}`}
                                                style={project.name === 'Portfolio Website' ? { objectPosition: 'center 32%' } : {}}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://placehold.co/600x400/050d1a/00d4ff?text=PROJECT+PREVIEW';
                                                }}
                                            />
                                        </div>

                                        {/* Header row */}
                                        <div className="flex items-start justify-between mb-4 gap-3">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="flex-shrink-0 p-2 rounded-lg border border-primary-400/30 bg-primary-400/5"
                                                    style={{ boxShadow: '0 0 10px rgba(0,212,255,0.1)' }}
                                                >
                                                    <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                    </svg>
                                                </div>
                                                <h3 className="font-orbitron text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-primary-400 transition-colors duration-300 leading-tight">
                                                    {project.name}
                                                </h3>
                                            </div>

                                            {/* Links */}
                                            <div className="flex gap-2 flex-shrink-0">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-1.5 text-[var(--text-secondary)] hover:text-primary-400 transition-colors border border-[var(--border-color)] hover:border-primary-400/50 rounded"
                                                        title="Source Code"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                        </svg>
                                                    </a>
                                                )}
                                                {project.link && (
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-1.5 text-[var(--text-secondary)] hover:text-primary-400 transition-colors border border-[var(--border-color)] hover:border-primary-400/50 rounded"
                                                        title="Live Demo"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Bullets */}
                                        <div className="mb-5">
                                            <div
                                                className={`relative overflow-hidden transition-all duration-500 ease-in-out`}
                                                style={{ maxHeight: expandedBullets[index] ? '1000px' : '78px' }}
                                            >
                                                <ul className="space-y-2.5">
                                                    {(project.bullets || []).map((bullet, idx) => (
                                                        <motion.li
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -8 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: idx * 0.08 }}
                                                            className="flex items-start gap-2.5"
                                                        >
                                                            <div className="flex items-center gap-1.5 mt-[6px] flex-shrink-0">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" style={{ boxShadow: '0 0 6px rgba(0,212,255,0.7)' }} />
                                                                <div className="w-4 h-px bg-gradient-to-r from-primary-400/60 to-transparent" />
                                                            </div>
                                                            <span className="text-[var(--text-primary)] text-sm leading-relaxed opacity-90">{bullet}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                                {!expandedBullets[index] && (
                                                    <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
                                                )}
                                            </div>
                                            {project.bullets && project.bullets.length > 0 && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); toggleBullets(index); }}
                                                    className="mt-3 font-mono-ui text-xs text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1"
                                                    style={{ marginLeft: '38px' }}
                                                >
                                                    {expandedBullets[index] ? (
                                                        <>[SHOW_LESS] <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></>
                                                    ) : (
                                                        <>[READ_MORE] <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></>
                                                    )}
                                                </button>
                                            )}
                                        </div>

                                        <div className="mt-auto">
                                            {/* Divider */}
                                            <div className="glow-divider mb-4" />

                                            {/* Tech stack */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-1.5 font-mono-ui text-[10px] text-primary-400/50 tracking-widest uppercase">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                    Stack
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    <AnimatePresence mode="popLayout">
                                                        {displayedTech.map((tech, idx) => (
                                                            <motion.span
                                                                key={tech}
                                                                initial={{ opacity: 0, scale: 0.85 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0.85 }}
                                                                transition={{ delay: idx * 0.03 }}
                                                                className="tech-badge"
                                                            >
                                                                {tech}
                                                            </motion.span>
                                                        ))}
                                                    </AnimatePresence>
                                                    {!isExpanded && remainingCount > 0 && (
                                                        <motion.button
                                                            onClick={(e) => { e.stopPropagation(); toggleTech(index); }}
                                                            whileHover={{ scale: 1.05 }}
                                                            className="tech-badge opacity-70 hover:opacity-100"
                                                        >
                                                            +{remainingCount}
                                                        </motion.button>
                                                    )}
                                                    {isExpanded && (
                                                        <motion.button
                                                            onClick={(e) => { e.stopPropagation(); toggleTech(index); }}
                                                            whileHover={{ scale: 1.05 }}
                                                            className="tech-badge opacity-70 hover:opacity-100"
                                                        >
                                                            [less]
                                                        </motion.button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom scan sweep on hover */}
                                    <div className="h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                                        style={{ background: 'linear-gradient(90deg, var(--color-primary-400), var(--color-secondary-400), transparent)' }} />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Footer decoration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-3 text-[var(--text-secondary)] font-mono-ui text-xs">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary-400/50" />
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary-400/50" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
