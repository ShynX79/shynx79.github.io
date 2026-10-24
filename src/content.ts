/**
 * Single source of all page content.
 * Updated with Muhammad Toti Kurniawan's CV data.
 */

export const SITE = {
  wordmark: 'mtoti.dev',
  title: 'Muhammad Toti Kurniawan — Software Engineer',
  description:
    'Informatics graduate building fullstack web applications with React.js, Next.js, and Node.js.',
  email: 'mtotikurniawan@gmail.com',
  resumeUrl: 'resume.pdf',
  ogImage: 'og.png',
} as const;

export const NAV = [
  { id: 'about', label: '01 about' },
  { id: 'stack', label: '02 stack' },
  { id: 'work', label: '03 work' },
  { id: 'log', label: '04 experience' },
  { id: 'contact', label: '05 contact' },
] as const;

export interface HeroPanelRow {
  key: string;
  value: string;
  live?: 'clock' | 'status';
}

export const HERO = {
  prompt: '$ whoami',
  name: 'Muhammad Toti Kurniawan',
  role: 'Software Engineer (Fullstack / Backend)',
  summary:
    'Informatics graduate building fullstack web applications with React.js, Next.js, and Node.js.',
  primaryCta: 'View projects ->',
  secondaryCta: '$ cat resume.pdf',
  resumeUrl: 'resume.pdf',
  photo: {
    src: 'profile.jpg',
    alt: 'Muhammad Toti Kurniawan',
    width: 960,
    height: 1280,
  },
  panel: [
    { key: 'name', value: 'Muhammad Toti Kurniawan' },
    { key: 'role', value: 'Software Engineer' },
    { key: 'email', value: 'mtotikurniawan@gmail.com' },
    { key: 'phone', value: '+62 851-7429-9592' },
    { key: 'location', value: 'Padalarang, West Java (UTC+7)', live: 'clock' },
    { key: 'status', value: 'open to work', live: 'status' },
  ] as HeroPanelRow[],
} as const;

export interface EducationEntry {
  program: string;
  school: string;
  date: string;
  note?: string;
}

export const ABOUT = {
  path: '~/about',
  body: "Informatics graduate (GPA 3.12/4.00) with hands-on experience building fullstack web applications using React.js, Next.js, and Node.js. Built REST APIs, implemented authentication middleware, and designed database schemas with MySQL, Supabase, and Firebase across company, government, and academic projects. Seeking a Junior Fullstack Developer or Junior Backend Developer role.",
  education: [
    { program: 'B.Sc. in Informatics', school: 'Universitas Jenderal Achmad Yani', date: 'Sep 2022 - 2026', note: 'GPA 3.12/4.00' },
    { program: 'High School Diploma, Science', school: 'SMA Negeri 2 Padalarang', date: 'Jul 2019 - May 2022' },
  ] as EducationEntry[],
  certifications: [
    'Certificate of Completion: Backend Developer — ATMOS Education (Jul 2026, Ref: 007/SF/ATMOS/VII/2026)',
    '"Unlocking Educational Potential with AI" Webinar — Day of AI Indonesia x Universitas Jenderal Achmad Yani (Jun 2026)',
  ] as string[],
};

