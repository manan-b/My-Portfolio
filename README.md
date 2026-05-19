# Personal Portfolio Website

A modern, production-quality personal portfolio website built with Vite, React, TailwindCSS, and Framer Motion. Features PDF-driven content extraction for zero hardcoding.
Portfolio Live Link : https://manan-b.github.io/My-Portfolio/

## ✨ Features

- 🎨 **Modern Design**: Elegant, minimal UI with glassmorphism and gradient effects
- ⚡ **High Performance**: Code splitting, optimized builds, and lazy loading
- 🎬 **Rich Animations**: Framer Motion powered animations with scroll triggers
- ♿ **Accessible**: ARIA compliant, keyboard navigation, screen reader friendly
- 📱 **Responsive**: Mobile-first design that works on all devices
- 📄 **PDF-Driven**: Automatic content extraction from resume PDF
- 🎯 **SEO Ready**: Semantic HTML, meta tags, and optimized structure

## 🚀 Tech Stack

- **Framework**: React 18 (JavaScript)
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS 3 with custom design tokens
- **Animations**: Framer Motion
- **PDF Parsing**: pdf-parse
- **Code Quality**: ESLint + Prettier

## 📦 Installation

```bash
# Install dependencies
npm install

# Parse resume PDF to JSON
npm run parse-resume

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer
│   ├── sections/        # Hero, About, Skills, Experience, Projects, etc.
│   ├── ui/              # Button, Card (reusable UI)
│   └── common/          # BackToTop
├── lib/                 # motionPresets, utils
├── styles/              # tokens.css, index.css
└── data/                # resume.json (generated)
```

## 🎨 Design System

### Color Palette
- **Primary**: Modern Blue/Purple
- **Secondary**: Vibrant Pink/Magenta
- **Accent**: Electric Cyan

### Typography
- **Display**: Outfit
- **Body**: Inter

### Animations
- Scroll-triggered fade-ins
- Staggered entrance animations
- Hover micro-interactions
- Parallax backgrounds
- Respects `prefers-reduced-motion`

## 📝 Customization

### Update Content

1. **Edit Resume PDF**: Update `My Resume.pdf` in the root directory
2. **Parse Resume**: Run `npm run parse-resume`
3. **Manual Edits**: Alternatively, edit `src/data/resume.json` directly

### Customize Colors

Edit `src/styles/tokens.css` to change:
- Color palette
- Spacing scale
- Typography
- Shadows and effects

### Add New Sections

1. Create component in `src/components/sections/`
2. Import and add to `src/App.jsx`
3. Add navigation link in `Header.jsx`


## 📊 Performance

- **Code Splitting**: React and animation vendors separated
- **Optimized Builds**: Vite's Rollup configuration
- **Fast Loading**: Minimal bundle size
- **Lighthouse Ready**: Target 90+ scores

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Color contrast compliance
- Reduced motion support

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run parse-resume # Parse PDF to JSON
npm run lint         # Run ESLint
```

## 📄 License

MIT License - feel free to use this for your personal portfolio!

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

---

**Built with ❤️ using Vite, React, and TailwindCSS**
