import React, { useEffect, useRef, useState } from 'react';
import { Network, Cpu, Activity, ArrowUpRight, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import cnetImg from '../assets/cnet.png';
import aetherImg from '../assets/aether-stock.png';
import constructImg from '../assets/construct.png';
import lexAiImg from '../assets/lex-ai.jpg';

const systemsData = [
    {
        id: "sys1",
        tag: "SYS.01 // ",
        title: "C-Net Infotech Website",
        desc: "High-performance corporate website engineered with React, Three.js, and Appwrite, combining interactive 3D experiences, scalable architecture, and search-first optimization. Featuring AI Overview-ready FAQs, advanced SEO/AEO strategies, responsive design, and performance-driven user experiences built to enhance brand presence and drive conversions.",
        icon: Globe,
        image: cnetImg,
        textColor: "text-crimson",
        bgClass: "bg-[linear-gradient(rgba(255,42,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,42,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20",
        customBars: false,
        softwareLink: "https://www.cnet-india.com/"
    },
    {
        id: "sys2",
        tag: "SYS.02 //",
        title: "LEX_AI",
        desc: "An Enterprise AI knowledge platform built with React Native and a custom Python RAG pipeline, leveraging embeddings, vector databases, semantic search, and context-aware retrieval to transform legal and confidential documents into an intelligent knowledge system. Powered by local LLMs, optimized context management, and source-grounded response generation, the platform delivers accurate, citation-backed insights across web, Android, and iOS.",
        icon: Network,
        image: lexAiImg,
        textColor: "text-crimson",
        bgClass: "bg-[linear-gradient(rgba(255,42,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,42,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20",
        customBars: false,
        repoLink: "https://github.com/Shanky7489/RAG-Application",
        // softwareLink: "#"
    },
    {
        id: "sys3",
        tag: "SYS.03 // ",
        title: "Construct.IQ",
        desc: "A comprehensive construction operations platform designed to manage project lifecycles, track work completion, monitor active pipelines, and coordinate teams through a unified dashboard experience. Powered by Next.js, Python, and PostgreSQL with integrated AI assistance for faster access to project insights and operational data.",
        icon: Cpu,
        image: constructImg,
        textColor: "text-crimson",
        bgClass: "bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50",
        customBars: false,
        repoLink: "https://github.com/YashChouhan-Code/Construct-IQ",
        softwareLink: "https://construct-iq-eta.vercel.app/"
    },
    {
        id: "sys4",
        tag: "SYS.04 // ",
        title: "Aethor_Stock ",
        desc: "Built a full-stack inventory management system using React, Node.js, and SQLite, featuring AI-powered inventory analytics, automated stock threshold monitoring, intelligent alerting, invoice generation, and real-time data management. The platform enables proactive inventory control and operational automation for growing businesses.",
        icon: Activity,
        image: aetherImg,
        textColor: "text-crimson",
        bgClass: "bg-gradient-to-br from-crimson/5 to-transparent",
        customBars: true,
        repoLink: "https://github.com/YashChouhan-Code/Aether-stock",
        softwareLink: "https://aether-stock-w9nn.onrender.com/"
    }
];

const Systems = () => {
    const revealRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const addToRefs = el => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    useEffect(() => {
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

        return () => observer.disconnect();
    }, []);

    const scrollNext = () => {
        setActiveIndex((prev) => (prev + 1) % systemsData.length);
    };

    const scrollPrev = () => {
        setActiveIndex((prev) => (prev - 1 + systemsData.length) % systemsData.length);
    };

    // Auto-scroll functionality
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isHovered) {
                scrollNext();
            }
        }, 2500); // 2.5 seconds interval

        return () => clearInterval(interval);
    }, [activeIndex, isHovered]);

    return (
        <section id="systems" className="pt-8 pb-8 bg-carbon/20 backdrop-blur-sm border-y border-white/5 overflow-hidden" aria-labelledby="systems-heading">
            <div className="max-w-7xl mx-auto px-6 relative">
                <div ref={addToRefs} className="mb-16 reveal">
                    <h2 id="systems-heading" className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-center">
                        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-red-800">Implementation</span>
                    </h2>
                </div>
            </div>

            {/* Carousel Container */}
            <div
                className="w-full relative flex justify-center items-center py-10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Placeholder to reserve height so absolute items don't collapse container */}
                <div className="opacity-0 pointer-events-none w-[90vw] sm:w-[620px] md:w-[720px] lg:w-[780px] p-6 flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-5/12">
                        <div className="aspect-[16/10]"></div>
                    </div>
                    <div className="w-full sm:w-7/12 space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                            <div className="h-4 w-1/3 bg-white"></div>
                            <div className="h-8 w-2/3 bg-white"></div>
                            <div className="h-24 w-full bg-white"></div>
                        </div>
                        <div className="h-6 w-1/4 bg-white mt-4"></div>
                    </div>
                </div>

                {/* Absolute Positional Cards for infinite loop effect */}
                {systemsData.map((sys, index) => {
                    let N = systemsData.length;
                    let offset = index - activeIndex;

                    // Find shortest path in circular array
                    if (offset > N / 2) offset -= N;
                    if (offset < -N / 2) offset += N;

                    const isCenter = offset === 0;
                    const isLeft = offset === -1;
                    const isRight = offset === 1;
                    const isVisible = isCenter || isLeft || isRight;

                    const translateX = isCenter ? "-50%" : isLeft ? "-140%" : isRight ? "40%" : "-50%";
                    const zIndex = isCenter ? "z-30" : isVisible ? "z-10" : "z-0";

                    const styles = isCenter
                        ? 'opacity-100 scale-100 blur-none border-crimson shadow-[0_0_30px_-5px_rgba(220,20,60,0.3)]'
                        : isVisible
                            ? 'opacity-40 scale-[0.85] border-white/60 blur-[2px] hover:opacity-60 cursor-pointer'
                            : 'opacity-0 scale-50 pointer-events-none invisible';

                    const Icon = sys.icon;

                    return (
                        <article
                            key={sys.id}
                            className={`absolute top-1/2 left-1/2 flex-shrink-0 w-[90vw] sm:w-[620px] md:w-[720px] lg:w-[780px] bg-carbon/20 backdrop-blur-sm border p-6 flex flex-col sm:flex-row gap-6 transition-all duration-700 ease-out group rounded-xl ${zIndex} ${styles}`}
                            style={{ transform: `translate(${translateX}, -50%)` }}
                            onClick={() => {
                                if (isLeft) scrollPrev();
                                if (isRight) scrollNext();
                            }}
                        >
                            <div className="w-full sm:w-5/12 project-img-wrapper flex-shrink-0">
                                <div className="aspect-[16/10] border border-white bg-carbon/50 backdrop-blur-sm relative overflow-hidden flex items-center justify-center rounded-lg w-full shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                                    <div className={`absolute inset-0 ${sys.bgClass}`}></div>
                                    <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
                                        {sys.image ? (
                                            <img src={sys.image} alt={sys.title} className="w-full h-full object-contain rounded-lg" loading="eager" fetchpriority="high" />
                                        ) : (
                                            <Icon className={`w-20 h-20 ${isCenter ? 'text-white/20' : 'text-white/10'}`} aria-hidden="true" />
                                        )}
                                        <div className="absolute top-3 left-3 flex gap-2 items-center">
                                            <div className={`w-1.5 h-1.5 rounded-full ${sys.statusColor} ${isCenter ? 'animate-pulse' : ''}`}></div>
                                            <div className={`text-[9px] font-mono ${sys.textColor}`}>{sys.status}</div>
                                        </div>

                                        {sys.customBars && (
                                            <div className="absolute bottom-3 left-3 right-3 flex items-end gap-0.5 h-10 opacity-30">
                                                <div className="w-full bg-crimson h-1/4"></div>
                                                <div className="w-full bg-crimson h-2/4"></div>
                                                <div className="w-full bg-crimson h-1/4"></div>
                                                <div className="w-full bg-white h-3/4"></div>
                                                <div className="w-full bg-crimson h-2/4"></div>
                                                <div className="w-full bg-white h-full"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-7/12 space-y-4 flex flex-col justify-between">
                                <div className="space-y-2">
                                    <div className={`${sys.textColor} font-mono text-xs md:text-sm tracking-widest uppercase transition-colors duration-500`}>{sys.tag}</div>
                                    <h3 className="font-display text-xl md:text-2xl font-bold uppercase text-white">{sys.title}</h3>
                                    <p className={`leading-relaxed font-light text-xs md:text-sm transition-colors duration-500 ${isCenter ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {sys.desc}
                                    </p>
                                </div>
                                <div className="flex gap-6 pt-1">
                                    {sys.softwareLink && (
                                        <a href={sys.softwareLink} target="_blank" rel="noopener noreferrer" className={`text-xs font-bold uppercase tracking-wider border-b pb-0.5 flex items-center gap-1.5 w-fit transition-all duration-300 ${isCenter ? 'border-white text-white hover:border-crimson hover:text-crimson' : 'border-gray-600 text-gray-600 pointer-events-none'}`} aria-label={`View Software for ${sys.title}`}>
                                            View Software <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                                        </a>
                                    )}
                                    {sys.repoLink && (
                                        <a href={sys.repoLink} target="_blank" rel="noopener noreferrer" className={`text-xs font-bold uppercase tracking-wider border-b pb-0.5 flex items-center gap-1.5 w-fit transition-all duration-300 ${isCenter ? 'border-white text-white hover:border-crimson hover:text-crimson' : 'border-gray-600 text-gray-600 pointer-events-none'}`} aria-label={`View Repository for ${sys.title}`}>
                                            View Repository <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Navigation Arrows centered below the boxes */}
            <div className="flex gap-6 justify-center mt-4 relative z-40">
                <button
                    onClick={scrollPrev}
                    className="p-3 border border-crimson/50 text-crimson bg-carbon/80 backdrop-blur-sm rounded-full cursor-pointer hover:bg-crimson hover:text-white transition-all duration-300 focus:outline-none flex items-center justify-center group"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                    onClick={scrollNext}
                    className="p-3 border border-crimson/50 text-crimson bg-carbon/80 backdrop-blur-sm rounded-full cursor-pointer hover:bg-crimson hover:text-white transition-all duration-300 focus:outline-none flex items-center justify-center group"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

        </section>
    );
};

export default Systems;
