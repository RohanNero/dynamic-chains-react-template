import * as chains from "viem/chains";
import { chainData } from "../config/chainData";

/**
 * Gets the transport url from chainData object if one exists, otherwise returns hard-coded public mainnet rpc url
 * @returns transport http url for creating viem clients
 */
export function getTransportUrl(chainId: string) {
  const listedUrl =
    chainId && chainData[chainId]?.url ? chainData[chainId].url : undefined;
  if (listedUrl) {
    return listedUrl;
  } else {
    return (
      process.env.NEXT_PUBLIC_MAINNET_RPC_URL || "https://eth.llamarpc.com"
    );
  }
}
