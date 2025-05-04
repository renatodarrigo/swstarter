"use client";

import { Montserrat } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import Header from "@/components/Header";

import "./globals.css";
import { keepTheme } from "@/utils/theme";
import Favicons from "@/components/Favicons";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  const [themeClassName, setThemeClassName] = useState("theme-light");

  useEffect(() => {
    keepTheme(setThemeClassName);
  }, [setThemeClassName]);

  return (
    <html lang="en" className={`${montserrat.variable} ${themeClassName}`}>
      <head>
        <title>SWStarter</title>
        <Favicons theme={themeClassName} />
      </head>
      <body>
        <Header setThemeClassName={setThemeClassName} />
        <main>
          <QueryClientProvider client={queryClient}>
            <Suspense>{children}</Suspense>
          </QueryClientProvider>
        </main>
      </body>
    </html>
  );
}
