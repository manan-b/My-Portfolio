import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Education from './components/sections/Education';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import BackToTop from './components/common/BackToTop';
import './styles/index.css';

function App() {
    useEffect(() => {
        const handleContextMenu = (e) => {
            // Allow right-click on links (icons) and SVG elements (icon graphics)
            const isIcon = e.target.closest('a') || e.target.tagName === 'svg' || e.target.closest('svg');

            if (!isIcon) {
                e.preventDefault();
            }
        };

        const handleDragStart = (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('dragstart', handleDragStart);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('dragstart', handleDragStart);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Header />
            <main>
                <Hero />
                <About />
                <Education />
                <Skills />
                <Experience />
                <Projects />
                <Contact />
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
}

export default App;
