import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Color Your Day / Mistral Chatbot",
  description: "Type in your mood and observe the change in background based on your emotion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/smileIcon.jpg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
