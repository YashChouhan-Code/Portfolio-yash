import React, { useEffect, useRef } from 'react';
import { Layers, Database, Cloud } from 'lucide-react';
import { scrollTo } from '../utils';

const Hero = ({ isLoading }) => {
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = el => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Wait for preloader to finish before triggering reveals
    if (isLoading) return;

    // Staggered reveal after preloader completes
    const timers = revealRefs.current.map((el, index) => {
      return setTimeout(() => {
        if (el) {
          el.classList.add("active");
        }
      }, 300 + index * 400); // 300ms base delay + 400ms stagger per element for a distinct one-by-one effect
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [isLoading]);

  return (
    <>
      <section id="home" className="min-h-[100dvh] flex items-center pt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col justify-center">

          <div className="w-full md:w-2/3 space-y-6 z-20">
            <div ref={addToRefs} className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-crimson reveal">
              <span className="block w-8 h-[1px] bg-crimson"></span>
              AI Integration Developer
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-extrabold leading-[0.6] tracking-tight uppercase">
              <span ref={addToRefs} className="inline-block reveal">Engineering</span> <br />
              <span ref={addToRefs} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600 reveal">Digital</span>{' '}
              <span ref={addToRefs} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600 reveal">Materiel</span>
            </h1>

            <p ref={addToRefs} className="text-gray-400 text-lg md:text-xl max-w-xl font-light reveal delay-200 border-l border-white/10 pl-6">
              Architecting hyper-scalable web infrastructure and deeply integrated AI systems with a focus on precision, performance, and reliability.
            </p>
          </div>

          {/* Right side 3D element target area (Visual balance) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[80vh] pointer-events-none hidden md:block">
            {/* The Three.js sphere will naturally occupy this space due to camera framing */}
          </div>

        </div>
      </section>

      {/* 3-Row Data Feed & Controls */}
      <div id="toolkit" className="scroll-mt-20 w-full border-t border-b border-white/5 bg-carbon/80 backdrop-blur-md flex flex-col z-30 relative">

        {/* Row 1: Technologies */}
        <div className="flex flex-col md:flex-row border-b border-white/5">
          <div className="w-full md:w-[325px] flex-shrink-0 border-b md:border-b-0 md:border-r border-white/5 flex items-center p-4 md:p-6">
            <a href="#technologies" className="btn-crimson w-full flex justify-between items-center text-xs md:text-sm font-bold tracking-wider !py-4 !px-6">
              <span>Technologies</span> <Layers className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
          <div className="flex-grow overflow-hidden flex items-center py-4 md:py-0">
            <div className="whitespace-nowrap flex animate-marquee" style={{ animationDuration: '45s' }}>
              <MarqueeContent items={['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS', 'MySQL', 'PostgreSQL', 'SQLite', 'MongoDB']} />
            </div>
          </div>
        </div>

        {/* Row 2: Libraries & Frameworks */}
        <div className="flex flex-col md:flex-row border-b border-white/5">
          <div className="w-full md:w-[325px] flex-shrink-0 border-b md:border-b-0 md:border-r border-white/5 flex items-center p-4 md:p-6">
            <a href="#frameworks" className="btn-crimson w-full flex justify-between items-center text-xs md:text-sm font-bold tracking-wider !py-4 !px-6">
              <span>Libraries & Frameworks</span> <Database className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
          <div className="flex-grow overflow-hidden flex items-center py-4 md:py-0">
            <div className="whitespace-nowrap flex animate-marquee" style={{ animationDirection: 'reverse', animationDuration: '45s' }}>
              <MarqueeContent items={['React.js', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'React Native', 'Pandas', 'Three.js']} />
            </div>
          </div>
        </div>

        {/* Row 3: AI Tools & Productivity */}
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[325px] flex-shrink-0 border-b md:border-b-0 md:border-r border-white/5 flex items-center p-4 md:p-6">
            <a href="#ai-tools" className="btn-crimson w-full flex justify-between items-center text-xs md:text-sm font-bold tracking-wider !py-4 !px-6">
              <span>AI Tools & Productivity</span> <Cloud className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
          <div className="flex-grow overflow-hidden flex items-center py-4 md:py-0">
            <div className="whitespace-nowrap flex animate-marquee" style={{ animationDuration: '45s' }}>
              <MarqueeContent items={['LLM API Integration', 'LangChain', 'RAG Pipelines', 'Vector Search', 'Prompt Engineering', 'OpenAI', 'Gemini', 'Claude']} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MarqueeContent = ({ items }) => (
  <>
    <div className="flex gap-12 text-sm md:text-base font-bold tracking-[0.2em] text-gray-500 uppercase px-6">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <span className={i % 2 === 0 ? 'text-white' : 'text-crimson'}>{item}</span>
          <span aria-hidden="true">//</span>
        </React.Fragment>
      ))}
    </div>
    {/* Duplicate for infinite scroll */}
    <div className="flex gap-12 text-sm md:text-base font-bold tracking-[0.2em] text-gray-500 uppercase px-6" aria-hidden="true">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <span className={i % 2 === 0 ? 'text-white' : 'text-crimson'}>{item}</span>
          <span>//</span>
        </React.Fragment>
      ))}
    </div>
  </>
);

export default Hero;
