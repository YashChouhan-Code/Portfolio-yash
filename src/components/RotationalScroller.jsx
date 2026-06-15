import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Home, Mail, Hexagon } from 'lucide-react';
import { scrollTo } from '../utils';

// Custom SVG Icons defined as React Components so they scale and colorize correctly
const ToolkitIcon = ({ className }) => (
  <svg
    viewBox="0 0 860 972"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(0,972) scale(0.1,-0.1)" stroke="none">
      <path d="M1435 9284 c-117 -21 -256 -60 -338 -94 -79 -33 -209 -109 -214 -125 -1 -5 91 -71 205 -146 114 -75 297 -196 407 -268 125 -82 205 -142 214 -158 19 -37 9 -189 -18 -266 -39 -112 -83 -179 -181 -278 -113 -113 -183 -163 -220 -154 -13 4 -85 40 -160 82 -139 78 -306 170 -563 313 -82 45 -154 80 -161 77 -12 -5 -55 -135 -77 -232 -17 -78 -14 -278 6 -370 22 -107 80 -245 140 -334 89 -135 247 -276 392 -349 91 -47 197 -72 451 -107 264 -37 681 -97 809 -116 39 -6 74 -17 77 -24 2 -7 -28 -41 -67 -76 -277 -246 -944 -858 -993 -912 -120 -131 -174 -256 -182 -423 -6 -142 11 -202 182 -629 155 -387 352 -884 409 -1030 19 -49 92 -234 162 -410 199 -503 215 -548 215 -596 0 -52 -76 -281 -354 -1073 -86 -244 -86 -246 14 -304 130 -76 170 -89 466 -156 482 -108 547 -117 1404 -186 135 -11 347 -29 472 -40 301 -27 334 -26 352 2 13 21 80 237 261 848 101 339 155 472 243 595 104 147 503 630 517 627 6 -1 12 -129 16 -344 5 -310 8 -351 28 -423 97 -356 471 -700 903 -830 152 -46 261 -58 481 -52 215 5 307 21 491 82 91 30 284 120 341 158 l37 25 -38 27 c-54 37 -496 328 -743 488 -112 73 -210 142 -219 155 -24 37 -12 236 21 337 56 171 174 329 341 459 98 76 116 86 156 86 32 0 55 -12 765 -404 344 -191 308 -187 354 -41 106 329 50 696 -152 995 -113 167 -316 341 -490 420 -127 57 -217 73 -1054 184 -201 26 -227 35 -324 114 l-57 47 0 125 c0 145 -18 215 -79 319 -122 205 -377 296 -636 226 -88 -24 -91 -20 -47 56 126 214 126 427 1 606 -65 92 -137 155 -229 200 l-76 38 -136 0 c-125 -1 -141 -3 -217 -32 -46 -16 -83 -28 -83 -25 0 3 18 33 39 66 90 139 133 301 113 428 -23 151 -149 326 -282 390 -160 79 -350 78 -511 -2 -32 -16 -59 -27 -59 -24 0 2 18 28 41 56 177 225 171 516 -15 716 -74 79 -127 116 -212 148 -91 34 -190 41 -295 20 -113 -23 -193 -68 -313 -174 -54 -48 -105 -91 -113 -97 -11 -8 -27 4 -71 51 -70 76 -115 150 -150 246 -26 72 -27 78 -32 393 -6 298 -8 325 -29 390 -68 208 -203 374 -424 524 -138 93 -300 159 -455 186 -107 19 -349 18 -457 -1z m500 -198 c300 -76 579 -316 661 -566 15 -46 18 -97 20 -320 1 -146 5 -296 9 -335 14 -141 75 -279 173 -387 21 -24 53 -62 71 -86 29 -37 32 -45 20 -56 -8 -7 -133 -120 -278 -251 l-264 -239 -19 28 c-11 14 -32 33 -47 40 -14 8 -258 46 -541 85 -651 91 -669 94 -759 137 -231 108 -400 311 -462 552 -25 97 -25 312 0 312 4 0 171 -91 371 -201 215 -119 380 -203 401 -206 42 -6 82 12 184 85 197 140 323 299 388 492 30 91 31 101 31 251 0 133 -3 161 -18 184 -10 15 -151 116 -314 224 -350 231 -318 209 -311 215 9 9 183 56 244 66 108 16 328 5 440 -24z m1791 -1520 c29 -14 75 -45 102 -70 153 -143 157 -360 10 -519 -84 -91 -423 -388 -438 -384 -13 3 -155 93 -547 345 -40 26 -72 50 -70 54 2 6 320 298 493 452 98 88 169 132 236 146 64 13 154 3 214 -24z m-943 -807 c120 -60 260 -150 527 -337 524 -368 539 -381 593 -473 78 -134 89 -298 29 -439 -85 -200 -240 -323 -428 -337 -76 -6 -142 10 -213 50 -124 71 -353 207 -517 308 -105 65 -203 121 -218 125 -26 6 -42 -7 -212 -177 -144 -145 -184 -190 -184 -211 0 -25 49 -121 270 -533 62 -115 147 -275 190 -355 252 -474 286 -536 302 -556 6 -8 31 1 83 28 41 22 75 42 75 45 0 6 -117 227 -247 466 -36 65 -62 121 -59 124 22 22 333 -65 457 -128 140 -70 293 -184 415 -311 149 -153 239 -279 444 -618 61 -102 113 -186 114 -187 4 -4 130 48 139 57 12 11 -166 357 -242 470 -141 210 -303 393 -474 536 -262 220 -539 339 -852 369 -111 10 -117 14 -177 126 -29 55 -91 168 -137 252 -46 84 -83 165 -84 180 0 23 18 47 89 118 49 49 91 89 95 89 7 0 304 -175 532 -313 241 -147 361 -174 543 -121 21 6 21 5 16 -154 -4 -142 -3 -167 16 -229 71 -233 304 -390 550 -369 42 4 105 9 139 13 60 5 63 4 74 -20 9 -21 8 -45 -6 -117 -41 -211 12 -382 163 -527 104 -100 254 -151 409 -139 99 7 133 -4 181 -58 40 -46 82 -127 82 -160 0 -26 -43 -84 -224 -302 -476 -572 -522 -645 -621 -992 -25 -86 -66 -220 -90 -297 -24 -77 -74 -239 -110 -360 -37 -121 -70 -223 -73 -227 -6 -6 -270 12 -852 57 -409 32 -727 76 -1097 151 -209 42 -459 107 -475 123 -5 4 42 151 103 326 253 734 309 903 309 939 0 37 -19 90 -212 581 -49 127 -130 334 -180 460 -143 367 -349 880 -458 1145 -56 135 -108 274 -116 310 -38 177 7 343 131 478 27 31 185 177 350 325 165 149 329 298 365 331 91 85 497 454 543 494 55 47 85 43 230 -29z m1655 -69 c128 -68 195 -180 196 -325 1 -94 -26 -164 -90 -235 -52 -58 -372 -350 -383 -350 -5 0 -14 24 -21 53 -6 28 -35 99 -62 157 -45 93 -61 115 -142 195 -51 50 -120 106 -154 125 -34 19 -61 40 -61 45 0 6 58 61 128 122 265 234 302 256 436 251 80 -4 97 -8 153 -38z m664 -874 c66 -31 144 -111 178 -183 32 -66 39 -191 15 -263 -23 -68 -84 -133 -400 -420 -549 -499 -569 -514 -705 -514 -168 -1 -310 98 -355 249 -23 76 -19 190 9 250 33 72 114 152 552 546 413 371 413 371 564 365 67 -2 98 -9 142 -30z m630 -867 c170 -57 256 -184 246 -363 -7 -131 -34 -172 -224 -346 -678 -622 -642 -595 -804 -595 -85 0 -101 3 -153 30 -68 34 -144 112 -177 182 -31 64 -38 171 -16 244 30 104 40 115 524 552 128 115 252 225 276 244 94 73 211 92 328 52z m380 -706 c52 -44 140 -85 228 -106 36 -9 243 -39 460 -67 526 -67 581 -76 663 -105 224 -78 463 -311 565 -551 65 -155 94 -346 73 -483 -6 -41 -14 -78 -17 -82 -3 -5 -28 4 -57 20 -726 402 -892 491 -915 491 -25 0 -175 -93 -267 -165 -204 -159 -346 -365 -417 -605 -38 -130 -33 -379 10 -440 18 -25 89 -74 540 -371 133 -88 242 -163 242 -168 0 -10 -88 -43 -187 -70 -237 -64 -554 -53 -787 29 -279 97 -569 342 -675 571 -59 127 -63 153 -71 554 -5 204 -13 402 -19 440 -22 142 -83 284 -161 379 -22 27 -38 51 -36 54 11 10 781 711 783 712 0 0 21 -16 45 -37z"/>
    </g>
  </svg>
);

