import { useCallback, useEffect, useState } from "react";
import { useBalance, useAccount } from "wagmi";
import {
  encodeFunctionData,
  decodeFunctionResult,
  createPublicClient,
  http,
} from "viem";
import aggregatorV3InterfaceABI from "../abi/pricefeedAbi";
import { chainData } from "../config/chainData";
import { wagmiConfig } from "../config/wagmiConfig";
import { mainnet } from "viem/chains";
import { getTransportUrl } from "../utils/getTransportUrl";

// This hook is modified from Scaffold-eth 2!
// Check them out: https://github.com/scaffold-eth/scaffold-eth-2

// This hook gets the user's balance using wagmi's `useBalance()`
// and gets the user's balance in terms of USD using chainlink's pricefeeds.
export function useAccountBalance(address?: string) {
  const [isEthBalance, setIsEthBalance] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const { chain } = useAccount();

  const targetNetworkId = chain?.id;

  const {
    data: fetchedBalanceData,
    isError,
    isLoading,
    refetch,
  } = useBalance({
    address: address as `0x${string}` | undefined,
    chainId: targetNetworkId,
  });

  const fetchPrice = async () => {
    if (!chain || !chain.id) {
      console.log("Error fetching price: chain is undefined.");
    }
    // Easier to use mainnet Ethereum pricefeeds instead of swapping URL everytime the user switches chains.
    // For chains that don't have a native token/USD pricefeed on Ethereum mainnet,
    // you must pass an rpc url for the chain explicity in `/config/chainData.ts`s' `ChainData` object.

    // Returns url listed in `chainData` config object if one exists, otherwise returns public mainnet rpc url
    const url = await getTransportUrl(chain?.id);

    // If an RPC URL is listed we create our publicClient using that http, otherwise use mainnet
    let publicClient;
    const listedUrl = chain?.id ? chainData[chain?.id]?.url : undefined;
    if (listedUrl) {
      publicClient = createPublicClient({
        transport: http(url),
      });
    } else {
      publicClient = createPublicClient({
        chain: mainnet,
        transport: http(url),
      });
    }

    const data = encodeFunctionData({
      abi: aggregatorV3InterfaceABI,
      functionName: "latestRoundData",
    });
    console.log(
      "Pricefeed contract:",
      (chain?.id
        ? (chainData[chain?.id]?.priceFeed as `0x${string}`)
        : undefined) || undefined
    );
    if (
      !(chain?.id
        ? (chainData[chain?.id]?.priceFeed as `0x${string}`)
        : undefined)
    ) {
      console.log("pricefeed address is undefined...");
      return;
    }
    const priceData = await publicClient.call({
      data: data,
      to:
        (chain?.id
          ? (chainData[chain?.id]?.priceFeed as `0x${string}`)
          : undefined) || undefined,
    });
    if (!priceData || !priceData.data) {
      console.log("priceData is undefined...");
      return;
    }
    const decodedPriceData = decodeFunctionResult({
      abi: aggregatorV3InterfaceABI,
      functionName: "latestRoundData",
      data: priceData.data,
    });
    console.log("price:", decodedPriceData[1]);
    setPrice(Number(decodedPriceData[1]));
  };

  const onToggleBalance = useCallback(() => {
    fetchPrice();
    if ((price ? price : 0) > 0) {
      setIsEthBalance(!isEthBalance);
    }
  }, [isEthBalance, price]);

  useEffect(() => {
    if (fetchedBalanceData?.formatted) {
      setBalance(Number(fetchedBalanceData.formatted));
    }
    fetchPrice();
  }, [fetchedBalanceData]);

  return {
    balance,
    price,
    isError,
    isLoading,
    onToggleBalance,
    isEthBalance,
    refetch,
  };
}
