import React, { useState, useEffect, useRef } from 'react';
import { Power, Terminal, X, ShieldCheck } from 'lucide-react';
import { FaGithub, FaLinkedin, FaFileAlt, FaMailBulk, FaVoicemail, FaFilePdf } from 'react-icons/fa';
import { FaRegFilePdf } from 'react-icons/fa6';
import resumePdf from '../assets/Yash---cv.pdf';
import { databases } from "../lib/appwrite";
import { ID } from "appwrite";

const Footer = ({ onInquiryOpenChange }) => {
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = el => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (onInquiryOpenChange) {
      onInquiryOpenChange(isOpen && !isMinimized);
    }
  }, [isOpen, isMinimized, onInquiryOpenChange]);
  const [formData, setFormData] = useState({
    identity: '',
    objective: '',
    missionBrief: '',
    communicationChannel: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'transmitting' | 'success'
  const [progress, setProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState([]);

  const closeModal = () => {
    setIsOpen(false);
    setStatus('idle');
    setIsMinimized(false);
    setIsMaximized(false);
    setFormData({
      identity: '',
      objective: '',
      missionBrief: '',
      communicationChannel: ''
    });
  };

  const toggleMinimize = () => {
    setIsMinimized(true);
  };

  const toggleMaximize = () => {
    setIsMaximized(prev => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen && !isMinimized) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      window.lenis?.stop();
    } else {
      document.body.style.overflow = '';
      window.lenis?.start();
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      window.lenis?.start();
    };
  }, [isOpen, isMinimized]);

  useEffect(() => {
    let logTimer;
    let progressTimer;

    if (status === 'transmitting') {
      setTerminalLogs([]);
      setProgress(0);

      const logs = [
        "SYS: Initializing secure uplink...",
        "SYS: Establishing handshake with sys.admin@yashchouhan.ai...",
        `SYS: Packaging identity: ${formData.identity.toUpperCase()}...`,
        `SYS: Classifying objective: [${formData.objective.toUpperCase()}]...`,
        "SYS: Encrypting mission brief...",
        "SYS: Transmitting packets over SSL/TLS...",
        "SYS: Remote server acknowledged. Transmission success!"
      ];

      let currentLogIndex = 0;
      const addLog = () => {
        if (currentLogIndex < logs.length) {
          setTerminalLogs(prev => [...prev, logs[currentLogIndex]]);
          currentLogIndex++;
          logTimer = setTimeout(addLog, 400);
        } else {
          setStatus('success');
        }
      };

      addLog();

      progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }

    return () => {
      clearTimeout(logTimer);
      clearInterval(progressTimer);
    };
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setStatus("transmitting");

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_TABLE_ID,
        ID.unique(),
        {
          name: formData.identity,
          email: formData.communicationChannel,
          purpose: formData.objective,
          description: formData.missionBrief,
        }
      );

      setStatus("success");
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
      setStatus("idle");
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

  return (
    <footer id="contact" className="pt-24 pb-12 px-6 mb-20 relative z-10">
      <div ref={addToRefs} className="max-w-4xl mx-auto text-center reveal">

        <h2 className="font-display text-5xl md:text-7xl font-extrabold uppercase tracking-tight mb-2">
          Connect<span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-red-800">.exe</span>
        </h2>

        <p className="text-gray-400 text-lg md:text-xl font-light mb-5 max-w-2xl mx-auto">
          Whether it's a startup, enterprise, client engagement, or open-source initiative, I'm always interested in solving challenging problems and building exceptional products.</p>

        <button
          onClick={() => setIsOpen(true)}
          className="btn-crimson text-base !px-6 !py-2 shadow-[0_0_20px_rgba(255,42,0,0.2)] hover:shadow-[0_0_40px_rgba(255,42,0,0.5)] inline-flex"
        >
          <span>Inquiry Terminal</span>
        </button>

        <div className="flex justify-center gap-10 mt-4 text-white pt-3">
          <a href="https://github.com/YashChouhan-Code" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-crimson transition-colors duration-300" aria-label="GitHub Profile">
            <FaGithub className="w-4 h-4" aria-hidden="true" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/-yash-chouhan/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-crimson transition-colors duration-300" aria-label="LinkedIn Profile">
            <FaLinkedin className="w-4 h-4" aria-hidden="true" /> LinkedIn
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=yashchouhan0208@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-crimson transition-colors duration-300" aria-label="Send Email">
            <FaMailBulk className="w-4 h-4" aria-hidden="true" /> Email
          </a>
          <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-crimson transition-colors duration-300" aria-label="Access Resume PDF">
            <FaRegFilePdf className="w-4 h-4" aria-hidden="true" /> Access Resume
          </a>
        </div>

        <p className="text-gray-700 font-mono text-xs mt-6 tracking-widest uppercase">
          SYSTEM SECURED // YASH CHOUHAN // 2026
        </p>
      </div>

      {/* Terminal Inquiry Modal */}
      {isOpen && !isMinimized && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
          {/* Backdrop close area */}
          <div className="absolute inset-0" onClick={closeModal}></div>

          {/* Terminal Box */}
          <div className={`relative my-auto w-full bg-[#050505] border border-crimson/50 rounded shadow-[0_0_40px_rgba(255,42,0,0.3)] overflow-hidden font-mono text-xs text-gray-300 z-10 text-left flex flex-col transition-all duration-300 ${isMaximized ? 'max-w-xl max-h-[85vh]' : 'max-w-md max-h-[85vh]'
            }`}>
            {/* Scanline grid overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-20"></div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#111] border-b border-crimson/30 relative flex-shrink-0">
              <div className="flex items-center gap-3">
                {/* Linux/Mac style control dots with visible cross, minimize, maximize characters */}
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center text-black font-extrabold text-[8px] cursor-pointer focus:outline-none select-none border-none p-0"
                    title="Close"
                  >
                    ✕
                  </button>
                  <button
                    type="button"
                    onClick={toggleMinimize}
                    className="w-3.5 h-3.5 rounded-full bg-[#febb2e] hover:bg-[#febb2e]/80 flex items-center justify-center text-black font-extrabold text-[8px] cursor-pointer focus:outline-none select-none border-none p-0"
                    title="Minimize"
                  >
                    ─
                  </button>
                  <button
                    type="button"
                    onClick={toggleMaximize}
                    className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 flex items-center justify-center text-black font-extrabold text-[8px] cursor-pointer focus:outline-none select-none border-none p-0"
                    title={isMaximized ? "Restore Down" : "Maximize"}
                  >
                    {isMaximized ? "❐" : "⤢"}
                  </button>
                </div>
                <div className="flex items-center gap-1.5">
                  <Terminal size={12} className="text-crimson animate-pulse" />
                  <span className="text-crimson font-bold uppercase tracking-wider text-[12px]">
                    Connect_LINK.EXE v1.0.9
                  </span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-crimson transition-colors duration-200 focus:outline-none text-[10px]"
              >
                [ESC TO CLOSE]
              </button>
            </div>

            {/* Content states */}
            {status === 'idle' && (
              <form onSubmit={handleSubmit} className="p-5 space-y-4 relative overflow-y-auto flex-grow">
                <div className="text-[11px] text-gray-600 mb-1 border-b border-gray-950 pb-1.2 flex justify-between">
                  <span>UPLINK STATUS: ESTABLISHED</span>
                  <span>SECURE SHELL: ON</span>
                </div>

                {/* IDENTITY */}
                <div>
                  <label htmlFor="terminal-identity" className="block text-crimson font-bold uppercase tracking-wider text-[12px] mb-0.5">
                    &gt; IDENTITY
                  </label>
                  <input
                    id="terminal-identity"
                    type="text"
                    required
                    placeholder="ENTER_YOUR_FULL_NAME"
                    className="w-full bg-[#0d0d0d] border border-gray-800 focus:border-crimson focus:outline-none text-white px-3 py-1.5 font-mono text-xs transition-colors duration-200"
                    value={formData.identity}
                    onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
                  />
                </div>

                {/* COMMUNICATION CHANNEL */}
                <div>
                  <label htmlFor="terminal-channel" className="block text-crimson font-bold uppercase tracking-wider text-[12px] mb-0.5">
                    &gt; COMMUNICATION CHANNEL
                  </label>
                  <input
                    id="terminal-channel"
                    type="email"
                    required
                    placeholder="YOUR.EMAIL@PROVIDER.COM"
                    className="w-full bg-[#0d0d0d] border border-gray-800 focus:border-crimson focus:outline-none text-white px-3 py-1.5 font-mono text-xs transition-colors duration-200"
                    value={formData.communicationChannel}
                    onChange={(e) => setFormData({ ...formData, communicationChannel: e.target.value })}
                  />
                </div>

                {/* OBJECTIVE */}
                <div>
                  <label htmlFor="terminal-objective" className="block text-crimson font-bold uppercase tracking-wider text-[12px] mb-0.5">
                    &gt; OBJECTIVE
                  </label>
                  <div className="relative">
                    <select
                      id="terminal-objective"
                      required
                      className={`w-full bg-[#0d0d0d] border border-gray-800 focus:border-crimson focus:outline-none px-3 py-1.5 font-mono text-xs cursor-pointer transition-colors duration-200 appearance-none uppercase ${formData.objective === '' ? 'text-grey-500' : 'text-white'
                        }`}
                      value={formData.objective}
                      onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                    >
                      <option value="" disabled hidden>SELECT_YOUR_PURPOSE</option>
                      <option value="Hire">Hire</option>
                      <option value="Collaborate">Collaborate</option>
                      <option value="Consult">Consult</option>
                      <option value="Build">Build</option>
                      <option value="Other">Something Else</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-crimson">
                      ▼
                    </div>
                  </div>
                </div>

                {/* MISSION BRIEF */}
                <div>
                  <label htmlFor="terminal-mission" className="block text-crimson font-bold uppercase tracking-wider text-[12px] mb-0.5">
                    &gt; MISSION BRIEF
                  </label>
                  <textarea
                    id="terminal-mission"
                    required
                    rows={3}
                    placeholder="Tell_me_what_you're_looking_to_achieve,_and_how_I_can_help...."
                    className="w-full bg-[#0d0d0d] border border-gray-800 focus:border-crimson focus:outline-none text-white px-3 py-1.5 font-mono text-xs transition-colors duration-200 resize-none"
                    value={formData.missionBrief}
                    onChange={(e) => setFormData({ ...formData, missionBrief: e.target.value })}
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-crimson/10 hover:bg-crimson border border-crimson text-crimson hover:text-white transition-all duration-300 font-bold py-2.5 uppercase tracking-widest text-[11px] relative overflow-hidden group shadow-[0_0_15px_rgba(255,42,0,0.1)] hover:shadow-[0_0_30px_rgba(255,42,0,0.4)] cursor-pointer mt-1"
                >
                  [ Proceed to Connect ]
                </button>
              </form>
            )}

            {status === 'transmitting' && (
              <div className="p-5 space-y-4 relative overflow-y-auto flex-grow">
                <div className="space-y-2">
                  <div className="text-crimson font-bold uppercase tracking-wider text-xs flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-crimson rounded-full animate-ping"></span>
                    TRANSMITTING ENCRYPTED PACKETS...
                  </div>

                  {/* Logs Window */}
                  <div className="bg-black border border-crimson/20 p-4 h-40 rounded overflow-y-auto font-mono text-xs space-y-1 text-gray-400">
                    {terminalLogs.map((log, index) => (
                      <div key={index} className="flex gap-1.5">
                        <span className="text-crimson">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                    <div className="w-1.5 h-3 bg-crimson animate-pulse inline-block ml-0.5 mt-0.5"></div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                    <span>ENCRYPTING CORE DATA</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-900 border border-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-crimson transition-all duration-100 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {status === 'success' && (
              <div className="p-6 text-center space-y-5 relative overflow-y-auto flex-grow">
                <div className="w-16 h-16 bg-[#27c93f]/10 border border-[#27c93f] rounded-full flex items-center justify-center mx-auto text-[#27c93f] shadow-[0_0_20px_rgba(39,201,63,0.2)]">
                  <ShieldCheck size={32} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-crimson font-bold text-lg uppercase tracking-wider font-mono">
                    Transmission Acknowledged
                  </h3>
                  <p className="text-gray-300 text-xs max-w-sm mx-auto leading-relaxed">
                    /Secure-uplink-established-Your-message-has-been-logged-in-our-secure-system-storage-I-will-respond-shortly
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={closeModal}
                    className="bg-crimson text-white border border-crimson px-6 py-1.9 uppercase tracking-widest text-sm font-bold shadow-[0_0_15px_rgba(255,42,0,0.3)] hover:shadow-[0_0_30px_rgba(255,42,0,0.6)] transition-all duration-300 cursor-pointer"
                  >
                    Close Terminal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Minimized Dock */}
      {isOpen && isMinimized && (
        <div className="fixed bottom-6 right-6 z-50 w-72 bg-[#050505] border border-crimson/50 rounded shadow-[0_0_30px_rgba(255,42,0,0.3)] overflow-hidden font-mono text-xs text-gray-300">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-20"></div>

          <div className="flex items-center justify-between px-3 py-2.5 bg-[#111] border-b border-crimson/30 cursor-pointer" onClick={() => setIsMinimized(false)}>
            <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center text-black font-extrabold text-[8px] cursor-pointer focus:outline-none select-none border-none p-0"
                >
                  ✕
                </button>
                <button
                  type="button"
                  onClick={() => setIsMinimized(false)}
                  className="w-3.5 h-3.5 rounded-full bg-[#febb2e] hover:bg-[#febb2e]/80 flex items-center justify-center text-black font-extrabold text-[8px] cursor-pointer focus:outline-none select-none border-none p-0"
                >
                  ─
                </button>
                <button
                  type="button"
                  onClick={() => { setIsMinimized(false); setIsMaximized(true); }}
                  className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 flex items-center justify-center text-black font-extrabold text-[8px] cursor-pointer focus:outline-none select-none border-none p-0"
                >
                  ⤢
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <Terminal size={11} className="text-crimson animate-pulse" />
                <span className="text-crimson font-bold uppercase tracking-wider text-[9px] truncate max-w-[100px]">
                  Connect_LINK
                </span>
              </div>
            </div>
            <span className="text-gray-500 text-[8px] animate-pulse">CLICK TO RESTORE</span>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
