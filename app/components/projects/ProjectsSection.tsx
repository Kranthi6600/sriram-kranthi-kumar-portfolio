"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import LazySection from "../LazySection";

const ProjectScene = dynamic(() => import("./ProjectsScene"), {
  ssr: false,
  loading: () => null,
});

interface Project {
  id: number;
  title: string;
  description: string;
  liveUrl: string;
  githubUrl?: string;
  technologies: string[];
  category: "frontend" | "fullstack" | "utility" | "learning";
  featured: boolean;
  underDevelopment?: boolean;
}

export default function ProjectsSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");

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
      
      @keyframes fadeInLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes fadeInRight {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes blurIn {
        from {
          filter: blur(10px);
          opacity: 0;
        }
        to {
          filter: blur(0);
          opacity: 1;
        }
      }
      
      .featured-card {
        animation: fadeInUp 0.6s ease-out both;
      }
      
      .project-card {
        animation: slideInLeft 0.5s ease-out both;
      }
      
      /* Add About section style animations on mobile */
      @media (max-width: 768px) {
        .projects-container {
          animation: blurIn 0.6s ease-out forwards;
        }
        
        .projects-left {
          animation: fadeInLeft 0.8s ease-out 0.2s both;
        }
        
        .projects-right {
          animation: fadeInRight 0.8s ease-out 0.4s both;
        }
        
        .projects-text {
          animation: fadeInUp 0.7s ease-out 0.3s both;
        }
        
        .projects-badge {
          animation: fadeInUp 0.7s ease-out 0.1s both;
        }
        
        .featured-card,
        .project-card {
          animation: fadeInUp 0.8s ease-out 0.5s both;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A stunning frontend portfolio website with React, Next.js, Three.js, GSAP animations, and glassmorphism design. Features interactive 3D backgrounds, smooth animations, and professional transitions.",
      liveUrl: "https://sriram-kranthi-kumar.vercel.app/",
      githubUrl: "https://github.com/Kranthi6600/portfolio",
      technologies: ["React", "Next.js", "Three.js", "GSAP", "TailwindCSS"],
      category: "frontend",
      featured: true
    },
    {
      id: 2,
      title: "To-Do List",
      description: "A feature-rich to-do list application with task management, categories, and local storage persistence. Achieved 95% user satisfaction with intuitive UI and 100% data persistence reliability. Clean and intuitive user interface.",
      liveUrl: "https://kranthi6600.github.io/To-Do-List/",
      technologies: ["HTML", "CSS", "JavaScript", "Local Storage"],
      category: "frontend",
      featured: true
    },
    {
      id: 3,
      title: "Weather Forecast",
      description: "Real-time weather application with location-based forecasts, current conditions, and beautiful weather animations. Integrates with weather APIs.",
      liveUrl: "https://kranthi6600.github.io/Weather-Forecast/",
      technologies: ["HTML", "CSS", "JavaScript", "Weather API", "Geolocation"],
      category: "frontend",
      featured: true
    },
    {
      id: 4,
      title: "Crypto Price Tracker",
      description: "Live cryptocurrency price tracking application with real-time updates, portfolio tracking, and price charts for major cryptocurrencies.",
      liveUrl: "https://kranthi6600.github.io/Crypto-Price-Tracker/",
      technologies: ["HTML", "CSS", "JavaScript", "Crypto API", "Charts"],
      category: "frontend",
      featured: false
    },
    {
      id: 5,
      title: "Location Notification App",
      description: "Geolocation-based notification app that sends alerts based on user location. Features location tracking and customizable notifications.",
      liveUrl: "https://kranthi6600.github.io/location-notification-app/",
      technologies: ["HTML", "CSS", "JavaScript", "Geolocation API", "Notifications"],
      category: "utility",
      featured: false
    },
    {
      id: 6,
      title: "Simple JS Calculator with Dark Mode",
      description: "A fully functional calculator with basic arithmetic operations and a sleek dark mode toggle. Responsive design with smooth animations.",
      liveUrl: "https://kranthi6600.github.io/Simple-JS-Calculator-with-Dark-Mode/",
      technologies: ["HTML", "CSS", "JavaScript", "Dark Mode", "Calculator Logic"],
      category: "utility",
      featured: false
    },
    {
      id: 7,
      title: "User Dashboard",
      description: "Modern user dashboard with analytics, charts, and data visualization. Features responsive design and interactive components.",
      liveUrl: "https://kranthi6600.github.io/User-Dashboard/",
      technologies: ["HTML", "CSS", "JavaScript", "Charts", "Dashboard UI"],
      category: "frontend",
      featured: false
    },
    {
      id: 8,
      title: "Speech to Text",
      description: "Voice recognition application that converts speech to text in real-time. Features multiple language support and text export functionality.",
      liveUrl: "https://kranthi6600.github.io/Speech-to-Text/",
      technologies: ["HTML", "CSS", "JavaScript", "Web Speech API", "Text Processing"],
      category: "utility",
      featured: false
    },
    {
      id: 9,
      title: "Todo App via React",
      description: "Modern React-based todo application with state management, filtering, and responsive design. Demonstrates React hooks and component architecture.",
      liveUrl: "https://todo-app-via-react.vercel.app/",
      technologies: ["React", "JavaScript", "CSS", "State Management", "Hooks"],
      category: "frontend",
      featured: true
    },
    {
      id: 10,
      title: "Image-verse",
      description: "Image gallery and manipulation application with filters, effects, and editing capabilities. Features drag-and-drop and image processing.",
      liveUrl: "https://kranthi6600.github.io/Image-verse/",
      technologies: ["HTML", "CSS", "JavaScript", "Image Processing", "Canvas API"],
      category: "frontend",
      featured: false
    },
    {
      id: 12,
      title: "Click&Cart Ecommerce",
      description: "A modern ecommerce platform with product catalog, shopping cart, user authentication, and payment integration. Built with Next.js, MySQL, and TailwindCSS for optimal performance.",
      liveUrl: "#",
      githubUrl: "#",
      technologies: ["Next.js", "MySQL", "TailwindCSS", "Ecommerce", "Payment Integration"],
      category: "fullstack",
      featured: true,
      underDevelopment: true
    },
    {
      id: 13,
      title: "Text Conversion",
      description: "Multi-format text conversion tool supporting various text transformations, encoding/decoding, and format conversions.",
      liveUrl: "https://kranthi6600.github.io/text_conversion/",
      technologies: ["HTML", "CSS", "JavaScript", "Text Processing", "Conversion Algorithms"],
      category: "utility",
      featured: false
    },
    {
      id: 14,
      title: "Speech to Text",
      description: "Advanced voice recognition application currently under development. Will feature real-time speech-to-text conversion with multiple language support and advanced text processing capabilities.",
      liveUrl: "#",
      technologies: ["React", "Web Speech API", "TypeScript", "Text Processing", "UI/UX"],
      category: "frontend",
      featured: false,
      underDevelopment: true
    },
    {
      id: 15,
      title: "Blood Donation Portal",
      description: "Comprehensive blood donation platform currently being enhanced. Will feature donor registration, blood bank management, emergency requests, and real-time availability tracking.",
      liveUrl: "#",
      technologies: ["React", "Node.js", "MongoDB", "Authentication", "Real-time Updates"],
      category: "fullstack",
      featured: false,
      underDevelopment: true
    }
  ];

  // Remove debug log and simplify filtering
  const featuredProjects = projects.filter(p => p.featured);
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Add simple CSS-based animations only
  useEffect(() => {
    // No GSAP - just ensure component is mounted
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend": return "bg-[#b65ff8]/20 text-[#b65ff8] border-[#b65ff8]/30";
      case "fullstack": return "bg-[#5416b5]/20 text-[#5416b5] border-[#5416b5]/30";
      case "utility": return "bg-[#977DFF]/20 text-[#977DFF] border-[#977DFF]/30";
      case "learning": return "bg-[#7F3AA1]/20 text-[#7F3AA1] border-[#7F3AA1]/30";
      default: return "bg-white/10 text-white border-white/20";
    }
  };

  return (
    <section className="px-4 md:px-6 mt-8">
      <div
        ref={rootRef}
        className="relative max-w-6xl mx-auto p-8 md:p-10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg mobile-no-blur border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.05)] mobile-light-shadow overflow-hidden"
      >
        <ProjectScene />

        <div className="relative space-y-8">
          {/* Header */}
          <div className="text-center space-y-4" style={{ animation: 'fadeInDown 0.8s ease-out both' }}>
            <p
              className="inline-flex items-center gap-2 text-sm tracking-wide text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full"
            >
              Project Portfolio
            </p>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              My Creative Projects
            </h2>

            <p className="text-white/80 leading-relaxed max-w-2xl mx-auto">
              A collection of my diverse projects spanning web development, utilities, and full-stack applications. 
              Each project represents a unique challenge and learning experience.
            </p>
          </div>

          {/* Featured Projects */}
          <div className="space-y-4" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="text-2xl">⭐</span> Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group relative p-6 rounded-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 backdrop-blur-md mobile-no-blur mobile-no-blur hover:from-white/20 hover:to-white/10 transition-all duration-300 featured-card"
                  style={{
                    animationDelay: `${index * 0.15}s`
                  }}
                >
                  <div className="absolute top-2 right-2">
                    <span className="text-yellow-400 text-lg">⭐</span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#b65ff8] transition-colors">
                    {project.title}
                  </h4>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white/90"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white/90">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 bg-[#5416b5] hover:bg-[#6a1fe0] text-white text-sm font-medium rounded-lg transition-colors text-center"
                    >
                      Live Demo
                    </a>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3" style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeFilter === "all"
                  ? "bg-[#5416b5] text-white shadow-lg"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveFilter("frontend")}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeFilter === "frontend"
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              Frontend
            </button>
            <button
              onClick={() => setActiveFilter("fullstack")}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeFilter === "fullstack"
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              Full-Stack
            </button>
            <button
              onClick={() => setActiveFilter("utility")}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeFilter === "utility"
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              Utilities
            </button>
          </div>

          {/* All Projects Grid */}
          <div className="space-y-4" style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}>
            {/* Debug info - remove later */}
            <div className="text-white/90 text-sm font-medium bg-white/10 border border-white/20 px-3 py-2 rounded-lg inline-block">
              Showing {filteredProjects.length} of {projects.length} projects (Filter: <span className="text-[#b65ff8] font-semibold">{activeFilter}</span>)
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group p-6 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md mobile-no-blur mobile-no-blur hover:bg-white/15 transition-all duration-300 project-card"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white group-hover:text-[#b65ff8] transition-colors">
                    {project.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                </div>
                
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white/90"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white/90">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-2 bg-[#5416b5] hover:bg-[#6a1fe0] text-white text-sm font-medium rounded-lg transition-colors text-center"
                  >
                    Live Demo
                  </a>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12" style={{ animation: 'fadeInUp 0.8s ease-out 0.8s both' }}>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md mobile-no-blur">
              <div className="text-2xl font-bold text-[#b65ff8]">14+</div>
              <div className="text-sm text-white/70">Total Projects</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md mobile-no-blur">
              <div className="text-2xl font-bold text-[#7A85C1]">5</div>
              <div className="text-sm text-white/70">Featured</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md mobile-no-blur">
              <div className="text-2xl font-bold text-[#977DFF]">2</div>
              <div className="text-sm text-white/70">In Development</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md mobile-no-blur">
              <div className="text-2xl font-bold text-[#7F3AA1]">Live</div>
              <div className="text-sm text-white/70">Demos</div>
            </div>
          </div>

          {/* Under Development Section */}
          <div className="space-y-4" style={{ animation: 'fadeInUp 0.8s ease-out 1s both' }}>
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="text-2xl">🚧</span> Under Development
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.filter(p => p.underDevelopment).map((project, index) => (
                <div
                  key={project.id}
                  className="group relative p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-yellow-500/5 border border-orange-500/20 backdrop-blur-md mobile-no-blur hover:from-orange-500/20 hover:to-yellow-500/10 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <div className="absolute top-2 right-2">
                    <span className="text-orange-400 text-lg">🚧</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                      {project.title}
                    </h4>
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-xs font-medium">
                      Coming Soon
                    </span>
                  </div>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white/90"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white/90">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      disabled
                      className="flex-1 px-3 py-2 bg-orange-500/20 text-orange-400 text-sm font-medium rounded-lg cursor-not-allowed border border-orange-500/30"
                    >
                      🚧 Under Development
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
