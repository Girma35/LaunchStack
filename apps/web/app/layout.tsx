import "./globals.css";
import type { Metadata } from "next";
import { QueryProvider } from "../components/providers/query-provider";

export const metadata: Metadata = {
  title: "LaunchStack",
  description: "Commercial-grade AI SaaS starter kit"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
