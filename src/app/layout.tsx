import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { Providers } from "@/components/common/providers";
import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap"
});

const headingFont = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "SupportAI | AI Customer Support Platform",
  description:
    "SupportAI is a production-minded AI customer support platform with conversation oversight, knowledge management, and analytics."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

