import "@/styles/globals.css";
import "@/styles/collapsible.css";
import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { useEffect } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  // Add this to the body so that it works on portaled components
  useEffect(() => {
    document.body.classList.add(fontSans.variable);
    return () => {
      document.body.classList.remove(fontSans.variable);
    };
  }, []);

  return (
    <div id="__app_root">
      <Component {...pageProps} />
    </div>
  );
}
