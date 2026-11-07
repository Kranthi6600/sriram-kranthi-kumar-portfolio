"use client";

import { useEffect, useRef } from "react";
import React from "react";
import dynamic from "next/dynamic";

const AboutScene = dynamic(() => import("./AboutScene"), {
  ssr: false,
  loading: () => null,
});

export default React.memo(function AboutSection() {
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
      
      .about-container {
        animation: blurIn 0.6s ease-out forwards;
      }
      
      .about-left {
        animation: fadeInLeft 0.8s ease-out 0.2s both;
      }
      
      .about-right {
        animation: fadeInRight 0.8s ease-out 0.4s both;
      }
      
      .about-text {
        animation: fadeInUp 0.7s ease-out 0.3s both;
      }
      
      .about-badge {
        animation: fadeInUp 0.7s ease-out 0.1s both;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="px-4 md:px-6 mt-8">
      <div
        ref={rootRef}
        className="about-container relative max-w-6xl mx-auto p-8 md:p-10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <AboutScene />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="about-left space-y-4">
            <p
              className="about-badge inline-flex items-center gap-2 text-sm tracking-wide text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full"
            >
              About
            </p>

            <h2
              className="about-text text-3xl md:text-4xl font-bold leading-tight"
            >
              I build front-end applications that feel fast, premium, and impossible to ignore.
            </h2>

            <p
              className="about-text text-white/80 leading-relaxed"
            >
              I'm a front-end developer focused on crafting modern web experiences. 
              Following a 6-month internship at Wehoware Technologies, I excel at building responsive UIs with React and Next.js, 
              creating engaging user interfaces and smooth interactions. I love taking ideas from concept to deployment and creating applications 
              that users actually enjoy using.
            </p>

            <div
              className="about-text flex flex-wrap gap-2"
            >
              {[
                "React",
                "Next.js",
                "TypeScript",
                "TailwindCSS",
                "GSAP",
                "Three.js",
                "JavaScript",
                "HTML5",
                "CSS3",
                "Supabase",
              ].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm text-white/90"
                >
                  {t}
                </span>
              ))}
            </div>

            <div
              className="about-text flex flex-wrap gap-3 pt-2"
            >
              <a
                href="/projects"
                className="px-5 py-2 rounded-xl bg-[#5416b5] hover:bg-[#6a1fe0] transition-colors shadow-[0_0_18px_rgba(84,22,181,0.45)]"
              >
                View Projects
              </a>
              <a
                href="/contact"
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>

          <div className="about-right space-y-6">
            {[
              { label: "Years Learning", value: "2+" },
              { label: "Projects", value: "13+" },
              { label: "Internship", value: "6 Months" },
              { label: "Core Focus", value: "Front End" },
              { label: "Style", value: "User-Focused" },
            ].map((card) => (
              <div
                key={card.label}
                className="about-text p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-[0_0_24px_rgba(0,0,0,0.12)]"
              >
                <div className="text-3xl font-bold text-white">{card.value}</div>
                <div className="text-sm text-white/70 mt-1">{card.label}</div>
              </div>
            ))}

            <div
              className="about-text col-span-2 p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md"
            >
              <div className="text-sm text-white/70">Internship Experience</div>
              <div className="text-lg font-semibold mt-1">
                Completed 6-month internship at Wehoware Technologies, developing production applications with Next.js, React, and TypeScript under senior mentorship.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
