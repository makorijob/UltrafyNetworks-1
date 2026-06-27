import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ultrafy Networks",
    template: "%s | Ultrafy Networks",
  },
  description:
    "Ultrafy Networks provides high-speed fiber internet, CCTV installation, electrical installations, solar solutions, fire alarm systems, and ICT services across Kenya.",
  keywords: [
    "Ultrafy Networks",
    "Fiber Internet Kenya",
    "Internet Service Provider",
    "CCTV Installation",
    "Solar Installation",
    "Electrical Installation",
    "Fire Alarm Systems",
    "ICT Solutions",
    "Networking",
    "Thika",
    "Kenya",
  ],
  verification: {
    google: "QnUzZvGE9aKsz4tqaEgpMQL-YxmEu6RIi1GucRyYje4",
  },
  openGraph: {
    title: "Ultrafy Networks",
    description:
      "Reliable fiber internet and professional ICT solutions in Kenya.",
    url: "https://ultrafynetwork.onpointtech.workers.dev",
    siteName: "Ultrafy Networks",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultrafy Networks",
    description:
      "Reliable fiber internet and professional ICT solutions in Kenya.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        <ToastContainer position="top-right" />
      </body>
    </html>
  );
}
