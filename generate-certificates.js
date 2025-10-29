// Script to auto-generate ALL certificates from filenames
const fs = require('fs');
const path = require('path');

// Read directly from the images folder
const imagesDir = './images-certificates';
const filenames = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg'));

console.log(`Found ${filenames.length} certificates`);

// Helper functions
const parseTitle = (filename) => {
  return filename
    .replace('.jpg', '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
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
  return 'Professional Training';
};

const detectCategory = (filename) => {
  const name = filename.toLowerCase();
  
  // AI & ML
  if (name.match(/\b(ai|ml|machine.learning|chatgpt|openai|gemini|copilot|claude|midjourney|generative|prompt|llm|agent)\b/)) {
    return 'aiMachineLearning';
  }
  
  // Cloud & DevOps
  if (name.match(/\b(aws|cloud|docker|kubernetes|devops|container|nutanix|platform.engineering)\b/)) {
    return 'cloudDevOps';
  }
  
  // Web Development
  if (name.match(/\b(react|javascript|html|css|nodejs|express|typescript|vue|angular|frontend|backend|fullstack|web|sass|jquery|bootstrap|php|flask|django|api|graphql|mongodb|sql|database|nextjs|mern)\b/)) {
    return 'webDevelopment';
  }
  
  // Programming
  if (name.match(/\b(python|java|c\+\+|golang|rust|programming|algorithm|data.structure|learn.c)\b/)) {
    return 'programming';
  }
  
  // Data Science
  if (name.match(/\b(data|pandas|numpy|statistics|visualization|seaborn)\b/)) {
    return 'dataScience';
  }
  
  // Cybersecurity
  if (name.match(/\b(security|cyber|ethical|penetration|owasp|hacking)\b/)) {
    return 'cybersecurity';
  }
  
  // Project Management
  if (name.match(/\b(agile|scrum|project|kanban|stakeholder|okr)\b/)) {
    return 'projectManagement';
  }
  
  // Leadership
  if (name.match(/\b(leader|manager|team|communication|negotiation|emotional)\b/)) {
    return 'leadership';
  }
  
  // Design
  if (name.match(/\b(ux|ui|design|figma|sketch)\b/)) {
    return 'design';
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
const certificates = filenames.map((filename, index) => ({
  id: index + 1,
  image: filename,
  title: parseTitle(filename),
  organization: detectOrganization(filename),
  tags: detectTags(filename),
  category: detectCategory(filename),
  link: `#certificate-${index + 1}`,
  type: 'course'
}));

// Create the JavaScript module
const output = `// AUTO-GENERATED: All ${certificates.length} certificates
// Generated from images-certificates folder
// DO NOT EDIT MANUALLY - run generate-certificates.js to regenerate

export const allCertificates = ${JSON.stringify(certificates, null, 2)};

// Group by category
export const certificatesByCategory = {
  aiMachineLearning: allCertificates.filter(c => c.category === 'aiMachineLearning'),
  webDevelopment: allCertificates.filter(c => c.category === 'webDevelopment'),
  cloudDevOps: allCertificates.filter(c => c.category === 'cloudDevOps'),
  programming: allCertificates.filter(c => c.category === 'programming'),
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
    'AI & Machine Learning': certificatesByCategory.aiMachineLearning.length,
    'Web Development': certificatesByCategory.webDevelopment.length,
    'Cloud & DevOps': certificatesByCategory.cloudDevOps.length,
    'Programming': certificatesByCategory.programming.length,
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
console.log('\nCategory breakdown:');
Object.entries({
  'AI & Machine Learning': certificates.filter(c => c.category === 'aiMachineLearning').length,
  'Web Development': certificates.filter(c => c.category === 'webDevelopment').length,
  'Cloud & DevOps': certificates.filter(c => c.category === 'cloudDevOps').length,
  'Programming': certificates.filter(c => c.category === 'programming').length,
  'Data Science': certificates.filter(c => c.category === 'dataScience').length,
  'Cybersecurity': certificates.filter(c => c.category === 'cybersecurity').length,
  'Project Management': certificates.filter(c => c.category === 'projectManagement').length,
  'Leadership': certificates.filter(c => c.category === 'leadership').length,
  'Design': certificates.filter(c => c.category === 'design').length,
  'Other': certificates.filter(c => c.category === 'other').length
}).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});
