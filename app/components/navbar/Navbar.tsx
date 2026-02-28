"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import './styles/navbar.css'

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        "Home",
        "Skills",
        "Projects",
        "Resume",
        "About",
        "Experience",
        "Contact",
    ];

    return (
        <div className="flex justify-center m-3 sm:m-5 font-serif">
            {/* Desktop Navbar */}
            <div
                className="hidden md:flex justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 text-base sm:text-lg md:text-lg lg:text-xl h-10 sm:h-12 md:h-12 lg:h-14 w-[90vw] sm:w-[75vw] md:w-[70vw] lg:w-[60vw] max-w-[550px] sm:max-w-[650px] md:max-w-[750px] lg:max-w-[820px] rounded-full items-center px-3 sm:px-4 md:px-6 lg:px-8"
                style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(255, 255, 255, 0.05), 0 0 40px rgba(84, 22, 181, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                }}
            >
                {navItems.map((item) => (
                    <Link
                        key={item}
                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                        className={`nav-link ${(item === "Home" && pathname === "/") || (item !== "Home" && pathname === `/${item.toLowerCase()}`) ? 'active' : ''}`}
                    >
                        {item}
                    </Link>
                ))}
            </div>

            {/* Mobile Navbar */}
            <div className="md:hidden w-full">
                <div
                    className="flex justify-between items-center h-12 sm:h-14 px-3 sm:px-4 rounded-full"
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(255, 255, 255, 0.05), 0 0 40px rgba(84, 22, 181, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                    }}
                >
                    <div className="text-white font-semibold text-sm sm:text-base">
                        {navItems.find(item => 
                            (item === "Home" && pathname === "/") || 
                            (item !== "Home" && pathname === `/${item.toLowerCase()}`)
                        ) || "Menu"}
                    </div>
                    
                    {/* Hamburger Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className="w-5 h-5 flex flex-col justify-center items-center">
                            <span 
                                className={`block h-0.5 w-5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                            ></span>
                            <span 
                                className={`block h-0.5 w-5 bg-white transition-all duration-300 mt-1 ${isMenuOpen ? 'opacity-0' : ''}`}
                            ></span>
                            <span 
                                className={`block h-0.5 w-5 bg-white transition-all duration-300 mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                            ></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`mt-2 rounded-xl overflow-hidden transition-all duration-300 ${
                        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(255, 255, 255, 0.05), 0 0 40px rgba(84, 22, 181, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                    }}
                >
                    <div className="py-4 px-2 space-y-2">
                        {navItems.map((item, index) => (
                            <Link
                                key={item}
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block nav-link-mobile ${(item === "Home" && pathname === "/") || (item !== "Home" && pathname === `/${item.toLowerCase()}`) ? 'active' : ''}`}
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}





