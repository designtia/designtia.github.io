import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Valentina Pashentsava — Senior Product Designer",
  description:
    "Turning complex workflows into clear, scalable products. Product strategy, UX, UI, and design systems.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
