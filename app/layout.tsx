import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI translator",
  description: "AI translator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <header>
          <Link href="/">
            <p className="m-1 md:m-2 w-full text-center text-4xl font-bold">
              AI translator
            </p>
          </Link>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="mt-auto w-full text-center py-4">
          <p>© RB 2025</p>
        </footer>
      </body>
    </html>
  );
}
