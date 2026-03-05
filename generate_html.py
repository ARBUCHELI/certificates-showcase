import json

# Read the JSON data
with open('certificates_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Category mapping to modern names and icons
category_map = {
    'HackerRank': {'name': 'HackerRank Skill Assessments', 'icon': 'fa-trophy', 'id': 'hackerrank'},
    'Web Development': {'name': 'Web Development', 'icon': 'fa-laptop-code', 'id': 'web-development'},
    'Programming': {'name': 'Programming & Computer Science', 'icon': 'fa-terminal', 'id': 'programming'},
    'Generative AI': {'name': 'Generative AI & LLM', 'icon': 'fa-robot', 'id': 'generative-ai'},
    'AI/ML': {'name': 'AI & Machine Learning', 'icon': 'fa-brain', 'id': 'ai-ml'},
    'Data Science': {'name': 'Data Science & Analytics', 'icon': 'fa-chart-line', 'id': 'data-science'},
    'Cloud': {'name': 'Cloud Computing', 'icon': 'fa-cloud', 'id': 'cloud'},
    'Other': {'name': 'Additional Certifications', 'icon': 'fa-certificate', 'id': 'other'}
}

html_output = ""

# Generate HTML for each category
for category, info in category_map.items():
    if category not in data or len(data[category]) == 0:
        continue
    
    certs = data[category]
    count = len(certs)
    
    html_output += f'''
            <!-- {info['name']} Section -->
            <section class="certificate-section" data-category="{info['id']}">
                <div class="section-header">
                    <h2 class="category-title">
                        <i class="fas {info['icon']}"></i>
                        {info['name']}
                    </h2>
                    <span class="cert-count">{count} Certificates</span>
                </div>
                <div class="certificates-grid">
'''
    
    # Generate certificate cards (limit to first 100 per category for performance)
    for i, cert in enumerate(certs[:100]):
        delay = (i % 3) * 100
        
        html_output += f'''                    <div class="certificate-card" data-aos="fade-up" data-aos-delay="{delay}">
                        <div class="cert-badge"><i class="fas fa-star"></i></div>
                        <div class="cert-image">
                            <img src="{cert['image']}" alt="{cert['title']}">
                            <div class="cert-overlay">
                                <a href="{cert['link']}" target="_blank" class="cert-link">
                                    <i class="fas fa-external-link-alt"></i> View
                                </a>
                            </div>
                        </div>
                        <div class="cert-content">
                            <h3 class="cert-title">{cert['title']}</h3>
                            <p class="cert-org">{cert['organization']}</p>
                        </div>
                    </div>
'''
    
    html_output += '''                </div>
            </section>
'''

# Save to file
with open('generated_certificates.html', 'w', encoding='utf-8') as f:
    f.write(html_output)

print(f"Generated HTML for {sum(len(data[cat]) for cat in data)} certificates")
print("Saved to generated_certificates.html")
