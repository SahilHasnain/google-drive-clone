import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/layout/ClientWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "StoreIt",
  description: "StoreIt - The only storage solution you need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <ClientWrapper>
          {children}
          <div className="pointer-events-none fixed bottom-4 right-4 z-50 rounded-md bg-brand px-3 py-1 text-sm font-medium text-white shadow-lg transition-all hover:bg-brand/90">
            Developed by Ubaid Raza
          </div>
        </ClientWrapper>
      </body>
    </html>
  );
}
