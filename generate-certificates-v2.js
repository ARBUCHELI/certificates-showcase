// Enhanced Certificate Generator
// Uses manual mappings from certificateData.js when available
const fs = require('fs');
const path = require('path');

// Read the manual certificate data
const certificateDataContent = fs.readFileSync('./src/data/certificateData.js', 'utf8');

// Extract manual certificate mappings by image filename
const manualMappings = new Map();

// Parse the certificateData.js file to extract manual entries
const imagePattern = /image:\s*["']([^"']+)["']/g;
const entries = certificateDataContent.match(/\{[^}]*image:[^}]*\}/gs) || [];

entries.forEach(entry => {
  try {
    const imageMatch = entry.match(/image:\s*["']([^"']+)["']/);
    const titleMatch = entry.match(/title:\s*["']([^"']+)["']/);
    const orgMatch = entry.match(/organization:\s*["']([^"']+)["']/);
    const tagsMatch = entry.match(/tags:\s*\[([^\]]+)\]/);
    const linkMatch = entry.match(/link:\s*["']([^"']+)["']/);
    const typeMatch = entry.match(/type:\s*["']([^"']+)["']/);
    
    if (imageMatch && imageMatch[1]) {
      const image = imageMatch[1];
      const mapping = {
        title: titleMatch ? titleMatch[1] : null,
        organization: orgMatch ? orgMatch[1] : null,
        tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/["']/g, '')) : [],
        link: linkMatch ? linkMatch[1] : null,
        type: typeMatch ? typeMatch[1] : null
      };
      manualMappings.set(image, mapping);
    }
  } catch (e) {
    // Skip malformed entries
  }
});

console.log(`Loaded ${manualMappings.size} manual certificate mappings`);

// Read certificates from images folder
const imagesDir = './public/images-certificates';
const filenames = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg'));

console.log(`Found ${filenames.length} certificate images`);

