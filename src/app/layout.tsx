"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header";
import Image from "next/image";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import * as chains from "viem/chains";
import { wagmiConfig } from "../config/wagmiConfig";
// import { useNativeCurrencyPrice } from "../hooks/useNativeCurrency";
// import { useGlobalState } from "../config/globalState";

const inter = Inter({ subsets: ["latin"] });

const allChains = Object.values(chains);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const price = useNativeCurrencyPrice();
  // const setNativeCurrencyPrice = useGlobalState(
  //   (state) => state.setNativeCurrencyPrice
  // );
  // useEffect(() => {
  //   if (price > 0) {
  //     setNativeCurrencyPrice(price);
  //   }
  // }, [setNativeCurrencyPrice, price]);

  return (
    <html lang="en">
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={allChains}>
          <body className={inter.className}>
            <div>
              <Header />
            </div>
            {children}
          </body>
        </RainbowKitProvider>
      </WagmiConfig>
    </html>
  );
}
