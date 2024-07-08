import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prompt",
  description: "Generated by create next app",
};

const navLinks = [
  { label: '', url: '/' },
  { label: '', url: '/about' },
  { label: '', url: '/contact' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <section className="w-full h-full">
            <Navbar title="PROMPT" links={navLinks} />
            <div className="flex flex-row w-full h-full fixed ">
              <div className="h-full bg-sidebar  w-[16rem]">
              <Sidebar />
            </div>
              <div className="w-full h-full">
                {children}
              </div>
            </div>
          </section>
          </ThemeProvider>
        </body>
      </html>
    </>

  );
}
