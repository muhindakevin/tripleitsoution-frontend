// components/Hero.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        {
            src: "/images/FRONT.jpg",
            alt: "Team working on technology solutions"
        },
        {
            src: "/images/customer.jpeg",
            alt: "Custom software development"
        },
        {
            src: "/images/cybersecurity.jpeg",
            alt: "Cybersecurity solutions"
        },
        {
            src: "/images/mobile.png",
            alt: "Mobile app development"
        }
    ];

    const heroHighlights = [
        "Enterprise-grade software & infrastructure",
        "24/7 managed support with real engineers",
        "Time-to-value measured in weeks, not months",
    ];

    const heroStats = [
        { value: "500+", label: "Projects delivered" },
        { value: "50+", label: "Enterprise clients" },
        { value: "98%", label: "Customer satisfaction" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="min-h-screen bg-hero-gradient relative overflow-hidden flex items-center">
            {/* Decorative Background */}
            <div className="absolute inset-0">
                <div className="grid-overlay absolute inset-0 opacity-[0.08]"></div>
                <div className="absolute -top-24 -left-32 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-sky-500/15 to-sky-300/5 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-[460px] h-[460px] rounded-full bg-gradient-to-br from-indigo-500/12 to-purple-400/6 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
                <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-8 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-blue-100 shadow-glow backdrop-blur">
                            <Sparkles className="h-4 w-4 text-blue-200" />
                            Kigali's most trusted technology partner
                        </div>

                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight headline-gradient">
                                Triple IT Solution Ltd
                            </h1>
                            <p className="mt-4 text-lg md:text-xl lg:text-2xl text-slate-200/90 text-balance max-w-2xl">
                                We architect, build, and protect mission-critical digital experiences for ambitious African and global enterprises.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {heroHighlights.map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3 text-slate-100/90"
                                    style={{ animationDelay: `${0.2 + index * 0.12}s` }}
                                >
                                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-sky-300 shrink-0" />
                                    <span className="text-base md:text-lg leading-relaxed">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Link href="/auth">
                                <button className="cta-gradient text-white px-8 py-4 rounded-full font-semibold text-base md:text-lg flex items-center gap-3 shadow-glow hover:shadow-[0_10px_50px_rgba(90,156,255,0.45)] transition-all duration-300 hover:-translate-y-1">
                                    Start your project
                                    <ArrowRight className="h-5 w-5" />
                                </button>
                            </Link>
                            <button
                                onClick={scrollToContact}
                                className="inline-flex items-center gap-3 px-6 py-4 rounded-full border border-white/20 bg-white/5 text-slate-100 font-semibold text-base md:text-lg hover:border-white/40 hover:bg-white/10 transition-all duration-300 animated-border"
                            >
                                <ShieldCheck className="h-5 w-5 text-blue-200" />
                                Book a strategy call
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 max-w-xl">
                            {heroStats.map((stat) => (
                                <div key={stat.label} className="glass-panel px-6 py-4 text-center">
                                    <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-xs md:text-sm text-slate-200/70">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Content with Auto-Changing */}
                    <div className="relative animate-fade-in-up animation-delay-300">
                        <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/10 bg-white/5">
                            <div className="absolute inset-0 border border-white/10 rounded-[32px] pointer-events-none backdrop-blur-sm"></div>
                            <div className="aspect-[4/3] relative">
                                {/* Auto-changing images */}
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentImageIndex
                                            ? 'opacity-100 scale-100'
                                            : 'opacity-0 scale-105'
                                            }`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover"
                                            priority={index === 0}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-900/5 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 glass-panel border-white/20 bg-slate-950/25 px-6 py-4">
                                <p className="text-sm text-slate-100/80 leading-relaxed">
                                    "Triple IT Solution has been instrumental in modernising our digital stack. Their cloud engineers delivered in half the time we scoped."
                                </p>
                                <div className="mt-3 flex items-center justify-between text-xs text-slate-300/80">
                                    <span>CTO, Regional Telecom</span>
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                                        Operational excellence
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Indicators */}
                        <div className="flex justify-center gap-3 mt-6">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                                        ? 'bg-sky-400 w-10'
                                        : 'bg-slate-400/40 w-3 hover:bg-slate-300/60'
                                        }`}
                                    aria-label={`Slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-6 -right-6 glass-panel px-5 py-4 animate-float">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    💻
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">Custom Platforms</div>
                                    <div className="text-xs text-slate-200/70">Built to scale with you</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -left-6 glass-panel px-5 py-4 animate-float animation-delay-1000">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-sky-500/20 flex items-center justify-center">
                                    📱
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">Mobile Experiences</div>
                                    <div className="text-xs text-slate-200/70">Premium UI & UX</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-1/2 -right-10 glass-panel px-5 py-4 animate-float animation-delay-2000">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    🔒
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">Cyber Defence</div>
                                    <div className="text-xs text-slate-200/70">Audits & monitoring</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out;
                }

                .animation-delay-300 {
                    animation-delay: 0.3s;
                    animation-fill-mode: both;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animation-delay-1000 {
                    animation-delay: 1s;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </section>
    );
};

export default Hero;