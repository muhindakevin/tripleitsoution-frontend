// components/Hero.tsx
'use client';
import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
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

            <div className="max-w-6xl mx-auto px-4 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="animate-fade-in-up">
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent leading-tight">
                            Triple IT Solution
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Triple IT Solution is a modern and innovative IT company dedicated to delivering high-quality technological solutions and services. Our mission is to empower businesses of all sizes through reliable, customizable, and efficient digital solutions that drive growth and success.
                        </p>
                        <button
                            onClick={scrollToContact}
                            className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 transform inline-flex items-center gap-2"
                        >
                            Get Started Today
                            <span className="text-xl">🚀</span>
                        </button>
                    </div>

                    {/* Image Content */}
                    <div className="relative animate-fade-in-up animation-delay-300">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src="/images/FRONT.jpg"
                                    alt="Team working on technology solutions"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
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