import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { AssessmentProvider } from "@/components/assessment/AssessmentContext";
import { Navigation } from "@/components/layout/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillConnect - Access Tested and Trusted Talent Anytime",
  description: "Find and evaluate the perfect candidates for your team with our comprehensive talent assessment platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} antialiased h-full`}>
        <AssessmentProvider>
          <Navigation />
          <div className="h-full bg-background">
            {children}
          </div>
        </AssessmentProvider>
      </body>
    </html>
  );
} 