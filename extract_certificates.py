import re
from collections import defaultdict

# Read the certificates.html file
with open('certificates.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all certificate entries
pattern = r'<div class="gallery">.*?<img src="(.*?)".*?<a.*?href="(.*?)".*?<div class="desc"><span.*?>(.*?)</span>(.*?)</div>'
matches = re.findall(pattern, content, re.DOTALL)

# Organize certificates by category
categories = {
    'hackerrank': [],
    'web-development': [],
    'ai-ml': [],
    'generative-ai': [],
    'cloud': [],
    'devops': [],
    'programming': [],
    'cybersecurity': [],
    'data-science': [],
    'teaching': [],
    'mobile': [],
    'scholarships': []
}

print(f"Total certificates found: {len(matches)}")
print("\nFirst 10 certificates:")
for i, (img, link, org, title) in enumerate(matches[:10]):
    print(f"{i+1}. {org.strip()} - {title.strip()[:50]}...")
