import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import resumeData from '@/data/resume.json';

/**
 * Contact Section - redesigned with checkbox CAPTCHA
 */
export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRobotChecked, setIsRobotChecked] = useState(false);
    const [emailError, setEmailError] = useState('');

    // List of common disposable email domains
    const disposableEmailDomains = [
        'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com',
        '10minutemail.com', 'temp-mail.org', 'getnada.com', 'trashmail.com',
        'fakeinbox.com', 'yopmail.com', 'maildrop.cc', 'sharklasers.com',
        'guerrillamail.info', 'guerrillamail.biz', 'guerrillamail.de', 'spam4.me',
        'grr.la', 'guerrillamail.org', 'guerrillamailblock.com', 'pokemail.net',
        'spamgourmet.com', 'incognitomail.com', 'anonymousemail.me', 'mytemp.email',
        'tempinbox.com', 'mohmal.com', 'emailondeck.com', 'discard.email',
        'burnermail.io', 'throwawaymail.com', 'temp-mail.io', 'mailnesia.com',
        'mintemail.com', 'mailcatch.com', 'emailfake.com', 'fakemail.net'
    ];

    // Comprehensive email validation function
    const validateEmail = (email) => {
        // Basic format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { valid: false, message: 'Please enter a valid email address' };
        }

        // More strict format validation
        const strictEmailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!strictEmailRegex.test(email)) {
            return { valid: false, message: 'Email format is invalid' };
        }

        // Check for consecutive dots
        if (email.includes('..')) {
            return { valid: false, message: 'Email cannot contain consecutive dots' };
        }

        // Extract domain
        const domain = email.split('@')[1]?.toLowerCase();
        if (!domain) {
            return { valid: false, message: 'Email domain is invalid' };
        }

        // Check for disposable email domains
        if (disposableEmailDomains.includes(domain)) {
            return { valid: false, message: 'Temporary/disposable email addresses are not allowed' };
        }

        // Check domain has valid TLD
        const domainParts = domain.split('.');
        if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
            return { valid: false, message: 'Email domain is invalid' };
        }

        return { valid: true, message: '' };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear email error when user starts typing
        if (name === 'email') {
            setEmailError('');
        }
    };

    // Email blur validation
    const handleEmailBlur = () => {
        if (formData.email) {
            const validation = validateEmail(formData.email);
            if (!validation.valid) {
                setEmailError(validation.message);
            }
        }
    };

    // Auto-hide success message after 3 seconds
    useEffect(() => {
        if (status === 'success') {
            const timer = setTimeout(() => {
                setStatus('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate CAPTCHA checkbox
        if (!isRobotChecked) {
            alert('Please confirm you are not a robot');
            return;
        }

        // Validate email before submission
        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.valid) {
            setEmailError(emailValidation.message);
            return;
        }

        setIsSubmitting(true);
        setStatus('');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    access_key: '55e887c0-68cd-4371-a49e-cf52cc824bac',
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    to: resumeData.contact.email,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setIsRobotChecked(false);
                setEmailError('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        };
    };

    return (
        <section
            id="contact"
            className="section-padding bg-[var(--bg-primary)] relative overflow-hidden"
        >
            <div className="container-custom relative z-10">
                {/* Section Title - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">
                        Get In Touch
                    </h2>
                    <div className="w-20 h-1 bg-primary-400 mx-auto" />
                </motion.div>

                {/* Split Layout - Reference Design */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto items-center">
                    {/* Left Side - "Let's Connect" */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center"
                    >
                        {/* Let's Connect Heading */}
                        <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
                            Let's Connect
                        </h3>

                        {/* Description */}
                        <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-8">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </p>

                        {/* Contact Details */}
                        <div className="space-y-5">
                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[var(--text-secondary)] text-sm mb-1">Email</p>
                                    <a
                                        href={`mailto:${resumeData.contact.email}`}
                                        className="text-[var(--text-primary)] font-medium hover:text-primary-400 transition-colors"
                                    >
                                        {resumeData.contact.email}
                                    </a>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[var(--text-secondary)] text-sm mb-1">Location</p>
                                    <p className="text-[var(--text-primary)] font-medium">
                                        Sonipat, Haryana
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 mt-10">
                            <a
                                href={resumeData.contact.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:text-primary-400 hover:border-primary-400 transition-all"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href={resumeData.contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:text-primary-400 hover:border-primary-400 transition-all"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a
                                href="https://x.com/MananBatra_"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:text-primary-400 hover:border-primary-400 transition-all"
                                aria-label="X (Twitter)"
                            >
                                {/* X (Twitter) Icon */}
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Side - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="bg-[var(--bg-secondary)] rounded-2xl p-5 border border-[var(--border-color)] shadow-xl max-w-md mx-auto lg:mx-0"
                        >
                            {/* Name Input */}
                            <div className="mb-4">
                                <label className="block text-[var(--text-secondary)] text-sm mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your name..."
                                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg border border-[var(--border-color)] focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400 transition-all placeholder:text-[var(--text-secondary)]/50"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="mb-4">
                                <label className="block text-[var(--text-secondary)] text-sm mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleEmailBlur}
                                    required
                                    placeholder="Enter your Email ID..."
                                    className={`w-full px-4 py-2.5 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg border transition-all placeholder:text-[var(--text-secondary)]/50 ${emailError
                                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                        : 'border-[var(--border-color)] focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400'
                                        }`}
                                />
                                {emailError && (
                                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {emailError}
                                    </p>
                                )}
                            </div>

                            {/* Message Textarea */}
                            <div className="mb-4">
                                <label className="block text-[var(--text-secondary)] text-sm mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="3"
                                    placeholder="Your Message"
                                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg border border-[var(--border-color)] focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400 transition-all resize-none placeholder:text-[var(--text-secondary)]/50"
                                />
                            </div>

                            {/* CAPTCHA Checkbox */}
                            <div className="mb-5">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={isRobotChecked}
                                            onChange={(e) => setIsRobotChecked(e.target.checked)}
                                            className="w-5 h-5 rounded border-2 border-[var(--border-color)] bg-[var(--bg-tertiary)] checked:bg-primary-400 checked:border-primary-400 focus:ring-2 focus:ring-primary-400/50 transition-all cursor-pointer appearance-none"
                                        />
                                        {isRobotChecked && (
                                            <svg className="w-5 h-5 text-white absolute top-0 left-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-[var(--text-secondary)] text-sm group-hover:text-[var(--text-primary)] transition-colors">
                                        I'm not a robot
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button with Arrow */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-primary-400 to-primary-500 hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                {!isSubmitting && (
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m22 2-7 20-4-9-9-4Z" />
                                        <path d="M22 2 11 13" />
                                    </svg>
                                )}
                            </motion.button>

                            {/* Status Messages */}
                            {status === 'success' && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 text-green-500 text-sm text-center font-medium"
                                >
                                    ✓ Message sent successfully!
                                </motion.p>
                            )}
                            {status === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 text-orange-400 text-sm text-center font-medium"
                                >
                                    ✗ Something went wrong. Please try again.
                                </motion.p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
