import React, { useState, useEffect } from 'react';
import { Code2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Engineering from './components/Engineering';
import Systems from './components/Systems';
import Footer from './components/Footer';
import Background from './components/Background';
import RotationalScroller from './components/RotationalScroller';
import Lenis from 'lenis';

// Import images to preload them
import cnetImg from './assets/cnet.png';
import aetherImg from './assets/aether-stock.png';
import constructImg from './assets/construct.png';
import lexAiImg from './assets/lex-ai.jpg';

const preloadImages = () => {
  const images = [cnetImg, aetherImg, constructImg, lexAiImg];
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const Preloader = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Total preloader duration: ~3.2s (animations complete) then fade out
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 3200);

    const removeTimer = setTimeout(() => {
      onComplete();
    }, 3800); // 3200 + 600ms fade-out

    // Terminal progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1; // 100 steps in ~3000ms (30ms interval)
      });
    }, 30);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  // Generate terminal-style ASCII progress bar
  const barLength = 20;
  const filledLength = Math.floor((progress / 100) * barLength);
  const terminalBar = `[${'█'.repeat(filledLength)}${'.'.repeat(barLength - filledLength)}]`;

  return (
    <div className={`preloader ${exiting ? 'preloader-exit' : ''}`}>
      <div className="preloader-content">
        <div className="preloader-name flex items-center justify-center gap-3">
          <Code2 className="text-crimson w-14 h-14 md:w-20 md:h-20 stroke-[2.5px] animate-pulse" />
          <div>YASH<span>.DEV</span></div>
        </div>
        <div className="preloader-tagline">
          AI Integration Developer
        </div>
        <div
          className="font-mono text-crimson text-xs md:text-sm tracking-[0.2em] mt-8 mb-3 whitespace-nowrap"
          style={{ animation: 'preloader-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1s both' }}
        >
          {terminalBar} {progress.toString().padStart(3, '0')}%
        </div>
        <div className="preloader-status">
          {progress < 100 ? 'Initializing Modules...' : 'System Ready.'}
        </div>
      </div>
    </div>
  );
};

const isMobileOrTablet = () => {
  const ua = navigator.userAgent;
  return /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone|Opera Mini|IEMobile/i.test(ua);
};

const RotateDevicePrompt = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-obsidian flex flex-col items-center justify-center text-center p-6 portrait:flex landscape:hidden lg:hidden">
      <div className="animate-pulse mb-6 relative">
        <div className="absolute inset-0 bg-crimson/20 blur-xl rounded-full"></div>
        <svg className="w-16 h-16 text-crimson relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11a2 2 0 100-4 2 2 0 000 4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 13v-2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5z" />
          {/* Arrow indicating rotation */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4l-4-4-4 4" className="origin-center rotate-90 translate-x-4 translate-y-4" />
        </svg>
      </div>
      <h2 className="font-display font-bold text-2xl text-white tracking-widest uppercase mb-4">Rotate Device</h2>
      <p className="text-gray-400 text-sm max-w-[250px]">
        For the optimal viewing experience, please rotate your phone to landscape mode.
      </p>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [showRotatePrompt, setShowRotatePrompt] = useState(false);

  useEffect(() => {
    preloadImages();
  }, []);

  useEffect(() => {
    const checkOrientation = () => {
      if (isMobileOrTablet()) {
        const isPortrait = window.innerHeight > window.innerWidth;
        setShowRotatePrompt(isPortrait);

        // Force desktop layout in landscape mode
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
          if (isPortrait) {
            viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0');
          } else {
            viewportMeta.setAttribute('content', 'width=1280');
          }
        }
      } else {
        setShowRotatePrompt(false);
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // hardware-accelerated smooth scrolling
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
    });

    window.lenis = lenis;

    // Pause scroll during preloader
    if (isLoading || showRotatePrompt) {
      lenis.stop();
    } else {
      lenis.start();
    }

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.lenis = null;
    };
  }, [isLoading, showRotatePrompt]);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      {showRotatePrompt && <RotateDevicePrompt />}
      <Background />
      <div className="grid-overlay"></div>
      <Navbar isLoading={isLoading} />
      <RotationalScroller isHidden={isInquiryOpen} isLoading={isLoading} />
      <main className="relative z-10">
        <Hero isLoading={isLoading} />
        <Engineering />
        <Systems />
        <Footer onInquiryOpenChange={setIsInquiryOpen} />
      </main>
    </>
  );
};

export default App;
