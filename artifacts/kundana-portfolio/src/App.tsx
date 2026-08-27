import { useEffect, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { placeholderProjectImage, portfolio, projects, type Project } from '@/data/portfolio';

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div className="mono-label flex items-center gap-3 text-[#77716a]">
      <span className="text-[#9b3a32]">{number}</span>
      <span>{children}</span>
      <span className="h-px flex-1 bg-[#111111]/25" />
    </div>
  );
}

function ArrowLink({
  href,
  children,
  className = '',
  target,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
}) {
  const isPlaceholder = href === '#';
  return (
    <a
      className={`arrow-link group inline-flex items-center gap-2 text-sm font-semibold text-[#111111] transition-colors hover:text-[#9b3a32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b3a32] ${className}`}
      href={href}
      target={target}
      rel={target ? 'noreferrer' : undefined}
      onClick={(event) => {
        if (isPlaceholder) event.preventDefault();
      }}
      aria-label={isPlaceholder ? `${children} placeholder link` : undefined}
    >
      <span>{children}</span>
      <ArrowUpRight className="arrow h-4 w-4 stroke-[1.5]" aria-hidden="true" />
    </a>
  );
}

function EditorialButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="arrow-link inline-flex items-center gap-3 border border-[#111111] px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.13em] transition-colors hover:bg-[#111111] hover:text-[#f4f1ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b3a32]"
    >
      {children}
      <ArrowRight className="arrow h-4 w-4 stroke-[1.5]" aria-hidden="true" />
    </a>
  );
}

function PlaceholderMedia({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className={`project-media border border-[#111111] ${compact ? 'aspect-[1.55]' : 'aspect-[1.45]'}`}>
      <div className="project-media-inner absolute inset-0">
        <img
          src={project.imageSrc ?? placeholderProjectImage}
          alt={project.imageSrc ? `${project.title} project preview` : 'Editorial coding pattern placeholder'}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#111111]/20 pt-4">
      <ArrowLink href={project.codeUrl}>View Code</ArrowLink>
      <ArrowLink href={project.demoUrl}>Live Demo</ArrowLink>
    </div>
  );
}

