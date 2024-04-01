"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import * as chains from "viem/chains";
import { wagmiConfig } from "../config/wagmiConfig";

const inter = Inter({ subsets: ["latin"] });

const allChains = Object.values(chains);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={allChains}>
            <div>
              <Header />
            </div>
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
