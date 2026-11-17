import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./light-theme.css";
import "./info.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5555"),
  title: "OfficeGuard | Keep work moving. Keep data protected.",
  description: "OfficeGuard by OG Systems brings authorized local file transfer, device management, policy controls, and audit visibility into one office security platform.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "OfficeGuard | Keep work moving. Keep data protected.",
    description: "Explore the OfficeGuard commercial demo for approved local file sharing and managed office devices.",
    images: [{ url: "/og-preview.png", width: 1200, height: 630, alt: "OfficeGuard commercial demo" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-preview.png"] },
  robots: process.env.ALLOW_INDEXING === "true" ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="/scroll-start.js" strategy="beforeInteractive" />
        <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
