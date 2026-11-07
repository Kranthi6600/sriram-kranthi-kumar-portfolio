"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const AchievementScene = dynamic(() => import("./AchievementScene"), {
  ssr: false,
  loading: () => null,
});

interface Achievement {
  title: string;
  description: string;
  icon: string;
  date: string;
  category: string;
  highlight: boolean;
  isImage?: boolean;
  liveUrl?: string;
}

const achievements: Achievement[] = [
  {
    title: "Front-End Developer Intern at Wehoware Technologies",
    description: "Completed 6-month internship at a Canada-based technology company, developing modern web applications with Next.js, React, and TypeScript.",
    icon: "🚀",
    date: "2026",
    category: "Career",
    highlight: true
  },
  {
    title: "GoldBook - Loan Management App",
    description: "Built a full-stack loan management application for Indian pawnbrokers with Next.js, Supabase, and Prisma.",
    icon: "/goldbook-logo.jpg",
    date: "2026",
    category: "Projects",
    highlight: true,
    isImage: true,
    liveUrl: "https://goldbook-in.vercel.app/"
  },
  {
    title: "RapidFixAuto - Client Website",
    description: "Delivered a live production business website for an auto repair company with Next.js and responsive design.",
    icon: "/rapidfix.png",
    date: "2026",
    category: "Projects",
    highlight: true,
    isImage: true,
    liveUrl: "https://www.rapidfixauto.ca/"
  },
  {
    title: "Mr. Biryani - Restaurant Website",
    description: "Created a scroll-based restaurant website with smooth animations and mobile-first design.",
    icon: "/mrbiryani_logo_.png",
    date: "2026",
    category: "Projects",
    highlight: true,
    isImage: true,
    liveUrl: "https://mr-biryani.vercel.app/"
  },
  {
    title: "Portfolio Website Development",
    description: "Built a comprehensive portfolio website with Next.js, Three.js animations, and interactive skill exploration features.",
    icon: "💻",
    date: "2026",
    category: "Projects",
    highlight: true,
    liveUrl: "https://sriram-kranthi-kumar.vercel.app/"
  },
  {
    title: "Ecommerce Platform Development",
    description: "Developed Click&Cart ecommerce platform with Next.js, MySQL, and modern payment integration.",
    icon: "🛒",
    date: "2026",
    category: "Projects",
    highlight: false
  },
  {
    title: "Blood Donation Portal",
    description: "Successfully deployed a comprehensive blood donation platform connecting donors with recipients.",
    icon: "🩸",
    date: "2024",
    category: "Projects",
    highlight: false,
    liveUrl: "https://kranthi6600.github.io/BLOOD-DONATION-PORTAL/"
  },
  {
    title: "React To-Do App",
    description: "Created a feature-rich task management application with React.js and modern state management.",
    icon: "✅",
    date: "2024",
    category: "Projects",
    highlight: false,
    liveUrl: "https://todo-app-via-react.vercel.app/"
  }
];

