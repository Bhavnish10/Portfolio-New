import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhavnish Nanda | Finance & Analytics Portfolio",
  description: "Portfolio of Bhavnish Nanda - MBA Finance Student and Data Analytics & Technology Enthusiast at Institute of Management, Nirma University.",
  keywords: [
    "Bhavnish Nanda",
    "Portfolio",
    "MBA Finance",
    "Data Analytics",
    "Investment Analysis",
    "Nirma University",
    "Computer Science",
    "Power BI",
    "Machine Learning",
    "Equity Research",
  ],
  authors: [{ name: "Bhavnish Nanda" }],
  creator: "Bhavnish Nanda",
  openGraph: {
    title: "Bhavnish Nanda | AI Developer & Blockchain Enthusiast",
    description: "Futuristic premium portfolio of Bhavnish Nanda, bridging the gap between business strategy and cutting-edge technology.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhavnish Nanda | AI Developer & Blockchain Enthusiast",
    description: "Futuristic premium portfolio of Bhavnish Nanda.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-dark-bg text-slate-100 font-sans relative min-h-screen antialiased overflow-x-hidden selection:bg-primary/30 selection:text-primary-light">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
