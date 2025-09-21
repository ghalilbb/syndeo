import '@mantine/core/styles.css';
import type { Metadata } from "next";
import { MantineProvider, AppShell } from '@mantine/core';
import { Footer } from "../components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { theme } from "@/theme";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Syndeo Infra",
  description: "Syndeo Infra Website",
   icons: {
    icon: [
      { url: '/favicon.png' },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
  <MantineProvider theme={theme}>
          <AppShell>
            <Header />
            {children}
            <Footer />
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
