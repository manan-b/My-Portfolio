import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdf from 'pdf-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = path.join(__dirname, '..', 'Manan\'s Resume.pdf');
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'resume.json');

/**
 * Extract email from text
 */
function extractEmail(text) {
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
    const matches = text.match(emailRegex);
    return matches ? matches[0] : '';
}

/**
 * Extract phone number from text
 */
function extractPhone(text) {
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const matches = text.match(phoneRegex);
    return matches ? matches[0] : '';
}

/**
 * Extract LinkedIn URL
 */
function extractLinkedIn(text) {
    const linkedInRegex = /(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+/gi;
    const matches = text.match(linkedInRegex);
    return matches ? matches[0] : '';
}

/**
 * Extract GitHub URL
 */
function extractGitHub(text) {
    const githubRegex = /(https?:\/\/)?(www\.)?github\.com\/[\w-]+/gi;
    const matches = text.match(githubRegex);
    return matches ? matches[0] : '';
}

/**
 * Extract location (city, state/country pattern)
 */
function extractLocation(text) {
    const locationRegex = /([A-Z][a-z]+(?:\s[A-Z][a-z]+)*),\s*([A-Z]{2,}|[A-Z][a-z]+)/g;
    const matches = text.match(locationRegex);
    return matches ? matches[0] : '';
}

/**
 * Extract section content between headers
 */
function extractSection(text, sectionName, nextSection = null) {
    const sectionRegex = new RegExp(
        `${sectionName}[:\\s]*([\\s\\S]*?)${nextSection ? `(?=${nextSection})` : '$'}`,
        'i'
    );
    const match = text.match(sectionRegex);
    return match ? match[1].trim() : '';
}

/**
 * Parse skills from section text and categorize them
 */
function parseSkills(text) {
    if (!text) return { frontend: [], backend_data: [], tools: [] };

    // Split by common delimiters
    const skills = text
        .split('\n')
        .flatMap(line => {
            const cleanLine = line.includes(':') ? line.substring(line.indexOf(':') + 1) : line;
            return cleanLine.split(/[,•|]/).map(s => s.trim());
        })
        .filter((s) => s.length > 0 && s.length < 50)
        .filter((s) => !s.match(/^(Skills?|Technical|Languages?|Frameworks?|Tools?|Backend?|Frontend?|Data Engineering|Cloud):?$/i));

    const uniqueSkills = [...new Set(skills)]; // Remove duplicates

    const categories = {
        frontend: [],
        backend_data: [],
        tools: []
    };

    const knownFrontend = ['HTML', 'HTML5', 'CSS', 'CSS3', 'JavaScript', 'React', 'React.js', 'Tailwind', 'Tailwind CSS', 'Material UI', 'Framer Motion', 'GSAP', 'Three.js', 'Lucide React'];
    const knownBackendData = ['Node.js', 'Node', 'Express', 'Express.js', 'MongoDB', 'REST APIs', 'SQL', 'C++', 'Python', 'Apache Spark', 'PySpark', 'Databricks', 'Delta Lake', 'ETL Pipelines', 'Data Warehousing', 'Medallion Architecture', 'AWS', 'BigQuery', 'Redshift', 'Hadoop'];
    const knownTools = ['Git', 'GitHub', 'Postman', 'VS Code', 'MySQL', 'Vercel', 'Netlify'];

    uniqueSkills.forEach(skill => {
        let placed = false;
        const skillLower = skill.toLowerCase();

        // Exact match or contains for precision
        const isMatch = (keyword) => {
            const kw = keyword.toLowerCase();
            return skillLower === kw || skillLower.includes(kw);
        };

        if (knownFrontend.some(isMatch)) {
            categories.frontend.push(skill);
            placed = true;
        } else if (knownBackendData.some(isMatch)) {
            categories.backend_data.push(skill);
            placed = true;
        } else if (knownTools.some(isMatch)) {
            categories.tools.push(skill);
            placed = true;
        }

        if (!placed) {
            // Default to tools if unknown
            categories.tools.push(skill);
        }
    });

    return categories;
}

/**
 * Parse experience entries
 */
function parseExperience(text) {
    if (!text) return [];

    const experiences = [];
    const lines = text.split('\n').filter((l) => l.trim());

    let current = null;
    let description = [];

    for (const line of lines) {
        const trimmed = line.trim();

        // New experience block starts if it has a pipe | and dates
        if (trimmed.includes('|')) {
            if (current) {
                current.description = description.join(' ');
                current.highlights = description.filter((d) => d.length > 5 && !d.startsWith('•'));
                experiences.push(current);
            }

            // Format: Company| TitleDate (e.g., EOXS| Software Developer InternJan 2025 – July 2025)
            const parts = trimmed.split('|');
            const company = parts[0].trim();
            const rest = parts[1] ? parts[1].trim() : '';

            // Extract date from the end of title
            const dateMatch = rest.match(/((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}.*)$/i);
            let period = '';
            let title = rest;
            if (dateMatch) {
                period = dateMatch[1];
                title = rest.replace(period, '').trim();
            }

            current = { title, company, period, description: '', highlights: [] };
            description = [];
        } else if (current && trimmed !== '•') {
            description.push(trimmed);
        }
    }

    if (current) {
        current.description = description.join(' ');
        current.highlights = description.filter((d) => d.length > 5 && !d.startsWith('•'));
        experiences.push(current);
    }

    return experiences;
}

/* Parse education entries */
function parseEducation(text) {
    if (!text) return [];

    const education = [];
    const lines = text.split('\n').filter((l) => l.trim());

    for (let i = 0; i < lines.length; i += 2) {
        const line1 = lines[i];
        const line2 = lines[i + 1];
        if (!line1 || !line2) break;

        // "Chandigarh UniversitySept 2021 - June 2025"
        let institution = line1;
        let period = '';
        const dateMatch = line1.match(/((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}.*)$/i);
        if (dateMatch) {
            period = dateMatch[1];
            institution = line1.replace(period, '').trim();
        }

        // "B.E. Computer Science76.10%"
        let degree = line2;
        let score = '';
        const scoreMatch = line2.match(/(\d+\.\d+%|\d+\.\d+\s*(?:CGPA)?)$/i);
        if (scoreMatch) {
            score = scoreMatch[1];
            degree = line2.replace(score, '').trim();
        }

        education.push({ institution, degree, period, score: score ? `Score: ${score}` : '' });
    }

    return education;
}

/**
 * Parse projects
 */
function parseProjects(text) {
    if (!text) return [];

    const projects = [];
    const lines = text.split('\n').filter((l) => l.trim());

    let current = null;
    let description = [];

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed.includes('|')) {
            if (current) {
                current.description = description.join(' ');
                current.bullets = description.filter(d => d.length > 10).map(d => d.startsWith('•') ? d.substring(1).trim() : d);
                projects.push(current);
            }

            // Format: ViewTube - YouTube Clone| HTML5, CSS3...May 2024
            const parts = trimmed.split('|');
            const name = parts[0].trim();
            const rest = parts[1] || '';

            const dateMatch = rest.match(/((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}.*)$/i);
            let period = '';
            let techs = rest;
            if (dateMatch) {
                period = dateMatch[1];
                techs = rest.replace(period, '').trim();
            }

            const technologies = techs.split(/[,•\n|]/).map(t => t.trim()).filter(t => t);
            current = { name, description: '', bullets: [], technologies, period };
            description = [];
        } else if (current && trimmed !== '•') {
            description.push(trimmed);
        }
    }

    if (current) {
        current.description = description.join(' ');
        current.bullets = description.filter(d => d.length > 10).map(d => d.startsWith('•') ? d.substring(1).trim() : d);
        projects.push(current);
    }

    return projects;
}

