import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Effluentic - Wastewater Treatment Sizing Tool",
  description:
    "Instant pre-feasibility reports for industrial wastewater treatment systems.",
};

function Header() {
  return (
    <header className="bg-brand-off-white shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex items-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="48" fill="#0A2540" />
          <path
            d="M25 62.5C37.5 50 37.5 50 50 37.5C62.5 25 75 37.5 75 37.5"
            stroke="#19D479"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 75C37.5 62.5 37.5 62.5 50 50C62.5 37.5 75 50 75 50"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-xl font-bold text-brand-navy ml-3">
          Effluentic
        </h1>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="py-8 mt-16 border-t border-gray-200">
      <div className="container mx-auto px-6 text-center text-brand-steel text-sm">
        <p>
          &copy; {new Date().getFullYear()} Effluent. All rights reserved.
        </p>
        <p className="mt-2">For Engineering Professionals in South Africa</p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
