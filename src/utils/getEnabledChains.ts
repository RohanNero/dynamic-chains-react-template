import * as chains from "viem/chains";
import { includedChains } from "../config/chainData";
import { Chain } from "viem/chains";

/**
 * Creates the array of chain objects using chainIds' inside `chainData.ts` `includedChains`.
 * @returns block explorer address URL and etherscan URL if block explorer URL is not present for wagmi network
 */
export function getEnabledChains(): readonly [Chain, ...Chain[]] {
  const allChains = Object.values(chains);

  let enabledChains: Chain[] = [];
  for (const id of includedChains) {
    const targetChain = allChains.find((chain) => {
      return chain.id === id;
    });
    if (targetChain !== undefined) {
      enabledChains.push(targetChain);
    }
  }

  // If mainnet isn't in the `includedChains` array, we manually add it since it is vital for many pricefeeds
  // To remove this feature simply comment out or remove lines 21-27
  const mainnet = chains["mainnet" as keyof typeof chains];
  if (includedChains.includes(1) == false) {
    enabledChains.push(mainnet);
  }
  return [mainnet, ...enabledChains] as const;
}
