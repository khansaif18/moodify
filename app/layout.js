import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import AuthProvider from "@/context/AuthProvider";
import Head from "./head";
import Logout from "@/components/Logout";
import { Toaster } from "react-hot-toast";

const opensans = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export const metadata = {
  title: "Moodify · Home",
  description: "Track your daily mood every day of the year!",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 px-8 flex items-center justify-between">
      <Link href={'/'}>
        <h1 className={'text-2xl  textGradient ' + fugaz.className}>Moodify</h1>
      </Link>
      <Logout />
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={'text-indigo-500 text-sm'}>Made With 💜 by <a href="https://www.github.com/khansaif18" target="_blank"><b>@Saif</b></a></p>
    </footer>
  )

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body className={'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-[9vh] flex flex-col text-slate-800 ' + opensans.className}>
          {header}
          {children}
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          {footer}

        </body>
      </AuthProvider>
    </html>
  );
}
