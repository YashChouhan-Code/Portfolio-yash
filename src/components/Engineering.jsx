import React, { useEffect, useRef } from 'react';

const Engineering = () => {
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = el => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    // 1. Scroll Reveal for headers using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -100px 0px", threshold: 0.01 }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // 2. Cards stacking logic (orientation-invariant offset top calculation)
    const cards = document.querySelectorAll('.tech-card-sticky');
    const getElementLayoutTop = (element, container) => {
      let top = 0;
      let current = element;
      while (current && current !== container && current !== document.documentElement && current !== document.body) {
        top += current.offsetTop;
        current = current.offsetParent;
      }
      return top;
    };

    const handleStacking = () => {
      const scrollContainer = document.getElementById('forced-landscape-wrapper') || document.documentElement;
      const scrollEl = document.getElementById('forced-landscape-wrapper') || window;
      const scrollTop = scrollEl === window ? (window.pageYOffset || document.documentElement.scrollTop) : scrollEl.scrollTop;

      cards.forEach((card, index) => {
        const cardLayoutTop = getElementLayoutTop(card, scrollContainer);
        const triggerTop = 140 + index * 40;

        if (scrollTop >= cardLayoutTop - triggerTop - 5) {
          card.classList.add('stacked');

          const activeIndex = Array.from(cards).filter(c => c.classList.contains('stacked')).length - 1;
          const diff = activeIndex - index;

          if (diff > 0) {
            const scaleValue = 1 - (diff * 0.03);
            const translateValue = diff * -8;
            card.style.transform = `scale(${scaleValue}) translateY(${translateValue}px)`;
            card.style.filter = `brightness(${1 - (diff * 0.15)}) blur(${diff * 0.5}px)`;
          } else {
            card.style.transform = 'scale(1) translateY(0px)';
            card.style.filter = 'brightness(1) blur(0px)';
          }
        } else {
          card.classList.remove('stacked');
          card.style.transform = 'scale(1) translateY(0px)';
          card.style.filter = 'brightness(1) blur(0px)';
        }
      });
    };

    const wrapper = document.getElementById('forced-landscape-wrapper');

    window.addEventListener("scroll", handleStacking);
    if (wrapper) {
      wrapper.addEventListener("scroll", handleStacking);
    }

    const handleResize = () => {
      handleStacking();
      const newWrapper = document.getElementById('forced-landscape-wrapper');
      if (newWrapper) {
        newWrapper.addEventListener("scroll", handleStacking);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    const timer = setTimeout(handleStacking, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("scroll", handleStacking);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      const currentWrapper = document.getElementById('forced-landscape-wrapper');
      if (currentWrapper) {
        currentWrapper.removeEventListener("scroll", handleStacking);
      }
    };
  }, []);

  return (
    <section id="engineering" className="pt-32 pb-6 px-6" aria-labelledby="engineering-heading">
      <div className="max-w-7xl mx-auto">

        <div ref={addToRefs} className="flex flex-col md:flex-row gap-12 items-start justify-between mb-10 reveal">
          <h2 id="engineering-heading" className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight w-full md:w-1/2">
            Engineering<br /><span className="text-crimson">Impact</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light w-full md:w-1/2 border-l border-crimson/30 pl-6">
            My technical stack is selected for uncompromising performance, scalability, and seamless integration of complex machine learning models into production-ready environments.
          </p>
        </div>

        <div className="stack-container">

          {/* Experience Block 1 */}
          <article className="tech-card tech-card-sticky card-1 p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-6 md:w-1/3">
              <div className="text-crimson font-display text-4xl md:text-5xl font-bold opacity-50" aria-hidden="true">01</div>
              <div>
                <h3 className="font-display text-lg md:text-xl font-bold uppercase text-white leading-tight">C-Net Infotech Pvt. Ltd.</h3>
                <span className="text-crimson font-mono text-xs tracking-wider block mt-1.5 uppercase">AI Integration Developer // Full-time</span>
              </div>
            </div>
            <p className="md:w-[45%] text-gray-400 text-sm leading-relaxed">
              Orchestrated production-ready AI tools, customized automated workflows, and deployed API integration solutions. Focused on debugging, testing, and system performance optimizations to scale web applications.
            </p>
            <div className="md:w-1/5 md:text-right flex flex-col md:items-end justify-start">
              <div className="text-white font-mono text-sm font-semibold tracking-wider">03/2026 – Present</div>
              <div className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-1">Bhopal</div>
            </div>
          </article>

          {/* Experience Block 2 */}
          <article className="tech-card tech-card-sticky card-2 p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-6 md:w-1/3">
              <div className="text-crimson font-display text-4xl md:text-5xl font-bold opacity-50" aria-hidden="true">02</div>
              <div>
                <h3 className="font-display text-lg md:text-xl font-bold uppercase text-white leading-tight">IMT Integrated Management & Tech.</h3>
                <span className="text-crimson font-mono text-xs tracking-wider block mt-1.5 uppercase">Frontend Developer // Full-time</span>
              </div>
            </div>
            <p className="md:w-[45%] text-gray-400 text-sm leading-relaxed">
              Engineered responsive React-based dashboards and interactive management interface components. Ensured optimal cross-browser compatibility and strict UI consistency across all layouts.
            </p>
            <div className="md:w-1/5 md:text-right flex flex-col md:items-end justify-start">
              <div className="text-white font-mono text-sm font-semibold tracking-wider">07/2025 – 01/2026</div>
              <div className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-1">Bhopal</div>
            </div>
          </article>

          {/* Experience Block 3 */}
          <article className="tech-card tech-card-sticky card-3 p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-6 md:w-1/3">
              <div className="text-crimson font-display text-4xl md:text-5xl font-bold opacity-50" aria-hidden="true">03</div>
              <div>
                <h3 className="font-display text-lg md:text-xl font-bold uppercase text-white leading-tight">R.K Solution</h3>
                <span className="text-crimson font-mono text-xs tracking-wider block mt-1.5 uppercase">Junior Technical Support Specialist // Intern</span>
              </div>
            </div>
            <p className="md:w-[45%] text-gray-400 text-sm leading-relaxed">
              Diagnosed hardware, software, and networking issues. Provided technical troubleshooting support, executed routine configuration tests, and maintained systems and records.
            </p>
            <div className="md:w-1/5 md:text-right flex flex-col md:items-end justify-start">
              <div className="text-white font-mono text-sm font-semibold tracking-wider">01/2025 – 06/2025</div>
              <div className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-1">Hybrid</div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
};

export default Engineering;
