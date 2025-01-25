import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { Providers } from "@/components/providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/footer";
import { cn } from "@heroui/react";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased light",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
