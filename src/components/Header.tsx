'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            {/* Top Contact Bar - Fixed */}
            <div className="fixed top-0 left-0 right-0 bg-slate-900 text-white py-2 w-full text-xs sm:text-sm z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-end items-center">
                        {/* Contact Info - Right Aligned */}
                        <div className="flex flex-wrap justify-end items-center gap-3 sm:gap-6">
                            <div className="flex items-center gap-1 sm:gap-2">
                                <span className="text-red-400">📍</span>
                                <span className="text-xs sm:text-sm">Kigali City, Rwanda</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                                <span className="text-red-400">📞</span>
                                <a href="tel:+250788327780" className="hover:text-red-300 text-xs sm:text-sm">
                                    +250 788 327 780
                                </a>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                                <span className="text-red-400">✉️</span>
                                <a href="mailto:info@tripleitsolution.rw" className="hover:text-red-300 text-sm">
                                    info@tripleitsolution.rw
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs">Available 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Main Header */}
            <header className="fixed top-8 sm:top-10 left-0 right-0 w-full bg-blue-700 shadow-lg z-40">
                <nav className="max-w-7xl mx-auto px-3 sm:px-4">
                    <div className="flex justify-between items-center py-3 sm:py-4">
                        {/* Logo Section */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full overflow-hidden flex-shrink-0 shadow-md">
                                <Image
                                    src="/logo.jpeg"
                                    alt="Triple IT Solution Logo"
                                    width={48}
                                    height={48}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h1 className="text-white font-bold text-sm sm:text-lg leading-tight truncate">
                                    Triple IT Technology Solutions Ltd
                                </h1>
                                <p className="text-blue-200 text-xs sm:text-sm leading-tight">
                                    Technology Solutions
                                </p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                            <ul className="flex gap-6 xl:gap-8 text-white">
                                {['Home', 'Services', 'About', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <button
                                            onClick={() => scrollToSection(item.toLowerCase())}
                                            className="hover:text-blue-200 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-white/10"
                                        >
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            
                            <Link
                                href="/auth"
                                className="bg-white text-blue-800 px-5 xl:px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-all hover:shadow-lg"
                            >
                                ACCOUNT
                            </Link>
                        </div>

                        {/* Mobile Account Button - Always Visible */}
                        <div className="lg:hidden flex items-center gap-2">
                            <Link
                                href="/auth"
                                className="bg-white text-blue-800 px-3 py-2 rounded-full font-bold text-xs hover:bg-blue-50 transition-all hover:shadow-lg"
                            >
                                ACCOUNT
                            </Link>
                            
                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex flex-col justify-center items-center w-8 h-8 rounded-md hover:bg-white/10 transition-colors"
                                aria-label="Toggle mobile menu"
                            >
                                <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : 'mb-1'}`}></span>
                                <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'mb-1'}`}></span>
                                <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                        <div className="bg-blue-800/95 backdrop-blur-sm rounded-lg mx-1 mb-3 border border-blue-600/30">
                            {/* Mobile Contact Info - Only show on small screens */}
                            <div className="sm:hidden px-4 py-3 border-b border-blue-600/30 bg-blue-900/50">
                                <div className="flex flex-col gap-2 text-sm">
                                    <div className="flex items-center gap-2 text-blue-200">
                                        <span className="text-red-400 text-xs">📍</span>
                                        <span className="text-xs">Kigali City, Rwanda</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-400 text-xs">📞</span>
                                        <a href="tel:+250788327780" className="text-blue-200 hover:text-white text-xs">
                                            +250 788 327 780
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-400 text-xs">✉️</span>
                                        <a href="mailto:info@tripleitsolution.rw" className="text-blue-200 hover:text-white text-xs">
                                            info@tripleitsolution.rw
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-400">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-xs">Available 24/7</span>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <div className="p-4">
                                <ul className="flex flex-col gap-3">
                                    {['Home', 'Services', 'About', 'Contact'].map((item) => (
                                        <li key={item}>
                                            <button
                                                onClick={() => scrollToSection(item.toLowerCase())}
                                                className="text-white hover:text-blue-200 transition-colors font-medium w-full text-left py-2 px-3 rounded-lg hover:bg-white/10"
                                            >
                                                {item}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Spacer to prevent content from being hidden under fixed header */}
            <div className="h-20 sm:h-24"></div>
        </>
    );
};

export default Header;