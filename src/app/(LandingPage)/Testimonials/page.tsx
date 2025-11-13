'use client';
import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        name: 'Aline Uwimana',
        role: 'Chief Digital Officer',
        company: 'Equator Bank',
        headline: 'Reduced loan origination time by 63%',
        quote: 'Triple IT Solution modernised our banking stack without downtime and delivered an elegant omnichannel experience our customers love.',
    },
    {
        name: 'David Kamau',
        role: 'Director of Technology',
        company: 'Keza Logistics',
        headline: 'Scaled to 10x shipment volume',
        quote: 'They combined IoT, analytics, and cloud infrastructure to deliver insights in days. The MVP shipped in under eight weeks.',
    },
    {
        name: 'Sandrine Nabintu',
        role: 'Founder',
        company: 'MedAccess Rwanda',
        headline: 'Digitised patient touchpoints',
        quote: 'From patient portal to secure integrations, Triple IT Solution guided our rollout with empathy, rigour, and exceptional execution.',
    },
];

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="section-shell bg-transparent">
            <div className="absolute inset-0 pointer-events-none">
                <div className="grid-overlay absolute inset-0 opacity-[0.06]" />
                <div className="absolute top-0 right-1/4 h-40 w-40 rounded-full bg-sky-500/25 blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-14">
                <header className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/80">
                        Client Outcomes
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        We measure success in adoption, uptime, and business value
                    </h2>
                    <p className="mx-auto max-w-3xl text-sm md:text-base text-slate-200/75">
                        Each engagement is anchored on measurable outcomes backed by proactive support and continuous optimisation.
                    </p>
                </header>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <article
                            key={testimonial.name}
                            className="group glass-panel border-white/10 bg-white/5 px-6 py-8 transition-all duration-500 hover:-translate-y-3 hover:border-white/30"
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            <Quote className="h-10 w-10 text-sky-300" />
                            <div className="mt-4 space-y-3">
                                <h3 className="text-lg font-semibold text-white">{testimonial.headline}</h3>
                                <p className="text-sm text-slate-200/80 leading-relaxed">
                                    "{testimonial.quote}"
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/10">
                                <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                                <div className="text-xs text-slate-200/70">
                                    {testimonial.role}, {testimonial.company}
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-1 text-amber-300">
                                {[...Array(5).keys()].map((star) => (
                                    <Star key={star} className="h-4 w-4 fill-current" />
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
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

export default Testimonials;
