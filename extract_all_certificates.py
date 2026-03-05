import re
import json

with open('certificates.html', 'r', encoding='utf-8') as f:
    html = f.read()

sections = re.split(r'<section[^>]*class="projectcard[^"]*"[^>]*>', html)
certificates = {}

for section in sections[1:]:
    title_match = re.search(r'<h2[^>]*>(.*?)</h2>', section)
    if not title_match:
        continue
    
    category = title_match.group(1).strip()
    category = re.sub(r'<[^>]+>', '', category)
    
    # Find all gallery divs
    gallery_pattern = r'<div class="gallery">(.*?)</a>'
    galleries = re.findall(gallery_pattern, section, re.DOTALL)
    
    if category not in certificates:
        certificates[category] = []
    
    for gallery in galleries:
        # Extract image
        img_match = re.search(r'<img src="([^"]+)"', gallery)
        if not img_match:
            continue
        img_src = img_match.group(1)
        
        # Extract link
        link_match = re.search(r'<a[^>]*href="([^"]*)"', gallery)
        link = link_match.group(1) if link_match else '#'
        
        # Extract organization
        org_match = re.search(r'<span[^>]*>([^<]+)</span>', gallery)
        if not org_match:
            continue
        org = org_match.group(1).strip()
        
        # Extract title and subcategory
        desc_match = re.search(r'<div class="desc">.*?</span>\s*(.+?)(?:</div>|$)', gallery, re.DOTALL)
        if not desc_match:
            continue
        
        title_text = desc_match.group(1)
        
        # Check for subcategory in span
        subcategory = None
        subcategory_match = re.search(r'<span[^>]*>\s*(Skill Path|Skill Track|Professional Certification|Career Path|Specialization)\s*</span>', title_text, re.IGNORECASE)
        if subcategory_match:
            subcategory = subcategory_match.group(1).strip()
            # Remove subcategory from title
            title_text = re.sub(r'<span[^>]*>\s*(Skill Path|Skill Track|Professional Certification|Career Path|Specialization)\s*</span>', '', title_text, flags=re.IGNORECASE)
        
        # Clean title
        title_clean = re.sub(r'<[^>]+>', '', title_text)
        title_clean = re.sub(r'\s+', ' ', title_clean).strip()
        
        cert_data = {
            'image': img_src,
            'link': link if link else '#',
            'organization': org,
            'title': title_clean,
            'category': category
        }
        if subcategory:
            cert_data['subcategory'] = subcategory
        
        certificates[category].append(cert_data)

print(f"Total certificates: {sum(len(v) for v in certificates.values())}")
print("\nCertificates by category:")
for cat, certs in sorted(certificates.items(), key=lambda x: len(x[1]), reverse=True):
    subcats = sum(1 for c in certs if 'subcategory' in c)
    print(f"  {cat}: {len(certs)} ({subcats} with subcategory)")

with open('certificates_data.json', 'w', encoding='utf-8') as f:
    json.dump(certificates, f, indent=2, ensure_ascii=False)

print("\nData saved to certificates_data.json")

# Print subcategory summary
all_subcats = {}
for cat_certs in certificates.values():
    for cert in cat_certs:
        if 'subcategory' in cert:
            subcat = cert['subcategory']
            all_subcats[subcat] = all_subcats.get(subcat, 0) + 1

if all_subcats:
    print("\nSubcategory summary:")
    for subcat, count in sorted(all_subcats.items()):
        print(f"  {subcat}: {count}")
