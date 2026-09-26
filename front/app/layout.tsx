import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SweetBakery",
  description: "Sistema de controle de encomendas de confeitaria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}