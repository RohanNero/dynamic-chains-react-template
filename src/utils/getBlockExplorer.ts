import * as chains from "viem/chains";

/**
 * Gives the block explorer Address URL.
 * @param network - wagmi chain object
 * @param address
 * @returns block explorer address URL and etherscan URL if block explorer URL is not present for wagmi network
 */
export function getBlockExplorerAddressLink(chainId: number, address: string) {
  const chainNames = Object.keys(chains);

  const targetChain = chainNames.find((chainName) => {
    const wagmiChain = chains[chainName as keyof typeof chains];
    return wagmiChain.id === chainId;
  });

  if (targetChain == undefined) {
    return "";
  }

  const chainConfig = chains[targetChain as keyof typeof chains];

  if (!chainConfig || !chainConfig?.blockExplorers) {
    console.log("Block explorer not found!");
    return;
  }
  const blockExplorerBaseURL = chainConfig?.blockExplorers?.default?.url;

  if (!blockExplorerBaseURL) {
    console.log("Block explorer URL is undefined!");
    return "";
  }
  if (chainId === chains.hardhat.id) {
    return `/blockexplorer/address/${address}`;
  }

  if (!blockExplorerBaseURL) {
    return `https://etherscan.io/address/${address}`;
  }

  return `${blockExplorerBaseURL}/address/${address}`;
}
