// components/About.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';

interface StatItemProps {
    number: string;
    label: string;
    delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ number, label, delay }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [displayNumber, setDisplayNumber] = useState('0');
    const statRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isVisible) {
                        setIsVisible(true);
                        // Animate the number
                        const targetNumber = parseInt(number.replace(/\D/g, ''));
                        const suffix = number.replace(/\d/g, '');

                        if (targetNumber > 0) {
                            let current = 0;
                            const increment = targetNumber / 30;
                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= targetNumber) {
                                    setDisplayNumber(number);
                                    clearInterval(timer);
                                } else {
                                    setDisplayNumber(Math.floor(current) + suffix);
                                }
                            }, 50);
                        } else {
                            setDisplayNumber(number);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (statRef.current) {
            observer.observe(statRef.current);
        }

        return () => {
            if (statRef.current) {
                observer.unobserve(statRef.current);
            }
        };
    }, [number, isVisible]);

    return (
        <div
            ref={statRef}
            className={`text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="text-3xl font-bold text-blue-300 mb-2">
                {displayNumber}
            </div>
            <div className="text-white text-sm">
                {label}
            </div>
        </div>
    );
};

const About: React.FC = () => {
    const aboutRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => {
            if (aboutRef.current) {
                observer.unobserve(aboutRef.current);
            }
        };
    }, []);

    const features = [
        "✨ Innovative Solutions",
        "🎯 Result-Driven Approach",
        "👥 Expert Team",
        "🚀 Cutting-Edge Technology",
        "💼 Professional Service"
    ];

    return (
        <section id="about" className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div
                    ref={aboutRef}
                    className="grid lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Text Content */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-12'
                        }`}>
                        <h2 className="text-4xl font-bold mb-6">
                            About Us
                        </h2>
                        <p className="text-lg mb-6 leading-relaxed">
                            We are a leading IT solutions provider with a passion for innovation and excellence. Our team of skilled professionals delivers cutting-edge technology solutions that help businesses thrive in the digital landscape.
                        </p>
                        <p className="text-lg mb-8 leading-relaxed">
                            With years of experience and a commitment to quality, we've built a reputation for delivering projects on time, within budget, and exceeding expectations.
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <StatItem number="500+" label="Projects Completed" delay={200} />
                            <StatItem number="50+" label="Happy Clients" delay={400} />
                            <StatItem number="5+" label="Years Experience" delay={600} />
                            <StatItem number="24/7" label="Support" delay={800} />
                        </div>
                    </div>

                    {/* Features Card */}
                    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-12'
                        }`}>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                            <h3 className="text-2xl font-bold mb-6 text-center">
                                Why Choose Us?
                            </h3>
                            <ul className="space-y-4">
                                {features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className={`flex items-center text-lg transition-all duration-500 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-8'
                                            }`}
                                        style={{ transitionDelay: `${1000 + (index * 100)}ms` }}
                                    >
                                        <span className="text-2xl mr-3">
                                            {feature.split(' ')[0]}
                                        </span>
                                        <span>{feature.substring(feature.indexOf(' ') + 1)}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Decorative Elements */}
                            <div className="mt-8 flex justify-center">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
                                    <div className="w-3 h-3 bg-purple-300 rounded-full animate-pulse animation-delay-200"></div>
                                    <div className="w-3 h-3 bg-pink-300 rounded-full animate-pulse animation-delay-400"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
        </section>
    );
};

export default About;