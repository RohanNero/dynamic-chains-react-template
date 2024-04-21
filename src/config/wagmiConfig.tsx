import * as dotenv from "dotenv";
dotenv.config();
import * as chains from "viem/chains";
import { createConfig } from "wagmi";
import { createClient, http } from "viem";
import {
  metaMaskWallet,
  rainbowWallet,
  oneInchWallet,
  phantomWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { chainData } from "./chainData";
import { getEnabledChains } from "../utils/getEnabledChains";

const allChains = Object.values(chains);

// List of connectors we allow the connect button to use
// To update the list change the wallets array
// List of connectors: https://www.rainbowkit.com/docs/custom-wallet-list
const wagmiConnectors = connectorsForWallets(
  [
    {
      groupName: "Supported Wallets",
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        rainbowWallet,
        oneInchWallet,
        phantomWallet,
      ],
    },
  ],
  {
    appName: "Dynamic Chains React Template",
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "", // Get a project Id for free at https://cloud.walletconnect.com/app/
  }
);

const getRpcUrl = (chainId: string) => {
  console.log("getRpcUrl input:", chainId);

  return undefined;
};

// Core Wagmi Config object
export const wagmiConfig = createConfig({
  connectors: wagmiConnectors,
  chains: getEnabledChains(), // change this to use our includedChains array in chainData.ts (will need function to assemble the array)
  client({ chain }) {
    return createClient({ chain, transport: http(getRpcUrl(chain.id)) }); // Initialize empty viem client as default
  },
});
