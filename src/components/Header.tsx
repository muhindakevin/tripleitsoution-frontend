'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
            setActiveDropdown(null);
        }
    };

    const navigationItems = [
        { name: 'Home', id: 'home', hasDropdown: false },
        { 
            name: 'Services', 
            id: 'services', 
            hasDropdown: true,
            dropdownItems: [
                'Web Development',
                'Mobile Apps',
                'Cloud Solutions',
                'IT Consulting',
                'System Integration',
                'Technical Support'
            ]
        },
        { 
            name: 'Products', 
            id: 'products', 
            hasDropdown: true,
            dropdownItems: [
                'Business Software',
                'E-commerce Platforms',
                'Mobile Applications',
                'Custom Solutions',
                'Security Tools',
                'Analytics Dashboard'
            ]
        },
        { name: 'About', id: 'about', hasDropdown: false },
        { name: 'Contact', id: 'contact', hasDropdown: false }
    ];

    const handleDropdownToggle = (itemName: string) => {
        setActiveDropdown(activeDropdown === itemName ? null : itemName);
    };

    return (
        <>
            {/* Top Contact Bar - Fixed */}
            <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-2 w-full text-xs z-50 border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center">
                        {/* Left side - Company tagline with icon */}
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                            <span className="text-slate-200 text-xs font-medium">
                                Your Trusted Technology Partner
                            </span>
                        </div>
                        
                        {/* Right side - Contact Info */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                                <span className="text-blue-400 text-sm">📍</span>
                                <span className="text-slate-200 font-medium">Kigali City, Rwanda</span>
                            </div>
                            <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                                <span className="text-green-400 text-sm">📞</span>
                                <a href="tel:+250788327780" className="hover:text-blue-300 transition-colors text-slate-200 font-medium">
                                    +250 788 327 780
                                </a>
                            </div>
                            <div className="hidden lg:flex items-center gap-2 hover:scale-105 transition-transform">
                                <span className="text-purple-400 text-sm">✉️</span>
                                <a href="mailto:info@tripleitsolution.rw" className="hover:text-blue-300 transition-colors text-slate-200 font-medium">
                                    info@tripleitsolution.rw
                                </a>
                            </div>
                            <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-1 rounded-full border border-green-500/30">
                                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                                <span className="text-green-300 text-xs font-semibold">24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header - Fixed */}
            <header className="fixed top-8 left-0 right-0 w-full bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 shadow-xl z-40 border-b-2 border-blue-600/30">
                <nav className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo Section - Enhanced */}
                        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => scrollToSection('home')}>
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-white to-blue-50 rounded-full overflow-hidden shadow-lg ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300 group-hover:scale-110">
                                    <Image
                                        src="/logo.jpeg"
                                        alt="Triple IT Solution Logo"
                                        width={48}
                                        height={48}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white animate-bounce"></div>
                            </div>
                            <div>
                                <h1 className="text-white font-bold text-xl leading-tight group-hover:text-blue-100 transition-colors">
                                    Triple IT Solutions
                                </h1>
                                <p className="text-blue-200 text-xs font-medium opacity-90">Innovation & Excellence</p>
                            </div>
                        </div>

                        {/* Desktop Navigation - Enhanced with Dropdowns */}
                        <div className="hidden lg:flex items-center gap-2">
                            <ul className="flex gap-1 text-white">
                                {navigationItems.map((item) => (
                                    <li key={item.name} className="relative group">
                                        <button
                                            onClick={() => item.hasDropdown ? handleDropdownToggle(item.name) : scrollToSection(item.id)}
                                            onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                                            onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
                                            className="relative group hover:text-blue-100 transition-all duration-300 font-semibold py-3 px-4 rounded-xl hover:bg-white/10 hover:shadow-lg hover:scale-105 overflow-hidden flex items-center gap-2"
                                        >
                                            <span className="relative z-10">{item.name}</span>
                                            {item.hasDropdown && (
                                                <svg 
                                                    className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-300 to-purple-400 group-hover:w-3/4 transition-all duration-300"></div>
                                        </button>
                                        
                                        {/* Dropdown Menu */}
                                        {item.hasDropdown && (
                                            <div 
                                                className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 z-50 ${
                                                    activeDropdown === item.name ? 'opacity-100 visible transform scale-100' : 'opacity-0 invisible transform scale-95'
                                                }`}
                                                onMouseEnter={() => setActiveDropdown(item.name)}
                                                onMouseLeave={() => setActiveDropdown(null)}
                                            >
                                                <div className="py-2">
                                                    {item.dropdownItems?.map((dropdownItem, index) => (
                                                        <button
                                                            key={dropdownItem}
                                                            onClick={() => scrollToSection(item.id)}
                                                            className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-200 font-medium flex items-center gap-3 group"
                                                        >
                                                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                                                            <span>{dropdownItem}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-100">
                                                    <button
                                                        onClick={() => scrollToSection(item.id)}
                                                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-2"
                                                    >
                                                        View All {item.name}
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Get Quote Button - Replacing Account */}
                            <div className="ml-4">
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className="relative overflow-hidden bg-gradient-to-r from-white to-blue-50 text-blue-800 px-6 py-3 rounded-full font-bold hover:from-blue-50 hover:to-white transition-all duration-300 hover:shadow-xl hover:scale-105 border border-white/20"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <span>GET QUOTE</span>
                                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Right Section - Enhanced */}
                        <div className="lg:hidden flex items-center gap-3">
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="bg-gradient-to-r from-white to-blue-50 text-blue-800 px-4 py-2 rounded-full font-bold text-sm hover:from-blue-50 hover:to-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                            >
                                QUOTE
                            </button>
                            
                            {/* Mobile Menu Button - Enhanced */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex flex-col justify-center items-center w-10 h-10 rounded-xl hover:bg-white/10 transition-all duration-300 hover:shadow-lg border border-white/20 hover:border-white/40"
                                aria-label="Toggle mobile menu"
                            >
                                <span className={`w-5 h-0.5 bg-white transition-all duration-300 rounded-full ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`}></span>
                                <span className={`w-5 h-0.5 bg-white transition-all duration-300 rounded-full ${isMenuOpen ? 'opacity-0' : 'mb-1'}`}></span>
                                <span className={`w-5 h-0.5 bg-white transition-all duration-300 rounded-full ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown - Enhanced */}
                    <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                        <div className="bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-blue-900/95 rounded-2xl mx-4 mb-4 border border-blue-600/30 shadow-2xl backdrop-blur-sm">
                            {/* Mobile Contact Info - Enhanced */}
                            <div className="sm:hidden px-6 py-4 border-b border-blue-600/30 bg-gradient-to-r from-blue-900/80 to-blue-800/80 rounded-t-2xl">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors">
                                        <span className="text-blue-400 text-base">📍</span>
                                        <span className="text-blue-100 text-sm font-medium">Kigali City, Rwanda</span>
                                    </div>
                                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors">
                                        <span className="text-green-400 text-base">📞</span>
                                        <a href="tel:+250788327780" className="text-blue-100 hover:text-white text-sm font-medium">
                                            +250 788 327 780
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors">
                                        <span className="text-purple-400 text-base">✉️</span>
                                        <a href="mailto:info@tripleitsolution.rw" className="text-blue-100 hover:text-white text-sm font-medium">
                                            info@tripleitsolution.rw
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Menu - Enhanced with Dropdowns */}
                            <div className="p-6">
                                <ul className="flex flex-col gap-2">
                                    {navigationItems.map((item, index) => (
                                        <li key={item.name} style={{ animationDelay: `${index * 0.1}s` }} className={isMenuOpen ? 'animate-fade-in-up' : ''}>
                                            <div>
                                                <button
                                                    onClick={() => item.hasDropdown ? handleDropdownToggle(item.name) : scrollToSection(item.id)}
                                                    className="w-full text-white hover:text-blue-100 transition-all duration-300 font-semibold text-left py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:shadow-lg group flex items-center justify-between"
                                                >
                                                    <span>{item.name}</span>
                                                    {item.hasDropdown && (
                                                        <svg 
                                                            className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} 
                                                            fill="none" 
                                                            stroke="currentColor" 
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    )}
                                                </button>
                                                
                                                {/* Mobile Dropdown */}
                                                {item.hasDropdown && (
                                                    <div className={`ml-4 mt-2 overflow-hidden transition-all duration-300 ${
                                                        activeDropdown === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                    }`}>
                                                        <div className="bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                                                            {item.dropdownItems?.map((dropdownItem, idx) => (
                                                                <button
                                                                    key={dropdownItem}
                                                                    onClick={() => scrollToSection(item.id)}
                                                                    className="w-full text-left px-4 py-2 text-blue-100 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium flex items-center gap-3 group border-b border-white/5 last:border-b-0"
                                                                >
                                                                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                                                                    <span>{dropdownItem}</span>
                                                                </button>
                                                            ))}
                                                            <button
                                                                onClick={() => scrollToSection(item.id)}
                                                                className="w-full text-left px-4 py-3 text-blue-200 hover:text-white font-semibold text-sm flex items-center gap-2 bg-white/5"
                                                            >
                                                                View All {item.name}
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Enhanced spacer with gradient */}
            <div className="h-20 bg-gradient-to-b from-blue-50 to-transparent"></div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                }
            `}</style>
        </>
    );
};

export default Header;