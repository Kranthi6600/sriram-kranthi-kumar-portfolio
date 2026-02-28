"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ExperienceScene from "./ExperienceScene";

interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  description: string[];
  technologies: string[];
  liveUrl?: string;
}

export default function ExperienceSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Add CSS animations
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
      
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      .experience-card {
        animation: fadeInUp 0.6s ease-out both;
      }
      
      .tech-tag {
        animation: slideInLeft 0.5s ease-out both;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const experiences: ExperienceItem[] = [
    {
      title: "Full-Stack Developer",
      organization: "WeHowAre Technologies",
      period: "2026 - Present",
      description: [
        "Currently developing full-stack web applications for a Canada-based technology company",
        "Working on modern web solutions using Next.js, React, and Node.js technologies",
        "Contributing to scalable and innovative digital platforms",
        "Collaborating with international team on cutting-edge projects"
      ],
      technologies: ["Next.js", "React", "Node.js", "TypeScript", "Full-Stack Development"],
      liveUrl: "https://wehoware.com/"
    }
  ];

  return (
    <section className="px-4 md:px-6 mt-8">
      <div
        ref={rootRef}
        className="relative max-w-6xl mx-auto p-6 sm:p-8 md:p-10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <ExperienceScene />

        <div className="relative space-y-8">
          {/* Header */}
          <div className="text-center space-y-4" style={{ animation: 'fadeInDown 0.8s ease-out both' }}>
            <p
              className="inline-flex items-center gap-2 text-sm tracking-wide text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full"
            >
              Work Experience
            </p>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Professional Journey
            </h2>

            <p className="text-white/80 leading-relaxed max-w-2xl mx-auto">
              My professional experience building modern web applications and contributing to innovative projects.
            </p>
          </div>

          {/* Experience Content */}
          <div className="space-y-8" style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md hover:bg-white/15 transition-all duration-300 experience-card"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {experience.title}
                    </h3>
                    <div className="flex items-center gap-4 mb-3">
                      <a
                        href={experience.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#b65ff8] font-medium hover:text-[#977DFF] transition-colors flex items-center gap-2"
                      >
                        {experience.organization}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <span className="text-white/60 text-sm">
                        • {experience.period}
                      </span>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {experience.description.map((desc, descIndex) => (
                    <li key={descIndex} className="text-white/80 leading-relaxed flex items-start gap-3">
                      <span className="text-[#977DFF] mt-1.5 text-lg">•</span>
                      <span className="flex-1">{desc}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="tech-tag px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-white/90"
                      style={{
                        animationDelay: `${(index * 0.2) + (techIndex * 0.1)}s`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Future Goals */}
          <div className="text-center p-6 rounded-xl bg-gradient-to-r from-[#5416b5]/20 to-[#b65ff8]/20 border border-[#5416b5]/30" style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}>
            <h3 className="text-xl font-semibold text-white mb-3">
              Career Goals & Aspirations
            </h3>
            <p className="text-white/80 leading-relaxed max-w-3xl mx-auto">
              Currently building my foundation at WeHowAre Technologies with plans to grow with the company for 2-5+ years, 
              depending on salary expectations and career development opportunities. Focused on becoming a senior full-stack 
              developer and contributing to innovative projects that make a difference.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12" style={{ animation: 'fadeInUp 0.8s ease-out 0.8s both' }}>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="text-2xl font-bold text-[#b65ff8]">2026</div>
              <div className="text-sm text-white/70">Started Professional Journey</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="text-2xl font-bold text-[#7A85C1]">Canada</div>
              <div className="text-sm text-white/70">Based Company</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="text-2xl font-bold text-[#977DFF]">2-5+</div>
              <div className="text-sm text-white/70">Years Growth Plan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
