"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import SkillExploreModal from "./SkillExploreModal";
import SkeletonCard from "../ui/SkeletonCard";

const SkillsScene = dynamic(() => import("./SkillsScene"), {
  ssr: false,
  loading: () => <SkeletonCard />,
});

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export default function SkillsSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      icon: "🎨",
      color: "#b65ff8",
      skills: [
        { name: "React", level: 75, category: "Frontend" },
        { name: "Next.js", level: 30, category: "Frontend" },
        { name: "TypeScript", level: 30, category: "Frontend" },
        { name: "TailwindCSS", level: 30, category: "Frontend" },
        { name: "GSAP", level: 30, category: "Frontend" },
        { name: "Three.js", level: 10, category: "Frontend" },
      ]
    },
    {
      name: "Backend",
      icon: "⚙️",
      color: "#5416b5",
      skills: [
        { name: "Node.js", level: 30, category: "Backend" },
        { name: "Express.js", level: 30, category: "Backend" },
        { name: "REST APIs", level: 30, category: "Backend" },
        { name: "Authentication", level: 30, category: "Backend" },
      ]
    },
    {
      name: "Database",
      icon: "🗄️",
      color: "#977DFF",
      skills: [
        { name: "MySQL", level: 30, category: "Database" },
        { name: "MongoDB", level: 30, category: "Database" },
        { name: "Database Design", level: 30, category: "Database" },
      ]
    },
    {
      name: "Tools & Others",
      icon: "🛠️",
      color: "#7F3AA1",
      skills: [
        { name: "Git", level: 85, category: "Tools" },
        { name: "GitHub", level: 90, category: "Tools" },
        { name: "VS Code", level: 30, category: "Tools" },
        { name: "Figma", level: 0, category: "Tools" },
        { name: "Bootstrap", level: 60, category: "Tools" },
        { name: "Terminal/CLI", level: 30, category: "Tools" },
      ]
    }
  ];

  const allSkills = skillCategories.flatMap(category => category.skills);

  const filteredSkills = activeCategory === "all" 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory);

  // Add CSS animations only
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInDown {
        from {
          opacity: 0;
          transform: translateY(-30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes skillBarFill {
        from {
          width: 0%;
        }
        to {
          width: var(--skill-level);
        }
      }
      
      .skill-bar-fill {
        animation: skillBarFill 1s ease-out both;
      }
      
      /* Add About section style animations on mobile */
      @media (max-width: 768px) {
        .skills-container {
          animation: blurIn 0.6s ease-out forwards;
        }
        
        .skills-left {
          animation: fadeInLeft 0.8s ease-out 0.2s both;
        }
        
        .skills-right {
          animation: fadeInRight 0.8s ease-out 0.4s both;
        }
        
        .skills-text {
          animation: fadeInUp 0.7s ease-out 0.3s both;
        }
        
        .skills-badge {
          animation: fadeInUp 0.7s ease-out 0.1s both;
        }
        
        .skill-bar-fill {
          animation: fadeInUp 0.8s ease-out 0.5s both, skillBarFill 1s ease-out both;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const getSkillLevelColor = (level: number) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <section className="px-4 md:px-6 mt-8">
      <div
        ref={rootRef}
        className="relative max-w-6xl mx-auto p-8 md:p-10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg mobile-no-blur border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <SkillsScene />

        <div className="relative space-y-8">
          {/* Header */}
          <div className="text-center space-y-4" style={{ animation: 'fadeInDown 0.8s ease-out both' }}>
            <p
              className="inline-flex items-center gap-2 text-sm tracking-wide text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full"
            >
              Technical Skills
            </p>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              My Full-Stack Arsenal
            </h2>

            <p className="text-white/80 leading-relaxed max-w-2xl mx-auto">
              A comprehensive skill set spanning frontend, backend, databases, and modern development tools. 
              Always learning and expanding my technical horizons.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCategory === "all"
                  ? "bg-[#5416b5] text-white shadow-lg"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              All Skills
            </button>
            {skillCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeCategory === category.name
                    ? "bg-white/20 text-white border border-white/30"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSkills.map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="p-5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md mobile-no-blur hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                style={{ animation: `fadeInUp 0.8s ease-out ${0.4 + index * 0.1}s both` }}
                onClick={() => {
                  setSelectedSkill(skill.name);
                  setIsModalOpen(true);
                }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#b65ff8] transition-colors">
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white/80 bg-white/10 px-2 py-1 rounded-full">
                      {skill.level}%
                    </span>
                    <svg className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="skill-bar-fill h-full rounded-full transition-all duration-1000 ease-out relative"
                      style={{
                        background: `linear-gradient(90deg, ${skillCategories.find(c => c.name === skill.category || c.skills.includes(skill))?.color || "#5416b5"} 0%, ${skillCategories.find(c => c.name === skill.category || c.skills.includes(skill))?.color || "#5416b5"}dd 100%)`,
                        width: `${skill.level}%`,
                        '--skill-level': `${skill.level}%`,
                        animationDelay: `${0.6 + index * 0.1}s`
                      } as React.CSSProperties}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-xs text-white/60">
                  {skill.level >= 80 && "Expert"}
                  {skill.level >= 60 && skill.level < 80 && "Proficient"}
                  {skill.level < 60 && "Learning"}
                </div>
              </div>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8" style={{ animation: 'fadeInUp 0.8s ease-out 0.8s both' }}>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md mobile-no-blur">
              <div className="text-2xl font-bold text-[#b65ff8]">15+</div>
              <div className="text-sm text-white/70">Technologies</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md mobile-no-blur">
              <div className="text-2xl font-bold text-[#5416b5]">4</div>
              <div className="text-sm text-white/70">Categories</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md mobile-no-blur">
              <div className="text-2xl font-bold text-[#977DFF]">2+</div>
              <div className="text-sm text-white/70">Years Learning</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md mobile-no-blur">
              <div className="text-2xl font-bold text-[#7F3AA1]">Full-Stack</div>
              <div className="text-sm text-white/70">Focus</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Exploration Modal */}
      <SkillExploreModal
        skill={selectedSkill || ""}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSkill(null);
        }}
      />
    </section>
  );
}
