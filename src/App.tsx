import { useCallback, useMemo, useRef, useState } from 'react';
import { NAV, type Project } from './content';
import { useReveal } from './hooks/useReveal';
import { useScrollSpy } from './hooks/useScrollSpy';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Stack } from './components/Stack';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectGallery } from './components/ProjectGallery';

const SECTION_IDS = NAV.map((n) => n.id);

export default function App() {
  const activeId = useScrollSpy(SECTION_IDS);
  const sectionIds = useMemo(() => SECTION_IDS, []);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useReveal();

  const handleOpen = useCallback((project: Project) => {
    returnFocusRef.current = (document.activeElement as HTMLElement) ?? null;
    setOpenProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setOpenProject(null);
    returnFocusRef.current?.focus();
    returnFocusRef.current = null;
  }, []);

  // sections used for scroll-spy must keep their ids; keep a ref so lint is happy
  void sectionIds;

  return (
    <>
      <div className="grid-lines" aria-hidden="true" />
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-[var(--accent)] focus:text-[var(--bg)] focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
      >
        Skip to projects
      </a>

      <Navigation activeId={activeId} />

      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Stack />
        <Projects onOpen={handleOpen} />
        <Experience />
        <Contact />
      </main>

      <Footer />

      <ProjectGallery project={openProject} onClose={handleClose} />
    </>
  );
}