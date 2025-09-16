'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Phone, Mail, MapPin, Monitor, Mouse, Keyboard, Headphones, Smartphone, Tablet, Printer, Server, Shield, Cloud, Code, Settings, Users, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// Define types for our data structures
interface DropdownItem {
    name: string;
    icon: React.ComponentType<any>;
    id: string;
}

interface ProductCategory {
    icon: React.ComponentType<any>;
    items: DropdownItem[];
}

interface NavigationItem {
    name: string;
    id: string;
    hasDropdown: boolean;
    isProductMenu?: boolean;
    dropdownItems?: DropdownItem[];
}

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToSection = (sectionId: string) => {
        // If we're not on the home page, navigate to home first then scroll
        if (window.location.pathname !== '/') {
            router.push(`/#${sectionId}`);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMenuOpen(false);
        setActiveDropdown(null);
    };

    const navigateToProducts = (category?: string, subcategory?: string) => {
        // Build query parameters for filtering
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (subcategory) params.append('subcategory', subcategory);

        const queryString = params.toString();
        router.push(`/products${queryString ? `?${queryString}` : ''}`);

        setIsMenuOpen(false);
        setActiveDropdown(null);
    };

    const navigateToHome = () => {
        router.push('/');
    };

    const productCategories: Record<string, ProductCategory> = {
        'Hardware': {
            icon: Monitor,
            items: [
                { name: 'Desktop Computers', icon: Monitor, id: 'desktops' },
                { name: 'Laptops', icon: Monitor, id: 'laptops' },
                { name: 'Monitors', icon: Monitor, id: 'monitors' },
                { name: 'Keyboards', icon: Keyboard, id: 'keyboards' },
                { name: 'Mouse & Trackpads', icon: Mouse, id: 'mice' },
                { name: 'Headphones & Audio', icon: Headphones, id: 'audio' },
                { name: 'Printers & Scanners', icon: Printer, id: 'printers' },
                { name: 'Servers & Storage', icon: Server, id: 'servers' }
            ]
        },
        'Mobile Devices': {
            icon: Smartphone,
            items: [
                { name: 'Smartphones', icon: Smartphone, id: 'smartphones' },
                { name: 'Tablets', icon: Tablet, id: 'tablets' },
                { name: 'Smart Watches', icon: Smartphone, id: 'watches' },
                { name: 'Mobile Accessories', icon: Headphones, id: 'mobile-accessories' }
            ]
        },
        'Software Solutions': {
            icon: Code,
            items: [
                { name: 'Business Applications', icon: Briefcase, id: 'business-apps' },
                { name: 'Security Software', icon: Shield, id: 'security' },
                { name: 'Cloud Solutions', icon: Cloud, id: 'cloud' },
                { name: 'Custom Development', icon: Code, id: 'development' },
                { name: 'System Management', icon: Settings, id: 'system-management' }
            ]
        },
        'Services': {
            icon: Users,
            items: [
                { name: 'IT Consulting', icon: Users, id: 'consulting' },
                { name: 'Technical Support', icon: Settings, id: 'support' },
                { name: 'System Integration', icon: Server, id: 'integration' },
                { name: 'Cloud Migration', icon: Cloud, id: 'migration' },
                { name: 'Security Audit', icon: Shield, id: 'security-audit' }
            ]
        }
    };

    const navigationItems: NavigationItem[] = [
        { name: 'Home', id: 'home', hasDropdown: false },
        { name: 'Services', id: 'services', hasDropdown: false },
        {
            name: 'Products',
            id: 'products',
            hasDropdown: true,
            isProductMenu: true
        },
        { name: 'About', id: 'about', hasDropdown: false },
        { name: 'Contact', id: 'contact', hasDropdown: false }
    ];

    const handleDropdownToggle = (itemName: string) => {
        setActiveDropdown(activeDropdown === itemName ? null : itemName);
    };

    const handleMouseEnter = (itemName: string) => {
        if (!isMobile) {
            setActiveDropdown(itemName);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setActiveDropdown(null);
        }
    };

    return (
        <>
            {/* Top Contact Bar */}
            <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-2 w-full text-xs z-50 border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                            <span className="text-slate-200 text-xs font-medium">
                                Your Trusted Technology Partner
                            </span>
                        </div>

                        <div className="flex items-center gap-3 lg:gap-6">
                            <div className="flex items-center gap-1 lg:gap-2 hover:scale-105 transition-transform">
                                <MapPin className="w-3 h-3 text-blue-400" />
                                <span className="text-slate-200 font-medium text-xs">Kigali, Rwanda</span>
                            </div>
                            <div className="flex items-center gap-1 lg:gap-2 hover:scale-105 transition-transform">
                                <Phone className="w-3 h-3 text-green-400" />
                                <a href="tel:+250788327780" className="hover:text-blue-300 transition-colors text-slate-200 font-medium text-xs">
                                    +250 788 327 780
                                </a>
                            </div>
                            <div className="hidden lg:flex items-center gap-2 hover:scale-105 transition-transform">
                                <Mail className="w-3 h-3 text-purple-400" />
                                <a href="mailto:info@tripleitsolution.rw" className="hover:text-blue-300 transition-colors text-slate-200 font-medium text-xs">
                                    info@tripleitsolution.rw
                                </a>
                            </div>
                            <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-2 lg:px-3 py-1 rounded-full border border-green-500/30">
                                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                                <span className="text-green-300 text-xs font-semibold">24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="fixed top-8 left-0 right-0 w-full bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 shadow-xl z-40 border-b-2 border-blue-600/30">
                <nav className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo Section */}
                        <div className="flex items-center gap-3 lg:gap-4 group cursor-pointer" onClick={navigateToHome}>
                            <div className="relative">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-white to-blue-50 rounded-full overflow-hidden shadow-lg ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                                    <Image src="/logo.jpeg" alt="Triple IT Solution Logo" width={40} height={40} className="object-cover" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white animate-bounce"></div>
                            </div>
                            <div>
                                <h1 className="text-white font-bold text-lg lg:text-xl leading-tight group-hover:text-blue-100 transition-colors">
                                    Triple IT Solution Ltd
                                </h1>
                                <p className="text-blue-200 text-xs font-medium opacity-90">Innovation & Excellence</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-2">
                            <ul className="flex gap-1 text-white">
                                {navigationItems.map((item) => (
                                    <li key={item.name} className="relative group">
                                        <button
                                            onClick={() => item.hasDropdown ? handleDropdownToggle(item.name) : scrollToSection(item.id)}
                                            onMouseEnter={() => handleMouseEnter(item.name)}
                                            className="relative group hover:text-blue-100 transition-all duration-300 font-semibold py-3 px-4 rounded-xl hover:bg-white/10 hover:shadow-lg hover:scale-105 overflow-hidden flex items-center gap-2"
                                        >
                                            <span className="relative z-10">{item.name}</span>
                                            {item.hasDropdown && (
                                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-300 to-purple-400 group-hover:w-3/4 transition-all duration-300"></div>
                                        </button>

                                        {/* Products Mega Menu */}
                                        {item.isProductMenu && (
                                            <div
                                                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 z-50 ${activeDropdown === item.name ? 'opacity-100 visible transform scale-100' : 'opacity-0 invisible transform scale-95'
                                                    }`}
                                                onMouseEnter={() => setActiveDropdown(item.name)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                                                    {Object.entries(productCategories).map(([category, data]) => {
                                                        const IconComponent = data.icon;
                                                        return (
                                                            <div key={category} className="space-y-4">
                                                                <div
                                                                    className="flex items-center gap-3 pb-2 border-b border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                                                                    onClick={() => navigateToProducts(category)}
                                                                >
                                                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                                                        <IconComponent className="w-4 h-4 text-white" />
                                                                    </div>
                                                                    <h3 className="font-bold text-gray-800">{category}</h3>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    {data.items.map((product) => {
                                                                        const ProductIcon = product.icon;
                                                                        return (
                                                                            <button
                                                                                key={product.name}
                                                                                onClick={() => navigateToProducts(category, product.id)}
                                                                                className="w-full text-left px-3 py-2 text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-200 font-medium flex items-center gap-3 group rounded-lg"
                                                                            >
                                                                                <ProductIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                                                <span className="text-sm">{product.name}</span>
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200">
                                                    <button
                                                        onClick={() => navigateToProducts()}
                                                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-2"
                                                    >
                                                        View All Products
                                                        <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Regular Dropdown Menu - Only render if dropdownItems exists */}
                                        {item.hasDropdown && !item.isProductMenu && item.dropdownItems && (
                                            <div
                                                className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 z-50 ${activeDropdown === item.name ? 'opacity-100 visible transform scale-100' : 'opacity-0 invisible transform scale-95'
                                                    }`}
                                                onMouseEnter={() => setActiveDropdown(item.name)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <div className="py-2">
                                                    {item.dropdownItems.map((dropdownItem) => {
                                                        const IconComponent = dropdownItem.icon;
                                                        return (
                                                            <button
                                                                key={dropdownItem.name}
                                                                onClick={() => scrollToSection(item.id)}
                                                                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-200 font-medium flex items-center gap-3 group"
                                                            >
                                                                <IconComponent className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                                <span>{dropdownItem.name}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-100">
                                                    <button
                                                        onClick={() => scrollToSection(item.id)}
                                                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-2"
                                                    >
                                                        View All {item.name}
                                                        <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {/* Get Started Button */}
                            <div className="ml-4">
                                <Link href="/auth">
                                    <button
                                        className="relative overflow-hidden bg-gradient-to-r from-white to-blue-50 text-blue-800 px-6 py-3 rounded-full font-bold hover:from-blue-50 hover:to-white transition-all duration-300 hover:shadow-xl hover:scale-105 border border-white/20"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <span>GET STARTED</span>
                                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Right Section */}
                        <div className="lg:hidden flex items-center gap-3">

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/10 transition-all duration-300 hover:shadow-lg border border-white/20 hover:border-white/40"
                                aria-label="Toggle mobile menu"
                            >
                                {isMenuOpen ? (
                                    <X className="w-5 w-5 text-white" />
                                ) : (
                                    <Menu className="w-5 w-5 text-white" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                        <div className="bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-blue-900/95 rounded-2xl mx-4 mb-4 border border-blue-600/30 shadow-2xl backdrop-blur-sm">
                            {/* Mobile Contact Info */}
                            <div className="px-6 py-4 border-b border-blue-600/30 bg-gradient-to-r from-blue-900/80 to-blue-800/80 rounded-t-2xl">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors">
                                        <MapPin className="w-4 h-4 text-blue-400" />
                                        <span className="text-blue-100 text-sm font-medium">Kigali City, Rwanda</span>
                                    </div>
                                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors">
                                        <Phone className="w-4 h-4 text-green-400" />
                                        <a href="tel:+250788327780" className="text-blue-100 hover:text-white text-sm font-medium">
                                            +250 788 327 780
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors">
                                        <Mail className="w-4 h-4 text-purple-400" />
                                        <a href="mailto:info@tripleitsolution.rw" className="text-blue-100 hover:text-white text-sm font-medium">
                                            info@tripleitsolution.rw
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <div className="p-6 max-h-96 overflow-y-auto">
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
                                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                                                    )}
                                                </button>

                                                {/* Mobile Product Categories */}
                                                {item.isProductMenu && (
                                                    <div className={`ml-4 mt-2 overflow-hidden transition-all duration-300 ${activeDropdown === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                        }`}>
                                                        <div className="bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                                                            {Object.entries(productCategories).map(([category, data]) => {
                                                                const IconComponent = data.icon;
                                                                return (
                                                                    <div key={category} className="border-b border-white/5 last:border-b-0">
                                                                        <div
                                                                            className="flex items-center gap-3 px-4 py-3 bg-white/5 cursor-pointer hover:bg-white/10"
                                                                            onClick={() => navigateToProducts(category)}
                                                                        >
                                                                            <IconComponent className="w-4 h-4 text-blue-300" />
                                                                            <span className="text-blue-100 font-semibold text-sm">{category}</span>
                                                                        </div>
                                                                        <div className="px-4 pb-2">
                                                                            {data.items.slice(0, 4).map((product) => {
                                                                                const ProductIcon = product.icon;
                                                                                return (
                                                                                    <button
                                                                                        key={product.name}
                                                                                        onClick={() => navigateToProducts(category, product.id)}
                                                                                        className="w-full text-left px-3 py-2 text-blue-200 hover:text-white hover:bg-white/10 transition-all duration-200 text-xs font-medium flex items-center gap-3 group rounded-lg"
                                                                                    >
                                                                                        <ProductIcon className="w-3 h-3 text-blue-300" />
                                                                                        <span>{product.name}</span>
                                                                                    </button>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                            <button
                                                                onClick={() => navigateToProducts()}
                                                                className="w-full text-left px-4 py-3 text-blue-200 hover:text-white font-semibold text-sm flex items-center gap-2 bg-white/5"
                                                            >
                                                                View All Products
                                                                <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Mobile Regular Dropdown - Only render if dropdownItems exists */}
                                                {item.hasDropdown && !item.isProductMenu && item.dropdownItems && (
                                                    <div className={`ml-4 mt-2 overflow-hidden transition-all duration-300 ${activeDropdown === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                        }`}>
                                                        <div className="bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                                                            {item.dropdownItems.map((dropdownItem) => {
                                                                const IconComponent = dropdownItem.icon;
                                                                return (
                                                                    <button
                                                                        key={dropdownItem.name}
                                                                        onClick={() => scrollToSection(item.id)}
                                                                        className="w-full text-left px-4 py-2 text-blue-100 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium flex items-center gap-3 group border-b border-white/5 last:border-b-0"
                                                                    >
                                                                        <IconComponent className="w-4 h-4 text-blue-300" />
                                                                        <span>{dropdownItem.name}</span>
                                                                    </button>
                                                                );
                                                            })}
                                                            <button
                                                                onClick={() => scrollToSection(item.id)}
                                                                className="w-full text-left px-4 py-3 text-blue-200 hover:text-white font-semibold text-sm flex items-center gap-2 bg-white/5"
                                                            >
                                                                View All {item.name}
                                                                <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
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

            {/* Spacer for fixed header */}
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