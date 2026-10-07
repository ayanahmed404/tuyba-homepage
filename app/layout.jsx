import { DM_Sans, Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-montserrat",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata = {
  title: "Tuyba | Your Umrah Journey Starts Here",
  description:
    "Thoughtfully planned Umrah packages from the USA, with flights, hotels, visa support, and a team by your side.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${montserrat.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
