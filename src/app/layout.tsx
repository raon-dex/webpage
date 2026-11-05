import type { Metadata } from "next";
import "./globals.css";
import { DrumSoundProvider } from "@/components/DrumSoundProvider";

export const metadata: Metadata = {
  title: "HAJUN'S WORLD",
  description: "AI Researcher & Software Engineer — Kim Hajun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><DrumSoundProvider>{children}</DrumSoundProvider></body>
    </html>
  );
}