export const STACK_GROUPS = [
    {
      title: 'FRONTEND',
      items: ['React.js', 'Next.js', 'Vue.js', 'Vite', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    },
    {
      title: 'BACKEND',
      items: ['Node.js', 'REST API', 'Swagger', 'Authentication Middleware'],
    },
    {
      title: 'DATABASES',
      items: ['MySQL', 'Supabase', 'Firebase'],
    },
    {
      title: 'TOOLS',
      items: ['Git', 'GitHub', 'GitLab'],
    },
  ] as const;

export const STACK = {
  path: '~/stack',
  count: `${STACK_GROUPS.reduce((n, g) => n + g.items.length, 0)} skills`,
  groups: STACK_GROUPS,
} as const;

export interface Screenshot {
  src: string;
  caption: string;
}

export interface Project {
  slug: string;
  index: string;
  year: string;
  name: string;
  description: string;
  metric: string;
  stack: string;
  liveUrl: string;
  sourceUrl: string;
  screenshots: Screenshot[];
}

const shots = (slug: string, captions: string[]): Screenshot[] =>
  captions.map((caption, i) => ({
    src: `projects/${slug}/${i + 1}.jpg`,
    caption,
  }));

export const PROJECTS: Project[] = [
  {
    slug: 'ndaru-farm',
    index: '01',
    year: 'Nov 2025 - Feb 2026',
    name: 'Ndaru Farm',
    description: "Fullstack farm management web platform built for thesis project. Includes user profile pages and product catalog with responsive interface. Connected frontend to backend data flows for end-to-end product information and account settings management.",
    metric: 'Thesis Project • Vercel Deploy',
    stack: 'React.js, Next.js, Tailwind CSS',
    liveUrl: 'https://ndaru-farm-frontend.vercel.app',
    sourceUrl: 'https://github.com/ShynX79',
    screenshots: shots('ndaru-farm', [
      'User profile dashboard with account settings',
      'Product catalog with filtering and search',
      'Responsive mobile layout for farm management',
      'Backend API integration status panel',
    ]),
  },
  {
    slug: 'BULOG',
    index: '02',
    year: 'Jul 2026 - Aug 2026',
    name: 'BULOG Rice Stock Dashboard',
    description: "Interactive dashboard for BULOG rice stock visualization. Digitized and displayed rice distribution data with real-time updates and responsive UI for government stakeholders.",
    metric: 'Government Project • Data Viz',
    stack: 'Vue.js, Vite',
    liveUrl: 'https://github.com/ShynX79',
    sourceUrl: 'https://github.com/ShynX79',
    screenshots: shots('BULOG', [
      'Rice stock overview dashboard',
      'Distribution map with regional breakdown',
      'Inventory tracking and alerts panel',
      'Real-time data synchronization log',
      'Responsive mobile view for field officers',
      'Government stakeholder report view',
    ]),
  },
  {
    slug: 'digibooks',
    index: '03',
    year: 'May 2023 - Jun 2023',
    name: 'DIGIBOOKS',
    description: "Academic project for responsive digital comic catalog website. Enables reading and managing digital comic collections with optimized loading and smooth browsing experience.",
    metric: 'Academic Project • May-Jun 2023',
    stack: 'HTML, CSS',
    liveUrl: 'https://github.com/ShynX79/digibooks',
    sourceUrl: 'https://github.com/ShynX79/digibooks',
    screenshots: shots('digibooks', [
      'Comic catalog homepage with featured covers',
      'Reading interface with chapter navigation',
      'User library with collection management',
    ]),
  },
  {
    slug: 'atmos-skd-skb',
    index: '04',
    year: 'Mar 2026 - Jul 2026',
    name: 'ATMOS Education (BMKG Project)',
    description: "Centralized exam and information system (SKD & SKB) for government assessment. Developed structured REST API endpoints with authentication middleware and account management features. Resolved complex development tickets including 502 error handling and soft-delete logic.",
    metric: 'Government Project • Backend Focus',
    stack: 'Node.js, React.js, Next.js, REST API, GitHub',
    liveUrl: 'https://github.com/ShynX79/atmos-skd-skb',
    sourceUrl: 'https://github.com/ShynX79/atmos-skd-skb',
    screenshots: shots('atmos-skd-skb', [
      'Exam dashboard with candidate statistics',
    ]),
  },
];

export const PROJECTS_META = { path: '~/projects', count: `${PROJECTS.length} projects` } as const;

export interface LogEntry {
  hash: string;
  head?: boolean;
  role: string;
  company: string;
  date: string;
  lines: string[];
}

export const LOG: LogEntry[] = [
  {
    hash: 'a8f3e21',
    head: true,
    role: 'Backend Developer',
    company: 'ATMOS Education (Project for BMKG)',
    date: 'Mar 2026 - Jul 2026',
    lines: [
      'Developed structured REST API endpoints and backend features for centralized exam system',
      'Implemented authentication middleware and account management modules',
      'Resolved 502 error handling and soft-delete database logic issues',
    ],
  },
  {
    hash: 'b7c4d92',
    role: 'Fullstack Developer',
    company: 'Universitas Jenderal Achmad Yani',
    date: 'Jul 2026 - Aug 2026',
    lines: [
      'Designed and built interactive dashboard for BULOG rice stock visualization',
      'Digitized and displayed rice distribution data with real-time updates',
      'Created responsive UI for government stakeholders',
    ],
  },
  {
    hash: 'c6d5e83',
    role: 'Backend Developer Intern',
    company: 'PT Cipta Niaga Gas Indonesia',
    date: 'Aug 2025 - Sep 2025',
    lines: [
      'Designed backend logic and database architecture for web-based monitoring system',
      'Developed structured REST APIs for reliable data connectivity',
      'Implemented secure authentication for company internal users',
    ],
  },
];

export const LOG_META = { path: '~/log', command: '$ git log --oneline' } as const;

export const CONTACT = {
  path: '~/contact',
  command: '$ ./contact --email',
  copyLabel: '[copy email]',
  copiedLabel: '[copied!]',
  links: [
    { label: 'github.com/ShynX79', href: 'https://github.com/ShynX79' },
    { label: 'linkedin.com/in/muhammad-toti-kurniawan', href: 'https://www.linkedin.com/in/muhammad-toti-kurniawan-403762335' },
    { label: 'mtotikurniawan@gmail.com', href: 'mailto:mtotikurniawan@gmail.com' },
  ],
  note: 'Open to Junior Fullstack Developer or Junior Backend Developer positions.',
} as const;

export const avif = (src: string) => src.replace(/\.jpe?g$/i, '.avif');

export const FOOTER = {
  copyright: '© 2026 Muhammad Toti Kurniawan',
  status: 'open to opportunities',
} as const;