import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motionPresets';
import resumeData from '@/data/resume.json';
import viewTubeImg from '@/assets/ViewTube.png';
import movieRecImg from '@/assets/Movie_Recommendation_System.png';
import portfolioImg from '@/assets/Portfolio_ss.png';

// Map project names to their respective images
const projectImages = {
    'ViewTube': viewTubeImg,
    'Movie Recommendation System': movieRecImg,
    'Portfolio Website': portfolioImg
};

/**
 * Projects Section - Completely Restructured with Enhanced UI/UX
 */
export default function Projects() {
    const projects = resumeData.projects || [];
    const [expandedProject, setExpandedProject] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const toggleTech = (index) => {
        setExpandedProject(expandedProject === index ? null : index);
    };

    return (
        <section
            id="projects"
            className="section-padding bg-[var(--bg-primary)] relative overflow-hidden"
        >
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent" />
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 2px 2px, var(--color-primary-400) 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="container-custom relative z-10">
                {/* Section Title with Enhanced Design */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className="text-[var(--text-primary)]">Featured </span>
                        <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>

                    <p className="text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                        Explore my recent work showcasing modern web development, innovative solutions, and best practices
                    </p>
                </motion.div>

                {/* Projects Grid with Enhanced Layout */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-7xl mx-auto"
                >
                    {projects.map((project, index) => {
                        const isExpanded = expandedProject === index;
                        const isHovered = hoveredIndex === index;
                        const displayedTech = isExpanded ? project.technologies : project.technologies.slice(0, 5);
                        const remainingTechCount = project.technologies.length - 5;

                        // Use mapped image or fallback to project.image
                        const projectImage = projectImages[project.name] || project.image;

                        return (
                            <motion.div
                                key={index}
                                variants={staggerItem}
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                className="group relative"
                            >
                                {/* Animated Glow Effect */}
                                <motion.div
                                    className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--color-primary-400), var(--color-secondary-400))',
                                        filter: 'blur(8px)',
                                    }}
                                    animate={isHovered ? {
                                        scale: [1, 1.01, 1],
                                    } : {}}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                {/* Project Card with Modern Design */}
                                <div className="relative bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] rounded-3xl overflow-hidden border border-[var(--border-color)] group-hover:border-primary-400/60 transition-all duration-500 shadow-2xl hover:shadow-glow-lg">
                                    <div className="p-8">
                                        {/* Project Image */}
                                        <div className="relative h-56 mb-6 overflow-hidden rounded-xl group-hover:shadow-md transition-all duration-500">
                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent opacity-60 z-10" />
                                            <img
                                                src={projectImage}
                                                alt={project.name}
                                                className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://placehold.co/600x400/1a1a1a/ffffff?text=Project+Preview';
                                                }}
                                            />

                                            {/* Action Links Overlay */}
                                            <div className="absolute bottom-3 right-3 flex gap-2 z-20 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                                {project.github && (
                                                    <motion.a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="p-2 rounded-lg bg-[var(--bg-primary)]/90 text-[var(--text-primary)] hover:text-primary-400 backdrop-blur-sm shadow-lg"
                                                        title="View Source Code"
                                                    >
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                        </svg>
                                                    </motion.a>
                                                )}
                                                {project.link && (
                                                    <motion.a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="p-2 rounded-lg bg-[var(--bg-primary)]/90 text-[var(--text-primary)] hover:text-primary-400 backdrop-blur-sm shadow-lg"
                                                        title="Visit Live Site"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </motion.a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Project Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            {/* Icon with animated background */}
                                            <motion.div
                                                whileHover={{ rotate: 5, scale: 1.1 }}
                                                className="relative"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-xl blur-md" />
                                                <div className="relative p-2 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-xl border border-primary-400/30">
                                                    <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                    </svg>
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Project Title */}
                                        <motion.h3
                                            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-primary-400 transition-colors duration-300"
                                            animate={isHovered ? { x: [0, 5, 0] } : {}}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {project.name}
                                        </motion.h3>

                                        {/* Project Description */}
                                        <p className="text-[var(--text-secondary)] mb-8 text-base leading-relaxed line-clamp-3 group-hover:text-[var(--text-primary)] transition-colors">
                                            {project.description}
                                        </p>

                                        {/* Tech Stack with Enhanced Pills */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-wider">Tech Stack</span>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                <AnimatePresence mode="popLayout">
                                                    {displayedTech.map((tech, idx) => (
                                                        <motion.span
                                                            key={tech}
                                                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                                                            transition={{ delay: idx * 0.05 }}
                                                            whileHover={{ scale: 1.08, y: -3 }}
                                                            className="relative group/pill"
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full blur-sm opacity-0 group-hover/pill:opacity-100 transition-opacity" />
                                                            <span className="relative px-4 py-2 bg-gradient-to-r from-primary-400/15 to-secondary-400/10 text-primary-400 text-xs font-mono font-semibold rounded-full border border-primary-400/40 hover:border-primary-400 hover:bg-primary-400/20 transition-all shadow-lg inline-block">
                                                                {tech}
                                                            </span>
                                                        </motion.span>
                                                    ))}
                                                </AnimatePresence>

                                                {!isExpanded && remainingTechCount > 0 && (
                                                    <motion.button
                                                        onClick={() => toggleTech(index)}
                                                        whileHover={{ scale: 1.08, y: -3 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="px-4 py-2 bg-gradient-to-r from-[var(--bg-primary)] to-[var(--bg-secondary)] text-primary-400 text-xs font-mono font-semibold rounded-full border border-primary-400/40 hover:border-primary-400 hover:bg-primary-400/20 transition-all shadow-lg"
                                                    >
                                                        +{remainingTechCount}
                                                    </motion.button>
                                                )}

                                                {isExpanded && (
                                                    <motion.button
                                                        onClick={() => toggleTech(index)}
                                                        whileHover={{ scale: 1.08, y: -3 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="px-4 py-2 bg-gradient-to-r from-[var(--bg-primary)] to-[var(--bg-secondary)] text-primary-400 text-xs font-mono font-semibold rounded-full border border-primary-400/40 hover:border-primary-400 hover:bg-primary-400/20 transition-all shadow-lg"
                                                    >
                                                        Show Less
                                                    </motion.button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="h-1 bg-gradient-to-r from-transparent via-primary-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom Decorative Element */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-3 text-[var(--text-secondary)]">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary-400/50" />
                        <span className="text-sm font-mono">More projects coming soon</span>
                        <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary-400/50" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
