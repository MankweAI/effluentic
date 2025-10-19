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
  title: "EffluentLogic - Wastewater Treatment Sizing Tool",
  description:
    "Instant pre-feasibility reports for industrial wastewater treatment systems.",
};

function Header() {
  return (
    <header className="bg-brand-off-white shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <h1 className="text-xl font-bold text-brand-navy">EffluentLogic</h1>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="py-8 mt-16 border-t border-gray-200">
      <div className="container mx-auto px-6 text-center text-brand-steel text-sm">
        <p>
          &copy; {new Date().getFullYear()} EffluentLogic. All rights reserved.
        </p>
        <p className="mt-2">For Engineering Professionals in South Africa</p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
