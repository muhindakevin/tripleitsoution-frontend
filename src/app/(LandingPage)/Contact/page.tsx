'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useSendMessageMutation } from '@/lib/redux/slices/MessageSlices'

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface ContactItemProps {
    icon: string;
    text: string;
    delay: number;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, text, delay }) => {
    const [isVisible, setIsVisible] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

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

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        return () => {
            if (itemRef.current) {
                observer.unobserve(itemRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={itemRef}
            className={`flex items-center mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-8'
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <span className="text-2xl mr-4 text-blue-300">
                {icon}
            </span>
            <span className="text-white">{text}</span>
        </div>
    );
};

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // Redux mutation hook
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

    // Handle success message
    useEffect(() => {
        if (isSuccess) {
            alert('Thank you for your message! We will get back to you soon.');
            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        }
    }, [isSuccess]);

    // Handle error message
    useEffect(() => {
        if (error) {
            console.error('Error sending message:', error);
            alert('There was an error sending your message. Please try again.');
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
            // Create the payload according to your Thunder Client format
            const messagePayload = {
                name: formData.name,
                email: formData.email,
                message: `Subject: ${formData.subject}\n\n${formData.message}`
            };

            // Send the message using Redux mutation
            await sendMessage(messagePayload).unwrap();
        } catch (err) {
            // Error is handled by the useEffect above
            console.error('Failed to send message:', err);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white relative overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <h2 className={`text-4xl font-bold text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
                    }`}>
                    Get In Touch
                </h2>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-12'
                        }`}>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border-0 bg-white/90 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border-0 bg-white/90 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-bold mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border-0 bg-white/90 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                        placeholder="Enter message subject"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-lg border-0 bg-white/90 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-vertical"
                                        placeholder="Enter your message"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-500 text-white py-3 px-6 rounded-full font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-12'
                        }`}>
                        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                        <div className="space-y-4 mb-8">
                            <ContactItem icon="📍" text="Remera, Kigali City, Rwanda" delay={600} />
                            <ContactItem icon="📞" text="+250 788327780" delay={700} />
                            <ContactItem icon="✉️" text="info@tripleitsolution.rw" delay={800} />
                            <ContactItem icon="🌐" text="www.tripleitsolution.rw" delay={900} />
                        </div>

                        <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
                            }`}>
                            <h4 className="text-xl font-bold mb-4 text-blue-300">Business Hours</h4>
                            <div className="space-y-2 text-gray-300">
                                <p className="flex justify-between">
                                    <span>Monday - Friday:</span>
                                    <span>9:00 AM - 6:00 PM</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Saturday:</span>
                                    <span>10:00 AM - 4:00 PM</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Sunday:</span>
                                    <span>Closed</span>
                                </p>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className={`mt-8 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
                            }`}>
                            <h4 className="text-xl font-bold mb-4 text-blue-300">Follow Us</h4>
                            <div className="flex space-x-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                                    <span className="text-white text-xl">📘</span>
                                </div>
                                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                                    <span className="text-white text-xl">🐦</span>
                                </div>
                                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer">
                                    <span className="text-white text-xl">💼</span>
                                </div>
                                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                                    <span className="text-white text-xl">📷</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;