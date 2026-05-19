import { motion } from 'framer-motion';
import profileImage from '@/assets/manan batra.jpeg';

export default function About() {

    return (
        <section id="about" className="section-padding bg-[var(--bg-primary)] relative overflow-hidden">

            {/* Dot grid background */}
            <div className="absolute inset-0 bg-dots opacity-60 pointer-events-none" />

            {/* Glow orbs */}
            <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full pointer-events-none opacity-5"
                style={{ background: 'radial-gradient(circle, var(--color-primary-400), transparent 70%)' }} />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full pointer-events-none opacity-[0.04]"
                style={{ background: 'radial-gradient(circle, var(--color-secondary-400), transparent 70%)' }} />

            <div className="container-custom relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14 sm:mb-16"
                >
                    <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-primary-400">About</span>
                        <span className="text-[var(--text-primary)]"> Me</span>
                    </h2>
                    <div className="glow-divider w-24 mx-auto" />
                </motion.div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">

                    {/* Left: Profile image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-5 flex flex-col items-center lg:items-start h-full"
                    >
                        {/* Elegant sleek image container */}
                        <div className="relative w-full max-w-[320px] mx-auto lg:mx-0 group">
                            {/* Subtle backdrop glow */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-primary-400/20 to-secondary-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

                            <div className="relative rounded-2xl overflow-hidden border border-primary-400/20 bg-[var(--bg-secondary)]/50 backdrop-blur-md">
                                <img
                                    src={profileImage}
                                    alt="Manan Batra"
                                    className="w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02] filter grayscale-[20%] group-hover:grayscale-0"
                                    style={{ aspectRatio: '4/5', maxHeight: '480px' }}
                                />
                                {/* Bottom gradient fade */}
                                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
                            </div>

                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="lg:col-span-7 flex flex-col gap-8"
                    >
                        {/* Name & Role */}
                        <div>
                            <h3 className="font-orbitron text-3xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-1 tracking-wide">
                                Manan Batra
                            </h3>
                            <p className="text-primary-400 font-mono-ui text-sm sm:text-base tracking-widest uppercase mb-4">
                                Data Engineer &amp; Frontend Web Developer
                            </p>
                        </div>

                        {/* Bio Content - Sleek layout */}
                        <div className="relative pl-6 sm:pl-8 border-l border-primary-400/20">
                            {/* Decorative node */}
                            <div className="absolute top-0 -left-[3px] w-[5px] h-[5px] rounded-full bg-primary-400" />

                            <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed font-light mb-6">
                                Data Engineer with hands-on experience in building scalable data pipelines using{' '}
                                <span className="text-[var(--text-primary)] font-medium">Apache Spark, PySpark,</span> and{' '}
                                <span className="text-[var(--text-primary)] font-medium">Databricks</span>.
                            </p>
                            <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed font-light mb-6">
                                Skilled in designing ETL/ELT workflows, data warehousing solutions, and modern architectures such as{' '}
                                <span className="text-[var(--text-primary)] font-medium">Medallion Architecture</span> and{' '}
                                <span className="text-[var(--text-primary)] font-medium">Delta Lake</span>. Experienced with cloud-based data platforms and workflow orchestration using{' '}
                                <span className="text-[var(--text-primary)] font-medium">Apache Airflow</span>.
                            </p>
                            <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed font-light">
                                Additionally experienced in building intuitive interfaces using{' '}
                                <span className="text-[var(--text-primary)] font-medium">React.js, HTML5, CSS3,</span> and Tailwind CSS.
                            </p>
                        </div>

                        {/* Tagline */}
                        <div className="mt-2 flex items-start gap-4 p-6 rounded-xl bg-gradient-to-r from-primary-400/5 to-transparent border border-primary-400/10">
                            <span className="font-mono-ui text-primary-400/40 mt-1 flex-shrink-0 text-2xl">"</span>
                            <p className="font-mono-ui text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed tracking-wide">
                                Turning raw data into refined insights — engineering pipelines that power decisions at scale.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
