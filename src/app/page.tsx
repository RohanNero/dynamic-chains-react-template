"use client";

import Image from "next/image";
import { Header } from "../components/Header";

import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

export default function Home() {
  const text = "<your web3 magic>";
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{text}</div>
    </main>
  );
}
