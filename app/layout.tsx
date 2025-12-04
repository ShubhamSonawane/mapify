import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Mapify – Internal Talent Copilot",
  description:
    "Describe the skills or project you need, and we’ll find the right people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}


