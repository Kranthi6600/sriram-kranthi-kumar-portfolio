"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ContactScene = dynamic(() => import("./ContactScene"), {
  ssr: false,
  loading: () => null,
});

export default function ContactSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
      
      /* Only apply animations on mobile */
      @media (max-width: 768px) {
        .contact-container {
          animation: blurIn 0.6s ease-out forwards;
        }
        
        .contact-left {
          animation: fadeInLeft 0.8s ease-out 0.2s both;
        }
        
        .contact-right {
          animation: fadeInRight 0.8s ease-out 0.4s both;
        }
        
        .contact-text {
          animation: fadeInUp 0.7s ease-out 0.3s both;
        }
        
        .contact-badge {
          animation: fadeInUp 0.7s ease-out 0.1s both;
        }
        
        .contact-form {
          animation: fadeInUp 0.8s ease-out 0.5s both;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 md:px-6 mt-8">
      <div
        ref={rootRef}
        className="contact-container relative max-w-6xl mx-auto p-6 sm:p-8 md:p-10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <ContactScene />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="contact-left space-y-6">
            <p className="contact-badge inline-flex items-center gap-2 text-sm tracking-wide text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-[#b65ff8] rounded-full"></span>
              Get In Touch
            </p>

            <h2 className="contact-text text-3xl md:text-4xl font-bold leading-tight">
              Let's Work Together
            </h2>

            <p className="contact-text text-white/80 leading-relaxed">
              I'm always interested in hearing about new projects and opportunities. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="contact-text space-y-4">
              <div className="flex items-center gap-4">
                <div className="hidden md:flex w-12 h-12 bg-gradient-to-br from-[#5416b5] to-[#b65ff8] rounded-xl items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Email</div>
                  <div className="text-white/70">sriramkranthikumar7672@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex w-12 h-12 bg-gradient-to-br from-[#5416b5] to-[#b65ff8] rounded-xl items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Location</div>
                  <div className="text-white/70">India</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex w-12 h-12 bg-gradient-to-br from-[#5416b5] to-[#b65ff8] rounded-xl items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Availability</div>
                  <div className="text-white/70">Open for opportunities</div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-right">
            <form onSubmit={handleSubmit} className="contact-form space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#b65ff8] focus:bg-white/15 transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#b65ff8] focus:bg-white/15 transition-colors"
                  placeholder="your.email@gmail.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#b65ff8] focus:bg-white/15 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-[#5416b5] hover:bg-[#6a1fe0] disabled:bg-[#5416b5]/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100"
              >
                {isSubmitting ? 'Sending...' : submitStatus === 'success' ? '✓ Message Sent!' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-300 text-center animate-fadeIn">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-center animate-fadeIn">
                  ❌ Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
