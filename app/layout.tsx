import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import CustomCursor from "@/app/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Sujith | Full Stack Developer",
  description:
    "Full Stack Developer passionate about building scalable web applications and solving real-world problems through technology. Expert in React, Next.js, Node.js, Python, AWS, and AI.",
  keywords: [
    "Full Stack Developer", "React", "Next.js", "Node.js", "Python", "TypeScript",
    "AWS", "AI", "LeetCode", "Portfolio", "Sujith",
  ],
  authors: [{ name: "Sujith" }],
  openGraph: {
    title: "Sujith | Full Stack Developer",
    description: "Building scalable web applications and intelligent solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujith | Full Stack Developer",
    description: "Building scalable web applications and intelligent solutions.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
