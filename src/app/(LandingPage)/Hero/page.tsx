// components/Hero.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array of images that will auto-change
    const images = [
        {
            src: "/images/FRONT.jpg",
            alt: "Team working on technology solutions"
        },
        {
            src: "/images/tech-team.jpg", // Add your other images here
            alt: "Custom software development"
        },
        {
            src: "/images/cybersecurity.jpg",
            alt: "Cybersecurity solutions"
        },
        {
            src: "/images/mobile-dev.jpg",
            alt: "Mobile app development"
        }
    ];

    // Auto-change images every 4 seconds
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
        <section id="home" className="min-h-screen bg-gradient-to-br from-white to-gray-100 relative overflow-hidden flex items-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 left-40 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto px-5 relative z-7 w-full">
                <div className="grid lg:grid-cols-2 gap-9 items-center">
                    {/* Text Content */}
                    <div className="animate-fade-in-up">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent leading-tight">
                            Triple IT Solution Ltd
                        </h1>
                        <div className="space-y-4 mb-8">
                            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
                                Triple IT Solution Ltd is a modern and innovative IT company dedicated to delivering high-quality technological solutions and services.
                            </p>
                            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                                Our mission is to empower businesses of all sizes through reliable, customizable, and efficient digital solutions that drive growth and success.
                            </p>
                        </div>
                        <button
                            onClick={scrollToContact}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 transform inline-flex items-center gap-2 hover:from-blue-700 hover:to-blue-800"
                        >
                            Get Started Today
                            <span className="text-xl">🚀</span>
                        </button>
                    </div>

                    {/* Image Content with Auto-Changing */}
                    <div className="relative animate-fade-in-up animation-delay-300">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                            <div className="aspect-[4/3] relative">
                                {/* Auto-changing images */}
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                            index === currentImageIndex 
                                                ? 'opacity-100 scale-100' 
                                                : 'opacity-0 scale-110'
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
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                        </div>

                        {/* Image Indicators */}
                        <div className="flex justify-center gap-3 mt-4">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        index === currentImageIndex 
                                            ? 'bg-blue-600 w-8' 
                                            : 'bg-gray-300 w-2 hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float">
                            <div className="text-2xl mb-2">💻</div>
                            <div className="text-sm font-bold text-gray-800">Custom Software</div>
                        </div>

                        <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float animation-delay-1000">
                            <div className="text-2xl mb-2">📱</div>
                            <div className="text-sm font-bold text-gray-800">Mobile Apps</div>
                        </div>

                        <div className="absolute top-1/2 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float animation-delay-2000">
                            <div className="text-2xl mb-2">🔒</div>
                            <div className="text-sm font-bold text-gray-800">Cybersecurity</div>
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