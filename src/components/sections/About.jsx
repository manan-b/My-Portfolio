import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motionPresets';
import resumeData from '@/data/resume.json';
import profileImage from '@/assets/manan batra.jpeg';

/**
 * About Section - Redesigned to match reference with photo left, content right
 */
export default function About() {
    const features = [
        {
            title: 'Frontend',
            description: 'React JS, JavaScript, CSS, HTML, Bootstrap, Tailwind',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            color: 'text-primary-400'
        },
        {
            title: 'Backend',
            description: 'Node JS, MongoDB, REST APIs, Express JS',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
            ),
            color: 'text-secondary-400'
        },
        {
            title: 'Database',
            description: 'MySQL, MongoDB, PostgreSQL',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
            ),
            color: 'text-primary-400'
        },
        {
            title: 'Lifestyle',
            description: 'Coffee, Coding, Learning',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            color: 'text-secondary-400'
        }
    ];

    return (
        <section id="about" className="section-padding bg-[var(--bg-primary)] relative overflow-hidden">

            <div className="container-custom relative z-10">
                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16 items-start max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Left Side - Profile Image (2 columns) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center lg:justify-start lg:pt-0 lg:col-span-2"
                    >
                        <div className="relative w-full max-w-[240px] sm:max-w-xs h-[240px] sm:h-[320px] lg:h-[450px] overflow-hidden">
                            <img
                                src={profileImage}
                                alt="Manan Batra"
                                className="w-full h-full object-cover object-top rounded-2xl shadow-2xl"
                            />
                        </div>
                    </motion.div>

                    {/* Right Side - Content (3 columns) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col lg:col-span-3"
                    >
                        {/* Heading with decorative icon */}
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-5 sm:mb-6">
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-[var(--text-primary)]">
                                About Me
                            </h2>
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>

                        {/* Description */}
                        <p className="text-[var(--text-primary)] text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-3 md:mb-4 leading-relaxed text-center lg:text-left">
                            I'm a <span className="text-primary-400 font-semibold">Software Developer</span> passionate about building secure, scalable solutions. My work spans full-stack development, cloud computing, and cybersecurity — transforming complex challenges into impactful, real-world software experiences.
                        </p>

                        {/* Quote */}
                        <p className="text-[var(--text-secondary)] italic text-[10px] sm:text-xs md:text-sm lg:text-base mb-4 sm:mb-6 md:mb-8 border-l-2 sm:border-l-4 border-primary-400 pl-3 sm:pl-4 text-center lg:text-left">
                            "Building scalable apps, engineering backends, deploying services, and drinking coffee."
                        </p>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    className="bg-[var(--bg-secondary)] rounded-xl p-3 sm:p-4 md:p-5 border border-[var(--border-color)] hover:border-primary-400/50 transition-all group"
                                >
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <div className={`${feature.color} group-hover:scale-110 transition-transform`}>
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-[var(--text-primary)] font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">
                                                {feature.title}
                                            </h3>
                                            <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
