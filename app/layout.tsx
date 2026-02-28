import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";


export const metadata: Metadata = {
  title: "Sriram Kranthi Kumar - Full-Stack Developer",
  description: "Full-Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building responsive, high-performance applications with exceptional user experiences.",
  keywords: ["Full-Stack Developer", "React Developer", "Next.js", "Node.js", "TypeScript", "Portfolio", "Web Developer", "Frontend", "Backend"],
  authors: [{ name: "Sriram Kranthi Kumar" }],
  creator: "Sriram Kranthi Kumar",
  openGraph: {
    title: "Sriram Kranthi Kumar - Full-Stack Developer",
    description: "Full-Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    url: "https://kranthi6600.github.io/portfolio",
    siteName: "Sriram Kranthi Kumar Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sriram Kranthi Kumar - Full-Stack Developer",
    description: "Full-Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
