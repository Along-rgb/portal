import type { Metadata, Viewport } from "next";
import { Geist, Noto_Sans_Lao } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansLao = Noto_Sans_Lao({
  variable: "--font-lao",
  subsets: ["lao"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${geistSans.variable} ${notoSansLao.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col overflow-x-hidden text-foreground">
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${siteConfig.backgroundImage}')` }}
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
