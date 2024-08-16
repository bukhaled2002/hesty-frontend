import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/providers/QueryClientProvider";
import AuthSessionProvider from "@/providers/SessionProvider";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { DirectionProvider } from "@/providers/DirectionProvider";
import "./globals.css";

const CairoFont = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Hesty",
    template: "%s",
  },
  description: "Hesty is a learning platform for students.",
  keywords: [
    "Hesty",
    "Hesty Learning",
    "Hesty Platform",
    "Hesty Students",
    "Hesty Teachers",
    "Hesty Parents",
    "حصتي",
    "حصتي تعلم",
    "حصتي منصة تعليم",
    "حصتي طلاب",
    "حصتي معلمين",
    "حصتي أولياء أمور",
  ],
  openGraph: {
    locale: "ar_AR",
    type: "website",
    siteName: "Hesty",
    title: "Hesty",
    description: "Hesty is a learning platform for students.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <DirectionProvider>
        <body className={CairoFont.className}>
          <AuthSessionProvider>
            <QueryProvider>
              <main className="h-full">{children}</main>
              <Toaster />
            </QueryProvider>
          </AuthSessionProvider>
        </body>
      </DirectionProvider>
    </html>
  );
}
