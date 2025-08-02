// components/Header.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            {/* Contact Bar */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-3 fixed w-full top-0 z-50 text-sm border-b border-white/20 backdrop-blur-sm shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 md:gap-4">
                        {/* Contact Information */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 items-center">
                            {/* Location */}
                            <div className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors duration-300 group">
                                <span className="text-blue-400 group-hover:scale-110 transition-transform duration-300">📍</span>
                                <span className="font-medium">Remera, Kigali City, Rwanda</span>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors duration-300 group cursor-pointer">
                                <span className="text-green-400 group-hover:scale-110 transition-transform duration-300">📞</span>
                                <a href="tel:+250788327780" className="font-medium hover:text-blue-300 transition-colors">
                                    +250 788 327 780
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors duration-300 group cursor-pointer">
                                <span className="text-yellow-400 group-hover:scale-110 transition-transform duration-300">✉️</span>
                                <a href="mailto:info@tripleitsolution.rw" className="font-medium hover:text-blue-300 transition-colors">
                                    info@tripleitsolution.rw
                                </a>
                            </div>
                        </div>

                        {/* Optional Social Links or CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs text-gray-300 font-medium">Available 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtle bottom glow effect */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            </div>

            {/* Main Header */}
            <header className={`fixed w-full top-8 z-40 transition-all duration-300 ${isScrolled ? 'bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg' : 'bg-gradient-to-r from-blue-900 to-blue-700'
                }`}>
                <nav className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center text-xl font-bold text-white">
                            <div className="w-16 h-16 bg-white rounded-full mr-3 overflow-hidden relative">
                                <Image
                                    src="/logo.jpeg"
                                    alt="Triple IT Solution Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span>Triple IT Solution</span>
                        </div>

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex gap-8 text-white">
                            <li>
                                <button
                                    onClick={() => scrollToSection('home')}
                                    className="hover:text-blue-300 transition-colors cursor-pointer"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('services')}
                                    className="hover:text-blue-300 transition-colors cursor-pointer"
                                >
                                    Services
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('about')}
                                    className="hover:text-blue-300 transition-colors cursor-pointer"
                                >
                                    About
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className="hover:text-blue-300 transition-colors cursor-pointer"
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>

                        {/* Admin Button */}
                        <Link
                            href="/dashboard"
                            className="hidden md:inline-block bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            ADMIN
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden flex flex-col gap-1 cursor-pointer"
                        >
                            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 mt-4' : 'max-h-0'
                        }`}>
                        <ul className="flex flex-col gap-4 text-white">
                            <li>
                                <button
                                    onClick={() => scrollToSection('home')}
                                    className="hover:text-blue-300 transition-colors"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('services')}
                                    className="hover:text-blue-300 transition-colors"
                                >
                                    Services
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('about')}
                                    className="hover:text-blue-300 transition-colors"
                                >
                                    About
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className="hover:text-blue-300 transition-colors"
                                >
                                    Contact
                                </button>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-center inline-block"
                                >
                                    ADMIN
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;