import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/navbar/Navbar";
import Footer from "../components/layout/footer/Footer";
import { ReduxProvider } from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Souqna - Your Online Marketplace",
  description: "Discover the best products at unbeatable prices",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Toaster position="bottom-right" reverseOrder={false} />
          <ReduxProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ReduxProvider>
      </body>
    </html>
  );
}