const EngineeringIcon = ({ className }) => (
  <svg
    viewBox="0 0 840 592"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(0,592) scale(0.1,-0.1)" stroke="none">
      <path d="M5316 5228 c-8 -13 -49 -142 -90 -288 -72 -257 -317 -1123 -379 -1344 -40 -145 -37 -153 68 -187 44 -15 110 -35 148 -44 98 -25 103 -20 151 146 21 74 47 162 57 195 l19 62 95 55 95 56 0 -339 0 -339 -42 -11 c-24 -6 -64 -18 -90 -26 -75 -24 -137 -111 -92 -128 28 -11 594 -7 615 4 10 6 19 17 19 25 0 26 -80 83 -151 105 l-69 23 0 501 c0 606 -8 674 -90 841 -22 45 -40 93 -40 109 0 32 25 136 81 328 21 75 39 146 39 157 0 35 -33 53 -157 88 -140 39 -167 41 -187 11z"/>
      <path d="M2780 4816 c-223 -60 -371 -291 -332 -517 37 -213 196 -357 415 -375 178 -15 358 85 431 240 67 142 61 316 -17 448 -32 54 -121 139 -175 167 -94 48 -226 63 -322 37z"/>
      <path d="M2852 3779 c-122 -15 -259 -104 -318 -206 -73 -124 -79 -205 -45 -683 27 -382 41 -640 41 -785 0 -145 18 -237 65 -332 59 -120 164 -199 317 -240 54 -14 141 -17 621 -20 499 -4 561 -3 583 11 l24 16 0 300 0 300 -22 14 c-17 10 -115 19 -360 33 -186 11 -339 21 -341 24 -2 2 -12 168 -22 369 -25 493 -27 550 -21 550 4 0 46 -22 95 -50 48 -27 121 -64 162 -82 l74 -33 375 0 375 0 52 29 c106 58 141 164 89 270 -15 30 -43 66 -62 81 -66 50 -102 55 -420 55 -167 0 -304 4 -318 10 -15 5 -134 75 -265 155 -132 80 -268 157 -303 172 -114 46 -237 60 -376 42z"/>
      <path d="M1815 3211 c-70 -32 -125 -111 -125 -178 0 -15 33 -241 74 -503 41 -261 78 -502 81 -535 12 -105 53 -297 84 -389 120 -352 436 -633 796 -707 185 -38 317 -44 732 -30 430 13 431 14 491 87 61 74 62 174 0 248 -61 74 -37 71 -573 71 -467 0 -482 1 -560 22 -44 13 -118 42 -165 64 -69 34 -101 58 -170 128 -92 93 -135 162 -169 274 -26 84 -71 352 -151 892 -34 226 -65 424 -71 441 -5 16 -26 47 -47 67 -68 66 -150 84 -227 48z"/>
      <path d="M3800 2580 l0 -280 290 0 290 0 0 -810 0 -810 870 0 870 0 0 810 0 810 295 0 295 0 0 280 0 280 -1455 0 -1455 0 0 -280z"/>
    </g>
  </svg>
);

