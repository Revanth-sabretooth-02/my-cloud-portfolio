"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useInView, Variants } from "framer-motion";
import { 
  Github, Linkedin, Mail, Award, Server, ShieldCheck, Cloud, ExternalLink, Terminal, CheckCircle2, Code2,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaAws, FaDatabase } from "react-icons/fa";
import { SiPython } from "react-icons/si";

// --- DATA SECTIONS ---

const skills = [
  { category: "Cloud Infrastructure", items: ["Google Cloud Platform (GCP)", "AWS"] },
  { category: "Monitoring & Observability", items: ["Grafana", "PMM", "Datadog"] },
  { category: "DevOps & Tools", items: ["Docker", "Kubernetes", "GKE", "Terraform", "Git/GitHub"] },
  { category: "Operating Systems", items: ["Linux/Unix", "Windows"] },
  { category: "ITSM", items: ["Freshservice"] },
];

const languages = [
  { name: "Python", icon: <SiPython size={28} className="text-blue-400" /> },
  { name: "SQL", icon: <FaDatabase size={28} className="text-cyan-400" /> }
];

const certifications = [
  { name: "Professional Cloud Architect (PCA)", issuer: "Google Cloud", year: "2025", icon: <FcGoogle size={32} /> },
  { name: "Associate Cloud Engineer (ACE)", issuer: "Google Cloud", year: "2024", icon: <FcGoogle size={32} /> },
  { name: "Cloud Digital Leader (CDL)", issuer: "Google Cloud", year: "2024", icon: <FcGoogle size={32} /> },
  { name: "Certified Cloud Practitioner", issuer: "AWS", year: "2024", icon: <FaAws size={32} className="text-[#FF9900]" /> },
  { name: "NASSCOM Certified", issuer: "NASSCOM", year: "2024", icon: <Award size={32} className="text-cyan-400" /> },
];

const experience = [
  {
    role: "Cloud Security & Reliability Engineer",
    company: "Searce",
    date: "April 2024 - Present",
    responsibilities: [
      "Monitored and maintained cloud infrastructure health and performance, ensuring high availability and reliability.",
      "Proactively monitored infrastructure performance and availability using Grafana, Datadog, and PMM, enabling early detection and resolution of potential issues.",
      "Ensured compliance with defined SLAs and SLOs by implementing robust alerting, debugging, and remediation practices.",
      "Prepared quarterly GCP infrastructure assessment and audit reports, highlighting optimization opportunities and compliance gaps.",
      "Managed IAM permissions, deployments, and access control policies to strengthen security and streamline operations.",
      "Applied monthly patching and upgrades to virtual machines (VMs), enhancing system security and stability."
    ],
    achievements: [
      "Achieved 100% SLA compliance, consistently resolving incidents and cases within defined timelines.",
      "Optimized infrastructure usage and monitoring setup, contributing to measurable cost savings."
    ]
  }
];

// --- ANIMATION VARIANTS ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
};

// --- COMPONENTS ---

