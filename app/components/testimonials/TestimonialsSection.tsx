"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import TestimonialScene from "./TestimonialScene";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Johnson",
    role: "Tech Lead",
    company: "WeHowAre Technologies",
    content: "Sriram has been an exceptional full-stack developer on our team. His ability to quickly grasp complex requirements and deliver clean, efficient code is impressive. He's a valuable asset to any development team.",
    avatar: "AJ",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "Tech Startup",
    content: "Working with Sriram was a fantastic experience. He brought our vision to life with his technical expertise and attention to detail. The final product exceeded our expectations.",
    avatar: "SC",
    rating: 5
  },
  {
    name: "Michael Roberts",
    role: "Senior Developer",
    company: "Digital Agency",
    content: "Sriram's full-stack capabilities are outstanding. From responsive frontend designs to robust backend solutions, he consistently delivers high-quality work. Highly recommend!",
    avatar: "MR",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="px-4 md:px-6 mt-8">
      <div
        ref={rootRef}
        className="relative max-w-6xl mx-auto p-8 md:p-10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <TestimonialScene />

        <div className="relative space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <p className="inline-flex items-center gap-2 text-sm tracking-wide text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full">
              Testimonials
            </p>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              What People Say
            </h2>

            <p className="text-white/80 leading-relaxed max-w-2xl mx-auto">
              Hear from colleagues and clients about working together on various projects.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card p-6 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md hover:bg-white/15 transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <p className="text-white/80 leading-relaxed mb-4">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#5416b5] to-[#b65ff8] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-medium">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center p-6 rounded-xl bg-gradient-to-r from-[#5416b5]/20 to-[#b65ff8]/20 border border-[#5416b5]/30">
            <h3 className="text-xl font-semibold text-white mb-3">
              Let's Work Together
            </h3>
            <p className="text-white/80 leading-relaxed max-w-3xl mx-auto mb-4">
              I'm always excited to collaborate on innovative projects. Whether you need a full-stack developer 
              or want to discuss your next big idea, I'd love to hear from you.
            </p>
            <a
              href="mailto:sriramkranthikumar7672@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#5416b5] hover:bg-[#6a1fe0] text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