/**
 * Parse certifications
 */
function parseCertifications(text) {
    if (!text) return [];

    return text
        .split('\n')
        .filter((l) => l.trim())
        .map((line) => {
            const trimmed = line.replace(/^[•\-–]\s*/, '').trim();
            const parts = trimmed.split(/[-–]/);

            return {
                name: parts[0].trim(),
                issuer: parts[1] ? parts[1].trim() : '',
                date: parts[2] ? parts[2].trim() : '',
            };
        })
        .filter((c) => c.name);
}

/**
 * Main parsing function
 */
async function parseResume() {
    try {
        console.log('Reading PDF from:', PDF_PATH);

        // Check if file exists
        if (!fs.existsSync(PDF_PATH)) {
            throw new Error(`PDF file not found at: ${PDF_PATH}`);
        }

        // Read PDF
        const dataBuffer = fs.readFileSync(PDF_PATH);
        const pdfData = await pdf(dataBuffer);
        const text = pdfData.text;

        console.log('PDF extracted successfully');
        console.log('Total pages:', pdfData.numpages);

        // Extract name and title from first lines
        const firstLines = text.split('\n').filter((l) => l.trim());
        const name = firstLines[0] || 'Your Name';
        const title = firstLines[1] || 'Your Title';

        // Extract contact information
        const email = extractEmail(text);
        const phone = extractPhone(text);
        const linkedin = extractLinkedIn(text);
        const github = extractGitHub(text);
        const location = extractLocation(text);

        // Split text into arrays of lines
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);

        // Find headers
        const headers = {
            Education: lines.findIndex(l => l === 'Education'),
            Summary: lines.findIndex(l => l === 'Professional Summary' || l === 'Summary'),
            Skills: lines.findIndex(l => l === 'Skills'),
            Projects: lines.findIndex(l => l === 'Projects'),
            Experience: lines.findIndex(l => l === 'Experience'),
            Certifications: lines.findIndex(l => l === 'Certifications')
        };

        // Sort headers by line index
        const sortedHeaders = Object.entries(headers)
            .filter(([_, index]) => index !== -1)
            .sort((a, b) => a[1] - b[1]);

        const sections = {};
        for (let i = 0; i < sortedHeaders.length; i++) {
            const [name, startIndex] = sortedHeaders[i];
            const endIndex = i + 1 < sortedHeaders.length ? sortedHeaders[i + 1][1] : lines.length;
            sections[name] = lines.slice(startIndex + 1, endIndex).join('\n');
        }

        const summaryText = sections['Summary'] || '';
        const skillsText = sections['Skills'] || '';
        const experienceText = sections['Experience'] || '';
        const educationText = sections['Education'] || '';
        const projectsText = sections['Projects'] || '';
        const certificationsText = sections['Certifications'] || '';

        // Read existing resume data to preserve projects, experience, education, etc.
        let existingResumeData = {};
        if (fs.existsSync(OUTPUT_PATH)) {
            const fileContent = fs.readFileSync(OUTPUT_PATH, 'utf-8');
            existingResumeData = JSON.parse(fileContent);
        }

        // Merge past skills with new extracted categories
        const oldSkills = existingResumeData.skills || {};
        const oldFrontend = [...(oldSkills.languages || []), ...(oldSkills.frameworks || [])].filter(s => ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS', 'Material UI', 'Framer Motion', 'GSAP', 'Three.js', 'Lucide React'].includes(s));
        const oldBackendData = [...(oldSkills.languages || []), ...(oldSkills.backend || [])].filter(s => ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'SQL', 'C++'].includes(s));
        const oldTools = oldSkills.tools || [];
        
        const newSkillsData = parseSkills(skillsText);
        
        const combinedSkills = {
            frontend: [...new Set([...oldFrontend, ...newSkillsData.frontend])],
            backend_data: [...new Set([...oldBackendData, ...newSkillsData.backend_data])],
            tools: [...new Set([...oldTools, ...newSkillsData.tools])]
        };

        // Parse extracted sections
        const resumeData = {
            ...existingResumeData, // Keep existing fields like projects, experience, etc.
            name: name || existingResumeData.name,
            title: title || existingResumeData.title,
            contact: {
                ...existingResumeData.contact,
                email: email || existingResumeData.contact?.email,
                phone: phone || existingResumeData.contact?.phone,
                location: location || existingResumeData.contact?.location,
                linkedin: linkedin || existingResumeData.contact?.linkedin,
                github: github || existingResumeData.contact?.github,
            },
            summary: summaryText || existingResumeData.summary || 'Professional summary will appear here.',
            skills: combinedSkills,
            // We consciously intentionally skip overwriting experience, education, projects, certifications
            // with parseExperience(text)/parseEducation(text) etc because the existing JSON is better formatted
        };

        // Ensure data directory exists
        const dataDir = path.dirname(OUTPUT_PATH);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Write to JSON file
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(resumeData, null, 2));

        console.log('\n✅ Resume parsed successfully!');
        console.log('📄 Output saved to:', OUTPUT_PATH);
        console.log('\nExtracted data summary:');
        console.log('- Name:', resumeData.name);
        console.log('- Title:', resumeData.title);
        console.log('- Skills updated:', resumeData.skills ? Object.keys(resumeData.skills).length : 0);
        console.log('- Projects kept:', (resumeData.projects || []).length);
        console.log('- Experience kept:', (resumeData.experience || []).length);

        return resumeData;
    } catch (error) {
        console.error('❌ Error parsing resume:', error.message);
        process.exit(1);
    }
}

// Run the parser
parseResume();
