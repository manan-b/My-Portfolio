import { motion } from 'framer-motion';

const skillCategories = [
    {
        id: 'MOD_01',
        title: 'Data Engineering',
        icon: '⚙',
        accent: 'from-emerald-500/15 to-teal-500/5',
        borderHover: 'hover:border-emerald-400/60',
        glow: 'rgba(52,211,153,0.2)',
        labelColor: 'text-emerald-400',
        borderColor: 'rgba(52,211,153,0.15)',
        skills: ['ETL/ELT Pipelines', 'Data Warehousing', 'Data Lakehouse', 'BigQuery', 'Medallion Arch.', 'Batch & Stream'],
    },
    {
        id: 'MOD_02',
        title: 'Cloud & Big Data',
        icon: '☁',
        accent: 'from-sky-500/15 to-blue-500/5',
        borderHover: 'hover:border-sky-400/60',
        glow: 'rgba(56,189,248,0.2)',
        labelColor: 'text-sky-400',
        borderColor: 'rgba(56,189,248,0.15)',
        skills: ['Apache Spark', 'PySpark', 'Databricks', 'Delta Lake', 'AWS (S3/IAM/Glue)', 'AWS Kinesis'],
    },
    {
        id: 'MOD_03',
        title: 'Orchestration',
        icon: '⟳',
        accent: 'from-orange-500/15 to-amber-500/5',
        borderHover: 'hover:border-orange-400/60',
        glow: 'rgba(251,146,60,0.2)',
        labelColor: 'text-orange-400',
        borderColor: 'rgba(251,146,60,0.15)',
        skills: ['Apache Airflow', 'DAG Development', 'Workflow Scheduling', 'ETL Orchestration'],
    },
    {
        id: 'MOD_04',
        title: 'Languages',
        icon: '</>',
        accent: 'from-violet-500/15 to-purple-500/5',
        borderHover: 'hover:border-violet-400/60',
        glow: 'rgba(167,139,250,0.2)',
        labelColor: 'text-violet-400',
        borderColor: 'rgba(167,139,250,0.15)',
        skills: ['Python', 'SQL', 'JavaScript', 'C++'],
    },
    {
        id: 'MOD_05',
        title: 'Web Development',
        icon: '◈',
        accent: 'from-rose-500/15 to-pink-500/5',
        borderHover: 'hover:border-rose-400/60',
        glow: 'rgba(251,113,133,0.2)',
        labelColor: 'text-rose-400',
        borderColor: 'rgba(251,113,133,0.15)',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js'],
    },
];

function SkillCard({ category, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.09, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className={`group relative flex flex-col h-full rounded-xl border border-[var(--border-color)] ${category.borderHover} transition-all duration-350 overflow-hidden`}
            style={{ background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)' }}
        >
            {/* Glow on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-xl"
                style={{ boxShadow: `inset 0 0 40px ${category.glow}` }}
            />

            {/* Top accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${category.accent.replace('/15', '').replace('/5', '')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                style={{ background: `linear-gradient(90deg, ${category.glow}, transparent)` }} />

            {/* Left accent */}
            <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full opacity-60"
                style={{ background: `linear-gradient(to bottom, ${category.glow}, transparent)` }} />

            <div className="relative flex flex-col flex-1 p-5 sm:p-6">

                {/* Module ID */}
                <div className="font-mono-ui text-[10px] tracking-widest text-primary-400/40 uppercase mb-3">
                    {category.id}
                </div>

                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                    <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border ${category.labelColor} border-current/30 bg-current/5 font-mono-ui text-sm`}
                        style={{ background: category.glow.replace('0.2', '0.08') }}>
                        {category.icon}
                    </div>
                    <h3 className={`font-orbitron text-sm sm:text-base font-bold tracking-wide text-[var(--text-primary)] group-hover:${category.labelColor} transition-colors duration-300`}>
                        {category.title}
                    </h3>
                </div>

                {/* Divider */}
                <div className="h-px mb-5 opacity-30"
                    style={{ background: `linear-gradient(90deg, ${category.glow}, transparent)` }} />

                {/* Skills grid */}
                <div className="flex-1 grid grid-cols-2 gap-2 content-start">
                    {category.skills.map((skill, i) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.06 + i * 0.04, duration: 0.3 }}
                            whileHover={{ scale: 1.04 }}
                            className={`flex items-center justify-center text-center px-2 py-2.5 text-xs font-mono-ui font-medium text-[var(--text-secondary)] bg-[var(--bg-secondary)] rounded border border-[var(--border-color)] group-hover:border-current/30 cursor-default min-h-[40px] leading-tight transition-all duration-200 ${category.labelColor} hover:text-current`}
                            style={{ borderColor: 'rgba(0,212,255,0.08)' }}
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const topRow = skillCategories.slice(0, 3);
    const bottomRow = skillCategories.slice(3);

    return (
        <section id="skills" className="section-padding bg-[var(--bg-primary)] relative overflow-hidden">

            {/* Grid background */}
            <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 30%, var(--bg-primary) 85%)' }} />

            <div className="container-custom relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14 sm:mb-16"
                >
                    <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-primary-400">Tech</span>
                        <span className="text-[var(--text-primary)]"> Stack</span>
                    </h2>
                    <div className="glow-divider w-24 mx-auto" />
                </motion.div>

                {/* Top row — 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                    {topRow.map((cat, i) => <SkillCard key={cat.id} category={cat} index={i} />)}
                </div>

                {/* Bottom row — 2 centered cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
                    {bottomRow.map((cat, i) => <SkillCard key={cat.id} category={cat} index={i + 3} />)}
                </div>
            </div>
        </section>
    );
}
