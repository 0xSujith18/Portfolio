export const PERSONAL = {
  name: "Sujith M S",
  title: "Full Stack Developer",
  bio: "I'm a Full Stack Developer passionate about building scalable web applications and solving real-world problems through technology. I have hands-on experience in frontend and backend development, working with modern frameworks like React, Node.js, and MongoDB, along with cloud deployments on AWS.",
  email: "sujithshankar18@gmail.com",
  phone: "9940327553",
  github: "https://github.com/0xSujith18",
  linkedin: "https://www.linkedin.com/in/m-s-sujith",
  resumeUrl: "/Resume.pdf",
};

export const STATS = [
  { label: "LeetCode Problems", value: "108", color: "from-orange-500 to-yellow-500" },
  { label: "Skillrack Problems", value: "1103+", color: "from-brand-500 to-accent-purple" },
  { label: "Projects Built", value: "5+", color: "from-accent-cyan to-brand-500" },
  { label: "Technologies", value: "15+", color: "from-accent-pink to-accent-purple" },
];

export const SKILLS = [
  {
    category: "Frontend",
    icon: "Monitor",
    color: "from-blue-500 to-cyan-500",
    items: [
      { name: "React.js", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML & CSS", level: 92 },
    ],
  },
  {
    category: "Backend",
    icon: "Server",
    color: "from-green-500 to-emerald-500",
    items: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 87 },
      { name: "Spring Boot", level: 72 },
      { name: "Django", level: 70 },
    ],
  },
  {
    category: "Languages",
    icon: "Code2",
    color: "from-purple-500 to-pink-500",
    items: [
      { name: "JavaScript", level: 88 },
      { name: "C / C++", level: 82 },
      { name: "Java", level: 75 },
      { name: "Python", level: 78 },
    ],
  },
  {
    category: "Database & Tools",
    icon: "Database",
    color: "from-orange-500 to-red-500",
    items: [
      { name: "MongoDB", level: 85 },
      { name: "SQL", level: 80 },
      { name: "Git & GitHub", level: 88 },
      { name: "AWS EC2", level: 72 },
    ],
  },
];

export const TECH_STACK = [
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "TS" },
  { name: "Node.js", icon: "🟢" },
  { name: "Express.js", icon: "⚡" },
  { name: "MongoDB", icon: "🍃" },
  { name: "SQL", icon: "🐬" },
  { name: "Spring Boot", icon: "🍃" },
  { name: "Django", icon: "🐍" },
  { name: "AWS EC2", icon: "☁️" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Git", icon: "📦" },
  { name: "Postman", icon: "📮" },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Talkit",
    description:
      "A cross-platform civic engagement platform enabling users to share public issues and appreciation through posts, likes, comments, reposts, and hashtags.",
    longDescription:
      "Implemented a geo-tagged reporting system with photo evidence, privacy options, and structured issue categories. Designed an authority dashboard for tracking reports, updating resolution status, and promoting transparent community-driven accountability.",
    tags: ["ReactJS", "TypeScript", "Node.js", "Express.js", "MongoDB Atlas", "Cloudinary"],
    color: "from-blue-500 to-cyan-500",
    icon: "MessageSquare",
    github: "https://github.com/0xSujith18/Talkit.git",
    featured: true,
    metrics: ["Geo-tagged reports", "Authority dashboard", "Real-time feed"],
  },
  {
    id: 2,
    title: "NutriVeda — Ayurvedic Diet Planner",
    description:
      "A full-stack Ayurvedic diet planning platform that provides personalized meal plans based on user dosha types and wellness preferences.",
    longDescription:
      "Implemented secure JWT authentication, food search by dosha/season, and dashboards for tracking nutrition, water intake, and health progress. Built a responsive React frontend with charts and a scalable Node.js + MongoDB backend.",
    tags: ["ReactJS", "TypeScript", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    color: "from-green-500 to-teal-500",
    icon: "Leaf",
    github: "https://github.com/0xSujith18/NutriVeda.git",
    featured: true,
    metrics: ["Dosha-based plans", "JWT auth", "Nutrition tracking"],
  },
  {
    id: 3,
    title: "EduPay",
    description:
      "A fee payment and management platform for educational institutions, streamlining student fee collection, payment tracking, and receipt generation.",
    longDescription:
      "Built to simplify the fee management process for schools and colleges with structured payment workflows, student records, and payment history.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "from-orange-500 to-yellow-500",
    icon: "CreditCard",
    github: "https://github.com/0xSujith18/EDUPAY.git",
    featured: false,
    metrics: ["Fee tracking", "Payment history", "Receipt generation"],
  },
];

export const EXPERIENCE = [
  {
    title: "Problem Solving & Competitive Programming",
    company: "LeetCode & Skillrack",
    period: "2024 – Present",
    description:
      "Consistently solving algorithmic challenges to strengthen data structures, dynamic programming, and problem-solving skills.",
    achievements: [
      "Solved 108 LeetCode problems — Max Rating: 1390, Global Rank: 1,370,945",
      "Solved 1100+ Skillrack problems",
      "Runner-Up in Web Hackathon (Createathon)",
      "Third Place in Pitch Your Idea (Zorax Aiconclave 2.0)",
    ],
    tags: ["DSA", "Algorithms", "Problem Solving"],
    icon: "Trophy",
  },
  {
    title: "B.E. Computer Science Engineering",
    company: "Sri Eshwar College of Engineering",
    period: "2024 – 2028",
    description:
      "Pursuing Computer Science Engineering with a current CGPA of 7.7 (III semester). Focused on software development, algorithms, and full-stack web technologies.",
    achievements: [
      "CGPA: 7.7 (III semester)",
      "Built full-stack projects: Talkit, NutriVeda",
      "Active participation in hackathons and tech competitions",
    ],
    tags: ["CS Fundamentals", "Full Stack", "Academics"],
    icon: "GraduationCap",
  },
  {
    title: "Higher Secondary Education (12th)",
    company: "Malar Matriculation Higher Secondary School",
    period: "2022 – 2024",
    description: "Completed Higher Secondary schooling with 81%.",
    achievements: ["Scored 81% in Higher Secondary (12th)"],
    tags: ["Academics"],
    icon: "School",
  },
  {
    title: "Secondary Education (10th)",
    company: "R N Oxford Matriculation School",
    period: "2021 – 2022",
    description: "Completed Secondary schooling with 85%.",
    achievements: ["Scored 85% in Secondary (10th)"],
    tags: ["Academics"],
    icon: "School",
  },
];

export const LEETCODE_STATS = {
  totalSolved: 108,
  easy: 42,
  medium: 52,
  hard: 14,
  maxRating: 1390,
  globalRank: "1,370,945",
  profileUrl: "https://leetcode.com/u/0xSujith18",
};

export const SKILLRACK_STATS = {
  problemsSolved: 1103,
  certificates: 13,
  score: 18959,
  profileUrl: "https://www.skillrack.com/faces/resume.xhtml?id=515094&key=d6faf944fbe8e7a872b440747ed217727519fb51",
};

export const CERTIFICATIONS = [
  { name: "Mastering Data Structures & Algorithms using C and C++", issuer: "Udemy", year: 2025 },
  { name: "Artificial Intelligence Fundamentals", issuer: "IBM", year: 2026 },
  { name: "Completion of C++ Training", issuer: "IIT Bombay", year: 2024 },
  { name: "Complete Web Development", issuer: "Udemy", year: 2026 },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];
