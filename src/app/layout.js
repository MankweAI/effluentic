import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // Import the new Header

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Effluentic - Wastewater Treatment Sizing Tool",
  description:
    "Instant pre-feasibility reports for industrial wastewater treatment systems.",
};

function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 bg-white">
      <div className="container mx-auto px-6 text-center text-brand-steel text-sm">
        <p>
          &copy; {new Date().getFullYear()} Effluentic. All rights reserved.
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
      <body className={`${inter.variable} font-sans bg-brand-light-gray`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
