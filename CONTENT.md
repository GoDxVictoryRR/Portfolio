# SITE CONTENT

## Personal Info
```ts
export const personal = {
  name: 'Hardik Jaiswal',
  nameLines: ['HARDIK', 'JAISWAL'],
  title: 'SOFTWARE ENGINEER / AI SYSTEMS',
  email: 'jshivangi86@gmail.com',
  linkedin: 'https://linkedin.com/in/hardik-jaiswal',
  github: 'https://github.com/GoDxVictoryRR',
  phone: '+91-7525017529',
  location: 'New Delhi, India',
  university: 'Guru Gobind Singh Indraprastha University',
  degree: 'B.Tech in Industrial Internet of Things',
  cgpa: '8.018 / 10',
  graduationYear: '2027',
}
```

## Navigation
```ts
export const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'About',    href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',  href: '#contact' },
]
export const navCTA = { label: 'Contact / Hire', href: '#contact' }
```

## Hero Section
```ts
export const hero = {
  nameLine1: 'HARDIK',
  nameLine2: 'JAISWAL',
  role: 'SOFTWARE ENGINEER / AI SYSTEMS',
  stats: [
    { value: '500+', label: 'LeetCode Problems' },
    { value: '8.0',  label: 'CGPA' },
    { value: 'Top 19%', label: 'Global Ranking' },
    { value: '365', label: 'Day Streak' },
  ],
  // Quaternion panel label
  quaternionLabel: 'MainLogo Quaternion',
  // Material panel label
  materialLabel: 'MainLogo Material',
  materialSliders: [
    { name: 'roughness',   default: 0.10, min: 0, max: 1,   step: 0.01 },
    { name: 'noiseScale',  default: 9.0,  min: 1, max: 20,  step: 0.1  },
    { name: 'color',       default: '#ffffff', type: 'color' },
  ],
}
```

## About Section
```ts
export const about = {
  bio: `B.Tech student at GGSIPU building production-grade distributed systems and AI pipelines. Obsessed with low-latency architecture, agentic AI, and making things that actually scale. 500+ LeetCode problems deep, two AI internships in, and shipping real systems — not toy projects.`,
  
  skills: {
    Languages: ['C++', 'Python', 'TypeScript', 'JavaScript', 'C', 'HTML/CSS'],
    Frameworks: ['Next.js 14', 'FastAPI', 'Node.js', 'RabbitMQ', 'Celery', 'Redis', 'spaCy'],
    'Cloud & Tools': ['Supabase', 'PostgreSQL', 'Pinecone', 'Git/GitHub', 'Azure AI', 'Android Studio'],
    Concepts: ['Distributed Systems', 'Microservices', 'Agentic AI', 'RAG', 'High-Concurrency', 'DSA'],
  },
}
```

## Projects
```ts
export const projects = [
  {
    id: 'sentiment-liquidity-engine',
    date: '2025 01',
    tag: 'JAN 2025 — PRESENT',
    title: 'Sentiment Liquidity Engine',
    subtitle: 'Real-Time AI News Sentiment Pipeline',
    description: `Engineered a real-time ingestion engine processing 5,000+ news articles/hour into ticker-mapped sentiment signals via a multi-model AI ensemble. Resolved race conditions in high-concurrency EWMA updates using atomic distributed locking. Designed a "True-Zero" serverless model reducing developer compute costs by 100%.`,
    tags: ['next.js_14', 'typescript', 'gemini_2.0', 'claude_3.5', 'distributed_systems', 'puter.js'],
    github: 'https://github.com/GoDxVictoryRR',
    metrics: [
      { value: '5,000+', label: 'articles/hour' },
      { value: '100%',   label: 'cost reduction' },
      { value: 'O(1)',   label: 'KV lookups' },
    ],
    // Color theme for this project's background wash
    accentColor: '#1a0533',  // deep purple
    imageGradient: 'linear-gradient(135deg, #1a0533 0%, #0d1f3c 50%, #0a0a0a 100%)',
  },
  {
    id: 'factanchor',
    date: '2025 02',
    tag: 'FEB 2025 — PRESENT',
    title: 'FactAnchor',
    subtitle: 'Enterprise-Grade AI Fact-Verification Engine',
    description: `Architected a high-concurrency event-driven microservices ecosystem using FastAPI & RabbitMQ to orchestrate async NLP verification pipelines — 5x higher throughput. Multi-Strategy Routing Engine with spaCy NER improved accuracy by 40% and reduced false positive rate to near zero. Sub-150ms UI updates via Redis Pub/Sub & WebSockets.`,
    tags: ['next.js_14', 'fastapi', 'rabbitmq', 'celery', 'redis', 'postgresql', 'pinecone', 'spacy'],
    github: 'https://github.com/GoDxVictoryRR',
    metrics: [
      { value: '5x',      label: 'throughput gain' },
      { value: '<150ms',  label: 'UI latency' },
      { value: '40%',     label: 'accuracy gain' },
    ],
    accentColor: '#0d2b1a',  // deep teal-green
    imageGradient: 'linear-gradient(135deg, #0d2b1a 0%, #1a1a0d 50%, #0a0a0a 100%)',
  },
]
```

