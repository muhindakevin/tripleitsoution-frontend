'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react';

const CTABlocks = [
    {
        title: 'Schedule a 30-minute discovery session',
        description: 'Meet with our solution architects to unpack your goals and map the right delivery squad.',
        icon: Calendar,
        action: 'Book a call',
        href: '#contact',
    },
    {
        title: 'Need a tailored proposal?',
        description: 'Receive a detailed plan with timelines, investment breakdown, and success metrics.',
        icon: MessageCircle,
        action: 'Share your brief',
        href: '#contact',
    },
];

const CTA: React.FC = () => {
    const scrollToContact = (elementId: string) => {
        const node = document.getElementById(elementId);
        if (node) {
            node.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="cta" className="section-shell bg-transparent">
            <div className="absolute inset-0 pointer-events-none">
                <div className="grid-overlay absolute inset-0 opacity-[0.05]" />
                <div className="absolute top-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-sky-500/30 blur-[140px]" />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="glass-panel border-white/10 bg-slate-950/80 px-8 py-12 md:px-12 md:py-16 text-center space-y-8">
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.4em] text-slate-200/80">
                        Let's build something remarkable
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white md:leading-snug">
                        Ready to modernise your technology and deliver next-level experiences?
                    </h2>
                    <p className="mx-auto max-w-3xl text-sm md:text-base text-slate-200/80">
                        Bring us in as an end-to-end delivery partner or to augment your existing teams with proven experts. We plug in quickly, stay aligned, and deliver outcomes with transparency.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                        <Link href="/auth">
                            <button className="cta-gradient text-white px-8 py-4 rounded-full font-semibold text-base md:text-lg flex items-center gap-3 shadow-glow hover:-translate-y-1 transition-all duration-300">
                                Start your project
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </Link>
                        <button
                            onClick={() => scrollToContact('contact')}
                            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                        >
                            Talk to an expert
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pt-6">
                        {CTABlocks.map((block) => {
                            const Icon = block.icon;
                            return (
                                <button
                                    key={block.title}
                                    onClick={() => scrollToContact(block.href.replace('#', ''))}
                                    className="text-left glass-panel border-white/10 bg-white/5 px-6 py-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/30"
                                >
                                    <div className="flex items-center gap-3 text-sky-300">
                                        <Icon className="h-5 w-5" />
                                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/80">
                                            {block.action}
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold text-white">{block.title}</h3>
                                    <p className="mt-2 text-sm text-slate-200/75">{block.description}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
