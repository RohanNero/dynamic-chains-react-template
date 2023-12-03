import * as chains from "viem/chains";

/**
 * Gives the block explorer Address URL.
 * @param network - wagmi chain object
 * @param address
 * @returns block explorer address URL and etherscan URL if block explorer URL is not present for wagmi network
 */
export function getBlockExplorerAddressLink(chainId: number, address: string) {
  const chainNames = Object.keys(chains);

  const targetChainArr = chainNames.filter((chainName) => {
    const wagmiChain = chains[chainName as keyof typeof chains];
    return wagmiChain.id === chainId;
  });

  if (targetChainArr.length === 0) {
    return "";
  }

  const targetChain = targetChainArr[0] as keyof typeof chains;
  const currentChain = chains[targetChain];
  console.log("currentChain:", currentChain);
  console.log("targetChain:", targetChain);
  console.log("explorer:", currentChain?.blockExplorers);
  if (!currentChain || !currentChain?.blockExplorers) {
    console.log("Block explorer not found!");
  }
  // @ts-ignore
  const blockExplorerBaseURL = chains[targetChain]?.blockExplorers
    ? chains[targetChain]?.blockExplorers?.default?.url
    : undefined;

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
