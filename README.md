# Sujith's Portfolio — Production-Ready Next.js Portfolio

A **world-class, SaaS-quality portfolio website** built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open http://localhost:3000
```

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Themes**: next-themes (Dark/Light)

## ✨ Features
- 🎨 Glassmorphism design (Apple + Linear + Vercel inspired)
- 🌙 Dark/Light theme toggle
- ✍️ Typewriter hero animation
- 🔵 Interactive particle canvas background
- 📊 Animated skill progress bars
- 🏆 LeetCode & Skillrack achievement dashboard
- 📅 GitHub activity heatmap
- 💼 Project showcase with filter tabs
- 🕐 Experience timeline
- 📬 Contact form
- 🤖 AI Assistant chatbot (embedded)
- 📱 Fully responsive
- ⚡ SEO optimized

## 🔧 Customization

All content is centralized in `app/lib/data.ts`:
- Update `PERSONAL` with your real info, email, GitHub, LinkedIn
- Add/edit `PROJECTS` array for your projects
- Update `EXPERIENCE` for your timeline
- Adjust `SKILLS` percentages

### Contact Form Integration
Install EmailJS and replace the `handleSubmit` in `ContactSection.tsx`:
```bash
npm install @emailjs/browser
```

### Resume
Place your `resume.pdf` in the `public/` folder.

## 📁 Project Structure
```
app/
├── components/       # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ParticleBackground.tsx
│   ├── AIAssistant.tsx
│   └── ThemeProvider.tsx
├── sections/         # Page sections
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ExperienceSection.tsx
│   ├── AchievementsSection.tsx
│   └── ContactSection.tsx
├── lib/
│   ├── data.ts       # All content data
│   └── utils.ts      # Utility functions
├── globals.css       # Global styles
├── layout.tsx        # Root layout + SEO
└── page.tsx          # Main page
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📄 License
MIT © Sujith
