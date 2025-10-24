import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Supply Chain Management",
  description: "Efficient procurement and supplier management system",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#F5F6F1] text-gray-800 font-inter">
        <ThemeProvider>
          <Header />
          <main className="px-6 sm:px-8 lg:px-12 xl:px-16 py-8">
            <div className="bg-white border border-gray-100 p-8">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}