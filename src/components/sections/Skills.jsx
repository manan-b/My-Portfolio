import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motionPresets';
import resumeData from '@/data/resume.json';

/**
 * Skills Section - Dark theme with categorized skills
 */
export default function Skills() {
    const skillCategories = [
        {
            title: 'Languages',
            skills: resumeData.skills.languages || [],
            icon: '💻',
        },
        {
            title: 'Frontend Libraries / UI',
            skills: resumeData.skills.frameworks || [],
            icon: '⚛️',
        },
        {
            title: 'Backend / Databases',
            skills: resumeData.skills.backend || [],
            icon: '🔙',
        },
        {
            title: 'Tools & Platforms',
            skills: resumeData.skills.tools || [],
            icon: '🛠️',
        },
    ];

    return (
        <section
            id="skills"
            className="section-padding bg-[var(--bg-primary)] relative overflow-hidden"
        >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle, var(--color-primary-500) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                    }}
                />
            </div>

            <div className="container-custom relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="text-primary-400">Tech </span>
                        <span className="text-[var(--text-primary)]">Stack</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary-400 to-primary-500 mx-auto rounded-full" />
                </motion.div>

                {/* Skills Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto px-4 sm:px-6">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.15 }}
                            className="relative group"
                        >
                            {/* Gradient border effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 via-primary-500/20 to-secondary-400/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Card */}
                            <div className="relative bg-[var(--bg-tertiary)] rounded-2xl p-4 sm:p-6 md:p-8 border border-[var(--border-color)] hover:border-primary-400/70 transition-all duration-300 shadow-xl hover:shadow-glow-lg h-full">
                                {/* Category Header with gradient accent */}
                                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 pb-3 sm:pb-4 md:pb-6 border-b border-[var(--border-color)] group-hover:border-primary-400/30 transition-colors">
                                    <div className="text-3xl sm:text-4xl md:text-5xl p-1.5 sm:p-2 md:p-3 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[var(--text-primary)] group-hover:text-primary-400 transition-colors">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* Skills List */}
                                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                                    {category.skills.map((skill, skillIndex) => (
                                        <motion.span
                                            key={skillIndex}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: categoryIndex * 0.15 + skillIndex * 0.03 }}
                                            whileHover={{
                                                scale: 1.08,
                                                y: -3,
                                                boxShadow: "0 0 20px rgba(100, 255, 218, 0.4)"
                                            }}
                                            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-primary)] text-[var(--text-secondary)] text-xs sm:text-sm font-medium rounded-lg border border-[var(--border-color)] hover:border-primary-400 hover:text-primary-400 hover:bg-[var(--bg-secondary)] transition-all cursor-default shadow-md"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
