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
        <div className={`${inter.className} antialiased min-h-screen flex flex-col relative bg-[#050b1d] text-white`}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#08173a] via-[#050b1d] to-[#02040c]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(63,131,248,0.15),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(167,139,250,0.12),transparent_55%)]" />

            <div className="relative z-10 min-h-screen flex flex-col">
                <Header />
                <br /><br />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
