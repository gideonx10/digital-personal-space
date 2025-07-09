// app/layout.js

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Digital Diary",
  description: "Personal Digital Diary & Self-Org Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <Navbar />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
