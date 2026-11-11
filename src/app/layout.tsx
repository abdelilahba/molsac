import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOL SAC • Haute Maroquinerie & Élégance à Tétouan | مول الصاك",
  description: "Maison de maroquinerie, souliers d'exception et haute joaillerie fantaisie à Kissaria Al Hamama, Tétouan. Découvrez la nouvelle collection 2026.",
  keywords: ["Mol Sac", "مول الصاك", "Maroquinerie Tétouan", "تطوان", "Kissaria Al Hamama", "Sacs luxe Maroc", "Chaussures Maroc", "Haute maroquinerie"],
  manifest: "/manifest.json",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "MOL SAC • L'Élégance à la Tétouanaise",
    description: "Boutique d'exception : Sacs, Souliers & Accessoires. Kissaria Al Hamama N°6, Tétouan.",
    images: ["/images/logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0d0a08",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className="min-h-screen bg-[#0d0a08] text-[#f6f3ee] antialiased selection:bg-[#d4af37] selection:text-[#0d0a08]">
        {children}
      </body>
    </html>
  );
}
