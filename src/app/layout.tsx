import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pressio Spine™ | Advanced Spinal Implant Solutions",
    template: "%s | Pressio Spine™",
  },
  description:
    "Pressio Spine™ develops innovative spinal implant systems backed by clinical evidence — engineered for surgeons, designed for patients.",
  keywords: [
    "spinal implants",
    "spine surgery",
    "TLIF",
    "LLIF",
    "orthopedic spine",
    "clinical evidence",
    "Pressio Spine",
  ],
  metadataBase: new URL("https://pressiospine.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pressiospine.com",
    siteName: "Pressio Spine™",
    title: "Pressio Spine™ | Advanced Spinal Implant Solutions",
    description:
      "Innovative spinal implant systems backed by clinical evidence.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pressio Spine™",
    description:
      "Innovative spinal implant systems backed by clinical evidence.",
    images: ["/og-default.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
