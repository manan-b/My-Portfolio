import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToElement } from '@/lib/utils';
import resumePDF from '@/assets/Manan_Batra_Resume.pdf';
import ThemeToggle from '@/components/common/ThemeToggle';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const navItems = [
        { label: 'Home', id: 'hero' },
        { label: 'About', id: 'about' },
        { label: 'Education', id: 'education' },
        { label: 'Skills', id: 'skills' },
        { label: 'Experience', id: 'experience' },
        { label: 'Projects', id: 'projects' },
        { label: 'Contact', id: 'contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            const sections = navItems.map((item) => item.id);
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (id) => {
        scrollToElement(id);
        setIsMobileMenuOpen(false);
    };

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-color)] shadow-[var(--shadow-sm)]'
                : 'bg-transparent'
                }`}
        >
            {/* Scan line at top */}
            <div
                className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, var(--color-primary-400), transparent)' }}
            />

            <nav className="container-custom">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="cursor-pointer flex items-center gap-1 group"
                        onClick={() => handleNavClick('hero')}
                    >
                        <div className="flex items-center px-2 py-1 rounded-md transition-all duration-300 group-hover:bg-primary-400/5">
                            <span className="font-orbitron text-xl sm:text-2xl font-black tracking-widest relative">
                                <span className="text-primary-400 transition-all duration-300">
                                    &lt;
                                </span>
                                <span className="text-[var(--text-primary)] group-hover:text-white transition-all duration-300 mx-[1px]">
                                    MB
                                </span>
                                <span className="text-primary-400 transition-all duration-300">
                                    /&gt;
                                </span>
                            </span>
                        </div>
                    </motion.div>

                    {/* Desktop Navigation & Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Nav Links */}
                        <div className="flex items-center gap-5">
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, y: -16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 * index }}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`relative text-xs font-semibold tracking-widest uppercase font-orbitron transition-all duration-200 px-1 py-0.5 group ${activeSection === item.id
                                        ? 'text-primary-400'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                        }`}
                                >
                                    {/* Bracket hover effect */}
                                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs">[</span>
                                    {item.label}
                                    <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs">]</span>

                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute -bottom-1 left-0 right-0 h-px"
                                            style={{ background: 'linear-gradient(90deg, transparent, var(--color-primary-400), transparent)', boxShadow: '0 0 8px var(--glow-cyan)' }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Actions (Resume & Theme Toggle) */}
                        <div className="flex items-center gap-4 border-l border-[var(--border-color)] pl-5">

                            {/* Resume Button */}
                            {activeSection !== 'hero' && activeSection !== '' && (
                                <motion.a
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    href={resumePDF}
                                    download="Manan_Batra_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative flex items-center gap-2 px-4 py-1.5 text-xs font-semibold font-orbitron tracking-widest uppercase text-primary-400 border border-[var(--border-color)] rounded hover:border-primary-400 hover:shadow-[var(--shadow-glow-sm)] transition-all overflow-hidden group"
                                >
                                    <span className="absolute inset-0 bg-primary-400/5 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
                                    <span className="relative">Resume</span>
                                    <svg className="w-3.5 h-3.5 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </motion.a>
                            )}
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-primary-400 hover:text-primary-300 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-16 right-4 w-52 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] shadow-[var(--shadow-lg)] overflow-hidden md:hidden"
                        >
                            {/* Top glow strip */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-50" />
                            <div className="py-2">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavClick(item.id)}
                                        className={`block w-full text-left px-4 py-2.5 text-xs font-orbitron tracking-widest uppercase transition-colors ${activeSection === item.id
                                            ? 'bg-primary-400/10 text-primary-400'
                                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-primary-400'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                                <div className="h-px mx-4 my-1 bg-[var(--border-color)]" />
                                <a
                                    href={resumePDF}
                                    download="Manan_Batra_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-left px-4 py-2.5 text-xs font-orbitron tracking-widest uppercase text-primary-400 hover:bg-primary-400/10 transition-colors"
                                >
                                    Resume ↓
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav >
        </motion.header >
    );
}
