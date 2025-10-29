# 🚀 Quick Start Guide

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- React 18
- Framer Motion (for animations)
- All necessary dependencies

## Step 2: Organize Your Images

Create these folders in the `public/` directory and add your images:

```
public/
├── certificates/    # Place all certificate images here
├── platforms/       # Place platform logos (codecademy.jpg, edx.jpg, etc.)
└── scholarships/    # Place scholarship logos (google.jpg, intel.jpg, etc.)
```

**Important:** Make sure the image filenames in `src/data/certificateData.js` match your actual files!

## Step 3: Run the Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## Step 4: Customize (Optional)

### Update Certificate Data
Edit `src/data/certificateData.js` to add/remove certificates

### Change Color Theme
Edit CSS variables in `src/App.css`:
```css
:root {
  --primary: #667eea;    /* Main purple */
  --secondary: #764ba2;   /* Secondary purple */
  --accent: #f093fb;      /* Pink */
  --accent2: #4facfe;     /* Blue */
}
```

## Step 5: Build for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder ready for deployment.

## 🎨 Features You'll See

✨ **Animated Hero Section** with floating gradient orbs
🔍 **Smart Search** - searches titles, organizations, and tags  
🏷️ **Category Filtering** - filter by Web Dev, AI/ML, Cloud, etc.
🎯 **Organization Filter** - dropdown to filter by platform
🎓 **Platform Logos** - grayscale to color on hover
🏆 **Scholarship Cards** - special section for achievements
📱 **Fully Responsive** - works on all devices

## 🐛 Troubleshooting

**Images not showing?**
- Check that image paths match filenames exactly
- Make sure images are in the correct public/ subdirectories
- Image names are case-sensitive!

**Animation issues?**
- Clear browser cache
- Try `npm install framer-motion` again

**Port 3000 already in use?**
- Kill the process or use a different port:
  ```bash
  PORT=3001 npm start
  ```

## 📦 What's Included

✅ Modern React 18 app  
✅ Framer Motion animations  
✅ Responsive grid layouts  
✅ Search and filter functionality  
✅ Dark theme with gradient accents  
✅ 248 pre-configured certificates  
✅ 10 platform logos  
✅ 8 scholarship entries  

## 🎯 Next Steps

1. Add your remaining certificate images
2. Update social links in footer (App.js line 184-186)
3. Customize colors if desired
4. Build and deploy!

Enjoy your certificate showcase! 🎉