// Comprehensive title detection based on filename patterns
const detectTitle = (filename) => {
  const name = filename.toLowerCase().replace('.jpg', '').replace('.png', '');
  
  // HackerRank Certificates
  if (name === 'css-hackerrank') return 'CSS Skill Assessment';
  if (name === 'javascript-hackerrank') return 'JavaScript Skill Assessment';
  if (name === 'react-hackerrank') return 'React Skill Assessment';
  
  // IBM
  if (name === 'node-and-express-essentials' || name === 'node-and-express-essentials-ibm-certificate') return 'Node and Express Essentials';
  if (name === 'developing-back-end-apps-with-nodejs-and-express') return 'Developing Back-End Apps with Node.js and Express';
  if (name === 'ibm-javascript-programming-essentials') return 'JavaScript Programming Essentials';
  
  // MIT
  if (name === 'mit') return '6.00.1x: Introduction to Computer Science and Programming Using Python';
  
  // Linux Foundation
  if (name === 'linux') return 'LFS101x.2: Introduction to Linux';
  
  // Microsoft
  if (name === 'c') return 'DEV210x: Introduction to C++';
  if (name === 'machine-learning-microsoft') return 'DAT203x: Data Science and Machine Learning Essentials';
  if (name === 'r') return 'DAT204x: Introduction to R Programming';
  if (name === 'transact') return 'DAT201x: Querying with Transact-SQL';
  if (name === 'server') return 'INF201.12x: Introduction to Windows Server';
  
  // UC Berkeley
  if (name === 'berkeley') return 'College Writing 2.1x: Principles of Written English';
  if (name === 'berkeley2') return 'College Writing 2.2x: Principles of Written English';
  
  // Cisco
  if (name === 'cisco1') return 'Interconnecting Cisco Networking Devices Part 1 (ICND1)';
  if (name === 'cisco2') return 'Interconnecting Cisco Networking Devices Part 2 (ICND2)';
  
  // AWS
  if (name === 'awsconcepts') return 'AWS Concepts';
  if (name === 'awsudacity') return 'AWS Fundamental Course in the AWS Machine Learning Scholarship';
  
  // Nutanix
  if (name === 'nutanixfoundations') return 'Nutanix Hybrid Cloud Foundation Course';
  if (name === 'nutanix-certified-associate') return 'Nutanix Certified Associate';
  
  // Politecnico di Milano
  if (name === 'politecnico-milano-platform-thinking-whats-beyond-uber') return "Platform Thinking: what's beyond Uber?";
  
  // Packt
  if (name === 'packt-blockchain-basics-and-smart-contract-foundations') return 'Blockchain Basics and Smart Contract Foundations';
  
  // Intel
  if (name === 'openvino') return 'OpenVINO Fundamental Course in the Intel IoT Edge Scholarship';
  
  // Coursera
  if (name === 'guitar') return 'Introduction to Guitar';
  if (name === 'berklee') return 'Introduction to Music Production';
  if (name === 'typescript-in-react-get-started') return 'Typescript in React: Get Started';
  if (name === 'create-your-first-web-app-with-python-and-flask') return 'Create Your First Web App with Python and Flask';
  if (name === 'systems engineering') return 'Systems Engineering';
  
  // IEEE
  if (name === 'ieee1') return 'CloudIntro.x: Introduction to Cloud Computing';
  if (name === 'ieee2') return 'RTSIx: Introduction to Real-Time Systems';
  
  // Tsinghua University
  if (name === 'conversational') return 'Conversational English Skills';
  
  // University of Queensland
  if (name === 'ielts') return 'IELTSx: IELTS Academic Test Preparation';
  
  // LinkedIn/Microsoft Professional Certificates
  if (name === 'career-essentials-in-generative-ai-by-microsoft-and-linkedin') return 'Career Essentials in Generative AI by Microsoft and LinkedIn';
  if (name === 'docker-foundations-professional-certificate') return 'Docker Foundations Professional Certificate';
  
  // Codecademy Skill Paths
  if (name === 'learn-c-skill-path') return 'Learn C Skill Path';
  if (name === 'codefoundationscodecademy') return 'Code Foundations Skill Path';
  if (name === 'front-end-engineer') return 'Front-End Engineer Career Path';
  if (name === 'front-end-app-with-react') return 'Create a Front-End App with React Skill Path';
  if (name === 'react-redux-skillpath') return 'Create an Advanced Web App with React and Redux Skill Path';
  if (name === 'build-a-website-with-github') return 'Build a Website with HTML, CSS, and Github Pages Skill Path';
  if (name === 'build-websites-for-your-business') return 'Build Websites for your Business Skill Path';
  if (name === 'learn-php-skill-path') return 'Learn PHP Skill Path';
  if (name === 'pass-the-technical-interview-with-javascript-skill-path') return 'Pass the Technical Interview with JavaScript Skill Path';
  if (name === 'create-a-back-end-app-with-javascript-skill-path') return 'Create a Back-End App with JavaScript Skill Path';
  if (name === 'design-databases-with-postgresql-skill-path') return 'Design Databases With PostgreSQL Skill Path';
  
  // freeCodeCamp Certifications
  if (name === 'freecodecamp-front-end-libraries-certification') return 'Front End Development Libraries Developer Certification';
  if (name === 'javascript-algorithms-and-data-structures') return 'JavaScript Algorithms and Data Structures Developer Certification';
  if (name === 'responsivefreecodecamp') return 'Responsive Web Design Developer Certification';
  
  // University Certificates
  if (name === 'harvard-educators') return 'CS50 For Educators';
  if (name === 'harvard') return 'CS50 Understanding Technology';
  if (name === 'harvey') return 'My CS: Computer Science for Beginners';
  if (name === 'scratch') return 'CS002x: Programming in Scratch';
  if (name === 'toronto') return 'Learn to Program: The Fundamentals';
  if (name === 'columbia') return 'DS103x: Enabling Technologies for Data Science and Analytics: The Internet of Things';
  if (name === 'data-science') return 'Data Science Math Skills';
  if (name === 'michigan') return 'Internet History, Technology, and Security';
  if (name === 'washington') return 'Computer Networks';
  if (name === 'maryland') return 'Developing Innovative Ideas for New Companies: The First Step in Entrepreneurship';
  if (name === 'virginia') return 'Fundamentals of Project Planning and Management';
  if (name === 'rochester') return 'Fundamentals of Audio and Music Engineering: Part 1 Musical Sound & Electronics';
  
  // Default: parse from filename
  return filename
    .replace('.jpg', '')
    .replace('.png', '')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Legacy function for compatibility
const parseTitle = detectTitle;

const detectOrganization = (filename) => {
  const name = filename.toLowerCase();
  
  // HackerRank
  if (name.includes('hackerrank')) return 'HackerRank';
  
  // Top Universities
  if (name.includes('harvard')) return 'Harvard University';
  if (name.includes('mit')) return 'MIT';
  if (name.includes('stanford')) return 'Stanford University';
  if (name.includes('berkeley')) return 'UC Berkeley';
  if (name.includes('columbia')) return 'Columbia University';
  if (name.includes('michigan')) return 'University of Michigan';
  if (name.includes('toronto')) return 'University of Toronto';
  if (name.includes('maryland')) return 'University of Maryland';
  if (name.includes('virginia')) return 'University of Virginia';
  if (name.includes('washington')) return 'University of Washington';
  if (name.includes('rochester')) return 'University of Rochester';
  if (name.includes('harvey')) return 'Harvey Mudd College';
  if (name.includes('politecnico')) return 'Politecnico di Milano';
  
  // Big Tech Companies
  if (name.includes('ibm')) return 'IBM';
  if (name.includes('microsoft')) return 'Microsoft';
  if (name.includes('meta')) return 'Meta';
  if (name.includes('google')) return 'Google';
  if (name.includes('aws')) return 'AWS';
  if (name.includes('intel')) return 'Intel';
  if (name.includes('cisco')) return 'Cisco';
  if (name.includes('nutanix')) return 'Nutanix';
  if (name.includes('docker')) return 'Docker';
  if (name.includes('openai')) return 'OpenAI';
  
  // Major Learning Platforms (in priority order)
  if (name.includes('coursera')) return 'Coursera';
  if (name.includes('datacamp')) return 'DataCamp';
  if (name.includes('edx')) return 'edX';
  if (name.includes('udacity')) return 'Udacity';
  if (name.includes('codecademy')) return 'Codecademy';
  if (name.includes('freecodecamp')) return 'freeCodeCamp';
  if (name.includes('udemy')) return 'Udemy';
  if (name.includes('linkedin')) return 'LinkedIn Learning';
  
  // Other Organizations
  if (name.includes('pmi')) return 'PMI';
  if (name.includes('ieee')) return 'IEEE';
  if (name.includes('packt')) return 'Packt';
  if (name.includes('suse')) return 'SUSE';
  if (name.includes('bertelsmann')) return 'Bertelsmann';
  if (name.includes('mathworks')) return 'MathWorks';
  
  return 'Professional Training';
};

const detectCategory = (filename, tags) => {
  const name = filename.toLowerCase();
  const tagString = tags.join(' ').toLowerCase();
  const combined = `${name} ${tagString}`;
  
  // HackerRank assessments
  if (name.includes('hackerrank')) return 'hackerrank';
  
  // Big Tech Badge - Only IBM Node and Express Essentials
  if (name.includes('node-and-express-essentials.png') || name.includes('node-and-express-essentials')) {
    return 'bigTech';
  }
  
  // AI & ML
  if (combined.match(/\b(ai|ml|machine.learning|chatgpt|openai|gemini|copilot|claude|midjourney|generative|prompt|llm|agent)\b/)) {
    return 'aiMachineLearning';
  }
  
  // Cloud & DevOps
  if (combined.match(/\b(aws|cloud|docker|kubernetes|devops|container|nutanix|platform.engineering)\b/)) {
    return 'cloudDevOps';
  }
  
  // Data Science
  if (combined.match(/\b(data.science|pandas|numpy|statistics|visualization|seaborn|data.manipulation|data.analysis)\b/)) {
    return 'dataScience';
  }
  
  // Web Development
  if (combined.match(/\b(react|javascript|html|css|nodejs|express|typescript|vue|angular|frontend|backend|fullstack|web|sass|jquery|bootstrap|php|flask|django|api|graphql|mongodb|sql|database|nextjs|mern|websocket|responsive)\b/)) {
    return 'webDevelopment';
  }
  
  // Programming & CS
  if (combined.match(/\b(python|java|c\+\+|golang|go|rust|programming|algorithm|data.structure|learn.c|computer.science|command.line|git|github)\b/)) {
    return 'programming';
  }
  
  // Cybersecurity
  if (combined.match(/\b(security|cyber|ethical|penetration|owasp|hacking)\b/)) {
    return 'cybersecurity';
  }
  
  // Project Management & Agile
  if (combined.match(/\b(agile|scrum|project|kanban|stakeholder|okr|pmi)\b/)) {
    return 'projectManagement';
  }
  
  // Leadership & Soft Skills
  if (combined.match(/\b(leader|manager|team|communication|negotiation|emotional|coaching)\b/)) {
    return 'leadership';
  }
  
  // UX/UI Design
  if (combined.match(/\b(ux|ui|design|figma|sketch|color.design|navigation.design)\b/)) {
    return 'design';
  }
  
  // Teaching
  if (combined.match(/\b(teaching|educator|cs50|scratch)\b/)) {
    return 'teaching';
  }
  
  // Mobile Development
  if (combined.match(/\b(mobile|react.native|android|ios|flutter)\b/)) {
    return 'mobileDevelopment';
  }
  
  return 'other';
};

const detectTags = (filename) => {
  const tags = [];
  const name = filename.toLowerCase();
  
  if (name.includes('react')) tags.push('React');
  if (name.includes('javascript') || name.includes('js')) tags.push('JavaScript');
  if (name.includes('python')) tags.push('Python');
  if (name.includes('typescript')) tags.push('TypeScript');
  if (name.includes('nodejs') || name.includes('node')) tags.push('Node.js');
  if (name.includes('ai')) tags.push('AI');
  if (name.includes('ml') || name.includes('machine-learning')) tags.push('Machine Learning');
  if (name.includes('cloud')) tags.push('Cloud');
  if (name.includes('docker')) tags.push('Docker');
  if (name.includes('kubernetes')) tags.push('Kubernetes');
  if (name.includes('html')) tags.push('HTML');
  if (name.includes('css')) tags.push('CSS');
  if (name.includes('sql')) tags.push('SQL');
  if (name.includes('api')) tags.push('API');
  if (name.includes('agile')) tags.push('Agile');
  if (name.includes('scrum')) tags.push('Scrum');
  if (name.includes('security')) tags.push('Security');
  if (name.includes('data')) tags.push('Data');
  
  return tags.length > 0 ? tags : ['Technology', 'Professional Development'];
};

// Organization priority ranking (1 = highest priority)
const getOrganizationPriority = (org) => {
  const priorities = {
    // Tier 1: HackerRank Assessments
    'HackerRank': 1,
    
    // Tier 2: Top Universities
    'Harvard University': 2,
    'MIT': 2,
    'Stanford University': 2,
    'UC Berkeley': 2,
    'Columbia University': 2,
    'University of Michigan': 2,
    'University of Toronto': 2,
    'Harvey Mudd College': 2,
    'University of Maryland': 2,
    'University of Virginia': 2,
    'University of Washington': 2,
    'University of Rochester': 2,
    'Politecnico di Milano': 2,
    
    // Tier 3: Big Tech Companies
    'IBM': 3,
    'Microsoft': 3,
    'Meta': 3,
    'Google': 3,
    'AWS': 3,
    'Intel': 3,
    'Cisco': 3,
    'Nutanix': 3,
    'Docker': 3,
    'OpenAI': 3,
    
    // Tier 4: Learning Platforms (in your specified order)
    'Coursera': 4,
    'DataCamp': 5,
    'edX': 6,
    'Linux Foundation': 6,
    'Udacity': 7,
    'Codecademy': 8,
    'freeCodeCamp': 9,
    'Udemy': 10,
    'LinkedIn Learning': 11,
    
    // Tier 5: Other Organizations
    'PMI': 12,
    'IEEE': 12,
    'Packt': 12,
    'SUSE': 12,
    'Bertelsmann': 12,
    'MathWorks': 12,
    
    // Default
    'Professional Training': 99
  };
  
  return priorities[org] || 99;
};

// Detect if a certificate is featured/professional
const isFeatured = (filename, title) => {
  const name = filename.toLowerCase().replace('.jpg', '').replace('.png', '');
  
  // Professional Certifications and Career Paths
  if (name === 'front-end-engineer') return true; // Codecademy Front-End Engineer
  if (name === 'docker-foundations-professional-certificate') return true; // LinkedIn Docker Foundations
  if (name === 'career-essentials-in-generative-ai-by-microsoft-and-linkedin') return true; // Microsoft & LinkedIn AI
  
  return false;
};

// Generate all certificates
const certificatesUnsorted = filenames.map((filename, index) => {
  const manual = manualMappings.get(filename);
  
  // Use manual data if available, otherwise auto-detect
  const title = manual?.title || parseTitle(filename);
  const organization = manual?.organization || detectOrganization(filename);
  const tags = manual?.tags?.length > 0 ? manual.tags : detectTags(filename);
  const link = manual?.link || `#certificate-${index + 1}`;
  const category = detectCategory(filename, tags);
  const featured = isFeatured(filename, title);
  
  // Determine type based on category and filename
  let type = 'certificate';
  if (filename.toLowerCase().includes('front-end-engineer')) {
    type = 'professional-cert';
  } else if (filename.toLowerCase().includes('skill-path') || filename.toLowerCase().includes('career-path')) {
    type = 'skill-path';
  } else if (category === 'bigTech') {
    type = 'badge';
  }
  
  return {
    image: filename,
    title: title,
    organization: organization,
    tags: tags,
    category: category,
    link: link,
    type: type,
    priority: getOrganizationPriority(organization),
    featured: featured
  };
});

// Sort by organization priority, then by organization name, then by title
const certificates = certificatesUnsorted
  .sort((a, b) => {
    // First sort by priority (lower number = higher priority)
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    // Then sort by organization name to group certificates from same org
    if (a.organization !== b.organization) {
      return a.organization.localeCompare(b.organization);
    }
    // Finally sort alphabetically by title within the same organization
    return a.title.localeCompare(b.title);
  })
  .map((cert, index) => ({
    id: index + 1,
    image: cert.image,
    title: cert.title,
    organization: cert.organization,
    tags: cert.tags,
    category: cert.category,
    link: cert.link,
    type: cert.type,
    featured: cert.featured
  }));

// Create the JavaScript module
const output = `// AUTO-GENERATED: All ${certificates.length} certificates
// Generated from images-certificates folder + manual mappings
// To regenerate: node generate-certificates-v2.js

export const allCertificates = ${JSON.stringify(certificates, null, 2)};

// Group by category
export const certificatesByCategory = {
  hackerrank: allCertificates.filter(c => c.category === 'hackerrank'),
  bigTech: allCertificates.filter(c => c.category === 'bigTech'),
  programming: allCertificates.filter(c => c.category === 'programming'),
  teaching: allCertificates.filter(c => c.category === 'teaching'),
  webDevelopment: allCertificates.filter(c => c.category === 'webDevelopment'),
  mobileDevelopment: allCertificates.filter(c => c.category === 'mobileDevelopment'),
  aiMachineLearning: allCertificates.filter(c => c.category === 'aiMachineLearning'),
  cloudDevOps: allCertificates.filter(c => c.category === 'cloudDevOps'),
  dataScience: allCertificates.filter(c => c.category === 'dataScience'),
  cybersecurity: allCertificates.filter(c => c.category === 'cybersecurity'),
  projectManagement: allCertificates.filter(c => c.category === 'projectManagement'),
  leadership: allCertificates.filter(c => c.category === 'leadership'),
  design: allCertificates.filter(c => c.category === 'design'),
  other: allCertificates.filter(c => c.category === 'other')
};

// Export stats
export const stats = {
  total: allCertificates.length,
  byCategory: {
    'HackerRank': certificatesByCategory.hackerrank.length,
    'Big Tech': certificatesByCategory.bigTech.length,
    'Programming & CS': certificatesByCategory.programming.length,
    'Teaching': certificatesByCategory.teaching.length,
    'Web Development': certificatesByCategory.webDevelopment.length,
    'Mobile Development': certificatesByCategory.mobileDevelopment.length,
    'AI & Machine Learning': certificatesByCategory.aiMachineLearning.length,
    'Cloud & DevOps': certificatesByCategory.cloudDevOps.length,
    'Data Science': certificatesByCategory.dataScience.length,
    'Cybersecurity': certificatesByCategory.cybersecurity.length,
    'Project Management': certificatesByCategory.projectManagement.length,
    'Leadership': certificatesByCategory.leadership.length,
    'Design': certificatesByCategory.design.length,
    'Other': certificatesByCategory.other.length
  }
};
`;

// Write to file
fs.writeFileSync('./src/data/allCertificates.js', output);

console.log(`✅ Generated ${certificates.length} certificates!`);
console.log(`   - ${manualMappings.size} with manual data`);
console.log(`   - ${certificates.length - manualMappings.size} auto-detected`);
console.log('\nCategory breakdown:');
Object.entries({
  'HackerRank': certificates.filter(c => c.category === 'hackerrank').length,
  'Big Tech': certificates.filter(c => c.category === 'bigTech').length,
  'Programming & CS': certificates.filter(c => c.category === 'programming').length,
  'Teaching': certificates.filter(c => c.category === 'teaching').length,
  'Web Development': certificates.filter(c => c.category === 'webDevelopment').length,
  'Mobile Development': certificates.filter(c => c.category === 'mobileDevelopment').length,
  'AI & ML': certificates.filter(c => c.category === 'aiMachineLearning').length,
  'Cloud & DevOps': certificates.filter(c => c.category === 'cloudDevOps').length,
  'Data Science': certificates.filter(c => c.category === 'dataScience').length,
  'Cybersecurity': certificates.filter(c => c.category === 'cybersecurity').length,
  'Project Management': certificates.filter(c => c.category === 'projectManagement').length,
  'Leadership': certificates.filter(c => c.category === 'leadership').length,
  'Design': certificates.filter(c => c.category === 'design').length,
  'Other': certificates.filter(c => c.category === 'other').length
}).forEach(([cat, count]) => {
  if (count > 0) console.log(`  ${cat}: ${count}`);
});
