import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { scrollToElement } from '@/lib/utils';

/**
 * Header Component - Dark theme with cyan accents
 */
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
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
                ? 'bg-[var(--bg-secondary)]/90 backdrop-blur-lg shadow-lg border-b border-[var(--border-color)]'
                : 'bg-transparent'
                }`}
        >
            <nav className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-bold cursor-pointer"
                        onClick={() => handleNavClick('hero')}
                    >
                        <span className="text-primary-400">&lt;</span>
                        <span className="text-[var(--text-primary)]">MB</span>
                        <span className="text-primary-400">/&gt;</span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                onClick={() => handleNavClick(item.id)}
                                className={`relative text-sm font-medium transition-colors ${activeSection === item.id
                                    ? 'text-primary-400'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                {item.label}
                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-400"
                                    />
                                )}
                            </motion.button>
                        ))}

                        {/* Resume Button - Only visible when not on hero section */}
                        {activeSection !== 'hero' && activeSection !== '' && (
                            <motion.a
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                href="/resume.pdf"
                                download="Manan_Batra_Resume.pdf"
                                className="flex items-center gap-2 px-4 py-2 bg-primary-400/10 text-primary-400 text-sm font-medium rounded-lg border border-primary-400/30 hover:bg-primary-400/20 hover:border-primary-400 transition-all"
                            >
                                Resume
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </motion.a>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-[var(--text-primary)]"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden pb-4 bg-[var(--bg-secondary)]/95 backdrop-blur-lg rounded-b-xl"
                    >
                        <div className="pt-2 space-y-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${activeSection === item.id
                                        ? 'bg-primary-400/10 text-primary-400'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}

                            {/* Resume Button - Mobile - Only visible when not on hero section */}
                            {activeSection !== 'hero' && activeSection !== '' && (
                                <a
                                    href="/resume.pdf"
                                    download="Manan_Batra_Resume.pdf"
                                    className="flex items-center justify-center gap-2 mx-4 mt-2 px-4 py-3 bg-primary-400/10 text-primary-400 font-medium rounded-lg border border-primary-400/30 hover:bg-primary-400/20 transition-all"
                                >
                                    Resume
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </motion.div>
                )}
            </nav>
        </motion.header>
    );
}
