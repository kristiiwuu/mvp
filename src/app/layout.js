import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const orienta = localFont({
  src: "./fonts/Orienta-Regular.ttf",
  variable: "--font-orienta",
  weight: "100 900",
})

export const metadata = {
  title: "Due",
  icons: {
    icon: '../blue-duey.svg'
  },
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Due</title>
      <body
        className={`${orienta.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
