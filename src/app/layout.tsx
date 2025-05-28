import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./_components/navbar/navbar";
import MyProvider from "@/redux/provider";

export const metadata: Metadata = {
  title: "My E-commerce App",
  keywords: ["e-commerce", "nextjs", "react", "redux"],
  authors: [
    {
      name: "Naseem Ahmad",
      url: "https://webtechportfolio.netlify.app",
    },
  ],
  description: "An e-commerce application built with Next.js and Redux.", 
};

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <MyProvider>
          <NavbarComponent />
          <div className="mt-5 pt-5">{children}</div>
        </MyProvider>
      </body>
    </html>
  );
}