export default function AchievementsSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
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
      
      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0) rotate(180deg);
        }
        to {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
      }
      
      .achievement-card {
        animation: fadeInUp 0.8s ease-out both;
      }
      
      .achievement-card:nth-child(1) { animation-delay: 0.1s; }
      .achievement-card:nth-child(2) { animation-delay: 0.2s; }
      .achievement-card:nth-child(3) { animation-delay: 0.3s; }
      .achievement-card:nth-child(4) { animation-delay: 0.4s; }
      .achievement-card:nth-child(5) { animation-delay: 0.5s; }
      .achievement-card:nth-child(6) { animation-delay: 0.6s; }
      
      .achievement-icon {
        animation: scaleIn 0.6s ease-out 0.4s both;
      }
      
      .stats-card {
        animation: fadeInUp 0.8s ease-out 0.8s both;
      }
      
      .stats-card:nth-child(1) { animation-delay: 0.8s; }
      .stats-card:nth-child(2) { animation-delay: 0.9s; }
      .stats-card:nth-child(3) { animation-delay: 1.0s; }
      .stats-card:nth-child(4) { animation-delay: 1.1s; }
      
      /* Add About section style animations on mobile */
      @media (max-width: 768px) {
        .achievements-container {
          animation: blurIn 0.6s ease-out forwards;
        }
        
        .achievements-left {
          animation: fadeInLeft 0.8s ease-out 0.2s both;
        }
        
        .achievements-right {
          animation: fadeInRight 0.8s ease-out 0.4s both;
        }
        
        .achievements-text {
          animation: fadeInUp 0.7s ease-out 0.3s both;
        }
        
        .achievements-badge {
          animation: fadeInUp 0.7s ease-out 0.1s both;
        }
        
        .achievement-card {
          animation: fadeInUp 0.8s ease-out 0.5s both;
        }
        
        .stats-card {
          animation: fadeInUp 0.8s ease-out 0.8s both;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const categories = ["All", "Career", "Projects", "Education"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredAchievements = activeCategory === "All"
    ? achievements
    : achievements.filter(a => a.category === activeCategory);

  return (
    <section className="px-4 md:px-6 mt-8">
      <div
        ref={rootRef}
        className="relative w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] max-w-5xl sm:max-w-6xl md:max-w-7xl lg:max-w-8xl mx-auto p-6 sm:p-8 md:p-10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <AchievementScene />

        <div className="relative space-y-8">
          {/* Header */}
          <div className="text-center space-y-4" style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
            <p className="inline-flex items-center gap-2 text-sm tracking-wide text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full">
              Achievements
            </p>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              My Journey & Milestones
            </h2>

            <p className="text-white/80 leading-relaxed max-w-2xl mx-auto">
              Key moments and accomplishments in my development journey, from career milestones to project launches.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${activeCategory === category
                  ? "bg-[#5416b5] text-white shadow-lg"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAchievements.map((achievement, index) => (
              achievement.liveUrl ? (
                <a
                  key={index}
                  href={achievement.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`achievement-card block p-6 rounded-xl border backdrop-blur-md transition-all duration-300 cursor-pointer hover:scale-105 ${achievement.highlight
                    ? "bg-gradient-to-br from-[#5416b5]/20 to-[#b65ff8]/20 border-[#5416b5]/30 hover:border-[#b65ff8]/50"
                    : "bg-white/10 border-white/15 hover:bg-white/15"
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="achievement-icon flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#5416b5] to-[#b65ff8] rounded-xl flex items-center justify-center text-2xl">
                      {achievement.isImage ? (
                        <Image src={achievement.icon} alt={achievement.title} width={32} height={32} className="rounded-lg" />
                      ) : (
                        achievement.icon
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {achievement.title}
                        </h3>
                        {achievement.highlight && (
                          <span className="px-2 py-1 bg-[#b65ff8]/20 text-[#b65ff8] text-xs font-medium rounded-full border border-[#b65ff8]/30">
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="text-white/80 leading-relaxed mb-3">
                        {achievement.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-white/60">{achievement.date}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-[#b65ff8] font-medium">{achievement.category}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ) : (
                <div
                  key={index}
                  className={`achievement-card p-6 rounded-xl border backdrop-blur-md transition-all duration-300 ${achievement.highlight
                    ? "bg-gradient-to-br from-[#5416b5]/20 to-[#b65ff8]/20 border-[#5416b5]/30 hover:border-[#b65ff8]/50"
                    : "bg-white/10 border-white/15 hover:bg-white/15"
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="achievement-icon flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#5416b5] to-[#b65ff8] rounded-xl flex items-center justify-center text-2xl">
                      {achievement.isImage ? (
                        <Image src={achievement.icon} alt={achievement.title} width={32} height={32} className="rounded-lg" />
                      ) : (
                        achievement.icon
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {achievement.title}
                        </h3>
                        {achievement.highlight && (
                          <span className="px-2 py-1 bg-[#b65ff8]/20 text-[#b65ff8] text-xs font-medium rounded-full border border-[#b65ff8]/30">
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="text-white/80 leading-relaxed mb-3">
                        {achievement.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-white/60">{achievement.date}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-[#b65ff8] font-medium">{achievement.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="stats-card text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="text-2xl font-bold text-[#b65ff8]">9+</div>
              <div className="text-sm text-white/70">Projects Completed</div>
            </div>
            <div className="stats-card text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="text-2xl font-bold text-[#7A85C1]">2026</div>
              <div className="text-sm text-white/70">Career Started</div>
            </div>
            <div className="stats-card text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="text-2xl font-bold text-[#977DFF]">B.Sc</div>
              <div className="text-sm text-white/70">Education Level</div>
            </div>
            <div className="stats-card text-center p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="text-2xl font-bold text-[#7F3AA1]">Front-End</div>
              <div className="text-sm text-white/70">Specialization</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center p-6 rounded-xl bg-gradient-to-r from-[#5416b5]/20 to-[#b65ff8]/20 border border-[#5416b5]/30" style={{ animation: 'fadeInUp 0.8s ease-out 1.2s both' }}>
            <h3 className="text-xl font-semibold text-white mb-3">
              The Journey Continues
            </h3>
            <p className="text-white/80 leading-relaxed max-w-3xl mx-auto mb-4">
              Every project is a new learning opportunity, and every challenge is a chance to grow.
              I'm excited about what's next in my development journey!
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5416b5] hover:bg-[#6a1fe0] text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                View Projects
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-200 border border-white/20"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
