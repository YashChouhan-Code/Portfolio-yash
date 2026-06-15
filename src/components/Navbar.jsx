import React from 'react';
import { Code2 } from 'lucide-react';
import { scrollTo } from '../utils';

const Navbar = ({ isLoading }) => {
    return (
        <nav className={`fixed w-full z-50 top-0 bg-obsidian/50 backdrop-blur-md transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isLoading ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
        }`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} className="font-display font-bold text-xl tracking-widest flex items-center gap-2 group" aria-label="Home">
                    <Code2 className="text-crimson w-5 h-5 md:w-6 md:h-6 stroke-[2.5px] animate-pulse" aria-hidden="true" />
                    YASH_CHOUHAN<span className="text-crimson" aria-hidden="true">.</span>
                </a>
                <div className="hidden md:flex space-x-10 text-xs font-bold tracking-widest text-gray-400 uppercase">
                    <a href="#toolkit" onClick={(e) => { e.preventDefault(); scrollTo('toolkit'); }} className="hover:text-white transition-colors glitch-hover">Toolkit</a>
                    <a href="#engineering" onClick={(e) => { e.preventDefault(); scrollTo('engineering'); }} className="hover:text-white transition-colors glitch-hover">Engineering</a>
                    <a href="#systems" onClick={(e) => { e.preventDefault(); scrollTo('systems'); }} className="hover:text-white transition-colors glitch-hover">Systems</a>
                </div>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }} className="text-xs font-bold tracking-widest uppercase border border-crimson text-crimson hover:text-white px-4 py-2 hover:shadow-[0_0_15px_rgba(255,42,0,0.3)] hover:bg-crimson/5 transition-all inline-flex items-center">
                    <span>connect</span>
                    <span className="text-white ml-0.5 inline-flex" aria-hidden="true">
                        <span className="animate-dot-1">.</span>
                        <span className="animate-dot-2">.</span>
                        <span className="animate-dot-3">.</span>
                        <span className="animate-dot-4">.</span>
                        <span className="animate-dot-5">.</span>
                    </span>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
