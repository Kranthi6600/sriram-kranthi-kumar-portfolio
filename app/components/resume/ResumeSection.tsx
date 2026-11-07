"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";

const ResumeScene = dynamic(() => import("./ResumeScene"), {
  ssr: false,
  loading: () => null,
});

interface ResumeSection {
  title: string;
  items: ResumeItem[];
}

interface ResumeItem {
  title: string;
  organization?: string;
  period: string;
  description: string[];
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function ResumeSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("summary");

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
      
      .resume-card {
        animation: fadeInUp 0.6s ease-out both;
      }
      
      .skill-tag {
        animation: slideInLeft 0.5s ease-out both;
      }
      
      /* Disable slide animations on mobile */
      @media (max-width: 768px) {
        .resume-card,
        .skill-tag {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
        
        /* Add About section style animations on mobile */
        .resume-container {
          animation: blurIn 0.6s ease-out forwards;
        }
        
        .resume-left {
          animation: fadeInLeft 0.8s ease-out 0.2s both;
        }
        
        .resume-right {
          animation: fadeInRight 0.8s ease-out 0.4s both;
        }
        
        .resume-text {
          animation: fadeInUp 0.7s ease-out 0.3s both;
        }
        
        .resume-badge {
          animation: fadeInUp 0.7s ease-out 0.1s both;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const resumeData: Record<string, ResumeSection> = {
    summary: {
      title: "Professional Summary",
      items: [
        {
          title: "Front-End Developer",
          period: "Professional Profile",
          description: [
            "Skilled in building modern web applications using React.js, Next.js, and TypeScript",
            "Experienced in developing responsive user interfaces with exceptional user experiences",
            "Proficient in creating scalable, maintainable code with responsive designs and smooth animations",
            "Focused on delivering front-end applications with optimal performance and accessibility"
          ]
        }
      ]
    },
    education: {
      title: "Education",
      items: [
        {
          title: "B.Sc, Computer Science",
          organization: "Jahnavi Degree College (OU)",
          period: "2025",
          description: ["CGPA: 7.1 (71%)"],
          technologies: ["Computer Science", "Programming", "Algorithms"]
        },
        {
          title: "Intermediate",
          organization: "Sri Chaitanya College",
          period: "Completed",
          description: ["Percentage: 67.6%"],
          technologies: ["Mathematics", "Physics", "Chemistry"]
        },
        {
          title: "SSC",
          organization: "St. Venus High School",
          period: "Completed",
          description: ["CGPA: 7.7 (77%)"],
          technologies: ["General Studies", "Computer Applications"]
        }
      ]
    },
    experience: {
      title: "Work Experience",
      items: [
        {
          title: "Front-End Developer Intern",
          organization: "Wehoware Technologies",
          period: "March 2026 - October 2026 (6 months)",
          description: [
            "Completed 6-month internship developing front-end web applications for a Canada-based technology company",
            "Built modern web solutions using Next.js, React, and TypeScript under senior developer mentorship",
            "Contributed to scalable and innovative digital platforms while learning industry best practices",
            "Collaborated with international team on cutting-edge projects and gained hands-on production experience"
          ],
          technologies: ["Next.js", "React", "TypeScript", "Front-End Development"],
          liveUrl: "https://www.wehoware.com/"
        }
      ]
    },
    skills: {
      title: "Core Skills & Technologies",
      items: [
        {
          title: "Frontend Development",
          period: "Client-Side Skills",
          description: ["Next.js", "React JS", "JavaScript (ES6+)", "TypeScript", "HTML5"],
          technologies: ["Next.js", "React", "JavaScript", "TypeScript", "HTML5"]
        },

        {
          title: "Styling & UI",
          period: "Design Skills",
          description: ["CSS", "Responsive Design", "Modular CSS", "Bootstrap", "TailwindCSS"],
          technologies: ["CSS3", "Bootstrap", "TailwindCSS", "Responsive Design"]
        },
        {
          title: "Development Tools",
          period: "Toolchain",
          description: ["Git", "GitHub", "VS Code", "Vercel", "GitHub Pages", "Postman"],
          technologies: ["Git", "GitHub", "VS Code", "Vercel", "Postman"]
        },
        {
          title: "Additional Skills",
          period: "Soft Skills",
          description: ["Debugging", "Analytical Thinking", "UX Optimization", "Problem Solving"],
          technologies: ["Debugging", "Analytics", "UX Design", "Problem Solving"]
        }
      ]
    },
    projects: {
      title: "Featured Projects",
      items: [
        {
          title: "Blood Donation Portal",
          period: "Front-End Web Application",
          description: [
            "Developed a comprehensive portal with donor registration, blood request forms, and admin dashboard",
            "Implemented responsive design with modular CSS, reusable components, and mobile-first approach",
            "Focused on exceptional user experience with smooth animations and intuitive interface"
          ],
          technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "Responsive Design"],
          liveUrl: "https://kranthi6600.github.io/BLOOD-DONATION-PORTAL/",
          githubUrl: "https://github.com/Kranthi6600/BLOOD-DONATION-PORTAL"
        },
        {
          title: "React To-Do App",
          period: "Front-End Task Management",
          description: [
            "Built a complete task management application with full CRUD operations and persistent storage",
            "Implemented state management with React hooks and local storage for data persistence",
            "Emphasizing component reusability, responsive UI, and state optimization"
          ],
          technologies: ["React.js", "JavaScript", "CSS", "State Management", "Local Storage"],
          liveUrl: "https://todo-app-via-react.vercel.app/",
          githubUrl: "https://github.com/Kranthi6600/todo-app-via-react"
        },
        {
          title: "Image Verse",
          period: "Interactive Gallery Platform",
          description: [
            "Developed a responsive, touch-enabled image gallery with image manipulation features",
            "Implemented file upload, filters, effects, and editing capabilities with JavaScript",
            "Optimized layouts and smooth animations with GSAP for exceptional user experience"
          ],
          technologies: ["HTML", "CSS", "JavaScript", "GSAP", "Canvas API", "Image Processing"],
          liveUrl: "https://kranthi6600.github.io/Image-verse/",
          githubUrl: "https://github.com/Kranthi6600/Image-verse"
        },
        {
          title: "GoldBook",
          period: "Full-Stack Loan Management Application",
          description: [
            "Built a full-stack application for Indian pawnbrokers to track customer loans and manage records",
            "Developed using Next.js, Supabase (PostgreSQL), Prisma, and Tailwind CSS",
            "Implemented authentication, loan tracking, customer management, and full CRUD operations",
            "Designed a clean, accessible UI focused on fast data entry and clear record visibility"
          ],
          technologies: ["Next.js", "Supabase", "PostgreSQL", "Prisma", "TailwindCSS"],
          liveUrl: "https://goldbook-in.vercel.app/"
        },
        {
          title: "RapidFixAuto",
          period: "Business Portfolio Website",
          description: [
            "Developed a client-facing business website using Next.js with clean layout and responsive design",
            "Optimized page structure and assets to support fast load times and smooth experience across devices",
            "Delivered a live production site for a real client, handling deployment and ongoing refinements"
          ],
          technologies: ["Next.js", "Responsive Design", "Performance Optimization", "TailwindCSS"],
          liveUrl: "https://www.rapidfixauto.ca/"
        },
        {
          title: "Mr. Biryani",
          period: "Restaurant Website",
          description: [
            "Built a scroll-based restaurant website using Next.js with smooth scroll animations",
            "Delivered an engaging, mobile-first browsing experience aligned with brand's visual identity",
            "Focused on performance and layout consistency across screen sizes"
          ],
          technologies: ["Next.js", "Scroll Animations", "Responsive Design", "Mobile-First"],
          liveUrl: "https://mr-biryani.vercel.app/"
        }
      ]
    },
    personal: {
      title: "Personal Details",
      items: [
        {
          title: "Personal Information",
          period: "Contact Details",
          description: [
            "Name: Sriram Kranthi Kumar",
            "Father's Name: Sriram Satyanarayana",
            "Date of Birth: 09/08/2003",
            "Address: Uppal, Hyderabad, Telangana"
          ]
        },
        {
          title: "Hobbies & Interests",
          period: "Personal Activities",
          description: [
            "Reading books",
            "Content creation",
            "Video and photo editing"
          ],
          technologies: ["Creative", "Technical", "Artistic"]
        }
      ]
    }
  };

  const currentSection = resumeData[activeSection];

  return (
    <section className="px-4 md:px-6 mt-8">
      <div
        ref={rootRef}
        className="relative max-w-6xl mx-auto p-8 md:p-10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <ResumeScene />

        <div className="relative space-y-8">
          {/* Header */}
          <div className="text-center space-y-4" style={{ animation: 'fadeInDown 0.8s ease-out both' }}>
            <p
              className="inline-flex items-center gap-2 text-sm tracking-wide text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full"
            >
              Professional Resume
            </p>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Sriram Kranthi Kumar
            </h2>

            <p className="text-white/80 leading-relaxed max-w-2xl mx-auto">
              Front-End Developer passionate about creating modern web applications 
              with exceptional user experiences and responsive designs.
            </p>
          </div>

          {/* Section Tabs */}
          <div className="flex flex-wrap justify-center gap-2" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
            {Object.keys(resumeData).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-3 py-2 rounded-full font-medium transition-all duration-200 text-sm ${
                  activeSection === section
                    ? "bg-[#5416b5] text-white shadow-lg"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {resumeData[section].title}
              </button>
            ))}
          </div>

          {/* Resume Content */}
          <div className="space-y-6" style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              {currentSection.title}
            </h3>
            
            <div className="space-y-6">
              {currentSection.items.map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md hover:bg-white/15 transition-all duration-300 resume-card"
                  style={{
                    animationDelay: `${index * 0.15}s`
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {item.title}
                      </h4>
                      {item.organization && (
                        <p className="text-[#b65ff8] font-medium mb-2">
                          {item.organization}
                        </p>
                      )}
                      <p className="text-white/60 text-sm mb-3">
                        {item.period}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-4">
                    {item.description.map((desc, descIndex) => (
                      <li key={descIndex} className="text-white/80 text-sm leading-relaxed flex items-start gap-2">
                        <span className="text-[#977DFF] mt-1.5 text-sm">•</span>
                        <span className="flex-1">{desc}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {item.technologies && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.technologies.map((tech, techIndex) => (
                        <span
                          key={tech}
                          className="skill-tag px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white/90"
                          style={{
                            animationDelay: `${(index * 0.15) + (techIndex * 0.05)}s`
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Project Links */}
                  {(item.liveUrl || item.githubUrl) && (
                    <div className="flex gap-2 pt-2">
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-[#5416b5] hover:bg-[#6a1fe0] text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Live Demo
                        </a>
                      )}
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-8" style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://drive.google.com/file/d/19dhR3r4uIxn_1AFEF03qA5ssE4zcWxWP/view"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-200 border border-white/20 hover:border-white/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview Resume
              </a>
              <a
                href="https://drive.google.com/uc?export=download&id=19dhR3r4uIxn_1AFEF03qA5ssE4zcWxWP"
                download="Sriram_Kranthi_Kumar_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5416b5] hover:bg-[#6a1fe0] text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12" style={{ animation: 'fadeInUp 0.8s ease-out 0.8s both' }}>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="text-2xl font-bold text-[#b65ff8]">6+</div>
              <div className="text-sm text-white/70">Featured Projects</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="text-2xl font-bold text-[#7A85C1]">Next.js</div>
              <div className="text-sm text-white/70">Framework Focus</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="text-2xl font-bold text-[#977DFF]">B.Sc</div>
              <div className="text-sm text-white/70">Computer Science</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="text-2xl font-bold text-[#7F3AA1]">Client</div>
              <div className="text-sm text-white/70">Work Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
