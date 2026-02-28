"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import profile from '../../../public/Profile.jpg'

export default function Hero() {
    const nameRef = useRef<HTMLSpanElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement)[]>([]);
    const addToRefs = (el: HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement | null) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    useLayoutEffect(() => {
        if (!nameRef.current || !cursorRef.current || !heroRef.current) return;

        // Check if styles already exist to prevent recreation
        const existingStyle = document.getElementById('hero-animations');
        if (existingStyle) return;

        // Detect mobile for performance optimization
        const isMobile = window.innerWidth < 768;
        const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

        // Add CSS animations with mobile optimizations
        const style = document.createElement('style');
        style.id = 'hero-animations';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes profileImage {
                from {
                    clip-path: circle(0% at 50% 50%);
                    scale: 0.8;
                    opacity: 0;
                }
                to {
                    clip-path: circle(75% at 50% 50%);
                    scale: 1;
                    opacity: 1;
                }
            }
            
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
            
            @keyframes typing {
                from { width: 0; }
                to { width: 100%; }
            }
            
            .text-animate {
                animation: fadeInUp 0.8s ease-out forwards;
                will-change: opacity, transform;
            }
            
            .text-animate:nth-child(1) { animation-delay: 0.1s; }
            .text-animate:nth-child(2) { animation-delay: 0.2s; }
            .text-animate:nth-child(3) { animation-delay: 0.3s; }
            
            .profile-image {
                animation: profileImage 2.5s ease-out 0.3s forwards;
                will-change: clip-path, scale, opacity;
            }
            
            .cursor {
              display: inline;
              animation: blink 1s infinite;
              color: #977DFF;
              will-change: opacity;
            }
            
            .typing-text {
                overflow: hidden;
                white-space: nowrap;
                display: inline;
                max-width: 100%;
                will-change: width;
            }
            
            .email-hover {
                position: relative;
                display: inline-flex;
                align-items: center;
                overflow: hidden;
            }
            
            .email-hover .email-text {
                position: absolute;
                left: 0;
                top: 100%;
                margin-top: 6px;
                opacity: 0;
                transform: translateY(-5px);
                transition: all 0.3s ease;
                white-space: normal;
                max-width: 200px;
                font-size: 14px;
                color: white;
                pointer-events: auto;
                user-select: text;
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                cursor: text;
            }
            
            @media (max-width: 768px) {
                .email-hover .email-text {
                    display: none;
                }
                
                /* Mobile performance optimizations */
                .text-animate {
                    animation-duration: 0.6s;
                    transform: translateZ(0);
                    backface-visibility: hidden;
                }
                
                .profile-image {
                    animation-duration: 2s;
                    transform: translateZ(0);
                    backface-visibility: hidden;
                }
                
                .cursor {
                    animation-duration: 1.2s;
                }
            }
            
            @media (prefers-reduced-motion: reduce) {
                .text-animate,
                .profile-image,
                .cursor {
                    animation: none !important;
                    opacity: 1 !important;
                    transform: none !important;
                }
            }
            
            .email-hover:hover .email-text {
                opacity: 1;
                transform: translateY(0);
            }
            
            .email-hover:hover svg {
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(style);

        // Typing animation with mobile-optimized performance
        const fullName = "Kranthi";
        let currentIndex = 0;
        let isTyping = true;
        let animationTimeout: NodeJS.Timeout;
        
        // Mobile-optimized typing speed
        const typingSpeed = isMobile ? (isLowEndDevice ? 200 : 120) : 150;
        const pauseDuration = isMobile ? 800 : 1000;
        
        const typeAnimation = () => {
            if (!nameRef.current) return;
            
            if (isTyping && currentIndex <= fullName.length) {
                nameRef.current.textContent = fullName.slice(0, currentIndex);
                currentIndex++;
                animationTimeout = setTimeout(typeAnimation, typingSpeed);
            } else if (!isTyping && currentIndex >= 0) {
                nameRef.current.textContent = fullName.slice(0, currentIndex);
                currentIndex--;
                animationTimeout = setTimeout(typeAnimation, typingSpeed);
            } else {
                isTyping = !isTyping;
                currentIndex = isTyping ? 0 : fullName.length;
                animationTimeout = setTimeout(typeAnimation, pauseDuration);
            }
        };
        
        // Start animation with mobile-optimized delay
        const startDelay = isMobile ? 300 : 500;
        animationTimeout = setTimeout(typeAnimation, startDelay);

        return () => {
            // Clear timeout to prevent memory leaks
            if (animationTimeout) {
                clearTimeout(animationTimeout);
            }
            // Only remove style if this is the last instance
            const styleElement = document.getElementById('hero-animations');
            if (styleElement && document.querySelectorAll('[data-hero-component]').length <= 1) {
                document.head.removeChild(styleElement);
            }
        };
    }, []);

    const handleEmailClick = () => {
        window.location.href = 'mailto:sriramkranthikumar7672@gmail.com';
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 sm:gap-5 p-6 sm:p-8 w-full max-w-6xl mx-auto bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.05)]" ref={heroRef}>
            <div className="flex flex-col gap-3 md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold">
                    Hei, I'm{" "}
                    <span className="text-[#977DFF]">
                        <span ref={nameRef} className="typing-text"></span>
                        <span ref={cursorRef} className="cursor">|</span>
                    </span>
                </h1>

                <p className="text-xl sm:text-xl font-semibold text-animate" ref={addToRefs}>
                    Full-Stack Developer
                </p>

                <p className="text-gray-300 text-base sm:text-base md:text-lg max-w-full md:max-w-lg text-animate" ref={addToRefs}>
                    I build full-stack applications that feel fast, premium, and impossible to ignore.
                    From crafting responsive frontends with React and Next.js to engineering scalable
                    backends using Node.js, Express, and databases like MongoDB & MySQL — I turn ideas
                    into production-ready digital experiences that users genuinely enjoy.
                </p>

                {/* Social Links */}
                <div className="flex gap-4 mt-4 text-animate justify-center md:justify-start" ref={addToRefs}>
                    <a
                        href="https://github.com/Kranthi6600"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                    <a
                        href="https://linkedin.com/in/kranthi-kumar-"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                    <div className="email-hover p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 cursor-pointer" onClick={handleEmailClick}>
                        <svg className="w-5 h-5 text-white transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="email-text">sriramkranthikumar7672@gmail.com</span>
                    </div>
                </div>
            </div>

            <div className="md:w-1/2 flex justify-center items-center">
                {/* Example: your profile image or illustration */}
                <div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-purple-200 rounded-full profile-image border-4 border-[#6E49B4] shadow-[0_0_20px_rgba(84,22,181,0.6),0_0_50px_rgba(84,22,181,0.4),0_0_70px_rgba(84,22,181,0.2)]">
                    <Image src={profile} alt="Profile" width={288} height={288} className="w-full h-full object-cover rounded-full" />
                </div>
            </div>
        </div>
    );
}