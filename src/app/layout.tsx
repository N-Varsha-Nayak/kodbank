import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  weight: ["600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KodBank",
  description: "KodBank customer wallet dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
