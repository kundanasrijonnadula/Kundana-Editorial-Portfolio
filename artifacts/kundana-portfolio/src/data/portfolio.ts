export type Project = {
  id: string;
  number: string;
  title: string;
  description: string;
  category: string;
  status: string;
  technologies: string[];
  codeUrl: string;
  demoUrl: string;
  featured: boolean;
  imageLabel: string;
  imageNote: string;
};

// Replace the bracketed values below when real project and contact details are ready.
export const portfolio = {
  name: 'J. Kundana Shanmukha Lakshmi',
  shortName: 'J. Kundana',
  role: 'Student & Aspiring Developer',
  intro:
    'A curious student exploring technology, creativity, and problem-solving through code, design, and hands-on projects.',
  about: [
    'Hi, I’m J. Kundana Shanmukha Lakshmi, a curious and enthusiastic student with a strong interest in technology, creativity, and problem-solving. I enjoy exploring new ideas and turning them into meaningful digital experiences through code and design.',
    'I’m particularly interested in learning new technologies, building projects, and understanding how things work behind the scenes. I believe the best way to learn is by creating, experimenting, and occasionally spending a little too long figuring out why the code worked yesterday but not today!',
    'I’m continuously learning, improving my skills, and exploring new possibilities—one project, one idea, and one bug at a time.',
  ],
  highlights: ['Student', 'Curious Learner', 'Still Learning', 'Creative Problem Solver'],
  skills: [
    { title: 'Programming', items: ['Python', 'Java'] },
    { title: 'Web Development', items: ['HTML', 'CSS'] },
    { title: 'Tools', items: ['Figma', 'Vercel', 'Android Studio', 'VS Code'] },
  ],
  contact: {
    email: 'lakshmi.25bca7254@vitapstudent.ac.in',
    emailHref: 'mailto:lakshmi.25bca7254@vitapstudent.ac.in',
    phone: '[Add Phone Number]',
    phoneHref: 'tel:',
    location: ['VIT-AP University', 'Andhra Pradesh, India'],
    linkedin: '[Add LinkedIn URL]',
    linkedinHref: '#',
    github: '[Add GitHub URL]',
    githubHref: '#',
    responseTime: '[Add Typical Response Time]',
  },
};

export const projects: Project[] = [
  {
    id: 'main-01',
    number: '01',
    title: '[Add Project Name]',
    description: '[Add Project Description]',
    category: '[Add Project Category]',
    status: 'In progress',
    technologies: ['[Add Technology]', '[Add Technology]'],
    codeUrl: '#',
    demoUrl: '#',
    featured: true,
    imageLabel: 'PROJECT IMAGE',
    imageNote: '[Add Project Image]',
  },
  {
    id: 'main-02',
    number: '02',
    title: '[Add Project Name]',
    description: '[Add Project Description]',
    category: '[Add Project Category]',
    status: 'Coming soon',
    technologies: ['[Add Technology]', '[Add Technology]'],
    codeUrl: '#',
    demoUrl: '#',
    featured: true,
    imageLabel: 'PROJECT IMAGE',
    imageNote: '[Add Project Image]',
  },
  {
  id: 'mini-01',
  number: '03',
  title: 'ROCK-PAPER-SCISSORS',
  description:
    'A fun interactive Rock-Paper-Scissors game where players compete against the computer with a simple and engaging interface.',
  category: 'Web Development',
  status: 'Live',
  technologies: ['HTML', 'CSS', 'JavaScript'],
  codeUrl: '#',
  demoUrl: 'https://rock-paper-scissors-9d2s-olive.vercel.app',
  featured: false,
  imageLabel: 'ROCK-PAPER-SCISSORS',
  imageNote: 'rock-paper-scissors-neon-icons.jpg',
},
  {
    id: 'mini-02',
    number: '04',
    title: '[Add Mini Project Name]',
    description: '[Add Project Description]',
    category: '[Add Project Category]',
    status: 'Draft',
    technologies: ['[Add Technology]'],
    codeUrl: '#',
    demoUrl: '#',
    featured: false,
    imageLabel: 'PROJECT IMAGE',
    imageNote: '[Add Project Image]',
  },
  {
    id: 'mini-03',
    number: '05',
    title: '[Add Mini Project Name]',
    description: '[Add Project Description]',
    category: '[Add Project Category]',
    status: 'Draft',
    technologies: ['[Add Technology]'],
    codeUrl: '#',
    demoUrl: '#',
    featured: false,
    imageLabel: 'PROJECT IMAGE',
    imageNote: '[Add Project Image]',
  },
];
