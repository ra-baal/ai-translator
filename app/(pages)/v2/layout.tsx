import { ReactNode } from "react";
import "../globals.css";

export const metadata = {
  title: "Web Translator",
  description: "Simple responsive translator app",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-blue-600 text-white py-4 shadow-md">
          <h1 className="text-2xl font-semibold text-center">Web Translator</h1>
        </header>

        <main className="flex-1 flex flex-col justify-start items-center p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-3xl">{children}</div>
        </main>

        <footer className="bg-gray-200 text-gray-700 py-4 mt-auto text-center text-sm">
          &copy; {new Date().getFullYear()} My Translator App
        </footer>
      </body>
    </html>
  );
}