const SystemsIcon = ({ className }) => (
  <svg
    viewBox="0 0 204 192"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(0,192) scale(0.1,-0.1)" stroke="none">
      <path d="M870 1808 c-89 -31 -156 -73 -213 -131 -78 -80 -111 -151 -142 -299 l-5 -27 -103 -3 -102 -3 0 -470 0 -470 303 -3 302 -2 0 -70 0 -70 -103 0 c-67 0 -107 -4 -115 -12 -12 -12 -17 -114 -6 -142 5 -14 44 -16 334 -16 290 0 329 2 334 16 11 28 6 130 -6 142 -8 8 -48 12 -115 12 l-103 0 0 70 0 70 303 2 302 3 0 470 0 470 -102 3 c-97 3 -103 4 -107 25 -21 100 -22 102 -45 105 -22 4 -23 2 -16 -62 l7 -66 -86 0 c-89 0 -100 8 -46 30 47 19 48 49 6 125 -48 84 -62 92 -120 63 -40 -19 -48 -20 -71 -8 -21 11 -25 20 -25 61 0 64 -21 79 -110 79 -89 0 -110 -15 -110 -79 0 -44 -3 -50 -29 -61 -25 -10 -35 -8 -70 10 -53 26 -68 19 -115 -59 -50 -82 -48 -104 12 -135 17 -9 32 -19 32 -21 0 -3 -39 -5 -86 -5 l-87 0 6 53 c10 80 67 185 135 248 153 142 363 169 532 71 43 -25 44 -26 20 -32 -16 -4 -26 -14 -28 -28 -3 -21 0 -22 71 -22 85 0 87 2 87 80 0 61 -7 80 -30 80 -19 0 -30 -19 -30 -50 0 -15 -14 -11 -89 28 -88 44 -92 46 -198 49 -93 3 -117 1 -173 -19z m212 -219 c3 -49 4 -51 51 -76 l48 -27 44 22 45 22 14 -23 c27 -41 41 -80 31 -84 -6 -2 -25 -12 -42 -23 -31 -19 -33 -23 -33 -79 0 -59 0 -60 40 -82 22 -13 40 -27 40 -32 0 -4 -12 -28 -26 -53 l-26 -44 -43 26 -43 25 -51 -28 -51 -28 0 -52 0 -53 -60 0 -60 0 0 53 0 52 -52 27 -52 28 -43 -25 -43 -24 -23 37 c-13 20 -27 42 -30 49 -5 7 9 22 38 39 l46 26 -3 62 c-3 60 -3 61 -46 84 l-43 24 27 46 c15 26 28 49 30 51 2 2 24 -7 48 -20 l45 -23 48 26 c47 26 48 28 51 77 l3 51 59 0 59 0 3 -51z m-566 -326 c14 -83 20 -98 40 -98 17 0 19 6 16 68 l-4 67 79 0 c44 0 83 -3 86 -7 4 -3 -10 -16 -30 -27 -51 -29 -52 -56 -6 -136 44 -74 69 -85 124 -51 29 18 35 18 61 5 24 -12 28 -21 28 -55 0 -73 9 -79 110 -79 101 0 110 6 110 79 0 34 4 43 28 55 26 13 32 13 61 -5 57 -34 74 -27 121 51 23 40 40 80 38 93 -2 13 -19 30 -43 44 -50 28 -35 35 66 31 l74 -3 -3 -30 c-5 -52 -42 -151 -73 -199 -95 -143 -282 -225 -447 -196 -69 12 -192 64 -192 81 0 5 12 9 26 9 21 0 25 4 22 23 -3 20 -9 22 -66 25 -38 2 -69 -2 -78 -9 -20 -16 -19 -132 1 -149 20 -17 45 3 45 36 0 30 2 30 48 0 95 -63 251 -89 365 -62 109 26 174 62 253 140 78 78 119 152 136 244 16 88 15 87 99 87 l74 0 3 -337 2 -338 -670 0 -670 0 0 333 c0 184 3 337 7 340 3 4 39 7 79 7 l73 0 7 -37z m1172 -755 l3 -58 -671 0 -670 0 0 53 c0 30 3 57 7 60 3 4 304 6 667 5 l661 -3 3 -57z m-608 -178 l0 -70 -60 0 -60 0 0 70 0 70 60 0 60 0 0 -70z m220 -155 l0 -35 -280 0 -280 0 0 35 0 35 280 0 280 0 0 -35z"/>
      <path d="M962 1486 c-108 -38 -151 -174 -85 -265 25 -35 99 -71 143 -71 186 1 236 254 65 331 -46 21 -76 23 -123 5z m103 -50 c78 -33 98 -138 38 -198 -38 -37 -88 -46 -137 -23 -93 44 -88 179 8 221 40 17 49 17 91 0z"/>
    </g>
  </svg>
);

