import * as chains from "viem/chains";

type ChainAttributes = {
  // color | [lightThemeColor, darkThemeColor]
  color: string | [string, string];
  // Used to fetch price by providing mainnet token address
  // for networks having native currency other than ETH
  nativeCurrencyTokenAddress?: string;
};

// To allow your dapp to live on another chain, simply add its chainId to this array.
// Entire list of chains: https://github.com/wevm/viem/blob/main/src/chains/index.ts
export const includedChains = [1, 11155111, 137, 80001, 100, 43114, 43113, 5];

export const chainData: Record<string, ChainAttributes> = {
  [chains.hardhat.id]: {
    color: "#b8af0c",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH
  },
  [chains.mainnet.id]: {
    color: "#ff8b9e",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH
  },
  [chains.sepolia.id]: {
    color: "#5f4bb6",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH
  },
  [chains.goerli.id]: {
    color: "#0975F6",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH
  },
  [chains.gnosis.id]: {
    color: "#48a9a6",
    priceFeed: "0x678df3415fc31947dA4324eC63212874be5a82f8", // XDAI
  },
  [chains.polygon.id]: {
    color: "#2bbdf7",
    priceFeed: "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676", // MATIC (On Ethereum)
    // priceFeed: "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0", // MATIC
    nativeCurrencyTokenAddress: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
  },
  [chains.polygonMumbai.id]: {
    color: "#92D9FA",
    priceFeed: "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676", // MATIC (On Ethereum)
    // priceFeed: "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0", // MATIC
    nativeCurrencyTokenAddress: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
  },
  [chains.optimismGoerli.id]: {
    color: "#f01a37",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH
  },
  [chains.optimism.id]: {
    color: "#f01a37",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH
  },
  [chains.arbitrumGoerli.id]: {
    color: "#28a0f0",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH
  },
  [chains.arbitrum.id]: {
    color: "#28a0f0",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH
  },
  [chains.fantom.id]: {
    color: "#1969ff",
    priceFeed: "0x2DE7E4a9488488e0058B95854CC2f7955B35dC9b", // FTM (On Ethereum)
    // priceFeed: "0xf4766552D15AE4d256Ad41B6cf2933482B0680dc", // FTM
  },
  [chains.fantomTestnet.id]: {
    color: "#1969ff",
    priceFeed: "0x2DE7E4a9488488e0058B95854CC2f7955B35dC9b", // FTM (On Ethereum)
    // priceFeed: "0xf4766552D15AE4d256Ad41B6cf2933482B0680dc", // FTM
  },
  [chains.scrollSepolia.id]: {
    color: "#fbebd4",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH
  },
  [chains.avalanche.id]: {
    color: "#D87308",
    priceFeed: "0xFF3EEb22B5E3dE6e705b44749C2559d704923FD7", // AVAX (On Ethereum)
    // priceFeed: "0x0A77230d17318075983913bC2145DB16C7366156", // AVAX
  },
  [chains.avalancheFuji.id]: {
    color: "#FFC033",
    priceFeed: "0xFF3EEb22B5E3dE6e705b44749C2559d704923FD7", // AVAX (On Ethereum)
    // priceFeed: "0x0A77230d17318075983913bC2145DB16C7366156", // AVAX
  },
};
