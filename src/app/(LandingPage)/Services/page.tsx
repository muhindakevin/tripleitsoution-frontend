'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface Service {
    id: number;
    title: string;
    description: string;
    image: string;
    alt: string;
}

const services: Service[] = [
    {
        id: 1,
        title: "Custom Software Development",
        description: "Tailored software solutions designed to meet your specific business needs. From enterprise applications to automation tools, we build scalable and efficient software.",
        image: "/images/software.jpg",
        alt: "Custom Software Development"
    },
    {
        id: 2,
        title: "Website Design & Development",
        description: "Professional websites that combine stunning design with powerful functionality. Responsive, SEO-optimized, and user-friendly web solutions.",
        image: "/images/web.jpg",
        alt: "Website Design & Development"
    },
    {
        id: 3,
        title: "Mobile App Development",
        description: "Native Android & iOS applications that deliver exceptional user experiences. From concept to deployment, we create mobile apps that engage users.",
        image: "/images/app.jpg",
        alt: "Mobile App Development"
    },
    {
        id: 4,
        title: "Cybersecurity Solutions",
        description: "Comprehensive security measures to protect your digital assets. Advanced threat detection, prevention systems, and security auditing services.",
        image: "/images/cyber.jpeg",
        alt: "Cybersecurity Solutions"
    },
    {
        id: 5,
        title: "Data Analytics & Business Intelligence",
        description: "Transform your data into actionable insights. Advanced analytics, reporting dashboards, and business intelligence solutions for informed decision-making.",
        image: "/images/data.jpg",
        alt: "Data Analytics & Business Intelligence"
    },
    {
        id: 6,
        title: "Network Infrastructure & Structured Cabling",
        description: "Professional network setup and structured cabling solutions. Reliable, scalable network infrastructure designed for optimal performance.",
        image: "/images/networks.jpg",
        alt: "Network Infrastructure"
    },
    {
        id: 7,
        title: "Enterprise Wi-Fi Solution",
        description: "High-performance wireless network solutions for businesses. Secure, reliable, and scalable Wi-Fi infrastructure with comprehensive coverage.",
        image: "/images/wifi.jpg",
        alt: "Enterprise Wi-Fi Solution"
    },
    {
        id: 8,
        title: "CCTV & Security System Installation",
        description: "Complete surveillance and security system installation. High-definition cameras, monitoring systems, and access control solutions.",
        image: "/images/cctv.jpeg",
        alt: "CCTV & Security System Installation"
    },
    {
        id: 9,
        title: "IT Consulting & System Integration",
        description: "Strategic IT planning and seamless system integration services. Expert guidance for technology roadmap and digital transformation initiatives.",
        image: "/images/consulting.jpg",
        alt: "IT Consulting & System Integration"
    },
    {
        id: 10,
        title: "Cloud Solutions & Data Backup",
        description: "Secure cloud migration, storage solutions, and automated backup systems. Protect your data with reliable cloud infrastructure and disaster recovery.",
        image: "/images/cloud.jpg",
        alt: "Cloud Solutions & Data Backup"
    },
    {
        id: 11,
        title: "Technical Support & Maintenance",
        description: "24/7 technical support and proactive system maintenance. Keep your IT infrastructure running smoothly with our comprehensive support services.",
        image: "/images/tech.jpg",
        alt: "Technical Support & Maintenance"
    }
];

const ServiceCard: React.FC<{ service: Service; index: number; isVisible: boolean }> = ({ service, index, isVisible }) => {
    return (
        <div
            className={`bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 group relative overflow-hidden ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 h-0 overflow-hidden'
                }`}
            style={{
                animationDelay: isVisible ? `${(index % 6) * 0.1}s` : '0s',
                transitionDelay: isVisible ? `${(index % 6) * 0.05}s` : '0s'
            }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 transition-all duration-500"></div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000"></div>

            <div className="relative z-10">
                <div className="aspect-[4/3] relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group-hover:shadow-lg transition-shadow duration-300">
                    <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                            console.log(`Failed to load image: ${service.image}`);
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            if (target.parentElement) {
                                target.parentElement.innerHTML = `
                                    <div class="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                        <div class="text-4xl">🔧</div>
                                    </div>
                                `;
                            }
                        }}
                    />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                </p>
            </div>
        </div>
    );
};

const Services: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const visibleServices = showAll ? services : services.slice(0, 6);
    const remainingCount = services.length - 6;

    const handleToggle = () => {
        setIsAnimating(true);
        setShowAll(!showAll);

        // Reset animation state after transition
        setTimeout(() => {
            setIsAnimating(false);
        }, 800);
    };

    return (
        <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] bg-repeat"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-block">
                        <h2 className="text-5xl font-bold text-gray-800 mb-4 animate-fade-in-up relative">
                            Our Services
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                        </h2>
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Comprehensive IT solutions designed to accelerate your business growth and digital transformation
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                            isVisible={index < 6 || showAll}
                        />
                    ))}
                </div>

                {/* Show More/Less Button */}
                {services.length > 6 && (
                    <div className="text-center">
                        <button
                            onClick={handleToggle}
                            disabled={isAnimating}
                            className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                        >
                            {/* Button Background Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <span className="relative z-10 flex items-center">
                                {showAll ? (
                                    <>
                                        <svg className="w-5 h-5 mr-2 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                        Show Less
                                    </>
                                ) : (
                                    <>
                                        <span className="mr-2">View All Services</span>
                                        <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-bold mr-2">
                                            +{remainingCount}
                                        </span>
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </>
                                )}
                            </span>

                            {/* Ripple Effect */}
                            <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-20 group-active:scale-110 bg-white transition-all duration-200"></div>
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    animation-fill-mode: both;
                }

                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }

                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default Services;