## Experience
```ts
export const experience = [
  {
    id: 'shell-aicte',
    date: '2025 07',
    dateRange: 'JULY 2025 — AUGUST 2025',
    company: 'Shell | Edunet Foundation | AICTE',
    companyLabel: 'SKILLS4FUTURE',
    role: 'AI Intern',
    location: 'Remote',
    description: `Engineered a CNN-based Tree Classification & Health Monitoring model using TensorFlow achieving 88%+ accuracy across 5+ tree species for sustainable forestry.`,
    details: [
      'Built full ML pipeline — preprocessing, augmentation, training, evaluation',
      'Reduced preprocessing time by 40% via automated scripting',
      'Awarded triple certification from AICTE, Shell India, and Edunet Foundation',
    ],
    tags: ['tensorflow', 'cnn', 'python', 'ml_pipeline', 'azure'],
    accentColor: '#1a1200',
    imageGradient: 'linear-gradient(135deg, #1a1200 0%, #0d1a0d 50%, #0a0a0a 100%)',
  },
  {
    id: 'microsoft-aicte',
    date: '2025 05',
    dateRange: 'MAY 2025 — JUNE 2025',
    company: 'Edunet Foundation',
    companyLabel: 'MICROSOFT AICTE INTERNSHIP',
    role: 'AI Intern',
    location: 'Remote',
    description: `Built and deployed Neural Network models achieving 92%+ validation accuracy on real-world datasets across 3 end-to-end projects using Microsoft Azure AI Services.`,
    details: [
      'Covered 5+ AI/Cloud domains: computer vision, generative AI, supervised/unsupervised learning',
      'Completed 10+ Microsoft Learn modules with hands-on Azure toolsets',
      'Presented model architecture to industry mentors across 4 weekly review sessions',
    ],
    tags: ['azure_ai', 'neural_networks', 'computer_vision', 'generative_ai', 'microsoft_learn'],
    accentColor: '#001a33',
    imageGradient: 'linear-gradient(135deg, #001a33 0%, #0d0d1a 50%, #0a0a0a 100%)',
  },
]
```

## Achievements (Marquee Strip)
```ts
export const achievements = [
  'LeetCode 500+ Problems',
  '365-Day Active Streak',
  'Max Rating 1,633',
  'Top 19% Globally',
  'SIH 2025 Semifinalist',
  'Samsung Solve for Tomorrow 2025',
  'Bharatiya Antariksh Hackathon 2025',
  'Rank 1 — Engineering Mathematics I',
  'AICTE × Shell Certified',
  'Microsoft Azure AI Certified',
]
```

## Contact Section
```ts
export const contact = {
  heading: 'GET IN\nTOUCH',
  subheading: 'Open to full-time roles, internships, and interesting projects.',
  links: [
    { label: 'jshivangi86@gmail.com', href: 'mailto:jshivangi86@gmail.com', type: 'email' },
    { label: 'LinkedIn ↗',           href: 'https://linkedin.com/in/hardik-jaiswal', type: 'link' },
    { label: 'GitHub ↗',             href: 'https://github.com/GoDxVictoryRR', type: 'link' },
  ],
  footer: 'HARDIK JAISWAL © 2026',
}
```
