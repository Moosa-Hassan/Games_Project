import { Inter } from "next/font/google";
import "./globals.css";
import UP from "./header/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mopi Game Mania",
  description: "Generated by the best",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <div className="header-container">
          <UP />
        </div>
        {children}
      </body>
    </html>
  );
}