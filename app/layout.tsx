import type { Metadata } from "next";
import "./globals.css";
import { Marck_Script } from "next/font/google";

const marckScript = Marck_Script({
  subsets: ["cyrillic", "latin"], // додаємо кирилицю
  weight: ["400"], // тільки 400
  variable: "--font-handwritten",
});

export const metadata: Metadata = {
  title: "Valentine",
  description: "For u my love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body
        className={`bg-pink-100 font-sans ${marckScript.variable} font-handwritten`}
      >
        {children}
      </body>
    </html>
  );
}
