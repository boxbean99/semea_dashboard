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
  title: "남부유럽팀 Dashboard",
  description: "MyRealTrip Southern Europe & Middle East Africa Team Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={spaceGrotesk.variable} style={{ height: "100%" }}>
      <body style={{ minHeight: "100%", display: "flex", flexDirection: "column", backgroundColor: "#0d1117" }}>
        <QueryProvider>
          {/* 최대 너비 고정 컨테이너 */}
          <div style={{
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 0 0 1px #1a2540",
          }}>
            <Navigation />
            <main style={{ flex: 1 }}>{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
