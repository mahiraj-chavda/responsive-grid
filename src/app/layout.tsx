import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProviders from "@/services/reactQueryProviders";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Responsive Grid || Tinyleap",
  description: "Tinyleap 3x3 grid that is responsive example",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReactQueryProviders> {children}</ReactQueryProviders>
      </body>
    </html>
  );
}
