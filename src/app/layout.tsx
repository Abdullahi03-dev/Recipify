import type { Metadata } from "next";
import { Playfair_Display,Inter} from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navigation from "./_components/Navigations";
import {Toaster} from 'react-hot-toast'
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight:['700'],
  variable:'--fontplayfair'
});

const inter=Inter({
  subsets:['latin'],
  variable:'--font-inter'
})

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Recipify App",
  description: "App that helps you to generate recipes by just typing the ingredients you have at the moment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <Navigation/>
        <AuthProvider>
          {children}
          <Toaster/>
        </AuthProvider>
      </body>
    </html>
  );
}
