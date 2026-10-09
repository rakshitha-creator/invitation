import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/tiro-devanagari-sanskrit/400.css";
import "./globals.css";
import { wedding } from "@/content/wedding";

export const metadata: Metadata = {
  metadataBase: new URL(wedding.meta.siteUrl),
  title: wedding.meta.title,
  description: wedding.meta.description,
  openGraph: { title: wedding.meta.title, description: wedding.meta.description, images: ["/assets/og.jpg"], type: "website" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbf6ec",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* turn on scroll animations before first paint (skipped for reduced motion / no JS) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.js="";if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.motion="on"`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
