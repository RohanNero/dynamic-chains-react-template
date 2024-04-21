import * as chains from "viem/chains";
import { includedChains } from "../config/chainData";

/**
 * Creates the array of chain objects using chainIds' inside `chainData.ts` `includedChains`.
 * @returns block explorer address URL and etherscan URL if block explorer URL is not present for wagmi network
 */
export function getEnabledChains() {
  const allChains = Object.values(chains);

  let enabledChains = [];
  for (const id of includedChains) {
    const targetChain = allChains.find((chain) => {
      return chain.id === id;
    });
    enabledChains.push(targetChain);
  }

  // If mainnet isn't in the `includedChains` array, we manually add it since it is vital for many pricefeeds
  // To remove this feature simply comment out or remove lines 21-27
  if (
    includedChains.includes(1) == false &&
    includedChains.includes("1") == false
  ) {
    const mainnet = chains["mainnet" as keyof typeof chains];
    enabledChains.push(mainnet);
  }
  return enabledChains;
}
