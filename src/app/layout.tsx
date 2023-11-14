import { Open_Sans } from "next/font/google";

import Main from "./component/Main";
import Nav from "./component/Nav";
import "./globals.css";
import AuthContext from "@/context/AuthContext";
import SwrContext from "@/context/SwrContext";

const open_Sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Googlram",
    template: "Googlram | %s",
  },
  description: "Googlram is the best",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={open_Sans.className}>
      <body className="w-full bg-neutral-50 overflow-visible">
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <div className="max-w-screen-xl mx-auto">
              <Nav />
            </div>
          </header>
          <main className="w-full flex justify-center">
            <div className="w-full max-w-[850px] p-4">
              <SwrContext>
                {props.children}
                {props.modal}
              </SwrContext>
            </div>
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
