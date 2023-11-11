import { Open_Sans } from "next/font/google";

import Main from "./component/Main";
import Nav from "./component/Nav";
import "./globals.css";
import AuthContext from "@/context/AuthContext";
import SwrContext from "@/context/SwrContext";

const open_Sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={open_Sans.className}>
      <body className="w-full max-w-screen-xl overflow-auto mx-auto">
        <AuthContext>
          <SwrContext>
            <header
              className="sticky top-0 bg-white z-10  
            border-slate-200 border-b-2"
            >
              <Nav />
            </header>
            <Main>{children}</Main>
          </SwrContext>
        </AuthContext>
      </body>
    </html>
  );
}
