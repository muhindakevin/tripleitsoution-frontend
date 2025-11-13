'use client';
import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Sparkles } from 'lucide-react';

const partners = [
    { name: 'Vercel', logo: '/vercel.svg', width: 120, height: 36 },
    { name: 'Next.js', logo: '/next.svg', width: 120, height: 36 },
    { name: 'Azure', logo: '/images/products/cloud.png', width: 64, height: 64 },
    { name: 'AWS', logo: '/images/products/server.png', width: 64, height: 64 },
    { name: 'Google Cloud', logo: '/images/products/monitor.jpeg', width: 64, height: 64 },
    { name: 'Cisco', logo: '/images/products/security.png', width: 64, height: 64 },
];

const metrics = [
    { value: '6 weeks', label: 'Average go-live for new platforms' },
    { value: '99.95%', label: 'Managed infrastructure uptime' },
    { value: '4.9/5', label: 'Client experience score' },
];

const Partners: React.FC = () => {
    return (
        <section id="partners" className="section-shell bg-transparent">
            <div className="absolute inset-0 pointer-events-none">
                <div className="grid-overlay absolute inset-0 opacity-10" />
                <div className="absolute top-0 left-1/3 h-36 w-36 rounded-full bg-sky-500/25 blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-16">
                <header className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/80">
                        Trusted Digital Partner
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Platform-ready solutions trusted by leaders across East Africa
                    </h2>
                    <p className="mx-auto max-w-3xl text-sm md:text-base text-slate-200/75">
                        We combine enterprise-grade delivery with local insight to ship technology that scales resiliently and compliantly.
                    </p>
                </header>

                <div className="glass-panel border-white/10 bg-white/5 px-8 py-10">
                    <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
                        {partners.map((partner) => (
                            <div key={partner.name} className="flex items-center justify-center grayscale hover:grayscale-0 transition duration-300">
                                <Image
                                    src={partner.logo}
                                    alt={`${partner.name} logo`}
                                    width={partner.width}
                                    height={partner.height}
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {metrics.map((metric) => (
                        <div key={metric.label} className="glass-panel border-white/10 bg-white/5 px-6 py-6 text-center">
                            <div className="text-2xl md:text-3xl font-semibold text-white">{metric.value}</div>
                            <div className="mt-2 text-xs md:text-sm text-slate-200/70">{metric.label}</div>
                        </div>
                    ))}
                </div>

                <div className="glass-panel border-white/10 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-slate-900/70 px-8 py-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex items-start gap-4">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 border border-white/20">
                            <ShieldCheck className="h-6 w-6 text-sky-300" />
                        </span>
                        <div>
                            <h3 className="text-lg font-semibold text-white">ISO-aligned delivery & security posture</h3>
                            <p className="mt-2 text-sm text-slate-200/70">
                                Our squads embed secure-by-design practices, CI/CD automation, and continuous monitoring from day one so every launch is resilient.
                            </p>
                        </div>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/90">
                        <Sparkles className="h-4 w-4 text-sky-300" />
                        Preferred vendor network
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;
