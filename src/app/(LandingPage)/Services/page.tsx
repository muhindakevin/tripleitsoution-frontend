'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface Service {
    id: number;
    title: string;
    description: string;
    image: string;
    alt: string;
    focus: string;
}

const services: Service[] = [
    {
        id: 1,
        title: "Custom Software Development",
        description: "Tailor-made platforms engineered for performance, scalability, and maintainability across mission-critical operations.",
        image: "/images/software.jpg",
        alt: "Custom Software Development",
        focus: "Enterprise platforms"
    },
    {
        id: 2,
        title: "Website Design & Development",
        description: "Conversion-focused digital experiences that combine premium UI, modern frameworks, and flawless accessibility.",
        image: "/images/web.jpg",
        alt: "Website Design & Development",
        focus: "Experience design"
    },
    {
        id: 3,
        title: "Mobile App Development",
        description: "Native and cross-platform mobile applications built with offline resiliency, advanced integrations, and polished interactions.",
        image: "/images/app.jpg",
        alt: "Mobile App Development",
        focus: "Mobile innovation"
    },
    {
        id: 4,
        title: "Cybersecurity Solutions",
        description: "Proactive threat modelling, SOC monitoring, and zero-trust security frameworks to keep your business and users protected.",
        image: "/images/cyber.jpeg",
        alt: "Cybersecurity Solutions",
        focus: "Security"
    },
    {
        id: 5,
        title: "Data Analytics & Business Intelligence",
        description: "Unified data pipelines, realtime dashboards, and AI-assisted insights that accelerate smarter decision making.",
        image: "/images/data.jpg",
        alt: "Data Analytics & Business Intelligence",
        focus: "Insight & AI"
    },
    {
        id: 6,
        title: "Network Infrastructure & Structured Cabling",
        description: "Enterprise-grade connectivity, disaster-ready architectures, and structured cabling to power modern workplaces.",
        image: "/images/networks.jpg",
        alt: "Network Infrastructure",
        focus: "Infrastructure"
    },
    {
        id: 7,
        title: "Enterprise Wi-Fi Solution",
        description: "Secure, high-density Wi-Fi ecosystems with intelligent monitoring, automatic failover, and guest access controls.",
        image: "/images/wifi.jpg",
        alt: "Enterprise Wi-Fi Solution",
        focus: "Connectivity"
    },
    {
        id: 8,
        title: "CCTV & Security System Installation",
        description: "End-to-end surveillance and access control systems with predictive analytics and remote operations dashboards.",
        image: "/images/cctv.jpeg",
        alt: "CCTV & Security System Installation",
        focus: "Physical security"
    },
    {
        id: 9,
        title: "IT Consulting & System Integration",
        description: "Executive advisory, solution architecture, and integration services that align technology with strategic roadmaps.",
        image: "/images/consulting.jpg",
        alt: "IT Consulting & System Integration",
        focus: "Advisory"
    },
    {
        id: 10,
        title: "Cloud Solutions & Data Backup",
        description: "Cloud migrations, hybrid environments, and automated recovery playbooks engineered for resilience and compliance.",
        image: "/images/cloud.jpg",
        alt: "Cloud Solutions & Data Backup",
        focus: "Cloud"
    },
    {
        id: 11,
        title: "Technical Support & Maintenance",
        description: "24/7 support desks, on-site engineers, and preventative maintenance programmes delivered with strict SLAs.",
        image: "/images/tech.jpg",
        alt: "Technical Support & Maintenance",
        focus: "Managed services"
    }
];

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => (
    <article
        className="group glass-panel overflow-hidden border border-white/10 bg-slate-900/20 transition-all duration-500 hover:-translate-y-3 hover:border-white/30 hover:shadow-[0_25px_50px_rgba(15,23,42,0.55)]"
        style={{ animationDelay: `${index * 0.08}s` }}
    >
        <div className="relative h-48 overflow-hidden">
            <Image
                src={service.image}
                alt={service.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
            <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100/80">
                <Sparkles className="h-3 w-3 text-sky-300" />
                {service.focus}
            </span>
        </div>

        <div className="flex h-full flex-col gap-4 px-6 py-8">
            <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white leading-tight">{service.title}</h3>
                <p className="text-sm text-slate-200/80 leading-relaxed">
                    {service.description}
                </p>
            </div>

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10 text-xs text-slate-200/70">
                <span>Implementation & ongoing success</span>
                <ArrowUpRight className="h-4 w-4 text-sky-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
        </div>
    </article>
);

const capabilityPillars = [
    "Strategy & Advisory",
    "Design & Engineering",
    "Cyber Defence",
    "Cloud & Infrastructure",
    "Automation & AI",
    "Managed Services"
];

const Services: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const servicesToDisplay = showAll ? services : services.slice(0, 6);
    const remainingCount = services.length - 6;

    const handleToggle = () => {
        setIsAnimating(true);
        setShowAll((prev) => !prev);
        setTimeout(() => setIsAnimating(false), 700);
    };

    return (
        <section id="services" className="section-shell bg-section-gradient">
            <div className="absolute inset-0 pointer-events-none">
                <div className="grid-overlay absolute inset-0 opacity-10" />
                <div className="absolute top-10 right-[15%] h-48 w-48 rounded-full bg-sky-500/30 blur-3xl" />
                <div className="absolute bottom-0 left-[10%] h-64 w-64 rounded-full bg-purple-500/20 blur-[140px]" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-16">
                {/* Heading */}
                <header className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">
                        Proven Delivery Across The Full Stack
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold headline-gradient">End-to-end solutions that unlock growth</h2>
                        <p className="mx-auto max-w-3xl text-base md:text-lg text-slate-200/80 text-balance">
                            From strategy workshops to launch-day support and beyond, we assemble multi-disciplinary squads that modernise your technology, safeguard your operations, and delight your customers.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 pt-4">
                        {capabilityPillars.map((pill) => (
                            <span
                                key={pill}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100/80"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                                {pill}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Service Cards */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {servicesToDisplay.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>

                {/* Toggle Button */}
                {services.length > 6 && (
                    <div className="text-center">
                        <button
                            className="group relative inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
                            onClick={handleToggle}
                            disabled={isAnimating}
                        >
                            <span>{showAll ? 'Show less services' : 'Explore our full capabilities'}</span>
                            {!showAll && remainingCount > 0 && (
                                <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-bold">
                                    +{remainingCount}
                                </span>
                            )}
                            <ArrowUpRight className={`h-4 w-4 transition-transform duration-300 ${showAll ? '-rotate-45' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fade-up {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                article.group {
                    animation: fade-up 0.7s ease forwards;
                    opacity: 0;
                }
            `}</style>
        </section>
    );
};

export default Services;