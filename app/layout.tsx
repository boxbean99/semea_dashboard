import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import QueryProvider from "@/components/providers/QueryProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SE&MEA Dashboard",
  description: "MyRealTrip Southern Europe & Middle East Africa Team Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={spaceGrotesk.variable} style={{ height: "100%" }}>
      <body style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <QueryProvider>
          <Navigation />
          <main style={{ flex: 1 }}>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
