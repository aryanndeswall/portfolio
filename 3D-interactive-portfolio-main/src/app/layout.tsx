import type { Metadata } from "next";
import "./globals.css";
import GradualBlur from "@/components/ui/GradualBlur";
import ElasticCursor from "@/components/ui/ElasticCursor";
import GridScan from "@/components/ui/GridScan";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/footer/footer";
import Script from "next/script";
import Preloader from "@/components/preloader";
import EasterEggs from "@/components/easter-eggs";
import { config } from "@/data/config";
import SocketContextProvider from "@/contexts/socketio";
import RemoteCursors from "@/components/realtime/remote-cursors";

export const metadata: Metadata = {
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    images: [
      {
        url: config.ogImg,
        width: 800,
        height: 600,
        alt: "Portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    images: [config.ogImg],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="archivo-black">
      <head>
        <Script
          defer
          src={process.env.UMAMI_DOMAIN}
          data-website-id={process.env.UMAMI_SITE_ID}
        ></Script>
        {/* <Analytics /> */}
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#1d1927"
            gridScale={0.06}
            scanColor="#a855f7"
            scanOpacity={0.25}
            enablePost={true}
            bloomIntensity={0.4}
            chromaticAberration={0.001}
            noiseIntensity={0.005}
            className="fixed inset-0 -z-10 animate-fade-in"
          />
          <Preloader>
            <SocketContextProvider>
              {/* <RemoteCursors /> */}
              <TooltipProvider>
                <GradualBlur
                  target="page"
                  preset="header"
                  style={{ zIndex: 8 }}
                  strength={2}
                  opacity={0.8}
                />
                <Header />
                {children}
                <Footer />
              </TooltipProvider>
            </SocketContextProvider>
            <Toaster />
            <EasterEggs />
            <ElasticCursor />
          </Preloader>
        </ThemeProvider>
      </body>
    </html>
  );
}
