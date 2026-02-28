"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SkillExploreModalProps {
  skill: string;
  isOpen: boolean;
  onClose: () => void;
}

interface SkillDetail {
  title: string;
  description: string;
  level: number;
  projects: string[];
  resources: { title: string; url: string }[];
  category: string;
}

const skillDetails: Record<string, SkillDetail> = {
  "React": {
    title: "React.js",
    description: "A powerful JavaScript library for building user interfaces with component-based architecture and virtual DOM for optimal performance.",
    level: 85,
    projects: ["React To-Do App"],
    resources: [
      { title: "Official Documentation", url: "https://react.dev" },
      { title: "React Patterns", url: "https://reactpatterns.com" }
    ],
    category: "Frontend"
  },
  "Next.js": {
    title: "Next.js",
    description: "A React framework for production-ready applications with server-side rendering, static site generation, and API routes.",
    level: 75,
    projects: ["Portfolio Website (Under Development)", "Click&Cart Ecommerce"],
    resources: [
      { title: "Next.js Docs", url: "https://nextjs.org/docs" },
      { title: "Learn Next.js", url: "https://nextjs.org/learn" }
    ],
    category: "Frontend"
  },
  "Node.js": {
    title: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 engine for server-side development and building scalable network applications.",
    level: 70,
    projects: ["Click&Cart Ecommerce"],
    resources: [
      { title: "Node.js Docs", url: "https://nodejs.org/docs" },
      { title: "Node Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices" }
    ],
    category: "Backend"
  },
  "TypeScript": {
    title: "TypeScript",
    description: "Typed superset of JavaScript that compiles to plain JavaScript, providing static typing and enhanced IDE support.",
    level: 65,
    projects: ["Portfolio Website (Under Development)"],
    resources: [
      { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs" },
      { title: "TypeScript Deep Dive", url: "https://basarat.gitbook.io/typescript/" }
    ],
    category: "Language"
  },
  "MongoDB": {
    title: "MongoDB",
    description: "NoSQL database with flexible schema and powerful querying capabilities for modern application development.",
    level: 60,
    projects: [],
    resources: [
      { title: "MongoDB University", url: "https://university.mongodb.com" },
      { title: "MongoDB Docs", url: "https://docs.mongodb.com" }
    ],
    category: "Database"
  },
  "Bootstrap": {
    title: "Bootstrap",
    description: "Popular CSS framework for building responsive, mobile-first websites with pre-built components and utilities.",
    level: 75,
    projects: ["Blood Donation Portal"],
    resources: [
      { title: "Bootstrap Docs", url: "https://getbootstrap.com/docs/" },
      { title: "Bootstrap Examples", url: "https://getbootstrap.com/docs/5.3/examples/" }
    ],
    category: "Styling"
  },
  "MySQL": {
    title: "MySQL",
    description: "Popular open-source relational database management system known for reliability, performance, and ease of use.",
    level: 65,
    projects: ["Click&Cart Ecommerce"],
    resources: [
      { title: "MySQL Documentation", url: "https://dev.mysql.com/doc/" },
      { title: "MySQL Tutorial", url: "https://www.mysqltutorial.org/" }
    ],
    category: "Database"
  },
  "TailwindCSS": {
    title: "Tailwind CSS",
    description: "Utility-first CSS framework for rapidly building custom user interfaces without writing custom CSS.",
    level: 80,
    projects: ["Portfolio Website (Under Development)", "Click&Cart Ecommerce"],
    resources: [
      { title: "Tailwind Docs", url: "https://tailwindcss.com/docs" },
      { title: "Tailwind Components", url: "https://tailwindui.com/components" }
    ],
    category: "Styling"
  },
  "Three.js": {
    title: "Three.js",
    description: "Powerful 3D graphics library for creating stunning webGL experiences, animations, and interactive 3D content in the browser.",
    level: 10,
    projects: ["Portfolio Website (Under Development)"],
    resources: [
      { title: "Three.js Official Docs", url: "https://threejs.org/docs/" },
      { title: "Three.js Fundamentals", url: "https://threejs-journey.com/" },
      { title: "Three.js Examples", url: "https://threejs.org/examples/" }
    ],
    category: "Graphics"
  }
};

export default function SkillExploreModal({ skill, isOpen, onClose }: SkillExploreModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const skillDetail = skillDetails[skill] || {
    title: skill,
    description: "A technology I'm proficient in and use regularly in my projects.",
    level: 70,
    projects: ["Various Projects"],
    resources: [],
    category: "General"
  };

  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    const content = contentRef.current;
    
    if (!modal || !content) return;

    const ctx = gsap.context(() => {
      // Modal backdrop animation
      gsap.fromTo(modal, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Content animation
      gsap.fromTo(content,
        { 
          scale: 0.8,
          opacity: 0,
          y: 50
        },
        { 
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
          delay: 0.1
        }
      );

      // Staggered animations for content elements
      gsap.from(".modal-element", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.3,
        ease: "power2.out",
        delay: 0.3
      });

    }, modalRef);

    return () => ctx.revert();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExplore = () => {
    // Navigate to projects filtered by this skill
    window.location.href = `/projects?skill=${skill.toLowerCase()}`;
  };

  const handleLearnMore = () => {
    // Open first resource or search for the skill
    if (skillDetail.resources.length > 0) {
      window.open(skillDetail.resources[0].url, '_blank');
    } else {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(skill + ' tutorial')}`, '_blank');
    }
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        ref={contentRef}
        className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6 modal-element">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{skillDetail.title}</h2>
            <span className="inline-block px-3 py-1 bg-[#b65ff8]/20 text-[#b65ff8] border border-[#b65ff8]/30 rounded-full text-sm">
              {skillDetail.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-white/80 leading-relaxed mb-6 modal-element">
          {skillDetail.description}
        </p>

        {/* Skill Level */}
        <div className="mb-6 modal-element">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium">Proficiency Level</span>
            <span className="text-[#b65ff8] font-medium">{skillDetail.level}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#5416b5] to-[#b65ff8] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${skillDetail.level}%` }}
            />
          </div>
        </div>

        {/* Projects */}
        <div className="mb-6 modal-element">
          <h3 className="text-xl font-semibold text-white mb-3">Projects Using {skillDetail.title}</h3>
          <div className="space-y-2">
            {skillDetail.projects.map((project, index) => (
              <div key={index} className="flex items-center gap-2 text-white/70">
                <svg className="w-4 h-4 text-[#977DFF]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                <span>{project}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        {skillDetail.resources.length > 0 && (
          <div className="mb-8 modal-element">
            <h3 className="text-xl font-semibold text-white mb-3">Learning Resources</h3>
            <div className="space-y-2">
              {skillDetail.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#b65ff8] hover:text-[#977DFF] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>{resource.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 modal-element">
          <button
            onClick={handleExplore}
            className="flex-1 px-6 py-3 bg-[#5416b5] hover:bg-[#6a1fe0] text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Explore {skillDetail.title} Projects
          </button>
          <button
            onClick={handleLearnMore}
            className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-200 border border-white/20"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
