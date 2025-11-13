'use client';

import Hero from "@/app/(LandingPage)/Hero/page";
import Partners from "@/app/(LandingPage)/Partners/page";
import Services from "@/app/(LandingPage)/Services/page";
import Process from "@/app/(LandingPage)/Process/page";
import About from "@/app/(LandingPage)/About/page";
import Testimonials from "@/app/(LandingPage)/Testimonials/page";
import CTA from "@/app/(LandingPage)/CTA/page";
import Contact from "@/app/(LandingPage)/Contact/page";

export default function HomeComponents() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <Partners />
            <Services />
            <Process />
            <About />
            <Testimonials />
            <CTA />
            <Contact />
        </div>
    );
}