const sections = [
  { id: 'home', icon: <Home size={24} />, label: 'Home' },
  { id: 'toolkit', icon: <ToolkitIcon className="w-[37px] h-[37px]" />, label: 'Toolkit' },
  { id: 'engineering', icon: <EngineeringIcon className="w-[42px] h-[42px]" />, label: 'Engineering' },
  { id: 'systems', icon: <SystemsIcon className="w-[32px] h-[32px]" />, label: 'Systems' },
  { id: 'contact', icon: <Mail size={24} />, label: 'Contact' },
];

const RotationalScroller = ({ isHidden, isLoading }) => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const [activeSection, setActiveSection] = useState('home');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Delay slightly after preloader exits for a staggered feel
      // Increased from 600ms to 1800ms so it waits for the Hero text to reveal first
      const timer = setTimeout(() => setHasMounted(true), 1100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    const observers = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { threshold: 0.3 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  // 5 sections, adjusted spacing to keep them balanced with a clean gap
  const angleSpacing = 24;
  // Rotate with scroll to bring all icons fully onto the screen
  const totalRotation = -30;

  const rotate = useTransform(smoothProgress, [0, 1], [0, totalRotation]);
  const hexagonRotate = useTransform(smoothProgress, [0, 1], [0, -360]); // Full 360 degree spin on scroll

  const circleRadius = 180;
  const center = circleRadius;

  // Determine the animation class
  const getAnimationClasses = () => {
    if (isHidden) return 'opacity-0 scale-75 translate-x-12 translate-y-12 pointer-events-none';
    if (!hasMounted) return 'opacity-0 scale-[1.8] translate-x-[-40px] translate-y-[-40px] drop-shadow-[0_0_80px_rgba(255,42,0,0.9)]';
    return 'opacity-100 scale-[1.15] md:scale-100 origin-bottom-right translate-x-0 translate-y-0 drop-shadow-[0_0_0px_rgba(255,42,0,0)]';
  };

  return (
    <nav
      role="navigation"
      aria-label="Quick Section Navigation"
      className={`fixed bottom-0 right-0 z-50 pointer-events-none transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hasMounted && !isHidden ? 'duration-[1500ms]' : 'duration-500'
      } ${getAnimationClasses()}`}
      style={{ width: circleRadius, height: circleRadius }}
    >
      <div
        className="absolute"
        style={{
          width: circleRadius * 2,
          height: circleRadius * 2,
          right: -circleRadius,
          bottom: -circleRadius
        }}
      >
        {/* Center Logo/Icon */}
        <motion.div 
          className="absolute bottom-[195px] right-[185px] text-crimson-dark animate-pulse-slow pointer-events-none flex items-center justify-center"
          style={{ rotate: hexagonRotate }}
        >
          <Hexagon size={48} className="drop-shadow-[0_0_15px_rgba(179,30,0,0.6)]" />
          <div className="absolute w-2 h-2 bg-crimson rounded-full animate-ping"></div>
        </motion.div>

        {/* Main Rotating Dial */}
        <motion.div
          className="w-full h-full rounded-full border border-crimson/30 bg-obsidian/60 backdrop-blur-xl pointer-events-auto shadow-[0_0_80px_rgba(255,42,0,0.08)] relative"
          style={{ rotate }}
        >
          {/* Inner and Outer Track Lines for Icons */}
          <div className="absolute inset-[8px] rounded-full border border-crimson/30 pointer-events-none shadow-[inset_0_0_20px_rgba(255,42,0,0.1)]" />
          <div className="absolute inset-[72px] rounded-full border border-crimson/30 pointer-events-none shadow-[0_0_20px_rgba(255,42,0,0.1)]" />
          <div className="absolute inset-[80px] rounded-full border border-crimson/30 pointer-events-none shadow-[inset_0_0_20px_rgba(255,42,0,0.1)]" />
          <div className="absolute inset-[40px] rounded-full border border-crimson/20 border-dashed pointer-events-none" />

          {sections.map((section, index) => {
            // Start at 190 degrees to ensure the Home icon is fully visible and keep spacing clean
            const baseAngle = 190;
            const angle = baseAngle + index * angleSpacing;
            const angleRad = (angle * Math.PI) / 180;

            // Icon radius placed exactly between the two track lines (inset 40 = radius 140)
            const iconRadius = circleRadius - 40;

            const x = center + iconRadius * Math.cos(angleRad);
            const y = center + iconRadius * Math.sin(angleRad);

            const isActive = activeSection === section.id;

            return (
              <CounterRotatingIcon
                key={section.id}
                x={x}
                y={y}
                icon={section.icon}
                label={section.label}
                parentRotate={rotate}
                isActive={isActive}
                onClick={() => scrollTo(section.id)}
              />
            );
          })}
        </motion.div>

      </div>
    </nav>
  );
};

const CounterRotatingIcon = ({ x, y, icon, label, parentRotate, isActive, onClick }) => {
  // To keep upright, icon rotate = - parentRotate
  const iconRotate = useTransform(parentRotate, (v) => -v);

  return (
    <motion.button
      onClick={onClick}
      aria-label={`Navigate to ${label}`}
      aria-current={isActive ? 'page' : undefined}
      className={`absolute flex items-center justify-center rounded-full cursor-pointer transition-all duration-500 group shadow-lg pointer-events-auto
        ${isActive
          ? 'w-14 h-14 bg-crimson/20 border-2 border-crimson text-crimson shadow-[0_0_30px_rgba(255,42,0,0.4)] z-20'
          : 'w-12 h-12 bg-carbon border border-white/10 hover:border-crimson/50 hover:bg-crimson/10 text-gray-500 hover:text-crimson z-10'
        }`}
      style={{
        left: x,
        top: y,
        x: '-50%',
        y: '-50%',
        rotate: iconRotate,
      }}
    >
      {icon}

      {/* Tooltip */}
      <div className={`absolute right-full mr-5 px-3 py-1.5 rounded border text-[10px] font-mono tracking-widest uppercase transition-all duration-500 whitespace-nowrap pointer-events-none backdrop-blur-md
        ${isActive
          ? 'bg-crimson/10 border-crimson/40 text-crimson shadow-[0_0_15px_rgba(255,42,0,0.2)] opacity-100 translate-x-0'
          : 'bg-obsidian/80 border-white/10 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4'
        }`}
      >
        {label}
      </div>
    </motion.button>
  );
};

export default RotationalScroller;
