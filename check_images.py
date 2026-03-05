import json
import os

# Load certificates data
with open('certificates_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

missing_images = []
existing_images = []

# Check each certificate
for category, certificates in data.items():
    for cert in certificates:
        image_path = cert.get('image', '')
        if image_path:
            # Convert relative path to absolute
            full_path = image_path.replace('./', '')
            
            if os.path.exists(full_path):
                existing_images.append(image_path)
            else:
                missing_images.append({
                    'category': category,
                    'title': cert.get('title', 'Unknown'),
                    'image': image_path,
                    'organization': cert.get('organization', 'Unknown')
                })

# Print results
print(f"\n{'='*80}")
print(f"IMAGE CHECK RESULTS")
print(f"{'='*80}")
print(f"\nTotal certificates: {sum(len(certs) for certs in data.values())}")
print(f"Existing images: {len(existing_images)}")
print(f"Missing images: {len(missing_images)}")

if missing_images:
    print(f"\n{'='*80}")
    print(f"MISSING IMAGES ({len(missing_images)}):")
    print(f"{'='*80}\n")
    
    for item in missing_images:
        print(f"Category: {item['category']}")
        print(f"Title: {item['title']}")
        print(f"Organization: {item['organization']}")
        print(f"Image: {item['image']}")
        print(f"{'-'*80}")

    # Save to file
    with open('missing_images.txt', 'w', encoding='utf-8') as f:
        f.write("MISSING IMAGES REPORT\n")
        f.write("="*80 + "\n\n")
        for item in missing_images:
            f.write(f"Category: {item['category']}\n")
            f.write(f"Title: {item['title']}\n")
            f.write(f"Organization: {item['organization']}\n")
            f.write(f"Image: {item['image']}\n")
            f.write("-"*80 + "\n")
    
    print(f"\nReport saved to: missing_images.txt")
else:
    print("\n✓ All images found!")
