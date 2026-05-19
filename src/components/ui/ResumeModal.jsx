import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for react-pdf to render the PDF properly in Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function ResumeModal({ isOpen, onClose, pdfUrl }) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-4xl max-h-full flex flex-col rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)] bg-[var(--bg-tertiary)]">
                            <h3 className="font-orbitron text-xl font-bold text-[var(--text-primary)]">
                                Resume Overview
                            </h3>
                            <div className="flex items-center gap-4">
                                <a
                                    href={pdfUrl}
                                    download="Manan_Batra_Resume.pdf"
                                    className="flex items-center gap-2 px-4 py-2 rounded text-sm font-mono-ui font-semibold text-primary-400 bg-primary-400/10 hover:bg-primary-400/20 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download
                                </a>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-[var(--bg-primary)] transition-colors text-[var(--text-secondary)] hover:text-red-400"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* PDF Container */}
                        <div className="flex-1 overflow-auto bg-[var(--bg-primary)] p-4 sm:p-8 flex justify-center custom-scrollbar">
                            <Document
                                file={pdfUrl}
                                loading={
                                    <div className="flex flex-col items-center justify-center py-20 text-primary-400">
                                        <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin mb-4" />
                                        <p className="font-mono-ui text-sm animate-pulse">Loading Document...</p>
                                    </div>
                                }
                                error={
                                    <div className="text-red-400 font-mono-ui text-center py-10">
                                        Failed to load PDF. Please try downloading it instead.
                                    </div>
                                }
                            >
                                <Page
                                    pageNumber={1}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="shadow-xl"
                                    width={typeof window !== 'undefined' ? Math.min(window.innerWidth - 64, 800) : 800}
                                />
                            </Document>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
