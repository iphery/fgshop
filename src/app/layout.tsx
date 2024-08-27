import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { DataProvider } from "@/app/app-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DataProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen bg-white">
          <Nav />
          <div className="px-20 bg-background text-black">{children}</div>
        </body>
      </html>
    </DataProvider>
  );
}
