import * as dotenv from "dotenv";
dotenv.config();
import * as chains from "viem/chains";
import { createConfig, configureChains } from "wagmi";
import {
  braveWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

const allChains = Object.values(chains);

const data = configureChains(allChains, [
  alchemyProvider({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_KEY || "",
  }),
  publicProvider(),
]);

const walletsOptions = {
  chains: allChains,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
};

const wallets = [
  metaMaskWallet({ ...walletsOptions, shimDisconnect: true }),
  walletConnectWallet(walletsOptions),
  ledgerWallet(walletsOptions),
  braveWallet(walletsOptions),
  coinbaseWallet({
    ...walletsOptions,
    appName: "dynamic-chains-react-template",
  }),
  rainbowWallet(walletsOptions),
  safeWallet({
    ...walletsOptions,
    debug: false,
    allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
  }),
];
const wagmiConnectors = connectorsForWallets([
  {
    groupName: "Supported Wallets",
    wallets,
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: wagmiConnectors,
  publicClient: data.publicClient,
  webSocketPublicClient: data.webSocketPublicClient,
});
