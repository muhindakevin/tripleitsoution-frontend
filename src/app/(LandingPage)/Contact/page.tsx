'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useSendMessageMutation } from '@/lib/redux/slices/MessageSlices';
import { ArrowRight, Mail, MapPin, Phone, Globe, Clock, Sparkles } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface ContactChannel {
    label: string;
    value: string;
    icon: React.ReactNode;
    href?: string;
}

const contactChannels: ContactChannel[] = [
    { label: 'Headquarters', value: 'Remera, Kigali City, Rwanda', icon: <MapPin className="h-4 w-4" /> },
    { label: 'Phone', value: '+250 788 327 780', icon: <Phone className="h-4 w-4" />, href: 'tel:+250788327780' },
    { label: 'Email', value: 'info@tripleitsolution.rw', icon: <Mail className="h-4 w-4" />, href: 'mailto:info@tripleitsolution.rw' },
    { label: 'Website', value: 'www.tripleitsolution.rw', icon: <Globe className="h-4 w-4" />, href: 'https://www.tripleitsolution.rw' },
];

const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
];

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const [sendMessage, { isLoading: isSubmitting, error, isSuccess }] = useSendMessageMutation();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isSuccess) {
            window.alert('Thank you for your message! We will get back to you soon.');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            console.error('Error sending message:', error);
            window.alert('There was an error sending your message. Please try again.');
        }
    }, [error]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const messagePayload = {
                name: formData.name,
                email: formData.email,
                message: `Subject: ${formData.subject}\n\n${formData.message}`
            };

            await sendMessage(messagePayload).unwrap();
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="section-shell bg-section-gradient text-white"
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="grid-overlay absolute inset-0 opacity-[0.06]" />
                <div className="absolute top-16 left-[15%] h-60 w-60 rounded-full bg-sky-500/30 blur-[160px]" />
                <div className="absolute bottom-0 right-[20%] h-64 w-64 rounded-full bg-purple-500/20 blur-[160px]" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-14">
                <header className={`text-center space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/80">
                        Talk With Our Team
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Let us know what you are building next</h2>
                    <p className="mx-auto max-w-3xl text-sm md:text-base text-slate-200/75">
                        Share a few details and our consultants will reach out within 24 hours to discuss fit, timelines, and next steps.
                    </p>
                </header>

            <div className={`grid lg:grid-cols-[1.1fr_0.9fr] gap-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <div className="glass-panel border-white/10 bg-white/5 p-8 md:p-10">
                        <div className="flex items-center gap-3 text-sky-300 text-sm font-semibold uppercase tracking-[0.25em]">
                            <Sparkles className="h-4 w-4" />
                            Share Your Project
                        </div>
                        <h3 className="mt-4 text-2xl font-semibold text-white">Send us a message</h3>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <label className="space-y-2 text-sm font-semibold text-slate-200/80">
                                    Full Name
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                                        placeholder="Enter your full name"
                                    />
                                </label>
                                <label className="space-y-2 text-sm font-semibold text-slate-200/80">
                                    Email Address
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                                        placeholder="Enter your email address"
                                    />
                                </label>
                            </div>

                            <label className="space-y-2 text-sm font-semibold text-slate-200/80">
                                Subject
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                                    placeholder="Tell us what you need help with"
                                />
                            </label>

                            <label className="space-y-2 text-sm font-semibold text-slate-200/80">
                                Message
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    className="w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40 resize-vertical"
                                    placeholder="Share your goals, timeline, or any links we should review"
                                />
                            </label>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full cta-gradient text-white py-3.5 px-6 rounded-full font-semibold text-base flex items-center justify-center gap-3 shadow-glow transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <aside className="space-y-6">
                        <div className="glass-panel border-white/10 bg-white/5 p-7 md:p-8">
                            <h3 className="text-xl font-semibold text-white">Connect directly</h3>
                            <p className="mt-2 text-sm text-slate-200/75">
                                Prefer a direct conversation? Reach out through any of the channels below and we will respond promptly.
                            </p>
                            <div className="mt-6 space-y-4">
                                {contactChannels.map((channel) => (
                                    <a
                                        key={channel.label}
                                        href={channel.href}
                                        className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200/80 transition hover:border-white/30 hover:bg-white/15"
                                        target={channel.href?.startsWith('http') ? '_blank' : undefined}
                                        rel={channel.href?.startsWith('http') ? 'noreferrer' : undefined}
                                    >
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300">
                                            {channel.icon}
                                        </span>
                                        <div>
                                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/60">{channel.label}</div>
                                            <div className="text-sm font-medium text-white group-hover:text-sky-200">{channel.value}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="glass-panel border-white/10 bg-white/5 p-7 md:p-8">
                            <div className="flex items-center gap-3 text-slate-200/70 text-sm font-semibold uppercase tracking-[0.25em]">
                                <Clock className="h-4 w-4 text-sky-300" />
                                Business Hours
                            </div>
                            <div className="mt-4 space-y-3 text-sm text-slate-200/80">
                                {businessHours.map((slot) => (
                                    <div key={slot.day} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                                        <span className="font-semibold text-white">{slot.day}</span>
                                        <span>{slot.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default Contact;