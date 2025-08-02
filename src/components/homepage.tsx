'use client';

import Hero from "@/app/(LandingPage)/Hero/page";
import Services from "@/app/(LandingPage)/Services/page";
import About from "@/app/(LandingPage)/About/page";
import Contact from "@/app/(LandingPage)/Contact/page";

export default function HomeComponents() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <Services />
            <About />
            <Contact />
        </div>
    );
}