// 1. Typewriter Effect
const Typewriter = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50); 
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="inline-block">
      {displayText}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-cyan-400 font-bold`}>|</span>
    </span>
  );
};

// 2. WARP SPEED BACKGROUND (Canvas)
const WarpBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const starCount = 500;
    const stars: { x: number; y: number; z: number; o: number }[] = [];
    
    let mouseX = width / 2;
    let mouseY = height / 2;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width, 
        o: Math.random(), 
      });
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    
    const render = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.4)"; 
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      
      const warpX = (mouseX - cx) * 0.5;
      const warpY = (mouseY - cy) * 0.5;

      stars.forEach((star) => {
        star.z -= 5; 

        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.z = width;
        }

        const k = 128.0 / star.z;
        const px = (star.x + warpX) * k + cx;
        const py = (star.y + warpY) * k + cy;

        const size = (1 - star.z / width) * 4;
        const opacity = (1 - star.z / width);

        if (px >= 0 && px <= width && py >= 0 && py <= height && size > 0) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(34, 211, 238, ${opacity})`;
          ctx.arc(px, py, size / 2, 0, Math.PI * 2);
          ctx.fill();

          if (size > 1.5) {
             ctx.beginPath();
             ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.5})`;
             ctx.lineWidth = size / 4;
             const tx = (px - cx) * 1.05 + cx;
             const ty = (py - cy) * 1.05 + cy;
             ctx.moveTo(px, py);
             ctx.lineTo(tx, ty);
             ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none -z-10 bg-slate-950"
    />
  );
};

// --- LAYOUT COMPONENTS ---

interface SectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

const Section = ({ children, id, className = "" }: SectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // FIX: Added mb-32 to force spacing between sections
  // Reduced py-40 to py-24 so it's not too tall internally
  return (
    <section ref={ref} id={id} className={`py-24 mb-32 last:mb-0 px-6 md:px-24 lg:px-32 relative z-10 ${className}`}>
      <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </section>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card = ({ children, className = "", onClick }: CardProps) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ 
      y: -8, 
      scale: 1.02,
      boxShadow: "0 20px 40px -15px rgba(6, 182, 212, 0.2)",
      borderColor: "rgba(34, 211, 238, 0.4)"
    }}
    onClick={onClick}
    className={`bg-slate-900/60 backdrop-blur-xl border border-slate-800/60 p-8 rounded-2xl transition-colors ${className}`}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen text-slate-200 selection:bg-cyan-500 selection:text-white font-sans overflow-x-hidden relative">
      
      <WarpBackground />

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-50" style={{ scaleX }} />

      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-40 bg-slate-950/70 backdrop-blur-xl border border-slate-800/50 rounded-full px-8 py-4 shadow-2xl flex gap-8 text-sm font-medium whitespace-nowrap">
        {['About', 'Experience', 'Skills', 'Languages', 'Certifications'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors tracking-wide">
            {item}
          </a>
        ))}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative py-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, duration: 1.2 }}
        >
          <div className="w-48 h-48 mx-auto mb-10 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.5)] relative group">
            <img src="/profile.jpg" alt="Revanth P" className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
          </div>

          <h2 className="text-cyan-400 font-mono mb-6 text-lg tracking-[0.2em]">HELLO, I AM</h2>
          {/* Reduced mb-8 to mb-4 for tighter spacing */}
          <h1 className="text-7xl md:text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-100 to-slate-500 mb-4 tracking-tight drop-shadow-2xl">
            Revanth P
          </h1>
          
          {/* Reduced mb-12 to mb-8 and removed fixed height container */}
          {/* Removed the '>' sign span */}
          <div className="mb-8">
            <p className="text-xl md:text-3xl text-cyan-400/90 max-w-3xl mx-auto font-light leading-relaxed font-mono">
              <Typewriter text="Cloud Security & Reliability Engineer" delay={500} />
            </p>
          </div>
          
          <div className="flex gap-6 justify-center">
            <a href="https://github.com/Revanth-sabretooth-02" target="_blank" className="p-4 bg-slate-800/30 hover:bg-cyan-600/20 backdrop-blur-xl rounded-2xl transition-all border border-slate-700/50 hover:border-cyan-400/50 hover:-translate-y-2 hover:shadow-[0_10px_20px_-10px_rgba(6,182,212,0.5)] group"><Github size={26} className="group-hover:text-cyan-400 transition-colors"/></a>
            <a href="https://www.linkedin.com/in/revanth-p-02j2001" target="_blank" className="p-4 bg-slate-800/30 hover:bg-blue-600/20 backdrop-blur-xl rounded-2xl transition-all border border-slate-700/50 hover:border-blue-400/50 hover:-translate-y-2 hover:shadow-[0_10px_20px_-10px_rgba(59,130,246,0.5)] group"><Linkedin size={26} className="group-hover:text-blue-400 transition-colors"/></a>
            <a href="mailto:revanthpalani1@gmail.com" className="p-4 bg-slate-800/30 hover:bg-red-500/20 backdrop-blur-xl rounded-2xl transition-all border border-slate-700/50 hover:border-red-400/50 hover:-translate-y-2 hover:shadow-[0_10px_20px_-10px_rgba(239,68,68,0.5)] group"><Mail size={26} className="group-hover:text-red-400 transition-colors"/></a>
            <a href="https://www.credly.com/users/revanth-p.3b054e92" target="_blank" className="p-4 bg-slate-800/30 hover:bg-orange-500/20 backdrop-blur-xl rounded-2xl transition-all border border-slate-700/50 hover:border-orange-400/50 hover:-translate-y-2 hover:shadow-[0_10px_20px_-10px_rgba(249,115,22,0.5)] group"><Award size={26} className="group-hover:text-orange-400 transition-colors"/></a>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <Section id="about" className="max-w-5xl mx-auto">
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-cyan-950/50 rounded-2xl border border-cyan-800/60 shadow-[0_0_15px_rgba(6,182,212,0.2)]"><Terminal className="text-cyan-400" size={32} /></div>
            <h2 className="text-5xl font-bold text-white">About Me</h2>
          </div>
          <Card className="!p-10 !bg-slate-900/30">
            <p className="text-slate-300 leading-[2.2] text-xl font-light">
                Aspiring enthusiast with a focus on cloud technology. I&apos;m passionate about continuous learning, constantly seeking new knowledge and opportunities for self-improvement. I firmly believe in the power of possibilities and am committed to making meaningful contributions in the ever-evolving tech landscape. I envision fostering a collaborative work environment where creativity flourishes, contributing fresh perspectives, and boundless enthusiasm. My goal is to become an invaluable asset to my organization, consistently delivering results and adding significant value.
            </p>
          </Card>
        </motion.div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" className="max-w-6xl mx-auto">
        <motion.div variants={itemVariants}>
            <div className="flex items-center gap-4 mb-16">
            <div className="p-3 bg-cyan-950/50 rounded-2xl border border-cyan-800/60 shadow-[0_0_15px_rgba(6,182,212,0.2)]"><Server className="text-cyan-400" size={32}/></div>
            <h2 className="text-5xl font-bold text-white">Experience</h2>
            </div>
        </motion.div>

        <div className="relative border-l-2 border-slate-800/60 ml-4 space-y-20">
          {experience.map((job, index) => (
            <motion.div 
              key={index}
              className="ml-12 relative"
              variants={itemVariants}
            >
              <div className="absolute -left-[59px] top-2 bg-cyan-500 h-6 w-6 rounded-full border-[5px] border-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
              
              <Card className="!p-10">
                <h3 className="text-3xl font-bold text-white mb-3">{job.role}</h3>
                <div className="text-cyan-400 mb-8 font-mono text-base flex items-center gap-3">
                  <span className="font-semibold">{job.company}</span>
                  <span className="text-slate-600">•</span>
                  <span>{job.date}</span>
                </div>
                
                <ul className="space-y-5 text-slate-300 mb-10">
                    {job.responsibilities.map((resp, i) => (
                        <motion.li 
                            key={i} 
                            className="flex items-start gap-4"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-cyan-500 mt-[10px] h-2.5 w-2.5 bg-cyan-500 rounded-full shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.4)]"></span>
                            <span className="leading-relaxed text-lg">{resp}</span>
                        </motion.li>
                    ))}
                </ul>

                <motion.div 
                    className="bg-gradient-to-r from-cyan-950/40 to-transparent border-l-4 border-cyan-400 p-6 rounded-r-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    viewport={{ once: true }}
                >
                      <h4 className="text-cyan-300 font-bold text-xl mb-4 flex items-center gap-3">
                        <CheckCircle2 size={24} className="text-cyan-400" /> Key Achievements
                      </h4>
                      <ul className="space-y-4 text-slate-200">
                        {job.achievements.map((ach, i) => (
                            <li key={i} className="flex items-start gap-3 text-lg">
                                <span className="text-green-400 font-bold mt-[2px] text-xl">✓</span>
                                <span className="leading-relaxed">{ach}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants}>
            <div className="flex items-center gap-4 mb-16">
            <div className="p-3 bg-cyan-950/50 rounded-2xl border border-cyan-800/60 shadow-[0_0_15px_rgba(6,182,212,0.2)]"><ShieldCheck className="text-cyan-400" size={32} /></div>
            <h2 className="text-5xl font-bold text-white">Technical Arsenal</h2>
            </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skills.map((skillGroup, idx) => (
            <Card key={idx} className="flex flex-col h-full !p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 border-b border-slate-800/80 pb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-3 mt-auto">
                {skillGroup.items.map((skill, i) => (
                  <motion.span 
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 + i * 0.05, type: "spring" }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-slate-800/40 text-cyan-200 text-sm font-medium rounded-xl border border-slate-700/50 hover:bg-cyan-900/30 hover:border-cyan-400/50 transition-all cursor-default shadow-lg shadow-slate-950/50"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Languages Section - Removed specific mt-40, relying on Section mb-32 */}
      <Section id="languages" className="max-w-5xl mx-auto">
        <motion.div variants={itemVariants}>
            <div className="flex items-center gap-4 mb-16">
            <div className="p-3 bg-cyan-950/50 rounded-2xl border border-cyan-800/60 shadow-[0_0_15px_rgba(6,182,212,0.2)]"><Code2 className="text-cyan-400" size={32} /></div>
            <h2 className="text-5xl font-bold text-white">Languages</h2>
            </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {languages.map((lang, idx) => (
            <Card key={idx} className="flex items-center gap-8 group !p-6">
                <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all">
                    {lang.icon}
                </div>
                <h3 className="text-3xl font-bold text-white">{lang.name}</h3>
            </Card>
          ))}
        </div>
      </Section>

      {/* Certifications Section */}
      <Section id="certifications" className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants}>
            <div className="flex items-center gap-4 mb-16">
            <div className="p-3 bg-cyan-950/50 rounded-2xl border border-cyan-800/60 shadow-[0_0_15px_rgba(6,182,212,0.2)]"><Cloud className="text-cyan-400" size={32} /></div>
            <h2 className="text-5xl font-bold text-white">Certifications</h2>
            </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, idx) => (
            <Card key={idx} className="h-full group cursor-pointer relative overflow-hidden flex flex-col !p-8">
               <motion.div
                  className="absolute top-4 right-4 p-3 bg-slate-800/80 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  whileHover={{ rotate: 45, scale: 1.1 }}
                >
                  <ExternalLink size={20} className="text-cyan-400"/>
                </motion.div>
                
                <div className="flex items-start gap-5 mb-6">
                    <div className="shrink-0 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-inner group-hover:border-cyan-500/30 transition-colors">
                        {cert.icon}
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-xl leading-tight group-hover:text-cyan-400 transition-colors">{cert.name}</h3>
                    </div>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-6 border-t border-slate-800/50">
                  <span className="text-slate-400 font-medium text-lg">{cert.issuer}</span>
                  <span className="text-cyan-300 font-mono font-bold bg-cyan-950/50 border border-cyan-900/80 px-4 py-2 rounded-lg shadow-sm">{cert.year}</span>
                </div>
            </Card>
          ))}
        </div>
        
        <motion.div variants={itemVariants} className="mt-20 text-center">
            <a href="https://www.credly.com/users/revanth-p.3b054e92" target="_blank" className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-900/20 text-cyan-400 hover:bg-cyan-600/20 border border-cyan-700/50 rounded-full transition-all font-bold text-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:-translate-y-1">
                <Award size={24}/> View Official Credly Profile
            </a>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-950/60 backdrop-blur-xl py-16 text-center relative z-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
             {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="absolute bg-white h-0.5 w-0.5 rounded-full" style={{ top: `${(i * 13) % 100}%`, left: `${(i * 7) % 100}%` }}></div>
             ))}
        </div>
        <p className="text-slate-400 mb-4 font-medium text-lg">Designed & Built for <span className="text-cyan-400 font-bold">Revanth P</span></p>
        <div className="text-slate-500 flex justify-center items-center gap-6">
            <span>Bengaluru, India</span>
            <span className="text-slate-700">•</span>
            <a href="mailto:revanthpalani1@gmail.com" className="hover:text-cyan-400 transition-colors">revanthpalani1@gmail.com</a>
        </div>
      </footer>
    </div>
  );
}