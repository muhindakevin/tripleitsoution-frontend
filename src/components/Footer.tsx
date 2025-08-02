// components/Footer.tsx
'use client';
import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-white py-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-2xl"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="md:col-span-2">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-lg">T</span>
                            </div>
                            <h3 className="text-xl font-bold">Triple IT Solution</h3>
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            Empowering businesses through innovative technology solutions.
                            We deliver reliable, customizable, and efficient digital solutions
                            that drive growth and success.
                        </p>
                        <div className="flex space-x-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                                <span className="text-white">📘</span>
                            </div>
                            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                                <span className="text-white">🐦</span>
                            </div>
                            <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer">
                                <span className="text-white">💼</span>
                            </div>
                            <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                                <span className="text-white">📷</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-blue-300">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Services
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-blue-300">Our Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="text-gray-300">Software Development</li>
                            <li className="text-gray-300">Web Development</li>
                            <li className="text-gray-300">Mobile Apps</li>
                            <li className="text-gray-300">Cybersecurity</li>
                            <li className="text-gray-300">Cloud Solutions</li>
                            <li className="text-gray-300">IT Consulting</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-300 text-sm mb-4 md:mb-0">
                            &copy; {currentYear} Triple IT Solution. All rights reserved.
                        </div>

                        <div className="flex flex-wrap gap-6 text-sm">
                            <button className="text-gray-300 hover:text-white transition-colors">
                                Privacy Policy
                            </button>
                            <button className="text-gray-300 hover:text-white transition-colors">
                                Terms of Service
                            </button>
                            <button className="text-gray-300 hover:text-white transition-colors">
                                Cookie Policy
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contact Info Bar */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <span>📍</span>
                            <span>Remera, Kigali City, Rwanda</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>📞</span>
                            <span>+250 788327780</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>✉️</span>
                            <span>info@tripleitsolution.rw</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 z-50"
                aria-label="Scroll to top"
            >
                <span className="text-xl">⬆️</span>
            </button>
        </footer>
    );
};

export default Footer;