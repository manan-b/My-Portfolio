import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdf from 'pdf-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = path.join(__dirname, '..', 'My Resume.pdf');
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
 * Parse skills from section text
 */
function parseSkills(text) {
    if (!text) return [];

    // Split by common delimiters
    const skills = text
        .split(/[,•\n|]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && s.length < 50)
        .filter((s) => !s.match(/^(Skills?|Technical|Languages?):?$/i));

    return [...new Set(skills)]; // Remove duplicates
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

        // Check if it's a date pattern (YYYY - YYYY or Month YYYY - Present, etc.)
        const datePattern = /\d{4}|Present|Current|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/i;
        const hasDash = trimmed.includes('-') || trimmed.includes('–') || trimmed.includes('—');

        if (datePattern.test(trimmed) && hasDash) {
            // Save previous entry
            if (current) {
                current.description = description.join(' ');
                current.highlights = description.filter((d) => d.startsWith('•') || d.startsWith('-'));
                experiences.push(current);
            }

            // Start new entry
            current = {
                title: '',
                company: '',
                period: trimmed,
                description: '',
                highlights: [],
            };
            description = [];
        } else if (current && !current.title) {
            current.title = trimmed;
        } else if (current && !current.company && current.title && trimmed !== current.title) {
            current.company = trimmed;
        } else if (current && trimmed) {
            description.push(trimmed);
        }
    }

    // Save last entry
    if (current) {
        current.description = description.join(' ');
        current.highlights = description.filter((d) => d.startsWith('•') || d.startsWith('-'));
        experiences.push(current);
    }

    return experiences;
}

/**
 * Parse education entries
 */
function parseEducation(text) {
    if (!text) return [];

    const education = [];
    const lines = text.split('\n').filter((l) => l.trim());

    let current = null;

    for (const line of lines) {
        const trimmed = line.trim();
        const datePattern = /\d{4}|Present|Expected/i;

        if (datePattern.test(trimmed) && (trimmed.includes('-') || trimmed.includes('–'))) {
            if (current) {
                education.push(current);
            }
            current = {
                degree: '',
                institution: '',
                period: trimmed,
            };
        } else if (current && !current.degree) {
            current.degree = trimmed;
        } else if (current && !current.institution && trimmed !== current.degree) {
            current.institution = trimmed;
        }
    }

    if (current) {
        education.push(current);
    }

    return education;
}

/**
 * Parse projects
 */
function parseProjects(text) {
    if (!text) return [];

    const projects = [];
    const sections = text.split(/\n(?=[A-Z])/);

    for (const section of sections) {
        const lines = section.split('\n').filter((l) => l.trim());
        if (lines.length === 0) continue;

        const project = {
            name: lines[0].trim(),
            description: '',
            technologies: [],
            link: '',
        };

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line.includes('http://') || line.includes('https://')) {
                project.link = line;
            } else if (line.toLowerCase().includes('tech') || line.toLowerCase().includes('stack')) {
                project.technologies = line
                    .replace(/.*?:/i, '')
                    .split(/[,|]/)
                    .map((t) => t.trim())
                    .filter((t) => t);
            } else {
                project.description += line + ' ';
            }
        }

        project.description = project.description.trim();

        if (project.name) {
            projects.push(project);
        }
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

        // Extract sections (try common variations)
        const summaryText = extractSection(
            text,
            '(Summary|Profile|About|Objective)',
            '(Skills|Experience|Education)'
        );

        const skillsText = extractSection(
            text,
            '(Skills|Technical Skills|Competencies)',
            '(Experience|Education|Projects)'
        );

        const experienceText = extractSection(
            text,
            '(Experience|Work Experience|Employment)',
            '(Education|Projects|Skills)'
        );

        const educationText = extractSection(
            text,
            'Education',
            '(Experience|Projects|Skills|Certifications)'
        );

        const projectsText = extractSection(
            text,
            'Projects',
            '(Education|Experience|Certifications|Skills)'
        );

        const certificationsText = extractSection(
            text,
            '(Certifications|Certificates|Achievements)',
            '$'
        );

        // Parse extracted sections
        const resumeData = {
            name,
            title,
            contact: {
                email,
                phone,
                location,
                linkedin,
                github,
            },
            summary: summaryText || 'Professional summary will appear here.',
            skills: parseSkills(skillsText),
            experience: parseExperience(experienceText),
            education: parseEducation(educationText),
            projects: parseProjects(projectsText),
            certifications: parseCertifications(certificationsText),
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
        console.log('- Email:', resumeData.contact.email);
        console.log('- Skills:', resumeData.skills.length);
        console.log('- Experience entries:', resumeData.experience.length);
        console.log('- Education entries:', resumeData.education.length);
        console.log('- Projects:', resumeData.projects.length);
        console.log('- Certifications:', resumeData.certifications.length);

        return resumeData;
    } catch (error) {
        console.error('❌ Error parsing resume:', error.message);
        process.exit(1);
    }
}

// Run the parser
parseResume();