function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <article className="project-card group">
      <PlaceholderMedia project={project} compact={compact} />
      <div className="mt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="mono-label text-[#9b3a32]">{project.status}</span>
          <span className="mono-label text-[#77716a]">{project.category}</span>
        </div>
        <h3 className="project-title display mt-3 text-3xl leading-[0.98] transition-colors">{project.title}</h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-[#5e5e5e]">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.11em] text-[#77716a]">
          {project.technologies.map((tech, index) => (
            <span key={`${project.id}-${index}`}>{tech}{index < project.technologies.length - 1 ? ' /' : ''}</span>
          ))}
        </div>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = ['about', 'projects', 'contact']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0.1, 0.4, 0.8] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const mainProjects = projects.filter((project) => project.featured);
  const miniProjects = projects.filter((project) => !project.featured);

  return (
    <main className="editorial-shell min-h-[100dvh]">
      <header className="sticky top-0 z-20 border-b border-[#111111] bg-[#f4f1ea]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10 lg:px-14">
          <a href="#top" className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9b3a32]" aria-label="Back to top">
            <span className="flex h-7 w-7 items-center justify-center border border-[#111111] text-[0.68rem] font-bold">JK</span>
            <span className="hidden text-[0.67rem] font-bold uppercase tracking-[0.11em] sm:inline">{portfolio.name}</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {['about', 'projects', 'contact'].map((item) => (
              <button
                type="button"
                key={item}
                className="nav-link mono-label py-1 text-[#5e5e5e] transition-colors hover:text-[#111111]"
                aria-current={activeSection === item ? 'true' : undefined}
                onClick={() => goTo(item)}
              >
                {item}
              </button>
            ))}
          </nav>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center border border-[#111111] md:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#111111]/25 px-5 py-5 md:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-4">
              {['about', 'projects', 'contact'].map((item) => (
                <button type="button" key={item} className="mono-label text-left text-[#5e5e5e]" onClick={() => goTo(item)}>
                  {item}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      <div id="top" className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        <section className="grid min-h-[calc(100dvh-68px)] items-center border-b border-[#111111] py-16 md:grid-cols-[minmax(0,1fr)_230px] md:gap-12 md:py-20 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20">
          <div className="reveal">
            <div className="mono-label mb-10 flex items-center gap-3 text-[#77716a]">
              <span className="h-px w-10 bg-[#9b3a32]" />
              Personal portfolio / 2026
            </div>
            <h1 className="display max-w-5xl text-[clamp(2.5rem,8vw,7.75rem)] leading-[0.9] text-[#111111]">
              <span className="block">J. KUNDANA</span>
              <span className="block text-[#111111]">SHANMUKHA</span>
              <span className="block">LAKSHMI</span>
            </h1>
            <div className="mt-12 grid max-w-3xl gap-8 border-t border-[#111111] pt-6 sm:grid-cols-[1fr_1.35fr] sm:gap-12">
              <p className="mono-label leading-5 text-[#9b3a32]">{portfolio.role}</p>
              <p className="max-w-md text-base leading-7 text-[#5e5e5e]">{portfolio.intro}</p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <EditorialButton href="#projects">View Projects</EditorialButton>
              <EditorialButton href="#contact">Get in Touch</EditorialButton>
            </div>
          </div>
          <aside className="reveal reveal-delay-2 mt-16 grid grid-cols-2 gap-y-8 border-l border-[#111111] pl-5 md:mt-0 md:grid-cols-1 md:gap-y-10" aria-label="Personal notes">
            <div>
              <span className="mono-label text-[#77716a]">01</span>
              <p className="mt-2 font-serif text-2xl">Student</p>
            </div>
            <div>
              <span className="mono-label text-[#77716a]">02</span>
              <p className="mt-2 font-serif text-2xl">Curious Learner</p>
            </div>
            <div>
              <span className="mono-label text-[#77716a]">03</span>
              <p className="mt-2 font-serif text-2xl">Always Exploring</p>
            </div>
            <div className="col-span-2 mt-3 flex items-center gap-3 border-t border-[#111111]/25 pt-5 md:col-span-1">
              <ArrowDown className="h-4 w-4 text-[#9b3a32]" aria-hidden="true" />
              <span className="mono-label text-[#77716a]">Read the story</span>
            </div>
          </aside>
        </section>

        <section id="about" className="scroll-mt-24 border-b border-[#111111] py-24 md:py-32">
          <SectionLabel number="01">About</SectionLabel>
          <div className="mt-12 grid gap-14 md:grid-cols-[0.82fr_1.5fr] md:gap-20 lg:grid-cols-[0.72fr_1.65fr] lg:gap-28">
            <h2 className="display max-w-sm text-5xl leading-[0.95] text-[#9b3a32] sm:text-6xl lg:text-7xl">Who Am I, Really?</h2>
            <div>
              <div className="grid gap-6 text-[1.02rem] leading-8 text-[#5e5e5e] md:grid-cols-2 md:gap-x-12">
                <div className="space-y-6">
                  <p>{portfolio.about[0]}</p>
                  <p>{portfolio.about[1]}</p>
                </div>
                <div className="space-y-6">
                  <p>{portfolio.about[2]}</p>
                  <div className="border-l-2 border-[#9b3a32] pl-5 font-serif text-2xl leading-tight text-[#111111]">
                    Learning by making, one project, one idea, and one bug at a time.
                  </div>
                </div>
              </div>
              <button type="button" className="arrow-link mt-10 inline-flex items-center gap-2 border-b border-[#111111] pb-2 text-sm font-semibold" onClick={() => goTo('skills')}>
                Know More About Me <ArrowRight className="arrow h-4 w-4 stroke-[1.5]" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div id="skills" className="mt-24 scroll-mt-24 border-t border-[#111111] pt-8">
            <SectionLabel number="02">Skills</SectionLabel>
            <div className="mb-8 flex items-baseline justify-between gap-5">
              <h3 className="display text-4xl">What I Know So Far</h3>
              <span className="mono-label hidden text-[#77716a] sm:block">A working inventory / 2026</span>
            </div>
            <div className="grid border-y border-[#111111] md:grid-cols-3">
              {portfolio.skills.map((skill, index) => (
                <div key={skill.title} className={`py-7 md:px-7 ${index > 0 ? 'border-t border-[#111111] md:border-l md:border-t-0' : 'md:pl-0 md:pr-7'}`}>
                  <span className="mono-label text-[#9b3a32]">0{index + 1}</span>
                  <h4 className="display mt-5 text-3xl">{skill.title}</h4>
                  <ul className="mt-7 space-y-3">
                    {skill.items.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-[#5e5e5e]"><span className="h-1 w-1 rounded-full bg-[#9b3a32]" />{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 border-b border-[#111111] py-24 md:py-32">
          <SectionLabel number="03">Projects</SectionLabel>
          <div className="mt-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="display max-w-xl text-6xl leading-[0.86] sm:text-7xl">Work in progress,<br /><em className="text-[#9b3a32]">ideas in motion.</em></h2>
            <p className="max-w-xs text-sm leading-6 text-[#5e5e5e]">A living archive of experiments, builds, and things still finding their shape.</p>
          </div>

          <div className="mt-20">
            <div className="mb-8 flex items-center gap-4 border-b border-[#111111] pb-3">
              <h3 className="mono-label text-[#111111]">Main Projects</h3>
              <span className="font-mono text-xs text-[#77716a]">/ 02</span>
            </div>
            <div className="grid gap-14 md:grid-cols-2 md:gap-x-8 lg:gap-x-16">
              {mainProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          </div>

          <div className="mt-24">
            <div className="mb-8 flex items-center gap-4 border-b border-[#111111] pb-3">
              <h3 className="mono-label text-[#111111]">Mini Projects</h3>
              <span className="font-mono text-xs text-[#77716a]">/ 03</span>
            </div>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {miniProjects.map((project) => <ProjectCard key={project.id} project={project} compact />)}
            </div>
          </div>

          <div className="mt-20 border-t border-[#111111] pt-7">
            <ArrowLink href="#">View More Projects</ArrowLink>
            <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[#77716a]">[Add Projects Page or GitHub Link]</p>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-24 md:py-32">
          <SectionLabel number="04">Contact</SectionLabel>
          <div className="mt-12 grid gap-16 md:grid-cols-[1.2fr_0.8fr] md:gap-20">
            <div>
              <h2 className="display max-w-2xl text-7xl leading-[0.83] sm:text-8xl">Get in<br /><em className="text-[#9b3a32]">Touch.</em></h2>
              <p className="mt-9 max-w-md text-base leading-7 text-[#5e5e5e]">I'm always open to learning, collaborating, and discussing new ideas and interesting projects.</p>
              <div className="mt-12 grid border-y border-[#111111] sm:grid-cols-2">
                <div className="border-b border-[#111111] py-6 sm:border-b-0 sm:border-r sm:pr-7">
                  <span className="mono-label text-[#77716a]">Email</span>
                  <p className="mt-4 font-serif text-2xl break-words">{portfolio.contact.email}</p>
                  <ArrowLink href={portfolio.contact.emailHref} className="mt-5">Send a Message</ArrowLink>
                </div>
                <div className="py-6 sm:pl-7">
                  <span className="mono-label text-[#77716a]">Mobile</span>
                  <p className="mt-4 font-serif text-2xl">{portfolio.contact.phone}</p>
                  <ArrowLink href={portfolio.contact.phoneHref} className="mt-5">Call Now</ArrowLink>
                </div>
              </div>
              <div className="mt-7">
                <span className="mono-label text-[#77716a]">Location</span>
                <p className="mt-4 font-serif text-2xl leading-tight">{portfolio.contact.location[0]}<br />{portfolio.contact.location[1]}</p>
              </div>
            </div>
            <div className="border-t border-[#111111] pt-7 md:mt-32">
              <span className="mono-label text-[#9b3a32]">A small open door</span>
              <h3 className="display mt-5 text-5xl leading-[0.92]">Let's Connect</h3>
              <div className="mt-10 space-y-5 border-y border-[#111111] py-6">
                <ArrowLink href={portfolio.contact.linkedinHref} target={portfolio.contact.linkedinHref !== '#' ? '_blank' : undefined}>LinkedIn <span className="font-mono text-[0.62rem] font-normal text-[#77716a]">{portfolio.contact.linkedin}</span></ArrowLink>
                <ArrowLink href={portfolio.contact.githubHref} target={portfolio.contact.githubHref !== '#' ? '_blank' : undefined}>GitHub <span className="font-mono text-[0.62rem] font-normal text-[#77716a]">{portfolio.contact.github}</span></ArrowLink>
              </div>
              <p className="text-sm text-[#5e5e5e]">Prefer a direct email?</p>
              <EditorialButton href={portfolio.contact.emailHref}>Send an Email</EditorialButton>
              <p className="mt-7 border-t border-[#111111]/20 pt-4 font-mono text-[0.63rem] uppercase tracking-[0.11em] text-[#77716a]">Typical response: {portfolio.contact.responseTime}</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-[#111111]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-[#77716a]">© 2026 {portfolio.name}. All rights reserved.</p>
          <nav className="flex gap-6" aria-label="Footer navigation">
            {['about', 'projects', 'contact'].map((item) => (
              <button type="button" key={item} className="mono-label text-[#5e5e5e] transition-colors hover:text-[#9b3a32]" onClick={() => goTo(item)}>{item}</button>
            ))}
          </nav>
        </div>
      </footer>
    </main>
  );
}

export default App;