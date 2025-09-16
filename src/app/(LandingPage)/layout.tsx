import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Triple Solution",
    description: "Triple Solution",
    icons: {
        icon: '/favicon.ico',
        shortcut: '/logo.jpeg',
        apple: '/logo.jpeg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${inter.className} antialiased min-h-screen flex flex-col relative`}>
            <video
                autoPlay
                muted
                loop
                playsInline
                className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
            >
                <source src="/bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="relative z-10 bg-black/50 min-h-screen flex flex-col">
                <Header />
                <br/><br/>
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
