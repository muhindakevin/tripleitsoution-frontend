'use client';
import React from 'react';
import { ArrowUpRight, Facebook, Instagram, Linkedin, Send, Twitter } from 'lucide-react';

const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Partners', id: 'partners' },
    { label: 'Services', id: 'services' },
    { label: 'Process', id: 'process' },
    { label: 'Success Stories', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
];

const services = [
    'Digital Product Engineering',
    'Cloud Infrastructure & DevOps',
    'Cybersecurity & Compliance',
    'Data Platforms & Analytics',
    'Managed IT Services',
    'Consulting & Advisory',
];

const socials = [
    { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com' },
    { label: 'Twitter', icon: Twitter, href: 'https://www.twitter.com' },
    { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com' },
    { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com' },
];

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (sectionId: string) => {
        const target = document.getElementById(sectionId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="relative overflow-hidden bg-slate-950 text-slate-200">
            <div className="absolute inset-0">
                <div className="grid-overlay absolute inset-0 opacity-[0.06]" />
                <div className="absolute top-0 left-1/4 h-48 w-48 rounded-full bg-sky-500/25 blur-[140px]" />
                <div className="absolute -bottom-20 right-1/4 h-56 w-56 rounded-full bg-purple-500/20 blur-[160px]" />
            </div>

            <div className="relative z-10">
                <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
                    <div className="glass-panel border-white/5 bg-white/5 px-8 py-10 md:px-12 md:py-12">
                        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-100">
                                    Triple IT Solution Ltd
                                </div>
                                <h3 className="text-2xl md:text-3xl font-semibold text-white">
                                    Building resilient, human-centered technology for ambitious teams across Africa.
                                </h3>
                                <p className="text-sm md:text-base text-slate-200/80">
                                    We combine strategic advisory, product design, and engineering excellence to accelerate your digital roadmap without compromising security or compliance.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {socials.map((social) => {
                                        const Icon = social.icon;
                                        return (
                                            <a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-slate-100 transition hover:border-white/40 hover:bg-white/20"
                                                aria-label={social.label}
                                            >
                                                <Icon className="h-4 w-4 group-hover:text-white" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="glass-panel border-white/10 bg-white/5 px-6 py-7">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/70">
                                    Stay in the loop
                                </p>
                                <h4 className="mt-3 text-lg font-semibold text-white">
                                    Quarterly insights on digital transformation
                                </h4>
                                <p className="mt-2 text-sm text-slate-200/70">
                                    Get curated playbooks, case studies, and technology updates delivered to your inbox.
                                </p>
                                <form className="mt-5 flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="w-full rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm text-slate-100 placeholder:text-slate-300/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                                        aria-label="Email address"
                                    />
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/25"
                                    >
                                        Subscribe
                                        <Send className="h-4 w-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr_0.9fr] text-sm">
                        <div className="space-y-5">
                            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/70">
                                Navigate
                            </h4>
                            <div className="grid grid-cols-2 gap-3 text-slate-200/80">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.label}
                                        onClick={() => scrollToSection(link.id)}
                                        className="group inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 transition hover:border-white/30 hover:bg-white/10"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 group-hover:scale-125 transition" />
                                        {link.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-5">
                            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/70">
                                Capabilities
                            </h4>
                            <ul className="space-y-3 text-slate-200/75">
                                {services.map((service) => (
                                    <li key={service} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-5">
                            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/70">
                                Contact
                            </h4>
                            <div className="space-y-3 text-slate-200/75">
                                <p>Remera, Kigali City, Rwanda</p>
                                <a href="tel:+250788327780" className="hover:text-white transition">
                                    +250 788 327 780
                                </a>
                                <a href="mailto:info@tripleitsolution.rw" className="hover:text-white transition">
                                    info@tripleitsolution.rw
                                </a>
                                <p className="text-xs text-slate-200/60">
                                    24/7 support with defined SLAs and proactive monitoring.
                                </p>
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/30 hover:bg-white/20"
                                >
                                    Let's collaborate
                                    <ArrowUpRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-200/60">
                        <p>&copy; {currentYear} Triple IT Solution Ltd. All rights reserved.</p>
                        <div className="flex flex-wrap items-center gap-4">
                            <button className="hover:text-white transition">Privacy Policy</button>
                            <button className="hover:text-white transition">Terms of Service</button>
                            <button className="hover:text-white transition">Cookie Policy</button>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-glow transition hover:border-white/30 hover:bg-white/20"
                aria-label="Scroll to top"
            >
                <ArrowUpRight className="h-5 w-5 -rotate-45 transition group-hover:-translate-y-1" />
            </button>
        </footer>
    );
};

export default Footer;