import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EnRegla",
  description: "Administración",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
