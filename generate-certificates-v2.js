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
const imagesDir = './images-certificates';
const filenames = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg'));

console.log(`Found ${filenames.length} certificate images`);

// Helper to parse title from filename (fallback)
const parseTitle = (filename) => {
  return filename
    .replace('.jpg', '')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const detectOrganization = (filename) => {
  const name = filename.toLowerCase();
  if (name.includes('codecademy')) return 'Codecademy';
  if (name.includes('udemy')) return 'Udemy';
  if (name.includes('linkedin')) return 'LinkedIn Learning';
  if (name.includes('datacamp')) return 'DataCamp';
  if (name.includes('udacity')) return 'Udacity';
  if (name.includes('coursera')) return 'Coursera';
  if (name.includes('freecodecamp')) return 'freeCodeCamp';
  if (name.includes('hackerrank')) return 'HackerRank';
  if (name.includes('meta')) return 'Meta';
  if (name.includes('ibm')) return 'IBM';
  if (name.includes('google')) return 'Google';
  if (name.includes('microsoft')) return 'Microsoft';
  if (name.includes('aws')) return 'AWS';
  if (name.includes('mit')) return 'MIT';
  if (name.includes('harvard')) return 'Harvard';
  if (name.includes('berkeley')) return 'UC Berkeley';
  if (name.includes('columbia')) return 'Columbia University';
  if (name.includes('michigan')) return 'University of Michigan';
  if (name.includes('toronto')) return 'University of Toronto';
  if (name.includes('nutanix')) return 'Nutanix';
  if (name.includes('cisco')) return 'Cisco';
  if (name.includes('docker')) return 'Docker';
  if (name.includes('openai')) return 'OpenAI';
  if (name.includes('pmi')) return 'PMI';
  if (name.includes('ieee')) return 'IEEE';
  if (name.includes('packt')) return 'Packt';
  if (name.includes('politecnico')) return 'Politecnico di Milano';
  if (name.includes('suse')) return 'SUSE';
  if (name.includes('bertelsmann')) return 'Bertelsmann';
  if (name.includes('intel')) return 'Intel';
  return 'Professional Training';
};

const detectCategory = (filename, tags) => {
  const name = filename.toLowerCase();
  const tagString = tags.join(' ').toLowerCase();
  const combined = `${name} ${tagString}`;
  
  // HackerRank assessments
  if (name.includes('hackerrank')) return 'hackerrank';
  
  // Big Tech (IBM, Google, Microsoft badges)
  if (combined.match(/\b(ibm|google|microsoft|aws|azure)\b/) && 
      (combined.includes('badge') || combined.includes('essential') || name.includes('node-and-express'))) {
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

// Generate all certificates
const certificates = filenames.map((filename, index) => {
  const manual = manualMappings.get(filename);
  
  // Use manual data if available, otherwise auto-detect
  const title = manual?.title || parseTitle(filename);
  const organization = manual?.organization || detectOrganization(filename);
  const tags = manual?.tags?.length > 0 ? manual.tags : detectTags(filename);
  const link = manual?.link || `#certificate-${index + 1}`;
  const type = manual?.type || 'course';
  const category = detectCategory(filename, tags);
  
  return {
    id: index + 1,
    image: filename,
    title: title,
    organization: organization,
    tags: tags,
    category: category,
    link: link,
    type: type
  };
});

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
