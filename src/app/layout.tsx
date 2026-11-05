import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}