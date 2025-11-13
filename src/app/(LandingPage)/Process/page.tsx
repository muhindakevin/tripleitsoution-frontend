'use client';
import React from 'react';
import { BrainCircuit, CheckCircle, Rocket, ShieldCheck, Wrench } from 'lucide-react';

const processSteps = [
    {
        title: 'Discover & Align',
        description: 'Stakeholder workshops, technical audits, and success KPIs mapped into an actionable delivery roadmap.',
        icon: BrainCircuit,
        duration: 'Week 1',
    },
    {
        title: 'Design & Prototype',
        description: 'Experience design, architecture blueprints, and validation prototypes to de-risk key assumptions.',
        icon: CheckCircle,
        duration: 'Weeks 2-3',
    },
    {
        title: 'Build & Harden',
        description: 'Agile delivery sprints with automated testing, security gates, and continuous deployment pipelines.',
        icon: Wrench,
        duration: 'Weeks 4-8',
    },
    {
        title: 'Launch & Optimise',
        description: 'Hypercare, detailed run-books, performance tuning, and adoption analytics post go-live.',
        icon: Rocket,
        duration: 'Weeks 9+',
    },
];

const valueHighlights = [
    'Dedicated delivery lead and solution architect on every engagement',
    'Security, compliance, and observability embedded from day one',
    'Transparent progress dashboards and executive-ready reporting',
];

const Process: React.FC = () => {
    return (
        <section id="process" className="section-shell bg-slate-950/60">
            <div className="absolute inset-0 pointer-events-none">
                <div className="grid-overlay absolute inset-0 opacity-[0.08]" />
                <div className="absolute top-1/4 right-[12%] h-52 w-52 rounded-full bg-sky-500/30 blur-[120px]" />
                <div className="absolute bottom-6 left-[15%] h-64 w-64 rounded-full bg-purple-400/20 blur-[140px]" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-16">
                <header className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/80">
                            Our Delivery Framework
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Structured to ship faster, safer, and smarter
                        </h2>
                        <p className="text-base md:text-lg text-slate-200/75">
                            From regulatory-driven platforms to revenue-generating digital products, we bring a refined delivery model that balances pace with governance.
                        </p>
                    </div>

                    <div className="glass-panel border-white/10 bg-white/5 px-6 py-6 space-y-4 text-sm text-slate-200/75">
                        {valueHighlights.map((highlight) => (
                            <div key={highlight} className="flex items-start gap-3">
                                <ShieldCheck className="mt-1 h-5 w-5 text-sky-300" />
                                <span>{highlight}</span>
                            </div>
                        ))}
                    </div>
                </header>

                <div className="grid md:grid-cols-2 gap-6">
                    {processSteps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <article
                                key={step.title}
                                className="group glass-panel border-white/10 bg-white/5 px-7 py-8 transition-all duration-500 hover:-translate-y-3 hover:border-white/30"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex items-center justify-between text-xs font-semibold text-slate-200/70 uppercase tracking-[0.2em]">
                                    <span>{step.duration}</span>
                                    <span className="inline-flex items-center gap-2">
                                        Phase {index + 1}
                                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                                    </span>
                                </div>
                                <div className="mt-6 flex items-start gap-4">
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 border border-white/10 text-sky-300 transition-transform duration-300 group-hover:scale-110">
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                                        <p className="text-sm text-slate-200/75 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-up {
                    from {
                        opacity: 0;
                        transform: translateY(35px);
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

export default Process;
