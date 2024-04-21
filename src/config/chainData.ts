import * as chains from "viem/chains";

type ChainAttributes = {
  color: string | [string, string]; // Color for looking cute on frontend
  priceFeed: string; // pricefeed address for viewing a native currencies value in USD
  url?: string; // RPC URL for chains that don't have USD pricefeeds on Ethereum mainnet
};

// To allow your dapp to live on another chain, simply add its chainId to this array.
// Entire list of chains: https://github.com/wevm/viem/blob/main/src/chains/index.ts
export const includedChains = [
  1, 8453, 137, 80002, 43114, 43113, 250, 100, 1088,
];

// If adding a chain not listed below, provide a hex string color and a pricefeed address
// from: https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1
export const chainData: Record<string, ChainAttributes> = {
  [chains.hardhat.id]: {
    color: "#b8af0c",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH (On Ethereum)
  },
  [chains.mainnet.id]: {
    color: "#ff8b9e",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH (On Ethereum)
    url: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
  },
  [chains.sepolia.id]: {
    color: "#5f4bb6",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH (On Ethereum)
  },
  [chains.goerli.id]: {
    color: "#0975F6",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH (On Ethereum)
  },
  [chains.gnosis.id]: {
    color: "#48a9a6",
    priceFeed: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9", // XDAI (On Ethereum)
  },
  [chains.polygon.id]: {
    color: "#2bbdf7",
    priceFeed: "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676", // MATIC (On Ethereum)
  },
  [chains.polygonAmoy.id]: {
    color: "#FFB6C1",
    priceFeed: "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676", // MATIC (On Ethereum)"
  },
  [chains.optimismGoerli.id]: {
    color: "#f01a37",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH (On Ethereum)
  },
  [chains.optimism.id]: {
    color: "#f01a37",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH (On Ethereum)
  },
  [chains.arbitrumGoerli.id]: {
    color: "#28a0f0",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH (On Ethereum)
  },
  [chains.arbitrum.id]: {
    color: "#28a0f0",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH (On Ethereum)
  },
  [chains.fantom.id]: {
    color: "#1969ff",
    priceFeed: "0xf4766552D15AE4d256Ad41B6cf2933482B0680dc", // FTM (On Fantom)
    url: "https://fantom.blockpi.network/v1/rpc/public", // FTM/USD pricefeed on Ethereum doesn't currently exist
  },
  [chains.fantomTestnet.id]: {
    color: "#1969ff",
    priceFeed: "0xf4766552D15AE4d256Ad41B6cf2933482B0680dc", // FTM (On Fantom)
  },
  [chains.scrollSepolia.id]: {
    color: "#fbebd4",
    priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH (On Ethereum)
  },
  [chains.avalanche.id]: {
    color: "#D87308",
    priceFeed: "0xFF3EEb22B5E3dE6e705b44749C2559d704923FD7", // AVAX (On Ethereum)
  },
  [chains.avalancheFuji.id]: {
    color: "#FFC033",
    priceFeed: "0xFF3EEb22B5E3dE6e705b44749C2559d704923FD7", // AVAX (On Ethereum)
  },
  [chains.base.id]: {
    color: "#0000FF",
    // priceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    priceFeed: "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
    url: "https://mainnet.base.org",
  },
  [chains.metis.id]: {
    color: "#90EEBF",
    priceFeed: "0xD4a5Bb03B5D66d9bf81507379302Ac2C2DFDFa6D", // METIS (On Andromeda/Metis)
    url: "https://andromeda.metis.io/?owner=1088",
  },
};
