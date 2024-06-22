import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ReduxProvider from "@/store/Provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Booking.com Clone",
  description: "By Sai Sandeep Koritala",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider >
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
        </body>
    </html>
  );
}
